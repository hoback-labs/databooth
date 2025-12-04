import Stripe from "stripe";

// Lazy-initialized Stripe client to avoid build-time errors
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2025-11-17.clover",
    });
  }
  return _stripe;
}

// Credit pack products
export const CREDIT_PACKS = {
  starter: {
    name: "Starter Pack",
    credits: 5,
    priceCents: 1000, // $10
    description: "5 dashboard generations",
  },
  pro: {
    name: "Pro Pack",
    credits: 15,
    priceCents: 2500, // $25
    description: "15 dashboard generations",
  },
  team: {
    name: "Team Pack",
    credits: 50,
    priceCents: 5000, // $50
    description: "50 dashboard generations",
  },
} as const;

export type CreditPackId = keyof typeof CREDIT_PACKS;
