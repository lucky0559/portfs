"use client";

import type { ChatRole } from "@/types/Chat";

type MessageProps = {
  role: ChatRole;
  content: string;
  isStreaming?: boolean;
};

const Message = ({ role, content, isStreaming = false }: MessageProps) => {
  const isUser = role === "user";

  return (
    <div className={`chat-message chat-message--${isUser ? "user" : "bot"}`}>
      <span className="chat-message__author">{isUser ? "You" : "Assistant"}</span>
      <p className="chat-message__body">
        {content}
        {isStreaming && content.length === 0 ? (
          <span className="chat-message__thinking" aria-label="Thinking">
            <span />
            <span />
            <span />
          </span>
        ) : null}
      </p>
    </div>
  );
};

export default Message;
