"use client";

import { useLayoutEffect, useRef } from "react";
import { content, type Copy } from "@/data/content";
import { revealIn } from "@/lib/anim/reveal";
import { gsap, MOBILE, DESKTOP, prefersReducedMotion } from "@/lib/anim/gsap";

/**
 * Kako ide — tri koraka: besplatna provjera, ponuda napismeno, izrada i
 * predaja svega. Stoji PRIJE paketa: prvo besplatno, pa edukacija, pa
 * naplata (Petar, 2026-09-15).
 *
 * Linija se crta scrubom: okomito na mobitelu, vodoravno od 768px.
 * Ide preko `transform: scale`, ne preko width/height.
 */
export default function Process({ t = content }: { t?: Copy }) {
  const scope = useRef<HTMLElement>(null);
  const line = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (!scope.current) return;
    if (prefersReducedMotion()) return;
    const cleanupReveal = revealIn(scope.current);

    const mm = gsap.matchMedia();
    const draw = (axis: "scaleY" | "scaleX") => () => {
      if (!line.current) return;
      gsap.fromTo(
        line.current,
        { [axis]: 0 },
        {
          [axis]: 1,
          ease: "none",
          scrollTrigger: {
            trigger: scope.current!,
            start: "top 72%",
            end: "bottom 85%",
            scrub: 0.8,
          },
        },
      );
    };
    mm.add(MOBILE, draw("scaleY"));
    mm.add(DESKTOP, draw("scaleX"));

    return () => {
      cleanupReveal();
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={scope}
      id="how"
      className="scroll-mt-16 border-t border-line py-20 sm:py-28 lg:py-32"
    >
      <div className="shell">
        <header className="max-w-2xl" data-reveal-group>
          <h2 className="eyebrow caret block" data-reveal>
            {t.process.eyebrow}
          </h2>
          <p
            className="mt-4 font-display text-[clamp(1.875rem,7vw,3rem)] font-extrabold leading-[1] tracking-[-0.035em]"
            data-reveal
          >
            {t.process.heading}
          </p>
        </header>

        <div className="relative mt-12 sm:mt-16">
          {/* Vodilica — okomita na mobitelu, vodoravna od 768px */}
          <span
            aria-hidden="true"
            className="absolute left-[11px] top-2 h-[calc(100%-1rem)] w-px bg-line md:left-0 md:top-[11px] md:h-px md:w-full"
          />
          <span
            ref={line}
            aria-hidden="true"
            className="absolute left-[11px] top-2 h-[calc(100%-1rem)] w-px origin-top bg-rust md:left-0 md:top-[11px] md:h-px md:w-full md:origin-left"
          />

          <ol className="grid gap-9 md:grid-cols-3 md:gap-10">
            {t.process.steps.map((step) => (
              <li key={step.num} className="relative pl-10 md:pl-0 md:pt-10" data-reveal-group>
                <span
                  aria-hidden="true"
                  className="absolute left-[5px] top-2 h-3.5 w-3.5 rounded-full border-2 border-rust bg-limestone md:left-[-1px] md:top-[5px]"
                />
                <span className="tnum text-sm text-rust-ink" data-reveal>
                  {step.num}
                </span>
                <h3 className="mt-2 text-xl leading-tight tracking-[-0.02em]" data-reveal>
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted" data-reveal>
                  {step.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
