import type { LlmClient } from "./types";
import { GroqClient } from "./groq";

export function getLlmClient(): LlmClient {
  // For now: Groq only. Later: pluggable providers.
  return new GroqClient();
}
