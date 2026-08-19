"use client";

import { useCallback, useState } from "react";
import { MAX_MESSAGES } from "@/lib/ai/validateChatRequest";
import type { ChatMessage, ChatStreamEvent } from "@/types/Chat";

export type ChatStatus = "idle" | "streaming" | "error";

const STORAGE_KEY = "portfolio-chat-history";

const readStoredHistory = (): ChatMessage[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ChatMessage[]) : [];
  } catch {
    return [];
  }
};

const writeStoredHistory = (messages: ChatMessage[]): void => {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch {
    // Storage full or unavailable — the conversation still works in memory.
  }
};

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(readStoredHistory);
  const [status, setStatus] = useState<ChatStatus>("idle");
  const [leadSent, setLeadSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setMessages([]);
    setStatus("idle");
    setLeadSent(false);
    setError(null);
    writeStoredHistory([]);
  }, []);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || status === "streaming") return;

      const userMessage: ChatMessage = { role: "user", content: trimmed };
      const outgoing: ChatMessage[] = [...messages, userMessage].slice(-(MAX_MESSAGES - 1));
      setMessages([...outgoing, { role: "assistant", content: "" }]);
      setStatus("streaming");
      setError(null);

      const applyDelta = (delta: string) => {
        setMessages((current) => {
          const next = [...current];
          const last = next[next.length - 1];
          next[next.length - 1] = { ...last, content: last.content + delta };
          return next;
        });
      };

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: outgoing })
        });

        if (!response.ok || !response.body) {
          const detail = await response.json().catch(() => ({ error: "Chat is unavailable." }));
          throw new Error(detail.error || "Chat is unavailable.");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const frames = buffer.split("\n\n");
          buffer = frames.pop() ?? "";

          for (const frame of frames) {
            const line = frame.trim();
            if (!line.startsWith("data:")) continue;

            let event: ChatStreamEvent;
            try {
              event = JSON.parse(line.slice(5).trim()) as ChatStreamEvent;
            } catch {
              continue;
            }

            if (event.type === "text") applyDelta(event.value);
            if (event.type === "lead_sent") setLeadSent(true);
            if (event.type === "error") setError(event.value);
          }
        }

        setStatus("idle");
        setMessages((current) => {
          const cleaned = current.filter((message) => message.content.length > 0);
          writeStoredHistory(cleaned);
          return cleaned;
        });
      } catch (caught) {
        setStatus("error");
        setError(
          caught instanceof Error ? caught.message : "Chat is unavailable right now."
        );
        setMessages((current) => current.filter((message) => message.content.length > 0));
      }
    },
    [messages, status]
  );

  return { messages, status, leadSent, error, send, reset };
}
