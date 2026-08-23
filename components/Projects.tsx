"use client";

import { projects } from "@/lib/data/projects";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import SafeImage from "./SafeImage";
import { fadeUp } from "@/lib/motion";

export default function Projects() {
  const prefersReducedMotion = useReducedMotion();

  const variants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }
    : fadeUp;

  const featuredProject = projects[0];
  const secondaryProjects = projects.slice(1);

  return (
    <section
      id="work"
      className="bg-cream px-6 py-24 md:py-32 lg:py-40 lg:px-16"
      aria-labelledby="work-heading"
    >
      <div className="mx-auto max-w-[1600px]">
        {/* Section Header */}
        <motion.div
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <p className="mb-4 font-sans text-[11px] tracking-[0.3em] text-olive uppercase">
              02 — Selected Work
            </p>
            <h2
              id="work-heading"
              className="font-serif text-[clamp(3rem,7vw,5.5rem)] leading-[0.92] text-charcoal"
            >
              Selected Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] text-charcoal/70 transition-colors hover:text-olive"
          >
            View All Projects
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              strokeWidth={1.5}
            />
          </Link>
        </motion.div>

        {/* Editorial Project Layout */}
        <div className="space-y-20 md:space-y-24">
          {/* Featured Project - Large Editorial */}
          {featuredProject && (
            <motion.article
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: prefersReducedMotion ? 0.2 : 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative"
            >
              <Link href={`/projects/${featuredProject.slug}`} className="block">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Project Number & Info */}
                  <div className="lg:col-span-4 order-2 lg:order-1">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="font-sans text-[13px] tracking-[0.2em] text-olive font-semibold">
                        {featuredProject.number}
                      </span>
                      <span className="h-px flex-1 bg-olive/30" />
                    </div>
                    <h3 className="font-serif text-3xl md:text-4xl text-charcoal leading-tight mb-4 group-hover:text-olive transition-colors duration-300">
                      {featuredProject.title}
                    </h3>
                    <p className="font-sans text-sm leading-relaxed text-charcoal/60 mb-6 max-w-sm">
                      {featuredProject.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {featuredProject.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="font-sans text-[11px] tracking-wide text-charcoal/50 uppercase"
                        >
                          {tag}
                          {tag !== featuredProject.tags.slice(0, 4)[featuredProject.tags.slice(0, 4).length - 1] && " • "}
                        </span>
                      ))}
                    </div>
                    <div className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] text-charcoal font-medium transition-all duration-300 group-hover:text-olive">
                      <span>View Project</span>
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  {/* Large Project Image */}
                  <div className="lg:col-span-8 order-1 lg:order-2">
                    <div className="relative aspect-[16/10] overflow-hidden bg-neutral/10">
                      <SafeImage
                        src={featuredProject.image}
                        alt={`${featuredProject.title} preview`}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        sizes="(max-width: 1024px) 100vw, 65vw"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          )}

          {/* Secondary Projects - Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {secondaryProjects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: prefersReducedMotion ? 0.2 : 0.7,
                  delay: prefersReducedMotion ? 0 : index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group"
              >
                <Link href={`/projects/${project.slug}`} className="block">
                  <div className="mb-6">
                    <div className="relative aspect-[4/3] overflow-hidden bg-neutral/10">
                      <SafeImage
                        src={project.image}
                        alt={`${project.title} preview`}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        sizes="(max-width: 768px) 100vw, 45vw"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-sans text-[11px] tracking-[0.2em] text-olive font-semibold">
                      {project.number}
                    </span>
                    <span className="h-px w-8 bg-olive/30" />
                  </div>
                  <h3 className="font-serif text-2xl text-charcoal leading-tight mb-3 group-hover:text-olive transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-charcoal/60 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="inline-flex items-center gap-2 font-sans text-[11px] tracking-[0.2em] text-charcoal/70 font-medium transition-all duration-300 group-hover:text-olive">
                    <span>View</span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.5}
                    />
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
