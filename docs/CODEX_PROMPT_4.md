# Codex lane, round 4: database sync, event log, performance view, live Fusion evidence

Same git rule: **commit only**; Claude pushes. Start with `git log --oneline -3` (expect `6055225` or later). Your uncommitted `app.js` work includes Claude's two TruthLink renames, so keep them.

New server routes (already built by Claude, MongoDB Atlas-backed; each returns **503 when the database is not configured**, so the UI must keep working offline):
- `GET/PUT /api/state?workspace=demo-racing-team`: body/response `{people, tasks, decisions, activity}`
- `POST /api/events`: one event or an array (schema in `web/app/api/events/route.ts`)
- `GET /api/metrics`: `{members:[{member_id, skill, completed, first_pass_rate, avg_rework_cycles, median_cycle_days, estimate_accuracy}], tasks:[{task_id, stage, days_in_stage, rework_cycles}]}`
- `GET /api/fusion/snapshot` (list) and `?document=<name>`: `{latest, previous}` from the Fusion watcher add-in

**I. Shared state (first)**
On load, `GET /api/state`: if it returns a state, use it; if `state: null`, use the seed and `PUT` it. In `save()`, keep localStorage and also `PUT /api/state`, 800 ms after the last change. On 503 or error, keep working locally and show a small header tag "Offline · saved on this device"; when it succeeds, show "Synced · MongoDB Atlas".

**J. Event log**
Add `track(kind, task, extra)` that `POST`s to `/api/events`: `{task_id, task_title, subsystem: task.project, member_id: task.owner, skills, kind, status, verdict, estimated_hours: task.hours, source}`. Batch it, never block the UI, and drop events silently when offline. Call it on: task created/imported (`created`), owner change (`reassigned`), every status change (`status`), evidence added (`evidence_added`), each verify result (`verified` + verdict), approve (`approved`), request changes (`rejected`).
On approve, add an optional "Hours you actually spent (self-reported, optional)" number input → `hours_reported` event. Never estimate hours from timestamps.

**K. Performance on Team insights**
A new section powered by `/api/metrics` (hide it with "Connect the database to see performance history" on 503):
- member × skill table: completed, first-pass rate, average rework cycles, median days assigned→approved, estimate accuracy (only when self-reported hours exist, labelled "self-reported").
- "Stuck work": tasks sorted by `days_in_stage`, with rework cycles.
- Caption: "Calendar time between recorded events. Hours only when members report them."
Use this data in `recommend()` as a tiebreaker only (first-pass rate in that skill), and say so in the rule-based text.

**L. Live Fusion evidence**
Tasks get an optional `fusion_document` (text field in the new-task modal and the task review modal; seed `t2.fusion_document = "Front Upright"`). In `review()`, when set, show a **Pull latest from Fusion** button → `GET /api/fusion/snapshot?document=…` → attach `latest` as an evidence doc (`name: "<document>.truthlink.json"`, `type: "application/json"`, `text: JSON.stringify(latest)`), then run `checkEvidence`. If `previous` exists, show the diff line: "Mass 551 → 440 g · v3 → v4 · saved by …".

**M. Cleanup**
Remove the leftover volunteer wording in `demoGuide` ("Grow Jordan's onboarding experience" and similar) and use the racing-team story.

Rules as before. Run `cd web && npx tsc --noEmit && node --check public/app.js && npm run build` before each commit. Commit per letter.
