import type { MetadataRoute } from "next";

/*
 * Samo javne stranice. Stranice vlasnika (/p/[ime]) namjerno nisu ovdje:
 * one su privatne i nose noindex. Bez lastModified — new Date() bi se
 * zapekao u dan builda (60-Knowledge/prerender-bakes-build-date.md).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://petargrbic.com", priority: 1 },
    { url: "https://petargrbic.com/hr", priority: 0.9 },
    { url: "https://petargrbic.com/work", priority: 0.7 },
    { url: "https://petargrbic.com/cv", priority: 0.3 },
  ];
}
