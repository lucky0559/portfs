"use client";

import Academic from "@/components/AcademicJob/Academic";
import Job from "@/components/AcademicJob/Job";
import { motion } from "framer-motion";

const AcademicJob = () => {
  return (
    <motion.div
      className="xl:flex justify-center gap-8"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Academic />
      <Job />
    </motion.div>
  );
};

export default AcademicJob;
