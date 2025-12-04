# DataBooth Production Checklist

## Infrastructure Setup

### GitHub
- [x] Repo created: `hoback-labs/databooth`
- [x] Made public (Vercel free tier)
- [x] Initial commit pushed

### Vercel
- [x] Account created: thedatabooth@gmail.com
- [x] Connected to GitHub repo
- [x] Deployed successfully

### Domain
- [x] Domain purchased: databooth.net ($11)
- [x] Added to Vercel
- [x] DNS configured
- [x] HTTPS working

---

## Environment Variables (Vercel)

### Clerk Auth
- [x] NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
- [x] CLERK_SECRET_KEY
- [x] NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
- [x] NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

### Supabase
- [x] NEXT_PUBLIC_SUPABASE_URL
- [x] NEXT_PUBLIC_SUPABASE_ANON_KEY
- [x] SUPABASE_SERVICE_ROLE_KEY

### Stripe (Sandbox/Test Mode)
- [x] NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (pk_test_...)
- [x] STRIPE_SECRET_KEY (sk_test_...)
- [x] STRIPE_WEBHOOK_SECRET (whsec_...)
- [x] STRIPE_PRICE_STARTER
- [x] STRIPE_PRICE_PRO
- [x] STRIPE_PRICE_TEAM

### OpenAI
- [x] OPENAI_API_KEY

---

## Third-Party Configuration

### Clerk
- [ ] Add databooth.net to allowed origins (if required)

### Stripe
- [x] Webhook endpoint created: https://databooth.net/api/webhooks/stripe
- [x] Listening to: checkout.session.completed
- [ ] Test webhook delivery

### Supabase
- [ ] Verify RLS policies (if needed)
- [ ] Check database tables exist

---

## Testing (Sandbox Mode)

- [ ] Sign up flow works
- [ ] Sign in flow works
- [ ] Sample data loads
- [ ] Pricing modal appears (0 credits)
- [ ] Stripe checkout works (test card: 4242 4242 4242 4242)
- [ ] Webhook fires and credits added
- [ ] Dashboard generates successfully
- [ ] Credit deducted after generation

---

## Go-Live (When Ready for Real Money)

- [ ] Create live Stripe products/prices
- [ ] Switch to live Stripe keys (sk_live_..., pk_live_...)
- [ ] Create live webhook endpoint
- [ ] Update Vercel env vars
- [ ] Test full purchase flow with real card
- [ ] Monitor first real transactions

---

## Accounts Summary

| Service | Email | Purpose |
|---------|-------|---------|
| GitHub | (via hoback-labs org) | Source code |
| Vercel | thedatabooth@gmail.com | Hosting |
| Clerk | thedatabooth@gmail.com | Auth |
| Supabase | thedatabooth@gmail.com | Database |
| Stripe | (main account) | Payments |
| OpenAI | thedatabooth@gmail.com | AI |

---

*Last updated: 2025-11-29*
