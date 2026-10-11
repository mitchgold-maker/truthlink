import { z } from "zod";
import { callJson } from "./llm";

// extract_tasks contract (docs/AI_CONTRACTS.md §1), mapped to the UI's task fields.

export const ExtractInput = z.object({
  notes: z.string().min(1).max(20000),
  project: z.string().max(200).default(""),
  today: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  people: z
    .array(z.object({ id: z.string(), name: z.string(), skills: z.array(z.string()) }))
    .max(200),
});

const DraftTask = z.object({
  title: z.string().min(1),
  description: z.string().default(""),
  suggested_owner_id: z.string().nullable(),
  owner_reason: z.string().default(""),
  due_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable(),
  estimated_hours: z.number().positive().nullable(),
  required_skills: z.array(z.string()).default([]),
  deliverable: z.string().default(""),
  acceptance_criteria: z.array(z.string()).default([]),
  verification_type: z.enum(["binary", "complex"]),
  depends_on: z.array(z.string()).default([]),
  source_quote: z.string().min(1),
});

export const ExtractOutput = z.object({ tasks: z.array(DraftTask).max(50) });
export type ExtractOutput = z.infer<typeof ExtractOutput>;

const SYSTEM = `You turn meeting notes into draft tasks for a coordinator to review.
Rules:
- One task per concrete commitment or action item. Skip chit-chat and decisions with no action.
- suggested_owner_id MUST be an id from the provided people list, or null if no one is clearly named. Never invent people.
- due_date only if a date is stated or clearly implied relative to today; otherwise null. Format YYYY-MM-DD.
- estimated_hours: your best estimate of remaining effort, or null if you have no basis.
- required_skills: prefer skill names that already appear in the people list.
- verification_type: "binary" when completion is just a file or thing existing (a roster uploaded, an email sent); "complex" when quality needs human judgment (a plan, drawing, analysis, briefing).
- acceptance_criteria: 1–3 checkable statements about the deliverable.
- source_quote: copy the exact phrase from the notes this task came from.
Output: {"tasks":[{title, description, suggested_owner_id, owner_reason, due_date, estimated_hours, required_skills, deliverable, acceptance_criteria, verification_type, depends_on, source_quote}]}`;

export async function extractTasks(input: z.infer<typeof ExtractInput>) {
  const user = JSON.stringify({
    today: input.today,
    project: input.project,
    people: input.people,
    notes: input.notes,
  });
  const result = await callJson(ExtractOutput, SYSTEM, user);
  // Guardrail enforced in code, not just the prompt: unknown owners become null.
  const ids = new Set(input.people.map((p) => p.id));
  for (const t of result.data.tasks) {
    if (t.suggested_owner_id && !ids.has(t.suggested_owner_id)) t.suggested_owner_id = null;
  }
  return result;
}
