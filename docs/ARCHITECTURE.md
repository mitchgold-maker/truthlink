# Architecture

## Overview

```
Browser (Next.js App Router, React, shadcn/ui)
   │  server actions / route handlers (all mutations)
   ▼
Next.js server on Vercel ── LLM API (structured JSON, validated with Zod)
   │                     └─ Slack incoming webhook (follow-ups)
   ▼
Supabase: Postgres (+ Row Level Security), Auth, Storage (evidence files)
```

- One Next.js app in `web/`, deployed to Vercel with `web/` as the project root.
- The browser never calls the LLM or uses the service-role key. All AI calls and privileged writes run on the server.
- Supabase Auth gives each user a role (`manager` or `employee`) stored in `profiles`.

## Key flows

**1. Notes → tasks**
Manager pastes notes → server calls `extract_tasks` (see `AI_CONTRACTS.md`) → validated drafts saved as `task_drafts` → manager edits and approves → server creates `tasks` and `assignments`.

**2. Evidence → verification**
Employee uploads a file to Storage or adds a link → `evidence` row → server calls `verify_evidence` with the task's acceptance criteria and the evidence (text extracted where possible, file name/type/metadata otherwise) → `verifications` row.
- `verification_type = binary` and verdict `pass` → task `complete`.
- `verification_type = complex` → task `ai_reviewed` (never `complete`).

**3. Manager approval**
Manager approves or rejects an `ai_reviewed` task → `approvals` row → task `complete` (or back to `in_progress`) → the employee's demonstrated skills update from completed tasks.

**4. PTO → replacement**
Manager adds PTO → load recalculated → for at-risk tasks, the server ranks candidates (deterministic score below) → AI writes a short rationale → manager approves → `assignments` updated, history kept.

**5. Follow-ups**
Server job (button for the demo, cron later) finds overdue tasks, missing evidence and blockers → `draft_followup` → stored in `followups` → optionally posted to Slack.

## Replacement scoring (deterministic, explainable)
Ranking is done in code, not by the LLM, so it is reproducible:
- **Skill fit:** share of the task's required skills the candidate has *demonstrated* (verified completions), with a smaller weight for self-reported skills.
- **Capacity:** free hours before the deadline after current load and PTO.
- **Recency:** recent verified work with the same skill scores higher.
Candidates without enough free hours are excluded. The LLM only explains the top picks in plain language.

## Permissions (enforced server-side)
| Action | Manager | Employee |
|---|---|---|
| Approve AI-drafted tasks | ✓ | ✗ |
| Submit evidence on own task | ✓ | ✓ |
| Mark binary task complete via passing check | system | system |
| Approve complex task | ✓ | ✗ |
| Approve reassignment | ✓ | ✗ |
| Edit PTO | ✓ | own only |
Enforced with RLS policies plus role checks in server actions. The UI hiding a button is not a permission.

## Integrations
Activity feeds share one table (`activity_events`) with a `source` column. For the MVP a seeder writes realistic events with `source = 'simulated'`, shown with a "Simulated" badge. Real Fusion, Google Drive and GitHub connectors later write the same rows (see `ROADMAP.md`).

## Environments
`web/.env.local` locally, Vercel environment variables in production. Names are listed in `.env.example`.
