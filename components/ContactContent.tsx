"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/* ─── Animation Variants ───────────────────────────────────────────── */

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.3 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease },
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

/* ─── Decorative SVG ───────────────────────────────────────────────── */

function DecoGraphic() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Abstract organic shape */}
      <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
      <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
      <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="0.5" opacity="0.08" />
      {/* Diagonal line */}
      <line x1="30" y1="170" x2="170" y2="30" stroke="currentColor" strokeWidth="0.5" opacity="0.12" />
      {/* Small dot accents */}
      <circle cx="100" cy="100" r="3" fill="currentColor" opacity="0.2" />
      <circle cx="140" cy="60" r="2" fill="currentColor" opacity="0.15" />
      <circle cx="60" cy="140" r="2" fill="currentColor" opacity="0.15" />
      {/* Curved path */}
      <path
        d="M 40 100 Q 100 40 160 100 Q 100 160 40 100"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.1"
        fill="none"
      />
      {/* Small cross mark */}
      <line x1="145" y1="145" x2="155" y2="155" stroke="currentColor" strokeWidth="0.7" opacity="0.18" />
      <line x1="155" y1="145" x2="145" y2="155" stroke="currentColor" strokeWidth="0.7" opacity="0.18" />
    </svg>
  );
}

/* ─── Data ─────────────────────────────────────────────────────────── */

const CONTACT_INFO = [
  { label: "EMAIL", value: "hagaratef153@gmail.com", href: "hagaratef153@gmail.com" },
  { label: "WHATSAPP", value: "+20 105 549 2879", href: "https://wa.me/201055492879", external: true },
  { label: "LINKEDIN", value: "https://www.linkedin.com/in/hagar-atef-37420626a", href: "https://www.linkedin.com/in/hagar-atef-37420626a", external: true },
  { label: "GITHUB", value: "https://github.com/Hagaratef4", href: "https://github.com/Hagaratef4", external: true },
  { label: "PHONE", value: "+20 105 549 2879", href: "tel:+201055492879" },
  { label: "LOCATION", value: "Giza, 6th of october" },
];

const PROJECT_TYPES = [
  "Select project type",
  "Website Development",
  "Web Application",
  "Landing Page",
  "Portfolio / Personal",
  "E-Commerce",
  "Other",
];

/* ─── Form Types ───────────────────────────────────────────────────── */

interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

/* ─── Component ────────────────────────────────────────────────────── */

