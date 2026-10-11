# Product requirements

## Problem
Managers lose hours chasing status, checking whether "done" really means done, and figuring out who can pick up work when someone is overloaded or out. Status lives in people's heads, meeting notes and scattered files.

## Product
TruthLink turns meetings into accountable tasks, verifies deliverables with evidence, builds a record of what each person has actually delivered, and uses that record to keep projects on schedule.

## Customers and pilots
- **Target customers:** large engineering organizations, such as aerospace and defense companies like Lockheed Martin and Boeing (no affiliation; this is the market we are building for). Many concurrent programs, deliverables that must be verifiable, specialised skills, and high cost when a key engineer is out.
- **Pilot groups:** student engineering clubs and design teams. They run real engineering projects with the same problems at small scale, so we test every feature with them and change the product from their feedback (logged in `validation/LOG.md`).

## Users
- **Manager** (program or project manager; in pilots, the club or project lead): creates projects, approves AI-drafted tasks, approves complex deliverables, approves reassignments, sees risk.
- **Employee** (engineer; in pilots, a club member): sees their tasks, submits evidence, sees follow-ups.

The MVP must work for both: full-time engineers (about 40 h/week) and club members (a few hours a week, exams and breaks as PTO). Verified history of who can do what matters in both: turnover in clubs, specialised skills and staffing gaps in companies.

## MVP scope (must work for the demo)

| # | Feature | Must do | Not in MVP |
|---|---|---|---|
| 1 | Meeting notes → tasks | Paste or upload notes. AI extracts tasks with owner, deadline, required skills, deliverable and verification type. Manager edits and approves drafts before they become tasks | Audio transcription |
| 2 | Projects and tasks | Projects, tasks, employees, deadlines, dependencies, statuses in Supabase. Status updates from evidence and approvals | Gantt charts |
| 3 | Evidence verification | Upload a file or link per task. AI compares it to the task's acceptance criteria. Binary checks can complete a task; complex work goes to `ai_reviewed` and needs a manager. All decisions recorded | Deep CAD/file parsing |
| 4 | Employee intelligence | Profiles, skills, weekly capacity, PTO, current load (assigned hours vs available hours), verified completion history. Replacement recommendations ranked by demonstrated skill and free capacity; manager approves the reassignment | Performance reviews |
| 5 | Activity tracking | Show documents worked on, last opened/modified, and work sessions when a source reports them. Simulated Fusion, Drive and GitHub feeds, clearly labelled | Live integrations |
| 6 | Follow-up agent | Find overdue tasks, missing evidence and blockers. Draft personalised follow-ups. Send to Slack via webhook if time allows | Slack replies (two-way) |
| 7 | Manager dashboard | Project progress, assignments, workload, recent activity, pending approvals, at-risk tasks. Approve and reassign from the dashboard | Custom reporting |

## Definitions
- **Binary verification:** the requirement is existence or format (for example "upload the signed PDF", "link the merged PR"). Passing can mark the task `complete`.
- **Complex verification:** judgement is needed (CAD model, report quality, analysis). AI can only summarise and flag gaps; status becomes `ai_reviewed` until a manager decides.
- **Demonstrated capability:** a skill counts as demonstrated only when the employee has a task with that skill that reached `complete` through verification or manager approval.
- **Load:** sum of estimated hours of open tasks due in the window ÷ available hours in the window (capacity minus PTO).

## Success criteria for the demo
- Every number on screen comes from the database.
- The full loop (steps 1–5 in `DEMO_SCRIPT.md`) runs on the deployed URL with the partner's dataset, twice in a row, without manual database edits.
- An employee account cannot approve a complex task or a reassignment, even by calling the API directly.

## Out of scope
Billing, multi-tenant orgs, mobile app, two-way Slack, real Fusion/Drive/GitHub connections. See `ROADMAP.md`.
