"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { content } from "@/data/content";
import { work } from "@/data/work";
import { revealIn, parallaxMedia, clipReveal } from "@/lib/anim/reveal";
import { ArrowUpRight } from "@/components/icons";

/**
 * Radovi — jezgra stranice.
 *
 * Jedan projekt = jedna puna traka, naizmjenično lijevo/desno na desktopu.
 * Mobile-first: na mobitelu je sve u jednom stupcu, snimka pa tekst.
 *
 * Namjerno NIJE mreža od tri jednaka stupca — to je najgeneričniji raspored
 * i upravo ono zbog čega se stara verzija čitala kao predložak.
 */
export default function Work() {
  const scope = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!scope.current) return;
    const cleanups = [
      revealIn(scope.current),
      parallaxMedia(scope.current),
      clipReveal(scope.current),
    ];
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section ref={scope} id="work" className="scroll-mt-16 py-20 sm:py-28 lg:py-36">
      <div className="shell">
        <header className="max-w-2xl" data-reveal-group>
          {/* Bio je <p class="eyebrow"> — nijedna sekcija nije ulazila u
              strukturu naslova. Vizualno se ne mijenja ništa. */}
          <h2 className="eyebrow caret block" data-reveal>
            {content.work.heading}
          </h2>
          {/* Uvod je bio 22px, veći od opisa projekata — rečenica namijenjena
              poslodavcima nadjačavala je sam rad. */}
          <p className="mt-4 max-w-[52ch] text-[1.0625rem] leading-relaxed text-muted" data-reveal>
            {content.work.sub}
          </p>
        </header>

        <div className="mt-14 flex flex-col gap-20 sm:mt-20 sm:gap-28 lg:gap-36">
          {work.map((item, i) => {
            const flip = i % 2 === 1;

            return (
              <article
                key={item.slug}
                data-reveal-group
                className="grid items-center gap-6 sm:gap-7 lg:grid-cols-12 lg:gap-14"
              >
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.name} — ${content.work.visit}`}
                  data-clip
                  className={`group relative block overflow-hidden rounded-[4px] border border-line bg-limestone-2 lg:col-span-7 ${
                    flip ? "lg:order-2 lg:col-start-6" : ""
                  }`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={item.shot}
                      alt={`${item.name} — ${item.description}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      data-parallax
                      className="object-cover object-top"
                    />
                  </div>
                  <span className="pointer-events-none absolute inset-0 transition-colors duration-500 group-hover:bg-ink/10" />
                </a>

                <div className={`lg:col-span-5 ${flip ? "lg:order-1 lg:col-start-1" : ""}`}>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="tnum text-sm text-rust" data-reveal>
                      {item.index}
                    </span>
                    <span className="eyebrow" data-reveal>
                      {item.kind}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-[clamp(2rem,7.5vw,3.25rem)] font-extrabold leading-[0.95] tracking-[-0.035em]" data-reveal>
                    {item.name}
                  </h3>

                  <p className="mt-4 max-w-[46ch] text-muted" data-reveal>
                    {item.description}
                  </p>

                  <p
                    className="mt-5 max-w-[42ch] border-l-2 border-rust pl-4 text-[0.95rem] leading-relaxed"
                    data-reveal
                  >
                    {item.outcome}
                  </p>

                  {item.tags.length > 0 && (
                    <ul className="mt-6 flex flex-wrap gap-x-2 gap-y-2" data-reveal>
                      {item.tags.map((tag) => (
                        <li
                          key={tag}
                          className="border border-line px-2.5 py-1 font-mono text-[0.6875rem] tracking-wide text-muted"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div
                    className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3"
                    data-reveal
                  >
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ulink -my-2.5 inline-flex min-h-11 items-center gap-1.5 font-medium"
                    >
                      {content.work.visit}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>

                    <span className="inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
                      <span
                        aria-hidden="true"
                        className={`h-1.5 w-1.5 rounded-full ${
                          item.status === "live" ? "bg-rust" : "bg-line-strong"
                        }`}
                      />
                      {item.status === "live"
                        ? content.work.statusLive
                        : content.work.statusDev}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
