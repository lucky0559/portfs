import { describe, expect, it } from "vitest";
import type { ChatMessage } from "@/types/Chat";
import { SUBMIT_LEAD_TOOL, hasMinimumEngagement, validateLead } from "@/lib/ai/tools";

const userTurn = (content: string): ChatMessage => ({ role: "user", content });
const botTurn = (content: string): ChatMessage => ({ role: "assistant", content });

describe("SUBMIT_LEAD_TOOL", () => {
  it("requires name, email, and intent but not company", () => {
    const schema = SUBMIT_LEAD_TOOL.input_schema as { required?: string[] };
    const required = schema.required ?? [];
    expect(required).toContain("name");
    expect(required).toContain("email");
    expect(required).toContain("intent");
    expect(required).not.toContain("company");
  });
});

describe("validateLead", () => {
  it("accepts a well-formed lead", () => {
    const result = validateLead({
      name: "Dana Reyes",
      email: "dana@example.com",
      intent: "Hiring a frontend contractor for a 3-month build"
    });
    expect(result.ok).toBe(true);
  });

  it("rejects a malformed email", () => {
    const result = validateLead({
      name: "Dana Reyes",
      email: "dana-at-example",
      intent: "Hiring"
    });
    expect(result).toEqual({ ok: false, error: expect.stringContaining("email") });
  });

  it("rejects a missing name", () => {
    const result = validateLead({ email: "dana@example.com", intent: "Hiring" });
    expect(result.ok).toBe(false);
  });

  it("rejects a blank intent", () => {
    const result = validateLead({
      name: "Dana",
      email: "dana@example.com",
      intent: "   "
    });
    expect(result.ok).toBe(false);
  });

  it("rejects non-object input", () => {
    expect(validateLead("not an object").ok).toBe(false);
    expect(validateLead(null).ok).toBe(false);
  });

  it("truncates absurdly long fields rather than forwarding them", () => {
    const result = validateLead({
      name: "D".repeat(5000),
      email: "dana@example.com",
      intent: "Hiring"
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.name.length).toBeLessThanOrEqual(200);
    }
  });
});

describe("hasMinimumEngagement", () => {
  it("is false with a single user turn", () => {
    expect(hasMinimumEngagement([userTurn("hi")])).toBe(false);
  });

  it("is true once there are two user turns", () => {
    expect(
      hasMinimumEngagement([userTurn("hi"), botTurn("hello"), userTurn("are you free?")])
    ).toBe(true);
  });

  it("does not count assistant turns toward the threshold", () => {
    expect(
      hasMinimumEngagement([userTurn("hi"), botTurn("a"), botTurn("b")])
    ).toBe(false);
  });
});
