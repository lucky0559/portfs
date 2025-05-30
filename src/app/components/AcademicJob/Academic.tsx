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

const Academic = () => {
  return (
    <div>
      <div className="justify-center items-center flex">
        <span className="text-base md:text-2xl xl:text-4xl text-light font-LouisBold text-center">
          Academic <span className="text-greenApple">Qualification</span>
        </span>
      </div>
      <Timeline position="right">
        <TimelineItem className="justify-center items-end flex">
          <TimelineSeparator>
            <TimelineConnector className="bg-pastelPink h-10 md:h-14 xl:h-20" />
            <TimelineDot className="p-2" style={{ backgroundColor: "#331D2C" }}>
              <FaGraduationCap size={isMobile ? 20 : 30} />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent className="xs:-mb-1 min-[423px]:mb-2 min-[662px]:mb-5 xl:mb-0">
            <span className="text-light font-Louis text-xs sm:text-sm xl:text-base">
              Bachelor of Science in Information Technology
            </span>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem className="justify-center items-end flex">
          <TimelineSeparator>
            <TimelineConnector className="bg-pastelPink h-10 md:h-14 xl:h-20" />
            <TimelineDot className="p-2" style={{ backgroundColor: "#331D2C" }}>
              <FaBook size={isMobile ? 20 : 30} />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent className="xs:mb-2 min-[479px]:mb-5 xl:mb-0">
            <span className="text-light font-Louis text-xs sm:text-sm xl:text-base">
              Higher Secondary Certificate
            </span>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem className="justify-center items-end flex">
          <TimelineSeparator>
            <TimelineConnector className="bg-pastelPink h-10 md:h-14 xl:h-20" />
            <TimelineDot className="p-2" style={{ backgroundColor: "#331D2C" }}>
              <FaChalkboard size={isMobile ? 20 : 30} />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent className="xs:mb-2 min-[479px]:mb-5 xl:mb-0">
            <span className="text-light font-Louis text-xs sm:text-sm xl:text-base">
              Secondary School Certificate
            </span>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
};

export default Academic;
