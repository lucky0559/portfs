"use client";

import { useEffect, useRef, useState } from "react";
import { FaCommentDots } from "react-icons/fa";
import Panel from "@/components/Chat/Panel";

const Launcher = () => {
  const [open, setOpen] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  // Restore focus to the launcher button whenever the panel transitions from
  // open to closed (Escape, the close button, or anything else that calls
  // onClose). This runs in an effect — not inline in the close handler —
  // because the launcher button unmounts while the panel is open, so its ref
  // is only populated again after React has committed the re-render that
  // brings it back into the DOM.
  useEffect(() => {
    if (wasOpenRef.current && !open) {
      launcherRef.current?.focus();
    }
    wasOpenRef.current = open;
  }, [open]);

  if (process.env.NEXT_PUBLIC_CHAT_ENABLED !== "true") return null;

  return (
    <>
      {!open ? (
        <button
          type="button"
          ref={launcherRef}
          className="chat-launcher"
          onClick={() => setOpen(true)}
          aria-expanded={false}
          aria-label="Ask about Lucky's work"
        >
          <FaCommentDots aria-hidden="true" />
          Ask about my work
        </button>
      ) : null}

      <Panel open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Launcher;
