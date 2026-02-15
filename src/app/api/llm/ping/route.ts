import { NextResponse } from "next/server";
import { getLlmClient } from "@/lib/llm";

export async function GET() {
  // Minimal sanity check endpoint. DO NOT expose this publicly without auth.
  const llm = getLlmClient();
  const text = await llm.generateText([
    { role: "system", content: "You are a concise assistant." },
    { role: "user", content: "Reply with exactly: ok" },
  ]);

  return NextResponse.json({ ok: true, reply: text.trim() });
}
