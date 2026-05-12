"use client";

import Image from "next/image";
import React from "react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import { openInNewTabHandler } from "@/lib/hooks/useOpenNewTab";

const socialClass =
  "text-primaryBackground hover:text-light bg-light hover:bg-secondaryBackground h-auto w-auto rounded-2xl ease-in-out duration-300 hover:shadow-lg hover:shadow-pastelPink border-pastelPink border-2 border-solid flex justify-center items-center p-2 hover:cursor-pointer";

const MyProfile = () => {
  const year = new Date().getFullYear();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="border-2 border-solid rounded-lg border-pastelPink p-6 xl:p-10">
        <div className="flex justify-between items-center">
          <span className="text-light font-Alphaget text-5xl md:text-6xl xl:text-7xl">
            Lucky
          </span>
          <span className="text-light font-LouisBold text-xs md:text-sm xl:text-lg">
            Full-Stack Developer
          </span>
        </div>
        <div className="flex justify-center items-center my-8 xl:my-12">
          <Image
            src="https://storage.googleapis.com/portfs-images/profile.jpg"
            alt="myProfile"
            className="rounded-lg w-52 md:w-60 xl:w-72"
            width={500}
            height={500}
            priority
          />
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-light font-Louis text-sm md:text-base xl:text-lg text-center">
            angelorabosa5@gmail.com
          </span>
          <span className="text-light font-Louis text-sm md:text-base xl:text-lg text-center">
            Based in Philippines
          </span>
          <span className="text-pastelPink font-Louis text-xs xl:text-sm text-center">
            @{year} Lucky. All Rights Reserved
          </span>
        </div>
        <div className="flex justify-evenly mt-6">
          <FaFacebook
            size={22}
            className={socialClass}
            onClick={() => openInNewTabHandler("https://www.facebook.com/Geloyzxc")}
          />
          <FaInstagram
            size={22}
            className={socialClass}
            onClick={() =>
              openInNewTabHandler(
                "https://www.instagram.com/luckyangelorbs/?fbclid=IwAR2UAIS2nohcLzpUOodZ0PLQgUiHBmKdf_t9ZlkCYkiPxeaYLBjusdbDd-Y"
              )
            }
          />
          <FaGithub
            size={22}
            className={socialClass}
            onClick={() => openInNewTabHandler("https://github.com/lucky0559")}
          />
          <FaLinkedin
            size={22}
            className={socialClass}
            onClick={() =>
              openInNewTabHandler(
                "https://www.linkedin.com/in/lucky-angelo-aa7253217/"
              )
            }
          />
        </div>
      </div>
    </motion.div>
  );
};

export default MyProfile;
