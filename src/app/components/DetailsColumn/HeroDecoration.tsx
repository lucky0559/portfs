"use client";

import { motion } from "framer-motion";

const HeroDecoration = () => (
  <div className="hidden xl:flex relative flex-shrink-0 w-64 2xl:w-80 h-64 2xl:h-80 items-center justify-center">
    {/* Ambient glow */}
    <div className="absolute inset-0 rounded-full blur-3xl bg-greenApple/10 pointer-events-none" />
    <div className="absolute w-24 h-24 rounded-full blur-xl bg-greenApple/20 pointer-events-none" />

    {/* Outer ring — slow clockwise */}
    <motion.div
      className="absolute w-56 h-56 2xl:w-72 2xl:h-72 rounded-full"
      style={{ border: "1.5px solid rgba(167,130,149,0.5)" }}
      animate={{ rotate: 360 }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    >
      <motion.div
        className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full"
        style={{
          background: "#A78295",
          boxShadow: "0 0 10px rgba(167,130,149,0.9), 0 0 22px rgba(167,130,149,0.5)"
        }}
        animate={{ scale: [1, 1.35, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>

    {/* Middle ring — counter-clockwise */}
    <motion.div
      className="absolute w-40 h-40 2xl:w-52 2xl:h-52 rounded-full"
      style={{ border: "1.5px dashed rgba(206,206,90,0.6)" }}
      animate={{ rotate: -360 }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
    >
      <div
        className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
        style={{
          background: "#CECE5A",
          boxShadow: "0 0 10px rgba(206,206,90,1), 0 0 22px rgba(206,206,90,0.6)"
        }}
      />
    </motion.div>

    {/* Inner ring */}
    <div
      className="absolute w-24 h-24 2xl:w-32 2xl:h-32 rounded-full"
      style={{
        border: "1px solid rgba(167,130,149,0.3)",
        background: "radial-gradient(circle, rgba(206,206,90,0.08) 0%, transparent 70%)",
      }}
    />

    {/* Center code glyph */}
    <motion.span
      className="font-Alphaget text-4xl 2xl:text-5xl select-none z-10"
      style={{
        color: "#CECE5A",
        textShadow: "0 0 16px rgba(206,206,90,0.8), 0 0 36px rgba(206,206,90,0.4)"
      }}
      animate={{ opacity: [0.75, 1, 0.75] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      {"</>"}
    </motion.span>
  </div>
);

export default HeroDecoration;
