import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticle, postMetadata } from "@/components/Blog";
import { findPost, postsIn } from "@/data/blog";

export const dynamicParams = false;
export const generateStaticParams = () => postsIn("en").map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = findPost("en", (await params).slug);
  return p ? postMetadata(p) : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const p = findPost("en", (await params).slug);
  if (!p) notFound();
  return <BlogArticle p={p} />;
}
