"use client";

import Academic from "@/components/AcademicJob/Academic";
import Job from "@/components/AcademicJob/Job";
import { motion } from "framer-motion";

const AcademicJob = () => {
  return (
    <motion.div
      className="relative grid grid-cols-1 xl:grid-cols-2 gap-10 xl:gap-16"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Academic />
      {/* Vertical divider — desktop only */}
      <div className="hidden xl:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-pastelPink/12 to-transparent pointer-events-none" />
      <Job />
    </motion.div>
  );
};

export default AcademicJob;
