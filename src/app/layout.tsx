import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ScrollSetup from "@/components/ScrollSetup";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
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
const TITLE = "Petar Grbić — Web design, ads & SEO for small businesses | Dubrovnik";
const DESC =
  "Websites that sell, Google Ads and local SEO for small businesses in Dubrovnik and Croatia. One point of contact from first call to launch. Book a free 15-minute call.";

export const metadata: Metadata = {
  metadataBase: new URL("https://petargrbic.com"),
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/", languages: { en: "/", hr: "/" } },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: "https://petargrbic.com",
    siteName: "Petar Grbić",
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

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Petar Grbić",
  url: "https://petargrbic.com",
  jobTitle: "Web developer & digital marketer",
  email: "thepetargrbic@gmail.com",
  address: { "@type": "PostalAddress", addressLocality: "Dubrovnik", addressCountry: "HR" },
  sameAs: [
    "https://www.linkedin.com/in/petar-grbi%C4%87-455880398/",
    "https://github.com/grba-a",
    "https://www.instagram.com/grbicpetarr/",
    "https://web.facebook.com/petaargrbic",
  ],
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
        <div className="grain" aria-hidden="true" />
        <ScrollSetup />
        {children}
      </body>
    </html>
  );
}
