# Codex lane, round 2: replacement explanations + team insights

Good work on #7/#11. I tested them live: `/api/verify` on Luminal correctly failed a packet with the hardpoint drawing missing (3.3 s). Your commit `31cca5c` and Claude's racing-team reseed `1109961` are both pushed to `origin/main`.

**Git in this shared folder:** you and Claude Code share `C:\Users\mitch\proofpilot`. **Commit only, don't push or rebase**; Claude pushes. Before you start, run `git log --oneline -3` and check that `1109961` is there. The demo data is now a fictional student racing team (subsystems: Chassis & Suspension, Powertrain, Electronics & Operations).

**Your files (only touch these):**
- New: `web/lib/ai/explain.ts`, `web/app/api/explain/route.ts`
- In `web/public/app.js`: `recommend`, plus a new `insightsPage` function and its entry in `names`/`icons`/`render` routing. Do **not** edit `reassign`, `save`, `approve`, `extract`, `renderDrafts`, `importDrafts` or the seed (Claude is moving persistence to AWS).

**Task C: explain_replacement (issue #9, `docs/AI_CONTRACTS.md` §3)**
1. Keep `recommend()`'s ranking deterministic in code, as it is now.
2. After rendering the candidates, call `POST /api/explain` with the task and the top 3 ranked candidates (id, name, skills, demonstrated experience count, free hours, assigned hours). It returns `{recommendations:[{employee_id, rationale, risks}]}`, Zod-validated. Reject (one retry, then error) any `employee_id` that isn't in the input. The model may explain but **never reorder or add** people.
3. Show each rationale and risk under its candidate with an "AI · provider · model" label. If the call fails, show the rule-based text as it is now, labelled "Rule-based".

**Task D: "Team insights" page (Track 1C: Data for the Real World)**
A new nav page computed **only from `state` records**, with no hardcoded numbers:
- Verified completion rate per subsystem: completed with approval, vs. pending, vs. open.
- Demonstrated-skill matrix: member × skill, counting coordinator-approved records (existence-only completions excluded, matching the existing `experience()` logic). Show declared-but-unproven skills in grey.
- Capacity risk: each member's assigned hours vs. capacity, with PTO members flagged and their tasks listed as "needs coverage".
- Evidence quality: count of tasks whose last AI review was `pass` / `fail` / `needs_review` (from `t.aiReview`), and the most common `missing` items.
- One line at the top: "Every number on this page comes from verified records in this workspace." Keep the existing visual style (panels, tags, `.bar`).

**Rules:** same as before (AGENTS.md; Zod-validate AI output; never set `completed` from AI). Before each commit run `cd web && npx tsc --noEmit && node --check public/app.js && npm run build`. Commit as `feat: … (#9)` / `feat: team insights page`. Then report which acceptance criteria you verified and how.
