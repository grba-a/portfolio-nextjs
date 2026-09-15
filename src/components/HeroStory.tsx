"use client";

import { useEffect, useRef, useState } from "react";
import { content } from "@/data/content";
import { whatsappHref } from "@/data/site";
import FreeMark from "@/components/FreeMark";

/**
 * Priča u pet poteza — špil u heroju, ali na kartama nisu snimke stranica
 * nego scene nacrtane kodom. Karta koja dođe na vrh nacrta svoju scenu;
 * ostale čekaju gotove u dubini. Zadnja je gumb.
 *
 * Redoslijed prodaje (Petar, 2026-09-15): prvo nešto besplatno (provjera),
 * pa edukacija o postupku, pa naplata. Ovaj špil je taj srednji korak.
 *
 * Mehanika je iz starog HeroDecka (CSS 3D, sam se prelistava, prst,
 * kotačić, nagib za mišem), ali BEZ `ready` stanja: raspored je isti na
 * serveru i u pregledniku, pa se hero više ne preslaže nakon hidracije.
 * Bez slika: scene su SVG, pa nestaje i najveći teret LCP-a.
 */

const DUR = 5200;
const CTA_DUR = 9000;

/* Crteži: tinta (.k) za predmete, rust (.r) za ono što provjera označi.
   --d je kašnjenje poteza, --l njegovo trajanje. Statični nizovi, bez
   korisničkih podataka — zato smiju kroz dangerouslySetInnerHTML. */
/** Natpisi unutar crteža — engleski na /, hrvatski na /hr */
export type DrawLabels = { you: string; call: string; website: string; book: string };
const EN_LABELS: DrawLabels = { you: "you?", call: "Call", website: "Website", book: "Book now" };

