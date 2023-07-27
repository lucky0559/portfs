import Image from "next/image";
import React from "react";
import myProfile from "../../assets/imgs/profile.jpg";

const MyProfile = () => {
  return (
    <div className="border-2 border-solid rounded-lg border-pastelPink p-10 h-fit">
      <div className="flex justify-between items-center">
        <span className="text-light font-Alphaget text-6xl">Lucky</span>
        <span className="text-light font-LouisBold text-sm">
          Full-Stack Developer
        </span>
      </div>
      <div className="justify-center items-center my-16">
        <Image
          src={myProfile}
          alt="myProfile"
          width={350}
          height={350}
          className="m-auto rounded-lg"
        />
      </div>
      <div className="flex flex-col items-center">
        <span className="text-light font-Louis text-xl">
          angelorabosa5@gmail.com
        </span>
        <span className="text-light font-Louis text-xl">
          Base in Philippines
        </span>
        <span className="text-light font-Louis text-xl">
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
