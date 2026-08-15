"use client";

import { formatDateRange, WorkExperienceEntry, workExperiences } from "@/constants/Experience";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

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
    <span
      className="w-full h-full flex items-center justify-center text-light font-LouisBold text-xs"
      style={{ backgroundColor: exp.avatarColor }}
    >
      {exp.initials}
    </span>
  );
};

const Job = () => {
  const shouldReduce = useReducedMotion();

  return (
    <div className="journey-block">
      <div className="block-heading">
        <span className="block-heading__index">02</span>
        <h3>Work in practice</h3>
      </div>

      <motion.ol
        className="job-list"
        initial={shouldReduce ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } }
        }}
      >
        {workExperiences.map(exp => (
          <motion.li
            key={exp.company}
            className="job-entry"
            variants={{
              hidden: { opacity: 0, x: -18 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } }
            }}
          >
            <div className="job-logo">
              <CompanyLogo exp={exp} />
            </div>
            <div className="job-card">
              <div className="job-card__top">
                <div>
                  <p className="job-role">{exp.role}</p>
                  <p className="job-company">{exp.company}</p>
                </div>
                <div className="job-meta">
                  {exp.endDate === null && <span className="job-status">Current</span>}
                  <span className="job-date">{formatDateRange(exp.startDate, exp.endDate)}</span>
                </div>
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </div>
  );
};

export default Job;