const scenes = (l: DrawLabels) => [
  // 1 — netko upravo traži
  '<rect class="k draw" style="--d:0s;--l:.7s" pathLength="1" x="110" y="12" width="100" height="214" rx="16"/>' +
    '<path class="k draw" style="--d:.35s;--l:.2s" pathLength="1" d="M150 23h20"/>' +
    '<rect class="k draw" style="--d:.45s;--l:.4s" pathLength="1" x="121" y="38" width="78" height="20" rx="10"/>' +
    '<circle class="k draw" style="--d:.7s;--l:.25s" pathLength="1" cx="132" cy="48" r="4.5"/>' +
    '<path class="k draw" style="--d:.8s;--l:.15s" pathLength="1" d="M135.5 51.5l3.5 3.5"/>' +
    '<path class="k draw" style="--d:.9s;--l:.3s" pathLength="1" d="M144 48h22"/>' +
    '<path class="k draw" style="--d:1.1s;--l:.2s" pathLength="1" d="M169 48h14"/>' +
    '<rect class="k draw" style="--d:1.2s;--l:.35s" pathLength="1" x="121" y="68" width="78" height="32" rx="5"/>' +
    '<path class="k draw" style="--d:1.35s;--l:.25s" pathLength="1" d="M128 79h44M128 89h30"/>' +
    '<rect class="k draw" style="--d:1.45s;--l:.35s" pathLength="1" x="121" y="108" width="78" height="32" rx="5"/>' +
    '<path class="k draw" style="--d:1.6s;--l:.25s" pathLength="1" d="M128 119h40M128 129h26"/>' +
    '<rect class="k draw" style="--d:1.7s;--l:.35s" pathLength="1" x="121" y="148" width="78" height="32" rx="5"/>' +
    '<path class="k draw" style="--d:1.85s;--l:.25s" pathLength="1" d="M128 159h46M128 169h22"/>' +
    '<ellipse class="r draw" style="--d:2.2s;--l:.6s" pathLength="1" cx="160" cy="124" rx="52" ry="24"/>' +
    '<path class="r draw" style="--d:2.7s;--l:.3s" pathLength="1" d="M214 112c10-6 18-14 22-24"/>' +
    '<text class="pop" style="--d:2.95s" x="226" y="80">' + l.you + '</text>',
  // 2 — Found: Google profil ne vodi na stranicu
  '<rect class="k draw" style="--d:0s;--l:.6s" pathLength="1" x="16" y="30" width="136" height="180" rx="12"/>' +
    '<path class="k draw" style="--d:.2s;--l:.6s" pathLength="1" d="M16 104c40-12 72 22 136 6"/>' +
    '<path class="k draw" style="--d:.3s;--l:.6s" pathLength="1" d="M66 30c6 60-8 120 20 180"/>' +
    '<g class="pin"><path class="r draw" style="--d:.5s;--l:.5s" pathLength="1" d="M92 96c0-13 10-22 22-22s22 9 22 22c0 18-22 38-22 38S92 114 92 96z"/><circle class="r draw" style="--d:.8s;--l:.3s" pathLength="1" cx="114" cy="96" r="7"/></g>' +
    '<rect class="k draw" style="--d:.7s;--l:.5s" pathLength="1" x="170" y="46" width="134" height="150" rx="10"/>' +
    '<path class="k draw" style="--d:1s;--l:.3s;stroke-width:4" pathLength="1" d="M184 70h78"/>' +
    '<path class="k draw" style="--d:1.15s;--l:.3s" pathLength="1" d="M184 88h96M184 102h64"/>' +
    '<rect class="k draw" style="--d:1.35s;--l:.3s" pathLength="1" x="184" y="140" width="48" height="24" rx="12"/>' +
    '<rect class="k draw" style="--d:1.5s;--l:.3s" pathLength="1" x="238" y="140" width="56" height="24" rx="12"/>' +
    '<text class="pop" style="--d:1.6s" x="197" y="155.5">' + l.call + '</text>' +
    '<text class="pop" style="--d:1.7s" x="245" y="155.5">' + l.website + '</text>' +
    '<ellipse class="r draw" style="--d:2.1s;--l:.55s" pathLength="1" cx="266" cy="152" rx="40" ry="21"/>' +
    '<path class="r draw" style="--d:2.6s;--l:.2s" pathLength="1" d="M292 118l10 10M302 118l-10 10"/>',
  // 3 — Trusted: stranica
  '<rect class="k draw" style="--d:0s;--l:.7s" pathLength="1" x="36" y="20" width="248" height="200" rx="12"/>' +
    '<path class="k draw" style="--d:.3s;--l:.4s" pathLength="1" d="M36 44h248"/>' +
    '<circle class="k draw" style="--d:.4s;--l:.2s" pathLength="1" cx="51" cy="32" r="3"/><circle class="k draw" style="--d:.45s;--l:.2s" pathLength="1" cx="62" cy="32" r="3"/><circle class="k draw" style="--d:.5s;--l:.2s" pathLength="1" cx="73" cy="32" r="3"/>' +
    '<rect class="k draw" style="--d:.6s;--l:.45s" pathLength="1" x="52" y="58" width="216" height="72" rx="5"/>' +
    '<path class="k draw" style="--d:.9s;--l:.6s" pathLength="1" d="M62 122l40-34 28 22 30-28 98 40"/>' +
    '<circle class="k draw" style="--d:1.1s;--l:.3s" pathLength="1" cx="236" cy="78" r="8"/>' +
    '<path class="k draw" style="--d:1.25s;--l:.35s;stroke-width:5" pathLength="1" d="M52 148h150"/>' +
    '<path class="k draw" style="--d:1.4s;--l:.3s" pathLength="1" d="M52 164h104"/>' +
    '<rect class="k draw" style="--d:1.55s;--l:.35s" pathLength="1" x="52" y="178" width="92" height="26" rx="13"/>' +
    '<text class="pop" style="--d:1.75s" x="73" y="195">' + l.book + '</text>' +
    '<path class="r draw" style="--d:2.1s;--l:.5s" pathLength="1" d="M54 214c26-4 56-3 88-1"/>' +
    '<path class="r draw" style="--d:2.5s;--l:.35s" pathLength="1" d="M214 150l8 9 18-20"/>',
  // 4 — Booked: put do rezervacije pukne, pa se spoji
  '<circle class="k draw" style="--d:0s;--l:.45s" pathLength="1" cx="48" cy="120" r="26"/>' +
    '<circle class="k draw" style="--d:.2s;--l:.25s" pathLength="1" cx="48" cy="112" r="7"/>' +
    '<path class="k draw" style="--d:.3s;--l:.3s" pathLength="1" d="M35 134c4-10 22-10 26 0"/>' +
    '<rect class="k draw" style="--d:.45s;--l:.4s" pathLength="1" x="126" y="96" width="66" height="48" rx="8"/>' +
    '<path class="k draw" style="--d:.7s;--l:.25s" pathLength="1" d="M136 112h40M136 124h28"/>' +
    '<rect class="k draw" style="--d:.8s;--l:.4s" pathLength="1" x="236" y="94" width="60" height="52" rx="8"/>' +
    '<path class="k draw" style="--d:1s;--l:.3s" pathLength="1" d="M236 110h60M250 86v14M282 86v14"/>' +
    '<path class="k draw" style="--d:1.2s;--l:.35s" pathLength="1" d="M76 120h48"/>' +
    '<path class="k draw" style="--d:1.45s;--l:.2s" pathLength="1" d="M194 120h14"/>' +
    '<path class="k draw" style="--d:1.55s;--l:.2s" pathLength="1" d="M222 120h12"/>' +
    '<path class="r draw" style="--d:1.8s;--l:.35s" pathLength="1" d="M211 108l-5 8h9l-5 8"/>' +
    '<path class="r draw" style="--d:2.6s;--l:.4s" pathLength="1" d="M194 131h40"/>' +
    '<path class="r draw" style="--d:3s;--l:.35s" pathLength="1" d="M252 127l8 8 16-17"/>',
  // 5 — sustav: sve tri stvari spojene, rust kvačica
  '<path class="k draw" style="--d:0s;--l:.45s" pathLength="1" d="M148 44c0-9 7-15 16-15s16 6 16 15c0 13-16 27-16 27s-16-14-16-27z"/>' +
    '<rect class="k draw" style="--d:.2s;--l:.45s" pathLength="1" x="60" y="150" width="54" height="62" rx="7"/>' +
    '<path class="k draw" style="--d:.4s;--l:.25s" pathLength="1" d="M70 168h34M70 180h24"/>' +
    '<rect class="k draw" style="--d:.35s;--l:.45s" pathLength="1" x="206" y="152" width="58" height="54" rx="7"/>' +
    '<path class="k draw" style="--d:.55s;--l:.25s" pathLength="1" d="M206 168h58M220 144v14M250 144v14"/>' +
    '<path class="k draw" style="--d:.8s;--l:.45s" pathLength="1" d="M152 76L100 146"/>' +
    '<path class="k draw" style="--d:1s;--l:.45s" pathLength="1" d="M120 182h80"/>' +
    '<path class="k draw" style="--d:1.2s;--l:.45s" pathLength="1" d="M226 146L176 76"/>' +
    '<path class="r draw" style="--d:1.5s;--l:.45s;stroke-width:4.5" pathLength="1" d="M140 120l14 14 28-30"/>',
];

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export type Story = {
  label: string;
  prev: string;
  next: string;
  scenes: readonly { title: string; free: string | null; body: string; cta: string | null }[];
};

