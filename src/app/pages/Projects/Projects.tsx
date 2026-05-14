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
import { useSprings, animated, to as interpolate } from "@react-spring/web";
import { motion, useReducedMotion } from "framer-motion";
import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { useDrag } from "react-use-gesture";

const to = (i: number) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100
});
const from = (_i: number) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
const trans = (r: number, s: number) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

type DeckProps = { project?: ViewingDeckProject };

const Deck = ({ project }: DeckProps) => {
  const [gone] = useState(() => new Set<number>());
  const [props, api] = useSprings(project?.imageURLs.length || 0, i => ({
    ...to(i),
    from: from(i)
  }));
  const bind = useDrag(
    ({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
      const trigger = velocity > 0.2;
      const dir = xDir < 0 ? -1 : 1;
      if (!down && trigger) gone.add(index);
      api.start(i => {
        if (index !== i) return;
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0;
        const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0);
        const scale = down ? 1.1 : 1;
        return {
          x, rot, scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 }
        };
      });
      if (!down && gone.size === project?.imageURLs.length)
        setTimeout(() => { gone.clear(); api.start(i => to(i)); }, 600);
    }
  );
  return (
    <>
      {props.map(({ x, y, rot, scale }, i) => (
        <animated.div
          className="absolute w-80 h-52 top-[5%] items-center justify-center touch-none"
          key={i}
          style={{ x, y }}
        >
          <animated.div
            {...bind(i)}
            style={{
              transform: interpolate([rot, scale], trans),
              backgroundImage: `url(${project?.imageURLs[i]})`
            }}
            className="bg-light bg-[length:auto_85%] bg-no-repeat bg-center w-[45vh] max-w-[300px] max-h-[570px] h-[85vh] will-change-transform rounded-[10px] shadow-lg shadow-primaryBackground cursor-pointer"
          />
        </animated.div>
      ))}
    </>
  );
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
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

  return (
    <div className="p-8 xl:p-10">
      <motion.div
        className="mb-10"
        initial={shouldReduce ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-light font-LouisBold text-2xl md:text-4xl xl:text-6xl">
          Projects
        </span>
        <p className="text-pastelPink font-Louis text-sm xl:text-base mt-2">
          A selection of work I&apos;ve built professionally and independently
        </p>
      </motion.div>

      <motion.div
        className="flex flex-row flex-wrap justify-center xl:justify-start"
        variants={shouldReduce ? {} : containerVariants}
        initial={shouldReduce ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {cards.map((card, index) => (
          <motion.div key={index} variants={cardVariants}>
            <Card
              cardImageUrl={card.imageURL}
              name={card.name}
              from={card.from}
              isPrivate={card.isPrivate}
              onClick={() => onClickProjectHandler(card.name)}
            />
          </motion.div>
        ))}
      </motion.div>

      <Modal
        size="full"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <ModalContent>
          {onClose => (
            <div className="bg-secondaryBackground h-[76%]">
              <ModalHeader className="flex flex-col gap-1">
                <p className="text-tiny uppercase text-light font-LouisBold">
                  Project in:
                </p>
                <small className="text-pastelPink font-Louis">
                  {deckViewingProject?.from}
                </small>
                <h4 className="font-LouisBold text-2xl text-greenApple">
                  {deckViewingProject?.name}
                </h4>
              </ModalHeader>

              <ModalBody className="flex items-center justify-center h-full bg-secondaryBackground">
                {deckViewingProject?.isPrivate ? (
                  <div className="flex flex-col items-center gap-4 text-center">
                    <FaLock size={60} className="text-pastelPink/50" />
                    <p className="font-LouisBold text-light text-lg">
                      This project is private and confidential
                    </p>
                    <p className="font-Louis text-pastelPink text-sm">
                      Screenshots and details cannot be shared publicly.
                    </p>
                  </div>
                ) : !!deckViewingProject?.imageURLs.length ? (
                  <Deck project={deckViewingProject} />
                ) : (
                  <span className="font-LouisBold text-light">
                    No Available Preview
                  </span>
                )}
              </ModalBody>

              {!deckViewingProject?.isPrivate && deckViewingProject?.projectUrl && (
                <div className="flex items-center justify-center bg-secondaryBackground py-3">
                  <span className="font-LouisBold text-light">
                    Visit:{" "}
                    <a
                      onClick={() =>
                        openInNewTabHandler(deckViewingProject.projectUrl)
                      }
                      className="text-greenApple cursor-pointer hover:opacity-70"
                    >
                      {deckViewingProject.name}
                    </a>
                  </span>
                </div>
              )}

              <ModalFooter className="bg-secondaryBackground">
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    setDeckViewingProject(undefined);
                    onClose();
                  }}
                  className="font-LouisBold"
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
