import { content, type Copy } from "@/data/content";
import { waHref } from "@/data/site";
import ZipChrome from "@/components/ZipChrome";
import { ArrowRight } from "@/components/icons";

/**
 * Hero — cijeli ekran (100svh, Petar 2026-09-18). Patentni zatvarač pri
 * ulasku (odluka 7C) maknut je 2026-10-15: Speed Index na mobitelu pao je
 * s 3,2 s na 1,5 s. Tekst izranja u CSS-u i kreće vidljiv (15 %), zbog LCP-a.
 *
 * Kromirani zip stoji dolje na mobitelu (prigušen, da ne otima naslovu)
 * i desno na desktopu, gdje ima mjesta biti u punom sjaju.
 */
export default function Hero({ t = content }: { t?: Copy }) {
  const { hero } = t;
  const whatsappHref = waHref(t.whatsappText);

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <div className="grid-light" aria-hidden="true" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 -left-[6%] -right-[12%] opacity-45 lg:-bottom-[4%] lg:left-auto lg:right-[-6%] lg:top-[16%] lg:w-[54%] lg:opacity-100"
      >
        <div className="rise" style={{ "--i": 3 } as React.CSSProperties}>
          <ZipChrome id="zip-hero" pitch={11} className="h-auto w-full -rotate-[7deg]" />
        </div>
      </div>

      <div className="shell relative z-10 flex flex-1 flex-col justify-center pb-[34svh] pt-32 lg:pb-16 lg:pt-28">
        <div className="grid max-w-[40rem] gap-5 sm:gap-6">
          <p className="badge rise" style={{ "--i": 0 } as React.CSSProperties}>
            <b>{hero.badgeTag}</b>
            {hero.badge}
          </p>

          <h1 className="t-display">
            <span className="fade-line rise-h" style={{ "--i": 1 } as React.CSSProperties}>
              {hero.line1}
            </span>{" "}
            <span className="fade-line rise-h" style={{ "--i": 2 } as React.CSSProperties}>
              {hero.line2} <span className="fill-word">{hero.line2Fill}</span>
            </span>
          </h1>

          <p className="t-lede rise" style={{ "--i": 3 } as React.CSSProperties}>
            {hero.sub}
          </p>

          <div className="rise flex flex-wrap gap-3" style={{ "--i": 4 } as React.CSSProperties}>
            <a
              href={whatsappHref ?? "#contact"}
              target={whatsappHref ? "_blank" : undefined}
              rel={whatsappHref ? "noopener noreferrer" : undefined}
              className="btn btn-primary btn-lg"
            >
              {hero.ctaPrimary}
            </a>
            <a href="#work" className="btn btn-glass btn-lg glass">
              {hero.ctaSecondary}
              <ArrowRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
