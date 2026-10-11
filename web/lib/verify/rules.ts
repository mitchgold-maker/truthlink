// Deterministic evidence checks that run before any LLM call.
// Measured facts (Fusion snapshots) settle numeric, version and naming criteria for zero tokens;
// only criteria the rules cannot settle are sent to the model, with a compact digest instead of raw files.

export type Evidence = { name: string; size: number; type: string; text: string | null };
export type Check = { criterion: string; met: "yes" | "no" | "unclear"; reason: string; method: "measured" | "ai" | "human" };

type Version = { version?: number; saved_by?: string; saved_at?: string };
type Snapshot = {
  proofpilot_snapshot: number;
  document?: string;
  mass_g?: number;
  saved_to_cloud?: boolean;
  current_version?: number | null;
  bounding_box_mm?: number[];
  user_parameters?: { name: string; expression?: string; value_display?: string }[];
  bodies?: { name: string; material?: string | null }[];
  components?: { name: string }[];
  features?: string[];
  version_history?: Version[];
};

export function parseSnapshots(evidence: Evidence[]): { snap: Snapshot; file: string }[] {
  const out: { snap: Snapshot; file: string }[] = [];
  for (const e of evidence) {
    if (!e.text || !e.text.includes("proofpilot_snapshot")) continue;
    try {
      const snap = JSON.parse(e.text) as Snapshot;
      if (snap.proofpilot_snapshot) out.push({ snap, file: e.name });
    } catch {
      /* truncated or invalid JSON: left to the reviewer */
    }
  }
  return out;
}

export function splitCriteria(criteria: string | string[]): string[] {
  const list = Array.isArray(criteria) ? criteria : criteria.split(/(?<=[.;!?])\s+|\n+|,\s+and\s+/);
  return list.map((c) => c.trim()).filter((c) => c.length > 2);
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

function similar(a: string, b: string) {
  const x = norm(a), y = norm(b);
  if (!x || !y) return false;
  if (x.includes(y) || y.includes(x)) return true;
  const ta = new Set(x.split(" ")), tb = new Set(y.split(" "));
  const shared = [...ta].filter((t) => tb.has(t) || [...tb].some((u) => u.length > 3 && (u.startsWith(t) || t.startsWith(u)))).length;
  return shared / Math.max(ta.size, tb.size) >= 0.6;
}

function namesOf(s: Snapshot) {
  return [
    ...(s.components ?? []).map((c) => c.name),
    ...(s.bodies ?? []).map((b) => b.name),
    ...(s.features ?? []),
    ...(s.user_parameters ?? []).map((p) => p.name),
  ];
}

function latestSave(s: Snapshot): Version | undefined {
  return [...(s.version_history ?? [])].filter((v) => v.saved_at).sort((a, b) => (a.saved_at! < b.saved_at! ? 1 : -1))[0];
}

// Returns a check when the rules can decide the criterion, otherwise null.
export function ruleCheck(criterion: string, snaps: { snap: Snapshot; file: string }[], since?: string): Check | null {
  const c = criterion.toLowerCase();
  // Judgment calls go straight to the approver; spending tokens on them adds nothing.
  if (/\b(team lead|coordinator|manager|reviewer)\b[^.]*\b(confirms?|reviews?|approves?|verif(y|ies)|decides?)\b/.test(c))
    return { criterion, met: "unclear", method: "human", reason: "Requires human judgment; routed to the approver." };
  if (!snaps.length) return null;
  const { snap, file } = snaps[snaps.length - 1];

  const mass =
    c.match(/mass[^.]*?(\d+(?:\.\d+)?)\s*(kg|g)\b[^.]*?(or less|or under|max|at most)/) ??
    c.match(/mass[^.]*?(?:under|below|at most|less than|no more than|<=|≤)\s*(\d+(?:\.\d+)?)\s*(kg|g)\b/);
  if (mass && typeof snap.mass_g === "number") {
    const limit = Number(mass[1]) * (mass[2] === "kg" ? 1000 : 1);
    const ok = snap.mass_g <= limit;
    return { criterion, met: ok ? "yes" : "no", method: "measured", reason: `Measured in Fusion: ${snap.mass_g} g ${ok ? "≤" : ">"} ${limit} g limit (${file}).` };
  }

  if (/saved to the cloud|new version|version/.test(c)) {
    const last = latestSave(snap);
    const newer = since ? Boolean(last?.saved_at && last.saved_at > since) : (snap.current_version ?? 0) >= 2;
    const ok = Boolean(snap.saved_to_cloud) && newer;
    const who = last ? `v${last.version ?? snap.current_version} saved${last.saved_by ? " by " + last.saved_by : ""}${last.saved_at ? " at " + last.saved_at : ""}` : "no version history";
    return {
      criterion,
      met: ok ? "yes" : "no",
      method: "measured",
      reason: ok
        ? `Fusion version history: ${who}${since ? `, after the task was last updated (${since})` : ""}.`
        : snap.saved_to_cloud
          ? `No new version${since ? ` since the task was last updated (${since})` : ""}: ${who}.`
          : "Design is not saved to the cloud, so there is no version record.",
    };
  }

  const named = criterion.match(/(?:component|part|body|feature|sketch|parameter)s?\s+(?:named|called)\s+["“']?([^"”'.,;]+)/i) ?? criterion.match(/(?:includes?|contains?|has)\s+(?:an?\s+)?["“']([^"”']+)["”']/i);
  if (named) {
    const want = named[1].trim();
    const hit = namesOf(snap).find((n) => similar(n, want));
    return { criterion, met: hit ? "yes" : "no", method: "measured", reason: hit ? `Found "${hit}" in the Fusion design (${file}).` : `No component, body, feature or parameter resembling "${want}" in the Fusion design (${file}).` };
  }
  return null;
}

// Compact facts for the model, so a 10 KB snapshot costs a few hundred tokens.
export function digestSnapshot(s: Snapshot) {
  const last = latestSave(s);
  return [
    `Fusion design "${s.document}"`,
    `mass ${s.mass_g} g`,
    s.bounding_box_mm ? `bbox ${s.bounding_box_mm.join("×")} mm` : "",
    `version ${s.current_version ?? "unsaved"}${last ? ` (last saved ${last.saved_at}${last.saved_by ? " by " + last.saved_by : ""})` : ""}`,
    `components: ${(s.components ?? []).slice(0, 25).map((c) => c.name).join(", ")}`,
    `materials: ${[...new Set((s.bodies ?? []).map((b) => b.material).filter(Boolean))].join(", ")}`,
    `parameters: ${(s.user_parameters ?? []).slice(0, 25).map((p) => `${p.name}=${p.expression}`).join(", ")}`,
    `features: ${(s.features ?? []).slice(0, 30).join(", ")}`,
  ].filter(Boolean).join("; ");
}
