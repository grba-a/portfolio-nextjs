import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";
import Eyebrow from "@/components/ui/Eyebrow";
import { ArrowRight } from "@/components/icons";
import { ogImage } from "@/components/RootShell";
import { content } from "@/data/content";
import { hr } from "@/data/content-hr";
import { site } from "@/data/site";
import { blogPath, postsIn, type BlogPost } from "@/data/blog";

const L = {
  en: {
    title: "Blog: websites, Google and ads for small businesses | zip",
    desc: "Short, practical posts for small businesses: Google profiles, websites, ads and social media.",
    lede: "Short, practical posts on how small businesses get enquiries: Google profiles, websites, ads and social media.",
    read: "Read",
    minutes: "min read",
    sources: "Sources",
    related: "Related",
    next: "Next post",
    all: "All posts",
    locale: "en-GB",
    index: "/blog",
  },
  hr: {
    title: "Blog: web stranice, Google i oglasi za male tvrtke | zip",
    desc: "Kratki, konkretni članci za male tvrtke: Google profil, web stranica, oglasi i društvene mreže.",
    lede: "Kratki, konkretni članci o tome kako male tvrtke dolaze do upita: Google profil, web stranica, oglasi i društvene mreže.",
    read: "Pročitajte",
    minutes: "min čitanja",
    sources: "Izvori",
    related: "Povezano",
    next: "Sljedeći članak",
    all: "Svi članci",
    locale: "hr-HR",
    index: "/hr/blog",
  },
};

const og = (title: string, description: string, url: string, lang: "en" | "hr", type: "website" | "article") => ({
  openGraph: { title, description, url: `${site.url}${url}`, siteName: "zip", images: [ogImage], locale: lang === "hr" ? "hr_HR" : "en_US", type },
  twitter: { card: "summary_large_image" as const, title, description, images: [ogImage.url] },
});

export function blogIndexMetadata(lang: "en" | "hr"): Metadata {
  const l = L[lang];
  return {
    title: l.title,
    description: l.desc,
    alternates: { canonical: l.index, languages: { en: "/blog", hr: "/hr/blog", "x-default": "/blog" } },
    ...og(l.title, l.desc, l.index, lang, "website"),
  };
}

export function postMetadata(p: BlogPost): Metadata {
  const path = blogPath(p);
  const languages: Record<string, string> = { [p.lang]: path };
  if (p.alt) {
    const other = blogPath({ lang: p.lang === "en" ? "hr" : "en", slug: p.alt });
    languages[p.lang === "en" ? "hr" : "en"] = other;
    languages["x-default"] = p.lang === "en" ? path : other;
  }
  return {
    title: p.metaTitle || `${p.title} | zip`,
    description: p.description,
    alternates: { canonical: path, languages },
    ...og(p.metaTitle || p.title, p.description, path, p.lang, "article"),
  };
}

const dateFmt = (iso: string, locale: string) =>
  new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso));

