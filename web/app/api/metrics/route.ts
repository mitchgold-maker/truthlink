import { NextResponse } from "next/server";
import { db, mongoConfigured } from "@/lib/db/mongo";

// Performance metrics aggregated in MongoDB from the task event log.
// - per member × skill: tasks completed with approval, first-pass rate (approved without a failed check
//   or rejection), average rework cycles, median calendar days assigned → approved, estimate vs self-reported hours
// - per task: current stage and days in that stage
// Calendar time only; working hours appear only when self-reported.

export async function GET(req: Request) {
  if (!mongoConfigured()) return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  const workspace = new URL(req.url).searchParams.get("workspace") ?? "demo-racing-team";
  const events = (await db()).collection("task_events");

  const perTask = await events
    .aggregate([
      { $match: { workspace } },
      { $sort: { at: 1 } },
      {
        $group: {
          _id: "$task_id",
          title: { $last: "$task_title" },
          subsystem: { $last: "$subsystem" },
          member_id: { $last: "$member_id" },
          skills: { $last: "$skills" },
          first_at: { $first: "$at" },
          last_at: { $last: "$at" },
          last_status: { $last: "$status" },
          approved_at: { $max: { $cond: [{ $eq: ["$kind", "approved"] }, "$at", null] } },
          fails: { $sum: { $cond: [{ $or: [{ $eq: ["$verdict", "fail"] }, { $eq: ["$kind", "rejected"] }] }, 1, 0] } },
          estimated_hours: { $max: "$estimated_hours" },
          reported_hours: { $sum: { $ifNull: ["$reported_hours", 0] } },
          reports: { $sum: { $cond: [{ $eq: ["$kind", "hours_reported"] }, 1, 0] } },
        },
      },
      {
        $addFields: {
          cycle_days: { $cond: ["$approved_at", { $divide: [{ $subtract: ["$approved_at", "$first_at"] }, 86_400_000] }, null] },
          days_in_stage: { $divide: [{ $subtract: ["$$NOW", "$last_at"] }, 86_400_000] },
        },
      },
    ])
    .toArray();

  const done = perTask.filter((t) => t.approved_at);
  const key = (m: string, s: string) => `${m}::${s}`;
  const perMemberSkill = new Map<string, { member_id: string; skill: string; completed: number; first_pass: number; rework: number; cycle: number[]; est: number; rep: number }>();
  for (const t of done) {
    for (const skill of (t.skills as string[]) ?? []) {
      const k = key(t.member_id, skill);
      const row = perMemberSkill.get(k) ?? { member_id: t.member_id, skill, completed: 0, first_pass: 0, rework: 0, cycle: [] as number[], est: 0, rep: 0 };
      row.completed++;
      if (!t.fails) row.first_pass++;
      row.rework += t.fails;
      if (t.cycle_days != null) row.cycle.push(t.cycle_days);
      if (t.reports && t.estimated_hours) {
        row.est += t.estimated_hours;
        row.rep += t.reported_hours;
      }
      perMemberSkill.set(k, row);
    }
  }
  const median = (xs: number[]) => (xs.length ? [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)] : null);

  return NextResponse.json({
    members: [...perMemberSkill.values()].map((r) => ({
      member_id: r.member_id,
      skill: r.skill,
      completed: r.completed,
      first_pass_rate: r.completed ? r.first_pass / r.completed : null,
      avg_rework_cycles: r.completed ? r.rework / r.completed : null,
      median_cycle_days: median(r.cycle),
      estimate_accuracy: r.rep ? r.est / r.rep : null, // >1 = finishes faster than estimated (self-reported hours)
    })),
    tasks: perTask.map((t) => ({
      task_id: t._id,
      title: t.title,
      subsystem: t.subsystem,
      member_id: t.member_id,
      stage: t.approved_at ? "approved" : t.last_status ?? "open",
      days_in_stage: Math.round(t.days_in_stage * 10) / 10,
      rework_cycles: t.fails,
    })),
    note: "Durations are calendar time between recorded events; hours appear only when self-reported.",
  });
}
