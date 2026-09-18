import { content, type Copy } from "@/data/content";
import FadeHeading from "@/components/ui/FadeHeading";
import Eyebrow from "@/components/ui/Eyebrow";

/**
 * Kako radi: okomita linija koja svijetli od prvog koraka (odluka 11A).
 * Brojevi 01–03 imaju smisla jer je ovo pravi slijed.
 */
export default function Process({ t = content }: { t?: Copy }) {
  const { process: p } = t;
  return (
    <section id="how" aria-labelledby="how-h" className="scroll-mt-24 py-20 sm:py-32">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
        <div className="grid content-start gap-5 lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>{p.eyebrow}</Eyebrow>
          <FadeHeading id="how-h" lines={p.heading} />
        </div>

        <ol className="relative grid gap-10 pl-10 before:absolute before:bottom-2 before:left-[11px] before:top-2 before:w-px before:bg-[linear-gradient(var(--color-fg),var(--color-line-2)_34%,var(--color-line))]">
          {p.steps.map((s, i) => (
            <li key={s.num} className="relative grid gap-2">
              <span
                aria-hidden="true"
                className={`absolute -left-[35px] top-[5px] h-[13px] w-[13px] rounded-full border ${
                  i === 0
                    ? "border-fg bg-fg shadow-[0_0_0_5px_rgb(255_255_255/0.08),0_0_18px_rgb(255_255_255/0.5)]"
                    : "border-line-2 bg-void"
                }`}
              />
              <span className="tnum flex items-center gap-2 text-[0.8125rem] text-fg-3">
                {s.num}
                {i === 0 && (
                  <b className="rounded-full bg-fg px-2 py-0.5 text-[0.6875rem] font-semibold text-void">{p.freeTag}</b>
                )}
              </span>
              <h3 className="t-h3 sm:text-xl">{s.title}</h3>
              <p className="max-w-[48ch] text-[0.9375rem] leading-relaxed text-fg-2 sm:text-base">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
