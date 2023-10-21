"use client";

import { useCustomMediaQuery } from "@/lib/hooks/useMediaQuery";
import { FaReact } from "react-icons/fa";
import {
  SiAmazons3,
  SiApollographql,
  SiAxios,
  SiBitbucket,
  SiGit,
  SiGithub,
  SiGraphql,
  SiJest,
  SiJira,
  SiNestjs,
  SiNextdotjs,
  SiPostgresql,
  SiStyledcomponents,
  SiTailwindcss,
  SiTypescript,
  SiVisualstudiocode
} from "react-icons/si";

const Skills = () => {
  const { isTabletOrMobile, isMobile } = useCustomMediaQuery();

  const liClassname =
    "relative list-none w-14 h-14 bg-light hover:text-light text-primaryBackground rounded-2xl cursor-pointer flex justify-center items-center hover:w-40 transition-all ease-in-out duration-200 hover:bg-secondaryBackground hover:p-3 font-Louis";

  return (
    <div className={`${isTabletOrMobile ? "p-8" : "p-10"}`}>
      <div>
        <span
          className={`text-light font-LouisBold ${
            isMobile ? "text-lg" : "text-6xl"
          }`}
        >
          Skills
        </span>
      </div>
      <div className="flex flex-wrap">
        <div className="flex flex-1 flex-col basis-2/4 mt-14">
          <div className="mb-6">
            <span
              className={`text-greenApple font-LouisBold ${
                isMobile ? "text-lg" : "text-2xl"
              }`}
            >
              Front-End
            </span>
          </div>
          <ul className="relative flex gap-7 flex-wrap pr-24">
            <li className={`${liClassname} hover:before:content-['React_JS']`}>
              <FaReact size={25} className="m-2" />
            </li>
            <li className={`${liClassname} hover:before:content-['Next_JS']`}>
              <SiNextdotjs size={25} className="m-2" />
            </li>
            <li
              className={`${liClassname} hover:before:content-['Typescript']`}
            >
              <SiTypescript size={25} className="m-2" />
            </li>
            <li
              className={`${liClassname} hover:before:content-['Styled_Components']`}
            >
              <SiStyledcomponents size={25} className="m-2" />
            </li>
            <li
              className={`${liClassname} hover:before:content-['Tailwind_CSS']`}
            >
              <SiTailwindcss size={25} className="m-2" />
            </li>
            <li className={`${liClassname} hover:before:content-['Axios']`}>
              <SiAxios size={25} className="m-2" />
            </li>
          </ul>
        </div>
        <div className="flex flex-1 flex-col basis-2/4 mt-14">
          <div className="mb-6">
            <span
              className={`text-greenApple font-LouisBold ${
                isMobile ? "text-lg" : "text-2xl"
              }`}
            >
              Back-End
            </span>
          </div>
          <ul className="relative flex gap-7 flex-wrap pr-24">
            <li className={`${liClassname} hover:before:content-['Nest_JS']`}>
              <SiNestjs size={25} className="m-2" />
            </li>
            <li
              className={`${liClassname} hover:before:content-['Typescript']`}
            >
              <SiTypescript size={25} className="m-2" />
            </li>
            <li
              className={`${liClassname} hover:before:content-['Postgres_SQL']`}
            >
              <SiPostgresql size={25} className="m-2" />
            </li>
            <li className={`${liClassname} hover:before:content-['AWS_S3']`}>
              <SiAmazons3 size={25} className="m-2" />
            </li>
          </ul>
        </div>
        <div className="flex flex-1 flex-col basis-2/4 mt-14">
          <div className="mb-6">
            <span
              className={`text-greenApple font-LouisBold ${
                isMobile ? "text-lg" : "text-2xl"
              }`}
            >
              Other tools
            </span>
          </div>
          <ul className="relative flex gap-7 flex-wrap pr-24">
            <li className={`${liClassname} hover:before:content-['VS_Code']`}>
              <SiVisualstudiocode size={25} className="m-2" />
            </li>
            <li className={`${liClassname} hover:before:content-['Git']`}>
              <SiGit size={25} className="m-2" />
            </li>
            <li className={`${liClassname} hover:before:content-['GitHub']`}>
              <SiGithub size={25} className="m-2" />
            </li>
            <li className={`${liClassname} hover:before:content-['Bitbucket']`}>
              <SiBitbucket size={25} className="m-2" />
            </li>
            <li className={`${liClassname} hover:before:content-['Jira']`}>
              <SiJira size={25} className="m-2" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Skills;
