"use client";

import { useLayoutEffect, useRef } from "react";
import { content } from "@/data/content";
import { site, whatsappHref } from "@/data/site";
import { revealIn } from "@/lib/anim/reveal";
import { Phone } from "@/components/icons";

/**
 * Paketi + CTA odmah nakon Radova.
 *
 * Nijedna cifra: Petar 2026-09-14 ne želi da se igdje vidi točna cijena.
 * Kočnicu "koliko košta" sada skidaju tri paketa opisana poslom vlasnika
 * (ne brojem stranica) i obećanje da cijena stiže napismeno, nakon provjere.
 *
 * Stoji ovdje jer 3,2 ekrana dokaza prije njega inače završe u ništa —
 * ovo je trenutak najveće želje na cijeloj stranici.
 */
export default function Pricing() {
  const scope = useRef<HTMLElement>(null);
  const { pricing } = content;

  useLayoutEffect(() => {
    if (!scope.current) return;
    return revealIn(scope.current);
  }, []);

  return (
    <section
      ref={scope}
      id="pricing"
      className="scroll-mt-16 border-t border-line py-16 sm:py-20 lg:py-24"
    >
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14" data-reveal-group>
          <div className="lg:col-span-6">
            <h2 className="eyebrow caret block" data-reveal>
              {pricing.eyebrow}
            </h2>

            <p
              className="mt-4 max-w-[18ch] font-display text-[clamp(2rem,7.5vw,3.25rem)] font-extrabold leading-[0.98] tracking-[-0.03em]"
              data-reveal
            >
              {pricing.heading}
            </p>

            {/* Paketi nisu slijed, pa nemaju brojeve — samo imena */}
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {pricing.packages.map((pk) => (
                <li key={pk.name} className="py-5" data-reveal>
                  <p className="font-display text-xl font-extrabold tracking-[-0.02em]">{pk.name}</p>
                  <p className="mt-1.5 max-w-[46ch] text-[1.0625rem] leading-relaxed text-muted">
                    {pk.body}
                  </p>
                </li>
              ))}
            </ul>

            <p className="mt-5 text-[0.9375rem] text-muted" data-reveal>
              {pricing.extra}
            </p>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <p
              className="max-w-[38ch] border-l-2 border-rust pl-4 text-[1.0625rem] leading-relaxed"
              data-reveal
            >
              {pricing.reassure}
            </p>
            <p className="mt-4 max-w-[38ch] pl-4 text-[0.9375rem] leading-relaxed text-muted" data-reveal>
              {pricing.timeline}
            </p>

            {/* Hvata kupca na vrhuncu želje, umjesto da ga šalje pet ekrana niže */}
            <div className="mt-9 border-t border-line pt-7" data-reveal>
              <p className="font-display text-xl font-extrabold tracking-[-0.02em]">
                {content.workCta.heading}
              </p>
              <p className="mt-1.5 text-[0.9375rem] text-muted">{content.workCta.body}</p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row" data-cta>
                {whatsappHref && (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary justify-center sm:justify-start"
                  >
                    {content.book.whatsappLabel}
                  </a>
                )}
                <a
                  href={`tel:${site.phone}`}
                  className="btn btn-ghost justify-center sm:justify-start"
                >
                  <Phone className="h-4 w-4" />
                  {content.book.callLabel}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
