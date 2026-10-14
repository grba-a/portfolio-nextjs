"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

/**
 * Mjerenje glavnih radnji (audit 2026-10-14: nijedan klik nije bio mjeren).
 * Jedan slušač na cijeloj stranici umjesto koda u svakom gumbu: WhatsApp,
 * poziv i e-mail, s mjestom (id sekcije) odakle je kliknuto. Obrazac i
 * kalendar javljaju se sami (Contact.tsx, Booker.tsx).
 * Vercel prikazuje vlastite događaje samo na planu koji ih ima; na drugima
 * track() tiho ne radi ništa.
 */
export default function ClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const name = href.startsWith("https://wa.me/")
        ? "WhatsApp"
        : href.startsWith("tel:")
          ? "Call"
          : href.startsWith("mailto:")
            ? "Email"
            : null;
      if (!name) return;
      const where = a.closest("section[id], header, footer, [data-track]");
      track(name, {
        where: where?.getAttribute("data-track") ?? where?.id ?? where?.tagName.toLowerCase() ?? "page",
        lang: document.documentElement.lang,
      });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
