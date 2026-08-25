"use client";

import { useLayoutEffect } from "react";
import { ScrollTrigger, prefersReducedMotion } from "@/lib/anim/gsap";

/**
 * Postavljanje scrolla.
 *
 * BEZ smooth-scroll biblioteke — scroll je nativni. Inercija se na
 * dodiru osjeti kao kvar, a na desktopu se otima kotačiću.
 * Sidra rješava `scroll-behavior: smooth` u CSS-u.
 *
 * Klasu `js-anim` na <html> stavljamo TEK ovdje — do tog trenutka je sav
 * sadržaj vidljiv. Bez toga stranica bez JS-a ostane prazna (kvar iz v2,
 * gdje je 27 od 27 elemenata imalo opacity: 0).
 */
export default function ScrollSetup() {
  useLayoutEffect(() => {
    const root = document.documentElement;

    if (prefersReducedMotion()) {
      ScrollTrigger.refresh();
      return;
    }

    root.classList.add("js-anim");
    ScrollTrigger.refresh();

    return () => {
      root.classList.remove("js-anim");
    };
  }, []);

  return null;
}
