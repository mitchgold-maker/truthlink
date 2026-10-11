# ProofPilot strategy: verification design, enterprise path, track fit, spend safety

## 1. Verification ladder (cheapest proof first)
Each criterion climbs only as far as it needs to. Most CAD criteria never reach an LLM.

| Tier | What | Cost | Example |
|---|---|---|---|
| 0. Presence | File exists, non-empty | free | "Upload sponsor logo pack" |
| 1. Freshness | Fusion version saved **after** the task was last updated, by the assignee | free | "v4 saved by Jordan at 15:40, after task update 10/10" |
| 2. Measured facts | Mass, bounding box, parameters, materials vs. numeric limits | free | "512 g > 450 g limit" |
| 3. Structure | Named components / features / parameters exist (fuzzy match) | free | "Brake Caliper Mount ≈ caliper mount" |
| 4. Text judgment | LLM on the undecided criteria only, with a compact digest of the snapshot (~300 tokens, not the 10 KB file) | ~0.5–1k tokens | "report covers camber through full travel" |
| 5. Visual | Viewport screenshot to a vision model, only when a criterion is visual ("fillets on all edges", "matches sketch") and the facts cannot answer it | highest | opt-in per criterion |
| 6. Human | Judgment calls ("team lead confirms…") skip the AI and go straight to the approver | free | approval queue |

Implemented: tiers 0–4 and 6 (`web/lib/verify/rules.ts`, `web/lib/ai/verify.ts`). The verify response reports how many criteria were settled by measurement vs. AI.
Next: the Fusion add-in sends the task's `since` time automatically; checks diff against the previous snapshot ("mass went 540 → 512 g since last review"), and caches identical snapshots by hash so re-checks cost nothing.
Tier 5 needs a vision model. Luminal's endpoints are text (DeepSeek) and image generation (Ideogram), so vision would come from Amazon Bedrock (Nova Lite), gated per criterion.

## 2. Enterprise path (target market: large aerospace and defense engineering orgs; never imply any company is a customer)
The same evidence adapters, pointed at enterprise systems of record:
- **Design / PLM:** Fusion today → Teamcenter, Windchill, 3DEXPERIENCE (release state, revision, who checked in, BOM changes).
- **Requirements:** DOORS / Jama. Acceptance criteria become requirement IDs; the verification ladder produces the evidence trail for each requirement.
- **Simulation and test:** MATLAB/Simulink test results, ANSYS/Abaqus reports, test-stand logs. Tier 2 reads margins, pass/fail and run IDs.
- **Code / firmware:** GitHub/GitLab CI status as binary evidence.
- **Deployment:** export-controlled programs (ITAR/CUI) need on-prem or on-device models. The rules tiers already run with no model at all, which is the starting point for an air-gapped edition.
- **Value:** program managers stop chasing status. Every "done" carries evidence, and demonstrated-skill records make staffing and succession data-driven.

Wedge: student and external engineering clubs (racing, rocketry, robotics) use the same product for free/cheap, which builds the record and the workflow before the enterprise sale. It also builds a hiring signal: verified work histories of students who become those companies' engineers.

## 3. Club feedback → product (validation/LOG.md)
| Pain (Nittany AI) | Feature |
|---|---|
| Knowledge leaves when members graduate | **Handoff pack**: one click turns a member's verified records, decisions and open work into a successor brief |
| Parent org: what worked, what changed, why old things are not relevant | **Decision log**: every approval, rejection, reassignment and spec change stores *why*; old decisions marked superseded |
| Who is responsible for what | **Ownership map**: subsystem × owner × backup, from live assignments |
| People forget to schedule food | **Recurring logistics tasks** with owners and reminders |

## 4. Track map
| Track / pool | Our angle | Must show |
|---|---|---|
| Transpose 1C (Data for the Real World) | Measured engineering data replaces "I think it's done"; insights page; deadline forecast | Fusion check failing a real part on numbers |
| Luminal (judge Joe Fioti) | All AI on Luminal DeepSeek-V4.1-Flash; rules-first design keeps token use low | Provider label in UI; tokens per check |
| AWS | Amplify hosting, S3 evidence store, Textract on PDF drawings, Bedrock vision for tier 5, Budgets guard | Architecture slide naming every service |
| MongoDB | Atlas as the system of record: tasks, people, decisions, snapshot history (time series), Atlas Search over decisions ("team memory") | Live data in Atlas; search answering "why did we change the upright material?" |
| Bloomerang | Club pilots (nonprofit student orgs); feedback → shipped features | LOG.md rows + the features they caused |
| EEP (sales story) | Clubs pilot now; enterprise is the market | Pilot sign-ups / intent quotes |
| AGI (on-device) | Fusion add-in that runs on the engineer's machine, checks every save locally, and reports | Live in Fusion: save → instant "512 g > 450 g" |

## 5. Spend safety (no charges beyond sponsor credits)
- **Luminal:** `web/lib/ai/llm.ts` enforces `max_tokens`, an input-size cap, an hourly call cap, a token budget and `LLM_DISABLED=1` as a kill switch; `/api/health` shows usage. Ask the Luminal team whether the key can ever bill a card; if no card is attached, overage is impossible.
- **AWS:** before deploying, create an AWS Budget of $1 with an email alert, plus a budget action that applies a deny-all IAM policy to the app's user at 80% of credits. Use Amplify, S3 and Textract within free-tier limits; Textract only on PDFs the user uploads, max 1 page per evidence file.
- **MongoDB:** Atlas M0 (free forever, no card needed).
- Never put keys in the repo; keys live in `.env.local` and Amplify environment variables. Rotate the Luminal key after the event (it was pasted in chat).
