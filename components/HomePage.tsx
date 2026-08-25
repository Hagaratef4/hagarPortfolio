"use client";

import Navbar from "./Navbar";
import Hero from "./Hero";
import AboutIntro from "./AboutIntro";
import Projects from "./Projects";
import Skills from "./Skills";
import FinalCTA from "./FinalCTA";
import Footer from "./Footer";

export default function HomePage() {
  return (
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
  );
}
