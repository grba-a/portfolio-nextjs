import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Strip from "@/components/Strip";
import Check from "@/components/Check";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Packages from "@/components/Packages";
import Facts from "@/components/Facts";
import About from "@/components/About";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
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
    url: "https://donebyzip.com/hr",
    locale: "hr_HR",
  },
};

/**
 * /hr — ISTA stranica kao naslovnica, samo na hrvatskom. Iste komponente
 * dobiju hrvatsku kopiju kao prop; nikad ne dodavati sekciju samo ovdje.
 */
export default function HrPage() {
  return (
    <div lang="hr">
      <Nav t={hr} />
      <main id="main">
        <Hero t={hr} />
        <Strip t={hr} />
        <Check t={hr} />
        <Work t={hr} />
        <Process t={hr} />
        <Packages t={hr} />
        <Facts t={hr} />
        <About t={hr} />
        <Faq t={hr} />
        <Contact t={hr} />
      </main>
      <Footer t={hr} />
      <StickyCta t={hr} />
    </div>
  );
}
