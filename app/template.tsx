"use client";

import PageTransitionReveal from "@/components/PageTransitionReveal";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageTransitionReveal />
      {children}
    </>
  );
}
