"use client";

import { motion, useReducedMotion } from "framer-motion";

const HeroDecoration = () => {
  const shouldReduce = useReducedMotion();

  return (
    <div className="hero-art" aria-hidden="true">
      <div className="hero-art__grid" />
      <motion.div
        className="hero-art__frame"
        animate={shouldReduce ? undefined : { rotate: [-7, -4, -7] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="hero-art__glyph"
        animate={shouldReduce ? undefined : { opacity: [0.72, 1, 0.72] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        &lt;/&gt;
      </motion.span>
      <span className="hero-art__note hero-art__note--top">systems / 01</span>
      <span className="hero-art__note hero-art__note--bottom">ship with care</span>
    </div>
  );
};

export default HeroDecoration;
