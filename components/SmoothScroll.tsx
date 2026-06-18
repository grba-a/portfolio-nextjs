"use client";

import { useEffect } from "react";

// One-pager smooth scrolling for in-page anchor links (#section).
// Scrolls to the target without writing the hash to the URL, so the
// address bar stays clean (petargrbic.com) on every nav/CTA click.
export default function SmoothScroll() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;

      const id = (link.getAttribute("href") || "").slice(1);
      if (!id) return;

      e.preventDefault();

      if (id === "top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
