# Codex lane, round 5: demo hardening (work independently)

Do round 4 (`docs/CODEX_PROMPT_4.md`) first if it isn't done. Then work through this list **in order** without waiting for anyone. Same rules: commit only (Claude pushes); `cd web && npx tsc --noEmit && node --check public/app.js && npm run build` before every commit; one commit per item; keep the existing visual style. **Feature freeze at 19:15**: after that, only fixes.

**N. Slow-AI states (the demo will stall without this).** Meeting-note extraction can take up to 30 s.
- Show a live elapsed timer ("Reading notes with Luminal… 12 s") and disable the button while it runs.
- Do the same for verify, explain, handoff and follow-up calls.
- Stop waiting after 45 s, then fall back with a clear label.
- Never allow double submits.

**O. Link to the Verifier Lab.**
- Add a nav item "Verifier Lab ↗" that opens `/lab` in a new tab.
- Add an Overview callout: "Our verifier improves itself: 92.2% → 99.0% on a fresh test (parallel agents on Luminal)." Read the numbers from `/lab/results.json`; never hardcode them.

**P. Integrations page truthfulness.**
- Fusion is now a **real** integration (add-in + `/api/fusion/snapshot`). Mark it "Connected via add-in" and list the designs from `GET /api/fusion/snapshot` (name, mass, version, last received).
- Keep the others labelled "Not connected" or "Simulated" exactly as they are.

**Q. Deadline forecast on Team insights (Track 1C).**
- Per subsystem: remaining open hours ÷ (sum of available member capacity per week) → projected finish date.
- Compare against a configurable competition date (default "2026-11-14 · Design report due").
- Show "on track" or "N days late". Caption: "Projection from current assignments and declared capacity."

**R. Mobile and small screens.** At 375 px wide:
- no horizontal scroll
- the nav collapses
- modals fit the screen
- tables scroll inside their own container

**S. Empty and error states.**
- Every page renders with zero tasks, zero people and zero decisions.
- Every API failure shows a toast with what happened plus the fallback used. No silent failures and no console errors on load.

**T. Reset and demo controls.**
- "Reset demo" restores the seed, including decisions and recurring tasks.
- When synced to the database, Reset also `PUT`s the seed to `/api/state`.
- Add a "Demo script" button that opens a panel listing the 6 demo steps from `docs/VIDEO_BRIEF.md`.

**U. Accessibility basics.**
- Every button and input has a label.
- Focus is visible.
- Modals close on Escape and trap focus.
- Colour contrast is at least 4.5:1 on tags.

When done, list each item with what you verified and how.
