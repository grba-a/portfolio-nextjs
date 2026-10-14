import { content, type Copy } from "@/data/content";

/**
 * Tri koraka (provjera → ponuda → izrada) s okomitom linijom koja svijetli od
 * prvog (odluka 11A). Dijele ih naslovnica i podstranice usluga i djelatnosti.
 */
export default function Steps({ t = content }: { t?: Copy }) {
  const { process: p } = t;
  return (
    <ol className="relative grid max-w-2xl gap-10 pl-10 before:absolute before:bottom-2 before:left-[11px] before:top-2 before:w-px before:bg-[linear-gradient(var(--color-fg),var(--color-line-2)_34%,var(--color-line))]">
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
  );
}
