# ProofPilot — Bloomerang challenge demo

A buildless volunteer coordination website. `dist/index.html` contains the interface and styles; `dist/app.js` contains the fictional seed records, local state, and interaction logic. The native Site is private.

## Current demo

- Coordinator overview, three initiatives, six fictional volunteers, twelve tasks.
- Review and import meeting-note drafts; local sentence parser, not live AI.
- Required-deliverable filename checks; complex tasks require a coordinator approval action.
- Non-empty file presence can complete existence-only tasks; file contents are not stored.
- Approval records build skill-specific demonstrated experience. Existence-only completions are excluded from experience matching.
- Weekly availability, time off, estimated commitments, qualified coverage suggestions, coordinator-approved reassignment.
- Follow-up drafts; no external messages sent.
- Local browser persistence and JSON export. The new volunteer demo uses a different storage key from the original engineering demo, preserving the old records.

## Demonstration

1. Meeting notes: extract drafts, confirm missing deadlines, and approve selected assignments.
2. Review Jordan's orientation pack and approve it; inspect their experience history.
3. Volunteers & capacity: mark Alex unavailable.
4. Find coverage for the check-in handoff; compare Jordan's demonstrated experience with Riley's inadequate capacity.
5. Approve reassignment. Open the task and note the missing venue map; no automatic completion is possible.
6. Show targeted follow-up drafts and the activity feed.

## Next backend work

Keep the task verification type `manager` stable even though UI terminology is Coordinator. Implement server-enforced authorization, shared persistent records, live LLM extraction, evidence storage, and Slack delivery. The current UI role and local approval guards are demo controls, not authentication.

Volunteer records: id, name, role, skills[], capacity (weekly hours), pto (unavailable flag), history (record count), records[].

Tasks: id, title, project, owner, due (ISO date), hours (remaining estimate), skills[], status, type (`manager` or `exists`), criteria, evidence[] (filenames), checked, required_evidence[] (demo filename tokens).

Approval records: task_id, title, skills[], approved_at, source, verification_type.

Recommended API contract: dashboard read; meeting draft extraction; evidence submit/check; authenticated coordinator approval; volunteer availability; ranked coverage read; authenticated reassignment; approved notification send. Replace local adapters rather than changing the visible workflow.
