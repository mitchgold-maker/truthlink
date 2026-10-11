# Data model

Postgres in Supabase. This is the design; the SQL migrations are written during the build.

## Tables

| Table | Key columns | Notes |
|---|---|---|
| `profiles` | id (auth user), full_name, role (`manager`/`employee`), title, weekly_capacity_hours | One per user |
| `skills` | id, name | Normalised skill names |
| `employee_skills` | employee_id, skill_id, source (`self_reported`/`demonstrated`), level, last_demonstrated_at | `demonstrated` rows only come from completed tasks |
| `projects` | id, name, description, owner_id, due_date, status | |
| `meetings` | id, project_id, title, held_at, notes_text, uploaded_by | Raw notes kept for traceability |
| `task_drafts` | id, meeting_id, payload (jsonb), status (`pending`/`approved`/`rejected`), reviewed_by | AI output before approval |
| `tasks` | id, project_id, title, description, acceptance_criteria, verification_type (`binary`/`complex`), required_skill_ids, estimated_hours, due_date, status, created_from_meeting_id | |
| `task_dependencies` | task_id, depends_on_task_id | |
| `assignments` | id, task_id, employee_id, assigned_at, assigned_by, active, reason | History kept; one active per task |
| `pto` | id, employee_id, starts_on, ends_on, approved | |
| `evidence` | id, task_id, submitted_by, kind (`file`/`link`/`text`), storage_path, url, extracted_text, submitted_at | |
| `verifications` | id, task_id, evidence_id, model, verdict (`pass`/`fail`/`needs_review`), checks (jsonb), summary, created_at | Every AI check stored |
| `approvals` | id, task_id, approver_id, decision (`approved`/`rejected`), comment, decided_at | Manager decisions |
| `reassignment_suggestions` | id, task_id, from_employee_id, candidates (jsonb), status, decided_by | |
| `activity_events` | id, employee_id, source (`simulated`/`fusion`/`gdrive`/`github`), document_name, document_url, event (`opened`/`modified`/`session`), occurred_at, session_minutes (nullable) | `session_minutes` only when the source reports a session |
| `followups` | id, task_id, employee_id, reason (`overdue`/`missing_evidence`/`blocked`), message, channel (`dashboard`/`slack`), sent_at | |

## Task status machine

```
todo → in_progress → submitted ─┬─(binary pass)───────────────→ complete
                                ├─(complex, AI checked)→ ai_reviewed ─(manager approves)→ complete
                                │                                     └(manager rejects)→ in_progress
                                └─(fail)→ in_progress
any open status → blocked (dependency or reported blocker)
overdue is derived (due_date < today and not complete), not stored
```

Rules enforced in the database or server:
- `complete` is reachable only from a passing **binary** verification or a manager **approval**.
- A complex task never moves to `complete` without an `approvals` row from a manager.
- Completing a task upserts `employee_skills` (`source = demonstrated`) for its required skills.

## Derived values (computed, never stored as fake numbers)
- **Load %** = open estimated hours due in window ÷ (capacity in window − PTO hours).
- **Project progress** = completed tasks ÷ total tasks (or weighted by estimated hours).
- **At risk** = overdue, or due within 2 days with no evidence, or assignee load > 100% or on PTO.
