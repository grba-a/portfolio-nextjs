"use client";

import { useLayoutEffect, useRef } from "react";
import { content } from "@/data/content";
import { site, whatsappHref } from "@/data/site";
import { revealIn } from "@/lib/anim/reveal";
import { Phone } from "@/components/icons";

/**
 * Cijena + CTA odmah nakon Radova.
 *
 * Dvije stvari koje je stranica prešućivala, a bile su prve dvije kočnice
 * u glavi kupca: koliko košta i koliko traje. Tišina o cijeni se ne čita
 * kao neutralnost nego kao "skupo", pa čovjek ne zove da provjeri.
 *
 * Stoji ovdje jer 3,2 ekrana dokaza prije njega inače završe u ništa —
 * ovo je trenutak najveće želje na cijeloj stranici.
 */
export default function Pricing() {
  const scope = useRef<HTMLElement>(null);

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
              {content.pricing.eyebrow}
            </h2>

            <p
              className="mt-4 font-display text-[clamp(2.25rem,9vw,4rem)] font-extrabold leading-[0.95] tracking-[-0.035em]"
              data-reveal
            >
              {content.pricing.heading}
            </p>

            <p className="mt-5 max-w-[46ch] text-[1.0625rem] leading-relaxed text-muted" data-reveal>
              {content.pricing.body}
            </p>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <p
              className="max-w-[38ch] border-l-2 border-rust pl-4 text-[1.0625rem] leading-relaxed"
              data-reveal
            >
              {content.pricing.reassure}
            </p>
            <p className="mt-4 max-w-[38ch] pl-4 text-[0.9375rem] leading-relaxed text-muted" data-reveal>
              {content.pricing.timeline}
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
