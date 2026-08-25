"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "PROJECTS", href: "/projects" },
  { label: "CONTACT", href: "/contact" },
];

interface NavbarProps {
  isVisible?: boolean;
}

export default function Navbar({ isVisible = true }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [floatingMenuOpen, setFloatingMenuOpen] = useState(false);
  const [showFullNavbar, setShowFullNavbar] = useState(true);
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  // Scroll direction detection
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // At top of page: always show full navbar and hide floating button
      if (currentScrollY <= 50) {
        setShowFullNavbar(true);
        setShowFloatingButton(false);
        setFloatingMenuOpen(false);
        lastScrollY = currentScrollY;
        return;
      }

      const diff = currentScrollY - lastScrollY;

      // Threshold to avoid jitter
      if (Math.abs(diff) < 8) return;

      if (diff > 0) {
        // Scrolling DOWN
        setShowFullNavbar(false);
        setShowFloatingButton(true);
        setMobileMenuOpen(false);
      } else {
        // Scrolling UP
        setShowFullNavbar(true);
        setShowFloatingButton(false);
        setFloatingMenuOpen(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close floating menu on route change
  useEffect(() => {
    setFloatingMenuOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    if (href === "/projects") {
      return pathname === "/projects" || pathname.startsWith("/projects/");
    }
    return pathname === href;
  };

  const handleFloatingLinkClick = () => {
    setFloatingMenuOpen(false);
  };

  // Motion variants for floating compact menu container
  const menuContainerVariants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }
    : {
        hidden: {
          opacity: 0,
          scale: 0.88,
          y: -12,
          transition: { duration: 0.15, ease: "easeOut" as const },
        },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: {
            type: "spring" as const,
            stiffness: 380,
            damping: 26,
            staggerChildren: 0.05,
            delayChildren: 0.05,
          },
        },
      };

  const menuItemVariants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }
    : {
        hidden: { opacity: 0, x: 12 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { type: "spring" as const, stiffness: 400, damping: 28 },
        },
      };

  return (
    <>
      {/* 1. Full Standard Header Navbar */}
      <motion.header
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -15 }}
        animate={
          isVisible && showFullNavbar
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: prefersReducedMotion ? 0 : -80 }
        }
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 right-0 left-0 z-40 bg-cream/80 backdrop-blur-sm ${
          isVisible && showFullNavbar ? "" : "pointer-events-none"
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
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </nav>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
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
                        onClick={() => setMobileMenuOpen(false)}
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

      {/* 2. Compact Floating Circular Navigation Button */}
      <AnimatePresence>
        {isVisible && showFloatingButton && !showFullNavbar && (
          <div className="fixed top-6 right-6 md:right-10 lg:right-16 z-50">
            {/* Backdrop overlay when expanded floating menu is open */}
            <AnimatePresence>
              {floatingMenuOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setFloatingMenuOpen(false)}
                  className="fixed inset-0 z-40 bg-charcoal/10 backdrop-blur-[2px]"
                />
              )}
            </AnimatePresence>

            {/* Circular FAB Toggle Button */}
            <motion.button
              type="button"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0.15 }
                  : { type: "spring" as const, stiffness: 450, damping: 25 }
              }
              onClick={() => setFloatingMenuOpen((prev) => !prev)}
              aria-expanded={floatingMenuOpen}
              aria-label={floatingMenuOpen ? "Close navigation" : "Open navigation"}
              className="relative z-50 flex h-12 w-12 md:h-13 md:w-13 items-center justify-center rounded-full bg-charcoal text-cream shadow-2xl border border-charcoal/20 transition-colors duration-300 hover:bg-olive hover:text-charcoal focus:outline-none"
            >
              <motion.div
                key={floatingMenuOpen ? "open" : "closed"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {floatingMenuOpen ? (
                  <X className="h-5 w-5 stroke-[2]" />
                ) : (
                  <Menu className="h-5 w-5 stroke-[2]" />
                )}
              </motion.div>
            </motion.button>

            {/* Expanded Compact Navigation Dropdown Card */}
            <AnimatePresence>
              {floatingMenuOpen && (
                <motion.div
                  variants={menuContainerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="absolute top-15 right-0 z-50 w-56 overflow-hidden rounded-2xl border border-charcoal/15 bg-cream/95 p-3.5 shadow-2xl backdrop-blur-xl origin-top-right"
                >
                  <div className="mb-2 px-3 pt-1 pb-2 border-b border-charcoal/10 flex items-center justify-between">
                    <span className="font-serif text-sm font-semibold tracking-tight text-charcoal">
                      HA.
                    </span>
                    <span className="font-sans text-[9px] tracking-[0.25em] text-olive uppercase font-semibold">
                      Navigation
                    </span>
                  </div>

                  <ul className="flex flex-col gap-1">
                    {NAV_LINKS.map((link) => {
                      const active = isLinkActive(link.href);
                      return (
                        <motion.li key={link.href} variants={menuItemVariants}>
                          <Link
                            href={link.href}
                            onClick={handleFloatingLinkClick}
                            className={`group flex items-center justify-between rounded-xl px-3.5 py-2.5 font-sans text-xs tracking-[0.2em] font-medium transition-all duration-200 ${
                              active
                                ? "bg-olive/15 text-olive font-semibold"
                                : "text-charcoal/80 hover:bg-charcoal/5 hover:text-olive"
                            }`}
                          >
                            <span>{link.label}</span>
                            {active ? (
                              <span className="h-1.5 w-1.5 rounded-full bg-olive" />
                            ) : (
                              <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 text-olive" />
                            )}
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
