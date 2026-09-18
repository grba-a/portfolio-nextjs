import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import GlassRefraction from "@/components/GlassRefraction";

/* Geist, jedna varijabilna datoteka za sve težine (odluka 3, 2026-09-18) */
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

// Bez "agency" (Petar odobrio 2026-09-16); "zip / marketing genius" ostaje samo u opisu.
const TITLE = "Free website check | zip";
const DESC =
  "zip / marketing genius. We help small businesses grow, starting with a free written check of your website, Google listing and booking path.";

export const metadata: Metadata = {
  metadataBase: new URL("https://donebyzip.com"),
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/", languages: { en: "/", hr: "/hr", "x-default": "/" } },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: "https://donebyzip.com",
    siteName: "zip",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: TITLE }],
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/og-image.png"] },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

/* Samo firma (Petar, 2026-09-18: "ovo je isključivo za firmu") — bez osnivača,
   bez osobnih profila. Grad je Zagreb. Bez ocjena i adrese ulice. */
const orgLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "zip",
  url: "https://donebyzip.com",
  logo: "https://donebyzip.com/icon.png",
  email: "info@donebyzip.com",
  address: { "@type": "PostalAddress", addressLocality: "Zagreb", addressCountry: "HR" },
};

/*
 * Zatvarač u heroju ide samo pri prvom posjetu u sesiji i nikad uz smanjeni
 * pokret; "?zip" u adresi ga uvijek pokrene, za pregled. Mora se odlučiti
 * PRIJE prvog iscrtavanja, pa je ovo sinkrona skripta na vrhu <body>, a ne efekt. Nakon 2,6 s atribut se miče, da
 * povratak na naslovnicu klijentskom navigacijom ne pokrene zatvarač opet.
 */
const zipperGate = `try{var s=sessionStorage,d=document.documentElement;if((!s.getItem("zz")||location.search.indexOf("zip")>-1)&&!matchMedia("(prefers-reduced-motion: reduce)").matches){d.dataset.zz="run";setTimeout(function(){delete d.dataset.zz},2600)}s.setItem("zz","1")}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: zipperGate }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
        {children}
        <GlassRefraction />
        <Analytics />
      </body>
    </html>
  );
}
