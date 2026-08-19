import { describe, expect, it } from "vitest";
import {
  MAX_MESSAGES,
  MAX_MESSAGE_CHARS,
  validateChatRequest
} from "@/lib/ai/validateChatRequest";

const valid = { messages: [{ role: "user", content: "What has Lucky built?" }] };

describe("validateChatRequest", () => {
  it("accepts a well-formed request", () => {
    const result = validateChatRequest(valid);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.messages).toHaveLength(1);
  });

  it("rejects a non-object body", () => {
    expect(validateChatRequest(null).ok).toBe(false);
    expect(validateChatRequest("hello").ok).toBe(false);
  });

  it("rejects a missing messages array", () => {
    expect(validateChatRequest({}).ok).toBe(false);
  });

  it("rejects an empty conversation", () => {
    expect(validateChatRequest({ messages: [] }).ok).toBe(false);
  });

  it("rejects more than MAX_MESSAGES messages", () => {
    const messages = Array.from({ length: MAX_MESSAGES + 1 }, () => ({
      role: "user",
      content: "hi"
    }));
    expect(validateChatRequest({ messages }).ok).toBe(false);
  });

  it("rejects a message longer than MAX_MESSAGE_CHARS", () => {
    const messages = [{ role: "user", content: "x".repeat(MAX_MESSAGE_CHARS + 1) }];
    expect(validateChatRequest({ messages }).ok).toBe(false);
  });

  it("rejects an unknown role", () => {
    expect(validateChatRequest({ messages: [{ role: "system", content: "hi" }] }).ok).toBe(false);
  });

  it("rejects a non-string content", () => {
    expect(validateChatRequest({ messages: [{ role: "user", content: 42 }] }).ok).toBe(false);
  });

  it("rejects a conversation whose last turn is not from the user", () => {
    const messages = [
      { role: "user", content: "hi" },
      { role: "assistant", content: "hello" }
    ];
    expect(validateChatRequest({ messages }).ok).toBe(false);
  });
});
