// "use client";

// import { useEffect, useState } from "react";
// import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
// import SafeImage from "./SafeImage";

// const PRELOADER_IMAGES = [
//   { src: "/images/fresh cart mobile 1.png", alt: "Portfolio preview 1", rotate: -7, x: -16, y: 12 },
//   { src: "/images/colon canser tablet 1.jpg", alt: "Portfolio preview 2", rotate: 6, x: 18, y: -10 },
//   { src: "/images/yummy laptop 3.jpg", alt: "Portfolio preview 3", rotate: -4, x: -10, y: -16 },
//   { src: "/images/colon canser mobile 1.jpg", alt: "Portfolio preview 4", rotate: 5, x: 12, y: 8 },
// ];

// const TOTAL_DURATION = 4800; // 4.8s total timeline
// const STEP_DURATION = 1000;  // 1.0s between each image reveal

// interface PreloaderProps {
//   onComplete: () => void;
// }

// export default function Preloader({ onComplete }: PreloaderProps) {
//   const [progress, setProgress] = useState(0);
//   const [step, setStep] = useState(0);
//   const [isVisible, setIsVisible] = useState(true);
//   const prefersReducedMotion = useReducedMotion();

//   useEffect(() => {
//     const start = performance.now();
//     let frame: number;

//     const tick = (now: number) => {
//       const elapsed = now - start;
//       const pct = Math.min(100, Math.round((elapsed / TOTAL_DURATION) * 100));
//       setProgress(pct);

//       const currentStep = Math.min(3, Math.floor(elapsed / STEP_DURATION));
//       setStep(currentStep);

//       if (elapsed < TOTAL_DURATION) {
//         frame = requestAnimationFrame(tick);
//       } else {
//         setIsVisible(false);
//       }
//     };

//     frame = requestAnimationFrame(tick);
//     return () => cancelAnimationFrame(frame);
//   }, []);

//   return (
//     <AnimatePresence onExitComplete={onComplete}>
//       {isVisible && (
//         <motion.div
//           key="preloader"
//           className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-charcoal"
//           exit={{ opacity: 0 }}
//           transition={{
//             duration: prefersReducedMotion ? 0.2 : 0.7,
//             ease: [0.22, 1, 0.36, 1],
//           }}
//         >
//           <motion.div
//             className="relative h-64 w-80 sm:h-80 sm:w-[420px] md:h-[380px] md:w-[480px] lg:h-[420px] lg:w-[540px]"
//             exit={{ opacity: 0, scale: 0.92, y: -20 }}
//             transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
//           >
//             {PRELOADER_IMAGES.map((img, index) => {
//               const isRevealed = step >= index;

//               return (
//                 <motion.div
//                   key={img.src}
//                   className="absolute inset-0 overflow-hidden rounded-lg shadow-2xl border border-white/10"
//                   style={{ zIndex: index + 1 }}
//                   initial={{ opacity: 0, scale: 0.88, y: 30 }}
//                   animate={
//                     isRevealed
//                       ? prefersReducedMotion
//                         ? { opacity: 1, scale: 1, rotate: img.rotate }
//                         : {
//                             opacity: 1,
//                             scale: 1,
//                             rotate: img.rotate,
//                             x: img.x,
//                             y: img.y,
//                           }
//                       : { opacity: 0, scale: 0.88, y: 30 }
//                   }
//                   transition={{
//                     duration: 0.55,
//                     ease: [0.22, 1, 0.36, 1],
//                   }}
//                 >
//                   <SafeImage
//                     src={img.src}
//                     alt={img.alt}
//                     fill
//                     className="object-cover"
//                     sizes="(max-width: 768px) 340px, 540px"
//                     priority={index === 3}
//                     placeholderClassName="flex h-full w-full items-center justify-center bg-neutral/20"
//                   />
//                 </motion.div>
//               );
//             })}
//           </motion.div>

//           <motion.p
//             className="absolute bottom-10 font-sans text-sm tracking-[0.3em] text-white/70 tabular-nums"
//             aria-live="polite"
//             aria-label={`Loading ${progress} percent`}
//           >
//             {progress}%
//           </motion.p>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SafeImage from "./SafeImage";

const PRELOADER_IMAGES = [
  {
    src: "/images/colon canser tablet 1.jpg",
    alt: "AI Colon Cancer Detection",
    rotate: -8,
    x: -46,
    y: 32,
  },
  {
    src: "/images/colon canser mobile 1.jpg",
    alt: "Fresh Cart",
    rotate: 6.5,
    x: 44,
    y: -18,
  },
  {
    src: "/images/yummy labtop 3.jpg",
    alt: "Yummy Menu",
    rotate: -4,
    x: -22,
    y: -34,
  },
  {
    src: "/images/fresh cart tablet 2.png",
    alt: "Fresh Cart Mobile",
    rotate: 5.5,
    x: 26,
    y: 16,
  },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;
const IMAGE_GAP_MS = 500;
const FINAL_HOLD_MS = 600;
const EXIT_DURATION_S = 0.8;
const ENTER_DURATION_S = 0.65;

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [visibleCount, setVisibleCount] = useState(0);
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

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // 0.0s, 0.5s, 1.0s, 1.5s — one new photograph every 0.5s.
    for (let i = 1; i <= 4; i += 1) {
      timers.push(
        setTimeout(() => {
          setVisibleCount(i);
        }, (i - 1) * IMAGE_GAP_MS)
      );
    }

    // Image 4 starts at 1.5s; hold the complete stack, then fade.
    timers.push(
      setTimeout(() => {
        setExiting(true);
      }, 3 * IMAGE_GAP_MS + FINAL_HOLD_MS)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (!exiting) return;
    const exitMs = prefersReducedMotion ? 250 : EXIT_DURATION_S * 1000;
    const fallback = setTimeout(finish, exitMs + 80);
    return () => clearTimeout(fallback);
  }, [exiting, finish, prefersReducedMotion]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-charcoal"
      initial={{ opacity: 1, filter: "blur(0px)" }}
      animate={
        exiting
          ? {
              opacity: 0,
              filter: prefersReducedMotion ? "blur(0px)" : "blur(10px)",
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
      aria-label="Loading portfolio"
    >
      <div className="relative flex h-[min(60vh,520px)] w-[min(74vw,700px)] items-center justify-center overflow-visible mb-12">
        {PRELOADER_IMAGES.map((img, index) => {
          const isShown = visibleCount > index;

          return (
            <motion.div
              key={img.src}
              className="absolute h-[min(30vh,300px)] w-[min(62vw,600px)] overflow-hidden rounded-[4px] shadow-[0_30px_90px_rgba(0,0,0,0.58)] ring-1 ring-charcoal/15 sm:h-[min(40vh,500px)] sm:w-[min(52vw,500px)]"
              style={{ zIndex: index + 1 }}
              initial={{
                opacity: 0,
                scale: 0.9,
                x: 0,
                y: 48,
                rotate: 0,
              }}
              animate={
                isShown
                  ? {
                      opacity: 1,
                      scale: 1,
                      rotate: prefersReducedMotion ? 0 : img.rotate,
                      x: prefersReducedMotion ? 0 : img.x,
                      y: prefersReducedMotion ? 0 : img.y,
                    }
                  : {
                      opacity: 0,
                      scale: 0.9,
                      x: 0,
                      y: 48,
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
                sizes="(max-width: 640px) 82vw, 740px"
                priority
                placeholderClassName="flex h-full w-full items-center justify-center bg-neutral/20"
              />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
