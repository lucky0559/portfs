"use client";

import Image from "next/image";
import React from "react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import Trail from "@/lib/animation/trail";
import { useCustomMediaQuery } from "@/lib/hooks/useMediaQuery";
import { openInNewTabHandler } from "@/lib/hooks/useOpenNewTab";

const MyProfile = () => {
  const { isTabletOrMobile } = useCustomMediaQuery();

  const trailHeight = isTabletOrMobile ? 650 : 800;

  return (
    <Trail open={true} height={trailHeight}>
      <div className="border-2 border-solid rounded-lg border-pastelPink p-10 h-fit ">
        <div className="flex justify-between items-center">
          <span className="text-light font-Alphaget text-5xl md:text-6xl xl:text-7xl">
            Lucky
          </span>
          <span className="text-light font-LouisBold text-xs md:text-sm xl:text-lg">
            Full-Stack Developer
          </span>
        </div>
        <div className="justify-center items-center my-10 xl:my-16">
          <Image
            src="https://storage.googleapis.com/portfs-images/profile.jpg"
            alt="myProfile"
            className="m-auto rounded-lg w-60 xl:w-80"
            width={500}
            height={500}
            priority
          />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-light font-Louis text-base md:text-lg xl:text-xl text-center">
            angelorabosa5@gmail.com
          </span>
          <span className="text-light font-Louis text-base md:text-lg xl:text-xl text-center">
            Base in Philippines
          </span>
          <span className="text-light font-Louis text-base md:text-lg xl:text-xl text-center">
            @2023 Lucky. All Rights Reserved
          </span>
        </div>
        <div className="flex justify-evenly mt-8">
          <FaFacebook
            size={25}
            className="text-primaryBackground hover:text-light bg-light hover:bg-secondaryBackground h-auto w-auto rounded-2xl ease-in-out duration-300 hover:shadow-lg hover:shadow-pastelPink border-pastelPink border-2 border-solid flex justify-center items-center p-2 hover:cursor-pointer"
            onClick={() =>
              openInNewTabHandler("https://www.facebook.com/Geloyzxc")
            }
          />
          <FaInstagram
            size={25}
            className="text-primaryBackground hover:text-light bg-light hover:bg-secondaryBackground h-auto w-auto rounded-2xl ease-in-out duration-300 hover:shadow-lg hover:shadow-pastelPink border-pastelPink border-2 border-solid flex justify-center items-center p-2 hover:cursor-pointer"
            onClick={() =>
              openInNewTabHandler(
                "https://www.instagram.com/luckyangelorbs/?fbclid=IwAR2UAIS2nohcLzpUOodZ0PLQgUiHBmKdf_t9ZlkCYkiPxeaYLBjusdbDd-Y"
              )
            }
          />
          <FaGithub
            size={25}
            className="text-primaryBackground hover:text-light bg-light hover:bg-secondaryBackground h-auto w-auto rounded-2xl ease-in-out duration-300 hover:shadow-lg hover:shadow-pastelPink border-pastelPink border-2 border-solid flex justify-center items-center p-2 hover:cursor-pointer"
            onClick={() => openInNewTabHandler("https://github.com/lucky0559")}
          />
          <FaLinkedin
            size={25}
            className="text-primaryBackground hover:text-light bg-light hover:bg-secondaryBackground h-auto w-auto rounded-2xl ease-in-out duration-300 hover:shadow-lg hover:shadow-pastelPink border-pastelPink border-2 border-solid flex justify-center items-center p-2 hover:cursor-pointer"
            onClick={() =>
              openInNewTabHandler(
                "https://www.linkedin.com/in/lucky-angelo-aa7253217/"
              )
            }
          />
        </div>
      </div>
    </Trail>
  );
};

export default MyProfile;
