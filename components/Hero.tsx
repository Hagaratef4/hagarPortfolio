"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import BrushStroke from "./BrushStroke";
import CircularBadge from "./CircularBadge";
import { fadeUp, staggerContainer, easeOut } from "@/lib/motion";

interface HeroProps {
  isVisible: boolean;
}

export default function Hero({ isVisible }: HeroProps) {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = prefersReducedMotion
    ? { hidden: {}, visible: {} }
    : staggerContainer(0.08, 0.15);

  const itemVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }
    : fadeUp;

  const portraitVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }
    : {
        hidden: { opacity: 0, y: 60, scale: 0.92 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 1.2, delay: 0.25, ease: easeOut },
        },
      };

  const shapeVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }
    : {
        hidden: { opacity: 0, scale: 0.85, rotate: -5 },
        visible: {
          opacity: 1,
          scale: 1,
          rotate: 0,
          transition: { duration: 1.3, delay: 0.35, ease: easeOut },
        },
      };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden bg-cream flex flex-col"
      aria-label="Introduction"
    >
      {/* Subtle Background Grid */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.04]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #1a1a1a 1px, transparent 1px),
            linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }} />
      </div>

      {/* Top Editorial Metadata Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="relative z-20 pt-6 md:pt-8 lg:pt-10"
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16 flex items-center justify-between font-sans text-[10px] tracking-[0.3em] text-charcoal/40 uppercase">
          <div className="flex items-center gap-6">
            <span>01 — Frontend Developer</span>
            <span className="hidden sm:inline h-px w-12 bg-charcoal/20" />
            <span className="hidden sm:inline text-charcoal/30">Available for freelance</span>
          </div>
          <span className="hidden sm:inline">2026</span>
        </div>
      </motion.div>

      {/* Main Hero Content - Art-Directed Composition */}
      <div className="relative z-10 flex-1 flex items-start">
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 md:px-10 lg:px-16 pt-18 md:pt-20 lg:pt-8 pb-8">
          
          {/* Asymmetric Layout - Text Left, Portrait Overlapping Right */}
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-6 lg:gap-8 items-start">
            
            {/* Left: Editorial Typography */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="relative z-20 lg:col-span-5 flex flex-col justify-center pb-4 md:pb-6 lg:pb-12"
            >
              {/* Greeting */}
              <motion.p
                variants={itemVariants}
                className="mb-4 lg:mt-35 font-sans text-xs sm:text-sm md:text-base lg:text-lg tracking-[0.25em] md:tracking-[0.3em] text-charcoal/60 uppercase font-semibold"
              >
                Hi, I'm Hagar Atef
              </motion.p>

              {/* Main Headline - Large Editorial */}
              <h1 className="font-serif font-normal tracking-tight text-charcoal leading-[0.92] md:leading-[0.9] lg:leading-[0.88]">
                <motion.span
                  variants={itemVariants}
                  className="block text-[clamp(2.2rem,8vw,4.5rem)] md:text-[clamp(2.8rem,10vw,5.5rem)] lg:text-[clamp(4rem,12vw,7rem)]"
                >
                  FRONTEND
                </motion.span>
                <motion.span
                  variants={itemVariants}
                  className="block text-[clamp(2.2rem,8vw,4.5rem)] md:text-[clamp(2.8rem,10vw,5.5rem)] lg:text-[clamp(4rem,12vw,7rem)] ml-2 md:ml-3 lg:ml-12"
                >
                  DEVELOPER
                </motion.span>
              </h1>

              {/* Supporting Statement */}
              <motion.p
                variants={itemVariants}
                className="mt-5 md:mt-6 lg:mt-8 max-w-md font-sans text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-charcoal/70"
              >
                I build modern, responsive digital experiences with clean code, thoughtful interactions, and strong visual design.
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={itemVariants}
                className="mt-6 md:mt-8 lg:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 lg:gap-5"
              >
                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 lg:px-7 py-2.5 md:py-3 lg:py-4 bg-charcoal text-cream font-sans text-[9px] sm:text-[10px] md:text-xs tracking-[0.2em] font-medium transition-all duration-300 hover:bg-olive hover:text-charcoal hover:shadow-lg"
                >
                  VIEW MY WORK
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={1.5}
                  />
                </Link>

                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 font-sans text-[9px] sm:text-[10px] md:text-xs tracking-[0.2em] text-charcoal font-medium transition-colors hover:text-olive"
                >
                  LET'S TALK
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={1.5}
                  />
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-olive transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: Large Portrait with Organic Shape */}
            <motion.div
              variants={portraitVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="relative lg:col-span-6 flex items-center justify-center lg:justify-end min-h-[300px] sm:min-h-[400px] md:min-h-[550px] lg:min-h-[700px] pt-8 md:pt-12 lg:pt-0"
            >
              {/* Organic Green Shape - Behind Portrait */}
              <motion.div
                variants={shapeVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                className="absolute -bottom-8 -right-4 sm:-bottom-12 sm:-right-8 lg:-bottom-16 lg:-right-12 -z-10 w-[140%] sm:w-[150%] lg:w-[160%] max-w-[900px] pointer-events-none"
              >
                <BrushStroke className="h-full w-full" />
              </motion.div>

              {/* Large Portrait */}
              <div className="relative z-10 min-w-100 flex items-center justify-center">
                <Image
                  src="/images/IMG_1577-Photoroom.png"
                  alt="Hagar Atef portrait"
                  width={800}
                  height={1067}
                  className="relative z-10 w-full sm:w-[40%] md:w-[85%] lg:w-[65%] xl:w-[75%] max-w-[250px] sm:max-w-[320px] md:max-w-[500px] lg:max-w-[700px] xl:max-w-[800px] h-auto object-contain object-bottom drop-shadow-2xl"
                  sizes="(max-width: 640px) 45vw, (max-width: 768px) 40vw, (max-width: 1024px) 50vw, (max-width: 1280px) 65vw, 750px"
                  priority
                />

                {/* Circular Badge - Positioned for Balance */}
                <div className="absolute bottom-4 left-6 sm:left-2 md:-left-7 lg:left-4 xl:left-8 z-30">
                  <CircularBadge isVisible={isVisible} />
                </div>
              </div>

              {/* Decorative Elements */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute top-8 right-8 lg:right-12 font-sans text-[10px] tracking-[0.3em] text-charcoal/70 uppercase hidden sm:block"
              >
                <div className="flex flex-col items-end gap-1">
                  <span>Portfolio</span>
                  <span className="text-olive/">2026</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ duration: 0.7, delay: 1 }}
        className="relative z-10 pb-8 md:pb-10 lg:pb-12"
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16 flex items-center justify-between font-sans text-[10px] tracking-[0.25em] text-charcoal/40 uppercase">
          <div className="flex items-center gap-3">
            <ArrowDown className="h-3 w-3 text-olive/70" />
            <span>Scroll to explore</span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <span className="h-px w-16 bg-charcoal/20" />
            <span>React • Next.js • TypeScript</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
