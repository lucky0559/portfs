"use client";

import { useCustomMediaQuery } from "@/lib/hooks/useMediaQuery";
import { openInNewTabHandler } from "@/lib/hooks/useOpenNewTab";
import { FaReact } from "react-icons/fa";
import {
  SiAmazons3,
  SiApollographql,
  SiAxios,
  SiBitbucket,
  SiCss3,
  SiGit,
  SiGithub,
  SiGraphql,
  SiHtml5,
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
    "list-none w-14 h-14 bg-light hover:text-light text-primaryBackground rounded-2xl cursor-pointer flex justify-center items-center hover:w-40 transition-all ease-in-out duration-200 hover:bg-secondaryBackground hover:p-3 font-Louis";

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
          <ul className="flex gap-7 flex-wrap mr-9">
            <div className="w-40">
              <li
                className={`${liClassname} hover:before:content-['React_JS']`}
                onClick={() => openInNewTabHandler("https://react.dev/")}
              >
                <FaReact size={25} className="m-2" />
              </li>
            </div>
            <div className="w-40">
              <li
                className={`${liClassname} hover:before:content-['Next_JS']`}
                onClick={() => openInNewTabHandler("https://nextjs.org/")}
              >
                <SiNextdotjs size={25} className="m-2" />
              </li>
            </div>
            <div className="w-40">
              <li
                className={`${liClassname} hover:before:content-['HTML']`}
                onClick={() =>
                  openInNewTabHandler(
                    "https://developer.mozilla.org/en-US/docs/Web/HTML"
                  )
                }
              >
                <SiHtml5 size={25} className="m-2" />
              </li>
            </div>
            <div className="w-40">
              <li
                className={`${liClassname} hover:before:content-['CSS']`}
                onClick={() =>
                  openInNewTabHandler(
                    "https://developer.mozilla.org/en-US/docs/Web/CSS"
                  )
                }
              >
                <SiCss3 size={25} className="m-2" />
              </li>
            </div>
            <div className="w-40">
              <li
                className={`${liClassname} hover:before:content-['Typescript']`}
                onClick={() =>
                  openInNewTabHandler("https://www.typescriptlang.org/")
                }
              >
                <SiTypescript size={25} className="m-2" />
              </li>
            </div>
            <div className="w-40">
              <li
                className={`${liClassname} hover:before:content-['Styled_Components']`}
                onClick={() =>
                  openInNewTabHandler("https://styled-components.com/")
                }
              >
                <SiStyledcomponents size={25} className="m-2" />
              </li>
            </div>
            <div className="w-40">
              <li
                className={`${liClassname} hover:before:content-['Tailwind_CSS']`}
                onClick={() => openInNewTabHandler("https://tailwindcss.com/")}
              >
                <SiTailwindcss size={25} className="m-2" />
              </li>
            </div>
            <div className="w-40">
              <li
                className={`${liClassname} hover:before:content-['Axios']`}
                onClick={() =>
                  openInNewTabHandler("https://axios-http.com/docs/intro")
                }
              >
                <SiAxios size={25} className="m-2" />
              </li>
            </div>
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
          <ul className="flex gap-7 flex-wrap mr-9">
            <div className="w-40">
              <li
                className={`${liClassname} hover:before:content-['Nest_JS']`}
                onClick={() => openInNewTabHandler("https://nestjs.com/")}
              >
                <SiNestjs size={25} className="m-2" />
              </li>
            </div>
            <div className="w-40">
              <li
                className={`${liClassname} hover:before:content-['Typescript']`}
                onClick={() =>
                  openInNewTabHandler("https://www.typescriptlang.org/")
                }
              >
                <SiTypescript size={25} className="m-2" />
              </li>
            </div>
            <div className="w-40">
              <li
                className={`${liClassname} hover:before:content-['Postgres_SQL']`}
                onClick={() =>
                  openInNewTabHandler("https://www.postgresql.org/")
                }
              >
                <SiPostgresql size={25} className="m-2" />
              </li>
            </div>
            <div className="w-40">
              <li
                className={`${liClassname} hover:before:content-['AWS_S3']`}
                onClick={() =>
                  openInNewTabHandler(
                    "https://aws.amazon.com/pm/serv-s3/?trk=55ffcfa3-95d3-4418-9a79-62a64040b867&sc_channel=ps&ef_id=CjwKCAjwkNOpBhBEEiwAb3MvvVKb4c2ca62vPa8c87O0PbplUb89ahY9JobuQ6SOER_HdNFvlGbXbhoCL7YQAvD_BwE:G:s&s_kwcid=AL!4422!3!536452732958!e!!g!!aws%20s3!11543056249!112002966709"
                  )
                }
              >
                <SiAmazons3 size={25} className="m-2" />
              </li>
            </div>
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
          <ul className="flex gap-7 flex-wrap mr-9">
            <div className="w-40">
              <li
                className={`${liClassname} hover:before:content-['VS_Code']`}
                onClick={() =>
                  openInNewTabHandler("https://code.visualstudio.com/")
                }
              >
                <SiVisualstudiocode size={25} className="m-2" />
              </li>
            </div>
            <div className="w-40">
              <li
                className={`${liClassname} hover:before:content-['Git']`}
                onClick={() => openInNewTabHandler("https://git-scm.com/")}
              >
                <SiGit size={25} className="m-2" />
              </li>
            </div>
            <div className="w-40">
              <li
                className={`${liClassname} hover:before:content-['GitHub']`}
                onClick={() => openInNewTabHandler("https://github.com/")}
              >
                <SiGithub size={25} className="m-2" />
              </li>
            </div>
            <div className="w-40">
              <li
                className={`${liClassname} hover:before:content-['Bitbucket']`}
                onClick={() =>
                  openInNewTabHandler(
                    "https://bitbucket.org/product?&aceid=&adposition=&adgroup=146989401350&campaign=18815940640&creative=632894031738&device=c&keyword=bitbucket&matchtype=e&network=g&placement=&ds_kids=p74128748543&ds_e=GOOGLE&ds_eid=700000001551985&ds_e1=GOOGLE&gad_source=1&gclid=CjwKCAjwkNOpBhBEEiwAb3MvvbgjzRcFWag_mwD8GHRGQzqK9RPOj2S6ilhovz02rgJrvrPL-YkAvBoC7WgQAvD_BwE&gclsrc=aw.ds"
                  )
                }
              >
                <SiBitbucket size={25} className="m-2" />
              </li>
            </div>
            <div className="w-40">
              <li
                className={`${liClassname} hover:before:content-['Jira']`}
                onClick={() =>
                  openInNewTabHandler(
                    "https://www.atlassian.com/software/jira?&aceid=&adposition=&adgroup=147709314861&campaign=20339119198&creative=664489599817&device=c&keyword=jira&matchtype=e&network=g&placement=&ds_kids=p77108083189&ds_e=GOOGLE&ds_eid=700000001558501&ds_e1=GOOGLE&gad_source=1&gclid=CjwKCAjwkNOpBhBEEiwAb3MvvaTjTCOL8wuvM2B9oBiVFujNJlWmoi7gguGB3zbvSFgWdBn-l0o4ZBoC1tUQAvD_BwE&gclsrc=aw.ds"
                  )
                }
              >
                <SiJira size={25} className="m-2" />
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Skills;
