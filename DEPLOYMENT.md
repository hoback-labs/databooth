# DataBooth Deployment Guide

## MANDATORY PRE-DEPLOYMENT CHECKLIST

**Before ANY deployment operation, you MUST complete this checklist and read it back to the CEO.**

### Step 1: Confirm Project Identity

```bash
# Verify you're in the correct directory
pwd
# Expected: .../databooth/app

# Verify git remote
git remote -v
# Expected: origin https://github.com/hoback-labs/databooth.git
```

### Step 2: Verify Deployment Method

**DataBooth uses GitHub auto-deploy. The correct deployment flow is:**

```
git push origin main → GitHub → Vercel auto-deploy → databooth.net
```

**DO NOT use Vercel CLI for production deployments.**

### Step 3: If You Must Use Vercel CLI

If CLI operations are absolutely necessary (e.g., checking logs), verify account context FIRST:

```bash
# Check which account you're logged into
vercel whoami

# Check if you have access to databooth.net
vercel domains inspect databooth.net
```

**If `vercel domains inspect databooth.net` returns "no access" - STOP.**
You are in the wrong Vercel account.

### Step 4: Never Run These Commands Blindly

| Command | Risk | Alternative |
|---------|------|-------------|
| `vercel link` | Creates project in wrong account | Use GitHub auto-deploy |
| `vercel --prod` | Deploys to wrong project | Use `git push` |
| `vercel deploy` | Same as above | Use `git push` |

---

## Correct Deployment Process

### To Deploy Changes to Production:

```bash
# 1. Verify you're on main branch
git branch

# 2. Check status
git status

# 3. Add changes
git add <files>

# 4. Commit (no Claude attribution in message)
git commit -m "Your commit message"

# 5. Push to trigger auto-deploy
git push origin main

# 6. Verify deployment
curl -sI https://www.databooth.net | head -5
```

### To Add Static Files (like data maps):

Static files go in `public/` directory and are served at root:
- `public/datamaps/foo.html` → `databooth.net/datamaps/foo.html`

---

## Incident History

### 2025-12-03: Cross-Account Contamination

**What happened:** Agent ran `vercel link` while authenticated to HeadVroom account, creating duplicate DataBooth project in wrong Vercel account.

**Impact:** Confusion, cleanup required, potential for deploying to wrong domain.

**Resolution:** Removed duplicate project, cleared local `.vercel` config.

**Prevention:** This checklist is now mandatory.

---

## Vercel Account Reference

| Project | Vercel Account | Domain |
|---------|---------------|--------|
| DataBooth | (separate from HeadVroom) | databooth.net |
| HeadVroom | headvrooms-projects | headvroom.com |

**These are separate accounts. Do not assume CLI access to one means access to the other.**
