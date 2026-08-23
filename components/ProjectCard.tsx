"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/lib/data/projects";
import SafeImage from "./SafeImage";

interface ProjectCardProps {
  project: Project;
  index: number;
  variant?: "featured" | "standard";
}

export default function ProjectCard({
  project,
  index,
  variant = "standard",
}: ProjectCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const isFeatured = variant === "featured";

  return (
    <motion.article
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: prefersReducedMotion ? 0.2 : 0.75,
        delay: prefersReducedMotion ? 0 : index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral/40 bg-white/40 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] transition-all duration-500 hover:border-olive/60 hover:shadow-[0_12px_40px_rgba(163,177,138,0.15)] md:p-8 ${
        isFeatured ? "lg:col-span-2 lg:p-10" : ""
      }`}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10"
        aria-label={`View details for ${project.title}`}
      >
        {/* Left / Info Content */}
        <div className={`flex flex-col justify-between ${isFeatured ? "lg:w-5/12" : "w-full"}`}>
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="font-sans text-xs tracking-[0.25em] text-olive font-semibold">
                {project.number}
              </span>
              <span className="h-px w-8 bg-olive/40" />
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-charcoal/50">
                FEATURED WORK
              </span>
            </div>

            <h3 className="font-serif text-2xl text-charcoal transition-colors duration-300 group-hover:text-olive sm:text-3xl md:text-4xl">
              {project.title}
            </h3>

            <p className="mt-4 font-sans text-sm leading-relaxed text-charcoal/75 md:text-base">
              {project.description}
            </p>
          </div>

          <div className="mt-8">
            <ul
              className="flex flex-wrap gap-2 mb-6"
              aria-label={`Technologies used in ${project.title}`}
            >
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-neutral/60 bg-cream/50 px-3 py-1 font-sans text-[11px] tracking-wide text-charcoal/80 transition-colors duration-300 group-hover:border-olive/40"
                >
                  {tag}
                </li>
              ))}
            </ul>

            <div className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] text-charcoal font-medium transition-all duration-300 group-hover:text-olive">
              <span>VIEW PROJECT</span>
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>

        {/* Right / Image Container */}
        <div
          className={`relative w-full overflow-hidden rounded-xl bg-neutral/20 p-6 md:p-8 flex items-center justify-center ${
            isFeatured ? "aspect-[16/10] lg:w-7/12" : "aspect-[4/3] w-full"
          }`}
        >
          <div className="relative w-full h-full">
            <SafeImage
              src={project.image}
              alt={`${project.title} preview`}
              fill
              className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04] group-hover:-translate-y-1 drop-shadow-xl"
              sizes={isFeatured ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 768px) 100vw, 50vw"}
              priority={isFeatured}
            />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
