import { NextResponse } from "next/server";
import { z } from "zod";
import { db, mongoConfigured } from "@/lib/db/mongo";

// Receives snapshots from the TruthLink Watcher Fusion add-in (on every save) and serves the latest per design.
// Stored in MongoDB Atlas (`fusion_snapshots`) when configured, otherwise in memory.

const Snapshot = z
  .object({
    proofpilot_snapshot: z.number(),
    document: z.string().min(1).max(300),
    mass_g: z.number().optional(),
    current_version: z.number().nullable().optional(),
    exported_at: z.string().optional(),
  })
  .passthrough();

type Stored = z.infer<typeof Snapshot> & { received_at: string };
const g = globalThis as unknown as { __fusionSnapshots?: Map<string, Stored[]> };
const memory = (g.__fusionSnapshots ??= new Map());

function authorized(req: Request) {
  const token = process.env.TRUTHLINK_INGEST_TOKEN;
  return !token || req.headers.get("x-truthlink-token") === token;
}

async function history(document: string, limit = 2): Promise<Stored[]> {
  if (mongoConfigured()) {
    const rows = await (await db()).collection<Stored>("fusion_snapshots").find({ document }, { projection: { _id: 0 } }).sort({ received_at: -1 }).limit(limit).toArray();
    return rows.reverse();
  }
  return (memory.get(document) ?? []).slice(-limit);
}

export async function POST(req: Request) {
  if (!authorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const text = await req.text();
  if (text.length > 60_000) return NextResponse.json({ error: "Snapshot too large" }, { status: 413 });
  let json: unknown = null;
  try {
    json = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = Snapshot.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "Invalid snapshot" }, { status: 400 });
  const snap: Stored = { ...parsed.data, received_at: new Date().toISOString() };
  if (mongoConfigured()) {
    await (await db()).collection("fusion_snapshots").insertOne({ ...snap });
  } else {
    const h = memory.get(snap.document) ?? [];
    h.push(snap);
    memory.set(snap.document, h.slice(-20));
  }
  return NextResponse.json({ ok: true, document: snap.document, store: mongoConfigured() ? "mongodb" : "memory" });
}

// GET → designs with their latest snapshot summary; ?document=<name> → latest full snapshot + previous for diffing.
export async function GET(req: Request) {
  const doc = new URL(req.url).searchParams.get("document");
  if (doc) {
    const h = await history(doc);
    if (!h.length) return NextResponse.json({ error: "No snapshot for that design yet" }, { status: 404 });
    return NextResponse.json({ latest: h[h.length - 1], previous: h.length > 1 ? h[h.length - 2] : null });
  }
  if (mongoConfigured()) {
    const designs = await (await db())
      .collection("fusion_snapshots")
      .aggregate([
        { $sort: { received_at: -1 } },
        { $group: { _id: "$document", mass_g: { $first: "$mass_g" }, current_version: { $first: "$current_version" }, received_at: { $first: "$received_at" }, snapshots: { $sum: 1 } } },
        { $project: { _id: 0, document: "$_id", mass_g: 1, current_version: 1, received_at: 1, snapshots: 1 } },
      ])
      .toArray();
    return NextResponse.json({ designs });
  }
  return NextResponse.json({
    designs: [...memory.entries()].map(([document, h]) => {
      const last = h[h.length - 1];
      return { document, mass_g: last.mass_g, current_version: last.current_version, received_at: last.received_at, snapshots: h.length };
    }),
  });
}
