// Slack connection resolved per request: a workspace connects Slack on the Integrations page
// (bot token + channel sent as headers over HTTPS), falling back to SLACK_BOT_TOKEN / SLACK_CHANNEL_ID
// set on the server. The token is never logged or echoed back.

export type SlackConn = { token: string; channel: string; source: "workspace" | "server" };

export function slackConn(req: Request): SlackConn | null {
  const token = req.headers.get("x-slack-token")?.trim();
  const channel = req.headers.get("x-slack-channel")?.trim();
  if (token && channel && /^xox[bp]-/.test(token)) return { token, channel, source: "workspace" };
  if (process.env.SLACK_BOT_TOKEN && process.env.SLACK_CHANNEL_ID) return { token: process.env.SLACK_BOT_TOKEN, channel: process.env.SLACK_CHANNEL_ID, source: "server" };
  return null;
}

export async function slackCall(conn: SlackConn, method: string, body: Record<string, unknown>) {
  const res = await fetch(`https://slack.com/api/${method}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${conn.token}`, "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!json.ok) throw new Error(`Slack ${method}: ${json.error}`);
  return json;
}
