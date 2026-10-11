# AI contracts

Every AI call has a fixed input, a JSON output validated with Zod, and guardrails. Prompts live in `web/lib/ai/`. Invalid output: retry once, then show an error. Nothing unvalidated reaches the database.

## 1. `extract_tasks`
**Input:** meeting notes text, project context, list of employees (id, name, skills), today's date.
**Output:**
```json
{ "tasks": [ {
  "title": "string",
  "description": "string",
  "suggested_owner_id": "uuid | null",
  "owner_reason": "string",
  "due_date": "YYYY-MM-DD | null",
  "estimated_hours": "number | null",
  "required_skills": ["string"],
  "deliverable": "string",
  "acceptance_criteria": ["string"],
  "verification_type": "binary | complex",
  "depends_on": ["title of another task"],
  "source_quote": "the line in the notes this came from"
} ] }
```
**Guardrails:** owners must come from the provided employee list; unknown owner → `null`. Dates only if stated or clearly implied. `source_quote` required so the manager can check every task. Results are drafts until a manager approves.

## 2. `verify_evidence`
**Input:** task title, acceptance criteria, verification type, evidence (extracted text, file name, MIME type, size, link).
**Output:**
```json
{ "verdict": "pass | fail | needs_review",
  "checks": [ { "criterion": "string", "met": "yes | no | unclear", "reason": "string" } ],
  "summary": "string",
  "missing": ["string"] }
```
**Guardrails:** for `complex` tasks the server maps `pass` to `ai_reviewed`, never `complete`. The model is told it cannot see inside files it could not read and must answer `unclear` rather than guess.

## 3. `explain_replacement`
**Input:** the task, and the top candidates already ranked in code with their scores (demonstrated skills, free hours, recent related work).
**Output:**
```json
{ "recommendations": [ { "employee_id": "uuid", "rationale": "string", "risks": "string" } ] }
```
**Guardrails:** may only reorder or explain the candidates given; it cannot add people. Ranking itself is deterministic (see `ARCHITECTURE.md`).

## 4. `draft_followup`
**Input:** employee name, task, reason (`overdue`/`missing_evidence`/`blocked`), due date, last activity (real or labelled simulated).
**Output:**
```json
{ "message": "string, under 400 characters", "tone": "friendly | firm", "suggested_next_step": "string" }
```
**Guardrails:** no invented facts; refer only to the data given. Never mention hours worked unless a session record exists.

## Model notes
Use the provider's native structured-output / JSON-schema mode where available, with the Zod schema as the single source of truth. Log model name and latency on `verifications` rows.
