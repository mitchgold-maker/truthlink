# Codex lane: evidence verification + follow-ups

Paste everything below the line into Codex (pointed at `mitchgold-maker/proofpilot`, branch `main`).

---

You are working in the ProofPilot hackathon repo. Read `AGENTS.md`, `docs/AI_CONTRACTS.md` (§2 verify_evidence, §4 draft_followup) and `docs/partner/DEVELOPMENT_NOTES.md` first. All code must be new; do not copy from anywhere outside this repo.

**Architecture (already in place, do not change):** `web/` is a Next.js 15 app. The UI is plain JS in `web/public/index.html` + `web/public/app.js` (served at `/`). Server AI calls go through `web/lib/ai/llm.ts` → `callJson(zodSchema, system, user)`, an OpenAI-compatible client pointed at Luminal Cloud via env vars. Pattern to copy: `web/lib/ai/extract.ts` + `web/app/api/extract/route.ts`, and how `extract()` in `app.js` calls the API and falls back to local behaviour with an honest label.

**Your files (only touch these):**
- New: `web/lib/ai/verify.ts`, `web/lib/ai/followup.ts`, `web/app/api/verify/route.ts`, `web/app/api/followup/route.ts`
- In `web/public/app.js`, only these functions: `attach`, `checkEvidence`, `review`, `message`, `followupsPage`. Do not edit `extract`, `renderDrafts`, `importDrafts`, `save`, `approve`, `reassign`, or the seed (another agent owns those).

**Task A — real evidence verification (issue #7):**
1. In `attach()`, for each selected file also read its text in the browser when it is text-like (`.txt .md .csv .json`, or `file.type` starts with `text/`), truncated to 15,000 chars. Store on the task as `evidenceDocs: [{name, size, type, text|null}]` (keep `evidence[]` filenames as today).
2. `POST /api/verify` takes `{title, criteria, verification_type: "binary"|"complex", evidence: [{name,size,type,text|null}]}` and returns the §2 contract `{verdict, checks[], summary, missing[]}`, Zod-validated. The prompt must say: files with `text: null` could not be read, so criteria about their contents are `unclear`, never guessed.
3. In `checkEvidence()`: for `type === "manager"` tasks call `/api/verify`. If the verdict is `pass`, set `t.checked = true; t.status = "pending_approval"` (this is the "AI reviewed" state, **never** `completed`; only `approve()` completes it). Store `t.aiReview = {verdict, checks, summary, missing, model, provider, at}`. On `fail`/`needs_review`, keep the task open and show `missing`. If the API errors, fall back to the existing filename checklist and label it "Local checklist (AI unavailable)".
4. `exists` tasks keep the current file-presence logic (no AI).
5. In `review()`, render `t.aiReview` when present: verdict tag, each check with met yes/no/unclear and reason, and "AI · provider · model". Replace the "Demo stores filenames only…" hint with accurate text.

**Task B — follow-up drafts (issue #11):**
`POST /api/followup` implements §4 (`{message, tone, suggested_next_step}`; message under 400 chars; no invented facts; never mention hours worked). In `followupsPage()`/`message()`, add a "Draft with AI" button per follow-up that replaces the template text with the AI draft and labels it. Nothing is ever sent; it is copy-to-clipboard only.

**Rules:** TypeScript strict; validate every AI response with Zod; never set `completed` from AI; keep the UI's look. Run `cd web && npx tsc --noEmit && node --check public/app.js && npm run build` before each commit. Commit small with `feat: … (#7)` / `(#11)`, `git pull --rebase` before every push. When done, list which acceptance criteria you verified and how.
