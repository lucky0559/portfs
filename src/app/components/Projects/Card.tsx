"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { FaLock } from "react-icons/fa";

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
    el.style.background = `radial-gradient(180px circle at ${x}px ${y}px, rgba(206,206,90,0.55), rgba(167,130,149,0.2) 55%, rgba(167,130,149,0.15))`;
  };

  const handleMouseLeave = () => {
    if (wrapperRef.current) {
      wrapperRef.current.style.background = "rgba(167,130,149,0.18)";
    }
  };

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="m-3 rounded-2xl p-[1px] transition-[background] duration-500"
      style={{ background: "rgba(167,130,149,0.18)" }}
    >
      <motion.div
        onClick={onClick}
        whileHover={{ y: -8, boxShadow: "0 24px 48px rgba(167,130,149,0.25)" }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="w-[168px] h-[230px] flex flex-col bg-primaryBackground rounded-2xl overflow-hidden cursor-pointer"
      >
        {/* Fixed-height image area */}
        <div className="h-[140px] flex-shrink-0 flex items-center justify-center bg-secondaryBackground overflow-hidden">
          {isPrivate ? (
            <div className="flex flex-col items-center gap-2">
              <FaLock size={28} className="text-pastelPink/60" />
              <span className="font-Louis text-[10px] text-pastelPink/50">Confidential</span>
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cardImageUrl}
              alt={name}
              className="w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-110"
            />
          )}
        </div>

        {/* Fixed-height info area */}
        <div className="flex-1 p-3 flex flex-col justify-between overflow-hidden">
          <div className="overflow-hidden">
            <p className="text-pastelPink font-Louis text-[9px] uppercase tracking-wider mb-0.5 truncate">
              {from}
            </p>
            <h4 className="text-light font-LouisBold text-xs leading-snug line-clamp-2">{name}</h4>
          </div>
          {isPrivate && (
            <span className="inline-block px-1.5 py-0.5 bg-pastelPink/15 text-pastelPink rounded text-[9px] font-Louis w-fit">
              Private
            </span>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
