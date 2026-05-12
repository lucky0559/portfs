"use client";

import Academic from "@/components/AcademicJob/Academic";
import Job from "@/components/AcademicJob/Job";
import { motion } from "framer-motion";

const AcademicJob = () => {
  return (
    <motion.div
      className="xl:flex xl:items-start"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="xl:flex-1 min-w-0">
        <Academic />
      </div>
      <div className="hidden xl:block w-px bg-pastelPink/20 self-stretch mx-2" />
      <div className="xl:flex-1 min-w-0">
        <Job />
      </div>
    </motion.div>
  );
};

export default AcademicJob;
