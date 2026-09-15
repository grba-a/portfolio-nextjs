"use client";

import { useLayoutEffect, useRef } from "react";
import { content } from "@/data/content";
import { site } from "@/data/site";
import { revealIn } from "@/lib/anim/reveal";

/**
 * O meni.
 *
 * Bez portreta: jedina fotografija je slab noćni kadar u baru, a vlasnik koji
 * kupuje "jednu osobu za sve" iz tamnog kvadrata od 94 px ne vidi nikoga.
 * Kad stigne dnevni portret, vraća se ovdje velik — public/me.webp ostaje
 * za /cv.
 *
 * Certifikati su jedan redak s poveznicom na CV, ne zid od 12 čipova: nazivi
 * poput "Apps" i "AI Shopping" vlasniku konobe ne znače ništa, a zid ga
 * prebacuje iz kupca u poslodavca koji čita životopis.
 */
export default function About() {
  const scope = useRef<HTMLElement>(null);
  const { about } = content;

  useLayoutEffect(() => {
    if (!scope.current) return;
    return revealIn(scope.current);
  }, []);

  return (
    <section
      ref={scope}
      id="about"
      className="scroll-mt-16 border-t border-line py-20 sm:py-28 lg:py-36"
    >
      <div className="shell">
        <div className="max-w-3xl" data-reveal-group>
          <h2 className="eyebrow caret block" data-reveal>
            {about.eyebrow}
          </h2>
          <p
            className="mt-4 font-display text-[clamp(2.25rem,9vw,4.25rem)] font-extrabold leading-[0.95] tracking-[-0.035em]"
            data-reveal
          >
            {about.heading}
          </p>

          <div className="mt-10 max-w-[62ch] space-y-4 text-[1.0625rem] leading-relaxed text-muted sm:mt-12">
            <p data-reveal>{about.p1}</p>
            <p data-reveal>{about.p2}</p>
            <p data-reveal>{about.p2b}</p>
          </div>

          <p
            className="mt-7 max-w-[46ch] border-l-2 border-rust pl-4 text-[1.0625rem] leading-relaxed text-ink"
            data-reveal
          >
            {about.p3}
          </p>

          {/* Dokaz ostaje provjeriv, ali jednim retkom: CV je u novoj kartici,
              da kupac ne ode s prodajne stranice. */}
          <p className="mt-8 text-[0.9375rem] text-muted" data-reveal>
            {about.certsLine} ·{" "}
            <a
              href={site.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="ulink -my-2 inline-flex min-h-11 items-center text-ink"
            >
              {about.certsLink}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
