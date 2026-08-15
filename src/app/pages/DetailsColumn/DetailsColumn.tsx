"use client";

import HeroDecoration from "@/components/DetailsColumn/HeroDecoration";
import ExperienceProjectCount from "@/components/DetailsColumn/ExperienceProjectCount";
import { motion, useReducedMotion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const stack = ["React", "Next.js", "TypeScript", "NestJS", "Node.js", "PostgreSQL"];

const DetailsColumn = () => {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className="hero-content"
      initial={shouldReduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
    >
      <div>
        <div className="section-label">
          <span>01</span>
          Introduction
        </div>

        <p className="hero-kicker">
          <span className="hero-kicker__dot" aria-hidden="true" />
          Software developer · product-minded
        </p>

        <h1 className="hero-heading">
          I make
          <span className="hero-heading__accent">complex products</span>
          feel clear.
        </h1>

        <p className="hero-summary">
          I build web products, internal tools, and the systems behind them. My focus is simple: useful software, clean interfaces, and a codebase the next person can trust.
        </p>

        <div className="hero-actions">
          <a className="button button--primary" href="#projects">
            See selected work
            <FaArrowRight size={12} aria-hidden="true" />
          </a>
          <a className="button button--secondary" href="#contact">
            Start a conversation
          </a>
        </div>

        <div className="hero-stack" aria-label="Core technology stack">
          <span className="hero-stack__label">Core stack</span>
          {stack.map(item => (
            <span className="hero-stack__item" key={item}>{item}</span>
          ))}
        </div>

        <ExperienceProjectCount />
      </div>
      <HeroDecoration />
    </motion.div>
  );
};

export default DetailsColumn;
