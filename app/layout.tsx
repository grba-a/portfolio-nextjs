import type { Metadata } from "next";
import { Sora, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import AnimationObserver from "@/components/AnimationObserver";
import SmoothScroll from "@/components/SmoothScroll";
import Providers from "@/components/Providers";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://petargrbic.com"),
  title: "Petar Grbić — Full-Service Digital Freelancer",
  description:
    "Web development, paid ads, SEO, content, and branding — handled end to end. Based in Zagreb, Croatia.",
  openGraph: {
    title: "Petar Grbić — Full-Service Digital Freelancer",
    description:
      "Web development, paid ads, SEO, content, and branding — handled end to end.",
    url: "https://petargrbic.com",
    siteName: "Petar Grbić",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Petar Grbić — Full-Service Digital Freelancer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Petar Grbić — Full-Service Digital Freelancer",
    description:
      "Web development, paid ads, SEO, content, and branding — handled end to end.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${hanken.variable}`}>
      <body>
        <Providers>
          <AnimationObserver />
          <SmoothScroll />
          {children}
        </Providers>
      </body>
    </html>
  );
}
