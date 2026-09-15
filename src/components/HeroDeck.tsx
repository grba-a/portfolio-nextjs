"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { work } from "@/data/work";
import { prefersReducedMotion } from "@/lib/anim/gsap";
import { ArrowUpRight } from "@/components/icons";

/**
 * Špil radova u heroju — CSS 3D, bez biblioteke.
 *
 * Zamjenjuje ravnu traku koja je bila treće pojavljivanje istih četiriju
 * slika i na 250 px nečitljiva. Snimke su složene kao fizička mapa na stolu:
 * gornja ravna i čitljiva, ostale pomaknute i zaokrenute u dubinu.
 *
 * Trošak je što tri od četiri projekta nisu odmah vidljiva. To se ublažava
 * unutar samog izbora: špil se sam prelistava, klik ili fokus dižu bilo koju
 * karticu, a sekcija Radovi ispod prikazuje sve četiri u punim trakama.
 *
 * Bez natpisa i crtica ispod (odluka: hero je slika, ne popis) — nazivi žive
 * u `aria-label` svake kartice, pa čitač ekrana ništa ne gubi.
 *
 * Namjerno BEZ three.js: stranica je 579 KB / 60 ms, a WebGL bi dodao
 * ~170 KB i stalnu render petlju na uređaju s kojeg dolazi većina prometa.
 */
