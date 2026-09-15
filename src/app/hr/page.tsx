import type { Metadata } from "next";
import Link from "next/link";
import HeroStory from "@/components/HeroStory";
import FreeMark from "@/components/FreeMark";
import ZipLogo from "@/components/ZipLogo";
import { ArrowUpRight } from "@/components/icons";
import { hr } from "@/data/content-hr";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: hr.meta.title,
  description: hr.meta.description,
  alternates: {
    canonical: "/hr",
    languages: { en: "/", hr: "/hr", "x-default": "/" },
  },
  openGraph: { title: hr.meta.title, description: hr.meta.description, url: "https://petargrbic.com/hr", locale: "hr_HR" },
};

/**
 * /hr — kraća hrvatska stranica za vlasnike (Petar, 2026-09-15).
 * Isti redoslijed kao naslovnica: besplatna provjera → kako radi → paketi.
 * Tekst je u src/data/content-hr.ts (nacrt, čeka Petrovo odobrenje).
 */
export default function HrPage() {
  const wa = site.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(hr.whatsappText)}`
    : null;
  const ext = wa ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <div lang="hr">
      <header className="fixed inset-x-0 top-0 z-50 bg-limestone/85 backdrop-blur-md">
        <div className="shell flex h-[68px] items-center justify-between gap-4 sm:h-[76px]">
          <Link href="/hr" className="-my-3 block py-3" aria-label="zip">
            <ZipLogo id="zip-hr" pitch={17} className="h-9 w-auto" />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" lang="en" className="ulink text-sm font-medium text-muted hover:text-ink">
              {hr.nav.en}
            </Link>
            {wa && (
              <a href={wa} {...ext} className="btn btn-primary hidden !px-5 !py-2.5 !text-sm md:inline-flex">
                {hr.nav.cta}
              </a>
            )}
          </div>
        </div>
      </header>

      <main id="main">
        {/* Hero: na mobitelu priča gore, naslov i jedan gumb na kraju */}
        <section className="relative min-h-[100svh] overflow-hidden pt-24 sm:pt-32">
          <div className="shell flex min-h-[calc(100svh-6rem)] flex-col justify-between gap-6 pb-10 sm:min-h-[calc(100svh-8rem)] sm:pb-14 lg:grid lg:min-h-0 lg:grid-cols-12 lg:items-start lg:gap-x-12 lg:py-14">
            <div className="flex flex-1 flex-col justify-end sm:py-10 lg:col-span-5 lg:flex-none lg:justify-center lg:py-0 lg:pt-24 xl:pt-32">
              <p className="eyebrow rise rise-1">{hr.hero.eyebrow}</p>
              <h1 className="mt-4 text-[clamp(3.25rem,13.5vw,11rem)] sm:mt-7 lg:text-[clamp(3.5rem,6.5vw,7rem)]">
                <span className="hl-line">
                  <span className="hl-word" style={{ "--i": 0 } as React.CSSProperties}>{hr.hero.line1}</span>
                </span>
                <span className="hl-line">
                  <span className="hl-word" style={{ "--i": 1 } as React.CSSProperties}>
                    {hr.hero.line2}
                    <svg className="hl-underline" viewBox="0 0 300 16" preserveAspectRatio="none" aria-hidden="true">
                      <path pathLength="1" d="M4 11C46 5 96 3.5 152 6.5 208 9.5 254 11.5 296 6" />
                    </svg>
                  </span>
                </span>
              </h1>
              <p className="rise rise-2 mt-4 max-w-[46ch] text-[1.0625rem] leading-relaxed text-muted sm:mt-9 sm:text-lg">
                {hr.hero.subBefore} <FreeMark>{hr.hero.subFree}</FreeMark>
              </p>
              <div className="rise rise-3 mt-6 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
                <a href={wa ?? "#kontakt"} {...ext} className="btn btn-primary justify-center sm:justify-start">
                  {hr.hero.cta}
                </a>
                <Link href="/work" className="btn btn-ghost hidden justify-center sm:inline-flex sm:justify-start">
                  {hr.work.cta}
                </Link>
              </div>
            </div>
            <div className="rise rise-1 order-first w-full lg:order-none lg:col-span-6 lg:col-start-7">
              <HeroStory story={hr.story} ctaHref={wa} labels={hr.drawLabels} />
            </div>
          </div>
        </section>

        {/* Kako radi */}
        <section id="kako-radi" className="scroll-mt-16 border-t border-line py-20 sm:py-28">
          <div className="shell">
            <p className="eyebrow">{hr.process.eyebrow}</p>
            <h2 className="mt-4 max-w-2xl text-[clamp(1.875rem,7vw,3rem)] leading-[1]">{hr.process.heading}</h2>
            <ol className="mt-12 grid gap-9 md:grid-cols-3 md:gap-10">
              {hr.process.steps.map((s) => (
                <li key={s.num} className="border-l-2 border-rust pl-5">
                  <span className="tnum text-sm text-rust-ink">{s.num}</span>
                  <h3 className="mt-2 text-xl leading-tight tracking-[-0.02em]">{s.title}</h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">{s.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Paketi */}
        <section className="border-t border-line py-16 sm:py-20">
          <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <p className="eyebrow">{hr.packages.eyebrow}</p>
              <h2 className="mt-4 max-w-[18ch] text-[clamp(2rem,7.5vw,3.25rem)] leading-[0.98]">{hr.packages.heading}</h2>
              <ul className="mt-8 divide-y divide-line border-y border-line">
                {hr.packages.items.map((p) => (
                  <li key={p.name} className="py-5">
                    <p className="font-display text-xl font-extrabold tracking-[-0.02em]">{p.name}</p>
                    <p className="mt-1.5 max-w-[46ch] text-[1.0625rem] leading-relaxed text-muted">{p.body}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[0.9375rem] text-muted">{hr.packages.extra}</p>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="max-w-[38ch] border-l-2 border-rust pl-4 text-[1.0625rem] leading-relaxed">{hr.packages.reassure}</p>
              <Link href="/work" className="ulink mt-8 inline-flex min-h-11 items-center gap-1.5 font-medium">
                {hr.work.cta}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <p className="text-sm text-muted">{hr.work.note}</p>
            </div>
          </div>
        </section>

        {/* O meni */}
        <section className="border-t border-line py-20 sm:py-28">
          <div className="shell max-w-3xl">
            <p className="eyebrow">{hr.about.eyebrow}</p>
            <p className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-display text-2xl font-extrabold tracking-[-0.02em]">{hr.about.name}</span>
              <span className="text-sm font-semibold text-rust-ink">{hr.about.role}</span>
            </p>
            <div className="mt-5 max-w-[62ch] space-y-4 text-[1.0625rem] leading-relaxed text-muted">
              <p>{hr.about.p1}</p>
              <p>{hr.about.p2}</p>
            </div>
          </div>
        </section>

        {/* Kontakt */}
        <section id="kontakt" data-dark className="scroll-mt-24 bg-ink text-limestone">
          <div className="shell py-20 sm:py-28">
            <p className="eyebrow !text-limestone/70">{hr.contact.eyebrow}</p>
            <p className="mt-4 font-display text-[clamp(2.25rem,9vw,3.75rem)] font-extrabold leading-[0.95] tracking-[-0.035em]">
              {hr.contact.heading}
            </p>
            <p className="mt-6 max-w-[40ch] text-[1.0625rem] leading-relaxed text-limestone/75">{hr.contact.sub}</p>
            {wa && (
              <a href={wa} {...ext} className="btn btn-on-dark mt-8 justify-center">
                {hr.contact.whatsapp}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
            <div className="mt-6 flex flex-col gap-1">
              <a href={`tel:${site.phone}`} className="ulink -my-1.5 inline-flex min-h-11 items-center self-start text-sm font-medium text-limestone/75">
                {site.phoneDisplay}
              </a>
              <a href={`mailto:${site.email}`} className="ulink -my-1.5 inline-flex min-h-11 items-center self-start break-all text-sm font-medium text-limestone/75">
                {site.email}
              </a>
            </div>
            <p className="mt-3 text-sm text-limestone/70">{hr.contact.reply}</p>
          </div>
        </section>
      </main>

      <footer data-dark className="bg-ink text-limestone">
        <div className="shell border-t border-limestone/12 py-10">
          <ZipLogo id="zip-hr-foot" className="h-12 w-auto" />
          <p className="mt-2 text-sm text-limestone/75">{hr.footer.tagline}</p>
          <p className="mt-8 text-xs text-limestone/60">© zip. {hr.footer.rights}</p>
        </div>
      </footer>
    </div>
  );
}
