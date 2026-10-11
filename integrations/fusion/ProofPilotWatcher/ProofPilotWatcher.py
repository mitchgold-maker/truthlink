"""ProofPilot Watcher: a Fusion add-in that verifies on every save, on the engineer's machine.

On each save it takes a ProofPilot snapshot (mass, parameters, components, version history),
checks it locally against targets stored in the design as user parameters (`pp_max_mass_g`,
`pp_min_version`, `pp_required` = comma-separated names), shows the result in Fusion, writes the
snapshot to ~/ProofPilot/snapshots/, and posts it to the ProofPilot server.

Server URL: env PROOFPILOT_URL (default http://localhost:3000). No working time is inferred.
"""

import json
import os
import sys
import threading
import traceback
import urllib.request

import adsk.core
import adsk.fusion

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, "..", "ProofPilotSnapshot"))
from ProofPilotSnapshot import _snapshot  # noqa: E402

SERVER = os.environ.get("PROOFPILOT_URL", "http://localhost:3000").rstrip("/")
OUT_DIR = os.path.join(os.path.expanduser("~"), "ProofPilot", "snapshots")
_handlers = []
_last_verdict = {}


def _norm(s):
    return "".join(ch if ch.isalnum() else " " for ch in s.lower()).split()


def _similar(a, b):
    x, y = " ".join(_norm(a)), " ".join(_norm(b))
    if not x or not y:
        return False
    if x in y or y in x:
        return True
    ta, tb = set(x.split()), set(y.split())
    return len(ta & tb) / max(len(ta), len(tb)) >= 0.6


def _local_checks(design, snap):
    """Deterministic, on-device checks against pp_* targets. Returns list of (ok, text)."""
    checks = []
    params = design.userParameters
    p = params.itemByName("pp_max_mass_g")
    if p:
        limit = p.value
        checks.append((snap["mass_g"] <= limit, f"Mass {snap['mass_g']:.0f} g {'≤' if snap['mass_g'] <= limit else '>'} {limit:.0f} g target"))
    p = params.itemByName("pp_min_version")
    if p and snap.get("current_version") is not None:
        checks.append((snap["current_version"] >= p.value, f"Version {snap['current_version']} (needs ≥ {p.value:.0f})"))
    p = params.itemByName("pp_required")
    if p:
        names = [c["name"] for c in snap.get("components", [])] + [b["name"] for b in snap.get("bodies", [])] + snap.get("features", [])
        for want in [w.strip() for w in p.comment.split(",") if w.strip()]:
            hit = next((n for n in names if _similar(n, want)), None)
            checks.append((bool(hit), f"{want}: {'found ' + hit if hit else 'missing'}"))
    return checks


def _post(snap):
    try:
        req = urllib.request.Request(
            SERVER + "/api/fusion/snapshot",
            data=json.dumps(snap).encode("utf-8"),
            headers={"Content-Type": "application/json", "X-ProofPilot-Token": os.environ.get("PROOFPILOT_INGEST_TOKEN", "")},
            method="POST",
        )
        urllib.request.urlopen(req, timeout=8).read()
    except Exception:
        pass  # offline is fine: the snapshot file is still on disk for manual upload


class SavedHandler(adsk.core.DocumentEventHandler):
    def notify(self, args):
        try:
            app = adsk.core.Application.get()
            doc = args.document
            design = None
            for i in range(doc.products.count):
                design = adsk.fusion.Design.cast(doc.products.item(i)) or design
            if not design:
                return
            snap = _snapshot(app, design)
            checks = _local_checks(design, snap)
            snap["local_checks"] = [{"ok": ok, "text": t} for ok, t in checks]

            os.makedirs(OUT_DIR, exist_ok=True)
            safe = "".join(ch if ch.isalnum() or ch in "-_" else "-" for ch in doc.name)
            path = os.path.join(OUT_DIR, f"{safe}.proofpilot.json")
            with open(path, "w", encoding="utf-8") as f:
                json.dump(snap, f, separators=(",", ":"))
            threading.Thread(target=_post, args=(snap,), daemon=True).start()

            if checks:
                verdict = all(ok for ok, _ in checks)
                lines = "\n".join(("✓ " if ok else "✗ ") + t for ok, t in checks)
                # Only interrupt the engineer when the result changes.
                if _last_verdict.get(doc.name) != verdict:
                    _last_verdict[doc.name] = verdict
                    app.userInterface.messageBox(
                        f"ProofPilot check on save (v{snap.get('current_version')}): {'PASS' if verdict else 'NOT READY'}\n\n{lines}\n\nSnapshot sent to ProofPilot.",
                        "ProofPilot",
                    )
        except Exception:
            adsk.core.Application.get().userInterface.messageBox("ProofPilot watcher error:\n" + traceback.format_exc())


def run(context):
    app = adsk.core.Application.get()
    handler = SavedHandler()
    app.documentSaved.add(handler)
    _handlers.append(handler)


def stop(context):
    app = adsk.core.Application.get()
    for h in _handlers:
        app.documentSaved.remove(h)
    _handlers.clear()
