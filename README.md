# TruthLink

> **TruthLink knows what needs to get done, verifies what actually got done, and knows who can get the rest done.**

AI-powered workforce and project management **for large engineering organizations, such as aerospace and defense companies like Lockheed Martin and Boeing** (target market; no affiliation). **Student engineering clubs are our pilot groups**: they test the features and their feedback shapes the product. TruthLink turns meeting notes into assigned tasks, checks submitted evidence against each task's requirements, learns what each person has demonstrably done, and keeps projects on schedule with follow-ups and capacity-aware reassignment.

Built at **c0mpiled-15** (Penn State, Oct 11 2026) for **Track 1 (Transpose Platform, 1C Data for the Real World)** and the **Bloomerang pool (working with non-profits)**, with feature feedback from student engineering club pilot groups. All product code is written during the event. See [docs/TRACKS.md](docs/TRACKS.md).

## Status

| Area | State |
|---|---|
| Planning and docs | Done (this repo) |
| App (`web/`) | Not started. Scaffolded at build start |
| Deployment | Not started (Vercel) |

Track progress in [Issues](../../issues) and [Milestones](../../milestones).

## The demo loop (what must work)

1. Upload meeting notes → AI creates draft tasks → manager approves.
2. View assignments and employee workload.
3. Submit task evidence → AI checks it against the task's completion requirements.
4. Manager approves a complex task → the employee's verified history updates.
5. Put an employee on PTO → TruthLink recommends a qualified, available replacement → manager approves.
6. Follow-up recommendations and recent activity on the dashboard.

Steps 1–5 come first. Step 6, integrations and polish only if time allows. Full script: [docs/DEMO_SCRIPT.md](docs/DEMO_SCRIPT.md).

## Stack

| Layer | Choice |
|---|---|
| Frontend | Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui |
| Backend and data | Supabase (Postgres, Auth, Storage, Row Level Security) |
| AI | LLM API with structured JSON output, validated with Zod |
| Notifications | Slack incoming webhook (outgoing only for the MVP) |
| Hosting | Vercel |

Details and rationale: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) and [docs/DECISIONS.md](docs/DECISIONS.md).

## Repo map

```
truthlink/
├─ README.md              you are here
├─ AGENTS.md              rules for AI coding agents (Claude Code, Codex, Kiro)
├─ CLAUDE.md              points Claude Code at AGENTS.md
├─ docs/
│  ├─ PRD.md              product requirements and scope (MVP vs later)
│  ├─ ARCHITECTURE.md     system design, request flows, permissions
│  ├─ DATA_MODEL.md       tables, statuses and the rules they enforce
│  ├─ AI_CONTRACTS.md     every AI call: input, JSON output, guardrails
│  ├─ DEMO_SCRIPT.md      the judged demo, step by step
│  ├─ TRACKS.md           Track 1C + Bloomerang judging fit
│  ├─ DECISIONS.md        short architecture decision records
│  └─ ROADMAP.md          post-hackathon features
├─ validation/
│  └─ LOG.md              club interviews, feedback, pilot commitments (Bloomerang evidence)
├─ data/
│  ├─ README.md           dataset contract for imported test data
│  └─ seed/               JSON datasets (employees, projects, notes, evidence)
├─ web/                   Next.js app (created at build start)
├─ .github/               issue and PR templates
├─ .env.example           required environment variable names (no values)
└─ .gitignore
```

## Team

| Who | Owns |
|---|---|
| Mitchell | All code, architecture, database, integrations, deployment (with AI coding agents) |
| Partner | Pilot-group outreach and feature feedback from engineering clubs (validation/LOG.md), test data and realistic profiles, example projects and meeting notes, task evidence, edge cases, product testing, final pitch |

## Running locally

Added once the app is scaffolded. Copy `.env.example` to `web/.env.local` and fill in values. Never commit secrets.
