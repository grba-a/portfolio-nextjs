import "./globals.css";
import type { Metadata } from "next";
import { geist } from "@/components/RootShell";
import NotFoundBody from "@/components/NotFoundBody";

export const metadata: Metadata = {
  title: "Page not found | zip",
  robots: { index: false, follow: false },
};

/** Nepoznata adresa bilo gdje. S dva root layouta 404 mora nositi vlastiti <html>. */
export default function GlobalNotFound() {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <NotFoundBody />
      </body>
    </html>
  );
}
