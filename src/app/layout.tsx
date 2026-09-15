import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import ScrollSetup from "@/components/ScrollSetup";

/*
 * Samo težina 800 i bez osi širine: ništa na stranici ne koristi drugu
 * težinu ni font-stretch, a varijabilni font s osi bio je 172 KB (dva
 * zadnja zahtjeva u waterfallu, LCP ~4 s na mobitelu). Statičnih 800: ~27 KB.
 */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  weight: ["800"],
  display: "swap",
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
});

/*
 * Naslov nosi i marku i riječi koje netko stvarno traži. Prije je stajalo
 * samo "Websites that sell" — lijepa rečenica, ali u tražilici nevidljiva.
 * Opis više ne kaže "myself": pozicioniranje je jedan sugovornik, ne jedan
 * par ruku, pa meta mora govoriti isto što i stranica.
 */
// Brand je zip (Petar, 2026-09-15). "zip / marketing genius" ide u opis, ne na stranicu.
const TITLE = "Web design Dubrovnik — free website check | zip";
const DESC =
  "zip / marketing genius. A free written check of your website, Google listing and booking path, then web design, ads and local SEO in Dubrovnik.";

export const metadata: Metadata = {
  metadataBase: new URL("https://petargrbic.com"),
  title: TITLE,
  description: DESC,
  // Bez hreflanga dok ne postoji hrvatski URL — prije je tvrdio da je
  // engleska stranica ujedno i hrvatska.
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: "https://petargrbic.com",
    siteName: "zip",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: TITLE }],
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/og-image.png"] },
};

export const viewport: Viewport = {
  themeColor: "#f5f2ed",
  colorScheme: "light",
};

/* zip je posao, Petar je osnivač. Samo potvrđene činjenice — bez adrese
   ulice, OIB-a i ocjena (aggregateRating ne daje zvjezdice na vlastitom poslu). */
const orgLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "zip",
  url: "https://petargrbic.com",
  logo: "https://petargrbic.com/icon.png",
  email: "thepetargrbic@gmail.com",
  address: { "@type": "PostalAddress", addressLocality: "Dubrovnik", addressCountry: "HR" },
  founder: {
    "@type": "Person",
    name: "Petar Grbić",
    jobTitle: "Head of Operations",
    sameAs: [
      "https://www.linkedin.com/in/petar-grbi%C4%87-455880398/",
      "https://github.com/grba-a",
      "https://www.instagram.com/grbicpetarr/",
      "https://web.facebook.com/petaargrbic",
    ],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
        <div className="grain" aria-hidden="true" />
        <ScrollSetup />
        {children}
        {/* Samo posjeti po stranici (radi i na Hobby planu); stranice
            vlasnika /p/[ime] tako same kažu tko je otvorio link. */}
        <Analytics />
      </body>
    </html>
  );
}
