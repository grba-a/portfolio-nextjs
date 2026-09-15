"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { content } from "@/data/content";
import { site } from "@/data/site";
import { revealIn } from "@/lib/anim/reveal";

/**
 * O meni.
 *
 * Tekst lijevo, čovjek desno (Petar, 2026-09-15). U desnom stupcu je okvir
 * za portret bez pozadine, a ispod njega pločica s ulogom pa imenom — uloga
 * gore jer kupac prvo kupuje ulogu, tek onda ime.
 *
 * Certifikati su jedan redak s poveznicom na CV, ne zid od 12 čipova: nazivi
 * poput "Apps" i "AI Shopping" vlasniku konobe ne znače ništa, a zid ga
 * prebacuje iz kupca u poslodavca koji čita životopis.
 */

/**
 * Portret još ne postoji. Kad Petar dobije snimku BEZ POZADINE (png/webp s
 * prozirnošću), spremi je u `public/` i upiši putanju ovdje — okvir je već
 * složen za figuru koja stoji na dnu kadra.
 */
const PORTRAIT: string | null = null;

/** Prazan okvir smije se vidjeti samo lokalno; u produkciji ostaje pločica. */
const SHOW_FRAME = PORTRAIT !== null || process.env.NODE_ENV === "development";

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
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-16">
          <div className="max-w-3xl lg:col-span-7" data-reveal-group>
            <h2 className="eyebrow caret block" data-reveal>
              {about.eyebrow}
            </h2>
            <p
              className="mt-4 font-display text-[clamp(2.25rem,9vw,4.25rem)] font-extrabold leading-[0.95] tracking-[-0.035em]"
              data-reveal
            >
              {about.heading}
            </p>

            <div className="mt-8 max-w-[62ch] space-y-4 text-[1.0625rem] leading-relaxed text-muted sm:mt-10">
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

          {/* Čovjek iza zipa: okvir za portret, pa pločica preklopljena preko
              njegova donjeg ruba. Na mobitelu ide ispod teksta, uži. */}
          <figure
            className="max-w-[17rem] lg:col-span-4 lg:col-start-9 lg:max-w-none lg:self-end"
            data-reveal-group
          >
            {SHOW_FRAME && (
              <div
                data-reveal
                className="relative aspect-[4/5] overflow-hidden rounded-[22px] border border-line bg-limestone-2 shadow-[0_34px_70px_-34px_rgba(20,17,14,0.55)]"
              >
                {/* Pruge iz logotipa, tek toliko da se ne vidi prazan kvadrat */}
                <svg aria-hidden="true" className="absolute inset-0 h-full w-full text-ink/6">
                  <defs>
                    <pattern
                      id="about-stripes"
                      width="11"
                      height="11"
                      patternUnits="userSpaceOnUse"
                      patternTransform="rotate(45)"
                    >
                      <line x1="0" y1="0" x2="0" y2="11" stroke="currentColor" strokeWidth="2.4" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#about-stripes)" />
                </svg>

                {/* Disk iza figure: daje portretu leđa i drži pogled u sredini */}
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-[11%] h-[62%] w-[84%] -translate-x-1/2 rounded-full bg-limestone"
                />
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-[11%] h-[62%] w-[84%] -translate-x-1/2 rounded-full bg-rust/8"
                />

                {PORTRAIT ? (
                  <>
                    {/* Sjena pod nogama — bez nje izrezana figura lebdi */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-[16%] bottom-[5%] h-5 rounded-[50%] bg-ink/25 blur-md"
                    />
                    <Image
                      src={PORTRAIT}
                      alt={about.portraitAlt}
                      fill
                      sizes="(max-width: 1024px) 17rem, 28vw"
                      className="object-contain object-bottom"
                    />
                  </>
                ) : (
                  /* Mjesto za figuru: obris, ne siva ikona */
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 100 125"
                    className="absolute inset-0 h-full w-full text-ink/12"
                  >
                    <circle cx="50" cy="52" r="15" fill="currentColor" />
                    <path
                      d="M18 125c0-21 14-35 32-35s32 14 32 35Z"
                      fill="currentColor"
                    />
                  </svg>
                )}

                {/* Unutarnji rub: okvir izgleda kao okvir, ne kao div */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[22px] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_-40px_60px_-40px_rgba(20,17,14,0.35)]"
                />
              </div>
            )}

            <figcaption
              className={`relative z-10 inline-flex flex-col rounded-[14px] border border-line bg-limestone px-5 py-4 shadow-[0_16px_34px_-20px_rgba(20,17,14,0.55)] ${
                SHOW_FRAME ? "-mt-7 ml-5" : ""
              }`}
              data-reveal
            >
              <span className="text-sm font-semibold text-rust-ink">{about.role}</span>
              <span className="mt-1 font-display text-2xl font-extrabold tracking-[-0.02em] text-ink">
                {about.name}
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
