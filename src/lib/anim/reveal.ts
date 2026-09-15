"use client";

import { gsap, ScrollTrigger, MOBILE, DESKTOP, prefersReducedMotion } from "./gsap";

const noop = () => {};

/**
 * Otkrivanje sadržaja pri skrolu.
 *
 * Pravila:
 *  · sve ide kroz `transform` i `opacity` — nikad top/left/width/height
 *  · elementi koje GSAP animira NE smiju nositi Tailwind transform klase
 *    (translate-*, scale-*) — GSAP i Tailwind se otimaju oko iste osi
 *    i element tiho ostane zaglavljen izvan kadra
 *  · mobitel prvi: kraći put, bez paralaksa i pina
 */
export function revealIn(scope: HTMLElement) {
  if (prefersReducedMotion()) return noop;
  const mm = gsap.matchMedia();

  const build = (distance: number) => () => {
    const groups = new Map<Element, HTMLElement[]>();

    scope.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      const parent = el.closest("[data-reveal-group]") ?? el.parentElement ?? scope;
      groups.set(parent, [...(groups.get(parent) ?? []), el]);
    });

    /* Samo prvi element svake grupe (obično naslov sekcije) ulazi; ostalo
       je odmah vidljivo. Prije: 86 elemenata s istim fade-upom od 0,9 s —
       isti recept posvuda je potpis predloška ("previše AI"). */
    groups.forEach(([lead, ...rest]) => {
      if (rest.length) gsap.set(rest, { opacity: 1, y: 0 });
      gsap.fromTo(
        lead,
        { opacity: 0, y: distance },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: { trigger: lead, start: "top 88%", once: true },
        },
      );
    });
  };

  mm.add(MOBILE, build(10));
  mm.add(DESKTOP, build(16));

  return () => mm.revert();
}

/**
 * Slika paralaksira unutar svog okvira. Samo desktop —
 * na mobitelu paralaks jede frame budget i ne dodaje ništa.
 */
export function parallaxMedia(scope: HTMLElement) {
  if (prefersReducedMotion()) return noop;
  const mm = gsap.matchMedia();

  mm.add(DESKTOP, () => {
    scope.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
      gsap.fromTo(
        el,
        { scale: 1.14, yPercent: -4 },
        {
          scale: 1,
          yPercent: 4,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        },
      );
    });
  });

  return () => mm.revert();
}

/** Maska koja otkriva sliku odozdo. */
export function clipReveal(scope: HTMLElement) {
  if (prefersReducedMotion()) return noop;
  const mm = gsap.matchMedia();

  mm.add("(min-width: 0px)", () => {
    scope.querySelectorAll<HTMLElement>("[data-clip]").forEach((el) => {
      gsap.fromTo(
        el,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        },
      );
    });
  });

  return () => mm.revert();
}

/** Linija procesa se crta preko strokeDashoffset — bez plaćenih pluginova. */
export function drawLine(el: SVGPathElement | SVGLineElement) {
  const length = el.getTotalLength();
  gsap.set(el, { strokeDasharray: length, strokeDashoffset: length });

  return gsap.to(el, {
    strokeDashoffset: 0,
    ease: "none",
    scrollTrigger: {
      trigger: el.closest("section") ?? el,
      start: "top 70%",
      end: "bottom 80%",
      scrub: 0.8,
    },
  });
}

export { ScrollTrigger };
