import { content, type Copy } from "@/data/content";
import { waHref } from "@/data/site";
import Ring from "@/components/ui/Ring";
import { Pointer, Search } from "@/components/icons";

function Stars() {
  return (
    <span className="flex gap-0.5 text-fg-2" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
          <path d="m12 2.5 2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
        </svg>
      ))}
    </span>
  );
}

/**
 * Tri dijela besplatne provjere kao bento s mini sučeljima (odluka 9A), plus
 * uzorak provjere. Od 2026-10-14 nije zasebna sekcija: živi unutar „Kako radi“
 * (Process), jer su dvije sekcije objašnjavale isto (kolegin preview, Petar odobrio).
 * Mini sučelja su ilustracija: nema imena, ocjena ni brojki nečijeg posla.
 */
export default function CheckCards({ t = content }: { t?: Copy }) {
  const { check } = t;
  const whatsappHref = waHref(t.whatsappText);

  return (
    <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-3">
      {/* Pronađeno — Google zapis koji vodi (ili ne vodi) na stranicu */}
      <article className="card col-span-2 grid content-start gap-2 p-5 sm:p-7">
        <h3 className="t-h3">{check.found.title}</h3>
        <p className="max-w-[40ch] text-[0.9375rem] text-fg-2">{check.found.body}</p>
        <div className="mt-4 grid gap-2.5" aria-hidden="true">
          <div className="glass flex h-10 items-center gap-2 rounded-full px-4 text-sm text-fg-2">
            <Search className="h-4 w-4" />
            {check.found.search}
          </div>
          <div className="grid gap-2.5 rounded-2xl border border-line bg-void p-4">
            <span className="text-[0.9375rem] font-semibold tracking-[-0.015em]">{check.found.business}</span>
            <Stars />
            <div className="flex flex-wrap gap-1.5">
              {check.found.chips.map((c, i) =>
                i === 1 ? (
                  <span key={c} className="relative inline-flex min-h-8 items-center rounded-full bg-fg px-3 text-[0.8125rem] font-medium text-void">
                    {c}
                    <Pointer className="absolute -bottom-3 -right-2.5 drop-shadow-[0_2px_4px_rgb(0_0_0/0.6)]" />
                  </span>
                ) : (
                  <span key={c} className="chip">
                    {c}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </article>

      {/* Povjerenje — nekoliko sekundi */}
      <article className="card col-span-2 grid content-start gap-2 p-5 sm:col-span-1 sm:p-7">
        <h3 className="t-h3">{check.trusted.title}</h3>
        <p className="text-[0.9375rem] text-fg-2">{check.trusted.body}</p>
        <div className="mt-4 grid place-items-center py-2 lg:mt-auto">
          <Ring label={check.trusted.seconds} />
        </div>
      </article>

      {/* Rezervirano — put od traženja do rezervacije */}
      <article className="card col-span-2 grid content-start gap-2 p-5 sm:col-span-1 sm:p-7">
        <h3 className="t-h3">{check.booked.title}</h3>
        <p className="text-[0.9375rem] text-fg-2">{check.booked.body}</p>
        <div className="relative mt-4 h-[118px]" aria-hidden="true">
          {check.booked.path.map((step, i) => (
            <span
              key={step}
              className={`absolute flex h-8 -rotate-[9deg] items-center whitespace-nowrap rounded-xl border px-3 text-[0.8125rem] font-medium shadow-[0_10px_20px_-8px_rgb(0_0_0/0.8)] ${
                i === 2 ? "border-transparent bg-fg text-void" : "border-line-2 bg-card-hi text-fg"
              }`}
              style={{ left: `${2 + i * 22}%`, top: `${8 + i * 34}px` }}
            >
              {step}
            </span>
          ))}
        </div>
      </article>

      {/* Uzorak provjere — nalazi su primjer i tako su označeni */}
      <article className="card col-span-2 grid content-between gap-6 p-5 sm:p-7">
        <div className="grid gap-4">
          <div className="flex items-center gap-2.5">
            <span className="chip">{check.sample.tag}</span>
            <h3 className="t-h3">{check.sample.title}</h3>
          </div>
          <ol className="grid gap-3">
            {check.sample.findings.map((f, i) => (
              <li key={f} className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-2 text-[0.9375rem] text-fg-2">
                <span className="tnum font-semibold text-fg">{i + 1}</span>
                {f}
              </li>
            ))}
          </ol>
        </div>
        <div className="grid gap-4">
          <p className="max-w-[34ch] text-[0.9375rem] text-fg-2">{check.sample.note}</p>
          <a
            href={whatsappHref ?? "#contact"}
            target={whatsappHref ? "_blank" : undefined}
            rel={whatsappHref ? "noopener noreferrer" : undefined}
            className="btn btn-primary btn-lg w-full sm:w-fit"
          >
            {check.sample.cta}
          </a>
        </div>
      </article>
    </div>
  );
}
