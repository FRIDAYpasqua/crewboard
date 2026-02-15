import type { ChatMessage, LlmClient, LlmGenerateOptions } from "./types";

const GROQ_BASE_URL = "https://api.groq.com/openai/v1";

function requiredEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

export class GroqClient implements LlmClient {
  async generateText(messages: ChatMessage[], options?: LlmGenerateOptions) {
    const apiKey = requiredEnv("GROQ_API_KEY");
    const model =
      options?.model || process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

    const res = await fetch(`${GROQ_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: options?.temperature ?? 0.2,
        max_tokens: options?.maxTokens ?? 900,
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Groq error ${res.status}: ${text}`);
    }

    type GroqChatCompletion = {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const json = (await res.json()) as unknown as GroqChatCompletion;
    const content = json.choices?.[0]?.message?.content;
    if (!content || typeof content !== "string") {
      throw new Error("Groq response missing choices[0].message.content");
    }
    return content;
  }
}
