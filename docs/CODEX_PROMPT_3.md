# Codex lane, round 3: club-feedback features + verification UI

Great work on `62264fb` and `fa750df`. Both are pushed. Read `docs/STRATEGY.md` §1 and §3 and the new row in `validation/LOG.md` (real feedback from a student club). Same git rule: **commit only, don't push**; Claude pushes. Check `git log --oneline -3` shows `57bf0a5` before starting.

**Ownership:** you now own all of `web/public/app.js` and `index.html` **except** `extract`, `localExtract`, `renderDrafts` and `importDrafts`. New AI routes go in `web/lib/ai/*.ts` + `web/app/api/*/route.ts` using `callJson` (it now has a spend guard; don't bypass it). Claude owns `web/lib/verify/**`, `web/lib/ai/llm.ts`, `web/lib/ai/verify.ts`, `integrations/**` and the upcoming database layer.

**E. Show the verification ladder (do first, about 20 min)**
1. Track `t.updated_at` (ISO) whenever a task's status, owner or evidence changes, and seed it on existing tasks (`"2026-10-10T09:00:00"`).
2. In `checkEvidence`, send `since: t.updated_at` to `/api/verify`. Note the response now has `checks[].method` = `measured` | `ai` | `human`, plus `ruleChecks` and `aiChecks`.
3. In `review()`, give each check a badge: **Measured** (green), **AI** (blue), **Needs team lead** (grey). Show a line such as "3 of 4 criteria measured from Fusion · 1 AI check". A `human` check must not block "pending approval" (that is the approver's job). Only `no` blocks it.
4. Add a hint under the evidence upload: "Tip: upload a Fusion snapshot (`*.proofpilot.json`) to verify mass, versions and components."

**F. Decision log (club pain #2)**
- `state.decisions = [{id, at, by, kind: "approval"|"rejection"|"reassignment"|"spec_change", task_id, summary, why, superseded_by: null|id}]`.
- `approve`, a new "Request changes" (reject) button, and `reassign` require a short "why" (one-line input in the modal; it can't be empty) and append a decision.
- New nav page **Decisions**: chronological, filter by subsystem, a "Mark superseded" action linking to the newer decision. Seed 3 fictional past decisions (e.g., "Switched upright from 6061 to 7075 for stiffness", later superseded by "Back to 6061: 7075 stock lead time").

**G. Handoff pack (club pain #1, the headline feature)**
- On a member's profile: a **Generate handoff pack** button → `POST /api/handoff` with that member's verified records, their decisions, open tasks (with criteria and evidence status) and owned subsystems.
- Output (Zod): `{summary, owned_areas[], how_things_work[], open_work:[{task, status, next_step}], lessons[], who_to_ask[]}`. Facts only from the input; mark anything uncertain. Show it as a printable panel with a **Download .md** button.
- If AI is unavailable, build a plain template from the same data, labelled "Template (no AI)".

**H. Ownership map + recurring logistics (club pains #3 and #4)**
- Page section (on Insights or Members): subsystem × owner × backup (backup = best qualified other member by the existing deterministic ranking), computed from state.
- Tasks can be `recurring: "weekly"`. Seed "Order food for Thursday build night" (owner Taylor, Electronics & Operations, `exists` type). Completing it creates next week's instance automatically, and it shows in Follow-ups when it's due within 2 days.

**Rules:** as before (AGENTS.md; Zod; AI never completes; label AI/template/fictional). Run `cd web && npx tsc --noEmit && node --check public/app.js && npm run build` before each commit. Commit per letter: `feat: verification ladder UI`, `feat: decision log`, `feat: handoff pack`, `feat: ownership map + recurring tasks`. Report what you verified after each.
