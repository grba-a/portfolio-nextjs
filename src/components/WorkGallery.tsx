"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { content } from "@/data/content";
import { work, type WorkItem } from "@/data/work";
import Modal from "@/components/Modal";
import { ArrowUpRight } from "@/components/icons";

/**
 * /work — svi radovi kao mreža kartica; klik otvara popup s detaljima.
 *
 * Zašto popup, a ne beskrajni scroll (Petar, 2026-09-15): vlasnik bira
 * što ga zanima, vidi stranicu i odmah ima gumb za živu stranicu.
 *
 * - svaki popup ima vlastiti link (/work#slug) — može se poslati klijentu
 * - strelice i tipke ←/→ listaju projekte bez zatvaranja
 * - popup je nativni <dialog> (Modal): fokus, Escape, zaključan scroll
 * - "tall" snimka u okviru kroz koji se skrola: više od jednog ekrana
 */
export default function WorkGallery() {
  const { workPage: t, work: w } = content;
  const [open, setOpen] = useState<number | null>(null);

  // Link /work#slug otvara taj projekt; zatvaranje briše hash
  useEffect(() => {
    const fromHash = () => {
      const i = work.findIndex((x) => `#${x.slug}` === window.location.hash);
      setOpen(i >= 0 ? i : null);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const show = (i: number | null) => {
    setOpen(i);
    const url = i === null ? window.location.pathname : `#${work[i].slug}`;
    window.history.replaceState(null, "", url);
  };
  const step = (d: number) => open !== null && show((open + d + work.length) % work.length);

  const item: WorkItem | null = open === null ? null : work[open];

  return (
    <>
      <ul className="grid gap-x-6 gap-y-12 md:grid-cols-2">
        {work.map((it, i) => (
          <li key={it.slug}>
            <button
              type="button"
              onClick={() => show(i)}
              aria-label={`${it.name} — ${t.open}`}
              className="group block w-full text-left transition-transform duration-150 active:scale-[0.99]"
            >
              <span className="relative block aspect-[16/10] overflow-hidden rounded-[22px] border border-line-2 bg-card shadow-[0_30px_60px_-30px_rgb(0_0_0/0.9)]">
                <Image
                  src={it.shot}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-500 ease-out [@media(hover:hover)]:group-hover:scale-[1.02]"
                />
              </span>
              <span className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="tnum text-sm text-fg-3">{it.index}</span>
                <span className="text-sm text-fg-3">{it.kind}</span>
              </span>
              <span className="mt-2 block text-[1.75rem] font-semibold leading-[1.05] tracking-[-0.035em]">
                {it.name}
              </span>
              <span className="mt-2 block max-w-[46ch] text-[0.95rem] leading-relaxed text-fg-2">
                {it.outcome}
              </span>
              <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-fg-2">
                <span
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 rounded-full ${it.status === "live" ? "bg-live" : "bg-dev"}`}
                />
                {it.status === "live" ? w.statusLive : w.statusDev}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Modal open={item !== null} onClose={() => show(null)} label={item?.name ?? t.title} wide>
        {item && (
          <div
            className="grid gap-6 p-5 md:grid-cols-[1.1fr_1fr] md:gap-8 md:p-7"
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") step(1);
              if (e.key === "ArrowLeft") step(-1);
            }}
          >
            {/* Dulja snimka u okviru kroz koji se skrola */}
            <div className="max-h-[46vh] overflow-y-auto rounded-[16px] border border-line-2 bg-void md:max-h-[64vh]" tabIndex={0} aria-label={t.preview}>
              <Image
                src={item.shot.replace(".webp", "-tall.webp")}
                alt={`${item.name} — ${item.description}`}
                width={900}
                height={1600}
                sizes="(max-width: 768px) 92vw, 480px"
                className="h-auto w-full"
              />
            </div>

            <div className="flex flex-col">
              <p className="flex flex-wrap items-baseline gap-x-3 text-sm text-fg-3">
                <span className="tnum">{item.index}</span>
                {item.kind}
              </p>
              <p className="mt-2 text-[clamp(1.875rem,6vw,2.5rem)] font-semibold leading-[1] tracking-[-0.04em]">
                {item.name}
              </p>
              <p className="mt-4 text-fg-2">{item.description}</p>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-fg">{item.outcome}</p>
              {item.tags.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <li key={tag} className="chip">
                      {tag}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  {w.visit}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <span className="text-sm text-fg-3">
                  {item.status === "live" ? w.statusLive : w.statusDev}
                </span>
                <span className="ml-auto flex gap-2">
                  {([-1, 1] as const).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => step(d)}
                      aria-label={d === 1 ? t.next : t.prev}
                      className="grid h-11 w-11 place-items-center rounded-full border border-line-2 transition-transform duration-150 active:scale-95"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d={d === 1 ? "m9 18 6-6-6-6" : "m15 18-6-6 6-6"} />
                      </svg>
                    </button>
                  ))}
                </span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
