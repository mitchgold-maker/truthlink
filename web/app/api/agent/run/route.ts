import { NextResponse } from "next/server";
import { z } from "zod";
import { extractTasks } from "@/lib/ai/extract";
import { verifyEvidence } from "@/lib/ai/verify";
import { slackCall, slackConn } from "@/lib/slack";

// TruthLink Autopilot: one agent run.
// 1. Watch Slack for new meeting minutes → draft tasks (drafts only; a team lead approves before anyone is assigned).
// 2. Check every open task that is due → run the verifier on its evidence → message the owner on Slack if it's behind.
// The workspace sends its tasks (no server database yet). Bounded per run to protect AI credits.

export const runtime = "nodejs";
export const maxDuration = 60;

const Doc = z.object({ name: z.string().max(300), size: z.number().nonnegative(), type: z.string().max(200), text: z.string().max(15000).nullable() });
const Input = z.object({
  today: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  cursor: z.string().max(40).nullable().default(null),
  lastNudged: z.record(z.string(), z.string()).default({}),
  simulatedMinutes: z.string().max(8000).optional(),
  people: z.array(z.object({ id: z.string(), name: z.string(), skills: z.array(z.string()).default([]), slack_id: z.string().optional() })).max(200),
  tasks: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        owner: z.string().optional().default(""),
        due: z.string().optional().default(""),
        status: z.string(),
        type: z.string().optional().default("manager"),
        criteria: z.string().optional().default(""),
        updated_at: z.string().optional(),
        evidenceDocs: z.array(Doc).max(10).optional(),
      }),
    )
    .max(300),
});

const isMinutes = (t: string) => /minutes|recap|action items|meeting notes|design review/i.test(t);
const daysBetween = (a: string, b: string) => Math.round((Date.parse(b) - Date.parse(a)) / 86_400_000);

export async function POST(req: Request) {
  const parsed = Input.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request", issues: parsed.error.issues }, { status: 400 });
  const input = parsed.data;
  const conn = slackConn(req);
  const slackOn = () => Boolean(conn);
  const slack = (method: string, body: Record<string, unknown>) => slackCall(conn!, method, body);
  const post = async (text: string) => {
    if (!conn) return false;
    await slack("chat.postMessage", { channel: conn.channel, text });
    return true;
  };
  const log: { at: string; kind: string; text: string; live: boolean }[] = [];
  const note = (kind: string, text: string, live: boolean) => log.push({ at: new Date().toISOString(), kind, text, live });
  let cursor = input.cursor;
  const drafts: unknown[] = [];

  // 1. Slack → minutes → draft tasks.
  try {
    let minutes: { text: string; live: boolean } | null = null;
    if (input.simulatedMinutes) minutes = { text: input.simulatedMinutes, live: false };
    else if (slackOn()) {
      const h = await slack("conversations.history", { channel: conn!.channel, limit: 20, ...(cursor ? { oldest: cursor } : {}) });
      const fresh = (h.messages ?? []).filter((m: { ts: string; text?: string; bot_id?: string; subtype?: string }) => m.text && !m.bot_id && !m.subtype && (!cursor || m.ts > cursor));
      if (h.messages?.length) cursor = h.messages.map((m: { ts: string }) => m.ts).sort().pop() ?? cursor;
      const m = fresh.reverse().find((x: { text: string }) => isMinutes(x.text));
      note("slack", fresh.length ? `Read ${fresh.length} new Slack message(s)${m ? ", found meeting minutes" : ", no minutes"}` : "No new Slack messages", true);
      if (m) minutes = { text: m.text, live: true };
    } else note("slack", "Slack not connected: skipped channel check", false);

    if (minutes) {
      const r = await extractTasks({ notes: minutes.text, project: "", today: input.today, people: input.people.map(({ id, name, skills }) => ({ id, name, skills })) });
      drafts.push(...r.data.tasks);
      note("draft", `Drafted ${r.data.tasks.length} task(s) from ${minutes.live ? "Slack" : "simulated Slack"} minutes (${r.provider}). Waiting for team-lead approval.`, minutes.live);
      const sent = await post(`:memo: *TruthLink* drafted ${r.data.tasks.length} task(s) from the latest meeting minutes. A team lead approves them in TruthLink before anyone is assigned.`).catch(() => false);
      if (sent) note("slack", "Posted draft summary to Slack", true);
    }
  } catch (e) {
    note("error", `Minutes check failed: ${(e as Error).message}`, false);
  }

  // 2. Check due tasks and nudge owners who are behind.
  const nudges: { task_id: string; owner: string; verdict: string; text: string; posted: boolean }[] = [];
  const nameOf = (id: string) => input.people.find((p) => p.id === id);
  const due = input.tasks
    .filter((t) => t.status !== "completed" && t.status !== "pending_approval" && t.due && daysBetween(input.today, t.due) <= 1)
    .sort((a, b) => a.due.localeCompare(b.due))
    .slice(0, 5);
  note("check", due.length ? `Checking ${due.length} task(s) due by tomorrow` : "No tasks due by tomorrow", false);
  for (const t of due) {
    const last = input.lastNudged[t.id];
    if (last && daysBetween(last.slice(0, 10), input.today) < 1) {
      note("check", `Skipped “${t.title}”: owner already nudged today`, false);
      continue;
    }
    let verdict = "no_evidence", detail = "no evidence uploaded yet";
    if (t.evidenceDocs?.some((d) => d.text)) {
      try {
        const v = await verifyEvidence({ title: t.title, criteria: t.criteria || t.title, verification_type: t.type === "exists" ? "binary" : "complex", evidence: t.evidenceDocs, since: t.updated_at });
        verdict = v.data.verdict;
        detail = v.data.verdict === "pass" ? "evidence passes, waiting on the team lead" : `still missing: ${v.data.missing.slice(0, 2).join("; ") || "see TruthLink"}`;
      } catch (e) {
        detail = `check failed (${(e as Error).message})`;
      }
    }
    if (verdict === "pass") {
      note("check", `“${t.title}” evidence passes; no nudge needed`, false);
      continue;
    }
    const p = nameOf(t.owner);
    const lateBy = daysBetween(t.due, input.today);
    const when = lateBy > 0 ? `${lateBy} day${lateBy === 1 ? "" : "s"} overdue` : lateBy === 0 ? "due today" : "due tomorrow";
    const who = p?.slack_id ? `<@${p.slack_id}>` : p?.name ?? "Unassigned";
    const text = `:alarm_clock: ${who}, “${t.title}” is ${when}. TruthLink checked it: ${detail}. Reply here with an update or upload evidence in TruthLink.`;
    const posted = await post(text).catch(() => false);
    nudges.push({ task_id: t.id, owner: t.owner, verdict, text, posted });
    note("nudge", `${posted ? "Messaged" : "Would message"} ${p?.name ?? "owner"} about “${t.title}” (${when})`, posted);
  }

  return NextResponse.json({ slack: slackOn(), cursor, drafts, nudges, log });
}
