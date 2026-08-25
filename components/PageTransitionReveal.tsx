"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { markIntroComplete, hasIntroPlayed } from "@/lib/intro-session";

const TOTAL_BARS = 18;

export default function PageTransitionReveal() {
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Only show Page Loader on client-side route transitions (after initial site preloader has finished)
    if (hasIntroPlayed()) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 650);

      return () => clearTimeout(timer);
    } else {
      markIntroComplete();
    }
  }, []);

  if (prefersReducedMotion) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream selection:bg-olive selection:text-charcoal cursor-wait"
          role="status"
          aria-live="polite"
          aria-label="Loading page"
        >
          <div className="flex flex-col items-center justify-center">
            {/* Circular Ring Segment Loader */}
            <div className="relative flex items-center justify-center">
              {/* Rotating Segmented Ring */}
              <motion.svg
                width="140"
                height="140"
                viewBox="0 0 140 140"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 1.4,
                  ease: "linear",
                }}
                className="w-32 h-32 md:w-36 md:h-36"
              >
                {Array.from({ length: TOTAL_BARS }).map((_, i) => {
                  const angle = (i * 360) / TOTAL_BARS;
                  const isLead = i < 4;
                  const isMid = i >= 4 && i < 10;
                  const fill = isLead ? "#6B705C" : isMid ? "#1A1A1A" : "#6B705C";

                  const opacity = isLead
                    ? 1 - i * 0.15
                    : isMid
                    ? 0.45 - (i - 4) * 0.06
                    : 0.15 + (i - 10) * 0.12;

                  const barHeight = isLead ? 15 - i * 0.8 : 12;

                  return (
                    <rect
                      key={i}
                      x="68"
                      y="6"
                      width="4"
                      height={barHeight}
                      rx="2"
                      fill={fill}
                      fillOpacity={opacity}
                      transform={`rotate(${angle} 70 70)`}
                    />
                  );
                })}
              </motion.svg>

              {/* Minimal Center Monogram */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="font-serif text-sm font-medium tracking-tight text-charcoal/35 select-none">
                  HA.
                </span>
              </div>
            </div>

            {/* Subtle Loading Message */}
            <motion.p
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{
                repeat: Infinity,
                duration: 1.8,
                ease: "easeInOut",
              }}
              className="mt-8 font-sans text-xs md:text-sm tracking-[0.3em] text-charcoal/70 uppercase font-medium text-center select-none"
            >
              Crafting the next page...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
