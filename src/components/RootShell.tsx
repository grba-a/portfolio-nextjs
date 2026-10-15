import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import GlassRefraction from "@/components/GlassRefraction";
import ClickTracker from "@/components/ClickTracker";
import { site } from "@/data/site";

/*
 * Zajednička ljuska za oba root layouta. Od 2026-10-14 stranica ima dva:
 * (en) i (hr), da /hr nosi <html lang="hr"> (audit: Google je /hr čitao kao
 * engleski). Prelazak s jezika na jezik zato radi puno učitavanje stranice.
 */

/* Geist, jedna varijabilna datoteka za sve težine (odluka 3, 2026-09-18) */
export const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

// Naslov iz kolegina previewa (Petar odobrio 2026-10-14), bez "Croatia":
// engleska stranica cilja inozemstvo, hrvatska domaće (Petar, 2026-10-14).
// "zip / marketing genius" ostaje u opisu (Petar: Ne na brisanje "marketinga").
const TITLE = "Small business websites & Google profiles | zip";
const DESC =
  "zip / marketing genius. New websites and redesigns for small businesses, with your Google profile working as one. Start with a free written check.";

export const ogImage = { url: "/og-image.png", width: 1200, height: 630, alt: "zip — Systems that sell." };

export const baseMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/", languages: { en: "/", hr: "/hr", "x-default": "/" } },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: site.url,
    siteName: "zip",
    images: [ogImage],
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: [ogImage.url] },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

/* Samo firma (Petar, 2026-09-18: "ovo je isključivo za firmu") — bez osnivača,
   bez osobnih profila. Grad je Zagreb. Bez ocjena i adrese ulice.
   ProfessionalService umjesto Organization (audit 2026-10-14): nosi telefon
   i jezike. Bez areaServed: klijenti su i u inozemstvu (Petar, 2026-10-14). */
const orgLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "zip",
  url: site.url,
  logo: `${site.url}/icon.png`,
  image: `${site.url}/og-image.png`,
  email: site.email,
  telephone: site.phone,
  address: { "@type": "PostalAddress", addressLocality: "Zagreb", addressCountry: "HR" },
  knowsLanguage: ["hr", "en"],
  description: "Websites, Google profiles and enquiry systems for small businesses.",
};

/*
 * Zatvarač pri ulasku (odluka 7C) maknut je 2026-10-15 na Petrovu riječ:
 * prepolovio je Speed Index na mobitelu (3,2 s → 1,5 s) i davao CLS 0,05.
 */
export default function RootShell({ lang, children }: { lang: "en" | "hr"; children: React.ReactNode }) {
  return (
    <html lang={lang} className={geist.variable} suppressHydrationWarning>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
        {children}
        <GlassRefraction />
        <ClickTracker />
        <Analytics />
      </body>
    </html>
  );
}
