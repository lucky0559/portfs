"use client";

import { formatDateRange, WorkExperienceEntry, workExperiences } from "@/constants/Experience";
import { motion } from "framer-motion";
import { useState } from "react";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const CompanyLogo = ({ exp }: { exp: WorkExperienceEntry }) => {
  const [hasError, setHasError] = useState(false);

  if (exp.shortName === "ISBX") {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src="/isbx.png" alt="ISBX" className="w-full h-full object-contain p-1" />;
  }

  if (exp.logoUrl && !hasError) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={exp.logoUrl}
        alt={exp.shortName}
        className="w-full h-full object-contain p-1"
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
    <div className="p-4 xl:p-8 xl:min-w-[420px]">
      <div className="justify-center items-center flex mb-8">
        <span className="text-base md:text-2xl xl:text-4xl text-light font-LouisBold">
          Job <span className="text-greenApple">Experience</span>
        </span>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {workExperiences.map((exp, index) => {
          const isLast = index === workExperiences.length - 1;
          return (
            <motion.div
              key={exp.company}
              variants={itemVariants}
              className="flex gap-4"
            >
              {/* Left column: avatar + connector */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-12 h-12 rounded-full border-2 border-pastelPink/50 overflow-hidden shadow-md z-10 flex-shrink-0 bg-light">
                  <CompanyLogo exp={exp} />
                </div>
                {!isLast && (
                  <div className="w-px bg-pastelPink/30 flex-1 my-2" />
                )}
              </div>

              {/* Right column: card */}
              <div className={`flex-1 ${!isLast ? "pb-4" : ""}`}>
                <motion.div
                  className="bg-primaryBackground/60 border border-pastelPink/20 rounded-xl p-4 hover:border-pastelPink/50 transition-colors duration-300"
                  whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(167,130,149,0.15)" }}
                >
                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-greenApple font-LouisBold text-xs xl:text-sm">
                        {exp.role}
                      </p>
                      <h3 className="text-light font-Louis text-xs xl:text-sm mt-0.5 leading-snug">
                        {exp.company}
                      </h3>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      {exp.endDate === null && (
                        <span className="px-2 py-0.5 bg-greenApple/20 text-greenApple rounded-full text-[10px] font-LouisBold">
                          Current
                        </span>
                      )}
                      <span className="text-pastelPink font-Louis text-[10px] xl:text-xs whitespace-nowrap">
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
