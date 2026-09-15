import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WorkGallery from "@/components/WorkGallery";
import FreeMark from "@/components/FreeMark";
import { content } from "@/data/content";
import { work } from "@/data/work";
import { whatsappHref } from "@/data/site";

export const metadata: Metadata = {
  title: "Work | zip",
  description: "Websites built by zip. Open any project for the details and the live site.",
  alternates: { canonical: "/work" },
};

/** Svi radovi. Naslovnica pokazuje tri, ovdje su svi — klik otvara popup. */
export default function WorkPage() {
  const { workPage: t } = content;
  const live = work.filter((w) => w.status === "live").length;
  const building = work.length - live;

  return (
    <>
      <Nav />
      <main id="main" className="pt-28 sm:pt-36">
        <div className="shell">
          <header className="max-w-2xl">
            <p className="eyebrow">{t.title}</p>
            <h1 className="mt-4 text-[clamp(2.5rem,10vw,5rem)]">{t.heading}</h1>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">
              {live} live, {building} in progress.
            </p>
          </header>

          <div className="mt-14 sm:mt-20">
            <WorkGallery />
          </div>

          <section className="mt-24 border-t border-line pb-24 pt-12 sm:mt-32">
            <p className="font-display text-[clamp(1.75rem,6vw,2.5rem)] font-extrabold leading-[1] tracking-[-0.03em]">
              {t.cta.heading}
            </p>
            <p className="mt-3 text-[1.0625rem] text-muted">
              Send us the address. The check is <FreeMark>free.</FreeMark>
            </p>
            {whatsappHref && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary mt-7 justify-center"
              >
                {content.hero.ctaPrimary}
              </a>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
