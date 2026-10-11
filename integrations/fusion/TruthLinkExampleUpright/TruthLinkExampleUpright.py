"""Builds the TruthLink demo part: a parametric, racing-style front upright (fictional design).

Creates a new design with named bodies (Upright Body, Upper/Lower A-arm Pickup, Steering Arm,
Brake Caliper Mount), aluminum material, and user parameters. `body_t` drives mass:
14 mm gives about 550 g (fails a 450 g target); 11 mm gives about 440 g (passes).
`pp_max_mass_g` stores the target so the TruthLink add-in can check it on every save.
"""

import traceback

import adsk.core
import adsk.fusion

P = adsk.core.Point3D.create
V = adsk.core.ValueInput


def _aluminum(app):
    for lib in app.materialLibraries:
        for i in range(lib.materials.count):
            m = lib.materials.item(i)
            if "6061" in m.name:
                return m
    return None


def _rect(sketch, x0, y0, x1, y1):
    sketch.sketchCurves.sketchLines.addTwoPointRectangle(P(x0, y0, 0), P(x1, y1, 0))


def _profiles(sketch):
    coll = adsk.core.ObjectCollection.create()
    for p in sketch.profiles:
        coll.add(p)
    return coll


def _extrude(comp, profiles, distance, op, name=None):
    ext = comp.features.extrudeFeatures
    inp = ext.createInput(profiles, op)
    inp.setDistanceExtent(False, V.createByString(distance))
    feat = ext.add(inp)
    if name:
        feat.name = name
        for i, b in enumerate(feat.bodies):
            b.name = name if feat.bodies.count == 1 else f"{name} {i + 1}"
    return feat


def _cut_holes(comp, centers, r, name):
    sk = comp.sketches.add(comp.xYConstructionPlane)
    sk.name = name + " sketch"
    for x, y in centers:
        sk.sketchCurves.sketchCircles.addByCenterRadius(P(x, y, 0), r)
    ext = comp.features.extrudeFeatures
    inp = ext.createInput(_profiles(sk), adsk.fusion.FeatureOperations.CutFeatureOperation)
    inp.setAllExtent(adsk.fusion.ExtentDirections.PositiveExtentDirection)
    ext.add(inp).name = name


def run(context):
    ui = None
    try:
        app = adsk.core.Application.get()
        ui = app.userInterface
        doc = app.documents.add(adsk.core.DocumentTypes.FusionDesignDocumentType)
        design = adsk.fusion.Design.cast(app.activeProduct)
        design.designType = adsk.fusion.DesignTypes.ParametricDesignType
        params = design.userParameters
        params.add("body_t", V.createByString("14 mm"), "mm", "Upright body thickness (drives mass)")
        params.add("pickup_t", V.createByString("body_t + 6 mm"), "mm", "A-arm pickup clevis thickness")
        params.add("bore_d", V.createByString("62 mm"), "mm", "Hub bearing bore (6012-size bearing)")
        params.add("pp_max_mass_g", V.createByReal(450), "", "TruthLink target: max upright mass in grams")
        # The watcher reads required feature/body names from this parameter's comment.
        params.add("pp_required", V.createByReal(1), "", "Brake Caliper Mount, Steering Arm, Bearing Bore, Tie Rod Hole")

        comp = design.rootComponent
        R, AW, AL = 4.5, 3.0, 9.5  # cm: housing radius, arm width, arm length
        NEW = adsk.fusion.FeatureOperations.NewBodyFeatureOperation
        JOIN = adsk.fusion.FeatureOperations.JoinFeatureOperation

        sk = comp.sketches.add(comp.xYConstructionPlane)
        sk.name = "Bearing housing"
        sk.sketchCurves.sketchCircles.addByCenterRadius(P(0, 0, 0), R)
        body = _extrude(comp, sk.profiles.item(0), "body_t", NEW, "Upright Body")

        sk = comp.sketches.add(comp.xYConstructionPlane)
        sk.name = "Upright arms"
        _rect(sk, -AW / 2, R - 0.6, AW / 2, R + AL)
        _rect(sk, -AW / 2, -R - AL, AW / 2, -R + 0.6)
        coll = adsk.core.ObjectCollection.create()
        for p in sk.profiles:
            # keep only the arm profiles (skip the sliver overlapping the housing circle)
            if p.areaProperties().area > 5:
                coll.add(p)
        arms = comp.features.extrudeFeatures.createInput(coll, JOIN)
        arms.setDistanceExtent(False, V.createByString("body_t"))
        arms.participantBodies = [body.bodies.item(0)]
        comp.features.extrudeFeatures.add(arms).name = "Upright arms"

        sk = comp.sketches.add(comp.xYConstructionPlane)
        sk.name = "Pickups"
        _rect(sk, -2, R + AL, 2, R + AL + 2.5)
        _extrude(comp, sk.profiles.item(0), "pickup_t", NEW, "Upper A-arm Pickup")
        sk = comp.sketches.add(comp.xYConstructionPlane)
        _rect(sk, -2, -R - AL - 2.5, 2, -R - AL)
        _extrude(comp, sk.profiles.item(0), "pickup_t", NEW, "Lower A-arm Pickup")

        sk = comp.sketches.add(comp.xYConstructionPlane)
        sk.name = "Steering arm"
        _rect(sk, R - 0.5, -1.25, R + 6, 1.25)
        _extrude(comp, sk.profiles.item(0), "body_t", NEW, "Steering Arm")

        sk = comp.sketches.add(comp.xYConstructionPlane)
        sk.name = "Caliper ears"
        _rect(sk, -R - 3, 2.8, -R + 0.5, 4.4)
        _rect(sk, -R - 3, -4.4, -R + 0.5, -2.8)
        _extrude(comp, _profiles(sk), "body_t", NEW, "Brake Caliper Mount")

        bore = comp.sketches.add(comp.xYConstructionPlane)
        bore.name = "Bearing bore"
        c = bore.sketchCurves.sketchCircles.addByCenterRadius(P(0, 0, 0), 3.1)
        bore.sketchDimensions.addDiameterDimension(c, P(2, 2, 0)).parameter.expression = "bore_d"
        ext = comp.features.extrudeFeatures
        inp = ext.createInput(bore.profiles.item(0), adsk.fusion.FeatureOperations.CutFeatureOperation)
        inp.setAllExtent(adsk.fusion.ExtentDirections.PositiveExtentDirection)
        ext.add(inp).name = "Bearing Bore"

        _cut_holes(comp, [(0, R + AL + 1.4), (0, -R - AL - 1.4)], 0.5, "Pickup Bolt Holes")
        _cut_holes(comp, [(-R - 2, 3.6), (-R - 2, -3.6)], 0.45, "Caliper Bolt Holes")
        _cut_holes(comp, [(R + 5, 0)], 0.4, "Tie Rod Hole")

        mat = _aluminum(app)
        if mat:
            for b in comp.bRepBodies:
                b.material = mat

        mass = comp.getPhysicalProperties().mass * 1000
        ui.messageBox(
            f"Example upright created.\nMass: {mass:.0f} g (target {450} g, material: {mat.name if mat else 'default — assign aluminum'})\n\n"
            "Save it to your cloud project, then run TruthLinkSnapshot or start the TruthLink Watcher add-in.\n"
            "Demo: change body_t from 14 mm to 11 mm, save, and the mass check flips to pass.",
            "TruthLink",
        )
    except Exception:
        if ui:
            ui.messageBox("Example upright failed:\n" + traceback.format_exc())
