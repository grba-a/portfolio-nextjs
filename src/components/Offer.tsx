"use client";

import { useLayoutEffect, useRef } from "react";
import { content } from "@/data/content";
import { revealIn } from "@/lib/anim/reveal";

/**
 * Što radim — tri ponude običnim jezikom.
 *
 * Stara verzija je imala šest kartica s 27 natuknica i šest različitih
 * neonskih boja. Ovdje su iste sposobnosti, ali svedene na tri odluke
 * koje kupac stvarno donosi, u numeriranom editorijalnom popisu
 * umjesto u mreži jednakih kartica.
 */
export default function Offer() {
  const scope = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!scope.current) return;
    return revealIn(scope.current);
  }, []);

  return (
    <section
      ref={scope}
      id="offer"
      className="scroll-mt-16 border-t border-line py-20 sm:py-28 lg:py-36"
    >
      <div className="shell">
        <header className="max-w-2xl" data-reveal-group>
          <h2 className="eyebrow caret block" data-reveal>
            {content.offer.heading}
          </h2>
          <p
            className="mt-4 text-[clamp(1.375rem,4.6vw,2rem)] leading-[1.25] tracking-[-0.02em]"
            data-reveal
          >
            {content.offer.sub}
          </p>
        </header>

        <div className="mt-12 sm:mt-16">
          {content.offer.items.map((item) => (
            <div
              key={item.num}
              data-reveal-group
              className="grid gap-5 border-t border-line py-9 sm:py-12 lg:grid-cols-12 lg:gap-10"
            >
              <div className="lg:col-span-5">
                <div className="flex items-baseline gap-4">
                  <span className="tnum text-sm text-rust" data-reveal>
                    {item.num}
                  </span>
                  <h3
                    className="font-display text-[clamp(1.75rem,6.5vw,2.5rem)] font-extrabold leading-[1] tracking-[-0.035em]"
                    data-reveal
                  >
                    {item.title}
                  </h3>
                </div>
                <p className="mt-4 max-w-[38ch] text-muted" data-reveal>
                  {item.body}
                </p>
              </div>

              <ul
                className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2 lg:col-span-7 lg:col-start-6"
                data-reveal
              >
                {item.list.map((li) => (
                  <li
                    key={li}
                    className="flex gap-3 text-[0.9375rem] leading-snug text-muted"
                  >
                    <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-line-strong" />
                    {li}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="border-t border-line" />

          {/* Devet vjerodostojnih usluga prolazi bolje od osamnaest
              nevjerojatnih; ovo hvata ostalo bez nabrajanja. */}
          <p className="mt-8 max-w-[52ch] text-[0.9375rem] leading-relaxed text-muted" data-reveal>
            {content.offer.footnote}
          </p>
        </div>
      </div>
    </section>
  );
}
