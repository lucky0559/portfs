"use client";

import Image from "next/image";
import React from "react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion, useReducedMotion } from "framer-motion";

const socialLinks = [
  { href: "https://www.facebook.com/Geloyzxc", Icon: FaFacebook, label: "Facebook" },
  { href: "https://www.instagram.com/luckyangelorbs/", Icon: FaInstagram, label: "Instagram" },
  { href: "https://github.com/lucky0559", Icon: FaGithub, label: "GitHub" },
  { href: "https://www.linkedin.com/in/lucky-angelo-aa7253217/", Icon: FaLinkedin, label: "LinkedIn" }
];

const MyProfile = () => {
  const year = new Date().getFullYear();
  const shouldReduce = useReducedMotion();

  return (
    <motion.aside
      initial={shouldReduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="profile-card"
      aria-label="Lucky Angelo profile card"
    >
      <div className="profile-card__top">
        <span className="profile-card__name">Lucky</span>
        <span className="profile-card__role">Full-stack developer</span>
      </div>

      <div className="profile-card__photo">
        <Image
          src="/profile.jpg"
          alt="Lucky Angelo Rabosa"
          fill
          sizes="(max-width: 767px) 352px, (max-width: 1023px) 240px, 320px"
          className="object-cover"
          priority
        />
        <span className="profile-card__availability">Available</span>
      </div>

      <div className="profile-card__meta">
        <a className="profile-card__email" href="mailto:angelorabosa5@gmail.com">
          angelorabosa5@gmail.com
        </a>
        <span className="profile-card__location">Philippines · UTC+8</span>
      </div>

      <div className="profile-card__socials" aria-label="Social links">
        {socialLinks.map(({ href, Icon, label }) => (
          <a
            key={label}
            className="profile-card__social"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
          >
            <Icon size={14} aria-hidden="true" />
          </a>
        ))}
      </div>

      <small className="profile-card__copyright">©{year} Lucky Angelo Rabosa</small>
    </motion.aside>
  );
};

export default MyProfile;
