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
    openerRef.current?.focus();
  }, []);

  const step = useCallback(
    (delta: number) => setCurrent(i => (i === null ? i : (i + delta + count) % count)),
    [count]
  );

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close, step]);

  const image = current === null ? null : images[current];

  return (
    <LightboxContext.Provider value={{ open }}>
      {children}
      {image && (
        <div
          className="project-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged screen"
          onClick={e => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <button ref={closeRef} type="button" className="project-lightbox__btn project-lightbox__close" aria-label="Close" onClick={close}>
            ✕
          </button>
          <button type="button" className="project-lightbox__btn project-lightbox__prev" aria-label="Previous screen" onClick={() => step(-1)}>
            ‹
          </button>
          <button type="button" className="project-lightbox__btn project-lightbox__next" aria-label="Next screen" onClick={() => step(1)}>
            ›
          </button>
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image.src} alt={image.alt} onClick={close} />
            <figcaption>
              {image.label} ({(current ?? 0) + 1} of {count})
            </figcaption>
          </figure>
        </div>
      )}
    </LightboxContext.Provider>
  );
};

export const ZoomImage = ({ src, alt }: { src: string; alt: string }) => {
  const ctx = useContext(LightboxContext);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      tabIndex={0}
      role="button"
      aria-label={`Enlarge: ${alt}`}
      onClick={e => ctx?.open(src, e.currentTarget)}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          ctx?.open(src, e.currentTarget);
        }
      }}
    />
  );
};
