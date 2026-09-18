import { content, type Copy } from "@/data/content";
import { waHref } from "@/data/site";
import FadeHeading from "@/components/ui/FadeHeading";
import Eyebrow from "@/components/ui/Eyebrow";
import { Dash, Tick } from "@/components/icons";

/**
 * Paketi kao tablica (odluka 12C). Retci su izvedeni samo iz opisa paketa.
 * Nijedne cifre nigdje (odluka 14. 9.): cijena stoji napismeno, nakon provjere.
 */
export default function Packages({ t = content }: { t?: Copy }) {
  const { packages: p } = t;
  const whatsappHref = waHref(t.whatsappText);

  return (
    <section id="packages" aria-labelledby="packages-h" className="scroll-mt-24 border-t border-line bg-ink-1 py-20 sm:py-32">
      <div className="shell">
        <div className="grid max-w-[40rem] gap-5">
          <Eyebrow>{p.eyebrow}</Eyebrow>
          <FadeHeading id="packages-h" lines={p.heading} />
        </div>

        <div className="card mt-12 px-2 py-1 sm:px-6 sm:py-3 lg:mt-16">
          <table className="w-full border-collapse text-[0.8125rem] sm:text-[0.9375rem]">
            <thead>
              <tr>
                <td className="w-[40%] sm:w-auto" />
                {p.columns.map((c, i) => (
                  <th
                    key={c.name}
                    scope="col"
                    className={`px-1 pb-4 pt-5 text-center align-bottom text-[0.8125rem] font-semibold leading-tight tracking-[-0.01em] sm:px-3 sm:text-base ${
                      i === 1 ? "rounded-t-2xl bg-white/[0.05]" : ""
                    }`}
                  >
                    <span className="sm:hidden">{c.short}</span>
                    <span className="hidden sm:inline">{c.name}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {p.rows.map((r, ri) => (
                <tr key={r.label}>
                  <th scope="row" className="border-t border-line py-3.5 pl-2 pr-3 text-left font-normal text-fg sm:py-4 sm:pl-0">
                    {r.label}
                  </th>
                  {r.has.map((yes, i) => (
                    <td
                      key={i}
                      className={`border-t border-line py-3.5 text-center sm:py-4 ${i === 1 ? "bg-white/[0.05]" : ""} ${
                        i === 1 && ri === p.rows.length - 1 ? "rounded-b-2xl" : ""
                      }`}
                    >
                      {yes ? (
                        <Tick className="mx-auto h-4 w-4 text-fg" />
                      ) : (
                        <Dash className="mx-auto h-4 w-4 text-fg-3/60" />
                      )}
                      <span className="sr-only">{yes ? p.included : p.notIncluded}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <div className="grid max-w-[52ch] gap-2">
            <p className="text-lg font-semibold tracking-[-0.02em] sm:text-xl">{p.reassure}</p>
            <p className="text-[0.9375rem] text-fg-2">{p.timeline}</p>
            <p className="text-[0.875rem] leading-relaxed text-fg-3">{p.extra}</p>
          </div>
          <a
            href={whatsappHref ?? "#contact"}
            target={whatsappHref ? "_blank" : undefined}
            rel={whatsappHref ? "noopener noreferrer" : undefined}
            className="btn btn-primary btn-lg w-full sm:w-fit"
          >
            {p.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
