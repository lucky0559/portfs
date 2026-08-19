import type { ChatMessage, ChatRole } from "@/types/Chat";

export const MAX_MESSAGES = 20;
export const MAX_MESSAGE_CHARS = 2000;

const ROLES: ChatRole[] = ["user", "assistant"];

export function validateChatRequest(
  body: unknown
): { ok: true; messages: ChatMessage[] } | { ok: false; error: string } {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Invalid request body" };
  }

  const raw = (body as { messages?: unknown }).messages;
  if (!Array.isArray(raw)) {
    return { ok: false, error: "Expected a messages array" };
  }
  if (raw.length === 0) {
    return { ok: false, error: "Conversation is empty" };
  }
  if (raw.length > MAX_MESSAGES) {
    return { ok: false, error: "Conversation is too long. Start a new chat." };
  }

  const messages: ChatMessage[] = [];
  for (const entry of raw) {
    if (typeof entry !== "object" || entry === null) {
      return { ok: false, error: "Malformed message" };
    }
    const { role, content } = entry as { role?: unknown; content?: unknown };
    if (typeof role !== "string" || !ROLES.includes(role as ChatRole)) {
      return { ok: false, error: "Unsupported message role" };
    }
    if (typeof content !== "string" || content.trim().length === 0) {
      return { ok: false, error: "Message content must be a non-empty string" };
    }
    if (content.length > MAX_MESSAGE_CHARS) {
      return { ok: false, error: "That message is too long." };
    }
    messages.push({ role: role as ChatRole, content });
  }

  if (messages[messages.length - 1].role !== "user") {
    return { ok: false, error: "The last message must come from the visitor" };
  }

  return { ok: true, messages };
}
