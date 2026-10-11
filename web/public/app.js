const KEY = "proofpilot-volunteer-demo-v2";
const seed = {
  people: [
    {
      id: "alex",
      name: "Alex Morgan",
      role: "Event captain",
      skills: ["Volunteer onboarding", "Event coordination"],
      capacity: 8,
      pto: false,
      records: [
        {
          title: "Welcome desk setup",
          skills: ["Volunteer onboarding", "Event coordination"],
          approved_at: "2026-10-05",
          source: "fictional_seed",
        },
        {
          title: "Orientation checklist",
          skills: ["Volunteer onboarding"],
          approved_at: "2026-10-05",
          source: "fictional_seed",
        },
      ],
      history: 2,
    },
    {
      id: "jordan",
      name: "Jordan Lee",
      role: "Volunteer team lead",
      skills: ["Volunteer onboarding", "Event coordination", "CAD"],
      capacity: 8,
      pto: false,
      records: [
        {
          title: "Build-kit packing",
          skills: ["Event coordination"],
          approved_at: "2026-10-05",
          source: "fictional_seed",
        },
        {
          title: "Kit bracket drawing",
          skills: ["CAD"],
          approved_at: "2026-10-05",
          source: "fictional_seed",
        },
      ],
      history: 2,
    },
    {
      id: "sam",
      name: "Sam Rivera",
      role: "Pantry shift lead",
      skills: ["Food handling", "Inventory"],
      capacity: 6,
      pto: false,
      records: [
        {
          title: "Pantry stock count",
          skills: ["Inventory"],
          approved_at: "2026-10-05",
          source: "fictional_seed",
        },
        {
          title: "Food sorting shift",
          skills: ["Food handling"],
          approved_at: "2026-10-05",
          source: "fictional_seed",
        },
      ],
      history: 2,
    },
    {
      id: "taylor",
      name: "Taylor Chen",
      role: "Volunteer coordinator",
      skills: ["Event coordination", "Outreach"],
      capacity: 8,
      pto: false,
      records: [
        {
          title: "Mentor welcome email",
          skills: ["Outreach"],
          approved_at: "2026-10-05",
          source: "fictional_seed",
        },
        {
          title: "Build Day staffing plan",
          skills: ["Event coordination"],
          approved_at: "2026-10-05",
          source: "fictional_seed",
        },
      ],
      history: 2,
    },
    {
      id: "riley",
      name: "Riley Patel",
      role: "Experienced event volunteer",
      skills: ["Volunteer onboarding", "Event coordination", "Outreach"],
      capacity: 4,
      pto: false,
      records: [
        {
          title: "Check-in desk handoff",
          skills: ["Volunteer onboarding"],
          approved_at: "2026-10-05",
          source: "fictional_seed",
        },
        {
          title: "Volunteer orientation",
          skills: ["Volunteer onboarding"],
          approved_at: "2026-10-05",
          source: "fictional_seed",
        },
        {
          title: "Event briefing",
          skills: ["Volunteer onboarding", "Event coordination"],
          approved_at: "2026-10-05",
          source: "fictional_seed",
        },
      ],
      history: 3,
    },
    {
      id: "casey",
      name: "Casey Brooks",
      role: "Mentor program volunteer",
      skills: ["Mentoring", "Outreach"],
      capacity: 6,
      pto: false,
      records: [
        {
          title: "New mentor onboarding",
          skills: ["Mentoring"],
          approved_at: "2026-10-05",
          source: "fictional_seed",
        },
        {
          title: "Student invitation email",
          skills: ["Outreach"],
          approved_at: "2026-10-05",
          source: "fictional_seed",
        },
      ],
      history: 2,
    },
  ],
  tasks: [
    {
      id: "t1",
      title: "Prepare volunteer check-in handoff",
      project: "Community Build Day",
      owner: "alex",
      due: "2026-10-16",
      hours: 3,
      skills: ["Volunteer onboarding"],
      status: "in_progress",
      type: "manager",
      criteria:
        "Volunteer roster and venue map required. Coordinator confirms stations, access instructions, and escalation contact.",
      evidence: ["volunteer-roster.csv"],
      checked: false,
      required_evidence: ["roster", "map"],
    },
    {
      id: "t2",
      title: "Finalize volunteer orientation pack",
      project: "Community Build Day",
      owner: "jordan",
      due: "2026-10-16",
      hours: 1,
      skills: ["Volunteer onboarding"],
      status: "pending_approval",
      type: "manager",
      criteria:
        "Orientation checklist and safety briefing required. Coordinator confirms the briefing is suitable for the event.",
      evidence: ["orientation-checklist.pdf", "safety-briefing.pdf"],
      checked: true,
      required_evidence: ["checklist", "briefing"],
    },
    {
      id: "t3",
      title: "Plan food sorting stations",
      project: "Food Pantry Drive",
      owner: "sam",
      due: "2026-10-16",
      hours: 3,
      skills: ["Food handling"],
      status: "in_progress",
      type: "manager",
      criteria:
        "Station plan and food-handling checklist required. Coordinator reviews safety instructions.",
      evidence: [],
      checked: false,
      required_evidence: ["plan", "checklist"],
    },
    {
      id: "t4",
      title: "Upload event flyer",
      project: "Food Pantry Drive",
      owner: "taylor",
      due: "2026-10-16",
      hours: 0.5,
      skills: ["Outreach"],
      status: "todo",
      type: "exists",
      criteria:
        "Upload one non-empty event flyer. This verifies file presence only.",
      evidence: [],
      checked: false,
      required_evidence: [],
    },
    {
      id: "t5",
      title: "Prepare event captain handoff",
      project: "Community Build Day",
      owner: "riley",
      due: "2026-10-16",
      hours: 3,
      skills: ["Volunteer onboarding"],
      status: "in_progress",
      type: "manager",
      criteria: "Briefing document, contact list, and coordinator approval.",
      evidence: [],
      checked: false,
      required_evidence: ["briefing", "contact"],
    },
    {
      id: "t6",
      title: "Match first-year mentees",
      project: "Mentor Program",
      owner: "casey",
      due: "2026-10-16",
      hours: 2,
      skills: ["Mentoring"],
      status: "todo",
      type: "manager",
      criteria:
        "Proposed mentor pairs and rationale. Coordinator reviews each match.",
      evidence: [],
      checked: false,
      required_evidence: [],
    },
    {
      id: "t7",
      title: "Confirm pantry staffing roster",
      project: "Food Pantry Drive",
      owner: "taylor",
      due: "2026-10-16",
      hours: 1,
      skills: ["Event coordination"],
      status: "pending_approval",
      type: "manager",
      criteria:
        "Roster must cover all event stations. Coordinator confirms assignments.",
      evidence: ["pantry-roster.csv"],
      checked: true,
      required_evidence: ["roster"],
    },
    {
      id: "t8",
      title: "Train welcome desk volunteers",
      project: "Community Build Day",
      owner: "alex",
      due: "2026-10-16",
      hours: 2,
      skills: ["Volunteer onboarding"],
      status: "todo",
      type: "manager",
      criteria:
        "Orientation notes and attendee list. Coordinator verifies readiness.",
      evidence: [],
      checked: false,
      required_evidence: ["notes", "attendee"],
    },
    {
      id: "t9",
      title: "Prepare build-kit inventory",
      project: "Community Build Day",
      owner: "jordan",
      due: "2026-10-16",
      hours: 1,
      skills: ["Event coordination"],
      status: "completed",
      type: "manager",
      criteria: "Coordinator-approved build-kit count.",
      evidence: ["kit-inventory.csv"],
      checked: true,
      required_evidence: [],
    },
    {
      id: "t10",
      title: "Draft volunteer welcome email",
      project: "Mentor Program",
      owner: "riley",
      due: "2026-10-16",
      hours: 2,
      skills: ["Outreach"],
      status: "todo",
      type: "manager",
      criteria: "Email draft with meeting location and next steps.",
      evidence: [],
      checked: false,
      required_evidence: [],
    },
    {
      id: "t11",
      title: "Reconcile pantry donations",
      project: "Food Pantry Drive",
      owner: "sam",
      due: "2026-10-16",
      hours: 2,
      skills: ["Inventory"],
      status: "todo",
      type: "manager",
      criteria: "Inventory report and discrepancy notes.",
      evidence: [],
      checked: false,
      required_evidence: [],
    },
    {
      id: "t12",
      title: "Prepare mentor kickoff agenda",
      project: "Mentor Program",
      owner: "casey",
      due: "2026-10-16",
      hours: 1,
      skills: ["Mentoring"],
      status: "blocked",
      type: "manager",
      criteria: "Kickoff agenda; waiting for room confirmation.",
      evidence: [],
      checked: false,
      required_evidence: [],
    },
  ],
  activity: [
    {
      text: "Jordan submitted the orientation pack for coordinator review",
      time: "Demo \u00b7 12 min ago",
    },
    {
      text: "Alex added the volunteer roster; venue map is missing",
      time: "Demo \u00b7 28 min ago",
    },
    {
      text: "Casey flagged room confirmation as a blocker",
      time: "Demo \u00b7 1 hour ago",
    },
  ],
};
let state;
try {
  state = JSON.parse(localStorage.getItem(KEY)) || structuredClone(seed);
} catch {
  state = structuredClone(seed);
}
let page = "overview",
  query = "",
  statusFilter = "all",
  drafts = [];
