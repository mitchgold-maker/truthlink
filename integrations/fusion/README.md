# Fusion evidence snapshot

Real integration (not simulated): a Fusion script exports measured facts from the open design so ProofPilot verifies CAD deliverables against numbers, not filenames.

1. Fusion → Utilities → Scripts and Add-Ins → **+** (Scripts tab) → "Script or add-in from device" → pick `integrations/fusion/ProofPilotSnapshot`.
2. Open the design, select **ProofPilotSnapshot**, click **Run**, save `<design>.proofpilot.json`.
3. In ProofPilot, open the task → upload the JSON as evidence → run the check. The verifier compares criteria such as "mass 450 g or less" with the snapshot's `mass_g`.

Exports: mass, volume, bounding box, center of mass, user parameters, bodies and materials, components, timeline length, version history (version number, saved by, saved at). Nothing is inferred; no working time is derived.
