"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// registerPlugin je idempotentan — višestruki poziv je bezopasan
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Mobile-first: ispod 768px animacije su pojednostavljene, bez pina i scruba. */
export const MOBILE = "(max-width: 767px)";
export const DESKTOP = "(min-width: 768px)";
