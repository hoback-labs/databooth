import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { getStripe, CREDIT_PACKS, type CreditPackId } from "@/lib/stripe/config";
import { getOrCreateUser } from "@/lib/supabase/users";

export async function POST(req: NextRequest) {
  try {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { packId } = await req.json();

    if (!packId || !CREDIT_PACKS[packId as CreditPackId]) {
      return NextResponse.json({ error: "Invalid pack" }, { status: 400 });
    }

    const pack = CREDIT_PACKS[packId as CreditPackId];

    // Get or create user in Supabase
    // Note: We'll get email from Clerk in a real implementation
    const user = await getOrCreateUser(clerkId, "user@example.com");

    if (!user) {
      return NextResponse.json(
        { error: "Failed to get user" },
        { status: 500 }
      );
    }

    // Create Stripe checkout session
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: pack.name,
              description: pack.description,
            },
            unit_amount: pack.priceCents,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: user.id,
        packId: packId,
        credits: pack.credits.toString(),
        priceCents: pack.priceCents.toString(),
      },
      success_url: `${req.nextUrl.origin}/?success=true`,
      cancel_url: `${req.nextUrl.origin}/?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
