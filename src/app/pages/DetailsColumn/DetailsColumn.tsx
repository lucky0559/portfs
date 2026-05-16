"use client";

import HeroDecoration from "@/components/DetailsColumn/HeroDecoration";
import ExperienceProjectCount from "@/components/DetailsColumn/ExperienceProjectCount";
import { motion } from "framer-motion";

const DetailsColumn = () => {
  return (
    <motion.div
      className="flex-1 flex flex-col xl:flex-row xl:items-center gap-8 xl:gap-12 min-w-0"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1], delay: 0.12 }}
    >
      <div className="flex flex-col flex-1 min-w-0">
        {/* Section label */}
        <div className="section-label mb-6">
          <span className="text-greenApple/40">01</span>
          About
        </div>

        {/* Hero headline */}
        <div className="mb-6">
          <h1 className="text-light font-LouisBold leading-[0.95] mb-3">
            <span className="block text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl">
              Say Hi to
            </span>
            <span className="block text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl text-greenApple mt-1">
              Lucky
            </span>
            <span className="block text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl text-pastelPink/70 mt-3 font-Louis tracking-wide">
              Full-Stack Developer
            </span>
          </h1>
        </div>

        {/* Bio */}
        <p className="text-pastelPink/70 font-Louis text-base md:text-lg xl:text-xl leading-relaxed max-w-lg mb-2">
          Full-stack developer specializing in JavaScript frameworks. I build
          scalable, high-performance applications with a focus on clean code and
          exceptional user experiences.
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-6 mt-4">
          {["React", "Next.js", "TypeScript", "NestJS", "Node.js", "PostgreSQL"].map(tag => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full border border-pastelPink/15 bg-pastelPink/5 text-pastelPink/60 font-Louis text-xs tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>

        <ExperienceProjectCount />
      </div>

      <HeroDecoration />
    </motion.div>
  );
};

export default DetailsColumn;
