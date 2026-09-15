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
      <ul className="grid gap-x-8 gap-y-12 md:grid-cols-2">
        {work.map((it, i) => (
          <li key={it.slug}>
            <button
              type="button"
              onClick={() => show(i)}
              aria-label={`${it.name} — ${t.open}`}
              className="group block w-full text-left transition-transform duration-150 active:scale-[0.99]"
            >
              <span className="relative block aspect-[16/10] overflow-hidden rounded-[14px] border border-line bg-limestone-2 shadow-[0_18px_40px_-26px_rgba(20,17,14,0.5)]">
                <Image
                  src={it.shot}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-500 ease-out [@media(hover:hover)]:group-hover:scale-[1.02]"
                />
              </span>
              <span className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="tnum text-sm text-rust-ink">{it.index}</span>
                <span className="text-sm text-muted">{it.kind}</span>
              </span>
              <span className="mt-2 block font-display text-[1.75rem] font-extrabold leading-[1] tracking-[-0.03em]">
                {it.name}
              </span>
              <span className="mt-2 block max-w-[46ch] text-[0.95rem] leading-relaxed text-muted">
                {it.outcome}
              </span>
              <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium">
                <span
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 rounded-full ${it.status === "live" ? "bg-rust" : "bg-line-strong"}`}
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
            <div className="max-h-[46vh] overflow-y-auto rounded-[12px] border border-line bg-limestone-2 md:max-h-[64vh]" tabIndex={0} aria-label={t.preview}>
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
              <p className="flex flex-wrap items-baseline gap-x-3 text-sm text-muted">
                <span className="tnum text-rust-ink">{item.index}</span>
                {item.kind}
              </p>
              <p className="mt-2 font-display text-[clamp(1.875rem,6vw,2.5rem)] font-extrabold leading-[0.98] tracking-[-0.03em]">
                {item.name}
              </p>
              <p className="mt-4 text-muted">{item.description}</p>
              <p className="mt-4 border-l-2 border-rust pl-4 text-[0.95rem] leading-relaxed">{item.outcome}</p>
              {item.tags.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <li key={tag} className="rounded-full border border-line px-3 py-1 text-[0.8125rem] text-muted">
                      {tag}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="btn btn-primary justify-center">
                  {w.visit}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <span className="text-sm text-muted">
                  {item.status === "live" ? w.statusLive : w.statusDev}
                </span>
                <span className="ml-auto flex gap-2">
                  {([-1, 1] as const).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => step(d)}
                      aria-label={d === 1 ? t.next : t.prev}
                      className="grid h-11 w-11 place-items-center rounded-full border border-line-strong transition-transform duration-150 active:scale-95"
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
