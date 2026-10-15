import type { Metadata } from "next";
import WorkPageBody from "@/components/WorkPageBody";
import { ogImage } from "@/components/RootShell";

// Naslov i opis iz kolegina previewa (Petar odobrio 2026-10-14). openGraph
// i twitter moraju biti ovdje, inače se /work dijeli kao naslovnica (audit).
const TITLE = "Work: websites for small businesses | zip";
const DESC = "Websites we have built for small businesses: apartments, a hair studio, a heavy equipment company and a sports club.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/work", languages: { en: "/work", hr: "/hr/radovi", "x-default": "/work" } },
  openGraph: { title: TITLE, description: DESC, url: "https://donebyzip.com/work", siteName: "zip", images: [ogImage], locale: "en_US", type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: [ogImage.url] },
};

export default function WorkPage() {
  return <WorkPageBody />;
}
