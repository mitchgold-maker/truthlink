# Codex lane, round 6: feature tour for the video + product polish

Commit only, never push (Claude pushes). Branch `main`. Run `cd web && npx tsc --noEmit && node --check public/app.js && npm run build` before every commit. MongoDB is **dropped**: the app saves in the browser, so don't add database features. Don't touch `web/public/demo/**`, `web/app/api/**` or `web/lib/**` (Claude owns them).

**V. Feature tour page `web/public/tour/index.html` (for the 90-second video).** Standalone HTML in the same style as `web/public/demo/index.html` (TruthLink logo, green #276d55, cards). One scrolling page with a section per feature. Each section has: a title, one plain sentence, what's real vs simulated, and an "Open it" link into the app or the demo:
1. Meeting notes → tasks with Luminal AI (owners, deadlines, criteria, source quotes)
2. Slack: read minutes, send tasks and follow-ups (bot token; simulated when not connected)
3. Autodesk Fusion add-in: on-save checks on the engineer's machine (mass, versions, required features)
4. Rules-first verifier: measured / AI / needs-team-lead; AI never completes work
5. Who's good at what: demonstrated skills from approved work only
6. Out-of-office coverage: deterministic ranking + AI explanation + team-lead approval
7. Follow-ups that schedule themselves
8. Decision log, with superseded decisions linked
9. Handoff pack when someone graduates or leaves
10. Team insights: completion, capacity risk, deadline forecast
11. Team Memory: on-device AI semantic search (`/memory`); data never leaves the device
12. Built on: AWS Amplify hosting, Luminal Cloud (DeepSeek-V4.1-Flash), AWS App Monetization (plans + checkout, if live)

Add `{ source: "/tour", destination: "/tour/index.html", permanent: false }` to the redirects in `web/next.config.ts`. That one line is the only exception to the file rule above.

**W. Polish visible in the demo** (all in `app.js`):
- Decisions page: format ISO timestamps as "Oct 8, 10:00".
- Scroll to top when switching pages.
- Hash routing (`#overview`, `#tasks`…) so the browser Back button stays inside the app.
- Overview: replace the old "Demo controls / guided demo" card with a single "Watch the 2-minute demo" link to `/demo`.

**X. Empty first-run state.** If localStorage has no workspace, show a welcome card: "Start with the sample racing team" (loads the seed) or "Start empty" (empty arrays). This is so it looks like a product a new company signs up for.

Report what you verified for each letter.
