import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Pricing from "@/components/Pricing";
import Process from "@/components/Process";
import About from "@/components/About";
import BookCall from "@/components/BookCall";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";
import { hr, hrMeta } from "@/data/content-hr";

export const metadata: Metadata = {
  title: hrMeta.title,
  description: hrMeta.description,
  alternates: {
    canonical: "/hr",
    languages: { en: "/", hr: "/hr", "x-default": "/" },
  },
  openGraph: {
    title: hrMeta.title,
    description: hrMeta.description,
    url: "https://petargrbic.com/hr",
    locale: "hr_HR",
  },
};

/**
 * /hr — ISTA stranica kao naslovnica, samo na hrvatskom (Petar, 2026-09-15).
 *
 * Nema vlastitog rasporeda ni vlastitih komponenti: iste komponente dobiju
 * hrvatsku kopiju kao prop. Kad se naslovnica promijeni, /hr se mijenja s
 * njom — jedina razlika ostaje jezik.
 *
 * Tekst je u src/data/content-hr.ts (nacrt, čeka Petrovo odobrenje).
 */
export default function HrPage() {
  return (
    <div lang="hr">
      <Nav t={hr} />
      <main id="main">
        <span id="top" />
        <Hero t={hr} />
        <Work t={hr} />
        <Process t={hr} />
        <Pricing t={hr} />
        <About t={hr} />
        <BookCall t={hr} />
      </main>
      <Footer t={hr} />
      <StickyCta t={hr} />
    </div>
  );
}