const names = {
  overview: "Overview",
  tasks: "Initiatives & tasks",
  team: "Volunteers & capacity",
  meetings: "Meeting notes",
  followups: "Follow-ups",
  integrations: "Integrations",
};
const icons = {
  overview: "◫",
  tasks: "▤",
  team: "♧",
  meetings: "▧",
  followups: "↗",
  integrations: "⊞",
};
const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const person = (id) => state.people.find((p) => p.id === id);
const active = (t) => t.status !== "completed";
const load = (id) =>
  state.tasks
    .filter((t) => t.owner === id && active(t))
    .reduce((n, t) => n + t.hours, 0);
const initials = (n) =>
  n
    .split(" ")
    .map((w) => w[0])
    .join("");
const status = (t) =>
  ({
    todo: "To do",
    in_progress: "In progress",
    pending_approval: "Pending approval",
    completed: "Completed",
    blocked: "Blocked",
  })[t.status] || t.status;
const badge = (t) =>
  `<span class="tag ${t.status === "pending_approval" ? "amber" : t.status === "blocked" ? "red" : t.status === "completed" ? "" : "gray"}">${status(t)}</span>`;
function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    toast("Browser storage unavailable. Changes last for this session only.");
  }
}
function log(text) {
  state.activity.unshift({ text, time: "Just now · demo action" });
  save();
}
function toast(s) {
  const t = document.getElementById("toast");
  t.textContent = s;
  t.hidden = false;
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => (t.hidden = true), 4500);
}
function go(p) {
  page = p;
  query = "";
  statusFilter = "all";
  render();
}
function heading(label, title, subtitle, actions = "") {
  return `<div class="titlebar"><div><div class="eyebrow">${label}</div><h1>${title}</h1><p>${subtitle}</p></div><div class="actions">${actions}</div></div>`;
}
function render() {
  document.getElementById("crumb").textContent = names[page];
  document.getElementById("nav").innerHTML = Object.entries(names)
    .map(
      ([id, name]) =>
        `<button class="${page === id ? "active" : ""}" onclick="go('${id}')"><span>${icons[id]}</span>${name}${id === "tasks" ? `<span class="count">${state.tasks.filter(active).length}</span>` : ""}</button>`,
    )
    .join("");
  document.getElementById("app").innerHTML =
    {
      overview: overview,
      tasks: tasksPage,
      team: teamPage,
      meetings: meetingsPage,
      followups: followupsPage,
      integrations: integrationsPage,
    }[page]() +
    `<p class="page-note">Demo workspace · Fictional records · Changes saved in this browser · Integrations and live AI are not connected.</p>`;
}
function overview() {
  let pending = state.tasks.filter((t) => t.status === "pending_approval"),
    risk = state.tasks.filter(
      (t) =>
        active(t) &&
        (person(t.owner)?.pto ||
          t.status === "blocked" ||
          load(t.owner) > person(t.owner)?.capacity),
    );
  return (
    heading(
      "Your command center",
      "Keep your volunteers moving.",
      "Less chasing. Clearer handoffs. A coordinator who stays in charge.",
      `<button onclick="go('meetings')">▧ Import meeting notes</button><button class="primary" onclick="newTask()">+ New task</button>`,
    ) +
    demoGuide() +
    `<div class="stats">${[
      [
        "Active tasks",
        state.tasks.filter(active).length,
        "Across 3 volunteer initiatives",
      ],
      ["Awaiting approval", pending.length, "Your judgment closes the loop"],
      [
        "Volunteer capacity",
        capacityPercent(),
        "Estimated remaining hours / weekly capacity",
      ],
      ["Needs attention", risk.length, "Absences, blockers or excess workload"],
    ]
      .map(
        ([l, n, f]) =>
          `<div class="stat"><div class="stat-label">${l}</div><div class="stat-num">${n}</div><div class="stat-foot">${f}</div></div>`,
      )
      .join(
        "",
      )}</div><div class="callout"><span class="icon">✧</span><div><h3>${risk.length ? "Capacity needs a closer look." : "Your next move is ready."}</h3><p>${esc(capacitySummary())}</p></div><button class="small" onclick="go('team')">Review capacity →</button></div><div class="grid"><section class="panel"><div class="panel-head"><h2>Initiatives in motion</h2><button class="small quiet" onclick="go('tasks')">View tasks →</button></div>${[
      "Community Build Day",
      "Food Pantry Drive",
      "Mentor Program",
    ]
      .map((p, i) => {
        let ts = state.tasks.filter((t) => t.project === p),
          complete = ts.filter((t) => !active(t)).length,
          percent = ts.length ? Math.round((100 * complete) / ts.length) : 0;
        return `<div class="project"><div class="project-top"><h3>${p}</h3><span class="tag ${ts.some(atRisk) ? "amber" : "gray"}">${ts.some(atRisk) ? "Needs attention" : "Active"}</span></div><p>${["Hands-on engineering outreach, led by volunteers", "Sorting, stocking, and helping neighbors", "Mentorship and support for new students"][i]}</p><div class="bar"><span style="width:${percent}%"></span></div><div class="project-foot"><span>${complete} / ${ts.length} tasks approved</span><span>${percent}% complete</span></div></div>`;
      })
      .join(
        "",
      )}</section><section class="panel"><div class="panel-head"><h2>Ready for your review</h2><span class="tag amber">${pending.length}</span></div>${pending.length ? pending.map((t) => `<div class="review"><div class="eyebrow">${esc(t.project)}</div><h3 style="margin-top:9px">${esc(t.title)}</h3><p>${esc(person(t.owner).name)} · Evidence checklist reviewed</p><button class="small" onclick="review('${t.id}')">Review deliverables →</button></div>`).join("") : '<div class="empty">All caught up. No pending reviews.</div>'}</section></div><div class="grid section-gap"><section class="panel"><div class="panel-head"><h2>Volunteer commitments</h2><button class="small quiet" onclick="go('team')">Explore volunteers →</button></div><div class="table-wrap"><table><thead><tr><th>Volunteer</th><th>Remaining work</th><th>Capacity</th></tr></thead><tbody>${state.people
      .slice(0, 4)
      .map(
        (p) =>
          `<tr><td><strong>${p.name}</strong></td><td>${load(p.id)}h / ${p.pto ? 0 : p.capacity}h</td><td><span class="tag ${p.pto || load(p.id) > p.capacity ? "amber" : "gray"}">${p.pto ? "Unavailable" : load(p.id) > p.capacity ? "Over capacity" : "Available"}</span></td></tr>`,
      )
      .join(
        "",
      )}</tbody></table></div></section><section class="panel"><div class="panel-head"><h2>Recent activity</h2><span class="tag gray">Demo feed</span></div><div class="panel-body">${state.activity
      .slice(0, 4)
      .map(
        (a) =>
          `<div class="activity"><span class="dot"></span><div><p>${esc(a.text)}</p><small>${esc(a.time)}</small></div></div>`,
      )
      .join("")}</div></section></div>`
  );
}
function tasksPage() {
  return (
    heading(
      "The work ledger",
      "Initiatives & tasks",
      "Assignments, evidence, and approvals in one place.",
      `<button class="primary" onclick="newTask()">+ New task</button>`,
    ) +
    `<div class="filters"><input aria-label="Search tasks" placeholder="Search tasks or projects…" value="${esc(query)}" oninput="query=this.value;renderTaskRows()"><select aria-label="Filter status" onchange="statusFilter=this.value;renderTaskRows()"><option value="all">All statuses</option value="todo">To do</option value="in_progress">In progress</option value="pending_approval">Pending approval</option value="completed">Completed</option><option value="blocked">Blocked</option></select></div><section class="panel table-wrap"><table><thead><tr><th>Task / project</th><th>Owner</th><th>Due</th><th>Effort</th><th>Status</th><th></th></tr></thead><tbody id="taskrows">${taskRows()}</tbody></table></section>`
  );
}
function taskRows() {
  let ts = state.tasks.filter(
    (t) =>
      (statusFilter === "all" || t.status === statusFilter) &&
      (t.title + " " + t.project).toLowerCase().includes(query.toLowerCase()),
  );
  return ts.length
    ? ts
        .map(
          (t) =>
            `<tr><td><strong>${esc(t.title)}</strong><p style="font-size:11px">${esc(t.project)}</p></td><td>${esc(person(t.owner)?.name || "Unassigned")}</td><td>${esc(t.due || "Not set")}</td><td>${t.hours}h</td><td>${badge(t)}</td><td><button class="small" onclick="review('${t.id}')">Open →</button></td></tr>`,
        )
        .join("")
    : '<tr><td colspan="6" class="empty">No matching tasks.</td></tr>';
}
function renderTaskRows() {
  document.getElementById("taskrows").innerHTML = taskRows();
}
function teamPage() {
  return (
    heading(
      "People behind the mission",
      "Volunteers & capacity",
      "Match demonstrated experience with the availability to help.",
      `<button onclick="recommend('t1')">Try replacement demo →</button>`,
    ) +
    `<div class="team-grid">${state.people
      .map((p) => {
        let h = load(p.id),
          cap = p.pto ? 0 : p.capacity;
        return `<section class="panel person"><div class="row"><span class="avatar">${initials(p.name)}</span><span class="tag ${p.pto || h > cap ? "amber" : "gray"}">${p.pto ? "Unavailable" : h > cap ? "Over capacity" : "Available"}</span></div><h2 style="margin:16px 0 6px">${p.name}</h2><p>${p.role}</p><div class="skills">${p.skills.map((s) => `<span class="tag gray">${s}</span>`).join("")}</div><div class="row" style="font-size:12px"><span>Committed / available this week</span><strong>${h} / ${cap}h</strong></div><div class="bar"><span style="width:${Math.min(100, cap ? (h / cap) * 100 : 100)}%;background:${h > cap ? "#bd9252" : "#769267"}"></span></div><p>${p.history} coordinator-approved tasks in demo history</p><div class="actions" style="margin-top:18px"><button class="small" onclick="togglePTO('${p.id}')">${p.pto ? "End time off" : "Simulate time off"}</button><button class="small" onclick="profile('${p.id}')">View history</button></div>${p.pto ? `<button class="small primary" style="margin-top:10px" onclick="recommendOwner('${p.id}')">Find coverage →</button>` : ""}</section>`;
      })
      .join(
        "",
      )}</div><p class="hint">Commitments use estimated remaining effort against stated weekly availability. Approved tasks add demonstrated experience; no activity timestamp is treated as hours worked.</p>`
  );
}
function togglePTO(id) {
  let p = person(id);
  p.pto = !p.pto;
  log(`${p.name} ${p.pto ? "started" : "ended"} simulated time off`);
  render();
  toast(
    p.pto
      ? "Time off recorded. Review coverage for their active tasks."
      : "Volunteer available again.",
  );
}
function profile(id) {
  let p = person(id);
  show(
    `<h2>${p.name}</h2><p>${p.role}</p><div class="evidence">${p.history} approved tasks · Declared skills: ${p.skills.join(", ")}<br>Approval records below show demonstrated task experience. Declared skills alone do not certify a volunteer.</div><h3>Approved experience</h3>${(p.records || []).map((r) => `<div class="draft"><strong>${esc(r.title)}</strong><p>${esc(r.skills.join(" · "))} · Approved ${esc(r.approved_at)} · ${r.source === "fictional_seed" ? "Fictional seed record" : "Demo approval"}</p></div>`).join("")}<h3>Tasks in this workspace</h3>${state.tasks
      .filter((t) => t.owner === id)
      .map(
        (t) =>
          `<div class="draft"><strong>${esc(t.title)}</strong> ${badge(t)}</div>`,
      )
      .join("")}`,
  );
}
function recommendOwner(id) {
  let ts = state.tasks.filter((t) => t.owner === id && active(t));
  if (!ts.length) return toast("No active tasks need coverage.");
  recommend(ts[0].id);
}
function recommend(id) {
  let t = state.tasks.find((t) => t.id === id);
  let candidates = state.people
    .filter(
      (p) =>
        p.id !== t.owner &&
        !p.pto &&
        t.skills.every((s) => p.skills.includes(s)),
    )
    .map((p) => ({ p, h: load(p.id), free: p.capacity - load(p.id) }))
    .sort(
      (a, b) =>
        (b.free >= t.hours) - (a.free >= t.hours) ||
        experience(b.p, t) - experience(a.p, t) ||
        b.free - a.free,
    );
  show(
    `<div class="eyebrow">Replacement recommendations · Rule-based demo</div><h2 style="margin-top:10px">Cover ${esc(t.title)}</h2><p>${esc(person(t.owner)?.name)} is assigned ${t.hours} hours. All required skills must match.</p>${candidates.map(({ p, h, free }) => `<div class="draft"><div class="row"><h3>${p.name}</h3><span class="tag ${free < t.hours ? "amber" : ""}">${free < t.hours ? "Insufficient capacity" : "Qualified & available"}</span></div><p>${p.skills.join(" · ")}<br>${experience(p, t)} approved tasks with matching skills · ${Math.max(0, free)}h available · ${h}h already assigned</p><button class="small ${free >= t.hours ? "primary" : ""}" ${free < t.hours ? "disabled" : ""} onclick="reassign('${t.id}','${p.id}')" style="margin-top:12px">Approve reassignment</button></div>`).join("") || '<div class="empty">No eligible replacements. Adjust scope or availability.</div>'}<p class="hint">Recommendations compare declared skills, time off, matching approved task history, and estimated capacity. A coordinator makes the assignment.</p>`,
  );
}
function reassign(tid, pid) {
  let t = state.tasks.find((t) => t.id === tid),
    p = person(pid);
  if (
    p.pto ||
    p.capacity - load(pid) < t.hours ||
    !t.skills.every((s) => p.skills.includes(s))
  )
    return toast(
      "Replacement no longer meets skills or capacity requirements.",
    );
  t.owner = pid;
  log(`Coordinator reassigned ${t.title} to ${p.name}`);
  closeModal();
  render();
  toast("Reassignment approved. Workload updated.");
}
function show(body, footer = "") {
  document.getElementById("modal").innerHTML =
    `<div class="modal-content">${body}</div><div class="modal-footer"><button onclick="closeModal()">Close</button>${footer}</div>`;
  document.getElementById("modal").showModal();
}
function closeModal() {
  document.getElementById("modal").close();
}
function review(id) {
  const t = state.tasks.find((t) => t.id === id);
  show(
    `<div class="eyebrow">${esc(t.project)} · ${t.type === "exists" ? "File presence check" : "Coordinator approval required"}</div><h2 style="margin-top:10px">${esc(t.title)}</h2><div class="row"><p>${esc(person(t.owner)?.name)} · Due ${esc(t.due)}</p>${badge(t)}</div>${active(t) ? `<label>Progress update</label><select aria-label="Update progress" onchange="setProgress('${t.id}',this.value)"><option value="">Choose an update…</option><option value="todo">To do</option><option value="in_progress">In progress</option><option value="blocked">Blocked</option></select>` : ""}<label>Acceptance criteria</label><div class="evidence">${esc(t.criteria)}</div>${t.aiReview ? `<label>AI review</label><div class="evidence"><span class="tag ${t.aiReview.verdict === "pass" ? "" : "amber"}">${esc(t.aiReview.verdict)}</span><p>${esc(t.aiReview.summary)}</p>${t.aiReview.checks.map((c) => `<p><strong>${esc(c.met)} · ${esc(c.criterion)}</strong><br>${esc(c.reason)}</p>`).join("")}${t.aiReview.missing.length ? `<p>Missing: ${esc(t.aiReview.missing.join("; "))}</p>` : ""}<p class="hint">AI · ${esc(t.aiReview.provider)} · ${esc(t.aiReview.model)} · ${esc(t.aiReview.at)}</p></div>` : ""}<label>Submitted evidence</label><div class="evidence">${t.evidence.length ? t.evidence.map((e) => "▧ " + esc(e)).join("<br>") : "No evidence submitted."}</div>${t.status !== "completed" ? `<input type="file" id="evidenceFile" multiple aria-label="Upload task evidence"><p class="hint">Text-like files are stored in this browser (up to 15,000 characters) and sent to the AI when you run a review. Other file contents cannot be read; their filenames alone do not prove quality.</p><button style="margin-top:12px" onclick="attach('${id}')">Add evidence</button><label>Review result</label><div class="evidence">${esc(t.checkSource || "Not reviewed")}<br>${t.checked ? "Evidence checklist reviewed. Quality and suitability remain a coordinator decision." : "Evidence has not passed the demo checklist. File activity alone cannot prove completion."}</div>` : '<div class="evidence">Completed and recorded in the task history.</div>'}`,
    t.status === "completed"
      ? ""
      : `<button onclick="checkEvidence('${id}')">Review evidence</button>${t.type === "manager" && t.checked ? `<button class="primary" onclick="approve('${id}')">Coordinator: approve</button>` : ""}`,
  );
}
async function attach(id) {
  const files = Array.from(
    document.getElementById("evidenceFile").files,
  ).filter((f) => f.size > 0);
  if (!files.length) return toast("Select non-empty evidence files first.");
  const t = state.tasks.find((t) => t.id === id);
  const docs = await Promise.all(
    files.map(async (file) => {
      let text = null;
      if (
        /\.(txt|md|csv|json)$/i.test(file.name) ||
        file.type.startsWith("text/")
      ) {
        try {
          text = (await file.slice(0, 60000).text()).slice(0, 15000);
        } catch {
          /* unreadable evidence stays null */
        }
      }
      return { name: file.name, size: file.size, type: file.type, text };
    }),
  );
  if (!active(t)) return toast("Task is already completed.");
  t.evidence.push(...docs.map((d) => d.name));
  t.evidenceDocs = [...(t.evidenceDocs || []), ...docs];
  t.checked = false;
  delete t.aiReview;
  delete t.checkSource;
  t.status = "in_progress";
  log("Evidence added to " + t.title);
  closeModal();
  review(id);
}
async function checkEvidence(id) {
  const t = state.tasks.find((t) => t.id === id);
  if (!t || !active(t)) return toast("Task is already completed.");
  if (t.verifying) return toast("Evidence review is already running.");
  if (t.type === "exists") {
    if (!t.evidence.length)
      return toast("Missing required file. Task remains open.");
    t.status = "completed";
    t.checked = true;
    recordCompletion(t);
    log("File-presence check completed " + t.title);
    closeModal();
    render();
    return toast("File presence verified. No content-quality claim made.");
  }
  t.verifying = true;
  t.checked = false;
  if (t.status === "pending_approval") t.status = "in_progress";
  save();
  review(id);
  const snapshot = JSON.stringify({
    title: t.title,
    criteria: t.criteria,
    evidence: t.evidence,
    docs: t.evidenceDocs,
  });
  try {
    toast("Reviewing available evidence with AI…");
    const res = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: t.title,
        criteria: t.criteria,
        verification_type: "complex",
        evidence: t.evidence.map(
          (name) =>
            (t.evidenceDocs || []).find((d) => d.name === name) || {
              name,
              size: 0,
              type: "",
              text: null,
            },
        ),
      }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "AI review failed");
    if (
      !active(t) ||
      snapshot !==
        JSON.stringify({
          title: t.title,
          criteria: t.criteria,
          evidence: t.evidence,
          docs: t.evidenceDocs,
        })
    )
      return toast("Evidence changed. Run the review again.");
    t.aiReview = {
      verdict: json.verdict,
      checks: json.checks,
      summary: json.summary,
      missing: json.missing,
      model: json.model,
      provider: json.provider,
      at: new Date().toISOString(),
    };
    t.checkSource = "AI reviewed";
    t.checked = json.verdict === "pass";
    if (t.checked) t.status = "pending_approval";
    else if (t.status === "pending_approval") t.status = "in_progress";
    log(
      "AI reviewed " +
        t.title +
        ": " +
        json.verdict +
        "; coordinator approval still required",
    );
    toast(
      t.checked
        ? "AI reviewed. Coordinator approval required."
        : "Task remains open. " + json.missing.join("; "),
    );
  } catch {
    if (
      !active(t) ||
      snapshot !==
        JSON.stringify({
          title: t.title,
          criteria: t.criteria,
          evidence: t.evidence,
          docs: t.evidenceDocs,
        })
    )
      return toast("Evidence changed. Run the review again.");
    delete t.aiReview;
    const missing = (t.required_evidence || []).filter(
      (required) =>
        !t.evidence.some((e) =>
          e.toLowerCase().includes(required.toLowerCase()),
        ),
    );
    t.checkSource = "Local checklist (AI unavailable)";
    t.checked = Boolean(t.evidence.length && !missing.length);
    if (t.checked) t.status = "pending_approval";
    else if (t.status === "pending_approval") t.status = "in_progress";
    log(t.checkSource + " for " + t.title + "; filename presence only");
    toast(
      t.checkSource +
        (t.checked
          ? ". Coordinator must review contents."
          : ". Missing: " + (missing.join(", ") || "evidence")),
    );
  } finally {
    delete t.verifying;
    save();
    render();
    review(id);
  }
}
function approve(id) {
  let t = state.tasks.find((t) => t.id === id);
  if (t.type !== "manager" || !t.checked || t.status !== "pending_approval")
    return toast("Evidence checklist must pass before coordinator approval.");
  t.status = "completed";
  recordCompletion(t);
  log(
    `Coordinator approved ${t.title}; ${person(t.owner).name}'s history updated`,
  );
  closeModal();
  render();
  toast("Work approved. Completion history updated. Demo permissions only.");
}
function newTask() {
  show(
    `<h2>Create a task</h2><label>Title</label><input id="newTitle" placeholder="What needs to get done?"><label>Owner</label><select id="newOwner">${state.people.map((p) => `<option value="${p.id}">${p.name}</option>`).join("")}</select><label>Initiative</label><select id="newProject">${["Community Build Day", "Food Pantry Drive", "Mentor Program"].map((p) => `<option>${p}</option>`).join("")}</select><label>Due date</label><input id="newDue" type="date" value="2026-10-16"><label>Estimated remaining hours</label><input id="newHours" type="number" min="0.5" step="0.5" value="4"><label>Required skills (comma separated)</label><input id="newSkills" placeholder="Volunteer onboarding, Event coordination"><label>Acceptance criteria</label><input id="newCriteria" placeholder="Required deliverables and checks">`,
    `<button class="primary" onclick="createTask()">Create task</button>`,
  );
}
function createTask() {
  let title = document.getElementById("newTitle").value.trim();
  if (!title) return toast("Add a task title.");
  let hours = Number(document.getElementById("newHours").value);
  if (!Number.isFinite(hours) || hours <= 0)
    return toast("Use a positive effort estimate.");
  state.tasks.push({
    id: "t" + Date.now(),
    title,
    owner: document.getElementById("newOwner").value,
    project: document.getElementById("newProject").value,
    due: document.getElementById("newDue").value,
    hours,
    skills: document
      .getElementById("newSkills")
      .value.split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    status: "todo",
    type: "manager",
    criteria:
      document.getElementById("newCriteria").value ||
      "Coordinator review required.",
    evidence: [],
    checked: false,
  });
  log("Coordinator created " + title);
  closeModal();
  render();
  toast("Task created.");
}
const sampleNotes =
  "Alex will finalize the volunteer check-in handoff by 2026-10-14. Jordan will prepare the safety briefing by 2026-10-16. Sam will confirm food sorting stations by 2026-10-15. Taylor will contact the new volunteers.";
