"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
    
    // Also scroll documentElement and body for cross-browser compatibility
    if (typeof document !== 'undefined') {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [pathname]);

  return null;
}
