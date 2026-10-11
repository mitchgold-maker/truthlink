import { NextResponse } from "next/server";
import { HandoffInput, generateHandoff } from "@/lib/ai/handoff";
export const runtime = "nodejs";
export const maxDuration = 60;
export async function POST(req: Request) {
  const body = HandoffInput.safeParse(await req.json().catch(() => null));
  if (!body.success) return NextResponse.json({ error: "Invalid request", issues: body.error.issues }, { status: 400 });
  try {
    const result = await generateHandoff(body.data);
    return NextResponse.json({ ...result.data, model: result.model, provider: result.provider, latencyMs: result.latencyMs });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 502 });
  }
}
