"use client";

import Image from "next/image";
import React from "react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const socialLinks = [
  { href: "https://www.facebook.com/Geloyzxc", Icon: FaFacebook, label: "Facebook" },
  { href: "https://www.instagram.com/luckyangelorbs/", Icon: FaInstagram, label: "Instagram" },
  { href: "https://github.com/lucky0559", Icon: FaGithub, label: "GitHub" },
  { href: "https://www.linkedin.com/in/lucky-angelo-aa7253217/", Icon: FaLinkedin, label: "LinkedIn" },
];

const MyProfile = () => {
  const year = new Date().getFullYear();
  const shouldReduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(y, { stiffness: 120, damping: 18 });
  const rotateY = useSpring(x, { stiffness: 120, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - rect.left) / rect.width - 0.5) * 10);
    y.set(((e.clientY - rect.top) / rect.height - 0.5) * -10);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-72 sm:w-80 xl:w-64 2xl:w-72 flex-shrink-0 mx-auto xl:mx-0"
      style={shouldReduce ? {} : { perspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={shouldReduce ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-secondaryBackground/90 to-primaryBackground/80 border border-pastelPink/10 shadow-2xl shadow-black/40"
      >
        {/* Top accent stripe */}
        <div className="h-px bg-gradient-to-r from-transparent via-greenApple/40 to-transparent" />

        <div className="p-5 2xl:p-6">
          {/* Header row */}
          <div className="flex items-start justify-between mb-5">
            <span className="font-Alphaget text-3xl 2xl:text-4xl text-light tracking-tighter leading-none">
              Lucky
            </span>
            <div className="text-right">
              <p className="text-[9px] font-Louis text-pastelPink/50 uppercase tracking-[0.14em] leading-relaxed">
                Full-Stack<br />Developer
              </p>
              <div className="mt-1 flex justify-end">
                <span className="inline-block w-4 h-px bg-greenApple/40" />
              </div>
            </div>
          </div>

          {/* Profile photo */}
          <motion.div
            className="relative rounded-2xl overflow-hidden mb-5 shadow-lg shadow-black/30"
            style={{ aspectRatio: "3/4" }}
            whileHover={shouldReduce ? {} : { scale: 1.02 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            <Image
              src="/profile.jpg"
              alt="Lucky Angelo Rabosa"
              fill
              sizes="(max-width: 1280px) 280px, 288px"
              className="object-cover"
              priority
            />
            {/* Subtle vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primaryBackground/50 via-transparent to-transparent pointer-events-none" />
            {/* Availability badge */}
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-primaryBackground/80 backdrop-blur-sm border border-greenApple/20 rounded-full px-2.5 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-greenApple animate-pulse" />
              <span className="text-[9px] font-Louis text-greenApple/80 tracking-wide">Available</span>
            </div>
          </motion.div>

          {/* Contact details */}
          <div className="space-y-1 mb-5 text-center">
            <p className="text-light/60 font-Louis text-[11px] tracking-wide">
              angelorabosa5@gmail.com
            </p>
            <p className="text-pastelPink/70 font-Louis text-[10px] tracking-wider uppercase">
              Philippines
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-pastelPink/15 to-transparent mb-4" />

          {/* Social links */}
          <div className="grid grid-cols-4 gap-2">
            {socialLinks.map(({ href, Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={shouldReduce ? {} : { y: -3, backgroundColor: "rgba(206,206,90,0.08)" }}
                whileTap={{ scale: 0.94 }}
                className="flex items-center justify-center h-9 rounded-xl border border-pastelPink/30 text-pastelPink/70 hover:text-greenApple hover:border-greenApple/30 transition-colors duration-200"
              >
                <Icon size={14} aria-hidden="true" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Copyright footer */}
        <div className="px-5 pb-4">
          <p className="text-pastelPink/25 font-Louis text-[9px] text-center tracking-[0.15em]">
            ©{year} Lucky Angelo
          </p>
        </div>

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-greenApple/5 to-transparent pointer-events-none" />
      </motion.div>
    </motion.div>
  );
};

export default MyProfile;
