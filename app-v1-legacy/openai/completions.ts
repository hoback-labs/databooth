import { GPT_MODEL } from "./constants";
import { ChatInteraction } from "../types";
import { queryChatCompletions } from "./models";

export function getPrompt(context: string, interactions: ChatInteraction[]) {
  return `${context}

${interactions
  .map(
    (i) => `Human: ${i.question}
AI: ${i.reply || ""}`
  )
  .join("\n")}`;
}

export async function queryCompletionsChat(
  context: string,
  interactions: ChatInteraction[],
  options: { apikey: string, model: string }
): Promise<ChatInteraction[]> {
  const promptResult = getPrompt(context, interactions);
  // Default to GPT-4o-mini for best balance of speed/cost/quality
  const model = options.model || GPT_MODEL.GPT_4O_MINI;
  return queryChatCompletions(promptResult, { ...options, model });
};
