"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { FaLock, FaExternalLinkAlt } from "react-icons/fa";

type CardProps = {
  cardImageUrl: string;
  name: string;
  from: string;
  isPrivate?: boolean;
  onClick: () => void;
};

const Card = ({ cardImageUrl, onClick, name, from, isPrivate }: CardProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.background = `radial-gradient(220px circle at ${x}px ${y}px, rgba(206,206,90,0.12), rgba(167,130,149,0.06) 60%, transparent)`;
  };

  const handleMouseLeave = () => {
    if (wrapperRef.current) {
      wrapperRef.current.style.background = "transparent";
    }
  };

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="p-[1px] rounded-2xl transition-[background] duration-400"
    >
      <motion.div
        onClick={onClick}
        whileHover={{ y: -6, boxShadow: "0 20px 48px rgba(0,0,0,0.35)" }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
        className="w-52 h-[15rem] flex flex-col bg-primaryBackground/80 border border-pastelPink/10 hover:border-pastelPink/25 rounded-2xl overflow-hidden cursor-pointer transition-colors duration-300 group"
      >
        {/* Image area */}
        <div className="h-36 flex-shrink-0 flex items-center justify-center bg-secondaryBackground/60 overflow-hidden relative">
          {isPrivate ? (
            <div className="flex flex-col items-center gap-2">
              <FaLock size={24} className="text-pastelPink/65" />
              <span className="font-Louis text-[9px] text-pastelPink/65 tracking-widest uppercase">
                Confidential
              </span>
            </div>
          ) : (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cardImageUrl}
                alt={name}
                className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
              />
              {/* Hover overlay with external link hint */}
              <div className="absolute inset-0 bg-primaryBackground/0 group-hover:bg-primaryBackground/30 transition-colors duration-300 flex items-center justify-center">
                <FaExternalLinkAlt
                  size={16}
                  className="text-greenApple/0 group-hover:text-greenApple/80 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                />
              </div>
            </>
          )}
          {isPrivate && (
            <span className="absolute bottom-2 left-2.5 inline-block px-2 py-0.5 bg-primaryBackground/70 border border-pastelPink/30 text-pastelPink/80 rounded-full text-[9px] font-LouisBold tracking-wide">
              Private
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-3.5 flex flex-col gap-1">
          <p className="text-light/50 font-Louis text-[10px] uppercase tracking-[0.12em] truncate">
            {from}
          </p>
          <h4 className="text-light font-LouisBold text-xs leading-snug line-clamp-2 group-hover:text-greenApple/90 transition-colors duration-200">
            {name}
          </h4>
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
