"use client";

import Card from "@/components/Projects/Card";
import { cards, projects } from "@/constants/Projects";
import { openInNewTabHandler } from "@/lib/hooks/useOpenNewTab";
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
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaExternalLinkAlt, FaLock } from "react-icons/fa";

type GalleryProps = { project?: ViewingDeckProject };

const ImageGallery = ({ project }: GalleryProps) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const images = project?.imageURLs ?? [];
  const count = images.length;

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
          <motion.img
            key={current}
            src={images[current]}
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
            className="max-h-[700px] max-w-full w-auto object-contain rounded-3xl shadow-2xl shadow-black/60 select-none"
            draggable={false}
          />
        </AnimatePresence>

        {/* Prev / Next arrows */}
        {count > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 w-9 h-9 rounded-full bg-primaryBackground/70 hover:bg-primaryBackground border border-pastelPink/20 hover:border-pastelPink/40 flex items-center justify-center text-light/60 hover:text-light transition-all duration-200"
            >
              <FaChevronLeft size={12} />
            </button>
            <button
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
        className="mb-10"
        initial={shouldReduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-light font-LouisBold text-3xl md:text-5xl xl:text-6xl leading-tight">
          Projects
        </h2>
        <p className="text-light font-LouisBold text-base xl:text-lg mt-2">
          A selection of work I&apos;ve built professionally and independently
        </p>
      </motion.div>

      <motion.div
        className="flex flex-row flex-wrap gap-2 justify-center xl:justify-start"
        variants={shouldReduce ? {} : containerVariants}
        initial={shouldReduce ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        {cards.map((card, index) => (
          <motion.div key={index} variants={cardVariants}>
            <Card
              cardImageUrl={card.imageURL}
              name={card.name}
              from={card.from}
              isPrivate={card.isPrivate}
              isSaas={card.isSaas}
              role={card.role}
              onClick={() => onClickProjectHandler(card.name)}
            />
          </motion.div>
        ))}
      </motion.div>

      <Modal
        size="full"
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setDeckViewingProject(undefined); }}
        hideCloseButton
        isDismissable
      >
        <ModalContent>
          {onClose => (
            <div
              className="bg-secondaryBackground flex flex-col h-full overflow-hidden"
              onClick={() => handleClose(onClose)}
            >
              {/* Header */}
              <ModalHeader className="flex-shrink-0 flex flex-col gap-1 border-b border-pastelPink/10 px-6 py-4">
                <p className="text-[10px] uppercase tracking-[0.15em] text-pastelPink/60 font-Louis">
                  {deckViewingProject?.from}
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-LouisBold text-xl text-greenApple leading-tight">
                    {deckViewingProject?.name}
                  </h4>
                  {deckViewingProject?.isSaas && (
                    <span className="inline-block px-2 py-0.5 bg-greenApple/10 border border-greenApple/30 text-greenApple/80 rounded-full text-[9px] font-LouisBold tracking-wide">
                      SaaS
                    </span>
                  )}
                  {deckViewingProject?.role && (() => {
                    const roleColors: Record<string, { bg: string; border: string; color: string }> = {
                      "Full-Stack": { bg: "rgba(56,189,248,0.18)", border: "rgba(56,189,248,0.7)", color: "#bae6fd" },
                      "Frontend":   { bg: "rgba(167,139,250,0.18)", border: "rgba(167,139,250,0.7)", color: "#ddd6fe" },
                      "Backend":    { bg: "rgba(251,191,36,0.18)", border: "rgba(251,191,36,0.7)", color: "#fde68a" }
                    };
                    const c = roleColors[deckViewingProject.role];
                    return (
                      <span
                        style={{ backgroundColor: c.bg, borderColor: c.border, color: c.color, borderWidth: 1, borderStyle: "solid" }}
                        className="inline-block px-2 py-0.5 rounded-full text-[9px] font-LouisBold tracking-wide"
                      >
                        {deckViewingProject.role}
                      </span>
                    );
                  })()}
                </div>
              </ModalHeader>

              {/* Body */}
              <ModalBody className="flex-1 overflow-hidden bg-secondaryBackground p-0">
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
                          onClick={() => openInNewTabHandler(deckViewingProject.projectUrl)}
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
                          onClick={() => openInNewTabHandler(deckViewingProject.projectUrl)}
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
              <ModalFooter className="flex-shrink-0 bg-secondaryBackground border-t border-pastelPink/8 justify-end">
                <Button
                  variant="light"
                  onPress={() => handleClose(onClose)}
                  className="font-LouisBold text-pastelPink/70 hover:text-light hover:bg-pastelPink/10"
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
