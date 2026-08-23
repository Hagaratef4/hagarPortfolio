"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Code, Layout, Sparkles, Smartphone, CheckCircle2 } from "lucide-react";
import SafeImage from "./SafeImage";
import BrushStroke from "./BrushStroke";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease },
  },
};

const lineReveal: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease },
  },
};

const reducedFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
};

const WHAT_I_DO = [
  {
    number: "01",
    title: "FRONTEND DEVELOPMENT",
    icon: Code,
    description:
      "Building scalable, maintainable web applications using React, Next.js, and TypeScript with clean component architecture.",
  },
  {
    number: "02",
    title: "UI / UX IMPLEMENTATION",
    icon: Layout,
    description:
      "Translating complex designs into responsive, pixel-perfect user interfaces focused on clarity, accessibility, and user flow.",
  },
  {
    number: "03",
    title: "RESPONSIVE WEB DESIGN",
    icon: Smartphone,
    description:
      "Crafting seamless, modern experiences that adapt fluidly across mobile, tablet, and ultra-wide desktop displays.",
  },
  {
    number: "04",
    title: "INTERACTIVE EXPERIENCES",
    icon: Sparkles,
    description:
      "Integrating subtle micro-interactions, smooth page transitions, and dynamic data state handling to elevate engagement.",
  },
];

const SKILLS_EXPERTISE = [
  {
    id: "01",
    title: "FRONTEND DEVELOPMENT",
    subtitle: "React • Next.js • TypeScript • JavaScript",
    tags: ["React 19", "Next.js App Router", "TypeScript 5", "ES6+"],
  },
  {
    id: "02",
    title: "UI / UX IMPLEMENTATION",
    subtitle: "Tailwind CSS • CSS Architecture • Figma to Code",
    tags: ["Tailwind CSS v4", "CSS3 / SCSS", "Design Tokens", "Accessibility"],
  },
  {
    id: "03",
    title: "RESPONSIVE WEB DESIGN",
    subtitle: "Fluid Layouts • Mobile-First • Adaptive Viewports",
    tags: ["Container Queries", "Flexbox & Grid", "Media Queries"],
  },
  {
    id: "04",
    title: "INTERACTIVE EXPERIENCES",
    subtitle: "Framer Motion • Page Transitions • Micro-Animations",
    tags: ["Framer Motion", "Page Reveals", "Gesture Logic"],
  },
  {
    id: "05",
    title: "API & DATA INTEGRATION",
    subtitle: "REST APIs • Dynamic State • Async Data Fetching",
    tags: ["Fetch / Axios", "State Management", "JSON APIs"],
  },
];

const TECH_STACK_TAGS = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "HTML5",
  "CSS3",
  "REST APIs",
  "Git",
  "GitHub",
  "Framer Motion",
  "Vite",
];

