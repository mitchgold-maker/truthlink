import { NextResponse } from "next/server";
import { ExtractInput, extractTasks } from "@/lib/ai/extract";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  const body = ExtractInput.safeParse(await req.json().catch(() => null));
  if (!body.success) {
    return NextResponse.json({ error: "Invalid request", issues: body.error.issues }, { status: 400 });
  }
  try {
    const result = await extractTasks(body.data);
    return NextResponse.json({
      tasks: result.data.tasks,
      model: result.model,
      provider: result.provider,
      latencyMs: result.latencyMs,
    });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 502 });
  }
}
