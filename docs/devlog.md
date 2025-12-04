# DataBooth DevLog

## 2025-12-03 - DataMaps Feature & Deployment Safeguards

**Session:** SPOK + CEO

### Session Summary

**What we accomplished:**
- Deployed interactive data maps for Vegas conference presentation
- Discovered and fixed cross-account Vercel contamination (DataBooth accidentally linked to HeadVroom account)
- Implemented mandatory deployment safeguards

**DataMaps Feature:**
First DataBooth visualization product - self-contained HTML maps for iframe embedding.

| Version | Description | URL |
|---------|-------------|-----|
| demo.html | Senior population growth (Mapbox) | https://www.databooth.net/datamaps/demo.html |
| demo-v2.html | Connie beta sites + CIS infrastructure | https://www.databooth.net/datamaps/demo-v2.html |
| demo-v3.html | Final with logos | https://www.databooth.net/datamaps/demo-v3.html |

Source files preserved in `/code/datamaps/` with descriptive names.

**Incident: Cross-Account Contamination**
- `vercel link` created duplicate DataBooth project in HeadVroom's Vercel account
- Root cause: CLI defaults to authenticated account without verifying domain ownership
- Resolution: Removed duplicate project, cleared stale `.vercel` config
- Prevention: Added `START_HERE.md` and `DEPLOYMENT.md` with mandatory pre-deploy checklist

**New Files Added:**
- `START_HERE.md` - Agent onboarding, project identity
- `DEPLOYMENT.md` - Mandatory deployment checklist, incident history
- `code/datamaps/` - Source files for DataMaps feature

**Lesson Learned:**
Trust GitHub auto-deploy over Vercel CLI. If a project has GitHub integration configured, `git push` is the correct deploy method. CLI deploys can create duplicates in wrong accounts.

---

## 2025-11-29 - Day 1: From Zero to SaaS

**Session:** SPOK + CEO + CTO

### Session Summary

**What we accomplished:**
DataBooth went from a forked repo exploration to a fully deployed, payment-enabled SaaS in a single session. The app is live at https://databooth.net with working auth (Clerk), database (Supabase), and payments (Stripe).

**HOBACK Status:** DataBooth is officially the 4th venture in the HOBACK seed portfolio.

**Production Ready:**
- Full E2E flow tested and verified
- Sign up → Buy credits → Generate dashboard → Credit deducted
- All accounts under thedatabooth@gmail.com for clean isolation

**Next Session Handoff:**
- Phase 4 (Feature Build) is queued and ready
- Priority: 4-step story flow, output packaging (PDF export)
- See `/docs/ideas.md` for naming exploration and future features
- Mock data files available in `/assets/mock_data/` for testing

**Deployment Flow (MUST FOLLOW):**
```
Local → GitHub (hoback-labs/databooth) → Vercel (auto-deploy)
```
- All code changes go through GitHub, never direct to Vercel
- Vercel is connected via Git integration and auto-deploys on push to `main`
- Env vars are managed in Vercel dashboard (or CLI), not in repo

**Data Visualization Library:**
- **Recharts** - React charting library built on D3
- Supports: Bar, Line, Pie, Treemap, Area, etc.
- Docs: https://recharts.org

---

### Phase 1: Evaluation (Complete)

**Objective:** Determine if DataBooth earns a seat in the HOBACK portfolio.

- Kicked tires on Leniolabs ai-data-dashboard fork
- Core value prop validated: "Ugly data in, pretty dashboard out"
- Photobooth pricing model identified (one-time, transactional)
- HOBACK criteria assessed: ✅ Standalone, ✅ Real pain point, ✅ Operator-matchable

**Decision:** DataBooth is IN. Fourth venture in the HOBACK seed portfolio.

---

### Phase 2: Modernization (Complete)

**Objective:** Fresh scaffold with modern stack, replicate existing functionality.

