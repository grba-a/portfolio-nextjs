import type { MetadataRoute } from "next";
import { pages, pagePath } from "@/data/pages";
import { posts, blogPath } from "@/data/blog";

/*
 * Samo javne stranice. Stranice vlasnika (/p/[ime]) namjerno nisu ovdje:
 * one su privatne i nose noindex. Bez lastModified — new Date() bi se
 * zapekao u dan builda (60-Knowledge/prerender-bakes-build-date.md).
 * Od 2026-10-14 i usluge, djelatnosti i blog, svaki s parom na drugom jeziku.
 */
const BASE = "https://donebyzip.com";
const pair = (en: string, hr: string) => ({ languages: { en: BASE + en, hr: BASE + hr } });

export default function sitemap(): MetadataRoute.Sitemap {
  const landing = pages.map((p) => {
    const other = p.alt ? pagePath(p.lang === "en" ? "hr" : "en", p.alt) : null;
    const path = pagePath(p.lang, p.slug);
    return {
      url: BASE + path,
      priority: 0.8,
      ...(other ? { alternates: p.lang === "en" ? pair(path, other) : pair(other, path) } : {}),
    };
  });
  const articles = posts.map((p) => {
    const path = blogPath(p);
    const other = p.alt ? blogPath({ lang: p.lang === "en" ? "hr" : "en", slug: p.alt }) : null;
    return {
      url: BASE + path,
      lastModified: p.date,
      priority: 0.6,
      ...(other ? { alternates: p.lang === "en" ? pair(path, other) : pair(other, path) } : {}),
    };
  });
  return [
    { url: BASE, priority: 1, alternates: pair("", "/hr") },
    { url: `${BASE}/hr`, priority: 0.9, alternates: pair("", "/hr") },
    { url: `${BASE}/work`, priority: 0.7, alternates: pair("/work", "/hr/radovi") },
    { url: `${BASE}/hr/radovi`, priority: 0.7, alternates: pair("/work", "/hr/radovi") },
    ...landing,
    { url: `${BASE}/blog`, priority: 0.7, alternates: pair("/blog", "/hr/blog") },
    { url: `${BASE}/hr/blog`, priority: 0.7, alternates: pair("/blog", "/hr/blog") },
    ...articles,
  ];
}
