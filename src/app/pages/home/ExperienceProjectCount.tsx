import React from "react";

const ExperienceProjectCount = () => {
  return (
    <div className="flex flex-row py-20 justify-between max-w-sm">
      <div className="flex flex-col">
        <span className="text-7xl text-greenApple font-LouisBold">1+</span>
        <span className="text-sm text-light font-Louis pt-1">
          Years of Experience
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-7xl text-greenApple font-LouisBold">5+</span>
        <span className="text-sm text-light font-Louis pt-1">
          Total Project Handled
        </span>
      </div>
    </div>
  );
};

export default ExperienceProjectCount;
