import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Phone } from "lucide-react";

const FOOTER_NAV = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "PROJECTS", href: "/projects" },
  { label: "CONTACT", href: "/contact" },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-charcoal text-cream px-6 py-16 md:px-10 lg:px-16 border-t border-neutral/30"
      aria-label="Footer"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8 lg:gap-12">
          {/* Column 1: Brand / Headline (5 cols) */}
          <div className="md:col-span-5 flex flex-col justify-between gap-6">
            <div>
              <p className="font-serif text-3xl text-cream md:text-4xl">
                HAGAR ATEF
              </p>
              <p className="mt-3 max-w-sm font-sans text-sm leading-relaxed text-cream/70">
                Frontend Developer building modern, responsive, and user-focused web experiences.
              </p>
            </div>
            <p className="hidden font-sans text-xs tracking-wide text-cream/40 md:block">
              &copy; {new Date().getFullYear()} Hagar Atef. All rights reserved.
            </p>
          </div>

          {/* Column 2: Quick Links (3 cols) */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <p className="font-sans text-[11px] tracking-[0.25em] text-olive font-semibold">
              NAVIGATION
            </p>
            <ul className="flex flex-col gap-3">
              {FOOTER_NAV.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-sans text-xs tracking-[0.2em] text-cream/80 transition-colors hover:text-olive"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info & Socials (4 cols) */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div>
              <p className="font-sans text-[11px] tracking-[0.25em] text-olive font-semibold mb-4">
                CONTACT
              </p>
              <ul className="flex flex-col gap-3">
                <li>
                  <a
                    href="mailto:hagaratef153@gmail.com"
                    className="group inline-flex items-center gap-2 font-sans text-sm text-cream/80 transition-colors hover:text-olive"
                  >
                    <Mail className="h-4 w-4 text-olive" strokeWidth={1.5} />
                    <span>hagaratef153@gmail.com</span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.5}
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+201055492879"
                    className="group inline-flex items-center gap-2 font-sans text-sm text-cream/80 transition-colors hover:text-olive"
                  >
                    <Phone className="h-4 w-4 text-olive" strokeWidth={1.5} />
                    <span>+20 1055492879</span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.5}
                    />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-sans text-[11px] tracking-[0.25em] text-olive font-semibold mb-3">
                CONTACT
              </p>
              <div className="space-y-3">
                <a
                  href="mailto:hagaratef153@gmail.com"
                  className="group inline-flex items-center gap-2 font-sans text-sm text-cream/70 transition-colors hover:text-olive"
                >
                  <Mail className="h-4 w-4" strokeWidth={1.5} />
                  hagaratef153@gmail.com
                </a>
                <a
                  href="tel:+201055492879"
                  className="group inline-flex items-center gap-2 font-sans text-sm text-cream/70 transition-colors hover:text-olive"
                >
                  <Phone className="h-4 w-4" strokeWidth={1.5} />
                  +20 105 549 2879
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright for mobile */}
        <div className="mt-12 border-t border-cream/10 pt-6 md:hidden">
          <p className="font-sans text-xs tracking-wide text-cream/40">
            &copy; {new Date().getFullYear()} Hagar Atef. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
