import { NextResponse } from "next/server";
import { slackCall, slackConn } from "@/lib/slack";

// Slack integration. Connection comes from the Integrations page (headers) or server env (see lib/slack.ts).
// action "test": verify token + channel. "history": recent messages (meeting minutes). "send": post a message.
// Returns 503 when not connected so the UI can fall back to a clearly labelled simulation.

export const runtime = "nodejs";

export async function GET(req: Request) {
  const c = slackConn(req);
  return NextResponse.json({ configured: Boolean(c), source: c?.source ?? null });
}

export async function POST(req: Request) {
  const conn = slackConn(req);
  if (!conn) return NextResponse.json({ error: "Slack not configured" }, { status: 503 });
  const body = await req.json().catch(() => ({}));
  try {
    if (body.action === "test") {
      const auth = await slackCall(conn, "auth.test", {});
      const info = await slackCall(conn, "conversations.info", { channel: conn.channel }).catch(() => null);
      return NextResponse.json({ ok: true, team: auth.team, bot: auth.user, channel: info?.channel?.name ?? conn.channel, is_member: info?.channel?.is_member ?? null });
    }
    if (body.action === "history") {
      const h = await slackCall(conn, "conversations.history", { channel: conn.channel, limit: 15 });
      const messages = (h.messages ?? []).filter((m: { text?: string; subtype?: string }) => m.text && !m.subtype).reverse();
      // Prefer the most recent message that looks like meeting minutes; otherwise join the recent thread.
      const minutes = [...messages].reverse().find((m: { text: string }) => /minutes|recap|notes|action items/i.test(m.text));
      return NextResponse.json({ text: minutes ? minutes.text : messages.map((m: { text: string }) => m.text).join("\n"), count: messages.length });
    }
    if (body.action === "send") {
      const text = String(body.text ?? "").slice(0, 3000);
      if (!text) return NextResponse.json({ error: "Empty message" }, { status: 400 });
      const r = await slackCall(conn, "chat.postMessage", { channel: conn.channel, text });
      return NextResponse.json({ ok: true, ts: r.ts });
    }
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 502 });
  }
}
