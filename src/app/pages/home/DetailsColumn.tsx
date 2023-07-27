import React from "react";
import ExperienceProjectCount from "./ExperienceProjectCount";

const DetailsColumn = () => {
  return (
    <div className="p-10">
      <p className="text-light laptop:text-7xl mobile:text-5xl font-LouisBold max-w-2xl mb-5">
        Say Hi to{" "}
        <span className="text-greenApple laptop:text-7xl mobile:text-5xl font-LouisBold max-w-2xl">
          Lucky
        </span>
        , Full-Stack Developer
      </p>
      <span className="text-light font-Louis laptop:text-xl mobile:text-base">
        I do Front-end and Back-end programming. Im using Javascript Frameworks
        and I love it.
      </span>
      <ExperienceProjectCount />
    </div>
  );
};

export default DetailsColumn;
