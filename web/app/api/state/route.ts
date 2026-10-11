import { NextResponse } from "next/server";
import { db, mongoConfigured } from "@/lib/db/mongo";

// Shared workspace state in MongoDB Atlas, so every device sees the same records.
// Stores people, tasks, decisions and activity as separate collections keyed by workspace.

const COLLECTIONS = ["people", "tasks", "decisions", "activity"] as const;
const MAX_BYTES = 900_000;

function workspace(req: Request) {
  return (new URL(req.url).searchParams.get("workspace") ?? "demo-racing-team").replace(/[^a-z0-9-]/gi, "").slice(0, 60) || "demo-racing-team";
}

export async function GET(req: Request) {
  if (!mongoConfigured()) return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  const ws = workspace(req);
  const d = await db();
  const meta = await d.collection("workspaces").findOne({ _id: ws as never });
  if (!meta) return NextResponse.json({ state: null });
  const state: Record<string, unknown> = {};
  for (const c of COLLECTIONS) {
    state[c] = (await d.collection(c).find({ workspace: ws }, { projection: { _id: 0, workspace: 0 } }).sort({ order: 1 }).toArray()).map(({ order, ...doc }) => doc);
  }
  return NextResponse.json({ state, updated_at: meta.updated_at });
}

export async function PUT(req: Request) {
  if (!mongoConfigured()) return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  const text = await req.text();
  if (text.length > MAX_BYTES) return NextResponse.json({ error: "State too large" }, { status: 413 });
  let state: Record<string, unknown>;
  try {
    state = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const ws = workspace(req);
  const d = await db();
  for (const c of COLLECTIONS) {
    const rows = Array.isArray(state[c]) ? (state[c] as Record<string, unknown>[]) : [];
    await d.collection(c).deleteMany({ workspace: ws });
    if (rows.length) await d.collection(c).insertMany(rows.map((r, order) => ({ ...r, workspace: ws, order })));
  }
  const updated_at = new Date().toISOString();
  await d.collection("workspaces").updateOne({ _id: ws as never }, { $set: { updated_at } }, { upsert: true });
  return NextResponse.json({ ok: true, updated_at });
}
