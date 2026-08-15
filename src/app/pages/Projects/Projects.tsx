"use client";

import Card from "@/components/Projects/Card";
import { cards, projects } from "@/constants/Projects";
import { ViewingDeckProject } from "@/types/ViewingProject";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from "@nextui-org/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaExternalLinkAlt, FaLock } from "react-icons/fa";

type GalleryProps = { project?: ViewingDeckProject };
type GalleryImageState = "loading" | "loaded" | "error";

const ImageGallery = ({ project }: GalleryProps) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [imageState, setImageState] = useState<GalleryImageState>("loading");
  const [retryVersion, setRetryVersion] = useState(0);
  const images = project?.imageURLs ?? [];
  const count = images.length;
  const currentImage = images[current];

  useEffect(() => {
    setCurrent(0);
    setDirection(1);
    setRetryVersion(0);
  }, [project?.name]);

  useEffect(() => {
    if (!currentImage) {
      setImageState("error");
      return;
    }

    let cancelled = false;
    const preloader = new window.Image();

    setImageState("loading");
    preloader.onload = () => {
      if (!cancelled) setImageState("loaded");
    };
    preloader.onerror = () => {
      if (!cancelled) setImageState("error");
    };
    preloader.src = currentImage;

    return () => {
      cancelled = true;
    };
  }, [currentImage, retryVersion]);

  const go = (next: number) => {
    setDirection(next > current ? 1 : -1);
    setCurrent(next);
  };
  const prev = () => go((current - 1 + count) % count);
  const next = () => go((current + 1) % count);

  return (
    <div
      className="flex flex-col items-center justify-center gap-4 w-full h-full"
      onClick={e => e.stopPropagation()}
    >
      {/* Image frame */}
      <div className="relative flex items-center justify-center flex-1 w-full overflow-hidden">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          {currentImage && imageState !== "error" && (
            <motion.img
              key={`${current}-${retryVersion}`}
              src={currentImage}
              alt={`${project?.name} screenshot ${current + 1}`}
              custom={direction}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d * 40 }),
                center: { opacity: 1, x: 0 },
                exit: (d: number) => ({ opacity: 0, x: d * -40 })
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: "easeInOut" }}
              onLoad={() => setImageState("loaded")}
              onError={() => setImageState("error")}
              className={`max-h-[700px] max-w-full w-auto object-contain rounded-3xl shadow-2xl shadow-black/60 select-none transition-opacity duration-300 ${
                imageState === "loaded" ? "opacity-100" : "opacity-0"
              }`}
              draggable={false}
            />
          )}
        </AnimatePresence>

        {imageState === "loading" && currentImage && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            role="status"
            aria-live="polite"
          >
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="h-8 w-8 animate-spin rounded-full border-2 border-pastelPink/20 border-t-greenApple" />
              <p className="font-Louis text-xs text-pastelPink/55">Loading preview…</p>
            </div>
          </div>
        )}

        {imageState === "error" && (
          <div className="flex max-w-sm flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-greenApple/25 bg-greenApple/10">
              <span className="font-LouisBold text-2xl text-greenApple">
                {project?.name?.charAt(0) ?? "?"}
              </span>
            </div>
            <div>
              <p className="font-LouisBold text-sm text-light">
                {currentImage ? "Preview unavailable" : "No preview available"}
              </p>
              <p className="mt-1 font-Louis text-xs leading-relaxed text-pastelPink/60">
                {currentImage
                  ? "This screen could not be loaded right now."
                  : "This case does not have a public screen preview."}
              </p>
            </div>
            {currentImage && (
              <button
                type="button"
                onClick={() => {
                  setImageState("loading");
                  setRetryVersion(version => version + 1);
                }}
                className="rounded-xl border border-greenApple/25 px-4 py-2 font-LouisBold text-xs text-greenApple transition-colors duration-200 hover:border-greenApple/55 hover:bg-greenApple/10"
              >
                Try again
              </button>
            )}
          </div>
        )}

        {/* Prev / Next arrows */}
        {count > 1 && (
          <>
            <button
              type="button"
              aria-label={`Previous screenshot of ${project?.name}`}
              onClick={prev}
              className="absolute left-4 w-9 h-9 rounded-full bg-primaryBackground/70 hover:bg-primaryBackground border border-pastelPink/20 hover:border-pastelPink/40 flex items-center justify-center text-light/60 hover:text-light transition-all duration-200"
            >
              <FaChevronLeft size={12} />
            </button>
            <button
              type="button"
              aria-label={`Next screenshot of ${project?.name}`}
              onClick={next}
              className="absolute right-4 w-9 h-9 rounded-full bg-primaryBackground/70 hover:bg-primaryBackground border border-pastelPink/20 hover:border-pastelPink/40 flex items-center justify-center text-light/60 hover:text-light transition-all duration-200"
            >
              <FaChevronRight size={12} />
            </button>
          </>
        )}
      </div>

      {/* Dot indicators */}
      {count > 1 && (
        <div className="flex items-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show screenshot ${i + 1} of ${project?.name}`}
              onClick={() => go(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-5 bg-greenApple"
                  : "w-1.5 bg-pastelPink/30 hover:bg-pastelPink/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
};

const Projects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deckViewingProject, setDeckViewingProject] = useState<ViewingDeckProject | undefined>();
  const shouldReduce = useReducedMotion();

  const onClickProjectHandler = (name: string) => {
    const project = projects.find(p => p.name === name);
    setDeckViewingProject(project);
    setIsModalOpen(true);
  };

  const handleClose = (onClose: () => void) => {
    setDeckViewingProject(undefined);
    onClose();
  };

  return (
    <div>
      <motion.div
        className="section-heading"
        initial={shouldReduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2>Selected work</h2>
        <p>A selection of products, platforms, and internal systems I&apos;ve helped bring from idea to useful software.</p>
      </motion.div>

      <motion.div
        className="projects-grid"
        variants={shouldReduce ? {} : containerVariants}
        initial={shouldReduce ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        {cards.map((card, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className={index === 0 ? "project-grid-item--featured" : undefined}
          >
            <Card
              cardImageUrl={card.imageURL}
              name={card.name}
              from={card.from}
              isPrivate={card.isPrivate}
              isSaas={card.isSaas}
              role={card.role}
              featured={index === 0}
              onClick={() => onClickProjectHandler(card.name)}
            />
          </motion.div>
        ))}
      </motion.div>

      <p className="projects-note">Click a project to read the case note and preview available screens.</p>

      <Modal
        size="full"
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setDeckViewingProject(undefined); }}
        hideCloseButton
        isDismissable
      >
        <ModalContent className="project-modal__content">
          {onClose => (
            <div
              className="project-modal"
              onClick={() => handleClose(onClose)}
            >
              {/* Header */}
              <ModalHeader className="project-modal__header">
                <p className="project-modal__eyebrow">
                  {deckViewingProject?.from}
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="project-modal__title">
                    {deckViewingProject?.name}
                  </h4>
                  {deckViewingProject?.isSaas && (
                    <span className="project-modal__badge">
                      SaaS
                    </span>
                  )}
                  {deckViewingProject?.role && (() => {
                    return (
                      <span className="project-modal__badge">
                        {deckViewingProject.role}
                      </span>
                    );
                  })()}
                </div>
              </ModalHeader>

              {/* Body */}
              <ModalBody className="project-modal__body">
                {deckViewingProject?.isPrivate ? (
                  <div className="flex items-center justify-center h-full px-8">
                    <div className="flex flex-col items-center gap-5 text-center max-w-lg w-full">
                      <div className="w-14 h-14 rounded-2xl border border-pastelPink/20 flex items-center justify-center flex-shrink-0">
                        <FaLock size={22} className="text-pastelPink/70" />
                      </div>
                      <div>
                        <p className="font-LouisBold text-light text-base">
                          Private &amp; Confidential
                        </p>
                        <p className="font-Louis text-pastelPink/70 text-sm mt-1">
                          Screenshots and source cannot be shared publicly.
                        </p>
                      </div>
                      {deckViewingProject.description && (
                        <div
                          className="p-5 rounded-2xl border border-pastelPink/15 bg-primaryBackground/40 text-left w-full"
                          onClick={e => e.stopPropagation()}
                        >
                          <p className="font-LouisBold text-greenApple text-[10px] uppercase tracking-[0.14em] mb-3">
                            About this project
                          </p>
                          <p className="font-Louis text-light text-sm leading-relaxed">
                            {deckViewingProject.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                ) : !!deckViewingProject?.imageURLs.length ? (
                  <div className="flex flex-col lg:flex-row h-full">
                    {/* Left pane — image gallery */}
                    <div className="flex-1 flex flex-col bg-primaryBackground/25 border-r border-pastelPink/8 py-6 px-6">
                      <ImageGallery project={deckViewingProject} />
                    </div>

                    {/* Right pane — info */}
                    <div className="flex-1 flex flex-col justify-center px-14 py-12 gap-6 max-w-xl overflow-y-auto">
                      {deckViewingProject.description && (
                        <div onClick={e => e.stopPropagation()}>
                          <p className="font-LouisBold text-greenApple text-[10px] uppercase tracking-[0.14em] mb-4">
                            About this project
                          </p>
                          <p className="font-Louis text-light text-sm leading-[1.8]">
                            {deckViewingProject.description}
                          </p>
                        </div>
                      )}
                      {deckViewingProject.projectUrl && (
                        <a
                          href={deckViewingProject.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-greenApple font-LouisBold text-xs cursor-pointer hover:opacity-75 transition-opacity duration-200 border border-greenApple/25 hover:border-greenApple/50 rounded-xl px-4 py-2.5 w-fit"
                        >
                          <FaExternalLinkAlt size={10} />
                          Visit {deckViewingProject.name}
                        </a>
                      )}
                    </div>
                  </div>

                ) : (
                  <div className="flex items-center justify-center h-full px-8">
                    <div className="flex flex-col items-center gap-5 text-center max-w-lg w-full">
                      {deckViewingProject?.description ? (
                        <div
                          className="p-5 rounded-2xl border border-pastelPink/15 bg-primaryBackground/40 text-left w-full"
                          onClick={e => e.stopPropagation()}
                        >
                          <p className="font-LouisBold text-greenApple text-[10px] uppercase tracking-[0.14em] mb-3">
                            About this project
                          </p>
                          <p className="font-Louis text-light text-sm leading-relaxed">
                            {deckViewingProject.description}
                          </p>
                        </div>
                      ) : (
                        <>
                          <div className="w-12 h-12 rounded-xl border border-pastelPink/20 flex items-center justify-center">
                            <span className="text-pastelPink/50 font-LouisBold text-lg">?</span>
                          </div>
                          <p className="font-Louis text-light/70 text-sm">No preview available</p>
                        </>
                      )}
                      {deckViewingProject?.projectUrl && (
                        <a
                          href={deckViewingProject.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-greenApple font-LouisBold text-xs cursor-pointer hover:opacity-75 transition-opacity duration-200 border border-greenApple/25 hover:border-greenApple/50 rounded-xl px-4 py-2.5"
                        >
                          <FaExternalLinkAlt size={10} />
                          Visit {deckViewingProject.name}
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </ModalBody>

              {/* Footer */}
              <ModalFooter className="project-modal__footer">
                <Button
                  variant="light"
                  onPress={() => handleClose(onClose)}
                  className="project-modal__close"
                >
                  Close
                </Button>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Projects;
