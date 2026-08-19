export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type ChatStreamEvent =
  | { type: "text"; value: string }
  | { type: "lead_sent" }
  | { type: "error"; value: string }
  | { type: "done" };
