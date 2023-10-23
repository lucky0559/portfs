"use client";

import Card from "@/components/Projects/Card";
import { useCustomMediaQuery } from "@/lib/hooks/useMediaQuery";
import { CardType } from "@/types/CardType";
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
import React, { useState } from "react";
import { useDrag } from "react-use-gesture";

const projects: ViewingDeckProject[] = [
  {
    name: "Chloe by People Science",
    from: "Internet Strategy Branding and Execution",
    imageURLs: [
      "https://storage.googleapis.com/chloe/Screenshot_2023-10-24-00-01-26-204_com.android.vending.png",
      "https://storage.googleapis.com/chloe/Screenshot_2023-10-24-00-01-17-606_com.android.vending.png",
      "https://storage.googleapis.com/chloe/Screenshot_2023-10-24-00-01-06-619_com.android.vending.png"
    ]
  }
];
// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i: number) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100
});
const from = (_i: number) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r: number, s: number) =>
  `perspective(1500px) rotateX(30deg) rotateY(${
    r / 10
  }deg) rotateZ(${r}deg) scale(${s})`;

type DeckProps = {
  project?: ViewingDeckProject;
};

const Deck = ({ project }: DeckProps) => {
  const [gone] = useState(() => new Set()); // The set flags all the cards that are flicked out
  const [props, api] = useSprings(project?.imageURLs.length || 0, i => ({
    ...to(i),
    from: from(i)
  })); // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(
    ({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
      const trigger = velocity > 0.2; // If you flick hard enough it should trigger the card to fly out
      const dir = xDir < 0 ? -1 : 1; // Direction should either point left or right
      if (!down && trigger) gone.add(index); // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
      api.start(i => {
        if (index !== i) return; // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
        const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0); // How much the card tilts, flicking it harder makes it rotate faster
        const scale = down ? 1.1 : 1; // Active cards lift up a bit
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 }
        };
      });
      if (!down && gone.size === project?.imageURLs.length)
        setTimeout(() => {
          gone.clear();
          api.start(i => to(i));
        }, 600);
    }
  );
  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return (
    <>
      {props.map(({ x, y, rot, scale }, i) => (
        <animated.div
          className="absolute w-80 h-52 top-[5%] items-center justify-center touch-none"
          key={i}
          style={{ x, y }}
        >
          {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
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

const Projects = () => {
  const { isTabletOrMobile, isMobile } = useCustomMediaQuery();

  const cards: CardType[] = [
    {
      name: "Chloe by People Science",
      from: "Internet Strategy Branding and Execution",
      imageURL: "https://storage.googleapis.com/chloe/chloe-logo.png"
    }
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [deckViewingProject, setDeckViewingProject] = useState<
    ViewingDeckProject | undefined
  >();

  const onClickProjectHandler = (name: string) => {
    const project = projects.find(project => project.name === name);
    setDeckViewingProject(project);
    setIsModalOpen(true);
  };

  return (
    <div className={`${isTabletOrMobile ? "p-8" : "p-10"}`}>
      <div className="mb-14">
        <span
          className={`text-light font-LouisBold ${
            isMobile ? "text-lg" : "text-6xl"
          }`}
        >
          Projects
        </span>
      </div>
      <div>
        {cards.map((card, index) => (
          <Card
            cardImageUrl={card.imageURL}
            name={card.name}
            from={card.from}
            onClick={() => onClickProjectHandler(card.name)}
            key={index}
          />
        ))}
      </div>
      <Modal
        size="full"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <ModalContent>
          {onClose => (
            <div className="bg-secondaryBackground h-[79%]">
              <ModalHeader className="flex flex-col gap-1">
                <p className="text-tiny uppercase text-light font-LouisBold">
                  Project in:
                </p>
                <small className="text-light font-Louis">
                  {deckViewingProject?.from}
                </small>
                <h4 className="font-LouisBold text-2xl text-greenApple">
                  {deckViewingProject?.name}
                </h4>
              </ModalHeader>
              <ModalBody className="flex items-center justify-center h-full bg-secondaryBackground">
                <Deck project={deckViewingProject} />
              </ModalBody>
              <ModalFooter className="bg-secondaryBackground">
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    setDeckViewingProject(undefined);
                    onClose;
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
