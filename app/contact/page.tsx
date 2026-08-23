import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactContent from "@/components/ContactContent";
import PageTransitionReveal from "@/components/PageTransitionReveal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Hagar Atef",
  description:
    "Get in touch with Hagar Atef. Have a project in mind or want to collaborate? Send a message and let's build something great together.",
};

export default function ContactPage() {
  return (
    <>
      <PageTransitionReveal />
      <Navbar isVisible={true} />

      <main className="min-h-screen bg-cream selection:bg-olive selection:text-charcoal pt-32 pb-16 px-6 md:px-10 lg:px-16 flex justify-center">
        <div className="w-full max-w-[1400px]">
          <ContactContent />
        </div>
      </main>

      <Footer />
    </>
  );
}
