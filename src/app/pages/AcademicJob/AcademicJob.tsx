"use client";

import Academic from "@/components/AcademicJob/Academic";
import Job from "@/components/AcademicJob/Job";
import { motion } from "framer-motion";

const AcademicJob = () => {
  return (
    <motion.div
      className="journey-grid"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Academic />
      <Job />
    </motion.div>
  );
};

export default AcademicJob;
