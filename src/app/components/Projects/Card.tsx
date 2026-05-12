"use client";

import { motion } from "framer-motion";
import { FaLock } from "react-icons/fa";

type CardProps = {
  cardImageUrl: string;
  name: string;
  from: string;
  isPrivate?: boolean;
  onClick: () => void;
};

const Card = ({ cardImageUrl, onClick, name, from, isPrivate }: CardProps) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(167,130,149,0.2)" }}
      whileTap={{ scale: 0.97 }}
      className="m-3 w-[168px] h-[230px] flex flex-col bg-primaryBackground border border-pastelPink/25 rounded-2xl overflow-hidden cursor-pointer hover:border-pastelPink/60 transition-colors duration-300"
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
  );
};

export default Card;
