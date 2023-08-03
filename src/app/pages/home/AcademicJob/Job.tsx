"use client";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineDot,
  TimelineContent
} from "@mui/lab";
import React from "react";
import { FaGraduationCap, FaBook, FaChalkboard, FaStar } from "react-icons/fa";
import isbx from "../../../assets/imgs/isbx.png";
import Image from "next/image";
import { isMobile } from "react-device-detect";

const Job = () => {
  return (
    <div className="my-10">
      <div className="justify-center items-center flex">
        <span className="text-base md:text-2xl xl:text-4xl text-light font-LouisBold">
          Job <span className="text-greenApple">Experience</span>
        </span>
      </div>
      <Timeline position="right">
        <TimelineItem className="justify-center items-end flex">
          <TimelineSeparator>
            <TimelineConnector className="bg-pastelPink h-10 md:h-14 xl:h-20" />
            <TimelineDot className="bg-primaryBackground p-2">
              <FaStar size={isMobile ? 20 : 30} color="yellow" />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent className="mb-4">
            <span className="text-light font-Louis text-xs sm:text-sm xl:text-base">
              Newstars Inc.
            </span>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem className="justify-center items-end flex">
          <TimelineSeparator>
            <TimelineConnector className="bg-pastelPink h-10 md:h-14 xl:h-20" />
            <TimelineDot className="bg-primaryBackground">
              <FaGraduationCap size={isMobile ? 20 : 35} />
              <Image src={isbx} alt="isbx" />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent className="min-[610px]:mb-4 sm:mb-0 min-[681px]:mb-4 xl:mb-0">
            <span className="text-light font-Louis text-xs sm:text-sm xl:text-base">
              Internet Strategy Branding and Execution
            </span>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
};

export default Job;
