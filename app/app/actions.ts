"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { SYSTEM_PROMPT, buildUserPrompt } from "@/lib/prompt";
import { stringifyData, getSampleData } from "@/lib/parse-data";
import {
  getOrCreateUser,
  getUserByClerkId,
  deductCredit,
  recordGeneration,
} from "@/lib/supabase/users";
import type { Dashboard, Dataset } from "@/lib/types";
import type { User } from "@/lib/supabase/types";

export interface AnalyzeResult {
  dashboard?: Dashboard;
  error?: string;
  requiresAuth?: boolean;
  requiresCredits?: boolean;
}

export async function getCurrentUserData(): Promise<{
  user: User | null;
  isSignedIn: boolean;
}> {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    return { user: null, isSignedIn: false };
  }

  const clerkUser = await currentUser();
  const email = clerkUser?.emailAddresses?.[0]?.emailAddress || "unknown@email.com";

  const user = await getOrCreateUser(clerkId, email);

  return { user, isSignedIn: true };
}

export async function analyzeDashboard(
  data: Dataset,
  context?: string
): Promise<AnalyzeResult> {
  // Check authentication
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    return { requiresAuth: true, error: "Please sign in to generate dashboards" };
  }

  // Get user from database
  const clerkUser = await currentUser();
  const email = clerkUser?.emailAddresses?.[0]?.emailAddress || "unknown@email.com";
  const user = await getOrCreateUser(clerkId, email);

  if (!user) {
    return { error: "Failed to get user account" };
  }

  // Check credits (admins bypass)
  if (!user.is_admin && user.credits <= 0) {
    return {
      requiresCredits: true,
      error: "You need credits to generate dashboards. Purchase a credit pack to continue.",
    };
  }

  if (!data || data.length === 0) {
    return { error: "No data provided" };
  }

  // Use server-side OpenAI key
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return { error: "OpenAI API key not configured" };
  }

  try {
    const openai = createOpenAI({ apiKey });

    const sampleData = getSampleData(data, 15);
    const csvSample = stringifyData(sampleData);
    const userPrompt = buildUserPrompt(csvSample, context);

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      system: SYSTEM_PROMPT,
      prompt: userPrompt,
      temperature: 0.3,
      maxTokens: 4000,
    });

    // Parse the JSON response
    const cleanedText = text.trim().replace(/```json\n?|\n?```/g, "");
    const dashboard = JSON.parse(cleanedText) as Dashboard;

    // Deduct credit (unless admin)
    const creditDeducted = await deductCredit(user.id);
    if (!creditDeducted && !user.is_admin) {
      return { error: "Failed to process credit" };
    }

    // Record generation for analytics
    await recordGeneration(
      user.id,
      data.length,
      dashboard.charts?.length || 0
    );

    return { dashboard };
  } catch (error) {
    console.error("Analysis error:", error);
    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        return { error: "AI service configuration error" };
      }
      if (error.message.includes("JSON")) {
        return { error: "Failed to parse AI response. Please try again." };
      }
      return { error: error.message };
    }
    return { error: "An unexpected error occurred" };
  }
}
