import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Projects from "@/components/Projects";
import PageTransitionReveal from "@/components/PageTransitionReveal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Selected Work | Hagar Atef",
  description:
    "Explore featured projects built by Hagar Atef, including AI healthcare applications, e-commerce platforms, and API-driven web tools.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageTransitionReveal />
      <Navbar isVisible={true} />

      <main className="min-h-screen bg-cream selection:bg-olive selection:text-charcoal pt-24 pb-12">
        <Projects />
      </main>

      <Footer />
    </>
  );
}
