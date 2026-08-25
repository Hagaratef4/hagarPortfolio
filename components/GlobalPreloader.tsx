"use client";

import { useState } from "react";
import Preloader from "./Preloader";
import { markIntroComplete } from "@/lib/intro-session";

export default function GlobalPreloader() {
  const [showPreloader, setShowPreloader] = useState(true);

  const handleComplete = () => {
    markIntroComplete();
    setShowPreloader(false);
  };

  if (!showPreloader) return null;

  return <Preloader onComplete={handleComplete} />;
}
