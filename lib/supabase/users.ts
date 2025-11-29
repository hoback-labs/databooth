import { createServerClient } from "./client";
import type { User } from "./types";

export async function getOrCreateUser(
  clerkId: string,
  email: string
): Promise<User | null> {
  const supabase = createServerClient();

  // Try to get existing user
  const { data: existingUser } = await supabase
    .from("users")
    .select("*")
    .eq("clerk_id", clerkId)
    .single();

  if (existingUser) {
    return existingUser;
  }

  // Create new user
  const { data: newUser, error } = await supabase
    .from("users")
    .insert({ clerk_id: clerkId, email })
    .select()
    .single();

  if (error) {
    console.error("Error creating user:", error);
    return null;
  }

  return newUser;
}

export async function getUserByClerkId(clerkId: string): Promise<User | null> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("clerk_id", clerkId)
    .single();

  if (error) {
    console.error("Error fetching user:", error);
    return null;
  }

  return data;
}

export async function addCredits(
  userId: string,
  amount: number,
  priceCents: number,
  stripeSessionId: string
): Promise<boolean> {
  const supabase = createServerClient();

  // Add credits to user
  const { error: updateError } = await supabase.rpc("increment_credits", {
    user_id: userId,
    amount: amount,
  });

  // If RPC doesn't exist, do manual update
  if (updateError) {
    const { data: user } = await supabase
      .from("users")
      .select("credits")
      .eq("id", userId)
      .single();

    if (user) {
      await supabase
        .from("users")
        .update({ credits: user.credits + amount })
        .eq("id", userId);
    }
  }

  // Record transaction
  const { error: txError } = await supabase.from("transactions").insert({
    user_id: userId,
    amount,
    price_cents: priceCents,
    stripe_session_id: stripeSessionId,
  });

  if (txError) {
    console.error("Error recording transaction:", txError);
    return false;
  }

  return true;
}

export async function deductCredit(userId: string): Promise<boolean> {
  const supabase = createServerClient();

  const { data: user } = await supabase
    .from("users")
    .select("credits, is_admin")
    .eq("id", userId)
    .single();

  if (!user) return false;

  // Admins don't consume credits
  if (user.is_admin) return true;

  // Check if user has credits
  if (user.credits <= 0) return false;

  // Deduct credit
  const { error } = await supabase
    .from("users")
    .update({ credits: user.credits - 1 })
    .eq("id", userId);

  return !error;
}

export async function recordGeneration(
  userId: string,
  rowsProcessed: number,
  chartsGenerated: number
): Promise<void> {
  const supabase = createServerClient();

  await supabase.from("generations").insert({
    user_id: userId,
    rows_processed: rowsProcessed,
    charts_generated: chartsGenerated,
  });
}
