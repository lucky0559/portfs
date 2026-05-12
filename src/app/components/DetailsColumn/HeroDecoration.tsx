"use client";

import { motion } from "framer-motion";

const dots = [
  { left: "18%", top: "12%", size: 4, duration: 3.2, delay: 0 },
  { left: "78%", top: "22%", size: 3, duration: 2.8, delay: 0.6 },
  { left: "12%", top: "68%", size: 5, duration: 3.6, delay: 1.1 },
  { left: "72%", top: "72%", size: 3, duration: 3.0, delay: 1.5 },
  { left: "50%", top: "8%",  size: 4, duration: 2.6, delay: 0.9 },
  { left: "88%", top: "48%", size: 3, duration: 3.4, delay: 0.3 },
  { left: "8%",  top: "42%", size: 4, duration: 3.1, delay: 1.3 },
  { left: "60%", top: "88%", size: 3, duration: 2.9, delay: 0.7 },
];

const HeroDecoration = () => (
  <div className="hidden xl:flex relative flex-shrink-0 w-72 2xl:w-96 h-72 2xl:h-96 items-center justify-center">
    {/* Background glow */}
    <div className="absolute inset-0 rounded-full bg-greenApple/5 blur-3xl pointer-events-none" />

    {/* Outer rotating ring with marker dot */}
    <motion.div
      className="absolute w-64 h-64 2xl:w-80 2xl:h-80 rounded-full border border-pastelPink/20"
      animate={{ rotate: 360 }}
      transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-pastelPink/60" />
    </motion.div>

    {/* Middle counter-rotating ring with marker dot */}
    <motion.div
      className="absolute w-48 h-48 2xl:w-60 2xl:h-60 rounded-full border border-greenApple/25"
      animate={{ rotate: -360 }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-greenApple/70" />
    </motion.div>

    {/* Inner static ring */}
    <div className="absolute w-28 h-28 2xl:w-36 2xl:h-36 rounded-full border border-pastelPink/15 bg-greenApple/[0.04]" />

    {/* Center code symbol */}
    <motion.span
      className="font-LouisBold text-4xl 2xl:text-5xl text-greenApple/25 select-none z-10 tracking-tight"
      animate={{ opacity: [0.25, 0.45, 0.25] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      {"</>"}
    </motion.span>

    {/* Floating ambient dots */}
    {dots.map((dot, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-pastelPink/35 pointer-events-none"
        style={{ left: dot.left, top: dot.top, width: dot.size, height: dot.size }}
        animate={{ y: [0, -10, 0], opacity: [0.25, 0.6, 0.25] }}
        transition={{ duration: dot.duration, repeat: Infinity, delay: dot.delay, ease: "easeInOut" }}
      />
    ))}
  </div>
);

export default HeroDecoration;
