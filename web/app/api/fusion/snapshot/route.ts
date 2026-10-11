import { NextResponse } from "next/server";
import { z } from "zod";

// Receives snapshots from the ProofPilot Watcher Fusion add-in (on every save) and serves the latest per design.
// In-memory for now; moves to the database layer when it is connected.

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
const store = (g.__fusionSnapshots ??= new Map());

function authorized(req: Request) {
  const token = process.env.PROOFPILOT_INGEST_TOKEN;
  return !token || req.headers.get("x-proofpilot-token") === token;
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
  const snap = { ...parsed.data, received_at: new Date().toISOString() };
  const history = store.get(snap.document) ?? [];
  history.push(snap);
  store.set(snap.document, history.slice(-20));
  return NextResponse.json({ ok: true, document: snap.document, versions_stored: store.get(snap.document)!.length });
}

// GET → list of designs with their latest snapshot summary; ?document=<name> → latest full snapshot + previous for diffing.
export async function GET(req: Request) {
  const doc = new URL(req.url).searchParams.get("document");
  if (doc) {
    const history = store.get(doc) ?? [];
    if (!history.length) return NextResponse.json({ error: "No snapshot for that design yet" }, { status: 404 });
    return NextResponse.json({ latest: history[history.length - 1], previous: history[history.length - 2] ?? null });
  }
  return NextResponse.json({
    designs: [...store.entries()].map(([document, h]) => {
      const last = h[h.length - 1];
      return { document, mass_g: last.mass_g, current_version: last.current_version, received_at: last.received_at, snapshots: h.length };
    }),
  });
}
