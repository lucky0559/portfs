"use client";

import HeroDecoration from "@/components/DetailsColumn/HeroDecoration";
import ExperienceProjectCount from "@/components/DetailsColumn/ExperienceProjectCount";
import { motion } from "framer-motion";

const DetailsColumn = () => {
  return (
    <motion.div
      className="p-6 xl:p-10 xl:ml-12 xl:flex-1 flex flex-col xl:flex-row xl:items-center"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
    >
      <div className="flex flex-col xl:flex-1">
        <p className="text-light text-4xl md:text-5xl xl:text-6xl font-LouisBold max-w-2xl mb-4 leading-tight">
          Say Hi to{" "}
          <span className="text-greenApple">Lucky</span>
          ,{" "}
          <br className="hidden xl:block" />
          Full-Stack Developer
        </p>
        <span className="text-pastelPink font-Louis text-base md:text-lg xl:text-xl leading-relaxed max-w-lg">
          Full-stack developer specializing in JavaScript frameworks. I build
          scalable, high-performance applications with a focus on clean code and
          exceptional user experiences.
        </span>
        <ExperienceProjectCount />
      </div>
      <HeroDecoration />
    </motion.div>
  );
};

export default DetailsColumn;
