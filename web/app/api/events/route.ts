import { NextResponse } from "next/server";
import { z } from "zod";
import { db, mongoConfigured } from "@/lib/db/mongo";

// Append-only task event log in MongoDB Atlas. Every status change, evidence check, approval,
// rejection and reassignment is one event; performance metrics are aggregated from it (see /api/metrics).
// Durations are calendar time between recorded events, never inferred working hours.

const Event = z.object({
  workspace: z.string().max(60).default("demo-racing-team"),
  task_id: z.string().min(1).max(100),
  task_title: z.string().max(300).optional(),
  subsystem: z.string().max(100).optional(),
  member_id: z.string().max(100).optional(),
  skills: z.array(z.string().max(80)).max(20).default([]),
  kind: z.enum(["created", "assigned", "status", "evidence_added", "verified", "approved", "rejected", "reassigned", "hours_reported"]),
  status: z.string().max(40).optional(),
  verdict: z.enum(["pass", "fail", "needs_review"]).optional(),
  estimated_hours: z.number().nonnegative().max(1000).optional(),
  // Only when the member reports it themselves; labelled self-reported everywhere it is shown.
  reported_hours: z.number().nonnegative().max(1000).optional(),
  source: z.enum(["app", "fusion", "simulated"]).default("app"),
  at: z.string().max(40).optional(),
});

export async function POST(req: Request) {
  if (!mongoConfigured()) return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  const body = await req.json().catch(() => null);
  const list = z.array(Event).max(200).safeParse(Array.isArray(body) ? body : [body]);
  if (!list.success) return NextResponse.json({ error: "Invalid event", issues: list.error.issues }, { status: 400 });
  const now = new Date();
  const docs = list.data.map((e) => ({ ...e, at: e.at ? new Date(e.at) : now }));
  await (await db()).collection("task_events").insertMany(docs);
  return NextResponse.json({ ok: true, stored: docs.length });
}
