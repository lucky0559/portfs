"use client";

import { formatDateRange, WorkExperienceEntry, workExperiences } from "@/constants/Experience";
import { motion } from "framer-motion";
import { useState } from "react";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const CompanyLogo = ({ exp }: { exp: WorkExperienceEntry }) => {
  const [hasError, setHasError] = useState(false);

  if (exp.shortName === "ISBX") {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src="/isbx.png" alt="ISBX" className="w-full h-full object-contain p-1.5" />;
  }

  if (exp.logoUrl && !hasError) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={exp.logoUrl}
        alt={exp.shortName}
        className="w-full h-full object-contain p-1.5"
        onError={() => setHasError(true)}
      />
    );
  }

  return (
    <div
      className="w-full h-full flex items-center justify-center text-light font-LouisBold text-xs"
      style={{ backgroundColor: exp.avatarColor }}
    >
      {exp.initials}
    </div>
  );
};

const Job = () => {
  return (
    <div>
      {/* Section header */}
      <div className="mb-8">
        <h3 className="text-light font-LouisBold text-xl md:text-3xl xl:text-4xl leading-tight">
          Job <span className="text-greenApple">Experience</span>
        </h3>
        <div className="mt-2 h-px w-16 bg-gradient-to-r from-greenApple/40 to-transparent" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {workExperiences.map((exp, index) => {
          const isLast = index === workExperiences.length - 1;
          return (
            <motion.div key={exp.company} variants={itemVariants} className="flex gap-4">
              {/* Avatar + connector */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-10 h-10 rounded-full border-2 border-pastelPink/50 overflow-hidden shadow-md shadow-pastelPink/15 z-10 flex-shrink-0 bg-light/70">
                  <CompanyLogo exp={exp} />
                </div>
                {!isLast && (
                  <div className="w-px bg-gradient-to-b from-pastelPink/25 to-transparent flex-1 my-2" />
                )}
              </div>

              {/* Card */}
              <div className={`flex-1 min-w-0 ${!isLast ? "pb-4" : ""}`}>
                <motion.div
                  className="bg-secondaryBackground/60 border border-pastelPink/20 rounded-2xl p-3.5 hover:border-pastelPink/40 hover:bg-secondaryBackground/80 transition-all duration-300"
                  whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}
                >
                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-greenApple font-LouisBold text-xs xl:text-sm leading-none">
                        {exp.role}
                      </p>
                      <p className="text-light font-Louis text-xs mt-1 leading-snug">
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      {exp.endDate === null && (
                        <span className="px-2 py-0.5 bg-greenApple/10 border border-greenApple/20 text-greenApple/80 rounded-full text-[9px] font-LouisBold tracking-wide">
                          Current
                        </span>
                      )}
                      <span className="text-light/80 font-Louis text-[10px] xl:text-[11px] whitespace-nowrap">
                        {formatDateRange(exp.startDate, exp.endDate)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Job;
