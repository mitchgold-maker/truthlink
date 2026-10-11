# Decisions

Short records of choices that shape the build. Add one when a choice is hard to reverse.

## D1. Next.js + Supabase + Vercel
**Why:** fastest path to a deployed full-stack app with auth, Postgres, file storage and row-level security in one service. Vercel deploys Next.js with zero config.
**Trade-off:** not eligible for AWS-specific prize criteria.

## D2. Approval rules enforced in the database and server, not prompts
**Why:** the product's core promise is trustworthy verification; a UI-only rule can be bypassed. RLS + server role checks.

## D3. Replacement ranking is deterministic; AI only explains
**Why:** reproducible, auditable recommendations that work even if the LLM call fails.

## D4. Simulated integrations for the MVP, same schema as real ones
**Why:** real OAuth integrations would consume the build window. Simulated rows are labelled `source = 'simulated'`, so swapping in real connectors later needs no schema change.

## D5. Next.js app lives in `web/`
**Why:** keeps docs, datasets and repo config at the root; `create-next-app` needs an empty target directory. Vercel project root = `web/`.
