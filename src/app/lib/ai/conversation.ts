import Anthropic from "@anthropic-ai/sdk";
import type { ChatMessage, ChatStreamEvent } from "@/types/Chat";
import { buildSystemPrompt } from "@/lib/ai/systemPrompt";
import { SUBMIT_LEAD_TOOL, executeSubmitLead } from "@/lib/ai/tools";

const DEFAULT_MODEL = "claude-haiku-4-5-20251001";
const MAX_TOKENS = 600;
const MAX_TOOL_ITERATIONS = 3;

export type RunConversationArgs = {
  ip: string;
  history: ChatMessage[];
  emit: (event: ChatStreamEvent) => void;
};

export async function runConversation({
  ip,
  history,
  emit
}: RunConversationArgs): Promise<void> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const messages: Anthropic.MessageParam[] = history.map((message) => ({
    role: message.role,
    content: message.content
  }));

  for (let iteration = 0; iteration < MAX_TOOL_ITERATIONS; iteration++) {
    const stream = client.messages.stream({
      model: process.env.ANTHROPIC_MODEL || DEFAULT_MODEL,
      max_tokens: MAX_TOKENS,
      system: [
        {
          type: "text",
          text: buildSystemPrompt(),
          cache_control: { type: "ephemeral" }
        }
      ],
      tools: [SUBMIT_LEAD_TOOL],
      messages
    });

    stream.on("text", (delta) => emit({ type: "text", value: delta }));

    const final = await stream.finalMessage();

    if (final.stop_reason !== "tool_use") {
      return;
    }

    const toolUses = final.content.filter(
      (block): block is Anthropic.ToolUseBlock => block.type === "tool_use"
    );

    messages.push({ role: "assistant", content: final.content });

    const results: Anthropic.ToolResultBlockParam[] = [];
    for (const use of toolUses) {
      if (use.name !== SUBMIT_LEAD_TOOL.name) {
        results.push({
          type: "tool_result",
          tool_use_id: use.id,
          content: "Unknown tool.",
          is_error: true
        });
        continue;
      }

      const result = await executeSubmitLead(use.input, { ip, history });
      if (result.ok) {
        emit({ type: "lead_sent" });
      }

      results.push({
        type: "tool_result",
        tool_use_id: use.id,
        content: result.ok ? "Sent to Lucky successfully." : result.error,
        is_error: !result.ok
      });
    }

    messages.push({ role: "user", content: results });
  }

  emit({
    type: "error",
    value: "This conversation got stuck. Try rephrasing, or use the contact form below."
  });
}
