import { NextRequest, NextResponse } from "next/server";
import type { ChatStreamEvent } from "@/types/Chat";
import { runConversation } from "@/lib/ai/conversation";
import { checkChatRate } from "@/lib/ai/rateLimit";
import { validateChatRequest } from "@/lib/ai/validateChatRequest";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const encoder = new TextEncoder();

const getClientIp = (req: NextRequest): string => {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
};

const sse = (event: ChatStreamEvent): Uint8Array =>
  encoder.encode(`data: ${JSON.stringify(event)}\n\n`);

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  const rate = checkChatRate(ip);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "That's a lot of questions at once. Give it a minute." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSeconds) } }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = validateChatRequest(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("[chat route] ANTHROPIC_API_KEY is not set");
    return NextResponse.json(
      { error: "Chat is unavailable right now. Please use the contact form." },
      { status: 503 }
    );
  }

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const emit = (event: ChatStreamEvent) => controller.enqueue(sse(event));

      try {
        await runConversation({ ip, history: parsed.messages, emit });
      } catch (error) {
        console.error("[chat route] ERROR:", error);
        emit({
          type: "error",
          value: "Something went wrong on my end. Try again, or use the contact form below."
        });
      } finally {
        emit({ type: "done" });
        controller.close();
      }
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no"
    }
  });
}
