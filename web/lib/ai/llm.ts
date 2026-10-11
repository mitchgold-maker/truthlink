import OpenAI from "openai";
import { z } from "zod";

// One OpenAI-compatible client for every AI call. Pointed at Luminal Cloud via env:
//   LLM_BASE_URL  e.g. Luminal's OpenAI-compatible endpoint (…/v1)
//   LLM_API_KEY   Luminal key
//   LLM_MODEL     a DeepSeek or GLM Flash model id hosted on Luminal
// Server-only: never import this from client code.

export const llmConfig = {
  baseURL: process.env.LLM_BASE_URL,
  model: process.env.LLM_MODEL ?? "",
  provider: process.env.LLM_PROVIDER_LABEL ?? "Luminal Cloud",
};

export function llmConfigured() {
  return Boolean(process.env.LLM_API_KEY && llmConfig.baseURL && llmConfig.model);
}

let client: OpenAI | null = null;
function getClient() {
  if (!client) {
    client = new OpenAI({ apiKey: process.env.LLM_API_KEY, baseURL: llmConfig.baseURL });
  }
  return client;
}

// Models wrap JSON in fences or prose (and reasoning models add <think> blocks); keep the outermost object.
function parseJsonLoose(text: string): unknown {
  const cleaned = text.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end <= start) throw new Error("No JSON object in model output");
  return JSON.parse(cleaned.slice(start, end + 1));
}

export type LlmResult<T> = { data: T; model: string; provider: string; latencyMs: number };

// Calls the model, validates against the Zod schema, retries once with the error, then throws.
export async function callJson<T>(
  schema: z.ZodType<T>,
  system: string,
  user: string,
): Promise<LlmResult<T>> {
  if (!llmConfigured()) throw new Error("LLM not configured (set LLM_BASE_URL, LLM_API_KEY, LLM_MODEL)");
  const started = Date.now();
  const messages: OpenAI.ChatCompletionMessageParam[] = [
    { role: "system", content: system + "\n\nRespond with a single JSON object only. No prose, no code fences." },
    { role: "user", content: user },
  ];
  let lastError = "";
  for (let attempt = 0; attempt < 2; attempt++) {
    if (attempt === 1) {
      messages.push({
        role: "user",
        content: `Your previous answer was invalid: ${lastError}. Return only the corrected JSON object.`,
      });
    }
    const res = await getClient().chat.completions.create({
      model: llmConfig.model,
      messages,
      temperature: 0.2,
      response_format: { type: "json_object" },
    });
    const text = res.choices[0]?.message?.content ?? "";
    messages.push({ role: "assistant", content: text });
    try {
      const parsed = schema.safeParse(parseJsonLoose(text));
      if (parsed.success) {
        return {
          data: parsed.data,
          model: res.model || llmConfig.model,
          provider: llmConfig.provider,
          latencyMs: Date.now() - started,
        };
      }
      lastError = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ");
    } catch (e) {
      lastError = (e as Error).message;
    }
  }
  throw new Error(`Model output failed validation twice: ${lastError}`);
}