export default function ContactContent() {
  const prefersReducedMotion = useReducedMotion();

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    projectType: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const reveal = prefersReducedMotion ? reducedFade : fadeUp;
  const fade = prefersReducedMotion ? reducedFade : fadeIn;
  const container = prefersReducedMotion
    ? { hidden: {}, visible: { transition: { staggerChildren: 0 } } }
    : stagger;
  const line = prefersReducedMotion ? reducedFade : lineReveal;

  /* validation */
  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!formData.name.trim()) errs.name = "Name is required.";
    if (!formData.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email.";
    }
    if (!formData.subject.trim()) errs.subject = "Subject is required.";
    if (!formData.message.trim()) errs.message = "Message is required.";
    return errs;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", projectType: "", subject: "", message: "" });
    } catch (error) {
      setIsSubmitting(false);
      setSubmitError(error instanceof Error ? error.message : "Failed to send message. Please try again.");
    }
  };

  /* shared input class */
  const inputBase =
    "w-full border-b border-charcoal/20 bg-transparent py-3 font-sans text-[15px] text-charcoal outline-none transition-colors duration-300 placeholder:text-charcoal/40 focus:border-olive";

  return (
    <section className="relative overflow-hidden">
      {/* ── Oversized background number ── */}
      <motion.span
        variants={fade}
        initial="hidden"
        animate="visible"
        className="pointer-events-none absolute -left-4 top-0 select-none font-serif text-[clamp(14rem,28vw,22rem)] leading-none text-charcoal/[0.04] lg:-left-8"
        aria-hidden="true"
      >
        04
      </motion.span>

      {/* ── TWO-COLUMN GRID ── */}
      <div className="relative grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-12 xl:gap-20">
        {/* ════════════════ LEFT COLUMN ════════════════ */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col justify-between"
        >
          {/* label */}
          <div>
            <motion.div
              variants={reveal}
              className="mb-8 flex items-center gap-4"
            >
              <span className="font-sans text-[11px] tracking-[0.3em] text-olive">
                04
              </span>
              <motion.span
                variants={line}
                className="block h-px w-10 bg-olive/50"
                aria-hidden="true"
              />
              <span className="font-sans text-[11px] tracking-[0.3em] text-olive">
                CONTACT
              </span>
            </motion.div>

            {/* headline */}
            <motion.h1
              variants={reveal}
              className="font-serif text-[clamp(2.8rem,6.5vw,5.5rem)] leading-[0.92] tracking-tight text-charcoal"
            >
              LET&apos;S
            </motion.h1>
            <motion.h1
              variants={reveal}
              className="font-serif text-[clamp(2.8rem,6.5vw,5.5rem)] leading-[0.92] tracking-tight text-charcoal"
            >
              CONNECT
            </motion.h1>

            {/* supporting paragraph */}
            <motion.p
              variants={reveal}
              className="mt-6 max-w-md font-sans text-base leading-relaxed text-charcoal/70 md:text-[17px]"
            >
              Have a project in mind or want to collaborate?
              I&apos;d love to hear from you and bring your ideas to life.
            </motion.p>

            {/* decorative graphic */}
            <motion.div
              variants={fade}
              className="w-32 text-olive/80 md:w-40 lg:w-44"
            >
              <DecoGraphic />
            </motion.div>
          </div>

          {/* ── GET IN TOUCH section ── */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className=""
          >
            <motion.div
              variants={reveal}
              className="mb-8 flex items-center gap-4"
            >
              <span className="block h-px w-8 bg-olive/50" aria-hidden="true" />
              <span className="font-sans text-[11px] tracking-[0.3em] text-olive">
                GET IN TOUCH
              </span>
            </motion.div>

            {/* contact info items */}
            <div className="flex flex-col gap-6">
              {CONTACT_INFO.map((item) => (
                <motion.div
                  key={item.label}
                  variants={reveal}
                  className="group"
                >
                  <span className="mb-1 block font-sans text-[10px] tracking-[0.3em] text-charcoal/60">
                    {item.label}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      aria-label={item.external ? `Visit ${item.value}` : undefined}
                      className="inline-flex items-center gap-2 font-sans text-base text-charcoal/80 transition-colors duration-300 hover:text-olive md:text-lg"
                    >
                      {item.value}
                      <ArrowUpRight
                        className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={1.5}
                      />
                    </a>
                  ) : (
                    <span className="font-sans text-base text-charcoal/80 md:text-lg">
                      {item.value}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* divider */}
            <motion.hr
              variants={line}
              className="my-8 h-px w-full bg-charcoal/10"
              aria-hidden="true"
            />
          </motion.div>
        </motion.div>

        {/* ════════════════ RIGHT COLUMN — FORM CARD ════════════════ */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex items-start"
        >
          <motion.div
            variants={reveal}
            className="w-full rounded-2xl border border-charcoal/10 bg-cream p-8 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.15)] backdrop-blur-sm sm:p-10 md:p-12"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease }}
                className="flex min-h-[400px] flex-col items-center justify-center gap-4 text-center"
              >
                <span className="mb-2 text-5xl" aria-hidden="true">✓</span>
                <p className="font-serif text-2xl text-charcoal md:text-3xl">
                  Thank you!
                </p>
                <p className="max-w-sm font-sans text-base text-charcoal/60">
                  Your message has been sent successfully. I&apos;ll get back to you soon.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setSubmitError(null);
                  }}
                  className="group mt-6 inline-flex items-center gap-2 font-sans text-sm tracking-[0.15em] text-charcoal transition-colors hover:text-olive"
                >
                  SEND ANOTHER
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.5}
                  />
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-7"
              >
                {/* form header */}
                <motion.div variants={reveal}>
                  <p className="font-serif text-2xl text-charcoal md:text-3xl">
                  Send a message
                </p>
                <p className="mt-1 font-sans text-sm text-charcoal/60">
                  Fill out the form below and I&apos;ll respond within 24 hours.
                </p>
                </motion.div>

                {/* Name */}
                <motion.div variants={reveal} className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-name"
                    className="font-sans text-[11px] tracking-[0.2em] text-charcoal/50"
                  >
                    NAME *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputBase}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="font-sans text-xs text-red-500/80">{errors.name}</p>
                  )}
                </motion.div>

                {/* Email */}
                <motion.div variants={reveal} className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-email"
                    className="font-sans text-[11px] tracking-[0.2em] text-charcoal/50"
                  >
                    EMAIL *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputBase}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="font-sans text-xs text-red-500/80">{errors.email}</p>
                  )}
                </motion.div>

                {/* Project Type */}
                <motion.div variants={reveal} className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-project-type"
                    className="font-sans text-[11px] tracking-[0.2em] text-charcoal/50"
                  >
                    PROJECT TYPE
                  </label>
                  <select
                    id="contact-project-type"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className={`${inputBase} cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23121212%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_0_center] bg-no-repeat pr-6`}
                  >
                    {PROJECT_TYPES.map((type) => (
                      <option key={type} value={type === PROJECT_TYPES[0] ? "" : type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </motion.div>

                {/* Subject */}
                <motion.div variants={reveal} className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-subject"
                    className="font-sans text-[11px] tracking-[0.2em] text-charcoal/50"
                  >
                    SUBJECT *
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className={inputBase}
                    placeholder="Project inquiry"
                  />
                  {errors.subject && (
                    <p className="font-sans text-xs text-red-500/80">{errors.subject}</p>
                  )}
                </motion.div>

                {/* Message */}
                <motion.div variants={reveal} className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-message"
                    className="font-sans text-[11px] tracking-[0.2em] text-charcoal/50"
                  >
                    MESSAGE *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputBase} resize-none`}
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && (
                    <p className="font-sans text-xs text-red-500/80">{errors.message}</p>
                  )}
                </motion.div>

                {/* Submit */}
                <motion.div variants={reveal} className="pt-2">
                  {submitError && (
                    <p className="mb-4 font-sans text-xs text-red-500/80">{submitError}</p>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex w-full items-center justify-center gap-3 bg-charcoal px-8 py-4 font-sans text-sm tracking-[0.2em] text-cream transition-all duration-400 hover:bg-olive hover:text-charcoal disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                  >
                    {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.5}
                    />
                  </button>
                </motion.div>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* ── Decorative thin lines at bottom ── */}
      {/* <motion.div
        variants={line}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-20 h-px w-full bg-neutral/40 lg:mt-28"
        aria-hidden="true"
      /> */}
    </section>
  );
}
