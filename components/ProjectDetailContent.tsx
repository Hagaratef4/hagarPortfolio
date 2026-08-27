"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/lib/data/projects";
import SafeImage from "./SafeImage";
import HeroVideo from "./HeroVideo";
import OtherProjectsNav from "./OtherProjectsNav";

interface ProjectDetailContentProps {
  project: Project;
  otherProjects: Project[];
  prevProject: Project;
  nextProject: Project;
}

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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

const reducedFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
};

export default function ProjectDetailContent({
  project,
  otherProjects,
  prevProject,
  nextProject,
}: ProjectDetailContentProps) {
  const prefersReducedMotion = useReducedMotion();

  const reveal = prefersReducedMotion ? reducedFade : fadeUp;
  const fade = prefersReducedMotion ? reducedFade : fadeIn;
  const container = prefersReducedMotion
    ? { hidden: {}, visible: { transition: { staggerChildren: 0 } } }
    : stagger;

  return (
    <motion.article
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-16 py-6"
    >
      {/* Back Link */}
      <motion.div variants={reveal}>
        <Link
          href="/#work"
          className="group inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] text-charcoal/70 transition-colors hover:text-olive"
        >
          <ArrowLeft
            className="h-4 w-4 transition-transform group-hover:-translate-x-1"
            strokeWidth={1.5}
          />
          <span>BACK TO HOME</span>
        </Link>
      </motion.div>

      {/* Header Section */}
      <header className="flex flex-col gap-8">
        <motion.div variants={reveal} className="flex items-center gap-4">
          <span className="font-sans text-xs tracking-[0.3em] text-olive font-semibold">
            {project.number} / PROJECT
          </span>
          <span className="h-px w-12 bg-olive/50" aria-hidden="true" />
          <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-charcoal/50">
            CASE STUDY
          </span>
        </motion.div>

        <motion.h1
          variants={reveal}
          className="font-serif text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] tracking-tight text-charcoal"
        >
          {project.title}
        </motion.h1>

        <motion.p
          variants={reveal}
          className="max-w-2xl font-sans text-lg leading-relaxed text-charcoal/80 md:text-xl"
        >
          {project.description}
        </motion.p>

        {/* Metadata Grid */}
        <motion.div
          variants={reveal}
          className="mt-4 grid grid-cols-1 gap-6 border-y border-charcoal/10 py-8 sm:grid-cols-3 lg:grid-cols-4"
        >
          <div>
            <span className="block font-sans text-[10px] tracking-[0.25em] text-charcoal/60 uppercase">
              ROLE & FOCUS
            </span>
            <span className="mt-1 block font-sans text-sm font-medium text-charcoal">
              {project.role}
            </span>
          </div>

          <div>
            <span className="block font-sans text-[10px] tracking-[0.25em] text-charcoal/60 uppercase">
              TECHNOLOGIES
            </span>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-charcoal/20 bg-neutral/10 px-2.5 py-0.5 font-sans text-[11px] text-charcoal/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="block font-sans text-[10px] tracking-[0.25em] text-charcoal/60 uppercase">
              DELIVERABLE
            </span>
            <span className="mt-1 block font-sans text-sm font-medium text-charcoal">
              Responsive Web Application
            </span>
          </div>

          <div className="hidden lg:block">
            <span className="block font-sans text-[10px] tracking-[0.25em] text-charcoal/60 uppercase">
              YEAR
            </span>
            <span className="mt-1 block font-sans text-sm font-medium text-charcoal">
              {project.year}
            </span>
          </div>
        </motion.div>
      </header>

      {/* Hero Video Section */}
      <motion.section variants={reveal} aria-label="Project Video Presentation">
        <HeroVideo
          videoUrl={project.video}
          posterImage={project.image}
          title={project.title}
        />
      </motion.section>

      {/* Overview Section */}
      <motion.section
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16 pt-8"
      >
        <motion.div variants={reveal} className="lg:col-span-4">
          <p className="font-sans text-xs tracking-[0.25em] text-olive mb-3">
            01 / OVERVIEW
          </p>
          <h2 className="font-serif text-3xl text-charcoal md:text-4xl">
            PROJECT INSIGHTS & GOALS
          </h2>
        </motion.div>

        <motion.div variants={reveal} className="lg:col-span-8 flex flex-col gap-6">
          <p className="font-sans text-base leading-relaxed text-charcoal/80 md:text-lg">
            {project.overview}
          </p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-charcoal/10 bg-cream p-5">
              <div className="flex items-center gap-2 mb-2 text-olive">
                <CheckCircle2 className="h-4 w-4" />
                <span className="font-sans text-xs font-semibold tracking-wider text-charcoal">
                  Key Objective
                </span>
              </div>
              <p className="font-sans text-xs text-charcoal/60 leading-relaxed">
                Deliver intuitive navigation, precise visual data displays, and fast response times across desktop and mobile devices.
              </p>
            </div>

            <div className="rounded-xl border border-charcoal/10 bg-cream p-5">
              <div className="flex items-center gap-2 mb-2 text-olive">
                <CheckCircle2 className="h-4 w-4" />
                <span className="font-sans text-xs font-semibold tracking-wider text-charcoal">
                  Technical Highlight
                </span>
              </div>
              <p className="font-sans text-xs text-charcoal/60 leading-relaxed">
                Architected with modern React components, structured TypeScript data interfaces, and Tailwind design utility tokens.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Editorial Image Gallery */}
      <motion.section
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="flex flex-col gap-10 pt-8"
        aria-label="Project Visual Gallery"
      >
        <motion.div variants={reveal}>
          <p className="font-sans text-xs tracking-[0.25em] text-olive mb-3">
            02 / GALLERY
          </p>
          <h2 className="font-serif text-3xl text-charcoal md:text-4xl">
            VISUAL SHOWCASE
          </h2>
        </motion.div>

        <div className="flex flex-col gap-8 md:gap-12">
          {/* Main Full-Width Gallery Hero (Image 0) */}
          {project.gallery[0] && (
            <motion.div
              variants={fade}
              className="group relative w-full overflow-hidden rounded-2xl border border-charcoal/10 bg-neutral/20 p-6 md:p-12 shadow-lg"
            >
              <div className="relative aspect-[16/10] w-full">
                <SafeImage
                  src={project.gallery[0]}
                  alt={`${project.title} gallery feature`}
                  fill
                  className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  sizes="(max-width: 1400px) 100vw, 1400px"
                />
              </div>
              <span className="absolute bottom-4 right-4 rounded-full bg-cream/80 px-3 py-1 font-sans text-[10px] tracking-widest text-charcoal backdrop-blur-sm">
                01 / MAIN DISPLAY
              </span>
            </motion.div>
          )}

          {/* Asymmetric 2-Column Row (Images 1 & 2) */}
          {project.gallery.length > 1 && (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {project.gallery.slice(1, 3).map((img, idx) => (
                <motion.div
                  key={img}
                  variants={fade}
                  className="group relative overflow-hidden rounded-2xl border border-charcoal/10 bg-neutral/20 p-6 md:p-8 shadow-md"
                >
                  <div className="relative aspect-[4/3] w-full">
                    <SafeImage
                      src={img}
                      alt={`${project.title} screenshot ${idx + 2}`}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <span className="absolute bottom-4 right-4 rounded-full bg-neutral/30 px-3 py-1 font-sans text-[10px] tracking-widest text-charcoal backdrop-blur-sm">
                    0{idx + 2} / INTERFACE DETAIL
                  </span>
                </motion.div>
              ))}
            </div>
          )}

          {/* Additional Gallery Items (Images 3+) */}
          {project.gallery.length > 3 && (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {project.gallery.slice(3).map((img, idx) => (
                <motion.div
                  key={img}
                  variants={fade}
                  className="group relative overflow-hidden rounded-2xl border border-charcoal/10 bg-neutral/20 p-4 md:p-6 shadow-md"
                >
                  <div className="relative aspect-[3/4] w-full">
                    <SafeImage
                      src={img}
                      alt={`${project.title} additional screenshot ${idx + 4}`}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <span className="absolute bottom-3 right-3 rounded-full bg-neutral/30 px-2.5 py-0.5 font-sans text-[10px] tracking-widest text-charcoal backdrop-blur-sm">
                    0{idx + 4} / MOBILE VIEW
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.section>

      {/* Bottom Other Projects Navigation */}
      <OtherProjectsNav
        currentProject={project}
        otherProjects={otherProjects}
        prevProject={prevProject}
        nextProject={nextProject}
      />
    </motion.article>
  );
}