function meetingsPage() {
  return (
    heading(
      "From conversation to action",
      "Meeting notes",
      "Capture the decisions. Review the assignments. Keep moving.",
    ) +
    `<div class="grid"><section class="panel"><div class="panel-head"><h2>Import your notes</h2><span class="tag gray">AI extraction</span></div><div class="panel-body"><label style="display:block;font-size:12px;margin-bottom:8px">Initiative</label><select id="meetingProject" style="width:100%;margin-bottom:18px"><option>Community Build Day</option><option>Food Pantry Drive</option><option>Mentor Program</option></select><label for="notes" style="font-size:12px;display:block;margin-bottom:10px">Paste meeting notes</label><textarea id="notes" placeholder="Alex will prepare the volunteer roster by 2026-10-14…">${sampleNotes}</textarea><div class="actions" style="margin-top:14px"><button class="primary" onclick="extract()">✧ Extract draft tasks</button><label class="small" style="cursor:pointer">Upload .txt <input type="file" accept=".txt" style="display:none" onchange="readNotes(this)"></label></div><p class="hint">An LLM drafts tasks, owners, dates and acceptance criteria; nothing is assigned until you approve. Falls back to a local parser if AI is unavailable.</p></div></section><section class="panel"><div class="panel-head"><h2>Your review matters</h2></div><div class="panel-body"><h3>01 &nbsp; Capture</h3><p>Bring in notes from your meeting.</p><h3 style="margin-top:24px">02 &nbsp; Confirm</h3><p>Check the task, owner, deadline, and effort. Ambiguous assignments need your judgment.</p><h3 style="margin-top:24px">03 &nbsp; Assign</h3><p>Only approved drafts enter the work ledger and update team capacity.</p></div></section></div><section id="draftArea" class="section-gap"></section>`
  );
}
function readNotes(input) {
  const file = input.files[0];
  if (file)
    file.text().then((text) => (document.getElementById("notes").value = text));
}
function localExtract(notes) {
  return notes
    .split(/\n|(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => {
      let p = state.people.find((p) =>
        new RegExp("\\b" + p.name.split(" ")[0] + "\\b", "i").test(s),
      );
      let date = s.match(/\b\d{4}-\d{2}-\d{2}\b/);
      return {
        title: s
          .replace(/\bby \d{4}-\d{2}-\d{2}\b[.!]?/, "")
          .replace(/[.!]$/, ""),
        owner: p?.id || "",
        due: date?.[0] || "",
        hours: 1,
      };
    });
}
let extractSource = "Local parser";
async function extract() {
  let notes = document.getElementById("notes").value.trim();
  if (!notes) return toast("Add meeting notes first.");
  const area = document.getElementById("draftArea");
  area.innerHTML = `<section class="panel"><div class="panel-body"><p class="hint">Reading notes with AI…</p></div></section>`;
  try {
    const res = await fetch("/api/extract", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        notes,
        project: document.getElementById("meetingProject").value,
        today: new Date().toISOString().slice(0, 10),
        people: state.people.map((p) => ({
          id: p.id,
          name: p.name,
          skills: p.skills,
        })),
      }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "AI extraction failed");
    drafts = json.tasks.map((t) => ({
      title: t.title,
      owner: t.suggested_owner_id || "",
      due: t.due_date || "",
      hours: t.estimated_hours || 1,
      hoursEstimated: Boolean(t.estimated_hours),
      skills: t.required_skills,
      type: t.verification_type === "binary" ? "exists" : "manager",
      criteria: [t.deliverable, ...t.acceptance_criteria]
        .filter(Boolean)
        .join(" "),
      quote: t.source_quote,
      ownerReason: t.owner_reason,
    }));
    extractSource = `AI · ${json.provider} · ${json.model} · ${(json.latencyMs / 1000).toFixed(1)}s`;
  } catch (e) {
    drafts = localExtract(notes);
    extractSource = "Local parser (AI unavailable: " + e.message + ")";
  }
  renderDrafts();
}
function renderDrafts() {
  document.getElementById("draftArea").innerHTML =
    `<section class="panel"><div class="panel-head"><h2>${drafts.length} drafts to review</h2><span class="tag gray">${esc(extractSource)}</span><button class="primary small" onclick="importDrafts()">Approve selected tasks</button></div><div class="panel-body">${drafts.map((d, i) => `<div class="draft"><div class="row"><h3>Draft ${i + 1}</h3><input type="checkbox" id="select${i}" checked aria-label="Select draft ${i + 1}"></div><input id="title${i}" value="${esc(d.title)}" aria-label="Task title"><div class="filters" style="margin:10px 0 0"><select id="owner${i}" aria-label="Owner"><option value="">Needs owner</option>${state.people.map((p) => `<option value="${p.id}" ${p.id === d.owner ? "selected" : ""}>${p.name}</option>`).join("")}</select><input type="date" id="due${i}" value="${d.due}" aria-label="Deadline"><input type="number" id="hours${i}" value="${d.hours}" min="0.5" step="0.5" aria-label="Remaining effort hours" style="width:90px;min-width:90px"></div>${d.quote ? `<p class="hint">From notes: “${esc(d.quote)}”${d.ownerReason ? " · " + esc(d.ownerReason) : ""}</p>` : ""}${d.skills ? `<p class="hint">Skills: ${esc(d.skills.join(", ") || "none")} · ${d.type === "exists" ? "File-presence check" : "Coordinator approval required"}${d.criteria ? " · " + esc(d.criteria) : ""}</p>` : ""}<p class="hint">${!d.due ? "Deadline not found. " : ""}${!d.owner ? "Owner not found. " : ""}${d.hoursEstimated ? "AI effort estimate" : "Default effort: 1h"} — review before assigning. Initiative: ${esc(document.getElementById("meetingProject").value)}.</p></div>`).join("")}</div></section>`;
}
function importDrafts() {
  let selected = drafts
    .map((d, i) => ({
      i,
      title: document.getElementById("title" + i).value.trim(),
      owner: document.getElementById("owner" + i).value,
      due: document.getElementById("due" + i).value,
      hours: Number(document.getElementById("hours" + i).value),
    }))
    .filter((d) => document.getElementById("select" + d.i).checked);
  if (!selected.length) return toast("Select at least one draft.");
  if (
    selected.some(
      (d) =>
        !d.title ||
        !d.owner ||
        !d.due ||
        !Number.isFinite(d.hours) ||
        d.hours <= 0,
    )
  )
    return toast(
      "Confirm titles, owners, dates, and positive effort for every selected draft.",
    );
  selected.forEach((d, i) =>
    state.tasks.push({
      ...d,
      id: "mt" + Date.now() + i,
      project: document.getElementById("meetingProject").value,
      skills: drafts[d.i].skills?.length
        ? drafts[d.i].skills
        : inferSkills(d.title),
      status: "todo",
      type: drafts[d.i].type || "manager",
      criteria:
        drafts[d.i].criteria ||
        "Coordinator must define and review deliverables.",
      source_quote: drafts[d.i].quote,
      evidence: [],
      checked: false,
    }),
  );
  log(`Coordinator approved ${selected.length} meeting-note tasks`);
  go("tasks");
  toast("Approved tasks added. Volunteer commitments updated.");
}
function followupsPage() {
  let ts = state.tasks.filter(
    (t) =>
      active(t) &&
      (!t.evidence.length ||
        person(t.owner)?.pto ||
        t.status === "blocked" ||
        (t.due && t.due < new Date().toLocaleDateString("en-CA"))),
  );
  return (
    heading(
      "Keep the loop moving",
      "Follow-ups",
      "Specific nudges for missing evidence, blockers, and handoffs.",
      `<span class="tag gray">Drafts only · Slack not connected</span>`,
    ) +
    `<section class="panel"><div class="panel-head"><h2>Suggested follow-ups</h2><span class="tag">${ts.length} drafts</span></div>${ts.map((t) => `<div class="review"><div class="row"><h3>${esc(t.title)}</h3>${badge(t)}</div><p>${esc(person(t.owner).name)} · ${person(t.owner).pto ? "Coverage needed" : t.status === "blocked" ? "Blocked" : t.due && t.due < new Date().toLocaleDateString("en-CA") ? "Overdue" : "Evidence missing"}</p><div class="evidence">${esc(message(t))}</div><p class="hint">${t.followupDraft && message(t) === t.followupDraft.message ? `AI draft · ${esc(t.followupDraft.provider)} · ${esc(t.followupDraft.model)} · ${esc(t.followupDraft.tone)}<br>Next step: ${esc(t.followupDraft.suggested_next_step)}` : esc(t.followupSource || "Template draft")}</p><div class="actions"><button class="small" onclick="message(state.tasks.find(t => t.id === '${t.id}'), true)" ${t.drafting ? "disabled" : ""}>Draft with AI</button><button class="small" onclick="copyFollowup('${t.id}')">Copy message</button><button class="small quiet" onclick="review('${t.id}')">View task →</button>${person(t.owner).pto ? `<button class="small" onclick="recommend('${t.id}')">Find coverage</button>` : ""}</div></div>`).join("") || '<div class="empty">No follow-ups needed.</div>'}</section><p class="hint">Template or labelled AI drafts. Copy to clipboard only; nothing is sent. AI drafts use supplied task facts and never infer hours worked.</p>`
  );
}
function message(t, draftWithAI = false) {
  if (draftWithAI)
    return (async () => {
      const signature = JSON.stringify({
        owner: t.owner,
        title: t.title,
        criteria: t.criteria,
        due: t.due,
        status: t.status,
        unavailable: person(t.owner)?.pto,
        evidence: t.evidence,
      });
      if (t.drafting) return;
      t.drafting = true;
      try {
        toast("Drafting follow-up with AI…");
        const res = await fetch("/api/followup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            employee_name: person(t.owner).name,
            task: {
              title: t.title,
              criteria: t.criteria,
              status: t.status,
              unavailable: Boolean(person(t.owner).pto),
            },
            reason:
              t.status === "blocked"
                ? "blocked"
                : t.due && t.due < new Date().toLocaleDateString("en-CA")
                  ? "overdue"
                  : "missing_evidence",
            due_date: t.due || null,
            last_activity: null,
          }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "AI drafting failed");
        if (
          signature !==
          JSON.stringify({
            owner: t.owner,
            title: t.title,
            criteria: t.criteria,
            due: t.due,
            status: t.status,
            unavailable: person(t.owner)?.pto,
            evidence: t.evidence,
          })
        )
          return toast("Task changed. Draft again.");
        t.followupDraft = { ...json, signature };
        toast("AI draft ready. Nothing was sent.");
      } catch {
        delete t.followupDraft;
        t.followupSource = "Template (AI unavailable)";
        toast("AI unavailable. Template retained; nothing was sent.");
      } finally {
        delete t.drafting;
        save();
        render();
      }
      return;
    })();
  const signature = JSON.stringify({
    owner: t.owner,
    title: t.title,
    criteria: t.criteria,
    due: t.due,
    status: t.status,
    unavailable: person(t.owner)?.pto,
    evidence: t.evidence,
  });
  if (t.followupDraft?.signature === signature) return t.followupDraft.message;
  return person(t.owner).pto
    ? `Hi ${person(t.owner).name.split(" ")[0]}, we're arranging coverage for “${t.title}” while you are unavailable. Please share any handoff context when you're available. A coordinator will approve the replacement.`
    : `Hi ${person(t.owner).name.split(" ")[0]}, a quick check on “${t.title}”, due ${t.due || "date not set"}. Please add the required evidence or flag a blocker: ${t.criteria} You can review the task in ProofPilot.`;
}
async function copyFollowup(id) {
  try {
    await navigator.clipboard.writeText(
      message(state.tasks.find((t) => t.id === id)),
    );
    toast("Draft copied. No message was sent.");
  } catch {
    toast("Clipboard unavailable. Select the draft text to copy.");
  }
}
function integrationsPage() {
  return (
    heading(
      "Built to connect",
      "Integrations",
      "The workflow is ready. Live data connections come next.",
    ) +
    `<div class="integration-grid">${[
      [
        "Bloomerang",
        "Future connection for volunteer profiles, shifts, and activity. No Bloomerang account or API is connected in this demo.",
      ],
      [
        "Slack",
        "Outgoing, coordinator-approved reminders and handoff notifications. Two-way responses planned later.",
      ],
      [
        "Google Drive",
        "Link deliverables and inspect available file metadata. Open-time and session data only when actually available.",
      ],
      [
        "AI & database",
        "Live LLM task extraction, evidence assistance, shared records, and authenticated coordinator permissions. Engineering-club Fusion integration can follow later.",
      ],
    ]
      .map(
        ([name, desc]) =>
          `<section class="panel integration"><div class="row"><h2>${name}</h2><span class="tag gray">Planned</span></div><p>${desc}</p><button class="small" onclick="toast('Integration planned for the next build. No account is connected.')">View connection status →</button></section>`,
      )
      .join(
        "",
      )}</div><section class="panel section-gap"><div class="panel-head"><h2>Demo workspace controls</h2></div><div class="panel-body"><p>Export your current records to share with your partner. Reset restores the fictional starting scenario.</p><div class="actions" style="margin-top:15px"><button onclick="exportData()">Export JSON</button><button onclick="resetDialog()">Reset demo</button></div><p class="hint">This version uses browser storage, with no shared database or enforced coordinator identity. Do not use it for real volunteer records yet.</p></div></section>`
  );
}
function exportData() {
  let blob = new Blob(
    [
      JSON.stringify(
        {
          ...state,
          meta: {
            app: "ProofPilot",
            demo: true,
            exported_at: new Date().toISOString(),
          },
        },
        null,
        2,
      ),
    ],
    { type: "application/json" },
  );
  let a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "proofpilot-demo-data.json";
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  toast("Demo records exported.");
}
function resetDialog() {
  show(
    "<h2>Reset the demo workspace?</h2><p>This replaces changes in this browser with the original fictional records. Export first to keep your work.</p>",
    `<button class="primary" onclick="resetDemo()">Reset demo</button>`,
  );
}
function resetDemo() {
  state = structuredClone(seed);
  save();
  closeModal();
  render();
  toast("Starting scenario restored.");
}

