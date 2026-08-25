"use client";

import { useLayoutEffect, useRef } from "react";
import { content } from "@/data/content";
import { certs, site } from "@/data/site";
import { revealIn } from "@/lib/anim/reveal";
import { ArrowUpRight } from "@/components/icons";

/**
 * O meni + certifikati.
 *
 * BEZ PORTRETA — namjerno. Jedina raspoloživa fotografija (public/me.webp)
 * je mutan noćni kadar iz bara, u profilu. Na stranici koja prodaje
 * profesionalnu izradu weba takva slika ruši kredibilitet više nego što
 * ga gradi, pa je sekcija tipografska.
 * Kad stigne pristojan portret: vrati <Image> u lijevi stupac.
 *
 * Certifikati su prije bili 12 slika u karuselu utrostručenom na 36
 * slikovnih elemenata — nijedna se nije učitala, a dokument od 1270px
 * je na mobitelu ionako nečitljiv. Sada su tekstualni čipovi koji vode
 * na stvarni certifikat: nula kilobajta dok netko ne klikne, a tvrdnja
 * postaje provjeriva.
 */
export default function About() {
  const scope = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!scope.current) return;
    return revealIn(scope.current);
  }, []);

  const byIssuer = certs.reduce<Record<string, typeof certs[number][]>>((acc, c) => {
    (acc[c.issuer] ??= []).push(c);
    return acc;
  }, {});

  return (
    <section
      ref={scope}
      id="about"
      className="scroll-mt-16 border-t border-line py-20 sm:py-28 lg:py-36"
    >
      <div className="shell">
        <header className="max-w-3xl" data-reveal-group>
          <p className="eyebrow" data-reveal>
            {content.about.eyebrow}
          </p>
          <h2
            className="mt-4 text-[clamp(2.25rem,9vw,4.25rem)] leading-[0.95]"
            data-reveal
          >
            {content.about.heading}
          </h2>
        </header>

        <div className="mt-12 grid gap-12 sm:mt-16 lg:grid-cols-12 lg:gap-16">
          {/* Bio */}
          <div className="lg:col-span-6" data-reveal-group>
            <div className="space-y-4 text-[1.0625rem] leading-relaxed text-muted">
              <p data-reveal>{content.about.p1}</p>
              <p data-reveal>{content.about.p2}</p>
            </div>

            <p
              className="mt-7 max-w-[38ch] border-l-2 border-rust pl-4 text-[1.0625rem] leading-relaxed text-ink"
              data-reveal
            >
              {content.about.p3}
            </p>

            <a
              href={site.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost mt-8 justify-center sm:justify-start"
              data-reveal
            >
              {content.about.cv}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Certifikati */}
          <div className="lg:col-span-5 lg:col-start-8" data-reveal-group>
            <div className="border-t border-line-strong pt-6">
              {/* items-start + blok oznaka: inače drugi red teksta podvuče
                  ispod broja i brojka se sudari s natpisom */}
              <div className="flex items-start gap-4" data-reveal>
                <span className="tnum shrink-0 text-[2.75rem] leading-[0.8] text-rust">
                  12
                </span>
                <span className="eyebrow block max-w-[22ch] pt-0.5 leading-[1.6]">
                  {content.about.certsLabel.replace("12 ", "")}
                </span>
              </div>

              <dl className="mt-7 space-y-5">
                {Object.entries(byIssuer).map(([issuer, items]) => (
                  <div key={issuer} data-reveal>
                    <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
                      {issuer}
                    </dt>
                    <dd className="mt-2 flex flex-wrap gap-x-2 gap-y-2">
                      {items.map((c) => (
                        <a
                          key={c.file}
                          href={`/certs/${c.file}.png`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`${c.issuer} ${c.name} — view certificate`}
                          className="border border-line px-2.5 py-2 text-[0.8125rem] text-ink transition-colors hover:border-ink hover:bg-paper"
                        >
                          {c.name}
                        </a>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