**CTO delivered:**
| Component | Technology |
|-----------|------------|
| Framework | Next.js 15.5 + React 19 + App Router |
| Styling | Tailwind CSS + shadcn/ui patterns |
| AI | Vercel AI SDK + OpenAI GPT-4o-mini |
| Charts | Recharts (Bar, Line, Pie, Treemap) |
| Data | PapaParse for CSV processing |

**Architecture highlights:**
- Server Actions - API key never exposed to client
- Modern component patterns from shadcn/ui
- Responsive layout, loading states, error handling

**Directory structure:**
```
databooth/
├── app-v1-legacy/    ← Original modernized code (preserved)
└── app/              ← Fresh v2.0 build
```

---

### Phase 3: SaaS Infrastructure (Complete)

**Objective:** Enable DataBooth to accept payments and track usage.

**Implemented:**
| Component | Provider | Status |
|-----------|----------|--------|
| Auth | Clerk | ✅ Working |
| Database | Supabase (Postgres) | ✅ Working |
| Payments | Stripe Checkout | ✅ Working |
| Webhooks | Stripe CLI (local) | ✅ Working |

**Credit Pack Pricing:**
- Starter: 5 credits / $5 ($1.00/generation)
- Pro: 15 credits / $25 ($1.67/generation) - "Most Popular"
- Team: 50 credits / $50 ($1.00/generation)

**End-to-end flow verified:**
1. Sign up/in via Clerk ✅
2. 0 credits → pricing modal shown ✅
3. Stripe Checkout → payment processed ✅
4. Webhook fires → credits added ✅
5. Generate dashboard → credit deducted ✅

**Accounts provisioned (all under thedatabooth@gmail.com):**
- OpenAI (API key active)
- Clerk (auth configured)
- Supabase (database ready)
- Stripe (sandbox mode, 3 products created)

---

### Phase 3.5: Deployment (Complete)

**Objective:** Get DataBooth live on a real server with a real domain.

**Completed:**
- [x] Initialize git repo for /databooth/app
- [x] Initial commit + push to GitHub
- [x] GitHub org created: `hoback-labs` (for HOBACK venture isolation)
- [x] Repository: https://github.com/hoback-labs/databooth (public)
- [x] Deploy to Vercel (databooth.vercel.app)
- [x] Domain purchased: **databooth.net** ($11/year)
- [x] Configure production env vars in Vercel
- [x] Set up production Stripe webhook
- [x] DNS configuration (A records, www redirect)
- [x] Verify end-to-end flow on production ✅

**Production URL:** https://databooth.net

**Critical Bug Discovered & Fixed:**
- Supabase and OpenAI API keys were truncated when pasted into Vercel dashboard
- Discovered via `vercel env pull` audit
- Fixed by re-adding full values via Vercel CLI
- Lesson: Always verify env vars after deployment, use CLI for long values

**Accounts (all under thedatabooth@gmail.com):**
- GitHub: hoback-labs org member
- Vercel: databooth project, databooth.net domain
- Stripe: Production webhook endpoint configured

---

### Phase 4: Feature Build (Queued)

**Objective:** Build out the full DataBooth experience.

**The 4-Step Flow:**
1. **Setup** - "Tell me about your data and the story you want to tell" (context, audience, goal)
2. **Intake** - Upload CSV (later: connect to data sources)
3. **Prototype** - AI generates dashboard, user iterates
4. **Deliver** - Agree on output, pay, receive package

**Feature backlog:**
- Story/context input UI (Step 1)
- Audience selector
- Output packaging (PDF export minimum)
- Remove API key UI for regular users
- Admin/demo account unlimited credits flag
- Saved dashboards (user can return to previous work)

---

### Ideas Parking Lot

See `/docs/ideas.md` for:
- Naming exploration (DataFable, DataTeller, etc.)
- BYOAI (Bring Your Own AI) tier concept
- Future Lenio tools to explore (jsongraph-builder, promptwizard)

---

*Log entries in reverse chronological order*
