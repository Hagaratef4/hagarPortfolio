"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

const BADGE_TEXT = "AVAILABLE FOR WORK • ";

interface CircularBadgeProps {
  isVisible: boolean;
  className?: string;
}

export default function CircularBadge({
  isVisible,
  className = "",
}: CircularBadgeProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={
        isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }
      }
      transition={{ duration: 0.9, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative z-20 ${className}`}
    >
      <Link
        href="/contact"
        aria-label="Available for work, contact me"
        className="group relative block h-24 w-24 sm:h-28 sm:w-28 lg:h-32 lg:w-32"
      >
        <motion.svg
          viewBox="0 0 120 120"
          className="h-full w-full text-charcoal transition-colors duration-300 group-hover:text-olive"
          animate={prefersReducedMotion ? {} : { rotate: 360 }}
          transition={
            prefersReducedMotion
              ? {}
              : { duration: 25, repeat: Infinity, ease: "linear" }
          }
        >
          <defs>
            <path
              id="badgeCircle"
              d="M 60,60 m -48,0 a 48,48 0 1,1 96,0 a 48,48 0 1,1 -96,0"
            />
          </defs>
          <text
            fill="currentColor"
            fontSize="8.5"
            fontFamily="var(--font-inter), sans-serif"
            letterSpacing="2"
            fontWeight="500"
          >
            <textPath href="#badgeCircle" startOffset="0%">
              {BADGE_TEXT}
            </textPath>
          </text>
        </motion.svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/20 bg-cream/80 transition-all duration-300 group-hover:border-olive group-hover:bg-olive">
            <ArrowUpRight
              className="h-3.5 w-3.5 text-charcoal transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
              strokeWidth={1.5}
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