/** Popis članaka, po temama. Stil kao /work: isti zaglavak, iste kartice. */
export function BlogIndex({ lang }: { lang: "en" | "hr" }) {
  const t = lang === "hr" ? hr : content;
  const l = L[lang];
  const list = postsIn(lang);
  const cats = [...new Set(list.map((p) => p.category))];

  return (
    <>
      <Nav t={t} langHref={lang === "en" ? "/hr/blog" : "/blog"} />
      <main id="main" className="relative pt-36 sm:pt-44">
        <div className="grid-light" aria-hidden="true" />
        <div className="shell relative">
          <header className="grid max-w-2xl gap-5">
            <Eyebrow>Blog</Eyebrow>
            <h1 className="t-display">Blog</h1>
            <p className="t-lede">{l.lede}</p>
          </header>

          <div className="mt-14 grid gap-16 sm:mt-20 sm:gap-20">
            {cats.map((c) => (
              <section key={c} aria-labelledby={`cat-${c}`} className="grid gap-6">
                <h2 id={`cat-${c}`} className="t-h3 text-fg-2">
                  {c}
                </h2>
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {list
                    .filter((p) => p.category === c)
                    .map((p) => (
                      <li key={p.slug} className="grid">
                        <Link href={blogPath(p)} className="card group grid content-between gap-5 p-5 transition-colors duration-200 hover:border-line-2 sm:p-6">
                          <div className="grid gap-2.5">
                            <span className="tnum text-[0.8125rem] text-fg-3">
                              {p.minutes} {l.minutes}
                            </span>
                            <h3 className="text-lg font-semibold leading-snug tracking-[-0.015em] text-fg">{p.title}</h3>
                            <p className="text-[0.9375rem] text-fg-2">{p.intro}</p>
                          </div>
                          <span className="inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-fg">
                            {l.read}
                            <ArrowRight />
                          </span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
        <div className="h-24 sm:h-32" />
      </main>
      <Footer t={t} langHref={lang === "en" ? "/hr/blog" : "/blog"} />
      <StickyCta t={t} />
    </>
  );
}

/** Jedan članak. Tijelo je naš statični HTML iz src/data/blog.ts. */
export function BlogArticle({ p }: { p: BlogPost }) {
  const t = p.lang === "hr" ? hr : content;
  const l = L[p.lang];
  const list = postsIn(p.lang);
  const next = list[(list.findIndex((x) => x.slug === p.slug) + 1) % list.length];
  const langHref = p.alt ? blogPath({ lang: p.lang === "en" ? "hr" : "en", slug: p.alt }) : undefined;
  const path = blogPath(p);

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: p.title,
        description: p.description,
        datePublished: p.date,
        inLanguage: p.lang,
        url: `${site.url}${path}`,
        mainEntityOfPage: `${site.url}${path}`,
        image: `${site.url}${ogImage.url}`,
        author: { "@type": "Organization", name: "zip", url: site.url },
        publisher: { "@type": "Organization", name: "zip", url: site.url, logo: { "@type": "ImageObject", url: `${site.url}/icon.png` } },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Blog", item: `${site.url}${l.index}` },
          { "@type": "ListItem", position: 2, name: p.title, item: `${site.url}${path}` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Nav t={t} langHref={langHref} />
      <main id="main" className="relative pb-20 pt-36 sm:pb-28 sm:pt-44">
        <article className="shell grid max-w-[44rem] gap-8">
          <header className="grid gap-4">
            <p className="flex flex-wrap items-center gap-2.5 text-[0.9375rem] text-fg-3">
              <Link href={l.index} className="-my-2 inline-flex min-h-11 items-center text-fg-2 underline underline-offset-4 hover:text-fg">
                Blog
              </Link>
              <span aria-hidden="true">·</span>
              <span>{p.category}</span>
            </p>
            <h1 className="t-h2 text-balance">{p.title}</h1>
            <p className="tnum text-sm text-fg-3">
              <time dateTime={p.date}>{dateFmt(p.date, l.locale)}</time> · {p.minutes} {l.minutes} · zip
            </p>
            <p className="t-lede">{p.intro}</p>
          </header>

          <div className="prose-zip" dangerouslySetInnerHTML={{ __html: p.html }} />

          {p.sources.length > 0 && (
            <div className="grid gap-1.5 text-sm text-fg-3">
              <p>{l.sources}:</p>
              <ul className="grid list-disc pl-5">
                {p.sources.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-fg-2 underline underline-offset-4 hover:text-fg">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {p.related && (
            <p className="text-[0.9375rem] text-fg-2">
              {l.related}:{" "}
              <Link href={p.related.href} className="inline-flex min-h-11 items-center text-fg underline underline-offset-4 hover:text-fg-2">
                {p.related.label}
              </Link>
            </p>
          )}

          <nav aria-label="Blog" className="grid gap-4 border-t border-line pt-8">
            <Link href={blogPath(next)} className="card grid gap-1.5 p-5 transition-colors duration-200 hover:border-line-2 sm:p-6">
              <span className="text-[0.8125rem] text-fg-3">{l.next} →</span>
              <span className="text-lg font-semibold leading-snug tracking-[-0.015em] text-fg">{next.title}</span>
            </Link>
            <Link href={l.index} className="inline-flex min-h-11 w-fit items-center text-[0.9375rem] text-fg-2 underline underline-offset-4 hover:text-fg">
              ← {l.all}
            </Link>
          </nav>
        </article>
      </main>
      <Footer t={t} langHref={langHref} />
      <StickyCta t={t} />
    </>
  );
}
