"use client";

import { useEffect, useState } from "react";
import {
  FaBriefcase,
  FaCode,
  FaEnvelope,
  FaFolderOpen,
  FaUser
} from "react-icons/fa";

const navItems = [
  { label: "Profile", href: "#profile", Icon: FaUser },
  { label: "Background", href: "#academicJob", Icon: FaBriefcase },
  { label: "Skills", href: "#skills", Icon: FaCode },
  { label: "Projects", href: "#projects", Icon: FaFolderOpen },
  { label: "Contact", href: "#contact", Icon: FaEnvelope }
];

const Menu = () => {
  const [activeSection, setActiveSection] = useState("profile");

  useEffect(() => {
    const handleScroll = () => {
      const trigger = window.innerHeight * 0.35;
      for (const { href } of [...navItems].reverse()) {
        const id = href.slice(1);
        const section = document.getElementById(id);
        if (!section) continue;
        if (window.scrollY >= section.offsetTop - trigger) {
          setActiveSection(id);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="site-nav">
        <div className="site-nav__inner">
          <a className="site-nav__brand" href="#profile" aria-label="Back to Lucky Angelo's profile">
            <span className="site-nav__mark">LA</span>
            <span>
              Lucky Angelo
              <span className="site-nav__descriptor"> / portfolio</span>
            </span>
          </a>

          <nav aria-label="Main navigation">
            <ul className="site-nav__links">
              {navItems.map(({ label, href }) => {
                const isActive = activeSection === href.slice(1);
                return (
                  <li key={label}>
                    <a
                      href={href}
                      className="site-nav__link"
                      aria-current={isActive ? "true" : undefined}
                    >
                      <span className="site-nav__link-dot" aria-hidden="true" />
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <span className="site-nav__availability">Open to good work</span>
        </div>
      </header>

      <div className="mobile-nav">
        <nav aria-label="Mobile navigation">
          {navItems.map(({ label, href, Icon }) => {
            const isActive = activeSection === href.slice(1);
            return (
              <a
                key={label}
                href={href}
                aria-current={isActive ? "true" : undefined}
              >
                <Icon size={15} aria-hidden="true" />
                <span>{label}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Menu;