export default function HeroStory({
  story = content.story,
  ctaHref = whatsappHref,
  labels = EN_LABELS,
}: {
  story?: Story;
  ctaHref?: string | null;
  labels?: DrawLabels;
}) {
  const SCENES = scenes(labels);
  const n = story.scenes.length;
  const [active, setActive] = useState(0);
  const [turn, setTurn] = useState(0); // svaka promjena ponovno pokrene crtež i traku
  const [lap, setLap] = useState(0); // traka napretka i timer kreću zajedno
  const tilt = useRef<HTMLDivElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const startX = useRef<number | null>(null);
  const swiped = useRef(false); // da klik nakon povlačenja ne prelista još jednom

  const go = (i: number) => {
    setActive(((i % n) + n) % n);
    setTurn((t) => t + 1);
    setLap((l) => l + 1);
  };

  // Sam se prelistava u krug (Petar: "da nije statičan"); na gumbu stoji dulje.
  // Miš nad špilom NE pauzira i ne resetira ništa (Petar, 2026-09-15).
  useEffect(() => {
    if (reduced()) return;
    const id = setTimeout(() => {
      setActive((a) => (a + 1) % n);
      setTurn((t) => t + 1);
      setLap((l) => l + 1);
    }, active === n - 1 ? CTA_DUR : DUR);
    return () => clearTimeout(id);
  }, [active, lap, n]);

  /* Kotačić i trackpad listaju karte. Okomiti pomak NE otima scroll —
     stranica klizi dalje, a špil se usput prelistava. */
  useEffect(() => {
    const el = host.current;
    if (!el || reduced()) return;
    /* Jedan pokret = jedna scena (Petar, 2026-09-15: "ne dvije odjednom ako
       jače zascrollam"). Trackpad nakon podizanja prstiju još ~1 s šalje
       inercijske evente; brava se otpusti tek kad 450 ms nema nijednog. */
    let locked = false;
    let idle: ReturnType<typeof setTimeout> | undefined;
    const onWheel = (e: WheelEvent) => {
      const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const delta = horizontal ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 4) return;
      if (horizontal) e.preventDefault();
      clearTimeout(idle);
      idle = setTimeout(() => (locked = false), 450);
      if (locked) return;
      locked = true;
      setActive((i) => (((i + (delta > 0 ? 1 : -1)) % n) + n) % n);
      setTurn((t) => t + 1);
      setLap((l) => l + 1);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      clearTimeout(idle);
      el.removeEventListener("wheel", onWheel);
    };
  }, [n]);

  /** Pomak karte od vrha, po najkraćem putu (špil je u krug). */
  const offsetOf = (i: number) => {
    let d = i - active;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  };

  /** Blagi nagib za mišem — samo precizni pokazivač. */
  const onMove = (e: React.PointerEvent) => {
    if (!tilt.current || e.pointerType !== "mouse" || reduced()) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    tilt.current.style.transform = `rotateY(${x * 9}deg) rotateX(${-y * 6}deg)`;
  };

  const scene = story.scenes[active];
  const last = active === n - 1;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={story.label}
      className="w-full"
      onPointerLeave={() => {
        if (tilt.current) tilt.current.style.transform = "";
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") { go(active + 1); e.preventDefault(); }
        if (e.key === "ArrowLeft") { go(active - 1); e.preventDefault(); }
      }}
    >
      <div
        ref={host}
        className="relative h-[calc(min(84vw,460px)*0.75_+_26px)] [perspective:1100px] [touch-action:pan-y] lg:aspect-[4/3] lg:h-auto"
        onPointerDown={(e) => {
          startX.current = e.clientX;
          swiped.current = false;
        }}
        onPointerUp={(e) => {
          if (startX.current === null) return;
          const dx = e.clientX - startX.current;
          if (Math.abs(dx) > 40) {
            swiped.current = true;
            go(active + (dx < 0 ? 1 : -1));
          }
          startX.current = null;
        }}
        onPointerCancel={() => (startX.current = null)}
        onPointerMove={onMove}
      >
        <div
          ref={tilt}
          className="absolute inset-0 transition-transform duration-500 ease-out [transform-style:preserve-3d] motion-reduce:transition-none"
        >
          {SCENES.map((svg, i) => {
            const d = offsetOf(i);
            const abs = Math.abs(d);
            const onTop = d === 0;
            return (
              <div
                key={i}
                aria-hidden="true"
                // Dodir na gornju kartu = sljedeća scena (na mobitelu nema strelica);
                // dodir na kartu ispod je digne na vrh
                onClick={() => {
                  if (swiped.current) return;
                  go(onTop ? active + 1 : i);
                }}
                style={{
                  // Transform samo odavde — Tailwind transform klase bi se otimale
                  transform:
                    `translateX(${onTop ? 0 : -5 - abs * 4}%)` +
                    ` translateY(${abs * 10}px)` +
                    ` translateZ(${-abs * 65}px)` +
                    ` rotate(${onTop ? 0 : -2.5 - abs * 2}deg)`,
                  opacity: abs > 2 ? 0 : onTop ? 1 : 0.8,
                  zIndex: 20 - abs,
                }}
                className={
                  "absolute inset-x-0 top-0 mx-auto aspect-[4/3] w-[min(84vw,460px)] cursor-pointer overflow-hidden rounded-[14px] border border-line bg-paper shadow-[0_18px_40px_-22px_rgba(20,17,14,0.55)] transition-[transform,opacity] duration-[620ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none lg:w-full"
                }
              >
                <svg
                  // Novi ključ kad karta dođe na vrh = crtež kreće ispočetka
                  key={onTop ? `on-${turn}` : "idle"}
                  className={"st-scene" + (onTop ? " is-drawing" : "")}
                  viewBox="0 0 320 240"
                  dangerouslySetInnerHTML={{ __html: svg }}
                />
              </div>
            );
          })}

          {/* Zadnja scena: gumb je NA karti, ne ispod špila (Petar,
              2026-09-15). Veo utiša crtež, gumb uskoči i pulsira.
              `pointer-events-none` na velu: klik pored gumba i dalje
              pripada karti ispod (= sljedeća scena). */}
          {last && scene.cta && ctaHref && (
            <div
              className="st-veil pointer-events-none absolute inset-x-0 top-0 z-30 mx-auto grid aspect-[4/3] w-[min(84vw,460px)] place-items-center rounded-[14px] lg:w-full"
              style={{ transform: "translateZ(1px)" }}
            >
              <span className="st-cta pointer-events-auto">
                <a
                  href={ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary justify-center"
                >
                  {scene.cta}
                </a>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Riječi ispod špila. Visina rezervirana za najdulji opis i red s
          gumbom, pa se stranica ispod ne pomiče dok se špil vrti (CLS). */}
      {/* Mobitel: samo trake i naslov scene (KISS). Opis i strelice od lg. */}
      <div className="mt-4 lg:mt-8">
        <div className="grid grid-cols-5 gap-1.5" aria-hidden="true">
          {story.scenes.map((_, i) => (
            <span
              key={`${i}-${i === active ? lap : "x"}`}
              className={"st-bar" + (i < active ? " is-done" : i === active ? " is-now" : "")}
              style={i === active ? ({ "--st-dur": `${last ? CTA_DUR : DUR}ms` } as React.CSSProperties) : undefined}
            >
              <i />
            </span>
          ))}
        </div>

        <div key={turn} className="st-cap mt-3 min-h-[3.4rem] lg:mt-4 lg:min-h-[7.25rem]">
          <p className="hidden text-sm font-medium text-muted tabular-nums lg:block">
            {active + 1} / {n}
          </p>
          <p className="font-display text-[1.5rem] font-extrabold leading-[1.05] tracking-[-0.03em] lg:mt-1.5 lg:text-[2rem]">
            {scene.title}
            {scene.free && (
              <>
                {" "}
                <FreeMark delay="0.55s">{scene.free}</FreeMark>
              </>
            )}
          </p>
          <p className="mt-2 hidden max-w-[42ch] text-base leading-relaxed text-ink-2 lg:block">
            {scene.body}
          </p>
        </div>

        {/* Desktop: samo strelice. Gumb je otišao NA zadnju kartu, pa je
            špil viši i strelice se vide bez skrolanja (Petar, 2026-09-15). */}
        <div className="mt-3 hidden lg:flex lg:justify-end">
          <div className="flex gap-2">
            {(["prev", "next"] as const).map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={() => go(active + (dir === "next" ? 1 : -1))}
                aria-label={dir === "next" ? story.next : story.prev}
                className="grid h-11 w-11 place-items-center rounded-full border border-line-strong text-ink transition-transform duration-150 active:scale-95"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={dir === "next" ? "m9 18 6-6-6-6" : "m15 18-6-6 6-6"} />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
