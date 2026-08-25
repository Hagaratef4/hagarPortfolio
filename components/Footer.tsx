import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Phone } from "lucide-react";

const FOOTER_NAV = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "PROJECTS", href: "/projects" },
  { label: "CONTACT", href: "/contact" },
];

// Social media links - TODO: Replace with actual URLs if needed
const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/hagara.tef?igsi=MXZjcTUwdTZqdnY5bA%3D%3D&utm_source=qrL",
    iconOnly: true,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/195hDsDihZ/?mibextid=wwXIfr",
    iconOnly: true,
  },
  // {
  //   label: "X",
  //   href: "YOUR_X_URL",
  //   iconOnly: true,
  // },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/hagar-atef-37420626a",
    iconOnly: false,
  },
  {
    label: "GitHub",
    href: "https://github.com/Hagaratef4",
    iconOnly: false,
  },
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
                SOCIAL
              </p>
              <div className="flex flex-wrap gap-4">
                {SOCIAL_LINKS.map((link) => {
                  const getIcon = () => {
                    if (link.label === "Instagram") {
                      return (
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" strokeWidth="0">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      );
                    }
                    if (link.label === "Facebook") {
                      return (
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" strokeWidth="0">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      );
                    }
                    if (link.label === "X") {
                      return (
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" strokeWidth="0">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      );
                    }
                    return null;
                  };
                  
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${link.label}`}
                      className="group inline-flex items-center gap-2 font-sans text-sm text-cream/70 transition-colors hover:text-olive"
                    >
                      {getIcon()}
                      {!link.iconOnly && <span>{link.label}</span>}
                      {!link.iconOnly && (
                        <ArrowUpRight
                          className="h-3.5 w-3.5 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          strokeWidth={1.5}
                        />
                      )}
                    </a>
                  );
                })}
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