export default function HeroDeck() {
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const tilt = useRef<HTMLDivElement>(null);
  const wheelHost = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const startX = useRef<number | null>(null);

  // Bez JS-a špil ostaje obična vodoravna lista koja se skrola — hero
  // ne smije ovisiti o skripti. Interakcija se uključuje tek ovdje.
  useEffect(() => setReady(true), []);

  useEffect(() => {
    if (!ready || prefersReducedMotion()) return;
    const id = setInterval(() => {
      if (!paused.current) setActive((i) => (i + 1) % work.length);
    }, 5200);
    return () => clearInterval(id);
  }, [ready]);

  const go = (i: number) => setActive(((i % work.length) + work.length) % work.length);

  /**
   * Kotačić i trackpad nad špilom listaju kartice.
   *
   * Okomiti pomak NE otima scroll — stranica klizi dalje, a špil se usput
   * prelistava. Špil je u krug, pa bi hvatanje okomitog scrolla značilo da
   * korisnik nikad ne prođe hero.
   * Vodoravni pomak (trackpad) se zaustavlja, jer stranica ionako nema
   * vodoravni scroll.
   */
  useEffect(() => {
    const el = wheelHost.current;
    if (!el || !ready || prefersReducedMotion()) return;

    let last = 0;
    const onWheel = (e: WheelEvent) => {
      const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const delta = horizontal ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 4) return;

      const now = e.timeStamp;
      if (now - last < 320) {
        if (horizontal) e.preventDefault();
        return;
      }
      last = now;

      paused.current = true;
      setActive((i) => ((i + (delta > 0 ? 1 : -1)) % work.length + work.length) % work.length);
      if (horizontal) e.preventDefault();
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [ready]);

  /** Pomak kartice od vrha špila, po najkraćem putu (špil je u krug). */
  const offsetOf = (i: number) => {
    let d = i - active;
    if (d > work.length / 2) d -= work.length;
    if (d < -work.length / 2) d += work.length;
    return d;
  };

  /** Špil se blago naginje za mišem. Samo precizni pokazivač — na dodiru
   *  nema hovera, a i prst već ima povlačenje. */
  const onMove = (e: React.PointerEvent) => {
    if (!tilt.current || e.pointerType !== "mouse" || prefersReducedMotion()) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    tilt.current.style.transform = `rotateY(${x * 9}deg) rotateX(${-y * 6}deg)`;
  };
  const resetTilt = () => {
    if (tilt.current) tilt.current.style.transform = "";
  };

  return (
    <div className="w-full">
      <div
        ref={wheelHost}
        className={
          ready
            // Od lg visinu diktira sama kartica (16:10 na širini stupca), ne
            // vw-formula: s fiksnom visinom je špil ili bio odrezan ili je
            // ispod njega ostajala prazna traka, ovisno o širini ekrana.
            ? "relative h-[clamp(190px,52vw,300px)] [perspective:1100px] [touch-action:pan-y] lg:aspect-[16/10] lg:h-auto"
            : "flex gap-3 overflow-x-auto"
        }
        onPointerDown={(e) => {
          paused.current = true;
          startX.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (startX.current === null) return;
          const dx = e.clientX - startX.current;
          if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1));
          startX.current = null;
        }}
        onPointerCancel={() => (startX.current = null)}
        onPointerMove={onMove}
        onPointerLeave={() => {
          paused.current = false;
          resetTilt();
        }}
        onMouseEnter={() => (paused.current = true)}
        onFocusCapture={() => (paused.current = true)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { go(active + 1); e.preventDefault(); }
          if (e.key === "ArrowLeft") { go(active - 1); e.preventDefault(); }
        }}
      >
        <div
          ref={tilt}
          className={
            ready
              ? "absolute inset-0 transition-transform duration-500 ease-out [transform-style:preserve-3d] motion-reduce:transition-none"
              : "contents"
          }
        >
          {work.map((item, i) => {
            const d = ready ? offsetOf(i) : 0;
            const abs = Math.abs(d);
            const onTop = d === 0;

            // Transform ide isključivo odavde. GSAP i Tailwind transform klase
            // se otimaju oko iste osi i element tiho ostane izvan kadra.
            const style = ready
              ? {
                  transform:
                    `translateX(${onTop ? 0 : -5 - abs * 4}%)` +
                    ` translateY(${abs * 10}px)` +
                    ` translateZ(${-abs * 65}px)` +
                    ` rotate(${onTop ? 0 : -2.5 - abs * 2}deg)`,
                  opacity: abs > 2 ? 0 : onTop ? 1 : 0.78,
                  filter: onTop ? "none" : "brightness(0.9)",
                  zIndex: 20 - abs,
                }
              : undefined;

            return (
              <a
                key={item.slug}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.name} — ${item.kind}`}
                draggable={false}
                style={style}
                // Fokus diže karticu na vrh. Crtice ispod špila su otišle, a
                // bile su jedini put do ostalih projekata za tipkovnicu —
                // sada tab radi isto, bez ijednog piksela u dizajnu.
                onFocus={() => {
                  paused.current = true;
                  if (ready && !onTop) go(i);
                }}
                // Klik na kartu ispod vrha je samo podiže. Bez natpisa nitko
                // ne zna kamo vodi tuđi rub, pa poveznica radi tek s vrha.
                onClick={(e) => {
                  if (ready && !onTop) {
                    e.preventDefault();
                    paused.current = true;
                    go(i);
                  }
                }}
                className={
                  (ready
                    ? "group absolute inset-x-0 top-0 mx-auto w-[min(74vw,460px)] transition-[transform,opacity,filter] duration-[620ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none lg:w-full lg:max-w-none "
                    : "relative w-[74vw] max-w-[420px] shrink-0 ") +
                  // NE dodavati `relative` u zajednički dio: kad je špil živ
                  // kartica MORA biti `absolute`, a Tailwind obje klase piše
                  // s istom specifičnošću — `relative` pobijedi i špil se
                  // raspadne u stupac.
                  "block aspect-[16/10] overflow-hidden rounded-[4px] border border-line bg-limestone-2 shadow-[0_18px_40px_-22px_rgba(20,17,14,0.55)]"
                }
              >
                <Image
                  src={item.shot}
                  alt={item.name}
                  width={760}
                  height={475}
                  sizes="(max-width: 1024px) 74vw, 60vw"
                  // Samo vrhnja karta je LCP: ona dobiva visok prioritet, ostale
                  // nizak, da ne dijele mrežu s njom (prije: 4 preloada, LCP ~4 s).
                  fetchPriority={i === 0 ? "high" : "low"}
                  // Špil se pomiče transformom, ne layoutom, pa WebKit nikad ne
                  // okine lijeno učitavanje i u Safariju ostanu prazne rupe.
                  loading="eager"
                  className="h-full w-full object-cover object-top"
                />

                {/* Jedini znak da je snimka poveznica — natpisa više nema.
                    Samo na vrhnjoj karti i samo na hover/fokus. */}
                {ready && onTop && (
                  <span className="pointer-events-none absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-ink/80 text-limestone opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
