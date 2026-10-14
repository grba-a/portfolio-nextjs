import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";
import Faq from "@/components/Faq";
import Steps from "@/components/Steps";
import CommissionCalc from "@/components/CommissionCalc";
import Eyebrow from "@/components/ui/Eyebrow";
import { ArrowRight } from "@/components/icons";
import { ogImage } from "@/components/RootShell";
import { content } from "@/data/content";
import { hr } from "@/data/content-hr";
import { site, waHref } from "@/data/site";
import { pagePath, type Landing as LandingData } from "@/data/pages";

/** Meta podstranice: kanonska adresa, hreflang prema paru i dijeljenje. */
export function landingMetadata(p: LandingData): Metadata {
  const path = pagePath(p.lang, p.slug);
  const altLang = p.lang === "en" ? "hr" : "en";
  const languages: Record<string, string> = { [p.lang]: path };
  if (p.alt) languages[altLang] = pagePath(altLang, p.alt);
  if (p.lang === "en") languages["x-default"] = path;
  else if (p.alt) languages["x-default"] = pagePath("en", p.alt);
  return {
    title: p.metaTitle,
    description: p.metaDesc,
    alternates: { canonical: path, languages },
    openGraph: {
      title: p.metaTitle,
      description: p.metaDesc,
      url: `${site.url}${path}`,
      siteName: "zip",
      images: [ogImage],
      locale: p.lang === "hr" ? "hr_HR" : "en_US",
      type: "website",
    },
    twitter: { card: "summary_large_image", title: p.metaTitle, description: p.metaDesc, images: [ogImage.url] },
  };
}

/**
 * Jedan predložak za stranice usluga i djelatnosti. Isti dijelovi kao
 * naslovnica (koraci, pitanja, podnožje, ljepljivi gumb), da podstranica
 * izgleda kao dio iste stranice, a ne kao landing s druge adrese.
 */
export default function Landing({ p }: { p: LandingData }) {
  const t = p.lang === "hr" ? hr : content;
  const whatsappHref = waHref(p.whatsapp);
  const altLang = p.lang === "en" ? "hr" : "en";
  const langHref = p.alt ? pagePath(altLang, p.alt) : undefined;
  const path = pagePath(p.lang, p.slug);

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: p.h1,
        description: p.metaDesc,
        url: `${site.url}${path}`,
        provider: { "@type": "ProfessionalService", name: "zip", url: site.url },
        inLanguage: p.lang,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "zip", item: `${site.url}${t.home}` },
          { "@type": "ListItem", position: 2, name: p.eyebrow, item: `${site.url}${path}` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Nav t={t} langHref={langHref} />
      <main id="main" className="relative">
        <section className="relative pb-16 pt-36 sm:pb-24 sm:pt-44" data-cta>
          <div className="grid-light" aria-hidden="true" />
          <div className="shell relative grid max-w-[46rem] gap-5 sm:gap-6">
            <Eyebrow>{p.eyebrow}</Eyebrow>
            <h1 className="t-display text-balance">{p.h1}</h1>
            <p className="t-lede">{p.lede}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={whatsappHref ?? "#contact"}
                target={whatsappHref ? "_blank" : undefined}
                rel={whatsappHref ? "noopener noreferrer" : undefined}
                className="btn btn-primary btn-lg"
              >
                {t.book.whatsappLabel}
              </a>
              <Link href={`${t.home}#work`} className="btn btn-glass btn-lg glass">
                {t.hero.ctaSecondary}
                <ArrowRight />
              </Link>
            </div>
          </div>
        </section>

        <div className="shell grid gap-16 pb-8 sm:gap-24">
          {p.sections.map((s, i) => {
            if (s.kind === "list")
              return (
                <section key={i} className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
                  <h2 className="t-h2">{s.heading}</h2>
                  <ul className="grid content-start gap-3">
                    {s.items.map((it) => (
                      <li key={it} className="card flex gap-3 p-4 text-[0.9375rem] text-fg-2 sm:p-5 sm:text-base">
                        <span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 flex-none rounded-full bg-fg" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </section>
              );
            if (s.kind === "text")
              return (
                <section key={i} className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
                  <h2 className="t-h2">{s.heading}</h2>
                  <p className="t-lede">{s.body}</p>
                </section>
              );
            if (s.kind === "example")
              return (
                <section key={i} className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
                  <h2 className="t-h2">{s.heading}</h2>
                  <div className="card grid gap-3 p-5 sm:p-7">
                    <h3 className="t-h3">{s.name}</h3>
                    <p className="text-[0.9375rem] text-fg-2 sm:text-base">{s.body}</p>
                    <Link href={s.href} className="btn btn-glass glass min-h-11 w-fit">
                      {s.label}
                      <ArrowRight />
                    </Link>
                  </div>
                </section>
              );
            if (s.kind === "calc") return <CommissionCalc key={i} lang={p.lang} />;
            return (
              <section key={i} id="how" className="grid scroll-mt-24 gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
                <h2 className="t-h2">{t.process.eyebrow}</h2>
                <Steps t={t} />
              </section>
            );
          })}
        </div>

        <Faq t={t} items={p.faq} />

        <div className="shell pb-20 sm:pb-28">
          <p className="text-[0.9375rem] text-fg-2 sm:text-base">
            {p.cross.text}{" "}
            <Link href={pagePath(p.lang, p.cross.slug)} className="inline-flex min-h-11 items-center text-fg underline underline-offset-4 hover:text-fg-2">
              {p.cross.label}
            </Link>
          </p>
        </div>
      </main>
      <Footer t={t} langHref={langHref} />
      <StickyCta t={t} />
    </>
  );
}
