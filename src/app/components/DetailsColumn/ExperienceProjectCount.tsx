"use client";

import { computeTotalYearsExperience } from "@/constants/Experience";
import { projects } from "@/constants/Projects";
import { motion, useReducedMotion } from "framer-motion";

const StatItem = ({ value, label, delay }: { value: string; label: string; delay: number }) => {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className="hero-stat"
      initial={shouldReduce ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
    >
      <span className="hero-stat__value">{value}</span>
      <span className="hero-stat__label">{label}</span>
    </motion.div>
  );
};

const ExperienceProjectCount = () => {
  const years = computeTotalYearsExperience();
  const projectCount = projects.length;

  return (
    <div className="hero-stats" aria-label="Career highlights">
      <StatItem value={`${years}+`} label="years building" delay={0.28} />
      <StatItem value={`${projectCount}+`} label="projects delivered" delay={0.4} />
    </div>
  );
};

export default ExperienceProjectCount;
