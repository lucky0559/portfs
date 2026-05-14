"use client";

import Image from "next/image";
import React from "react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

type MagneticLinkProps = {
  href: string;
  ariaLabel: string;
  children: React.ReactNode;
};

const MagneticLink = ({ href, ariaLabel, children }: MagneticLinkProps) => {
  const shouldReduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18 });
  const springY = useSpring(y, { stiffness: 200, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (shouldReduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      style={shouldReduce ? {} : { x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.92 }}
      className="text-primaryBackground hover:text-light bg-light hover:bg-secondaryBackground h-auto w-auto rounded-2xl ease-in-out duration-300 hover:shadow-lg hover:shadow-pastelPink border-pastelPink border-2 border-solid flex justify-center items-center p-2"
    >
      {children}
    </motion.a>
  );
};

const MyProfile = () => {
  const year = new Date().getFullYear();
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="border-2 border-solid rounded-lg border-pastelPink p-6 xl:p-10 shadow-lg shadow-pastelPink/10 backdrop-blur-sm bg-gradient-to-br from-primaryBackground to-secondaryBackground/30">
        <div className="flex justify-between items-center gap-4">
          <span className="text-light font-Alphaget text-5xl md:text-6xl xl:text-7xl tracking-tighter">
            Lucky
          </span>
          <span className="text-light font-LouisBold text-xs md:text-sm xl:text-lg uppercase tracking-widest text-right">
            Full-Stack<br/>Developer
          </span>
        </div>
        <motion.div
          className="flex justify-center items-center my-8 xl:my-12"
          whileHover={shouldReduce ? {} : { scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          <div className="rounded-lg w-52 md:w-60 xl:w-72 overflow-hidden ring-2 ring-greenApple/20 shadow-lg shadow-greenApple/10">
            <Image
              src="https://storage.googleapis.com/portfs-images/profile.jpg"
              alt="Lucky Angelo Rabosa"
              className="w-full h-auto"
              width={500}
              height={500}
              priority
            />
          </div>
        </motion.div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-light font-Louis text-sm md:text-base xl:text-lg text-center">
            angelorabosa5@gmail.com
          </span>
          <span className="text-light font-Louis text-sm md:text-base xl:text-lg text-center">
            Based in Philippines
          </span>
          <span className="text-pastelPink font-Louis text-xs xl:text-sm text-center">
            ©{year} Lucky. All rights reserved.
          </span>
        </div>
        <div className="flex justify-evenly mt-6">
          <MagneticLink href="https://www.facebook.com/Geloyzxc" ariaLabel="Facebook">
            <FaFacebook size={22} aria-hidden="true" />
          </MagneticLink>
          <MagneticLink href="https://www.instagram.com/luckyangelorbs/" ariaLabel="Instagram">
            <FaInstagram size={22} aria-hidden="true" />
          </MagneticLink>
          <MagneticLink href="https://github.com/lucky0559" ariaLabel="GitHub">
            <FaGithub size={22} aria-hidden="true" />
          </MagneticLink>
          <MagneticLink href="https://www.linkedin.com/in/lucky-angelo-aa7253217/" ariaLabel="LinkedIn">
            <FaLinkedin size={22} aria-hidden="true" />
          </MagneticLink>
        </div>
      </div>
    </motion.div>
  );
};

export default MyProfile;
