"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { fadeUp } from "@/lib/motion";

export default function AboutIntro() {
  const prefersReducedMotion = useReducedMotion();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (prefersReducedMotion) {
      router.push("/about");
      return;
    }
    setIsTransitioning(true);
    setTimeout(() => {
      router.push("/about");
    }, 800);
  };

  const variants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }
    : fadeUp;

  return (
    <section
      id="about"
      className="bg-cream px-6 py-24 md:py-32 lg:py-15 lg:px-30 overflow-hidden border-t border-neutral/30"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-[1600px]">
        <motion.div
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl"
        >
          <div className="mb-8">
            <p className="mb-4 font-sans text-[11px] tracking-[0.3em] text-olive uppercase">
              02 — About
            </p>
            <h2
              id="about-heading"
              className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.92] text-charcoal"
            >
              A bit about me
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
            <div>
              <p className="font-serif text-lg md:text-xl leading-relaxed text-charcoal/80 mb-6">
                I'm a Frontend Developer who enjoys turning ideas into clean, responsive, and interactive web experiences.
              </p>
              <p className="font-sans text-sm leading-relaxed text-charcoal/60 mb-8">
                I care about both how a website looks and how it feels to use, with a focus on modern technologies, thoughtful UI, and maintainable code.
              </p>
              <Link
                href="/about"
                onClick={handleNavigation}
                className="group inline-flex items-center gap-3 font-sans text-xs tracking-[0.2em] text-charcoal font-medium transition-colors hover:text-olive"
              >
                Learn More About Me
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </Link>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-px w-12 bg-olive/40 mt-2" />
                <div>
                  <h3 className="font-sans text-sm font-semibold tracking-[0.15em] text-charcoal mb-2 uppercase">
                    Focus
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-charcoal/60">
                  Modern frontend development with React, Next.js, and TypeScript
                </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="h-px w-12 bg-olive/40 mt-2" />
                <div>
                  <h3 className="font-sans text-sm font-semibold tracking-[0.15em] text-charcoal mb-2 uppercase">
                    Approach
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-charcoal/60">
                  Clean code, thoughtful interactions, and strong visual design
                </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-px w-12 bg-olive/40 mt-2" />
                <div>
                  <h3 className="font-sans text-sm font-semibold tracking-[0.15em] text-charcoal mb-2 uppercase">
                    Goal
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-charcoal/60">
                  Building digital experiences that are both beautiful and functional
                </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 bg-cream z-[100]"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
