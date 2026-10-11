import { NextResponse } from "next/server";
import { llmConfig, llmConfigured, usage } from "@/lib/ai/llm";

// Tells the UI which AI provider is live, so it can label results honestly, and shows spend-guard usage.
export async function GET() {
  return NextResponse.json({
    ai: llmConfigured(),
    provider: llmConfigured() ? llmConfig.provider : null,
    model: llmConfigured() ? llmConfig.model : null,
    usage,
  });
}
