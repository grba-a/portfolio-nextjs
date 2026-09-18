"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { WorkItem } from "@/data/work";

/**
 * Nagnute pločice sa snimkama radova (odluka 10A).
 *
 * Dodir (ili klik) ispravi pločicu i izvuče je naprijed; tek tada natpis
 * pokaže poveznicu na detalje. Na desktopu se pločica ispravi već pod mišem.
 * Položaji su zadani u postocima, pa raspored drži oblik na svakoj širini.
 */
const MOBILE = [
  { l: 2, t: 4, r: -14 },
  { l: 30, t: 0, r: -8 },
  { l: 55, t: 30, r: -3 },
  { l: 16, t: 42, r: -11 },
];

type Item = Pick<WorkItem, "slug" | "name" | "status"> & { kind: string; shot: string };

export default function WorkTiles({
  items,
  labels,
}: {
  items: Item[];
  labels: { live: string; dev: string; details: string };
}) {
  const [up, setUp] = useState<string | null>(null);

  return (
    <div className="relative h-[clamp(430px,125vw,560px)] [perspective:900px] sm:h-[600px] lg:h-[520px]">
      {items.map((w, i) => {
        const m = MOBILE[i % MOBILE.length];
        const isUp = up === w.slug;
        return (
          <div
            key={w.slug}
            className={`tile group absolute w-[44%] sm:w-[36%] lg:w-[23%] max-lg:[left:var(--l)] max-lg:[top:var(--t)] lg:[left:var(--dl)] lg:[top:var(--dt)] ${
              isUp
                ? "[transform:translateY(-10px)_scale(1.07)]"
                : "[transform:rotateX(14deg)_rotateZ(var(--rot))] [@media(hover:hover)]:hover:[transform:translateY(-6px)_rotateZ(0deg)_scale(1.03)]"
            }`}
            style={
              {
                "--l": `${m.l}%`,
                "--t": `${m.t}%`,
                "--dl": `${2 + i * 24.5}%`,
                "--dt": `${i % 2 ? 9 : 2}%`,
                "--rot": `${m.r}deg`,
                zIndex: isUp ? 20 : i + 1,
              } as React.CSSProperties
            }
          >
            <button
              type="button"
              onClick={() => setUp(isUp ? null : w.slug)}
              aria-pressed={isUp}
              aria-label={w.name}
              className="block aspect-[9/16] w-full overflow-hidden rounded-[18px] border border-line-2 bg-card shadow-[0_30px_50px_-18px_rgb(0_0_0/0.9),inset_0_1px_0_rgb(255_255_255/0.2)] transition-shadow duration-300 [@media(hover:hover)]:group-hover:shadow-[0_40px_70px_-18px_rgb(0_0_0/0.95),0_0_0_1px_rgb(255_255_255/0.35)]"
            >
              <Image
                src={w.shot}
                alt=""
                width={900}
                height={1600}
                sizes="(max-width: 640px) 44vw, (max-width: 1024px) 36vw, 280px"
                className="h-full w-full object-cover object-top"
              />
            </button>
            <div className="glass pointer-events-none absolute inset-x-2 bottom-2 grid gap-0.5 rounded-[14px] px-3 py-2.5 [--g-bg:rgb(12_12_14/0.55)]">
              <span className="text-[0.8125rem] font-semibold leading-tight tracking-[-0.015em] text-white">{w.name}</span>
              <span className="flex items-center gap-1.5 text-[0.6875rem] leading-tight text-white/70">
                <i
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 flex-none rounded-full ${w.status === "live" ? "bg-live" : "bg-dev"}`}
                />
                <span className="truncate">
                  {w.status === "live" ? labels.live : labels.dev} · {w.kind}
                </span>
              </span>
              {isUp && (
                <Link
                  href={`/work#${w.slug}`}
                  className="pointer-events-auto mt-1.5 text-[0.75rem] font-medium text-white underline underline-offset-4"
                >
                  {labels.details}
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
