import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Strip from "@/components/Strip";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Packages from "@/components/Packages";
import ForWhom from "@/components/ForWhom";
import Facts from "@/components/Facts";
import About from "@/components/About";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";
import { hr, hrMeta } from "@/data/content-hr";
import { ogImage } from "@/components/RootShell";

export const metadata: Metadata = {
  title: hrMeta.title,
  description: hrMeta.description,
  alternates: {
    canonical: "/hr",
    languages: { en: "/", hr: "/hr", "x-default": "/" },
  },
  // openGraph ovdje zamjenjuje layoutov cijeli, pa sve mora biti navedeno (audit 2026-10-14)
  openGraph: {
    title: hrMeta.title,
    description: hrMeta.description,
    url: "https://donebyzip.com/hr",
    siteName: "zip",
    images: [ogImage],
    locale: "hr_HR",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: hrMeta.title, description: hrMeta.description, images: [ogImage.url] },
};

/**
 * /hr — ISTA stranica kao naslovnica, samo na hrvatskom. Iste komponente
 * dobiju hrvatsku kopiju kao prop; nikad ne dodavati sekciju samo ovdje.
 */
export default function HrPage() {
  return (
    <>
      <Nav t={hr} />
      <main id="main">
        <Hero t={hr} />
        <Strip t={hr} />
        <Work t={hr} />
        <Process t={hr} />
        <Packages t={hr} />
        <ForWhom t={hr} />
        <Facts t={hr} />
        <About t={hr} />
        <Faq t={hr} />
        <Contact t={hr} />
      </main>
      <Footer t={hr} />
      <StickyCta t={hr} />
    </>
  );
}
