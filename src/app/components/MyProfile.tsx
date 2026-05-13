"use client";

import Image from "next/image";
import React from "react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion, useReducedMotion } from "framer-motion";

const socialClass =
  "text-primaryBackground hover:text-light bg-light hover:bg-secondaryBackground h-auto w-auto rounded-2xl ease-in-out duration-300 hover:shadow-lg hover:shadow-pastelPink border-pastelPink border-2 border-solid flex justify-center items-center p-2";

const MyProfile = () => {
  const year = new Date().getFullYear();
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, x: 20 }}
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
            alt="Lucky Angelo Rabosa"
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
          <a
            href="https://www.facebook.com/Geloyzxc"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className={socialClass}
          >
            <FaFacebook size={22} aria-hidden="true" />
          </a>
          <a
            href="https://www.instagram.com/luckyangelorbs/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className={socialClass}
          >
            <FaInstagram size={22} aria-hidden="true" />
          </a>
          <a
            href="https://github.com/lucky0559"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={socialClass}
          >
            <FaGithub size={22} aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/lucky-angelo-aa7253217/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={socialClass}
          >
            <FaLinkedin size={22} aria-hidden="true" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default MyProfile;
