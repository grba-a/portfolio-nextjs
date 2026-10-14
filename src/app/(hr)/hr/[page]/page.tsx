import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Landing, { landingMetadata } from "@/components/Landing";
import { findPage, pagesIn } from "@/data/pages";

/** Hrvatske stranice usluga i djelatnosti (src/data/pages.ts). Ostale adrese su 404. */
export const dynamicParams = false;
export const generateStaticParams = () => pagesIn("hr").map((p) => ({ page: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const p = findPage("hr", (await params).page);
  return p ? landingMetadata(p) : {};
}

export default async function Page({ params }: { params: Promise<{ page: string }> }) {
  const p = findPage("hr", (await params).page);
  if (!p) notFound();
  return <Landing p={p} />;
}
