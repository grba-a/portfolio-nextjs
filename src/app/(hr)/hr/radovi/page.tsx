import type { Metadata } from "next";
import WorkPageBody from "@/components/WorkPageBody";
import { ogImage } from "@/components/RootShell";
import { hr } from "@/data/content-hr";

// Naslov i opis iz kolegina previewa; par stranice /work (2026-10-15)
const TITLE = "Radovi: web stranice za male tvrtke | zip";
const DESC = "Web stranice koje smo izradili za male tvrtke u Hrvatskoj: smještaj, frizerski studio, tvrtka za dizalice i sportski klub.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/hr/radovi", languages: { en: "/work", hr: "/hr/radovi", "x-default": "/work" } },
  openGraph: { title: TITLE, description: DESC, url: "https://donebyzip.com/hr/radovi", siteName: "zip", images: [ogImage], locale: "hr_HR", type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: [ogImage.url] },
};

export default function RadoviPage() {
  return <WorkPageBody t={hr} />;
}
