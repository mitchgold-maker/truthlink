# Rules for AI coding agents

Read this before writing code. It applies to Claude Code, Codex, Kiro and any other agent working in this repo.

## Context
- Hackathon MVP for c0mpiled-15 (Oct 11 2026). **All product code must be written during the event.** Use public scaffolders, npm libraries and APIs; never copy code from earlier prototypes.
- Goal: the demo loop in `docs/DEMO_SCRIPT.md` working end to end, reliably. Steps 1–5 before anything else.
- Specs: `docs/PRD.md`, `docs/DATA_MODEL.md`, `docs/AI_CONTRACTS.md`, `docs/ARCHITECTURE.md`.

## Non-negotiable product rules
1. **Permissions live in the backend.** Manager-only actions (approving complex tasks, approving reassignments, approving AI-drafted tasks) are enforced in server code and in Postgres (RLS policies or checked server actions), never only in the UI or an AI prompt.
2. **AI never completes complex work.** Binary existence checks may set a task to `complete`. Complex deliverables (CAD, reports, analysis) can at most reach `ai_reviewed`; only a manager approval sets `complete`. Every decision is stored with its evidence and the deciding user.
3. **Real records only.** Dashboard numbers come from database queries. No hardcoded statistics.
4. **Never fabricate working time.** Work-session duration is shown only when a source reports a session. Never infer hours from opened/modified timestamps.
5. **Label simulated data.** Simulated integration activity (Fusion, Google Drive, GitHub) is stored with `source = 'simulated'` and shown with a "Simulated" badge.
6. **Validate every AI response** against its Zod schema before it touches the database. On failure: retry once, then surface an error. Never write unvalidated AI output.
7. **Secrets** only in `.env.local` and Vercel environment variables. Service-role keys are used only on the server.

## Conventions
- TypeScript strict. Next.js App Router with server actions or route handlers for mutations.
- UI: shadcn/ui components + Tailwind. Keep it clean SaaS style; function over polish.
- Database changes as Supabase SQL migrations in `web/supabase/migrations/`.
- Imported datasets follow `data/README.md`. Seed scripts must be re-runnable.
- Small commits after every working step: `feat:`, `fix:`, `chore:`, `docs:` prefixes. Reference the issue (`#12`).
- When you finish an issue's acceptance criteria, say which criteria you verified and how.

## Parallel lanes (avoid conflicts)
- Lane UI: `web/app/(dashboard)/**`, `web/components/**`
- Lane API/DB: `web/app/api/**`, `web/lib/db/**`, `web/supabase/**`
- Lane AI: `web/lib/ai/**` (prompts, schemas, calls)
One agent per lane at a time. Pull before starting; commit and push often.
