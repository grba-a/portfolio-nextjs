import Link from "next/link";
import { content, type Copy } from "@/data/content";
import { waHref } from "@/data/site";
import FadeHeading from "@/components/ui/FadeHeading";
import ZipChrome from "@/components/ZipChrome";
import ZipLogo from "@/components/ZipLogo";
import { pagePath, pagesIn } from "@/data/pages";

/**
 * Podnožje s golemim kromiranim zipom, odrezanim na dnu (odluka 18A,
 * kao "SEOtalos" na predlošku). Bez osobnih profila i bez CV-a: stranica
 * je samo za firmu. Namjerno bez godine — prerender bi zapekao godinu builda.
 */
export default function Footer({
  t = content,
  langHref,
}: {
  t?: Copy;
  /** Ista stranica na drugom jeziku; bez nje prekidač vodi na naslovnicu */
  langHref?: string;
}) {
  const { footer: f, nav } = t;
  const whatsappHref = waHref(t.whatsappText);

  return (
    <footer className="relative overflow-hidden border-t border-line pt-20 sm:pt-28">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end" data-cta>
          <div className="grid gap-4">
            <FadeHeading lines={f.heading} as="p" />
            <p className="t-lede">{f.body}</p>
          </div>
          <a
            href={whatsappHref ?? "#contact"}
            target={whatsappHref ? "_blank" : undefined}
            rel={whatsappHref ? "noopener noreferrer" : undefined}
            className="btn btn-primary btn-lg w-full sm:w-fit"
          >
            {f.cta}
          </a>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-line pt-10 text-[0.9375rem] lg:grid-cols-[1.2fr_1fr_1.3fr_1fr]">
          <div className="col-span-2 grid content-start gap-3 lg:col-span-1">
            <Link href={t.home} aria-label="zip" className="flex min-h-11 w-fit items-center text-fg">
              <ZipLogo id="zip-foot" pitch={16} className="h-7 w-auto" />
            </Link>
            <p className="max-w-[28ch] text-sm text-fg-3">{f.tagline}</p>
          </div>
          <nav aria-label={f.site} className="grid content-start">
            <p className="mb-1 text-[0.8125rem] text-fg-3">{f.site}</p>
            {nav.links.map((l) => (
              <a key={l.href} href={l.href} className="inline-flex min-h-11 w-fit items-center text-fg-2 transition-colors duration-200 hover:text-fg">
                {l.label}
              </a>
            ))}
          </nav>
          {/* Usluge i djelatnosti (src/data/pages.ts) — unutarnje poveznice za Google */}
          <nav aria-label={f.services} className="grid content-start">
            <p className="mb-1 text-[0.8125rem] text-fg-3">{f.services}</p>
            {pagesIn(t.lang === "hr" ? "hr" : "en").map((p) => (
              <Link
                key={p.slug}
                href={pagePath(p.lang, p.slug)}
                className="inline-flex min-h-11 w-fit items-center text-fg-2 transition-colors duration-200 hover:text-fg"
              >
                {p.eyebrow}
              </Link>
            ))}
          </nav>
          <nav aria-label={f.more} className="grid content-start">
            <p className="mb-1 text-[0.8125rem] text-fg-3">{f.more}</p>
            <Link href="/work" className="inline-flex min-h-11 w-fit items-center text-fg-2 transition-colors duration-200 hover:text-fg">
              {f.allWork}
            </Link>
            <a href={`${t.home}#faq`} className="inline-flex min-h-11 w-fit items-center text-fg-2 transition-colors duration-200 hover:text-fg">
              {f.questions}
            </a>
            <a
              href={langHref ?? f.langHref}
              hrefLang={t.lang === "en" ? "hr" : "en"}
              className="inline-flex min-h-11 w-fit items-center text-fg-2 transition-colors duration-200 hover:text-fg"
            >
              {f.langLabel}
            </a>
          </nav>
        </div>

        <p className="mt-12 text-[0.8125rem] text-fg-3">© zip. {f.copyright}</p>
      </div>

      {/* Odrezan na dnu kao "SEOtalos" na predlošku: vidi se točka i gornji
          dio slova, pa zip ne pojede cijeli ekran na desktopu. */}
      <div
        aria-hidden="true"
        className="pointer-events-none mx-auto mt-10 aspect-[236/92] max-w-[1080px] overflow-hidden px-[2vw]"
      >
        <ZipChrome id="zip-footer" pitch={8} className="h-auto w-full" />
      </div>
    </footer>
  );
}
