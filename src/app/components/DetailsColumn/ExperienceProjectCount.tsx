"use client";

import { computeTotalYearsExperience } from "@/constants/Experience";
import { projects } from "@/constants/Projects";
import { motion } from "framer-motion";

const ExperienceProjectCount = () => {
  const years = computeTotalYearsExperience();
  const projectCount = projects.length;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 + 0.3, duration: 0.6, ease: "easeOut" }
    })
  };

  return (
    <div className="flex flex-row py-8 xl:py-10 justify-between max-w-sm">
      <motion.div
        className="flex flex-col"
        custom={0}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <span className="text-5xl md:text-6xl xl:text-7xl text-greenApple font-LouisBold">
          {years}+
        </span>
        <span className="text-xs xl:text-sm text-pastelPink font-Louis pt-1">
          Years of Experience
        </span>
      </motion.div>
      <motion.div
        className="flex flex-col"
        custom={1}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <span className="text-5xl md:text-6xl xl:text-7xl text-greenApple font-LouisBold">
          {projectCount}+
        </span>
        <span className="text-xs xl:text-sm text-pastelPink font-Louis pt-1">
          Total Projects Handled
        </span>
      </motion.div>
    </div>
  );
};

export default ExperienceProjectCount;
