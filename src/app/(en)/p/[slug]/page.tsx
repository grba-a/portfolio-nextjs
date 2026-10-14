import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prospects } from "@/data/prospects";
import { site } from "@/data/site";
import { ArrowUpRight } from "@/components/icons";
import ZipLogo from "@/components/ZipLogo";

/**
 * Stranica jednog vlasnika — nastavak hladne poruke, ne naslovnica.
 *
 * Udica je nalaz iz poruke, pa ga ova stranica nastavlja: tri provjerljive
 * stvari o NJEGOVOJ stranici i jedan gumb. Hrvatski, jer odluku donosi
 * vlasnik, a ne njegov gost. Podaci: src/data/prospects.ts.
 */

// Samo vlasnici iz prospects.ts; sve ostalo je 404
export const dynamicParams = false;

export function generateStaticParams() {
  return prospects.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = prospects.find((x) => x.slug === slug);
  return {
    title: p ? `Za ${p.name} · zip` : "zip",
    // Privatno: ne indeksira se i ne prati se dalje
    robots: { index: false, follow: false },
  };
}

/** "2026-09-20" → "20. 9. 2026." bez new Date() (prerender bi zapekao dan builda) */
const hrDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d}. ${m}. ${y}.`;
};

const host = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

export default async function ProspectPage({ params }: Props) {
  const { slug } = await params;
  const p = prospects.find((x) => x.slug === slug);
  if (!p) notFound();

  const wa = site.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
        `Dobar dan! Javljam se u vezi provjere za ${p.name}. `,
      )}`
    : null;
  const three = p.findings.length === 3;

  return (
    <main lang="hr" className="relative min-h-[100svh] pb-20">
      <div className="grid-light" aria-hidden="true" />
      <header className="shell relative flex min-h-20 items-center border-b border-line">
        <Link href="/" className="-my-2 inline-flex min-h-11 items-center">
          <ZipLogo id="zip-p" pitch={17} className="h-8 w-auto text-fg" />
        </Link>
      </header>

      <div className="shell relative pt-12 sm:pt-16">
        <div className="max-w-2xl">
          <p className="pill-eyebrow">Za: {p.name}</p>
          <p className="mt-3 text-sm font-medium text-fg-3">
            Provjereno {hrDate(p.checkedOn)}
          </p>

          <h1 className="t-h2 mt-6">
            {three ? "Tri stvari koje vaša stranica radi krivo." : "Što sam našao na vašoj stranici."}
          </h1>

          <p className="t-lede mt-6 max-w-[46ch]">
            Pogledali smo {p.site ? `${host(p.site)}, ` : ""}vaš Google profil i put do rezervacije.
            Svaku od ovih stvari možete sami provjeriti za minutu.
          </p>

          <ol className="mt-10 grid gap-2.5">
            {p.findings.map((f, i) => (
              <li key={i} className="card grid grid-cols-[2rem_1fr] gap-x-3 p-5 sm:p-6">
                <span className="chrome-text text-2xl font-semibold leading-none">{i + 1}</span>
                <div>
                  <p className="text-[1.125rem] font-semibold leading-snug text-fg">{f.title}</p>
                  <p className="mt-3 text-sm font-medium text-fg-3">
                    Kako provjeriti
                  </p>
                  <p className="mt-1 text-[1rem] leading-relaxed text-fg-2">{f.check}</p>
                </div>
              </li>
            ))}
          </ol>

          {p.concept && (
            <p className="mt-8 text-[1.0625rem] leading-relaxed">
              Napravili smo i prijedlog kako bi vaša stranica mogla izgledati.{" "}
              <a
                href={p.concept}
                target="_blank"
                rel="noopener noreferrer"
                className="-my-2 inline-flex min-h-11 items-center gap-1 font-semibold underline underline-offset-4"
              >
                Pogledajte prijedlog
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </p>
          )}

          <div className="mt-12 border-t border-line pt-8">
            <p className="text-2xl font-semibold tracking-[-0.03em]">Pitanja? Javite se.</p>
            <p className="mt-2 max-w-[44ch] text-[1rem] leading-relaxed text-fg-2">
              Provjera je besplatna i ni na što vas ne obvezuje. Odgovaramo u roku od 24 sata.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              {wa && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-lg"
                >
                  Javite se na WhatsApp
                </a>
              )}
              <a
                href={`tel:${site.phone}`}
                className="-my-2 inline-flex min-h-11 items-center justify-center text-sm font-medium text-fg-2 underline underline-offset-4"
              >
                ili nazovite {site.phoneDisplay}
              </a>
            </div>
          </div>

          <p className="mt-14 text-sm text-fg-3">
            zip · web dizajn ·{" "}
            <Link href="/" className="-my-2 inline-flex min-h-11 items-center underline underline-offset-4">
              donebyzip.com
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
