import Link from "next/link";
import { content, type Copy } from "@/data/content";
import { work, inLang } from "@/data/work";
import FadeHeading from "@/components/ui/FadeHeading";
import Eyebrow from "@/components/ui/Eyebrow";
import WorkTiles from "@/components/WorkTiles";
import { ArrowRight } from "@/components/icons";

/**
 * Radovi: nagnute pločice (odluka 10A) i ispod njih kartica "All work"
 * kao u varijanti B (Petrova napomena, 2026-09-18).
 */
export default function Work({ t = content }: { t?: Copy }) {
  const { work: w } = t;
  const items = work.map((it) => {
    const l = inLang(it, t.lang);
    return {
      slug: it.slug,
      name: it.name,
      status: it.status,
      kind: l.kind,
      shot: it.shot.replace(".webp", "-tall.webp"),
    };
  });

  return (
    <section id="work" aria-labelledby="work-h" className="scroll-mt-24 border-t border-line bg-ink-1 py-20 sm:py-32">
      <div className="shell">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <div className="grid max-w-[40rem] gap-5">
            <Eyebrow>{w.eyebrow}</Eyebrow>
            <FadeHeading id="work-h" lines={w.heading} />
          </div>
          <p className="t-lede lg:max-w-[38ch]">{w.sub}</p>
        </div>

        <div className="mt-12 lg:mt-16">
          <WorkTiles items={items} labels={{ live: w.statusLive, dev: w.statusDev, details: w.details }} />
        </div>

        <Link
          href="/work"
          className="card group mt-6 flex items-end justify-between gap-4 p-5 transition-colors duration-200 sm:p-7 lg:mt-10"
        >
          <span className="grid gap-1">
            <span className="text-[0.8125rem] text-fg-3">{w.allBlock.eyebrow}</span>
            <span className="t-h3 sm:text-2xl">{w.allBlock.heading}</span>
          </span>
          <span className="btn btn-primary btn-sm flex-none">
            {work.length} {w.allBlock.count}
            <ArrowRight />
          </span>
        </Link>
      </div>
    </section>
  );
}
