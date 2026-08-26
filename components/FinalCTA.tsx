"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { fadeUp } from "@/lib/motion";

export default function FinalCTA() {
  const prefersReducedMotion = useReducedMotion();

  const variants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }
    : fadeUp;

  return (
    <section
      className="bg-cream px-6 py-24 md:py-32 lg:py-15 lg:px-30 overflow-hidden border-t border-neutral/30"
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-[1600px]">
        <motion.div
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl"
        >
          <div className="mb-8">
            <p className="mb-4 font-sans text-[11px] tracking-[0.3em] text-olive uppercase">
              05 — Contact
            </p>
          </div>
          
          <h2
            id="cta-heading"
            className="font-serif text-[clamp(3rem,8vw,6rem)] leading-[0.88] text-charcoal mb-8"
          >
            Let's build<br />something great.
          </h2>
          
          <p className="font-sans text-base md:text-lg text-charcoal/80 leading-relaxed mb-8 max-w-2xl">
            Have a project in mind or want to collaborate? I'd love to hear from you and bring your ideas to life.
          </p>
          
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 rounded-full bg-charcoal px-8 py-4 font-sans text-sm tracking-[0.2em] font-semibold text-cream transition-all duration-300 hover:bg-olive hover:text-charcoal shadow-lg"
          >
            GET IN TOUCH
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </Link>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 pt-12 border-t border-charcoal/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
        >
          <div className="space-y-2">
            <span className="font-sans text-xs tracking-[0.2em] text-charcoal/70 uppercase">
              Based in
            </span>
            <p className="font-serif text-lg text-charcoal/80">
              Egypt
            </p>
          </div>
          
          <div className="space-y-2">
            <span className="font-sans text-xs tracking-[0.2em] text-charcoal/70 uppercase">
              Available for
            </span>
            <p className="font-serif text-lg text-charcoal/80">
              Freelance & Full-time
            </p>
          </div>

          <div className="space-y-2">
            <span className="font-sans text-xs tracking-[0.2em] text-charcoal/70 uppercase">
              Response time
            </span>
            <p className="font-serif text-lg text-charcoal/80">
              Within 24 hours
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

