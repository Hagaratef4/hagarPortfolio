"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/data/projects";
import SafeImage from "./SafeImage";
import { motion, useReducedMotion } from "framer-motion";

interface OtherProjectsNavProps {
  currentProject: Project;
  otherProjects: Project[];
  prevProject: Project;
  nextProject: Project;
}

export default function OtherProjectsNav({
  currentProject,
  otherProjects,
  prevProject,
  nextProject,
}: OtherProjectsNavProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="mt-24 border-t border-neutral/60 pt-16 md:mt-32 md:pt-24">
      {/* Previous / Next Quick Bar */}
      <div className="mb-16 flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-neutral/40 pb-12">
        <Link
          href={`/projects/${prevProject.slug}`}
          className="group inline-flex items-center gap-3 font-sans text-xs tracking-[0.2em] text-charcoal transition-colors hover:text-olive"
        >
          <ArrowLeft
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
            strokeWidth={1.5}
          />
          <div className="flex flex-col items-start">
            <span className="text-[10px] text-charcoal/50 uppercase">PREVIOUS</span>
            <span className="font-serif text-base text-charcoal group-hover:text-olive">{prevProject.title}</span>
          </div>
        </Link>

        <span className="hidden sm:block h-8 w-px bg-neutral/40" />

        <Link
          href={`/projects/${nextProject.slug}`}
          className="group inline-flex items-center gap-3 font-sans text-xs tracking-[0.2em] text-charcoal transition-colors hover:text-olive text-right"
        >
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-charcoal/50 uppercase">NEXT</span>
            <span className="font-serif text-base text-charcoal group-hover:text-olive">{nextProject.title}</span>
          </div>
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            strokeWidth={1.5}
          />
        </Link>
      </div>

      {/* OTHER PROJECTS Section Header */}
      <div className="mb-12 flex items-center justify-between">
        <div>
          <p className="font-sans text-xs tracking-[0.25em] text-olive mb-2">
            EXPLORE MORE
          </p>
          <h2 className="font-serif text-3xl text-charcoal md:text-4xl">
            OTHER PROJECTS
          </h2>
        </div>
      </div>

      {/* Grid of Other Projects */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {otherProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, delay: index * 0.1 }}
          >
            <Link
              href={`/projects/${project.slug}`}
              className="group flex flex-col justify-between h-full rounded-2xl border border-neutral/40 bg-white/50 p-6 md:p-8 transition-all duration-400 hover:border-olive hover:shadow-xl"
            >
              <div>
                <div className="relative mb-6 aspect-[16/10] w-full overflow-hidden rounded-xl bg-neutral/20 p-4">
                  <SafeImage
                    src={project.image}
                    alt={`${project.title} thumbnail`}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                <div className="flex items-center gap-3 mb-2">
                  <span className="font-sans text-xs tracking-[0.2em] text-olive font-semibold">
                    {project.number}
                  </span>
                  <span className="h-px w-6 bg-olive/40" />
                  <span className="font-sans text-[10px] tracking-[0.15em] text-charcoal/50 uppercase">
                    CASE STUDY
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-charcoal transition-colors group-hover:text-olive">
                  {project.title}
                </h3>

                <p className="mt-2 font-sans text-sm text-charcoal/70 line-clamp-2">
                  {project.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-neutral/40 pt-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-neutral/50 bg-cream/40 px-2.5 py-0.5 font-sans text-[10px] text-charcoal/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="inline-flex items-center gap-1 font-sans text-xs tracking-[0.15em] text-charcoal transition-colors group-hover:text-olive">
                  <span>VIEW</span>
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