export default function AboutContent() {
  const prefersReducedMotion = useReducedMotion();

  const reveal = prefersReducedMotion ? reducedFade : fadeUp;
  const fade = prefersReducedMotion ? reducedFade : fadeIn;
  const container = prefersReducedMotion
    ? { hidden: {}, visible: { transition: { staggerChildren: 0 } } }
    : stagger;
  const line = prefersReducedMotion ? reducedFade : lineReveal;

  return (
    <div className="relative overflow-hidden flex flex-col gap-24 pb-20 pt-4">
      {/* Background Watermark */}
      <motion.span
        variants={fade}
        initial="hidden"
        animate="visible"
        className="pointer-events-none absolute -right-6 top-0 select-none font-serif text-[clamp(14rem,26vw,20rem)] leading-none text-charcoal/[0.03] lg:-right-12"
        aria-hidden="true"
      >
        ABOUT
      </motion.span>

      {/* ──────────────── SECTION 1: HERO ──────────────── */}
      <motion.section
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative flex flex-col gap-8"
      >
        {/* Label */}
        <motion.div variants={reveal} className="flex items-center gap-4">
          <span className="font-sans text-xs tracking-[0.3em] text-olive font-semibold">
            01 / ABOUT
          </span>
          <motion.span
            variants={line}
            className="block h-px w-12 bg-olive/60"
            aria-hidden="true"
          />
          <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-charcoal/50">
            BIOGRAPHY & FOCUS
          </span>
        </motion.div>

        {/* Editorial Headline */}
        <motion.h1
          variants={reveal}
          className="font-serif text-[clamp(2.8rem,6.5vw,5.5rem)] leading-[0.92] tracking-tight text-charcoal"
        >
          I BUILD DIGITAL <br />
          <span className="italic text-olive font-serif">EXPERIENCES</span> THAT MATTER.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={reveal}
          className="max-w-2xl font-sans text-lg leading-relaxed text-charcoal/80 md:text-xl"
        >
          I&apos;m Hagar Atef, a Frontend Developer dedicated to turning ideas into polished, responsive, and intuitive web applications built with modern web technologies.
        </motion.p>

        {/* Decorative Divider */}
        <motion.div
          variants={line}
          className="mt-6 h-px w-full bg-charcoal/10"
          aria-hidden="true"
        />
      </motion.section>

      {/* ──────────────── SECTION 2: PORTRAIT & STORY ──────────────── */}
      <motion.section
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center"
      >
        {/* Left: Portrait Card */}
        <motion.div variants={reveal} className="lg:col-span-5 relative flex justify-center">
          <div className="relative w-full max-w-md aspect-[3/4] overflow-hidden rounded-2xl border border-charcoal/10 bg-cream shadow-xl">
            {/* Brush accent backing */}
            <div className="absolute -right-6 -bottom-6 -z-10 h-[100%] w-[80%] opacity-80">
              <BrushStroke className="h-full w-full text-olive/30" />
            </div>

            <SafeImage
              src="/images/my_photo-removebg-preview.png"
              alt="Hagar Atef portrait"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 400px"
              priority
            />

            {/* Badge overlay */}
            <div className="absolute bottom-4 left-4 rounded-xl bg-neutral/20 px-4 py-3 shadow-md backdrop-blur-md border border-charcoal/10">
              <p className="font-sans text-[10px] tracking-[0.2em] text-olive font-bold uppercase">
                STATUS
              </p>
              <p className="font-sans text-xs font-semibold text-charcoal/90 mt-0.5">
                Available for Frontend Roles & Projects
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right: Bio & Narrative */}
        <motion.div variants={reveal} className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="font-sans text-xs tracking-[0.25em] text-olive font-semibold">
              MY APPROACH
            </span>
            <span className="h-px w-8 bg-olive/40" />
          </div>

          <h2 className="font-serif text-3xl text-charcoal sm:text-4xl leading-tight">
            Bridging Design, Code, & Purposeful Usability
          </h2>

          <p className="font-sans text-base leading-relaxed text-charcoal/80 md:text-lg">
            I approach frontend development as an intersection of visual harmony and technical precision. Every line of code I write aims to make the web cleaner, faster, and more enjoyable for real users.
          </p>

          <p className="font-sans text-base leading-relaxed text-charcoal/70">
            From crafting accessible UI layouts to integrating REST APIs and state management, I focus on building robust interfaces that work seamlessly across all screen sizes and devices.
          </p>

          {/* Highlights */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 rounded-xl border border-charcoal/10 bg-cream p-4">
              <CheckCircle2 className="h-5 w-5 text-olive shrink-0 mt-0.5" />
              <div>
                <h3 className="font-sans text-sm font-semibold text-charcoal">Clean Architecture</h3>
                <p className="font-sans text-xs text-charcoal/60 mt-0.5">Modular, maintainable TypeScript & React code</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-charcoal/10 bg-cream p-4">
              <CheckCircle2 className="h-5 w-5 text-olive shrink-0 mt-0.5" />
              <div>
                <h3 className="font-sans text-sm font-semibold text-charcoal">User-Centric Design</h3>
                <p className="font-sans text-xs text-charcoal/60 mt-0.5">Focus on clarity, accessibility, and micro-interactions</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* ──────────────── SECTION 3: WHAT I DO ──────────────── */}
      <motion.section
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="flex flex-col gap-12"
      >
        <motion.div variants={reveal} className="flex flex-col gap-3">
          <p className="font-sans text-xs tracking-[0.25em] text-olive font-semibold">
            02 / CAPABILITIES
          </p>
          <h2 className="font-serif text-3xl text-charcoal sm:text-4xl md:text-5xl">
            WHAT I DO
          </h2>
        </motion.div>

        {/* 4 Interactive Capability Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHAT_I_DO.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.number}
                variants={reveal}
                className="group flex flex-col justify-between rounded-2xl border border-charcoal/10 bg-cream p-6 shadow-sm transition-all duration-400 hover:-translate-y-1 hover:border-olive/60 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-sans text-xs tracking-[0.2em] text-olive font-bold">
                      {item.number}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/5 text-charcoal transition-colors group-hover:bg-olive group-hover:text-charcoal">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                  </div>

                  <h3 className="font-sans text-base font-bold tracking-wider text-charcoal mb-3">
                    {item.title}
                  </h3>

                  <p className="font-sans text-xs leading-relaxed text-charcoal/60">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-charcoal/10 flex items-center justify-between font-sans text-[11px] tracking-wider text-charcoal/50 group-hover:text-olive">
                  <span>EXPLORE</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* ──────────────── SECTION 4: SKILLS & EXPERTISE ROWS ──────────────── */}
      <motion.section
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="flex flex-col gap-12"
      >
        <motion.div variants={reveal} className="flex flex-col gap-3">
          <p className="font-sans text-xs tracking-[0.25em] text-olive font-semibold">
            03 / EXPERTISE
          </p>
          <h2 className="font-serif text-3xl text-charcoal sm:text-4xl md:text-5xl">
            SKILLS & SPECIALIZATIONS
          </h2>
        </motion.div>

        {/* Interactive Numbered Horizontal Rows */}
        <div className="flex flex-col">
          {SKILLS_EXPERTISE.map((skill) => (
            <motion.div
              key={skill.id}
              variants={reveal}
              className="group flex flex-col gap-4 border-b border-charcoal/10 py-8 transition-colors duration-300 hover:border-olive md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-start md:items-center gap-6">
                <span className="font-sans text-sm tracking-[0.2em] text-olive font-bold">
                  {skill.id}
                </span>

                <div>
                  <h3 className="font-serif text-2xl text-charcoal transition-colors duration-300 group-hover:text-olive md:text-3xl">
                    {skill.title}
                  </h3>
                  <p className="mt-1 font-sans text-xs text-charcoal/50">
                    {skill.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6">
                <div className="flex flex-wrap gap-2">
                  {skill.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-charcoal/20 bg-neutral/10 px-3 py-1 font-sans text-[11px] text-charcoal/70 transition-colors group-hover:border-olive/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-charcoal/20 text-charcoal transition-all duration-300 group-hover:border-olive group-hover:bg-olive group-hover:text-charcoal">
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Full Tech Stack Pills */}
        <motion.div variants={reveal} className="mt-6">
          <p className="font-sans text-xs tracking-[0.25em] text-olive font-semibold mb-4">
            ALL TECHNOLOGIES & TOOLS
          </p>
          <div className="flex flex-wrap gap-3">
            {TECH_STACK_TAGS.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-charcoal/20 bg-cream px-5 py-2.5 font-sans text-sm text-charcoal font-medium shadow-sm transition-all duration-300 hover:border-olive hover:bg-olive hover:text-charcoal hover:shadow-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* ──────────────── SECTION 5: CALL TO ACTION ──────────────── */}
      <motion.section
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-8 rounded-3xl border border-charcoal/10 bg-neutral/30 p-10 md:p-16 shadow-2xl flex flex-col items-start gap-8"
      >
        <motion.div variants={reveal} className="flex flex-col gap-4 max-w-2xl">
          <span className="font-sans text-xs tracking-[0.3em] text-olive font-semibold uppercase">
            04 / NEXT STEPS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight text-charcoal">
            HAVE A PROJECT IN MIND? LET&apos;S WORK TOGETHER.
          </h2>
          <p className="font-sans text-base text-charcoal/70 leading-relaxed">
            Whether you need a new web application, UI implementation, or a developer to join your team, I&apos;d love to connect.
          </p>
        </motion.div>

        <motion.div variants={reveal}>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 rounded-full bg-olive px-8 py-4 font-sans text-sm tracking-[0.2em] font-semibold text-charcoal transition-all duration-300 hover:bg-charcoal hover:text-cream shadow-lg"
          >
            GET IN TOUCH
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              strokeWidth={2}
            />
          </Link>
        </motion.div>
      </motion.section>
    </div>
  );
}
