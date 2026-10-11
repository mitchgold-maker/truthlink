import { NextResponse } from "next/server";

// Slack integration via a bot token (SLACK_BOT_TOKEN, scopes: channels:history, chat:write; bot invited to the channel).
// action "history": recent messages from SLACK_CHANNEL_ID (meeting minutes). action "send": post a message there.
// Returns 503 when not configured so the UI can fall back to a clearly labelled simulation.

export const runtime = "nodejs";

async function slack(method: string, body: Record<string, unknown>) {
  const res = await fetch(`https://slack.com/api/${method}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`, "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!json.ok) throw new Error(`Slack ${method}: ${json.error}`);
  return json;
}

export async function GET() {
  return NextResponse.json({ configured: Boolean(process.env.SLACK_BOT_TOKEN && process.env.SLACK_CHANNEL_ID) });
}

export async function POST(req: Request) {
  if (!process.env.SLACK_BOT_TOKEN || !process.env.SLACK_CHANNEL_ID) return NextResponse.json({ error: "Slack not configured" }, { status: 503 });
  const body = await req.json().catch(() => ({}));
  try {
    if (body.action === "history") {
      const h = await slack("conversations.history", { channel: process.env.SLACK_CHANNEL_ID, limit: 15 });
      const messages = (h.messages ?? []).filter((m: { text?: string; subtype?: string }) => m.text && !m.subtype).reverse();
      // Prefer the most recent message that looks like meeting minutes; otherwise join the recent thread.
      const minutes = [...messages].reverse().find((m: { text: string }) => /minutes|recap|notes|action items/i.test(m.text));
      return NextResponse.json({ text: minutes ? minutes.text : messages.map((m: { text: string }) => m.text).join("\n"), count: messages.length });
    }
    if (body.action === "send") {
      const text = String(body.text ?? "").slice(0, 3000);
      if (!text) return NextResponse.json({ error: "Empty message" }, { status: 400 });
      const r = await slack("chat.postMessage", { channel: process.env.SLACK_CHANNEL_ID, text });
      return NextResponse.json({ ok: true, ts: r.ts });
    }
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 502 });
  }
}
