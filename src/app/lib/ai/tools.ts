import type Anthropic from "@anthropic-ai/sdk";
import type { ChatMessage } from "@/types/Chat";
import { sendPortfolioEmail } from "@/lib/email/sendLead";
import { checkLeadQuota, recordLead } from "@/lib/ai/rateLimit";

const MAX_FIELD_CHARS = 200;
const MAX_INTENT_CHARS = 1000;
const MIN_USER_TURNS = 2;
const TRANSCRIPT_TURNS = 6;

export type LeadInput = {
  name: string;
  email: string;
  intent: string;
  company?: string;
};

export type LeadResult = { ok: true } | { ok: false; error: string };

export const SUBMIT_LEAD_TOOL: Anthropic.Tool = {
  name: "submit_lead",
  description:
    "Send the visitor's contact details to Lucky by email. Call this only after the visitor has " +
    "expressed genuine hiring or project intent AND has explicitly agreed to be contacted. " +
    "Never call it speculatively, and never call it more than once per conversation.",
  input_schema: {
    type: "object",
    properties: {
      name: { type: "string", description: "The visitor's name" },
      email: { type: "string", description: "The visitor's email address" },
      intent: {
        type: "string",
        description: "What they are building or why they are reaching out, in their own words"
      },
      company: { type: "string", description: "Their company, if they mentioned one" }
    },
    required: ["name", "email", "intent"]
  }
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const clamp = (value: string, max: number): string => value.trim().slice(0, max);

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function validateLead(
  input: unknown
): { ok: true; value: LeadInput } | { ok: false; error: string } {
  if (typeof input !== "object" || input === null) {
    return { ok: false, error: "Lead details were malformed. Ask the visitor again." };
  }

  const raw = input as Record<string, unknown>;
  const name = typeof raw.name === "string" ? clamp(raw.name, MAX_FIELD_CHARS) : "";
  const email = typeof raw.email === "string" ? clamp(raw.email, MAX_FIELD_CHARS) : "";
  const intent = typeof raw.intent === "string" ? clamp(raw.intent, MAX_INTENT_CHARS) : "";
  const company =
    typeof raw.company === "string" ? clamp(raw.company, MAX_FIELD_CHARS) : undefined;

  if (!name) return { ok: false, error: "The name is missing. Ask the visitor for it." };
  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "That email address is not valid. Ask the visitor to confirm it." };
  }
  if (!intent) {
    return { ok: false, error: "The intent is missing. Ask what they are working on." };
  }

  return { ok: true, value: { name, email, intent, company: company || undefined } };
}

export function hasMinimumEngagement(history: ChatMessage[]): boolean {
  return history.filter((message) => message.role === "user").length >= MIN_USER_TURNS;
}

const renderTranscript = (history: ChatMessage[]): string =>
  history
    .slice(-TRANSCRIPT_TURNS)
    .map(
      (message) =>
        `<p style="margin:6px 0"><strong>${message.role === "user" ? "Visitor" : "Assistant"}:</strong> ${escapeHtml(message.content)}</p>`
    )
    .join("");

export async function executeSubmitLead(
  input: unknown,
  ctx: { ip: string; history: ChatMessage[] }
): Promise<LeadResult> {
  if (!hasMinimumEngagement(ctx.history)) {
    return {
      ok: false,
      error: "Too early to send. Learn more about what the visitor needs first."
    };
  }

  const quota = checkLeadQuota(ctx.ip);
  if (!quota.allowed) {
    return {
      ok: false,
      error:
        "Their details have already been sent in this session. Tell them Lucky will be in touch."
    };
  }

  const validated = validateLead(input);
  if (!validated.ok) {
    return { ok: false, error: validated.error };
  }

  const lead = validated.value;
  const headline = lead.company || lead.intent.slice(0, 60);

  try {
    await sendPortfolioEmail({
      fromName: lead.name,
      replyTo: lead.email,
      subject: `[Portfolio Chat] ${lead.name} — ${headline}`,
      bodyHtml: `
        <div style="font-family:sans-serif;max-width:600px;color:#331D2C">
          <h2 style="color:#331D2C;border-bottom:2px solid #A78295;padding-bottom:8px">
            New lead from the portfolio chat
          </h2>
          <p><strong>Name:</strong> ${escapeHtml(lead.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>
          <p><strong>Company:</strong> ${escapeHtml(lead.company || "Not provided")}</p>
          <p><strong>Intent:</strong> ${escapeHtml(lead.intent)}</p>
          <h3 style="margin-top:24px">Recent conversation</h3>
          <div style="padding:16px;background:#f5f5f5;border-radius:8px">
            ${renderTranscript(ctx.history)}
          </div>
        </div>
      `
    });
  } catch (error) {
    console.error("[submit_lead] send failed:", error);
    return {
      ok: false,
      error: "Sending failed. Point the visitor to the contact form at the bottom of the page."
    };
  }

  recordLead(ctx.ip);
  return { ok: true };
}
