import { content } from "@/data/content";
import { whatsappHref } from "@/data/site";
import HeroStory from "@/components/HeroStory";
import FreeMark from "@/components/FreeMark";

/**
 * Hero. Server komponenta — nema stanja, cijeli intro je čisti CSS.
 *
 * Dva mehanizma, svaki radi na svojoj veličini:
 *  1. Naslov se izvlači odozdo, redak po redak (ritam iz Digital Lab
 *     prototipa), a rust potez označi drugi redak — ista gesta kao provjera.
 *  2. Špil radova — na mobitelu ispod teksta i glavno vizualno sidro,
 *     jer je čitljiv na 390px gdje maska postaje samo tekstura.
 *     Od 1024px stoji u desnom stupcu, uz naslov.
 *
 * GSAP-a ovdje namjerno NEMA: na heroju diže mobilni LCP,
 * a iste keyframes u CSS-u ga ne diraju.
 */
export default function Hero() {
  const { hero } = content;

  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-24 sm:pt-32">
      {/*
       * Desktop: špil je podignut i širi (7 stupaca), naslov s CTA-ima spušten
       * (5 stupaca, gurnut prema dolje). Prije su oba stupca bila centrirana i
       * jednake širine, pa je gornja polovica bila puna, a donja lijeva prazna.
       * Mobitel se ne dira — tamo je raspored već dobar.
       */}
      <div className="shell flex min-h-[calc(100svh-6rem)] flex-col justify-between gap-6 pb-10 sm:min-h-[calc(100svh-8rem)] sm:pb-14 lg:grid lg:min-h-0 lg:grid-cols-12 lg:items-start lg:gap-x-12 lg:py-14">
        <div className="flex flex-1 flex-col justify-center py-8 sm:py-10 lg:col-span-5 lg:flex-none lg:py-0 lg:pt-24 xl:pt-32">
        <p className="eyebrow rise rise-1">{hero.eyebrow}</p>

        <h1 className="mt-4 text-[clamp(3.25rem,13.5vw,11rem)] sm:mt-7 lg:text-[clamp(3.5rem,6.5vw,7rem)]">
          <span className="hl-line">
            <span className="hl-word" style={{ "--i": 0 } as React.CSSProperties}>
              {hero.line1}
            </span>
          </span>
          <span className="hl-line">
            <span className="hl-word" style={{ "--i": 1 } as React.CSSProperties}>
              {hero.line2}
              {/* Crvena olovka: potez se crta tek kad redak sjedne */}
              <svg
                className="hl-underline"
                viewBox="0 0 300 16"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path pathLength="1" d="M4 11C46 5 96 3.5 152 6.5 208 9.5 254 11.5 296 6" />
              </svg>
            </span>
          </span>
        </h1>

        <p className="rise rise-2 mt-6 max-w-[46ch] text-[1.0625rem] leading-relaxed text-muted sm:mt-9 sm:text-lg">
          {hero.subBefore} <FreeMark>{hero.subFree}</FreeMark>
        </p>

        <div className="rise rise-3 mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
          {/* Glavna radnja otvara WhatsApp s gotovom porukom za provjeru —
              vlasnik malog posla živi u WhatsAppu, a poziv sa strancem je
              najveća obveza na stranici. Bez WhatsAppa vodi na kontakt. */}
          <a
            href={whatsappHref ?? "#contact"}
            {...(whatsappHref ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="btn btn-primary justify-center sm:justify-start"
          >
            {hero.ctaPrimary}
          </a>
          <a href="#work" className="btn btn-ghost justify-center sm:justify-start">
            {hero.ctaSecondary}
          </a>
        </div>

        <p lang="hr" className="rise rise-4 mt-4 text-sm text-muted">
          {hero.croatian}
        </p>
        </div>

        {/* Špil pravih snimki — dokaz odmah, prije bilo kakvog obećanja */}
        {/* Šest stupaca, ne sedam: na širokom ekranu su kartice preko sedam
            stupaca bile veće od naslova i preuzimale kadar. Prazan šesti
            stupac je razmak između teksta i špila. */}
        <div className="rise rise-4 w-full lg:col-span-6 lg:col-start-7">
          <HeroStory />
        </div>
      </div>
    </section>
  );
}
