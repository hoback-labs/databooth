import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe/config";
import { addCredits } from "@/lib/supabase/users";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const userId = session.metadata?.userId;
    const credits = parseInt(session.metadata?.credits || "0", 10);
    const priceCents = parseInt(session.metadata?.priceCents || "0", 10);

    if (userId && credits > 0) {
      const success = await addCredits(
        userId,
        credits,
        priceCents,
        session.id
      );

      if (!success) {
        console.error("Failed to add credits for session:", session.id);
      } else {
        console.log(`Added ${credits} credits to user ${userId}`);
      }
    }
  }

  return NextResponse.json({ received: true });
}
