"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "PROJECTS", href: "/projects" },
  { label: "CONTACT", href: "/contact" },
];

interface NavbarProps {
  isVisible: boolean;
}

export default function Navbar({ isVisible }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  const handleLinkClick = () => setMenuOpen(false);

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    if (href === "/projects") {
      return pathname === "/projects" || pathname.startsWith("/projects/");
    }
    return pathname === href;
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -15 }}
      animate={
        isVisible
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: prefersReducedMotion ? 0 : -15 }
      }
      transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 right-0 left-0 z-40 bg-cream/80 backdrop-blur-sm ${
        isVisible ? "" : "pointer-events-none"
      }`}
    >
      <nav
        className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10 lg:px-16"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="font-serif text-2xl font-medium tracking-tight text-charcoal transition-opacity hover:opacity-70"
        >
          HA.
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden items-center gap-10 lg:gap-12 md:flex">
          {NAV_LINKS.map((link) => {
            const active = isLinkActive(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`group relative font-sans text-[11px] tracking-[0.25em] transition-colors duration-300 ${
                    active
                      ? "text-olive font-semibold"
                      : "text-charcoal/70 hover:text-olive"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-2 left-0 h-px bg-olive transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center text-charcoal md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.15 : 0.35 }}
            className="overflow-hidden border-t border-charcoal/10 bg-cream/95 backdrop-blur-sm md:hidden"
          >
            <ul className="flex flex-col gap-0 px-6 py-6">
              {NAV_LINKS.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={handleLinkClick}
                      className={`block py-4 font-sans text-sm tracking-[0.2em] transition-colors border-b border-charcoal/5 last:border-0 ${
                        active
                          ? "text-olive font-semibold"
                          : "text-charcoal/80 hover:text-olive"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
