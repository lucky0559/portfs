import { describe, expect, it } from "vitest";
import { workExperiences } from "@/constants/Experience";
import { buildKnowledgeBlock } from "@/lib/ai/knowledge";

describe("buildKnowledgeBlock", () => {
  it("includes every work experience company", () => {
    const block = buildKnowledgeBlock();
    for (const entry of workExperiences) {
      expect(block).toContain(entry.company);
    }
  });

  it("includes every work experience role", () => {
    const block = buildKnowledgeBlock();
    for (const entry of workExperiences) {
      expect(block).toContain(entry.role);
    }
  });

  it("marks the current role as present rather than an end date", () => {
    const block = buildKnowledgeBlock();
    const current = workExperiences.find((e) => e.endDate === null);
    expect(current).toBeDefined();
    expect(block).toContain(`${current!.startDate} to present`);
  });

  it("includes named project entries with their descriptions", () => {
    const block = buildKnowledgeBlock();
    expect(block).toContain("Chloe by People Science");
    expect(block).toContain("decentralized clinical trial platform");
  });

  it("wraps content in the delimiters the system prompt relies on", () => {
    const block = buildKnowledgeBlock();
    expect(block).toContain("<portfolio_data>");
    expect(block).toContain("</portfolio_data>");
  });

  it("produces a block small enough to sit in every request", () => {
    // Rough guard: ~4 chars per token. Keeps the cached prompt affordable.
    expect(buildKnowledgeBlock().length).toBeLessThan(40000);
  });
});
