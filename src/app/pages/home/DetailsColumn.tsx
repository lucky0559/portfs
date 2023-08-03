import React from "react";
import ExperienceProjectCount from "./DetailsColumn/ExperienceProjectCount";

const DetailsColumn = () => {
  return (
    <div className="p-10 xl:ml-16">
      <p className="text-light text-5xl md:text-6xl xl:text-7xl font-LouisBold max-w-2xl mb-5">
        Say Hi to{" "}
        <span className="text-greenApple text-5xl md:text-6xl xl:text-7xl font-LouisBold max-w-2xl">
          Lucky
        </span>
        , Full-Stack Developer
      </p>
      <span className="text-light font-Louis text-base md:text-lg xl:text-xl">
        I do Front-end and Back-end programming. Im using Javascript Frameworks
        and I love it.
      </span>
      <ExperienceProjectCount />
    </div>
  );
};

export default DetailsColumn;
