# TruthLink: brief for the 90-second demo video script

Hand this whole file to the scriptwriting AI. The video is a required c0mpiled-15 submission (Penn State, Oct 11 2026). Hard limit: **90 seconds**. Output wanted: a two-column script (VISUAL | VOICEOVER) with timestamps, plus on-screen text callouts.

## One-liner
**TruthLink verifies engineering work instead of trusting status updates.** It turns meeting notes into owned tasks, checks deliverables against measured data straight from the CAD model, and builds a verified record of who can do what, so knowledge survives when people leave.

Tagline options: "Work, with proof." · "Jira tracks claims. TruthLink reads the CAD."

## Who it's for
- **Pilot users now:** student engineering clubs (racing, rocketry, robotics, AI clubs). Nonprofit student orgs with constant turnover.
- **Market:** large engineering organizations, for example aerospace and defense firms. Say "built for teams like those at large aerospace companies". **Never** say or imply any company (Lockheed Martin, Boeing, etc.) is a customer, partner or endorser.

## The problem (use the real quote)
From a real student club conversation today (Nittany AI):
> "Year to year… all the people that learned a lot go off and start jobs and the club loses that knowledge and has to restart."

Other pains they named: knowing who's responsible for what, tracking what changed and why, and even forgetting to schedule food.
Universal version: "done" is self-reported. Managers chase status, deadlines slip, and knowledge walks out the door.

## What to show (real, working features, in demo order)
1. **Meeting notes → tasks (AI, Luminal Cloud).** Paste a design-review recap; TruthLink drafts tasks with owner, due date, effort, skills, acceptance criteria and the exact source quote. Unassigned items ("book the skidpad") stay unassigned rather than guessed. Nothing is assigned until the team lead approves.
2. **Real Fusion integration.** An engineer saves a front upright in Autodesk Fusion. The TruthLink add-in checks it on the engineer's own machine on every save: "Mass 551 g > 450 g target. NOT READY."
3. **Evidence check in the app.** The verifier reports per criterion: Measured (mass, new version saved after the task update, required features found), AI (text judgment), Needs team lead (judgment calls). AI can never mark complex work complete; only the team lead can.
4. **The fix.** The engineer changes one parameter (body thickness 14 → 11 mm) and saves. The check flips to PASS. Team lead approves; Jordan's verified-skill record updates.
5. **Coverage.** A member goes unavailable (exam week); TruthLink ranks qualified replacements by verified experience and free hours, and AI explains the pick.
6. **Team insights + decision log + handoff pack.** Every number comes from verified records. One click turns a graduating member's verified work and decisions into a successor brief. That last one answers the club's quote directly.

## Real numbers you may use (do not invent others)
- Meeting-notes extraction: about 8 seconds for a short recap (Luminal Cloud, DeepSeek-V4.1-Flash).
- Fusion check example: 3 of 4 criteria settled by measured CAD data, 1 AI check of about 650 tokens. Rules-first means most checks cost zero AI tokens.
- Validation: clubs interviewed so far, with real quotes. Fill in the final count from `validation/LOG.md` before recording; do not round up.

## Tech to name (judges care; keep it to one fast beat or an on-screen architecture card)
Luminal Cloud (all LLM calls) · Autodesk Fusion add-in (on-device checks) · AWS (Amplify hosting, S3 evidence, Textract on PDF drawings; only claim what is deployed at recording time) · MongoDB Atlas (records, decision log, search; only if connected by recording time) · Next.js.

## Tone and style
Confident, fast, concrete. Show the product, not slides. One human moment at the start (the club quote, on screen as text), then product. End on the tagline and the logo (green chain-link check mark, "TruthLink").
Brand colors: green #276d55, near-black #1f2d28, white. Logo file: `web/public/truthlink-logo.png`.

## Suggested structure (the writer can improve it)
- 0–10 s: the problem, using the club quote on screen.
- 10–25 s: notes → tasks.
- 25–55 s: Fusion save → NOT READY → fix → PASS → approve. This is the hero moment, so give it the most time.
- 55–70 s: coverage swap + insights.
- 70–82 s: handoff pack: "knowledge stays when people graduate."
- 82–90 s: market line (clubs today, large engineering orgs next) + tagline + logo.

## Rules for the script
- Every claim must match what the app actually does on screen. Label simulated or fictional data: the demo team "Demo Racing Team" and its members are fictional.
- No fake metrics, revenue or customers. Pilot interest is "interest", not "customers", unless someone signed or paid.
- Mention the team: Mitchell Goldman and George Kuney.
