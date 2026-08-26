"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { content } from "@/data/content";
import { certs, site } from "@/data/site";
import { revealIn } from "@/lib/anim/reveal";
import { ArrowUpRight } from "@/components/icons";
import Modal from "@/components/Modal";

/**
 * O meni + certifikati.
 *
 * Portret je namjerno malen. Jedina raspoloživa fotografija je slab noćni
 * kadar; Petar planira profesionalno snimanje, a do tada je bolje da ne
 * nosi sekciju. Ista datoteka je i na /cv da oba mjesta prikazuju istu osobu.
 * Kad stigne bolja: zamijeni public/me.webp, ništa drugo se ne dira.
 *
 * Certifikati su prije bili 12 slika u karuselu utrostručenom na 36
 * slikovnih elemenata — nijedna se nije učitala, a dokument od 1270px
 * je na mobitelu ionako nečitljiv. Sada su tekstualni čipovi koji vode
 * na stvarni certifikat: nula kilobajta dok netko ne klikne, a tvrdnja
 * postaje provjeriva. Otvaraju se u popupu, ne u novoj kartici — prije je
 * klik na dokaz odvodio kupca s prodajne stranice.
 */
export default function About() {
  const scope = useRef<HTMLElement>(null);
  const [cert, setCert] = useState<(typeof certs)[number] | null>(null);

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
          <h2 className="eyebrow caret block" data-reveal>
            {content.about.eyebrow}
          </h2>
          <p
            className="mt-4 font-display text-[clamp(2.25rem,9vw,4.25rem)] font-extrabold leading-[0.95] tracking-[-0.035em]"
            data-reveal
          >
            {content.about.heading}
          </p>
        </header>

        <div className="mt-12 grid gap-12 sm:mt-16 lg:grid-cols-12 lg:gap-16">
          {/* Bio */}
          <div className="lg:col-span-6" data-reveal-group>
            <div
              className="relative mb-7 aspect-square w-24 overflow-hidden rounded-[4px] border border-line bg-limestone-2 sm:w-28"
              data-reveal
            >
              <Image
                src="/me.webp"
                alt="Petar Grbić"
                fill
                sizes="112px"
                priority
                className="object-cover"
              />
            </div>

            <div className="space-y-4 text-[1.0625rem] leading-relaxed text-muted">
              <p data-reveal>{content.about.p1}</p>
              <p data-reveal>{content.about.p2}</p>
              <p data-reveal>{content.about.p2b}</p>
            </div>

            <p
              className="mt-7 max-w-[38ch] border-l-2 border-rust pl-4 text-[1.0625rem] leading-relaxed text-ink"
              data-reveal
            >
              {content.about.p3}
            </p>

            {/* Nova kartica: inače kupac ode s prodajne stranice u dokument
                koji ga prebacuje iz dobavljača u kandidata za posao. */}
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
                        <button
                          key={c.file}
                          type="button"
                          onClick={() => setCert(c)}
                          title={`${c.issuer} ${c.name} — view certificate`}
                          className="inline-flex min-h-11 items-center border border-line px-3 text-[0.8125rem] text-ink transition-colors hover:border-ink hover:bg-paper"
                        >
                          {c.name}
                        </button>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Dokaz se gleda ovdje, ne u novoj kartici. Slika se učita tek
          kad se popup otvori. */}
      <Modal
        open={cert !== null}
        onClose={() => setCert(null)}
        label={cert ? `${cert.issuer} — ${cert.name}` : "Certificate"}
        wide
      >
        {cert && (
          <Image
            src={`/certs/${cert.file}.png`}
            alt={`${cert.issuer} ${cert.name} certificate issued to Petar Grbić`}
            width={1270}
            height={980}
            className="h-auto w-full"
          />
        )}
      </Modal>
    </section>
  );
}
