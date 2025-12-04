import { ChatInteraction } from "../../types";

export async function queryChatCompletions(
  prompt: string,
  options: { apikey: string; model: string }
): Promise<ChatInteraction[]> {
  const systemContent = prompt.split("Human:")[0]?.trim() || "";
  const userContent = prompt.split("Human:")[1]?.split("AI:")[0]?.trim() || prompt;

  return fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${options.apikey}`,
    },
    method: "POST",
    body: JSON.stringify({
      max_tokens: 4000,
      model: options.model,
      temperature: 0.3,
      messages: [
        { role: "system", content: systemContent },
        { role: "user", content: userContent },
      ],
    }),
  })
    .then((response) => response.json())
    .then((resp) => {
      if (resp.error) {
        throw new Error(resp.error.message);
      }
      const chat = [
        {
          reply: resp.choices?.[0]?.message?.content || "",
        },
      ];
      return chat;
    });
}
