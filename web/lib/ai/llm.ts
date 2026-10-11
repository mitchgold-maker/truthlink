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
  return Boolean(process.env.LLM_API_KEY && llmConfig.baseURL && llmConfig.model && process.env.LLM_DISABLED !== "1");
}

// Spend guard so sponsor credits are never exceeded. Limits are per server instance;
// move the counters to the database once it is connected for a global cap.
const limits = {
  maxOutputTokens: Number(process.env.LLM_MAX_OUTPUT_TOKENS ?? 1500),
  maxInputChars: Number(process.env.LLM_MAX_INPUT_CHARS ?? 24000),
  maxCallsPerHour: Number(process.env.LLM_MAX_CALLS_PER_HOUR ?? 120),
  tokenBudget: Number(process.env.LLM_TOKEN_BUDGET ?? 2_000_000),
};
export const usage = { calls: 0, promptTokens: 0, completionTokens: 0, blocked: 0 };
const recentCalls: number[] = [];

function checkBudget() {
  const now = Date.now();
  while (recentCalls.length && now - recentCalls[0] > 3_600_000) recentCalls.shift();
  if (recentCalls.length >= limits.maxCallsPerHour) {
    usage.blocked++;
    throw new Error("AI hourly call limit reached (spend guard)");
  }
  if (usage.promptTokens + usage.completionTokens >= limits.tokenBudget) {
    usage.blocked++;
    throw new Error("AI token budget reached (spend guard)");
  }
  recentCalls.push(now);
}

let client: OpenAI | null = null;
function getClient() {
  if (!client) {
    client = new OpenAI({ apiKey: process.env.LLM_API_KEY, baseURL: llmConfig.baseURL, maxRetries: Number(process.env.LLM_MAX_RETRIES ?? 4) });
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
  if (system.length + user.length > limits.maxInputChars) throw new Error("AI input too large (spend guard)");
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
    checkBudget();
    const res = await getClient().chat.completions.create({
      model: llmConfig.model,
      messages,
      temperature: 0.2,
      max_tokens: limits.maxOutputTokens,
      response_format: { type: "json_object" },
    });
    usage.calls++;
    usage.promptTokens += res.usage?.prompt_tokens ?? 0;
    usage.completionTokens += res.usage?.completion_tokens ?? 0;
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
