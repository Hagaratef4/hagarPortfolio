"use client";

import { useState } from "react";
import Preloader from "./Preloader";
import Navbar from "./Navbar";
import Hero from "./Hero";
import AboutIntro from "./AboutIntro";
import Projects from "./Projects";
import Skills from "./Skills";
import FinalCTA from "./FinalCTA";
import Footer from "./Footer";

export default function HomePage() {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <>
      {showPreloader && (
        <Preloader onComplete={() => setShowPreloader(false)} />
      )}

      {!showPreloader && (
        <>
          <Navbar isVisible />
          <main>
            <Hero isVisible />
            <AboutIntro />
            <Projects />
            <Skills />
            <FinalCTA />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
