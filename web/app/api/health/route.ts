import { NextResponse } from "next/server";
import { llmConfig, llmConfigured } from "@/lib/ai/llm";

// Tells the UI which AI provider is live, so it can label results honestly.
export async function GET() {
  return NextResponse.json({
    ai: llmConfigured(),
    provider: llmConfigured() ? llmConfig.provider : null,
    model: llmConfigured() ? llmConfig.model : null,
  });
}
