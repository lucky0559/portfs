"use client";

import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator
} from "@mui/lab";
import { isMobile } from "react-device-detect";
import { FaBook, FaChalkboard, FaGraduationCap } from "react-icons/fa";

const degrees = [
  {
    Icon: FaGraduationCap,
    title: "Bachelor of Science in Information Technology",
    school: "Cavite State University Main – Indang Campus",
  },
  {
    Icon: FaBook,
    title: "Higher Secondary Certificate",
    school: "Tagaytay City Science National High School",
  },
  {
    Icon: FaChalkboard,
    title: "Secondary School Certificate",
    school: "Maitim 2nd Elementary School Tagaytay",
  },
];

const Academic = () => {
  return (
    <div>
      {/* Section header */}
      <div className="mb-8">
        <h3 className="text-light font-LouisBold text-xl md:text-3xl xl:text-4xl leading-tight">
          Academic <span className="text-greenApple">Qualification</span>
        </h3>
        <div className="mt-2 h-px w-16 bg-gradient-to-r from-greenApple/40 to-transparent" />
      </div>

      <Timeline position="right" sx={{ padding: 0, margin: 0 }}>
        {degrees.map(({ Icon, title, school }, i) => (
          <TimelineItem key={i} className="justify-center items-end flex">
            <TimelineSeparator>
              <TimelineConnector
                sx={{ bgcolor: "rgba(167,130,149,0.25)", width: "1px", minHeight: isMobile ? 40 : 56 }}
              />
              <TimelineDot
                sx={{
                  bgcolor: "#331D2C",
                  borderColor: "rgba(167,130,149,0.3)",
                  borderWidth: "1px",
                  boxShadow: "none",
                  padding: isMobile ? "6px" : "10px",
                }}
              >
                <Icon
                  size={isMobile ? 14 : 18}
                  style={{ color: "#CECE5A", opacity: 0.85 }}
                />
              </TimelineDot>
            </TimelineSeparator>
            <TimelineContent sx={{ paddingBottom: i < degrees.length - 1 ? "20px" : 0 }}>
              <p className="text-light/80 font-LouisBold text-xs sm:text-sm xl:text-base leading-snug">
                {title}
              </p>
              <p className="text-pastelPink/75 font-Louis text-[11px] xl:text-xs mt-1">
                {school}
              </p>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
};

export default Academic;
