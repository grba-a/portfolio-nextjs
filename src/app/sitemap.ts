import type { MetadataRoute } from "next";

/*
 * Samo javne stranice. Stranice vlasnika (/p/[ime]) namjerno nisu ovdje:
 * one su privatne i nose noindex. Bez lastModified — new Date() bi se
 * zapekao u dan builda (60-Knowledge/prerender-bakes-build-date.md).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://donebyzip.com", priority: 1 },
    { url: "https://donebyzip.com/hr", priority: 0.9 },
    { url: "https://donebyzip.com/work", priority: 0.7 },
  ];
}
