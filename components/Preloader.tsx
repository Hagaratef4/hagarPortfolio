"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SafeImage from "./SafeImage";

const PRELOADER_IMAGES = [
  {
    src: "/images/colon canser tablet 1.jpg",
    alt: "AI Colon Cancer Detection",
    rotate: -9,
    x: -42,
    y: -18,
    scale: 0.88,
  },
  {
    src: "/images/colon canser mobile 1.jpg",
    alt: "Fresh Cart",
    rotate: 7.5,
    x: 38,
    y: -8,
    scale: 0.93,
  },
  {
    src: "/images/yummy labtop 3.jpg",
    alt: "Yummy Menu",
    rotate: -4,
    x: -16,
    y: 12,
    scale: 0.98,
  },
  {
    src: "/images/fresh cart tablet 2.png",
    alt: "Fresh Cart Mobile",
    rotate: 3,
    x: 14,
    y: 22,
    scale: 1.04,
  },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;
const IMAGE_GAP_MS = 480;
const TOTAL_ACTIVE_MS = 2400; // Total duration of preloader before exit
const EXIT_DURATION_S = 0.8;
const ENTER_DURATION_S = 0.7;

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const finishedRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Image reveal timers & exit trigger
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    for (let i = 1; i <= 4; i += 1) {
      timers.push(
        setTimeout(() => {
          setVisibleCount(i);
        }, (i - 1) * IMAGE_GAP_MS)
      );
    }

    timers.push(
      setTimeout(() => {
        setExiting(true);
      }, TOTAL_ACTIVE_MS)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  // Smooth percentage counter & progress bar tick
  useEffect(() => {
    const start = performance.now();
    let frameId: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const currentPct = Math.min(100, Math.floor((elapsed / TOTAL_ACTIVE_MS) * 100));
      setProgress(currentPct);

      if (elapsed < TOTAL_ACTIVE_MS) {
        frameId = requestAnimationFrame(tick);
      } else {
        setProgress(100);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    if (!exiting) return;
    const exitMs = prefersReducedMotion ? 250 : EXIT_DURATION_S * 1000;
    const fallback = setTimeout(finish, exitMs + 80);
    return () => clearTimeout(fallback);
  }, [exiting, finish, prefersReducedMotion]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-between bg-black px-6 py-12 md:py-16 select-none overflow-hidden"
      initial={{ opacity: 1, filter: "blur(0px)" }}
      animate={
        exiting
          ? {
              opacity: 0,
              filter: prefersReducedMotion ? "blur(0px)" : "blur(12px)",
            }
          : { opacity: 1, filter: "blur(0px)" }
      }
      transition={{
        duration: exiting ? (prefersReducedMotion ? 0.25 : EXIT_DURATION_S) : 0,
        ease: EASE,
      }}
      onAnimationComplete={() => {
        if (exiting) finish();
      }}
      role="status"
      aria-live="polite"
      aria-label={`Loading portfolio ${progress} percent`}
    >
      {/* Spacer top */}
      <div className="w-full h-4 sm:h-8" />

      {/* Center/Upper Area: Stacked Physical Photograph Cards */}
      <div className="relative flex flex-col items-center justify-center my-auto">
        <div className="relative flex h-[240px] w-[310px] sm:h-[320px] sm:w-[440px] md:h-[380px] md:w-[560px] lg:h-[420px] lg:w-[640px] items-center justify-center overflow-visible">
          {PRELOADER_IMAGES.map((img, index) => {
            const isShown = visibleCount > index;

            return (
              <motion.div
                key={img.src}
                className="absolute h-[85%] w-[88%] overflow-hidden rounded-xl shadow-[0_30px_90px_rgba(0,0,0,0.95)] ring-1 ring-white/10 border border-white/10"
                style={{ zIndex: index + 1 }}
                initial={{
                  opacity: 0,
                  scale: 0.85,
                  x: 0,
                  y: 50,
                  rotate: 0,
                }}
                animate={
                  isShown
                    ? {
                        opacity: 1,
                        scale: prefersReducedMotion ? 1 : img.scale,
                        rotate: prefersReducedMotion ? 0 : img.rotate,
                        x: prefersReducedMotion ? 0 : img.x,
                        y: prefersReducedMotion ? 0 : img.y,
                      }
                    : {
                        opacity: 0,
                        scale: 0.85,
                        x: 0,
                        y: 50,
                        rotate: 0,
                      }
                }
                transition={{
                  duration: prefersReducedMotion ? 0.2 : ENTER_DURATION_S,
                  ease: EASE,
                }}
              >
                <SafeImage
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 85vw, 640px"
                  priority
                  placeholderClassName="flex h-full w-full items-center justify-center bg-neutral-900"
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Area: Progress Bar & Large Serif Percentage */}
      <div className="w-full flex flex-col items-center gap-6 mb-4 md:mb-8">
        {/* Thin Horizontal Progress Bar (~60-65% Viewport Width) */}
        <div className="w-[65vw] max-w-[650px] min-w-[240px] h-[3px] rounded-full bg-white/15 overflow-hidden">
          <motion.div
            className="h-full bg-olive rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Large Elegant Serif Percentage Number */}
        <div className="flex items-baseline font-sans tabular-nums">
          <span className="font-serif text-5xl sm:text-2xl md:text-4xl lg:text-5xl font-light text-cream leading-none tracking-tight">
            {progress}
          </span>
          <span className="font-sans text-xl sm:text-2xl md:text-3xl text-olive font-medium ml-1">
            %
          </span>
        </div>
      </div>
    </motion.div>
  );
}
