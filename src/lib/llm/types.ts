export type ChatRole = "system" | "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type LlmGenerateOptions = {
  model?: string;
  temperature?: number;
  maxTokens?: number;
};

export interface LlmClient {
  generateText(messages: ChatMessage[], options?: LlmGenerateOptions): Promise<string>;
}
