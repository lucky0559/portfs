import React from "react";

const ExperienceProjectCount = () => {
  return (
    <div className="flex flex-row py-20 justify-between max-w-sm">
      <div className="flex flex-col">
        <span className="laptop:text-7xl mobile:text-5xl text-greenApple font-LouisBold">
          1+
        </span>
        <span className="laptop:text-sm mobile:text-xs text-light font-Louis pt-1">
          Years of Experience
        </span>
      </div>
      <div className="flex flex-col">
        <span className="laptop:text-7xl mobile:text-5xl text-greenApple font-LouisBold">
          5+
        </span>
        <span className="laptop:text-sm mobile:text-xs text-light font-Louis pt-1">
          Total Project Handled
        </span>
      </div>
    </div>
  );
};

export default ExperienceProjectCount;
