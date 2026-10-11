const KEY = "truthlink-racing-demo-v1";
const seed = {
  people: [
    {
      id: "alex",
      name: "Alex Morgan",
      role: "Suspension lead",
      skills: ["Suspension design", "Testing"],
      capacity: 8,
      pto: false,
      records: [
        {
          title: "Rear upright FEA review",
          skills: ["Suspension design"],
          approved_at: "2026-10-05",
          source: "fictional_seed",
        },
        {
          title: "Shock dyno test plan",
          skills: ["Testing"],
          approved_at: "2026-10-05",
          source: "fictional_seed",
        },
      ],
      history: 2,
    },
    {
      id: "jordan",
      name: "Jordan Lee",
      role: "Chassis engineer",
      skills: ["Suspension design", "Testing", "CAD"],
      capacity: 8,
      pto: false,
      records: [
        {
          title: "Front A-arm geometry check",
          skills: ["Suspension design"],
          approved_at: "2026-10-05",
          source: "fictional_seed",
        },
        {
          title: "Steering rack mount drawing",
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
      role: "Powertrain lead",
      skills: ["Powertrain", "Manufacturing"],
      capacity: 6,
      pto: false,
      records: [
        {
          title: "Intake runner machining",
          skills: ["Manufacturing"],
          approved_at: "2026-10-05",
          source: "fictional_seed",
        },
        {
          title: "Engine dyno log review",
          skills: ["Powertrain"],
          approved_at: "2026-10-05",
          source: "fictional_seed",
        },
      ],
      history: 2,
    },
    {
      id: "taylor",
      name: "Taylor Chen",
      role: "Team manager",
      skills: ["Project management", "Sponsorship"],
      capacity: 8,
      pto: false,
      records: [
        {
          title: "Sponsor update deck",
          skills: ["Sponsorship"],
          approved_at: "2026-10-05",
          source: "fictional_seed",
        },
        {
          title: "Competition registration",
          skills: ["Project management"],
          approved_at: "2026-10-05",
          source: "fictional_seed",
        },
      ],
      history: 2,
    },
    {
      id: "riley",
      name: "Riley Patel",
      role: "Senior suspension engineer",
      skills: ["Suspension design", "Testing", "Sponsorship"],
      capacity: 4,
      pto: false,
      records: [
        {
          title: "Suspension kinematics sweep",
          skills: ["Suspension design"],
          approved_at: "2026-10-05",
          source: "fictional_seed",
        },
        {
          title: "Bump-steer test",
          skills: ["Suspension design", "Testing"],
          approved_at: "2026-10-05",
          source: "fictional_seed",
        },
        {
          title: "Design report: suspension section",
          skills: ["Suspension design"],
          approved_at: "2026-10-05",
          source: "fictional_seed",
        },
      ],
      history: 3,
    },
    {
      id: "casey",
      name: "Casey Brooks",
      role: "Electronics lead",
      skills: ["Electronics", "Sponsorship"],
      capacity: 6,
      pto: false,
      records: [
        {
          title: "Low-voltage harness layout",
          skills: ["Electronics"],
          approved_at: "2026-10-05",
          source: "fictional_seed",
        },
        {
          title: "Sponsor intro email",
          skills: ["Sponsorship"],
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
      title: "Prepare rear suspension design review packet",
      project: "Chassis & Suspension",
      owner: "alex",
      due: "2026-10-16",
      hours: 3,
      skills: ["Suspension design"],
      status: "in_progress",
      type: "manager",
      criteria:
        "Kinematics report and hardpoint drawing required. Team lead confirms load cases and safety factors.",
      evidence: ["rear-kinematics-report.pdf"],
      checked: false,
      required_evidence: ["kinematics", "drawing"],
    },
    {
      id: "t2",
      title: "Finalize front upright drawing package",
      project: "Chassis & Suspension",
      owner: "jordan",
      due: "2026-10-16",
      hours: 1,
      skills: ["Suspension design"],
      status: "pending_approval",
      type: "manager",
      criteria:
        "Upright drawing and Fusion design snapshot required. Upright mass must be 450 g or less, and the design must be saved to the cloud as a new version. Team lead confirms tolerances are manufacturable.",
      evidence: ["front-upright-drawing.pdf", "upright-fea-summary.pdf"],
      checked: true,
      required_evidence: ["drawing", "fea"],
    },
    {
      id: "t3",
      title: "Plan intake manifold machining",
      project: "Powertrain",
      owner: "sam",
      due: "2026-10-16",
      hours: 3,
      skills: ["Manufacturing"],
      status: "in_progress",
      type: "manager",
      criteria:
        "CAM setup sheet and fixture plan required. Team lead reviews machine safety.",
      evidence: [],
      checked: false,
      required_evidence: ["setup", "fixture"],
    },
    {
      id: "t4",
      title: "Upload sponsor logo pack",
      project: "Electronics & Operations",
      owner: "taylor",
      due: "2026-10-16",
      hours: 0.5,
      skills: ["Sponsorship"],
      status: "todo",
      type: "exists",
      criteria:
        "Upload one non-empty logo pack. This verifies file presence only.",
      evidence: [],
      checked: false,
      required_evidence: [],
    },
    {
      id: "t5",
      title: "Prepare suspension test-day handoff",
      project: "Chassis & Suspension",
      owner: "riley",
      due: "2026-10-16",
      hours: 3,
      skills: ["Suspension design"],
      status: "in_progress",
      type: "manager",
      criteria: "Test plan and setup sheet. Team lead approval required.",
      evidence: [],
      checked: false,
      required_evidence: ["plan", "setup"],
    },
    {
      id: "t6",
      title: "Route low-voltage wiring harness",
      project: "Electronics & Operations",
      owner: "casey",
      due: "2026-10-16",
      hours: 2,
      skills: ["Electronics"],
      status: "todo",
      type: "manager",
      criteria: "Harness diagram and pinout. Team lead reviews each connector.",
      evidence: [],
      checked: false,
      required_evidence: [],
    },
    {
      id: "t7",
      title: "Confirm engine dyno schedule",
      project: "Powertrain",
      owner: "taylor",
      due: "2026-10-16",
      hours: 1,
      skills: ["Project management"],
      status: "pending_approval",
      type: "manager",
      criteria:
        "Schedule must cover every planned dyno run. Team lead confirms slots.",
      evidence: ["dyno-schedule.csv"],
      checked: true,
      required_evidence: ["schedule"],
    },
    {
      id: "t8",
      title: "Run shock dyno baseline",
      project: "Chassis & Suspension",
      owner: "alex",
      due: "2026-10-16",
      hours: 2,
      skills: ["Testing"],
      status: "todo",
      type: "manager",
      criteria:
        "Dyno data file and test notes. Team lead verifies the baseline is usable.",
      evidence: [],
      checked: false,
      required_evidence: ["data", "notes"],
    },
    {
      id: "t9",
      title: "Release pedal box CAD",
      project: "Chassis & Suspension",
      owner: "jordan",
      due: "2026-10-16",
      hours: 1,
      skills: ["CAD"],
      status: "completed",
      type: "manager",
      criteria: "Team-lead-approved pedal box model.",
      evidence: ["pedal-box.step"],
      checked: true,
      required_evidence: [],
    },
    {
      id: "t10",
      title: "Draft sponsor thank-you email",
      project: "Electronics & Operations",
      owner: "riley",
      due: "2026-10-16",
      hours: 2,
      skills: ["Sponsorship"],
      status: "todo",
      type: "manager",
      criteria: "Email draft with car photos and next milestones.",
      evidence: [],
      checked: false,
      required_evidence: [],
    },
    {
      id: "t11",
      title: "Reconcile powertrain parts inventory",
      project: "Powertrain",
      owner: "sam",
      due: "2026-10-16",
      hours: 2,
      skills: ["Manufacturing"],
      status: "todo",
      type: "manager",
      criteria: "Inventory sheet and discrepancy notes.",
      evidence: [],
      checked: false,
      required_evidence: [],
    },
    {
      id: "t12",
      title: "Prepare electronics design review agenda",
      project: "Electronics & Operations",
      owner: "casey",
      due: "2026-10-16",
      hours: 1,
      skills: ["Electronics"],
      status: "blocked",
      type: "manager",
      criteria: "Review agenda; waiting for faculty advisor availability.",
      evidence: [],
      checked: false,
      required_evidence: [],
    },
  ],
  activity: [
    {
      text: "Jordan submitted the front upright drawing package for team lead review",
      time: "Demo · 12 min ago",
    },
    {
      text: "Alex uploaded the kinematics report; hardpoint drawing is missing",
      time: "Demo · 28 min ago",
    },
    {
      text: "Casey flagged faculty advisor availability as a blocker",
      time: "Demo · 1 hour ago",
    },
  ],
};
seed.tasks.push({id:"logistics-food",title:"Order food for Thursday build night",project:"Electronics & Operations",owner:"taylor",due:"2026-10-15",hours:0.5,skills:["Project management"],status:"todo",type:"exists",criteria:"Upload one non-empty food order confirmation.",evidence:[],checked:false,required_evidence:[],recurring:"weekly",recurring_series:"logistics-food"});
seed.decisions = [
  {id:"seed-d1",at:"2026-10-07T10:00:00",by:"alex",kind:"spec_change",task_id:"t1",summary:"Switched upright from 6061 to 7075 for stiffness",why:"Explore stiffness improvement",superseded_by:"seed-d2",source:"fictional_seed"},
  {id:"seed-d2",at:"2026-10-08T10:00:00",by:"alex",kind:"spec_change",task_id:"t1",summary:"Back to 6061: 7075 stock lead time",why:"7075 stock would delay the build",superseded_by:null,source:"fictional_seed"},
  {id:"seed-d3",at:"2026-10-09T10:00:00",by:"taylor",kind:"approval",task_id:"t9",summary:"Released pedal box CAD",why:"Team lead reviewed the model for release",superseded_by:null,source:"fictional_seed"}
];
seed.tasks.find(t => t.id === "t2").fusion_document = "Front Upright";
seed.tasks.forEach(t => t.updated_at = "2026-10-10T09:00:00");
let state;
try {
  state = JSON.parse(localStorage.getItem(KEY)) || structuredClone(seed);
} catch {
  state = structuredClone(seed);
}
if (!state.tasks.some(t => t.id === "logistics-food" || t.recurring_series === "logistics-food")) state.tasks.push(structuredClone(seed.tasks.find(t => t.id === "logistics-food")));
state.decisions ||= structuredClone(seed.decisions);
const uprightTask = state.tasks.find(t => t.id === "t2");
if (uprightTask && uprightTask.fusion_document === undefined) uprightTask.fusion_document = "Front Upright";
state.tasks.forEach(t => t.updated_at ||= "2026-10-10T09:00:00");
const taskChanges = new Map(state.tasks.map(t => [t.id, JSON.stringify([t.status,t.owner,t.evidence,t.evidenceDocs])]));
let page = "overview",
  query = "",
  statusFilter = "all",
  drafts = [];
const names = {
  overview: "Overview",
  tasks: "Initiatives & tasks",
  team: "Members & capacity",
  decisions: "Decisions",
  insights: "Team insights",
  meetings: "Meeting notes",
  followups: "Follow-ups",
  integrations: "Integrations",
};
const icons = {
  overview: "◫",
  tasks: "▤",
  team: "♧",
  decisions: "≋",
  insights: "▥",
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
  `<span class="tag ${t.status === "pending_approval" ? "amber" : t.status === "blocked" ? "red" : t.status === "completed" ? "" : "gray"}">${status(t)}</span>${t.recurring === "weekly" ? ' <span class="tag gray">Weekly</span>' : ""}`;
function save() {
  for (const t of state.tasks) {
    const signature = JSON.stringify([t.status,t.owner,t.evidence,t.evidenceDocs]);
    const previous = taskChanges.get(t.id), before = previous ? JSON.parse(previous) : null;
    if (!before) track("created",t);
    else {
      if (before[0] !== t.status) track("status",t);
      if (before[1] !== t.owner) track("reassigned",t);
      if (JSON.stringify(before[2]) !== JSON.stringify(t.evidence) || JSON.stringify(before[3]) !== JSON.stringify(t.evidenceDocs)) track("evidence_added",t,{source:t.evidence_source || "app"});
    }
    if (t.recurring === "weekly" && t.status === "completed" && previous && JSON.parse(previous)[0] !== "completed") nextWeeklyTask(t);
    if (previous !== signature) t.updated_at = new Date().toISOString();
    taskChanges.set(t.id, signature);
  }
  scheduleSync();
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
  if (p === "insights") loadPerformance();
  if (p === "integrations") { loadFusionDesigns(); loadIntegrationHealth(); }
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
    .join("") + '<a class="lab-nav" href="/lab" target="_blank" rel="noopener noreferrer">Verifier Lab ↗</a>';
  document.getElementById("app").innerHTML =
    {
      overview: overview,
      tasks: tasksPage,
      team: teamPage,
      decisions: decisionsPage,
      insights: insightsPage,
      meetings: meetingsPage,
      followups: followupsPage,
      integrations: integrationsPage,
    }[page]() +
    `<p class="page-note">Demo workspace · Fictional team records · ${esc(syncStatus)} · Fusion snapshots and AI results show their source.</p>`;
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
      "Keep the build on schedule.",
      "Less chasing. Clearer handoffs. A coordinator who stays in charge.",
      `<button onclick="go('meetings')">▧ Import meeting notes</button><button class="primary" onclick="newTask()">+ New task</button>`,
    ) +
    demoGuide() + labCallout() +
    `<div class="stats">${[
      [
        "Active tasks",
        state.tasks.filter(active).length,
        "Across 3 subsystems",
      ],
      ["Awaiting approval", pending.length, "Your judgment closes the loop"],
      [
        "Member capacity",
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
      "Chassis & Suspension",
      "Powertrain",
      "Electronics & Operations",
    ]
      .map((p, i) => {
        let ts = state.tasks.filter((t) => t.project === p),
          complete = ts.filter((t) => !active(t)).length,
          percent = ts.length ? Math.round((100 * complete) / ts.length) : 0;
        return `<div class="project"><div class="project-top"><h3>${p}</h3><span class="tag ${ts.some(atRisk) ? "amber" : "gray"}">${ts.some(atRisk) ? "Needs attention" : "Active"}</span></div><p>${["Frame, suspension and steering for competition", "Engine, intake and drivetrain", "Wiring, sponsors and logistics"][i]}</p><div class="bar"><span style="width:${percent}%"></span></div><div class="project-foot"><span>${complete} / ${ts.length} tasks approved</span><span>${percent}% complete</span></div></div>`;
      })
      .join(
        "",
      )}</section><section class="panel"><div class="panel-head"><h2>Ready for your review</h2><span class="tag amber">${pending.length}</span></div>${pending.length ? pending.map((t) => `<div class="review"><div class="eyebrow">${esc(t.project)}</div><h3 style="margin-top:9px">${esc(t.title)}</h3><p>${esc(person(t.owner).name)} · Evidence checklist reviewed</p><button class="small" onclick="review('${t.id}')">Review deliverables →</button></div>`).join("") : '<div class="empty">All caught up. No pending reviews.</div>'}</section></div><div class="grid section-gap"><section class="panel"><div class="panel-head"><h2>Member commitments</h2><button class="small quiet" onclick="go('team')">Explore members →</button></div><div class="table-wrap"><table><thead><tr><th>Member</th><th>Remaining work</th><th>Capacity</th></tr></thead><tbody>${state.people
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
function insightsPage() {
  const approvedRecords = p => (p.records || []).filter(r => r.approved_at && !["exists", "binary"].includes(r.verification_type));
  const records = state.people.flatMap(approvedRecords);
  const approved = t => t.status === "completed" && t.type === "manager" && records.some(r => r.task_id === t.id || (!r.task_id && r.title === t.title));
  const subsystems = [...new Set(state.tasks.map(t => t.project || "Unassigned"))].sort();
  const skills = [...new Set(state.people.flatMap(p => [...(p.skills || []), ...approvedRecords(p).flatMap(r => r.skills || [])]))].sort();
  const verdicts = { pass: 0, fail: 0, needs_review: 0 };
  const missingItems = new Map();
  let reviewed = 0;
  for (const t of state.tasks) {
    if (!t.aiReview || !(t.aiReview.verdict in verdicts)) continue;
    verdicts[t.aiReview.verdict]++;
    reviewed++;
    const seen = new Set();
    for (const item of t.aiReview.missing || []) {
      const label = String(item).trim();
      const key = label.toLowerCase();
      if (!key || seen.has(key)) continue;
      seen.add(key);
      const entry = missingItems.get(key) || { label, count: 0 };
      entry.count++;
      missingItems.set(key, entry);
    }
  }
  const missing = [...missingItems.values()].sort((a,b) => b.count - a.count || a.label.localeCompare(b.label));
  return heading("Workspace evidence", "Team insights", "Every number on this page comes from verified records in this workspace.") +
    '<p class="hint">Fictional seed records remain demo data. Completion requires a matching coordinator-approved record; capacity uses declared availability and estimated remaining effort, never measured working time.</p>' +
    '<section class="panel"><div class="panel-head"><h2>Verified completion by subsystem</h2></div><div class="table-wrap"><table><thead><tr><th>Subsystem</th><th>Verified approved</th><th>Pending approval</th><th>Open</th><th>Other completed</th></tr></thead><tbody>' +
    subsystems.map(name => {
      const tasks = state.tasks.filter(t => (t.project || "Unassigned") === name);
      const verified = tasks.filter(approved).length;
      const pending = tasks.filter(t => t.status === "pending_approval").length;
      const open = tasks.filter(t => t.status !== "completed" && t.status !== "pending_approval").length;
      const other = tasks.filter(t => t.status === "completed" && !approved(t)).length;
      const rate = tasks.length ? Math.round(verified / tasks.length * 100) : 0;
      return `<tr><td>${esc(name)}<div class="bar"><span style="width:${rate}%"></span></div></td><td>${verified} / ${tasks.length} · ${rate}%</td><td>${pending}</td><td>${open}</td><td>${other}</td></tr>`;
    }).join("") + '</tbody></table></div><div class="panel-body"><p class="hint">Other completed: file-presence checks or completed tasks without a matching approval record. They do not increase the verified approval rate.</p>' + (state.tasks.length ? '' : '<p>No tasks in this workspace.</p>') + '</div></section>' +
    '<section class="panel section-gap"><div class="panel-head"><h2>Demonstrated-skill matrix</h2></div><div class="table-wrap"><table><thead><tr><th>Member</th>' + skills.map(skill => `<th>${esc(skill)}</th>`).join("") + '</tr></thead><tbody>' +
    state.people.map(p => `<tr><td>${esc(p.name)}</td>${skills.map(skill => {
      const count = approvedRecords(p).filter(r => (r.skills || []).includes(skill)).length;
      return `<td><span class="tag ${count ? "" : "gray"}" title="${count ? "Coordinator-approved records" : (p.skills || []).includes(skill) ? "Declared skill; no approved evidence" : "No declared or demonstrated skill"}">${count || ((p.skills || []).includes(skill) ? "Declared · 0" : "—")}</span></td>`;
    }).join("")}</tr>`).join("") + '</tbody></table></div><div class="panel-body"><p class="hint">Counts are approved records per skill. Grey declared skills have no approved evidence. Existence-only completions are excluded.</p>' + (!state.people.length ? '<p>No members in this workspace.</p>' : '') + '</div></section>' +
    '<section class="panel section-gap"><div class="panel-head"><h2>Capacity risk</h2></div><div class="panel-body">' +
    state.people.map(p => {
      const tasks = state.tasks.filter(t => t.owner === p.id && active(t));
      const assigned = tasks.reduce((sum,t) => sum + (Number(t.hours) || 0), 0);
      const capacity = Number(p.capacity) || 0;
      const available = p.pto ? 0 : capacity;
      const risk = p.pto || assigned > available;
      const width = available ? Math.min(100, assigned / available * 100) : assigned ? 100 : 0;
      return `<div class="draft"><div class="row"><h3>${esc(p.name)}</h3><span class="tag ${risk ? "amber" : "gray"}">${p.pto ? "PTO · needs coverage" : risk ? "Over capacity" : "Within capacity"}</span></div><p>${assigned}h assigned / ${available}h available${p.pto ? ` · ${capacity}h declared capacity before PTO` : ""}</p><div class="bar"><span style="width:${width}%;background:${risk ? "#bd9252" : "#769267"}"></span></div>${p.pto ? tasks.map(t => `<p><span class="tag amber">Needs coverage</span> ${esc(t.title)}</p>`).join("") || '<p>No active tasks need coverage.</p>' : ""}</div>`;
    }).join("") + (!state.people.length ? '<p>No capacity records.</p>' : '') + '</div></section>' +
    '<section class="panel section-gap"><div class="panel-head"><h2>Evidence quality</h2></div><div class="panel-body"><div class="stats">' +
    Object.entries(verdicts).map(([verdict,count]) => `<div class="stat"><span>${esc(verdict)}</span><strong>${count}</strong></div>`).join("") +
    `</div><p>${reviewed} tasks with a last AI review · ${state.tasks.length - reviewed} without a recorded AI verdict. AI pass is not coordinator approval.</p><h3>Most common missing items</h3>` +
    (missing.length ? missing.slice(0,5).map(item => `<p>${esc(item.label)} <span class="tag gray">${item.count} ${item.count === 1 ? "task" : "tasks"}</span></p>`).join("") : '<p>No missing items recorded in AI reviews.</p>') + '</div></section>' + ownershipMap() + performanceSection();
}
function teamPage() {
  return (
    heading(
      "People behind the mission",
      "Members & capacity",
      "Match demonstrated experience with the availability to help.",
      `<button data-ai-key="explain:t1" onclick="recommend('t1')">Try replacement demo →</button>`,
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
      : "Member available again.",
  );
}
function profile(id) {
  let p = person(id);
  show(
    `<button class="primary" data-ai-key="handoff:${id}" onclick="generateHandoffPack('${id}')">Generate handoff pack</button><h2>${p.name}</h2><p>${p.role}</p><div class="evidence">${p.history} approved tasks · Declared skills: ${p.skills.join(", ")}<br>Approval records below show demonstrated task experience. Declared skills alone do not certify a member.</div><h3>Approved experience</h3>${(p.records || []).map((r) => `<div class="draft"><strong>${esc(r.title)}</strong><p>${esc(r.skills.join(" · "))} · Approved ${esc(r.approved_at)} · ${r.source === "fictional_seed" ? "Fictional seed record" : "Demo approval"}</p></div>`).join("")}<h3>Tasks in this workspace</h3>${state.tasks
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
async function recommend(id) {
  if (aiOperations.has("explain:"+id)) return toast("Explanation is already running.");
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
        b.free - a.free || performanceTie(a.p.id,b.p.id,t.skills),
    );
  const request = { task: { title: t.title, skills: t.skills, hours: t.hours, criteria: t.criteria }, candidates: candidates.slice(0, 3).map(({p,h,free}) => ({ id: p.id, name: p.name, skills: p.skills, demonstrated_experience: experience(p,t), free_hours: free, assigned_hours: h })) };
  show(
    `<div class="eyebrow">Replacement recommendations · Rule-based demo</div><h2 style="margin-top:10px">Cover ${esc(t.title)}</h2><p>${esc(person(t.owner)?.name)} is assigned ${t.hours} hours. All required skills must match.</p>${candidates.map(({ p, h, free }, index) => `<div class="draft"><div class="row"><h3>${p.name}</h3><span class="tag ${free < t.hours ? "amber" : ""}">${free < t.hours ? "Insufficient capacity" : "Qualified & available"}</span></div><p>${p.skills.join(" · ")}<br>${experience(p, t)} approved tasks with matching skills · ${Math.max(0, free)}h available · ${h}h already assigned</p><div data-explanation="${index}"><p class="hint">Rule-based${index < 3 ? " · AI explanation pending…" : ""}</p></div><button class="small ${free >= t.hours ? "primary" : ""}" ${free < t.hours ? "disabled" : ""} onclick="reassign('${t.id}','${p.id}')" style="margin-top:12px">Approve reassignment</button></div>`).join("") || '<div class="empty">No eligible replacements. Adjust scope or availability.</div>'}<p class="hint">Recommendations compare declared skills, time off, matching approved task history, and estimated capacity. First-pass rate in the required skills breaks otherwise equal rankings when event history exists. A coordinator makes the assignment.</p>`,
  );
  if (!request.candidates.length) return;
  const modal = document.getElementById("modal");
  const slots = Array.from(modal.querySelectorAll("[data-explanation]")).slice(0, 3);
  const snapshot = JSON.stringify({ task: t, people: state.people, tasks: state.tasks });
  try {
    const res = await aiFetch("explain:"+id,"Explaining coverage","/api/explain", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(request) });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "AI explanation failed");
    if (snapshot !== JSON.stringify({ task: t, people: state.people, tasks: state.tasks })) throw new Error("Workspace changed; reopen recommendations.");
    json.recommendations.forEach((explanation, index) => {
      if (!modal.open || !modal.contains(slots[index])) return;
      slots[index].innerHTML = '<p>' + esc(explanation.rationale) + '</p><p>Risk: ' + esc(explanation.risks) + '</p><p class="hint">AI · ' + esc(json.provider) + ' · ' + esc(json.model) + '</p>';
    });
  } catch (e) {
    toast("AI explanation failed: " + e.message + ". Rule-based ranking retained.");
    slots.forEach(slot => { if (modal.open && modal.contains(slot)) slot.innerHTML = '<p class="hint">Rule-based · AI explanation unavailable or workspace changed.</p>'; });
  }
}
function reassign(tid, pid, confirmed = false) {
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
  if (!confirmed) return show(`<h2>Approve reassignment</h2><p>${esc(t.title)} → ${esc(p.name)}</p><label>Why</label><input id="decisionWhy" maxlength="280"><p class="hint">Recorded by Taylor, demo team lead.</p>`, `<button class="primary" onclick="reassign('${tid}','${pid}',true)">Approve reassignment</button>`);
  const why = decisionReason();
  if (!why) return;
  recordDecision(t,"reassignment", t.title + ": " + (person(t.owner)?.name || t.owner) + " → " + p.name, why);
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
    `<div class="eyebrow">${esc(t.project)} · ${t.type === "exists" ? "File presence check" : "Coordinator approval required"}</div><h2 style="margin-top:10px">${esc(t.title)}</h2><div class="row"><p>${esc(person(t.owner)?.name)} · Due ${esc(t.due)}</p>${badge(t)}</div>${active(t) ? `<label>Progress update</label><select aria-label="Update progress" onchange="setProgress('${t.id}',this.value)"><option value="">Choose an update…</option><option value="todo">To do</option><option value="in_progress">In progress</option><option value="blocked">Blocked</option></select>` : ""}<label>Acceptance criteria</label><div class="evidence">${esc(t.criteria)}</div><button class="small" onclick="specChange('${id}')">Record spec change</button>${active(t) && t.type === "manager" ? '<label>Decision reason (required for approval or changes)</label><input id="decisionWhy" maxlength="280" placeholder="Why is this decision right?"><label>Hours you actually spent (self-reported, optional)</label><input id="reportedHours" type="number" min="0" max="1000" step="0.25"><p class="hint">Recorded by Taylor, demo team lead.</p>' : ""}${t.aiReview ? `<label>AI review</label><div class="evidence"><span class="tag ${t.aiReview.verdict === "pass" ? "" : "amber"}">${esc(t.aiReview.verdict)}</span><p>${t.aiReview.checks.filter(c => c.method === "measured").length} of ${t.aiReview.checks.length} criteria measured from Fusion · ${t.aiReview.checks.filter(c => c.method === "ai").length} AI checks · ${t.aiReview.checks.filter(c => c.method === "human").length} need team lead</p><p>${esc(t.aiReview.summary)}</p>${t.aiReview.checks.map((c) => `<p><span class="tag" style="background:${c.method === "measured" ? "#e3efdf" : c.method === "ai" ? "#e1edff" : "#eee"};color:${c.method === "measured" ? "#385b2c" : c.method === "ai" ? "#234e89" : "#555"}">${c.method === "measured" ? "Measured" : c.method === "ai" ? "AI" : "Needs team lead"}</span> <strong>${esc(c.met)} · ${esc(c.criterion)}</strong><br>${esc(c.reason)}</p>`).join("")}${t.aiReview.missing.length ? `<p>Missing: ${esc(t.aiReview.missing.join("; "))}</p>` : ""}<p class="hint">AI · ${esc(t.aiReview.provider)} · ${esc(t.aiReview.model)} · ${esc(t.aiReview.at)}</p></div>` : ""}<label>Fusion document (optional)</label><input value="${esc(t.fusion_document || "")}" aria-label="Fusion document" onchange="setFusionDocument('${id}',this.value)">${t.fusion_document && active(t) ? `<button onclick="pullFusion('${id}')">Pull latest from Fusion</button>` : ""}${t.fusionDiff ? `<p>${esc(t.fusionDiff)}</p>` : ""}<label>Submitted evidence</label><div class="evidence">${t.evidence.length ? t.evidence.map((e) => "▧ " + esc(e)).join("<br>") : "No evidence submitted."}</div>${t.status !== "completed" ? `<input type="file" id="evidenceFile" multiple aria-label="Upload task evidence"><p class="hint">Text-like files are stored in this browser (up to 15,000 characters) and sent to the AI when you run a review. Other file contents cannot be read; their filenames alone do not prove quality.</p><p class="hint">Tip: upload a Fusion snapshot (*.truthlink.json) to verify mass, versions and components.</p><button style="margin-top:12px" onclick="attach('${id}')">Add evidence</button><label>Review result</label><div class="evidence">${esc(t.checkSource || "Not reviewed")}<br>${t.checked ? "Evidence checklist reviewed. Quality and suitability remain a coordinator decision." : "Evidence has not passed the demo checklist. File activity alone cannot prove completion."}</div>` : '<div class="evidence">Completed and recorded in the task history.</div>'}`,
    t.status === "completed"
      ? ""
      : `<button data-ai-key="verify:${id}" onclick="checkEvidence('${id}')">Review evidence</button>${t.type === "manager" && t.checked ? `<button class="primary" onclick="approve('${id}')">Coordinator: approve</button>` : ""}${t.type === "manager" ? `<button onclick="reject('${id}')">Request changes</button>` : ""}`,
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
  t.evidence_source = "app";
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
    track("verified",t,{verdict:"pass"});
    log("File-presence check completed " + t.title);
    closeModal();
    render();
    return toast("File presence verified. No content-quality claim made.");
  }
  const since = t.updated_at;
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
    const res = await aiFetch("verify:"+id,"Reviewing evidence","/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: t.title,
        criteria: t.criteria,
        verification_type: "complex",
        since,
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
      ruleChecks: json.ruleChecks,
      aiChecks: json.aiChecks,
      summary: json.summary,
      missing: json.missing,
      model: json.model,
      provider: json.provider,
      at: new Date().toISOString(),
    };
    track("verified",t,{verdict:json.verdict});
    t.checkSource = "AI reviewed";
    t.checked = json.checks.length > 0 && !json.checks.some(c => c.met === "no");
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
    track("verified",t,{verdict:t.checked ? "needs_review" : "fail"});
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
  const why = decisionReason();
  if (!why) return;
  const reported = document.getElementById("reportedHours")?.value.trim() || "";
  if (reported && (!Number.isFinite(Number(reported)) || Number(reported) < 0 || Number(reported) > 1000)) return toast("Self-reported hours must be between 0 and 1000.");
  recordDecision(t,"approval","Approved " + t.title,why);
  t.status = "completed";
  recordCompletion(t);
  track("approved",t);
  if (reported) track("hours_reported",t,{reported_hours:Number(reported)});
  log(
    `Coordinator approved ${t.title}; ${person(t.owner).name}'s history updated`,
  );
  closeModal();
  render();
  toast("Work approved. Completion history updated. Demo permissions only.");
}
function newTask() {
  show(
    `<h2>Create a task</h2><label>Title</label><input id="newTitle" placeholder="What needs to get done?"><label>Owner</label><select id="newOwner">${state.people.map((p) => `<option value="${p.id}">${p.name}</option>`).join("")}</select><label>Initiative</label><select id="newProject">${["Chassis & Suspension", "Powertrain", "Electronics & Operations"].map((p) => `<option>${p}</option>`).join("")}</select><label>Recurrence</label><select id="newRecurring"><option value="">One time</option><option value="weekly">Weekly</option></select><label>Due date</label><input id="newDue" type="date" value="2026-10-16"><label>Estimated remaining hours</label><input id="newHours" type="number" min="0.5" step="0.5" value="4"><label>Required skills (comma separated)</label><input id="newSkills" placeholder="Suspension design, CAD"><label>Fusion document (optional)</label><input id="newFusionDocument" placeholder="Front Upright"><label>Acceptance criteria</label><input id="newCriteria" placeholder="Required deliverables and checks">`,
    `<button class="primary" onclick="createTask()">Create task</button>`,
  );
}
function createTask() {
  let title = document.getElementById("newTitle").value.trim();
  if (!title) return toast("Add a task title.");
  let hours = Number(document.getElementById("newHours").value);
  if (!Number.isFinite(hours) || hours <= 0)
    return toast("Use a positive effort estimate.");
  const recurring = document.getElementById("newRecurring").value;
  if (recurring === "weekly" && !document.getElementById("newDue").value) return toast("Weekly tasks need a due date.");
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
    recurring: recurring === "weekly" ? "weekly" : undefined,
    status: "todo",
    type: "manager",
    criteria:
      document.getElementById("newCriteria").value ||
      "Coordinator review required.",
    fusion_document: document.getElementById("newFusionDocument").value.trim(),
    evidence: [],
    checked: false,
  });
  log("Coordinator created " + title);
  closeModal();
  render();
  toast("Task created.");
}
const sampleNotes =
  "Design review recap. Alex will finish the rear suspension kinematics report by 2026-10-14. Jordan will update the front upright drawing after review comments by 2026-10-16. Sam needs to order intake manifold stock this week and send the CAM setup sheet. Casey will check the harness pinout with the faculty advisor. We still need someone to book the skidpad for test day.";
function meetingsPage() {
  return (
    heading(
      "From conversation to action",
      "Meeting notes",
      "Capture the decisions. Review the assignments. Keep moving.",
    ) +
    `<div class="grid"><section class="panel"><div class="panel-head"><h2>Import your notes</h2><span class="tag gray">AI extraction</span></div><div class="panel-body"><label style="display:block;font-size:12px;margin-bottom:8px">Initiative</label><select id="meetingProject" style="width:100%;margin-bottom:18px"><option>Chassis &amp; Suspension</option><option>Powertrain</option><option>Electronics &amp; Operations</option></select><label for="notes" style="font-size:12px;display:block;margin-bottom:10px">Paste meeting notes</label><textarea id="notes" placeholder="Alex will finish the kinematics report by 2026-10-14…">${sampleNotes}</textarea><div class="actions" style="margin-top:14px"><button class="primary" data-ai-key="extract" onclick="extract()">✧ Extract draft tasks</button><label class="small" style="cursor:pointer">Upload .txt <input type="file" accept=".txt" style="display:none" onchange="readNotes(this)"></label></div><p class="hint">An LLM drafts tasks, owners, dates and acceptance criteria; nothing is assigned until you approve. Falls back to a local parser if AI is unavailable.</p></div></section><section class="panel"><div class="panel-head"><h2>Your review matters</h2></div><div class="panel-body"><h3>01 &nbsp; Capture</h3><p>Bring in notes from your meeting.</p><h3 style="margin-top:24px">02 &nbsp; Confirm</h3><p>Check the task, owner, deadline, and effort. Ambiguous assignments need your judgment.</p><h3 style="margin-top:24px">03 &nbsp; Assign</h3><p>Only approved drafts enter the work ledger and update team capacity.</p></div></section></div><section id="draftArea" class="section-gap"></section>`
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
  if (aiOperations.has("extract")) return toast("Meeting extraction is already running.");
  let notes = document.getElementById("notes").value.trim();
  if (!notes) return toast("Add meeting notes first.");
  const area = document.getElementById("draftArea");
  area.innerHTML = `<section class="panel"><div class="panel-body"><p class="hint">Reading notes with AI…</p></div></section>`;
  try {
    const res = await aiFetch("extract","Reading notes with Luminal","/api/extract", {
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
  toast("Approved tasks added. Member commitments updated.");
}
function followupsPage() {
  let ts = state.tasks.filter(t => active(t) && (
    (t.recurring === "weekly" && daysUntil(t.due) <= 2) ||
    (t.recurring !== "weekly" && !t.evidence.length) ||
    person(t.owner)?.pto || t.status === "blocked" || daysUntil(t.due) < 0
  ));
  return (
    heading(
      "Keep the loop moving",
      "Follow-ups",
      "Specific nudges for missing evidence, blockers, and handoffs.",
      `<span class="tag gray">Drafts only · Slack not connected</span>`,
    ) +
    `<section class="panel"><div class="panel-head"><h2>Suggested follow-ups</h2><span class="tag">${ts.length} drafts</span></div>${ts.map((t) => `<div class="review"><div class="row"><h3>${esc(t.title)}</h3>${badge(t)}</div><p>${esc(person(t.owner).name)} · ${person(t.owner).pto ? "Coverage needed" : t.status === "blocked" ? "Blocked" : t.due && t.due < new Date().toLocaleDateString("en-CA") ? "Overdue" : t.recurring === "weekly" && daysUntil(t.due) <= 2 ? "Due soon · Weekly logistics" : "Evidence missing"}</p><div class="evidence">${esc(message(t))}</div><p class="hint">${t.followupDraft && message(t) === t.followupDraft.message ? `AI draft · ${esc(t.followupDraft.provider)} · ${esc(t.followupDraft.model)} · ${esc(t.followupDraft.tone)}<br>Next step: ${esc(t.followupDraft.suggested_next_step)}` : esc(t.followupSource || "Template draft")}</p><div class="actions"><button class="small" data-ai-key="followup:${t.id}" onclick="message(state.tasks.find(t => t.id === '${t.id}'), true)" ${t.drafting ? "disabled" : ""}>Draft with AI</button><button class="small" onclick="copyFollowup('${t.id}')">Copy message</button><button class="small quiet" onclick="review('${t.id}')">View task →</button>${person(t.owner).pto ? `<button class="small" data-ai-key="explain:${t.id}" onclick="recommend('${t.id}')">Find coverage</button>` : ""}</div></div>`).join("") || '<div class="empty">No follow-ups needed.</div>'}</section><p class="hint">Template or labelled AI drafts. Copy to clipboard only; nothing is sent. AI drafts use supplied task facts and never infer hours worked.</p>`
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
        const res = await aiFetch("followup:"+t.id,"Drafting follow-up","/api/followup", {
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
    : `Hi ${person(t.owner).name.split(" ")[0]}, a quick check on “${t.title}”, due ${t.due || "date not set"}. Please add the required evidence or flag a blocker: ${t.criteria} You can review the task in TruthLink.`;
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
let fusionDesigns = null, fusionLoading = false, integrationHealth = null;
async function loadFusionDesigns() {
  if (fusionLoading) return;
  fusionLoading = true;
  try {
    const data = await apiJson("/api/fusion/snapshot");
    if (!Array.isArray(data.designs)) throw new Error("Invalid design list");
    fusionDesigns = data.designs;
  } catch (e) { fusionDesigns = null; toast("Fusion designs unavailable: " + e.message + ". Manual snapshot upload remains available."); }
  finally { fusionLoading = false; if (page === "integrations") render(); }
}
async function loadIntegrationHealth() {
  try { integrationHealth = await apiJson("/api/health"); }
  catch (e) { integrationHealth = null; toast("Integration status unavailable: " + e.message + ". Connections are shown as unconfirmed."); }
  if (page === "integrations") render();
}
function integrationsPage() {
  return heading("Connection evidence", "Integrations", "Live add-in snapshots and explicit connection status.") +
    `<section class="panel"><div class="panel-head"><h2>Autodesk Fusion</h2><span class="tag ${fusionDesigns ? "" : "gray"}">${fusionDesigns ? "Connected via add-in" : fusionLoading ? "Checking received designs…" : "Status unconfirmed"}</span><button onclick="loadFusionDesigns()">Refresh designs</button></div><div class="table-wrap"><table><thead><tr><th>Design</th><th>Mass</th><th>Version</th><th>Last received</th></tr></thead><tbody>${(fusionDesigns || []).map(d => `<tr><td>${esc(d.document)}</td><td>${Number.isFinite(d.mass_g) ? esc(d.mass_g)+" g" : "Not measured"}</td><td>${d.current_version == null ? "Unsaved" : "v"+esc(d.current_version)}</td><td>${esc(d.received_at || "Not recorded")}</td></tr>`).join("")}</tbody></table></div><div class="panel-body"><p>${fusionDesigns?.length ? "Snapshots received from the on-device TruthLink add-in." : fusionDesigns ? "No designs received yet. Save a design with the add-in enabled." : "No live design list available. You can upload a snapshot manually."}</p></div></section>` +
    `<div class="integration-grid section-gap">${[
      ["Slack","Not connected","Follow-up drafts are copy-to-clipboard only. No messages are sent."],
      ["Google Drive","Not connected","Evidence is supplied through uploads or Fusion snapshots."],
      ["Bloomerang","Not connected","No donor or sponsor account is connected."],
      ["MongoDB Atlas",syncStatus.startsWith("Synced") ? "Connected" : "Not connected","Workspace state uses Atlas when available, with device storage as fallback. Demo role controls are not authentication."],
      ["AI",integrationHealth?.ai ? "Configured · " + integrationHealth.provider : "Not connected","AI calls use the server spend guard; unavailable calls fall back to clearly labelled local behavior."]
    ].map(([name,label,description]) => `<section class="panel integration"><div class="row"><h2>${esc(name)}</h2><span class="tag gray">${esc(label)}</span></div><p>${esc(description)}</p></section>`).join("")}</div><section class="panel section-gap"><div class="panel-head"><h2>Demo workspace controls</h2></div><div class="panel-body"><p>Export current records or reset to the fictional racing-team scenario.</p><div class="actions"><button onclick="exportData()">Export JSON</button><button onclick="resetDialog()">Reset demo</button></div></div></section>`;
}
function exportData() {
  let blob = new Blob(
    [
      JSON.stringify(
        {
          ...state,
          meta: {
            app: "TruthLink",
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
      " is unavailable. Review their active commitments and find a qualified teammate for coverage."
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
  return /suspension|upright|kinematic|a-arm|steering/i.test(title)
    ? ["Suspension design"]
    : /dyno|test/i.test(title)
      ? ["Testing"]
      : /intake|engine|machin|manifold/i.test(title)
        ? ["Manufacturing"]
        : /harness|wiring|pinout|electr/i.test(title)
          ? ["Electronics"]
          : /sponsor|email/i.test(title)
            ? ["Sponsorship"]
            : ["Project management"];
}
function demoGuide() {
  return `<section class="demo-guide"><div class="row"><div><span class="eyebrow">Racing team pilot · Guided demo</span><h3 style="margin:8px 0 0">From meeting notes to a confident handoff.</h3></div><button class="small quiet" onclick="go('integrations')">Demo controls</button></div><div class="demo-steps"><button onclick="go('meetings')"><b>01</b><span>Capture commitments<small>Review tasks from meeting notes</small></span></button><button onclick="review('t2')"><b>02</b><span>Approve real deliverables<small>Grow Jordan's verified CAD experience</small></span></button><button onclick="go('team')"><b>03</b><span>Handle time off<small>Cover exam-week availability</small></span></button><button data-ai-key="explain:t1" onclick="recommend('t1')"><b>04</b><span>Find the right coverage<small>Compare skills, history, and capacity</small></span></button></div></section>`;
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
function recordDecision(t, kind, summary, why) {
  state.decisions ||= [];
  state.decisions.push({ id: "d" + crypto.randomUUID(), at: new Date().toISOString(), by: "taylor", kind, task_id: t.id, summary, why, superseded_by: null });
}
function decisionReason() {
  const why = document.getElementById("decisionWhy")?.value.trim();
  if (!why) { toast("Add a short reason for the decision."); return null; }
  return why;
}
function reject(id) {
  const t = state.tasks.find(t => t.id === id);
  if (!t || !active(t) || t.type !== "manager") return;
  const why = decisionReason();
  if (!why) return;
  recordDecision(t, "rejection", "Requested changes to " + t.title, why);
  track("rejected",t);
  t.checked = false;
  t.status = "in_progress";
  log("Team lead requested changes to " + t.title + ": " + why);
  closeModal(); render(); review(id);
}
function specChange(id, confirm = false) {
  const t = state.tasks.find(t => t.id === id);
  if (!confirm) return show(`<h2>Change requirements</h2><label>Acceptance criteria</label><textarea id="newSpec">${esc(t.criteria)}</textarea><label>Why</label><input id="decisionWhy" maxlength="280"><p class="hint">Recorded by Taylor, demo team lead.</p>`, `<button class="primary" onclick="specChange('${id}',true)">Record change</button>`);
  const why = decisionReason(), criteria = document.getElementById("newSpec").value.trim();
  if (!why || !criteria) return toast("Add criteria and a reason.");
  recordDecision(t,"spec_change","Requirements changed for " + t.title, why + " · Before: " + t.criteria + " · After: " + criteria);
  t.criteria = criteria; t.checked = false; t.status = "in_progress"; delete t.aiReview;
  log("Requirements updated for " + t.title); closeModal(); render(); review(id);
}
let decisionsFilter = "";
function decisionsPage() {
  const subsystems = [...new Set(state.tasks.map(t => t.project))].sort();
  const decisions = (state.decisions || []).filter(d => !decisionsFilter || state.tasks.find(t => t.id === d.task_id)?.project === decisionsFilter).slice().sort((a,b) => b.at.localeCompare(a.at));
  return heading("Team memory", "Decisions", "What changed, why it changed, and which decisions still apply.") + `<select aria-label="Filter decisions by subsystem" onchange="decisionsFilter=this.value;render()"><option value="">All subsystems</option>${subsystems.map(p => `<option value="${esc(p)}" ${p === decisionsFilter ? "selected" : ""}>${esc(p)}</option>`).join("")}</select><section class="panel section-gap"><div class="panel-body">${decisions.map(d => {
    const task = state.tasks.find(t => t.id === d.task_id), newer = state.decisions.find(n => n.id === d.superseded_by);
    return `<article class="draft" id="decision-${esc(d.id)}"><div class="row"><h3>${esc(d.summary)}</h3><span class="tag ${d.superseded_by ? "gray" : ""}">${esc(d.kind)}${d.source === "fictional_seed" ? " · Fictional" : ""}</span></div><p>${esc(d.at)} · ${esc(person(d.by)?.name || d.by)} · ${esc(task?.project || "Unknown subsystem")}</p><p><strong>Why:</strong> ${esc(d.why)}</p>${newer ? `<p>Superseded by: <a href="#decision-${esc(newer.id)}">${esc(newer.summary)}</a></p>` : `<button class="small" onclick="supersedeDecision('${d.id}')">Mark superseded</button>`}</article>`;
  }).join("") || '<p>No decisions in this view.</p>'}</div></section><p class="hint">Fictional history is labelled. New actions use the demo team-lead identity; this is not authenticated authorization.</p>`;
}
function supersedeDecision(id, confirm = false) {
  const d = state.decisions.find(d => d.id === id);
  if (!d || d.superseded_by) return;
  const newer = state.decisions.filter(n => n.task_id === d.task_id && n.at > d.at);
  if (!newer.length) return toast("Record a newer decision for this task first.");
  if (!confirm) return show(`<h2>Link the newer decision</h2><select id="newerDecision">${newer.map(n => `<option value="${esc(n.id)}">${esc(n.summary)}</option>`).join("")}</select>`, `<button class="primary" onclick="supersedeDecision('${id}',true)">Mark superseded</button>`);
  const choice = document.getElementById("newerDecision").value;
  if (!newer.some(n => n.id === choice)) return toast("Choose a newer decision for this task.");
  d.superseded_by = choice; save(); closeModal(); render();
}
let handoffCurrent = null;
function handoffInput(id) {
  const member = person(id), owned = state.tasks.filter(t => t.owner === id), taskIds = new Set(owned.map(t => t.id));
  const records = (member.records || []).filter(r => r.approved_at && !["exists","binary"].includes(r.verification_type));
  const decisions = (state.decisions || []).filter(d => d.by === id || taskIds.has(d.task_id));
  const open = owned.filter(active);
  return {
    member: { id, name: member.name }, owned_areas: [...new Set(owned.map(t => t.project))],
    verified_records: records.slice(-12).map(r => ({ title:r.title.slice(0,800),skills:r.skills || [],approved_at:r.approved_at,source:r.source || "workspace approval" })),
    decisions: decisions.slice(-12).map(d => ({summary:d.summary.slice(0,800),why:d.why.slice(0,800),kind:d.kind,at:d.at,by:person(d.by)?.name || d.by,superseded_by:d.superseded_by,source:d.source || "workspace decision"})),
    open_tasks: open.slice(0,20).map(t => ({ title:t.title.slice(0,800),status:t.status,criteria:t.criteria.slice(0,800),evidence:t.evidence.slice(0,10),evidence_status:t.aiReview ? t.aiReview.verdict : t.checked ? "Local checklist reviewed; team lead still decides quality" : "Not reviewed" })),
    people: state.people.filter(p => p.id !== id).map(p => ({name:p.name,role:p.role})),
    context_notes: `Workspace may contain fictional seed records. Included ${Math.min(12,records.length)} of ${records.length} approved records, ${Math.min(12,decisions.length)} of ${decisions.length} decisions, ${Math.min(20,open.length)} of ${open.length} open tasks. Source text limited to 800 characters; evidence filenames limited to 10 per task. Availability and next steps must be confirmed.`
  };
}
function handoffTemplate(input) {
  return {
    summary: `${input.member.name}: ${input.verified_records.length} included approval records and ${input.open_tasks.length} open tasks. Confirm uncertain details with the team.`,
    owned_areas: input.owned_areas,
    how_things_work: input.open_tasks.map(t => `${t.title}: ${t.criteria}. Evidence: ${t.evidence.join(", ") || "none"}; ${t.evidence_status}.`),
    open_work: input.open_tasks.map(t => ({task:t.title,status:t.status,next_step:t.status === "blocked" ? "Confirm the blocker and needed support with the owner." : t.status === "pending_approval" ? "Ask the team lead to review evidence and record a decision." : "Confirm next steps against acceptance criteria and add evidence."})),
    lessons: input.decisions.map(d => `${d.source === "fictional_seed" ? "Fictional: " : ""}${d.summary}. Why: ${d.why}${d.superseded_by ? " (superseded; historical context only)" : ""}`),
    who_to_ask: input.people.map(p => p.name)
  };
}
async function generateHandoffPack(id) {
  if (aiOperations.has("handoff:"+id)) return toast("Handoff generation is already running.");
  let input = handoffInput(id), pack, source;
  toast("Preparing handoff pack…");
  try {
    const res = await aiFetch("handoff:"+id,"Preparing handoff","/api/handoff", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(input)});
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Handoff unavailable");
    if (JSON.stringify(input) !== JSON.stringify(handoffInput(id))) throw new Error("Workspace changed");
    pack = json; source = "AI · " + json.provider + " · " + json.model;
  } catch (e) {
    toast("AI handoff failed: " + e.message + ". Using Template (no AI).");
    input = handoffInput(id); pack = handoffTemplate(input); source = "Template (no AI)";
  }
  handoffCurrent = {input,pack,source};
  const list = items => items.length ? items.map(s => `<p>${esc(s)}</p>`).join("") : '<p>Not recorded; confirm with the team.</p>';
  show(`<section class="handoff-pack"><div class="eyebrow">Successor handoff · ${esc(source)}</div><h2>${esc(input.member.name)}</h2><p>${esc(pack.summary)}</p><p class="hint">${esc(input.context_notes)}</p><h3>Owned areas</h3>${list(pack.owned_areas)}<h3>How things work</h3>${list(pack.how_things_work)}<h3>Open work</h3>${pack.open_work.map(w => `<div class="draft"><strong>${esc(w.task)}</strong> <span class="tag gray">${esc(w.status)}</span><p>${esc(w.next_step)}</p></div>`).join("") || '<p>No open tasks recorded.</p>'}<h3>Lessons and decisions</h3>${list(pack.lessons)}<h3>Who to ask</h3>${list(pack.who_to_ask)}<p class="hint">Draft from workspace records; verify uncertain details before using it.</p></section>`, '<button onclick="window.print()">Print</button><button class="primary" onclick="downloadHandoff()">Download .md</button>');
}
function downloadHandoff() {
  if (!handoffCurrent) return;
  const {input,pack,source} = handoffCurrent;
  const lines = ["# Handoff: " + input.member.name,source,input.context_notes,pack.summary,"## Owned areas",...pack.owned_areas.map(s => "- " + s),"## How things work",...pack.how_things_work.map(s => "- " + s),"## Open work",...pack.open_work.map(w => "- " + w.task + " (" + w.status + "): " + w.next_step),"## Lessons and decisions",...pack.lessons.map(s => "- " + s),"## Who to ask",...pack.who_to_ask.map(s => "- " + s)];
  const url = URL.createObjectURL(new Blob([lines.join("\n\n")],{type:"text/markdown;charset=utf-8"}));
  const a = document.createElement("a");a.href=url;a.download=input.member.name.toLowerCase().replace(/[^a-z0-9]+/g,"-")+"-handoff.md";a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function daysUntil(due) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(due || "")) return Infinity;
  const now = new Date(), date = new Date(due + "T00:00:00Z");
  return Math.round((date.getTime() - Date.UTC(now.getFullYear(),now.getMonth(),now.getDate())) / 86400000);
}
function nextWeeklyTask(t) {
  const date = new Date(t.due + "T12:00:00Z");
  if (!Number.isFinite(date.getTime())) return toast("Set a valid due date before scheduling the next weekly task.");
  date.setUTCDate(date.getUTCDate() + 7);
  const due = date.toISOString().slice(0,10), series = t.recurring_series || t.id, id = "weekly:" + series + ":" + due;
  if (state.tasks.some(task => task.id === id || (task.recurring_series === series && task.due === due))) return;
  const next = { ...structuredClone(t),id,due,recurring_series:series,status:"todo",checked:false,evidence:[],evidenceDocs:[],updated_at:new Date().toISOString() };
  delete next.aiReview; delete next.checkSource; delete next.followupDraft; delete next.followupSource; delete next.verifying; delete next.drafting;
  state.tasks.push(next);
}
function ownershipMap() {
  const subsystems = [...new Set(state.tasks.map(t => t.project || "Unassigned"))].sort();
  return '<section class="panel section-gap"><div class="panel-head"><h2>Ownership map</h2></div><div class="table-wrap"><table><thead><tr><th>Subsystem</th><th>Owner</th><th>Suggested backup</th></tr></thead><tbody>' + subsystems.map(project => {
    const tasks = state.tasks.filter(t => (t.project || "Unassigned") === project && active(t));
    const owners = [...new Set(tasks.map(t => t.owner))];
    if (!owners.length) return `<tr><td>${esc(project)}</td><td>No active assignments</td><td>—</td></tr>`;
    return owners.map(owner => {
      const owned = tasks.filter(t => t.owner === owner), skills = [...new Set(owned.flatMap(t => t.skills || []))], hours = owned.reduce((sum,t) => sum + t.hours,0), aggregate = {skills,hours};
      const backup = state.people.filter(p => p.id !== owner && !p.pto && skills.every(skill => p.skills.includes(skill))).map(p => ({p,free:p.capacity-load(p.id)})).sort((a,b) => (b.free >= hours)-(a.free >= hours) || experience(b.p,aggregate)-experience(a.p,aggregate) || b.free-a.free)[0];
      return `<tr><td>${esc(project)}<p class="hint">${owned.length} active tasks · ${hours}h estimated</p></td><td>${esc(person(owner)?.name || "Unassigned")}${person(owner)?.pto ? ' <span class="tag amber">Needs coverage</span>' : ""}</td><td>${backup ? `${esc(backup.p.name)}<p class="hint">${experience(backup.p,aggregate)} matching approved records · ${Math.max(0,backup.free)}h available${backup.free < hours ? " · Insufficient capacity" : ""}</p>` : "No qualified available backup"}</td></tr>`;
    }).join("");
  }).join("") + '</tbody></table></div><div class="panel-body"><p class="hint">Backups use the same deterministic skill, experience and capacity ranking as replacements. Suggestions require team-lead approval; no assignments change.</p></div></section>';
}
let syncTimer, syncInFlight = false, syncDirty = false, stateReady = false, localRevision = 0;
let syncStatus = "Offline · saved on this device";
function syncBadge(text) {
  syncStatus = text;
  const tag = document.getElementById("syncStatus");
  if (tag) tag.textContent = text;
}
async function apiJson(url, options = {}, timeoutMs = 12000) {
  const controller = new AbortController(), timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {...options,signal:controller.signal});
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Request failed (" + res.status + ")");
    return json;
  } finally { clearTimeout(timer); }
}
function workspacePayload() {
  return JSON.parse(JSON.stringify({people:state.people,tasks:state.tasks,decisions:state.decisions || [],activity:state.activity || []}, (key,value) => ["verifying","drafting"].includes(key) ? undefined : value));
}
function baselineTasks() {
  taskChanges.clear();
  state.tasks.forEach(t => { t.updated_at ||= "2026-10-10T09:00:00"; delete t.verifying; delete t.drafting; taskChanges.set(t.id,JSON.stringify([t.status,t.owner,t.evidence,t.evidenceDocs])); });
}
function scheduleSync() {
  localRevision++; syncDirty = true;
  clearTimeout(syncTimer);
  syncTimer = setTimeout(flushSharedState,800);
}
async function flushSharedState() {
  if (!stateReady || syncInFlight || !syncDirty) return;
  syncInFlight = true; syncDirty = false;
  const revision = localRevision;
  try {
    await apiJson("/api/state?workspace=demo-racing-team",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(workspacePayload())});
    syncBadge(revision === localRevision ? "Synced · MongoDB Atlas" : "Saving changes…");
  } catch (e) {
    syncDirty = true; syncBadge("Offline · saved on this device");
    toast("Shared sync failed: " + e.message + ". Kept device records.");
  } finally {
    syncInFlight = false;
    if (localRevision !== revision) { clearTimeout(syncTimer); syncTimer = setTimeout(flushSharedState,800); }
  }
}
async function loadSharedState() {
  const revision = localRevision;
  try {
    const json = await apiJson("/api/state?workspace=demo-racing-team");
    if (json.state !== null && !["people","tasks","decisions","activity"].every(key => Array.isArray(json.state?.[key]))) throw new Error("Invalid workspace response");
    if (revision === localRevision) {
      state = json.state === null ? structuredClone(seed) : json.state;
      baselineTasks(); localStorage.setItem(KEY,JSON.stringify(state)); render();
    }
    stateReady = true;
    if (json.state === null || revision !== localRevision) { syncDirty = true; await flushSharedState(); }
    else { syncDirty = false; syncBadge("Synced · MongoDB Atlas"); }
  } catch (e) {
    stateReady = true; syncBadge("Offline · saved on this device");
    toast("Shared workspace unavailable: " + e.message + ". Using device records.");
  }
}
let eventQueue = [], eventTimer;
function track(kind, task, extra = {}) {
  if (!syncStatus.startsWith("Synced")) return;
  eventQueue.push({workspace:"demo-racing-team",task_id:task.id,task_title:task.title.slice(0,300),subsystem:task.project?.slice(0,100),member_id:task.owner || "",skills:(task.skills || []).slice(0,20).map(s => s.slice(0,80)),kind,status:task.status,estimated_hours:Number(task.hours) || 0,source:"app",at:new Date().toISOString(),...extra});
  if (!eventTimer) eventTimer = setTimeout(flushEvents,200);
}
async function flushEvents() {
  eventTimer = null;
  const batch = eventQueue.splice(0,200);
  if (!batch.length || !syncStatus.startsWith("Synced")) { eventQueue = []; return; }
  try { await apiJson("/api/events",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(batch)}); }
  catch { /* Offline telemetry is deliberately dropped; workspace actions remain usable. */ }
  if (eventQueue.length) eventTimer = setTimeout(flushEvents,200);
}
let performanceData = null, performanceLoading = false;
async function loadPerformance() {
  if (performanceLoading) return;
  performanceLoading = true;
  try {
    const data = await apiJson("/api/metrics?workspace=demo-racing-team");
    if (!Array.isArray(data.members) || !Array.isArray(data.tasks)) throw new Error("Invalid metrics response");
    performanceData = data;
  } catch (e) { performanceData = null; toast("Performance history unavailable: " + e.message + ". Showing workspace records only."); }
  finally { performanceLoading = false; if (page === "insights") render(); }
}
function firstPassScore(member, skills) {
  if (!performanceData || !skills.length) return null;
  const rows = skills.map(skill => performanceData.members.find(r => r.member_id === member && r.skill === skill && r.completed > 0));
  if (rows.some(r => !r || !Number.isFinite(r.first_pass_rate))) return null;
  return rows.reduce((sum,r) => sum + r.first_pass_rate,0) / rows.length;
}
function performanceTie(a,b,skills) {
  const left = firstPassScore(a,skills), right = firstPassScore(b,skills);
  return left === null || right === null ? 0 : right - left;
}
function performanceSection() {
  if (!performanceData) return '<section class="panel section-gap"><div class="panel-head"><h2>Performance history</h2></div><div class="panel-body"><p>Connect the database to see performance history</p></div></section>';
  const number = value => Number.isFinite(value) ? value.toFixed(1) : "—";
  const rows = performanceData.members;
  const stuck = performanceData.tasks.filter(t => t.stage !== "approved").slice().sort((a,b) => b.days_in_stage-a.days_in_stage);
  return '<section class="panel section-gap"><div class="panel-head"><h2>Performance history</h2></div><div class="table-wrap"><table><thead><tr><th>Member</th><th>Skill</th><th>Completed</th><th>First-pass rate</th><th>Average rework</th><th>Median cycle days</th><th>Estimate / self-reported hours</th></tr></thead><tbody>' + rows.map(r => `<tr><td>${esc(person(r.member_id)?.name || r.member_id)}</td><td>${esc(r.skill)}</td><td>${esc(r.completed)}</td><td>${Number.isFinite(r.first_pass_rate) ? (r.first_pass_rate*100).toFixed(1)+"%" : "—"}</td><td>${number(r.avg_rework_cycles)}</td><td>${number(r.median_cycle_days)}</td><td>${Number.isFinite(r.estimate_accuracy) ? number(r.estimate_accuracy)+"× · self-reported" : "Not self-reported"}</td></tr>`).join("") + '</tbody></table></div><div class="panel-body">' + (!rows.length ? '<p>No approved task events recorded yet.</p>' : '') + '<h3>Stuck work</h3>' + (stuck.map(t => `<p><strong>${esc(t.title || state.tasks.find(task => task.id === t.task_id)?.title || t.task_id)}</strong> · ${esc(t.stage)} · ${number(t.days_in_stage)} days · ${esc(t.rework_cycles)} rework cycles</p>`).join("") || '<p>No open event history.</p>') + '<p class="hint">Calendar time between recorded events. Hours only when members report them.</p></div></section>';
}
function setFusionDocument(id, value) {
  const t = state.tasks.find(t => t.id === id);
  if (!t) return;
  t.fusion_document = value.trim(); delete t.fusionDiff; save();
}
async function pullFusion(id) {
  const t = state.tasks.find(t => t.id === id);
  if (!t?.fusion_document || !active(t) || t.pullingFusion) return;
  t.pullingFusion = true;
  const documentName = t.fusion_document;
  try {
    const {latest,previous} = await apiJson("/api/fusion/snapshot?document=" + encodeURIComponent(documentName));
    if (!latest || latest.document !== documentName || !Number.isFinite(latest.proofpilot_snapshot)) throw new Error("Invalid Fusion snapshot");
    if (!active(t) || t.fusion_document !== documentName) throw new Error("Task changed while pulling evidence");
    const text = JSON.stringify(latest);
    if (text.length > 15000) throw new Error("Snapshot exceeds verification text limit; export a compact snapshot");
    const name = documentName + ".truthlink.json", doc = {name,size:new Blob([text]).size,type:"application/json",text};
    t.evidence = [...new Set([...t.evidence,name])];
    t.evidenceDocs = [...(t.evidenceDocs || []).filter(e => e.name !== name),doc];
    const saved = latest.version_history?.at(-1);
    t.fusionDiff = previous ? `Mass ${previous.mass_g ?? "unknown"} → ${latest.mass_g ?? "unknown"} g · v${previous.current_version ?? "?"} → v${latest.current_version ?? "?"} · saved by ${saved?.saved_by || "unknown"}` : "First received snapshot · no earlier snapshot to compare.";
    t.evidence_source = "fusion"; t.checked = false; delete t.aiReview;
    log("Pulled latest Fusion evidence for " + t.title);
    await checkEvidence(id);
  } catch (e) { toast("Fusion pull failed: " + e.message + ". Existing evidence retained; upload a snapshot instead."); }
  finally { delete t.pullingFusion; }
}
const aiOperations = new Map();
function paintAIProgress() {
  const descriptions = [];
  for (const [key,op] of aiOperations) {
    const seconds = Math.floor((Date.now()-op.started)/1000);
    descriptions.push(op.label + "… " + seconds + " s");
    document.querySelectorAll("[data-ai-key]").forEach(button => {
      if (button.dataset.aiKey !== key) return;
      if (!op.buttons.has(button)) op.buttons.set(button,{disabled:button.disabled,text:button.textContent});
      button.disabled = true; button.textContent = op.buttons.get(button).text + " · " + seconds + " s";
    });
  }
  const status = document.getElementById("aiStatus");
  if (status) { status.hidden = !descriptions.length; status.textContent = descriptions.join(" · "); }
}
async function aiFetch(key, label, url, options) {
  if (aiOperations.has(key)) throw new Error("This AI request is already running");
  const operation = {label,started:Date.now(),buttons:new Map()};
  aiOperations.set(key,operation); paintAIProgress();
  const interval = setInterval(paintAIProgress,1000);
  let deadline;
  try {
    const json = await Promise.race([
      apiJson(url,options,45000),
      new Promise((_,reject) => { deadline = setTimeout(()=>reject(new Error("AI timed out after 45 s")),45000); })
    ]);
    return {ok:true,json:async()=>json};
  } finally {
    clearInterval(interval); clearTimeout(deadline); aiOperations.delete(key);
    operation.buttons.forEach((original,button) => {button.disabled=original.disabled;button.textContent=original.text;});
    paintAIProgress();
  }
}
let labResults = null;
async function loadLabResults() {
  try {
    const results = await apiJson("/lab/results.json");
    if (![results.test?.baseline?.accuracy,results.test?.improved?.accuracy].every(n => Number.isFinite(n) && n >= 0 && n <= 1)) throw new Error("Missing fresh-test accuracy");
    labResults = results;
  } catch (e) { labResults = null; toast("Verifier Lab results unavailable: " + e.message + ". Open the lab to inspect the run."); }
  if (page === "overview") render();
}
function labCallout() {
  if (!labResults) return '<div class="callout"><div><h3>Verifier Lab</h3><p>Run results unavailable. Open the lab to inspect recorded experiments.</p></div><a href="/lab" target="_blank" rel="noopener noreferrer">Open lab ↗</a></div>';
  const baseline = (labResults.test.baseline.accuracy*100).toFixed(1), improved = (labResults.test.improved.accuracy*100).toFixed(1);
  return `<div class="callout"><div><h3>Our verifier improves itself</h3><p>${baseline}% → ${improved}% on a fresh test (${labResults.agents?.length || 0} agents · ${esc(labResults.provider)}).</p><p class="hint">Recorded experiment · ${esc(labResults.test_cases)} fresh cases · ${esc(labResults.run_at)}. These are verifier scores, not task completion rates.</p></div><a href="/lab" target="_blank" rel="noopener noreferrer">Verifier Lab ↗</a></div>`;
}
render();

loadSharedState();

loadPerformance();

loadLabResults();
