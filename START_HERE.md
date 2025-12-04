# DataBooth - Agent Onboarding

**STOP. Read this entire file before doing anything.**

## Project Overview

- **Domain:** databooth.net (www.databooth.net)
- **Repository:** github.com/hoback-labs/databooth
- **Framework:** Next.js 14 with App Router
- **Auth:** Clerk
- **Payments:** Stripe
- **Deployment:** Vercel (GitHub auto-deploy)

## Critical Rules

### 1. Deployment

**READ `DEPLOYMENT.md` BEFORE ANY DEPLOY OPERATION.**

This project deploys via GitHub integration. Do NOT use Vercel CLI for deployments.

### 2. This is NOT HeadVroom

DataBooth is a completely separate project from HeadVroom. Different:
- Vercel account
- Domain
- Purpose
- Codebase

Never cross-reference HeadVroom configuration when working on DataBooth.

### 3. Environment Variables

Production env vars are managed in Vercel dashboard, not locally.
- `.env.local` is for local development only
- Never commit secrets

## Directory Structure

```
databooth/
├── app/              # Current Next.js application (YOU ARE HERE)
├── app-v1-legacy/    # Old version (do not modify)
├── assets/           # Static assets
├── code/             # Research/reference code
└── docs/             # Documentation
```

## Before You Start Work

1. Confirm you understand which project you're in
2. Read DEPLOYMENT.md if you plan to deploy anything
3. Check `.spoc/` directory for any active context (if it exists)
4. Ask the CEO for clarification if anything is unclear
