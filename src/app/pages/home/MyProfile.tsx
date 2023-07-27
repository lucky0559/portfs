import Image from "next/image";
import React from "react";
import myProfile from "../../assets/imgs/profile.jpg";

const MyProfile = () => {
  return (
    <div className="border-2 border-solid rounded-lg border-pastelPink p-10 h-fit">
      <div className="flex justify-between items-center">
        <span className="text-light font-Alphaget laptop:text-6xl mobile:text-5xl">
          Lucky
        </span>
        <span className="text-light font-LouisBold laptop:text-sm mobile:text-xs">
          Full-Stack Developer
        </span>
      </div>
      <div className="justify-center items-center laptop:my-16 mobile:my-10">
        <Image
          src={myProfile}
          alt="myProfile"
          className="m-auto rounded-lg laptop:w-80 mobile:w-60"
        />
      </div>
      <div className="flex flex-col items-center">
        <span className="text-light font-Louis laptop:text-xl mobile:text-base text-center">
          angelorabosa5@gmail.com
        </span>
        <span className="text-light font-Louis laptop:text-xl mobile:text-base text-center">
          Base in Philippines
        </span>
        <span className="text-light font-Louis laptop:text-xl mobile:text-base text-center">
          @2023 Lucky. All Rights Reserved
        </span>
      </div>
      <div className="flex justify-center">
        <span className="text-light">1</span>
        <span className="text-light">2</span>
        <span className="text-light">3</span>
        <span className="text-light">4</span>
      </div>
    </div>
  );
};

export default MyProfile;
