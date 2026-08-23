import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Skills from "@/components/Skills";
import PageTransitionReveal from "@/components/PageTransitionReveal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills & Expertise | Hagar Atef",
  description:
    "Discover the technical skills, frontend frameworks, tools, and libraries utilized by Hagar Atef to craft modern web applications.",
};

export default function SkillsPage() {
  return (
    <>
      <PageTransitionReveal />
      <Navbar isVisible={true} />

      <main className="min-h-screen bg-cream selection:bg-olive selection:text-charcoal pt-24 pb-12">
        <Skills />
      </main>

      <Footer />
    </>
  );
}
