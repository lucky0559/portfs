"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";

export type LightboxImage = { src: string; alt: string; label: string };

type LightboxContextValue = {
  open: (src: string, opener: HTMLElement | null) => void;
};

const LightboxContext = createContext<LightboxContextValue | null>(null);

export const LightboxProvider = ({ images, children }: { images: LightboxImage[]; children: ReactNode }) => {
  const [current, setCurrent] = useState<number | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const count = images.length;
  const isOpen = current !== null;

  const open = useCallback(
    (src: string, opener: HTMLElement | null) => {
      const index = images.findIndex(image => image.src === src);
      if (index === -1) return;
      openerRef.current = opener;
      setCurrent(index);
    },
    [images]
  );

  const close = useCallback(() => {
    setCurrent(null);
  }, []);

  const step = useCallback(
    (delta: number) => setCurrent(i => (i === null ? i : (i + delta + count) % count)),
    [count]
  );

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const content = contentRef.current;
    document.body.style.overflow = "hidden";
    content?.setAttribute("inert", "");
    content?.setAttribute("aria-hidden", "true");
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button");
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && (active === first || !dialogRef.current?.contains(active))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (active === last || !dialogRef.current?.contains(active))) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      content?.removeAttribute("inert");
      content?.removeAttribute("aria-hidden");
      document.removeEventListener("keydown", onKeyDown);
      openerRef.current?.focus();
    };
  }, [isOpen, close, step]);

  const image = current === null ? null : images[current];

  return (
    <LightboxContext.Provider value={{ open }}>
      <div ref={contentRef}>{children}</div>
      {image && (
        <div
          ref={dialogRef}
          className="project-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${image.label}, screen ${(current ?? 0) + 1} of ${count}`}
          onClick={e => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <button ref={closeRef} type="button" className="project-lightbox__btn project-lightbox__close" aria-label="Close" onClick={close}>
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </button>
          <button type="button" className="project-lightbox__btn project-lightbox__prev" aria-label="Previous screen" onClick={() => step(-1)}>
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" className="project-lightbox__btn project-lightbox__next" aria-label="Next screen" onClick={() => step(1)}>
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image.src} alt={image.alt} onClick={close} />
            <figcaption aria-live="polite">
              {image.label} ({(current ?? 0) + 1} of {count})
            </figcaption>
          </figure>
        </div>
      )}
    </LightboxContext.Provider>
  );
};

export const ZoomImage = ({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) => {
  const ctx = useContext(LightboxContext);

  return (
    <button
      type="button"
      className="project-page__zoom"
      aria-haspopup="dialog"
      onClick={e => ctx?.open(src, e.currentTarget)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={width} height={height} loading="lazy" />
    </button>
  );
};