function atRisk(t) {
  return (
    active(t) &&
    (person(t.owner)?.pto ||
      t.status === "blocked" ||
      load(t.owner) > person(t.owner)?.capacity)
  );
}
function capacityPercent() {
  const available = state.people.reduce(
    (n, p) => n + (p.pto ? 0 : p.capacity),
    0,
  );
  return available
    ? Math.round(
        (state.people.reduce((n, p) => n + load(p.id), 0) / available) * 100,
      ) + "%"
    : "No availability";
}
function capacitySummary() {
  const p = state.people.find(
    (p) => p.pto && state.tasks.some((t) => active(t) && t.owner === p.id),
  );
  if (p)
    return (
      p.name +
      " is unavailable. Review their active commitments and find a qualified volunteer for coverage."
    );
  const overloaded = state.people.find((p) => load(p.id) > p.capacity);
  if (overloaded)
    return (
      overloaded.name +
      " has " +
      load(overloaded.id) +
      " hours committed against " +
      overloaded.capacity +
      " available. Review a handoff before adding more work."
    );
  const blocked = state.tasks.find((t) => t.status === "blocked");
  return blocked
    ? blocked.title +
        " is blocked. Ask what help is needed before sending another reminder."
    : "Commitments are within stated availability. Check upcoming deliverables and coordinator reviews.";
}
function experience(p, t) {
  return (p.records || []).filter(
    (r) =>
      r.verification_type !== "exists" &&
      t.skills.length &&
      t.skills.every((s) => r.skills.includes(s)),
  ).length;
}
function recordCompletion(t) {
  const p = person(t.owner);
  p.records ||= [];
  if (!p.records.some((r) => r.task_id === t.id)) {
    p.records.push({
      task_id: t.id,
      title: t.title,
      skills: [...t.skills],
      approved_at: new Date().toISOString().slice(0, 10),
      source: "demo_approval",
      verification_type: t.type,
    });
    p.history = p.records.length;
  }
}
function inferSkills(title) {
  return /orientation|briefing|check-in|onboarding/i.test(title)
    ? ["Volunteer onboarding"]
    : /food|sorting/i.test(title)
      ? ["Food handling"]
      : /mentor/i.test(title)
        ? ["Mentoring"]
        : /email|contact|outreach/i.test(title)
          ? ["Outreach"]
          : ["Event coordination"];
}
function demoGuide() {
  return `<section class="demo-guide"><div class="row"><div><span class="eyebrow">Bloomerang challenge · Guided demo</span><h3 style="margin:8px 0 0">From meeting notes to a confident handoff.</h3></div><button class="small quiet" onclick="go('integrations')">Demo controls</button></div><div class="demo-steps"><button onclick="go('meetings')"><b>01</b><span>Capture commitments<small>Review tasks from meeting notes</small></span></button><button onclick="review('t2')"><b>02</b><span>Approve real deliverables<small>Grow Jordan's onboarding experience</small></span></button><button onclick="go('team')"><b>03</b><span>Handle time off<small>Mark Alex unavailable</small></span></button><button onclick="recommend('t1')"><b>04</b><span>Find the right coverage<small>Compare skills, history, and capacity</small></span></button></div></section>`;
}
function setProgress(id, value) {
  if (!value) return;
  const t = state.tasks.find((t) => t.id === id);
  if (!active(t) || !["todo", "in_progress", "blocked"].includes(value)) return;
  t.status = value;
  t.checked = false;
  log(person(t.owner).name + " updated " + t.title + " to " + status(t));
  closeModal();
  review(id);
  render();
  toast("Progress recorded. Completion still requires evidence and review.");
}
render();
