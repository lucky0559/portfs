"use client";

import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaLock } from "react-icons/fa";

type CardProps = {
  cardImageUrl: string;
  name: string;
  from: string;
  isPrivate?: boolean;
  isSaas?: boolean;
  role?: "Full-Stack" | "Frontend" | "Backend";
  featured?: boolean;
  onClick: () => void;
};

const Card = ({
  cardImageUrl,
  onClick,
  name,
  from,
  isPrivate,
  isSaas,
  role,
  featured
}: CardProps) => {
  return (
    <div className={`project-card-shell${featured ? " project-card-shell--featured" : ""}`}>
      <motion.button
        type="button"
        onClick={onClick}
        whileTap={{ scale: 0.985 }}
        className={`project-card${featured ? " project-card--featured" : ""}`}
        aria-label={`Open project details for ${name}`}
      >
        <div className="project-card__image">
          {isPrivate ? (
            <div className="project-card__private">
              <FaLock size={20} aria-hidden="true" />
              <span>Confidential</span>
            </div>
          ) : cardImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cardImageUrl} alt={`${name} project mark`} />
          ) : (
            <div className="project-card__private">
              <span>No public preview</span>
            </div>
          )}

          <div className="project-card__badges">
            {isPrivate && <span className="project-badge">Private</span>}
            {isSaas && <span className="project-badge project-badge--accent">SaaS</span>}
          </div>
        </div>

        <div className="project-card__content">
          <p className="project-card__from">{from}</p>
          <h3 className="project-card__name">{name}</h3>
          <div className="project-card__footer">
            {role && <span className="project-role">{role}</span>}
            <FaExternalLinkAlt className="project-card__arrow" size={11} aria-hidden="true" />
          </div>
        </div>
      </motion.button>
    </div>
  );
};

export default Card;
