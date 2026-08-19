"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { FaCheckCircle, FaExclamationTriangle, FaTimes } from "react-icons/fa";
import Message from "@/components/Chat/Message";
import { useChat } from "@/lib/hooks/useChat";

const SUGGESTIONS = [
  "What has Lucky built with React?",
  "Show me a project he's proud of",
  "Is he available for work right now?"
];

type PanelProps = {
  open: boolean;
  onClose: () => void;
};

const Panel = ({ open, onClose }: PanelProps) => {
  const { messages, status, leadSent, error, send } = useChat();
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button:not(:disabled), [href], input:not(:disabled), textarea:not(:disabled), select:not(:disabled), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const text = draft;
    setDraft("");
    void send(text);
  };

  if (!open) return null;

  const lastMessage = messages[messages.length - 1];
  const isStreamingReply = status === "streaming" && lastMessage?.role === "assistant";

  return (
    <div
      className="chat-panel"
      role="dialog"
      aria-modal="true"
      aria-label="Ask about Lucky's work"
      ref={panelRef}
    >
      <header className="chat-panel__header">
        <div>
          <p className="chat-panel__title">Ask about Lucky&apos;s work</p>
          <p className="chat-panel__subtitle">Answers come from this site&apos;s content</p>
        </div>
        <button type="button" className="chat-panel__close" onClick={onClose} aria-label="Close chat">
          <FaTimes aria-hidden="true" />
        </button>
      </header>

      <div className="chat-log" ref={logRef} aria-live="polite" aria-atomic="false">
        {messages.length === 0 ? (
          <div className="chat-empty">
            <p className="chat-empty__lead">
              Ask about a project, a technology, or whether he&apos;s free for work.
            </p>
            <ul className="chat-suggestions">
              {SUGGESTIONS.map((suggestion) => (
                <li key={suggestion}>
                  <button type="button" onClick={() => void send(suggestion)}>
                    {suggestion}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          messages.map((message, index) => (
            <Message
              key={`${message.role}-${index}`}
              role={message.role}
              content={message.content}
              isStreaming={isStreamingReply && index === messages.length - 1}
            />
          ))
        )}

        {leadSent ? (
          <p className="chat-notice chat-notice--success">
            <FaCheckCircle aria-hidden="true" />
            Your details are on their way to Lucky.
          </p>
        ) : null}

        {error ? (
          <p className="chat-notice chat-notice--error" role="alert">
            <FaExclamationTriangle aria-hidden="true" />
            {error} You can also <a href="#contact" onClick={onClose}>use the contact form</a>.
          </p>
        ) : null}
      </div>

      <form className="chat-composer" onSubmit={submit}>
        <label className="chat-composer__label" htmlFor="chat-input">
          Your question
        </label>
        <input
          id="chat-input"
          ref={inputRef}
          className="chat-composer__input"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Ask a question…"
          maxLength={2000}
          autoComplete="off"
          disabled={status === "streaming"}
        />
        <button
          type="submit"
          className="chat-composer__send"
          disabled={status === "streaming" || draft.trim().length === 0}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Panel;
