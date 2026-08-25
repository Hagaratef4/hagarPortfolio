import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";
import GlobalPreloader from "@/components/GlobalPreloader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hagar Atef — Frontend Developer",
  description:
    "Frontend developer portfolio showcasing modern, responsive, and user-focused web experiences built with React, Next.js, and TypeScript.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-cream text-charcoal font-sans">
        <GlobalPreloader />
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
