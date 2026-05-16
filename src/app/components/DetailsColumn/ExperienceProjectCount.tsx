"use client";

import { computeTotalYearsExperience } from "@/constants/Experience";
import { projects } from "@/constants/Projects";
import { motion } from "framer-motion";

const StatItem = ({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) => (
  <motion.div
    className="flex flex-col"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.7, ease: "easeOut" }}
  >
    <span className="text-5xl md:text-6xl xl:text-7xl text-greenApple font-LouisBold leading-none tracking-tighter">
      {value}
    </span>
    <span className="text-pastelPink/80 font-Louis text-xs xl:text-sm mt-2 tracking-wide">
      {label}
    </span>
  </motion.div>
);

const ExperienceProjectCount = () => {
  const years = computeTotalYearsExperience();
  const projectCount = projects.length;

  return (
    <div className="flex flex-row gap-12 pt-6 xl:pt-8">
      <div className="flex flex-col gap-1">
        <StatItem value={`${years}+`} label="Years of Experience" delay={0.3} />
      </div>
      {/* Vertical divider */}
      <div className="w-px bg-gradient-to-b from-transparent via-pastelPink/20 to-transparent self-stretch" />
      <div className="flex flex-col gap-1">
        <StatItem value={`${projectCount}+`} label="Projects Delivered" delay={0.5} />
      </div>
    </div>
  );
};

export default ExperienceProjectCount;
