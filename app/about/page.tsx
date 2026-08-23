import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutContent from "@/components/AboutContent";
import PageTransitionReveal from "@/components/PageTransitionReveal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me | Hagar Atef",
  description: "Learn more about Hagar Atef, a Frontend Developer creating modern, responsive, and user-focused web experiences.",
};

export default function AboutPage() {
  return (
    <>
      <PageTransitionReveal />
      <Navbar isVisible={true} />
      
      <main className="min-h-screen bg-cream selection:bg-olive selection:text-charcoal pt-32 pb-16 px-6 md:px-10 lg:px-16 flex justify-center">
        <div className="w-full max-w-[1400px]">
          <AboutContent />
        </div>
      </main>

      <Footer />
    </>
  );
}
