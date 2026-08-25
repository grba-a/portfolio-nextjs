import Image from "next/image";
import { content } from "@/data/content";
import { work } from "@/data/work";
import { bookingHref } from "@/data/site";

/**
 * Hero. Server komponenta — nema stanja, cijeli intro je čisti CSS.
 *
 * Dva mehanizma, svaki radi na svojoj veličini:
 *  1. Naslov je maska — kroz slova klize prave snimke Petrovih stranica.
 *     Nosi wow na desktopu, gdje su slova dovoljno velika da se snimka čita.
 *  2. Traka snimki ispod — na mobitelu je ona glavno vizualno sidro,
 *     jer je čitljiva na 390px gdje maska postaje samo tekstura.
 *
 * GSAP-a ovdje namjerno NEMA: na heroju diže mobilni LCP,
 * a iste keyframes u CSS-u ga ne diraju.
 */
export default function Hero() {
  const { hero } = content;
  const reel = [...work, ...work]; // udvostručeno = petlja bez šava

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-24 sm:pt-32">
      <div className="shell flex flex-1 flex-col justify-center py-8 sm:py-10">
        <p className="eyebrow rise rise-1">{hero.eyebrow}</p>

        <h1 className="mt-4 text-[clamp(3.25rem,13.5vw,11rem)] sm:mt-7">
          <span className="line-clip block" style={{ animationDelay: "0.12s" }}>
            {hero.line1}
          </span>
          <span
            className="mask-text line-clip block"
            style={
              {
                animationDelay: "0.26s",
                "--mask-src": "url(/work/hero-strip.webp)",
              } as React.CSSProperties
            }
          >
            {hero.line2}
          </span>
        </h1>

        <p className="rise rise-3 mt-6 max-w-[46ch] text-[1.0625rem] leading-relaxed text-muted sm:mt-9 sm:text-lg">
          {hero.sub}
        </p>

        <div className="rise rise-4 mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
          <a
            href={bookingHref}
            className="btn btn-primary justify-center sm:justify-start"
          >
            {hero.ctaPrimary}
          </a>
          <a href="#work" className="btn btn-ghost justify-center sm:justify-start">
            {hero.ctaSecondary}
          </a>
        </div>
      </div>

      {/* Traka pravih snimki — dokaz odmah, prije bilo kakvog obećanja */}
      <div
        className="rise rise-4 relative w-full overflow-hidden pb-10 sm:pb-14"
        aria-hidden="true"
      >
        <div className="reel flex w-max gap-3 sm:gap-5">
          {reel.map((item, i) => (
            <div
              key={`${item.slug}-${i}`}
              className="relative aspect-[16/10] w-[64vw] shrink-0 overflow-hidden rounded-[3px] border border-line bg-limestone-2 sm:w-[32vw] lg:w-[24vw]"
            >
              <Image
                src={item.shot}
                alt=""
                fill
                sizes="(max-width: 640px) 64vw, (max-width: 1024px) 32vw, 24vw"
                className="object-cover object-top"
                priority={i < 2}
                // Traka se pomiče transformom, ne layoutom, pa WebKit nikad
                // ne okine lijeno učitavanje i u Safariju ostanu prazne rupe.
                // Duplikati su iste datoteke — idu iz keša, bez dodatnih bajtova.
                loading={i < 2 ? undefined : "eager"}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
