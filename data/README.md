# Dataset contract

Test data is imported by a seed script during the build. Put files in `data/seed/` using these names and shapes so they import without changes. Use fictional people only; no real personal data. For the demo, model a fictional aerospace engineering program (full-time engineers, about 40 h/week, real-looking deliverables: CAD, stress analysis, test reports, reviews), shaped by what our club pilot groups tell us. Do not use real company names, programs or people. A second small club dataset is optional for showing the pilot.

## Files

### `employees.json`
```json
[ { "key": "emp_alex", "full_name": "Alex Rivera", "role": "employee", "title": "Mechanical Engineer",
    "email": "alex@example.com", "weekly_capacity_hours": 40,
    "skills": [ { "name": "CAD", "level": 4 }, { "name": "FEA", "level": 3 } ] } ]
```
`role` is `manager` or `employee`. Include at least one manager. Use `example.com` emails.

### `projects.json`
```json
[ { "key": "proj_drone", "name": "Drone Frame Redesign", "description": "…", "owner": "emp_jordan", "due_date": "2026-11-15" } ]
```

### `tasks.json` (existing tasks, optional)
```json
[ { "key": "task_frame_cad", "project": "proj_drone", "title": "Frame CAD v2", "description": "…",
    "assignee": "emp_alex", "required_skills": ["CAD"], "estimated_hours": 12, "due_date": "2026-10-20",
    "status": "in_progress", "verification_type": "complex",
    "acceptance_criteria": ["Exported STEP file", "Mass under 1.2 kg noted"], "depends_on": [] } ]
```
`status`: `todo`, `in_progress`, `submitted`, `ai_reviewed`, `complete`, `blocked`.

### `history.json` (past verified completions that build demonstrated skills)
```json
[ { "employee": "emp_sam", "task_title": "Bracket FEA", "skills": ["FEA"], "completed_on": "2026-09-02", "verified_by": "emp_jordan" } ]
```

### `pto.json`
```json
[ { "employee": "emp_alex", "starts_on": "2026-10-13", "ends_on": "2026-10-17" } ]
```

### `activity.json` (simulated integration events)
```json
[ { "employee": "emp_alex", "source": "simulated", "document_name": "frame_v2.f3d", "event": "modified",
    "occurred_at": "2026-10-11T13:05:00-04:00", "session_minutes": null } ]
```
`event`: `opened`, `modified`, `session`. Give `session_minutes` only for `session` events. Never derive it from timestamps.

### `meetings/*.md`
Raw meeting notes for demo step 1, one file per meeting.

### `evidence/`
Sample evidence files for demo step 3 (PDFs, images, exported files). Name them after the task key, for example `task_frame_cad__report.pdf`.

## Demo-critical cases to include
- One **binary** task whose evidence clearly passes, and one that clearly fails.
- One **complex** task with good evidence for the manager-approval step.
- One employee who goes on PTO with at-risk tasks, and at least two possible replacements: one with the self-reported skill only, one with **demonstrated** history of that skill and free capacity (the right answer).
- One overdue task and one task with missing evidence, for follow-ups.
