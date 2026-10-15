import Link from "next/link";
import { content, type Copy } from "@/data/content";
import { pagePath, pagesIn } from "@/data/pages";
import FadeHeading from "@/components/ui/FadeHeading";
import Eyebrow from "@/components/ui/Eyebrow";
import { ArrowRight } from "@/components/icons";

/**
 * Za koga radimo (2026-10-15): poveznice s naslovnice na stranice djelatnosti
 * i usluga, da ih Google nađe i s naslovnice, a ne samo iz podnožja.
 * Bez tvrdnji o iskustvu: samo imena stranica.
 */
export default function ForWhom({ t = content }: { t?: Copy }) {
  const lang = t.lang === "hr" ? "hr" : "en";
  const list = pagesIn(lang);
  const industries = list.filter((p) => p.group === "industry");
  const services = list.filter((p) => p.group === "service");

  return (
    <section id="for-whom" aria-labelledby="for-whom-h" className="scroll-mt-24 py-20 sm:py-32">
      <div className="shell">
        <div className="grid max-w-[40rem] gap-5">
          <Eyebrow>{t.forWhom.eyebrow}</Eyebrow>
          <FadeHeading id="for-whom-h" lines={t.forWhom.heading} />
          <p className="t-lede">{t.forWhom.sub}</p>
        </div>

        <ul className="mt-12 grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:mt-16 lg:grid-cols-4">
          {industries.map((p) => (
            <li key={p.slug} className="grid">
              <Link
                href={pagePath(p.lang, p.slug)}
                className="card group flex min-h-24 items-end justify-between gap-4 p-5 transition-colors duration-200 hover:border-line-2 sm:min-h-36 sm:p-6"
              >
                <span className="t-h3">{p.eyebrow}</span>
                <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-fg text-void transition-transform duration-200 group-hover:translate-x-0.5">
                  <ArrowRight />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-1 text-[0.9375rem]">
          <span className="text-fg-3">{t.forWhom.services}:</span>
          {services.map((p) => (
            <Link
              key={p.slug}
              href={pagePath(p.lang, p.slug)}
              className="inline-flex min-h-11 items-center text-fg-2 underline underline-offset-4 transition-colors duration-200 hover:text-fg"
            >
              {p.eyebrow}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
