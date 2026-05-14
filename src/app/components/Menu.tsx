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
  { label: "Academic/Job", href: "#academicJob", Icon: FaBriefcase },
  { label: "Skills", href: "#skills", Icon: FaCode },
  { label: "Projects", href: "#projects", Icon: FaFolderOpen },
  { label: "Contact", href: "#contact", Icon: FaEnvelope }
];

// Hardcoded so Tailwind's static scanner generates these classes
const zIndexes = ["z-[5]", "z-[4]", "z-[3]", "z-[2]", "z-[1]"];

const liClassname =
  "relative list-none w-52 p-4 text-primaryBackground bg-light duration-500 hover:bg-primaryBackground hover:text-light hover:-translate-x-50-px before:text-light before:flex before:justify-center before:items-center before:absolute before:top-0 before:-left-10 before:w-10 before:h-full before:bg-menuPrimary before:origin-right before:skew-y-45 before:duration-500 hover:before:bg-light hover:before:text-primaryBackground after:content-[''] after:absolute after:-top-10 after:left-0 after:w-full after:h-10 after:bg-menuLightPrimary after:origin-bottom after:skew-x-45 after:duration-500 hover:after:bg-light cursor-pointer";

const aClassname =
  "uppercase tracking-wider duration-400 m-0 block w-full h-full";

const Menu = () => {
  const [activeSection, setActiveSection] = useState("profile");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const trigger = window.innerHeight / 3;
      for (const { href } of [...navItems].reverse()) {
        const id = href.replace("#", "");
        const el = document.getElementById(id);
        if (!el) continue;
        if (scrollY >= el.offsetTop - trigger) {
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
      {/* Desktop: original 3D skewed floating panel — z-index must be hardcoded so Tailwind generates the classes */}
      <div className="hidden xl:block fixed bottom-15% right-8 z-20">
        <ul className="text-light relative -skew-y-15">
          {navItems.map(({ label, href }, i) => (
            <li key={label} className={`${liClassname} ${zIndexes[i]}`}>
              <a href={href} className={aClassname}>{label}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile / tablet: fixed bottom navigation bar */}
      <div className="xl:hidden fixed bottom-0 left-0 right-0 z-20 bg-primaryBackground/95 backdrop-blur-md border-t border-pastelPink/20">
        <nav aria-label="Main navigation" className="flex justify-around items-center py-2 px-1">
          {navItems.map(({ label, href, Icon }) => {
            const isActive = activeSection === href.replace("#", "");
            return (
              <a
                key={label}
                href={href}
                className={`flex flex-col items-center gap-1 transition-colors duration-200 flex-1 py-1 ${
                  isActive ? "text-greenApple" : "text-pastelPink hover:text-light"
                }`}
              >
                <Icon size={17} />
                <span className="font-Louis text-[10px] text-center leading-tight w-full">
                  {label}
                </span>
              </a>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Menu;
