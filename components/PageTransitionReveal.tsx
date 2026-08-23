"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { markIntroComplete } from "@/lib/intro-session";

export default function PageTransitionReveal() {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Internal route visits should never replay the cinematic intro.
    markIntroComplete();
  }, []);

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[100] bg-cream"
      initial={{ y: "0%" }}
      animate={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
    />
  );
}
