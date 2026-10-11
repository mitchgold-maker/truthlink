"""ProofPilot evidence snapshot for Autodesk Fusion.

Run from Utilities > Scripts and Add-Ins. Reads facts from the active design
(mass, volume, bounding box, user parameters, bodies and materials, version
history) and saves them as <design>.proofpilot.json. Upload that file as task
evidence in ProofPilot; the AI verifier checks acceptance criteria against
these measured values instead of a filename.

Only facts Fusion reports are exported. Nothing is inferred, and no working
time is derived from timestamps.
"""

import datetime
import json
import traceback

import adsk.core
import adsk.fusion


def _round(x, n=4):
    return round(float(x), n)


def _versions(data_file):
    out = []
    if data_file is None:
        return out
    try:
        versions = data_file.versions
        for i in range(versions.count):
            v = versions.item(i)
            entry = {"version": v.versionNumber}
            try:
                entry["saved_by"] = v.lastUpdatedBy.displayName
            except Exception:
                pass
            try:
                entry["saved_at"] = datetime.datetime.fromtimestamp(v.dateModified).isoformat()
            except Exception:
                pass
            try:
                if v.description:
                    entry["description"] = v.description
            except Exception:
                pass
            out.append(entry)
    except Exception:
        pass
    return out[-15:]


def _snapshot(app, design):
    root = design.rootComponent
    um = design.unitsManager
    length_unit = um.defaultLengthUnits

    props = root.getPhysicalProperties(adsk.fusion.CalculationAccuracy.MediumCalculationAccuracy)
    box = root.boundingBox
    size_cm = [box.maxPoint.x - box.minPoint.x, box.maxPoint.y - box.minPoint.y, box.maxPoint.z - box.minPoint.z]

    bodies = []
    for body in root.bRepBodies:
        b = {"name": body.name, "material": body.material.name if body.material else None}
        try:
            b["mass_g"] = _round(body.physicalProperties.mass * 1000, 2)
        except Exception:
            pass
        bodies.append(b)

    components = []
    for occ in root.allOccurrences:
        comp = occ.component
        c = {"name": occ.name, "bodies": comp.bRepBodies.count}
        try:
            c["mass_g"] = _round(occ.physicalProperties.mass * 1000, 2)
        except Exception:
            pass
        components.append(c)

    params = []
    for p in design.userParameters:
        params.append({"name": p.name, "expression": p.expression, "value_display": um.formatInternalValue(p.value, p.unit or "", True), "comment": p.comment})

    doc = app.activeDocument
    data_file = doc.dataFile if doc.isSaved else None

    return {
        "proofpilot_snapshot": 1,
        "source": "autodesk_fusion",
        "exported_at": datetime.datetime.now().isoformat(timespec="seconds"),
        "document": doc.name,
        "design_units": length_unit,
        "saved_to_cloud": bool(doc.isSaved),
        "current_version": data_file.versionNumber if data_file else None,
        "mass_g": _round(props.mass * 1000, 2),
        "volume_cm3": _round(props.volume, 3),
        "surface_area_cm2": _round(props.area, 2),
        "bounding_box_mm": [_round(v * 10, 2) for v in size_cm],
        "center_of_mass_mm": [_round(v * 10, 2) for v in (props.centerOfMass.x, props.centerOfMass.y, props.centerOfMass.z)],
        "body_count": root.bRepBodies.count,
        "component_count": root.allOccurrences.count,
        "user_parameters": params,
        "bodies": bodies[:40],
        "components": components[:40],
        "timeline_features": design.timeline.count if design.designType == adsk.fusion.DesignTypes.ParametricDesignType else None,
        "version_history": _versions(data_file),
    }


def run(context):
    ui = None
    try:
        app = adsk.core.Application.get()
        ui = app.userInterface
        design = adsk.fusion.Design.cast(app.activeProduct)
        if not design:
            ui.messageBox("Open a design first.", "ProofPilot")
            return

        snap = _snapshot(app, design)

        dlg = ui.createFileDialog()
        dlg.title = "Save ProofPilot evidence snapshot"
        dlg.filter = "ProofPilot snapshot (*.json)"
        safe = "".join(ch if ch.isalnum() or ch in "-_" else "-" for ch in app.activeDocument.name)
        dlg.initialFilename = f"{safe}.proofpilot.json"
        if dlg.showSave() != adsk.core.DialogResults.DialogOK:
            return
        with open(dlg.filename, "w", encoding="utf-8") as f:
            json.dump(snap, f, indent=1)

        ui.messageBox(
            f"Saved {dlg.filename}\n\nMass {snap['mass_g']} g · {snap['body_count']} bodies · "
            f"{len(snap['user_parameters'])} parameters · version {snap['current_version']}\n\n"
            "Upload it as evidence on the task in ProofPilot.",
            "ProofPilot",
        )
    except Exception:
        if ui:
            ui.messageBox("ProofPilot snapshot failed:\n" + traceback.format_exc())
