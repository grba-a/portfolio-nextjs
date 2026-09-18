import { content, type Copy } from "@/data/content";
import { waHref } from "@/data/site";
import FadeHeading from "@/components/ui/FadeHeading";
import Eyebrow from "@/components/ui/Eyebrow";
import { Calendar, Loop, Megaphone, Pin, Plus, Search, Sparkle, Tick, Window } from "@/components/icons";

const ICONS = { web: Window, cal: Calendar, pin: Pin, search: Search, ads: Megaphone, ai: Sparkle, auto: Loop };

/**
 * Paketi (Petar, 2026-09-18, druga runda): Website i Growth su dijelovi koji
 * se mogu uzeti zasebno, a System u sredini ih spaja uz AI i automatizaciju —
 * najveći paket je istaknut u sredini, a na mobitelu ide prvi.
 *
 * Nijedne cijene (odluka 14. 9.), bez "In writing". Svaki paket ima svoj gumb:
 * WhatsApp poruka već nosi ime paketa, pa se iz poruke vidi što je dovelo upit.
 */
export default function Packages({ t = content }: { t?: Copy }) {
  const { packages: p } = t;

  return (
    <section id="packages" aria-labelledby="packages-h" className="scroll-mt-24 border-t border-line bg-ink-1 py-20 sm:py-32">
      <div className="shell">
        <div className="grid max-w-[40rem] gap-5">
          <Eyebrow>{p.eyebrow}</Eyebrow>
          <FadeHeading id="packages-h" lines={p.heading} />
          <p className="t-lede">{p.sub}</p>
        </div>

        <div className="mt-12 grid gap-3 lg:mt-20 lg:grid-cols-3 lg:items-start lg:gap-4">
          {p.tiers.map((tier) => {
            const hi = tier.highlight;
            const href = waHref(tier.whatsapp);
            return (
              <article
                key={tier.id}
                className={`relative grid content-start gap-4 rounded-[22px] border p-5 sm:p-7 ${
                  hi
                    ? "max-lg:order-first border-transparent bg-[#f2f2f5] bg-[linear-gradient(180deg,#fff,#e9e9ee)] text-void shadow-[0_30px_60px_-22px_rgb(255_255_255/0.25)] lg:-mt-5"
                    : "card"
                }`}
              >
                <div className="flex items-center gap-3">
                  <h3 className="t-h3">{tier.name}</h3>
                  {tier.tag && (
                    <span className="ml-auto rounded-full bg-void px-2.5 py-1 text-[0.6875rem] font-semibold text-fg">
                      {tier.tag}
                    </span>
                  )}
                </div>
                <p className={`text-[0.9375rem] leading-snug ${hi ? "text-black/65" : "text-fg-2"}`}>{tier.promise}</p>

                {/* Moduli paketa; u Systemu ih spaja crta u obliku zatvarača */}
                <ul className="flex flex-wrap gap-1.5" aria-label={tier.name}>
                  {tier.modules.map((m, i) => {
                    const Icon = ICONS[m.icon as keyof typeof ICONS];
                    return (
                      <li
                        key={`${m.label}-${i}`}
                        className={`inline-flex min-h-7 items-center gap-1.5 rounded-full px-2.5 text-[0.8125rem] font-medium ${
                          hi
                            ? "bg-black/[0.06] text-void shadow-[inset_0_0_0_1px_rgb(0_0_0/0.1)]"
                            : "bg-white/[0.06] text-fg shadow-[inset_0_1px_0_rgb(255_255_255/0.22),inset_0_0_0_1px_rgb(255_255_255/0.08)]"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5 opacity-80" />
                        {m.label}
                      </li>
                    );
                  })}
                </ul>
                {hi && <div className="zipline" aria-hidden="true" />}

                <ul className={`grid gap-2 border-t pt-4 text-[0.9375rem] ${hi ? "border-black/10" : "border-line"}`}>
                  {tier.includes && (
                    <li className={`grid grid-cols-[1rem_1fr] gap-2.5 ${hi ? "text-black/60" : "text-fg-2"}`}>
                      <Plus className="mt-1 h-4 w-4" />
                      {tier.includes}
                    </li>
                  )}
                  {tier.items.map((item) => (
                    <li key={item} className="grid grid-cols-[1rem_1fr] gap-2.5 leading-snug">
                      <Tick className="mt-0.5 h-4 w-4" />
                      {item}
                    </li>
                  ))}
                </ul>

                <p className={`text-[0.8125rem] ${hi ? "text-black/55" : "text-fg-3"}`}>{tier.foot}</p>
                <a
                  href={href ?? "#contact"}
                  target={href ? "_blank" : undefined}
                  rel={href ? "noopener noreferrer" : undefined}
                  className={`btn btn-lg w-full ${hi ? "bg-void text-fg" : "btn-glass glass"}`}
                >
                  {tier.cta}
                </a>
              </article>
            );
          })}
        </div>

        <p className="mt-8 text-[0.9375rem] text-fg-2 lg:mt-12">{p.note}</p>
      </div>
    </section>
  );
}
