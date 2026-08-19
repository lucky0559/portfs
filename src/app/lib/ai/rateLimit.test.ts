import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  __resetRateLimitForTests,
  checkChatRate,
  checkLeadQuota,
  recordLead
} from "@/lib/ai/rateLimit";

beforeEach(() => {
  vi.useFakeTimers();
  __resetRateLimitForTests();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("checkChatRate", () => {
  it("allows requests under the limit", () => {
    for (let i = 0; i < 15; i++) {
      expect(checkChatRate("1.1.1.1").allowed).toBe(true);
    }
  });

  it("blocks the request past the limit and reports a retry delay", () => {
    for (let i = 0; i < 15; i++) checkChatRate("1.1.1.1");
    const verdict = checkChatRate("1.1.1.1");
    expect(verdict.allowed).toBe(false);
    if (!verdict.allowed) {
      expect(verdict.retryAfterSeconds).toBeGreaterThan(0);
    }
  });

  it("tracks each IP separately", () => {
    for (let i = 0; i < 16; i++) checkChatRate("1.1.1.1");
    expect(checkChatRate("2.2.2.2").allowed).toBe(true);
  });

  it("recovers after the window elapses", () => {
    for (let i = 0; i < 16; i++) checkChatRate("1.1.1.1");
    vi.advanceTimersByTime(5 * 60 * 1000 + 1000);
    expect(checkChatRate("1.1.1.1").allowed).toBe(true);
  });
});

describe("checkLeadQuota", () => {
  it("allows a lead before any has been recorded", () => {
    expect(checkLeadQuota("1.1.1.1").allowed).toBe(true);
  });

  it("blocks a third lead within the hour", () => {
    recordLead("1.1.1.1");
    recordLead("1.1.1.1");
    expect(checkLeadQuota("1.1.1.1").allowed).toBe(false);
  });

  it("allows leads again after an hour", () => {
    recordLead("1.1.1.1");
    recordLead("1.1.1.1");
    vi.advanceTimersByTime(60 * 60 * 1000 + 1000);
    expect(checkLeadQuota("1.1.1.1").allowed).toBe(true);
  });
});
