"use client";

import { motion, useReducedMotion } from "framer-motion";
import { skillGroups } from "@/lib/data/skills";
import { fadeUp } from "@/lib/motion";

export default function Skills() {
  const prefersReducedMotion = useReducedMotion();

  const variants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }
    : fadeUp;

  return (
    <section
      id="skills"
      className="border-t border-charcoal/10 bg-cream px-6 py-24 md:py-32 lg:py-40 lg:px-16"
      aria-labelledby="skills-heading"
    >
      <div className="mx-auto max-w-[1600px]">
        <motion.div
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 md:mb-20"
        >
          <p className="mb-4 font-sans text-[11px] tracking-[0.3em] text-olive uppercase">
            04 — Expertise
          </p>
          <h2
            id="skills-heading"
            className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.92] text-charcoal"
          >
            Technologies & Skills
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: prefersReducedMotion ? 0.2 : 0.7,
                delay: prefersReducedMotion ? 0 : groupIndex * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col"
            >
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-px w-10 bg-olive" aria-hidden="true" />
                  <h3 className="font-sans text-xs tracking-[0.2em] text-charcoal font-semibold uppercase">
                    {group.title}
                  </h3>
                </div>
              </div>
              <ul className="space-y-3">
                {group.skills.map((skill) => (
                  <li key={skill}>
                    <span className="font-sans text-sm text-charcoal/70 hover:text-olive transition-colors duration-300">
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: prefersReducedMotion ? 0.2 : 0.7,
            delay: prefersReducedMotion ? 0 : 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-20 pt-12 border-t border-charcoal/10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="font-serif text-3xl md:text-4xl text-olive mb-2">2+</p>
              <p className="font-sans text-xs tracking-[0.15em] text-charcoal/60 uppercase">
                Years Experience
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl md:text-4xl text-olive mb-2">7+</p>
              <p className="font-sans text-xs tracking-[0.15em] text-charcoal/60 uppercase">
                Projects Completed
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl md:text-4xl text-olive mb-2">100%</p>
              <p className="font-sans text-xs tracking-[0.15em] text-charcoal/60 uppercase">
                Client Satisfaction
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl md:text-4xl text-olive mb-2">∞</p>
              <p className="font-sans text-xs tracking-[0.15em] text-charcoal/60 uppercase">
                Learning
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
