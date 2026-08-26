"use client";

import { projects } from "@/lib/data/projects";
import { motion, useReducedMotion, type Variants, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import SafeImage from "./SafeImage";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const reveal: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease },
  },
};

const float: Variants = {
  hidden: { y: 0 },
  visible: {
    y: [-8, 8, -8],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const floatSlow: Variants = {
  hidden: { y: 0 },
  visible: {
    y: [5, -5, 5],
    transition: {
      duration: 7,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function Projects() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const containerVariants = prefersReducedMotion
    ? { hidden: {}, visible: {} }
    : container;

  const revealVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }
    : reveal;

  const floatVariants = prefersReducedMotion ? { hidden: {}, visible: {} } : float;
  const floatSlowVariants = prefersReducedMotion ? { hidden: {}, visible: {} } : floatSlow;

  const [colonAI, eCommerce, yummyMenu] = projects;

  const parallax1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -30]), { stiffness: 100, damping: 30 });
  const parallax2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -50]), { stiffness: 100, damping: 30 });
  const parallax3 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -20]), { stiffness: 100, damping: 30 });

  return (
    <section
      id="work"
      className="relative bg-cream px-6 py-24 md:py-32 lg:py-15 lg:px-30 overflow-hidden border-t border-neutral/30"
      aria-labelledby="work-heading"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #1a1a1a 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, #1a1a1a 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Ambient Background Blobs */}
      <motion.div
        style={{ y: parallax1 }}
        className="absolute top-[10%] right-[5%] w-[500px] h-[500px] bg-olive/3 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        style={{ y: parallax2 }}
        className="absolute bottom-[15%] left-[10%] w-[400px] h-[400px] bg-neutral/5 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="relative mx-auto max-w-[1600px]">
        {/* Minimal Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12 md:mb-16"
        >
          <motion.div variants={revealVariants} className="flex items-center gap-4 mb-4">
            <span className="font-sans text-[10px] tracking-[0.3em] text-olive uppercase">
              03 — Selected Work
            </span>
            <span className="h-px w-12 bg-olive/20" />
          </motion.div>
          <motion.h2
            id="work-heading"
            variants={revealVariants}
            className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.9] text-charcoal"
          >
            Projects
          </motion.h2>
        </motion.div>

        {/* Single Interactive Composition */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative min-h-[800px] md:min-h-[900px] lg:h-[1100px]"
        >
          {/* Decorative Circle Outline */}
          <motion.div
            variants={floatSlowVariants}
            className="absolute top-[15%] left-[5%] w-32 h-32 md:w-40 md:h-40 border border-olive/20 rounded-full pointer-events-none"
          />
          
          {/* Decorative Line */}
          <motion.div
            variants={floatVariants}
            className="absolute top-[30%] right-[8%] w-24 h-px bg-charcoal/10 pointer-events-none"
          />

          {/* Decorative Small Circle */}
          <motion.div
            variants={floatSlowVariants}
            className="absolute bottom-[25%] right-[15%] w-12 h-12 bg-neutral/20 rounded-full pointer-events-none"
          />

          {/* PROJECT 01 - ColonAI - Main Focal Panel */}
          <motion.div
            variants={revealVariants}
            style={{ y: parallax1 }}
            className="relative w-full mb-8 md:mb-10 lg:absolute lg:top-[5%] lg:left-[5%] lg:w-[45%] lg:z-20"
          >
            <Link href={`/projects/${colonAI.slug}`} className="block group">
              <motion.div
                whileHover={{ scale: 1.015, rotate: 0.5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.6, ease }}
                className="relative"
              >
                {/* Main Panel */}
                <div className="relative aspect-[16/10] md:aspect-[16/9] lg:aspect-[3/2] overflow-hidden bg-neutral/15 rounded-lg shadow-2xl">
                  <SafeImage
                    src={colonAI.image}
                    alt={`${colonAI.title} preview`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 90vw, 60vw"
                    priority
                  />
                  <motion.div
                    className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/5 transition-colors duration-600"
                  />
                </div>

                {/* Project Number - Mobile/Tablet */}
                <motion.div
                  variants={floatVariants}
                  className="lg:hidden flex absolute -top-4 -left-4 w-16 h-16 md:w-20 md:h-20 bg-olive rounded-full items-center justify-center shadow-xl border-4 border-cream"
                >
                  <span className="font-serif text-2xl md:text-3xl text-charcoal font-light">01</span>
                </motion.div>

                {/* Project Number - Desktop Only */}
                <motion.div
                  variants={floatVariants}
                  className="hidden lg:flex absolute -top-6 -left-6 w-20 h-20 md:w-24 md:h-24 bg-olive rounded-full items-center justify-center shadow-xl border-4 border-cream"
                >
                  <span className="font-serif text-3xl md:text-4xl text-charcoal font-light">01</span>
                </motion.div>

                {/* Project Title - Below Image (All Devices) */}
                <div className="mt-4">
                  <h3 className="font-serif text-lg md:text-xl text-charcoal leading-tight">
                    {colonAI.title}
                  </h3>
                </div>

                {/* Tech Labels - Desktop Only */}
                <motion.div
                  variants={floatSlowVariants}
                  className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 flex-col gap-2"
                >
                  {colonAI.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border border-charcoal/10 font-sans text-[9px] tracking-[0.15em] text-charcoal/70 uppercase whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
              </motion.div>
            </Link>
          </motion.div>

          {/* PROJECT 02 - E-Commerce - Overlapping Layer */}
          <motion.div
            variants={revealVariants}
            style={{ y: parallax2 }}
            className="relative w-full mb-8 md:mb-10 lg:absolute lg:top-[35%] lg:right-[5%] lg:w-[40%] lg:z-30"
          >
            <Link href={`/projects/${eCommerce.slug}`} className="block group">
              <motion.div
                whileHover={{ scale: 1.05, y: -10 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.5, ease }}
                className="relative"
              >
                {/* Panel */}
                <div className="relative aspect-[16/10] md:aspect-[16/9] lg:aspect-[4/3] overflow-hidden bg-neutral/15 rounded-lg shadow-xl">
                  <SafeImage
                    src={eCommerce.image}
                    alt={`${eCommerce.title} preview`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 90vw, 60vw"
                  />
                  <motion.div
                    className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/8 transition-colors duration-500"
                  />
                </div>

                {/* Number Badge - Mobile/Tablet */}
                <motion.div
                  variants={floatVariants}
                  className="lg:hidden flex absolute -top-2 -right-2 w-12 h-12 md:w-14 md:h-14 bg-charcoal rounded-full items-center justify-center shadow-lg"
                >
                  <span className="font-serif text-xl md:text-2xl text-cream font-light">02</span>
                </motion.div>

                {/* Number Badge - Desktop Only */}
                <motion.div
                  variants={floatVariants}
                  className="hidden lg:flex absolute -top-3 -right-3 w-14 h-14 bg-charcoal rounded-full items-center justify-center shadow-lg"
                >
                  <span className="font-serif text-2xl text-cream font-light">02</span>
                </motion.div>

                {/* Project Title - Below Image (All Devices) */}
                <div className="mt-4">
                  <h3 className="font-serif text-lg md:text-xl text-charcoal leading-tight">
                    {eCommerce.title}
                  </h3>
                </div>

                {/* Decorative Line - Desktop Only */}
                <div className="hidden lg:block absolute -left-8 top-1/2 w-12 h-px bg-olive/40" />
              </motion.div>
            </Link>
          </motion.div>

          {/* PROJECT 03 - Yummy Menu - Under Project 1 */}
          <motion.div
            variants={revealVariants}
            style={{ y: parallax3 }}
            className="relative w-full mb-8 md:mb-10 lg:absolute lg:top-[55%] lg:left-[5%] lg:w-[45%] lg:z-10"
          >
            <Link href={`/projects/${yummyMenu.slug}`} className="block group">
              <motion.div
                whileHover={{ scale: 1.015, rotate: 0.5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.6, ease }}
                className="relative"
              >
                {/* Panel */}
                <div className="relative aspect-[16/10] md:aspect-[16/9] lg:aspect-[16/10] overflow-hidden bg-neutral/15 rounded-lg shadow-2xl">
                  <SafeImage
                    src={yummyMenu.image}
                    alt={`${yummyMenu.title} preview`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 90vw, 60vw"
                  />
                  <motion.div
                    className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/5 transition-colors duration-600"
                  />
                </div>

                {/* Project Number - Mobile/Tablet */}
                <motion.div
                  variants={floatVariants}
                  className="lg:hidden flex absolute -top-4 -left-4 w-16 h-16 md:w-20 md:h-20 bg-olive rounded-full items-center justify-center shadow-xl border-4 border-cream"
                >
                  <span className="font-serif text-2xl md:text-3xl text-charcoal font-light">03</span>
                </motion.div>

                {/* Project Number - Desktop Only */}
                <motion.div
                  variants={floatVariants}
                  className="hidden lg:flex absolute -top-6 -left-6 w-20 h-20 md:w-24 md:h-24 bg-olive rounded-full items-center justify-center shadow-xl border-4 border-cream"
                >
                  <span className="font-serif text-3xl md:text-4xl text-charcoal font-light">03</span>
                </motion.div>

                {/* Project Title - Below Image (All Devices) */}
                <div className="mt-4">
                  <h3 className="font-serif text-lg md:text-xl text-charcoal leading-tight">
                    {yummyMenu.title}
                  </h3>
                </div>

                {/* Tech Labels - Desktop Only */}
                <motion.div
                  variants={floatSlowVariants}
                  className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 flex-col gap-2"
                >
                  {yummyMenu.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border border-charcoal/10 font-sans text-[9px] tracking-[0.15em] text-charcoal/70 uppercase whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
              </motion.div>
            </Link>
          </motion.div>

          {/* Floating Decorative Elements */}
          <motion.div
            variants={floatVariants}
            className="absolute top-[20%] left-[45%] z-40 hidden md:block"
          >
            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-charcoal/10">
              <span className="font-sans text-[9px] tracking-[0.2em] text-charcoal/70 uppercase">
                Frontend Development
              </span>
            </div>
          </motion.div>

          <motion.div
            variants={floatSlowVariants}
            className="absolute bottom-[20%] right-[40%] z-40 hidden md:block"
          >
            <div className="flex items-center gap-2 bg-olive/90 px-4 py-2 rounded-full shadow-lg">
              <span className="font-sans text-[9px] tracking-[0.2em] text-charcoal uppercase">
                React
              </span>
              <span className="w-1 h-1 bg-charcoal/30 rounded-full" />
              <span className="font-sans text-[9px] tracking-[0.2em] text-charcoal uppercase">
                TypeScript
              </span>
            </div>
          </motion.div>

          {/* Large Background Number */}
          {/* <motion.div
            variants={revealVariants}
            className="absolute bottom-[5%] right-[5%] font-serif text-[20vw] text-olive/5 font-light leading-none pointer-events-none select-none z-0"
          >
            03
          </motion.div> */}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className=" pt-20 mt-20 border-t border-charcoal/10"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="font-sans text-[10px] tracking-[0.3em] text-olive uppercase mb-3">
                Interested in collaboration?
              </p>
              <h3 className="font-serif text-xl md:text-2xl text-charcoal leading-tight">
                Let's build something great together
              </h3>
            </div>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 px-6 py-4 bg-charcoal text-cream font-sans text-xs tracking-[0.2em] font-medium transition-all duration-300 hover:bg-olive hover:text-charcoal hover:shadow-lg self-start"
            >
              Get In Touch
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                strokeWidth={1.5}
              />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
