import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cv } from "@/data/cv";
import { work } from "@/data/work";
import { site, certs, whatsappHref } from "@/data/site";
import PrintButton from "@/components/cv/PrintButton";
import {
  Mail,
  Phone,
  Globe,
  MapPin,
  ArrowUpRight,
} from "@/components/icons";

const TITLE = "Petar Grbić — CV";
const DESC =
  "Digital marketing and web design. Two live sites, two in progress, twelve Google and HubSpot certifications. Zagreb / Dubrovnik, Croatia.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/cv" },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: "https://petargrbic.com/cv",
    siteName: "Petar Grbić",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: TITLE }],
    locale: "en_US",
    type: "profile",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/og-image.png"] },
};

/**
 * /cv — jednostranični životopis.
 *
 * Bez scroll animacija: ovo je dokument, ne prodajna stranica. Time nestaje
 * i cijela klasa kvarova gdje sadržaj ostane nevidljiv ako JS ne odradi svoje.
 *
 * Projekti, certifikati i kontakt dolaze iz istih datoteka kao portfolio
 * (`work.ts`, `site.ts`), pa se dvije stranice ne mogu razići.
 */
export default function CvPage() {
  const contact = [
    { icon: Mail, label: site.email, href: `mailto:${site.email}` },
    { icon: Phone, label: site.phoneDisplay, href: `tel:${site.phone}` },
    { icon: Globe, label: "petargrbic.com", href: "https://petargrbic.com" },
    { icon: MapPin, label: cv.location, href: null },
  ];

  const byIssuer = certs.reduce<Record<string, typeof certs[number][]>>((acc, c) => {
    (acc[c.issuer] ??= []).push(c);
    return acc;
  }, {});

  return (
    <>
      <PrintButton label="Save as PDF" />

      <div className="shell pt-8 sm:pt-10 print:hidden">
        <Link href="/" className="ulink -my-2 inline-flex min-h-11 items-center text-sm text-muted">
          ← Back to petargrbic.com
        </Link>
      </div>

      <main
        id="main"
        className="shell grid gap-10 pb-28 pt-8 sm:pt-10 lg:grid-cols-12 lg:gap-14 lg:pb-32 print:gap-6 print:py-0 print:[grid-template-columns:1fr_2.4fr]"
      >
        {/* ── Pobočni stupac ─────────────────────────────────────── */}
        <aside className="lg:col-span-4 lg:sticky lg:top-10 lg:self-start print:mb-0">
          <div className="relative aspect-square w-28 overflow-hidden rounded-[4px] border border-line bg-limestone-2 sm:w-32 print:hidden">
            <Image
              src="/me.webp"
              alt="Petar Grbić"
              fill
              sizes="128px"
              priority
              className="object-cover"
            />
          </div>

          <h1 className="mt-5 text-[clamp(2rem,7vw,2.75rem)] leading-[0.95] print:text-3xl">
            Petar Grbić
          </h1>
          <p className="eyebrow mt-2.5 block">{cv.role}</p>

          <ul className="mt-7 space-y-1 print:mt-4">
            {contact.map(({ icon: Icon, label, href }) => {
              const inner = (
                <>
                  <Icon className="h-4 w-4 shrink-0 text-rust" />
                  <span className="break-words">{label}</span>
                </>
              );
              return (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      className="ulink -my-1 flex min-h-11 items-center gap-3 text-[0.9375rem] print:min-h-0 print:py-0.5"
                    >
                      {inner}
                    </a>
                  ) : (
                    <span className="-my-1 flex items-center gap-3 py-2 text-[0.9375rem] text-muted print:py-0.5">
                      {inner}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="mt-7 flex flex-col gap-2.5 print:hidden">
            {whatsappHref && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full justify-center"
              >
                Message on WhatsApp
              </a>
            )}
            <a
              href={`mailto:${site.email}`}
              className="btn btn-ghost w-full justify-center"
            >
              Email me
            </a>
          </div>

          <div className="mt-9 border-t border-line pt-6 print:mt-5 print:pt-3">
            <p className="eyebrow">Core stack</p>
            <ul className="mt-4 flex flex-wrap gap-2 print:mt-2">
              {cv.coreStack.map((s) => (
                <li
                  key={s}
                  className="border border-line px-2.5 py-1 text-[0.8125rem] text-ink print:px-1.5 print:py-0"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Samo za ispis: pobočni stupac je inače prazan ~800 px dok se
              glavni prelijeva. Na ekranu ovo stoji u glavnom stupcu. */}
          <div className="hidden print:mt-4 print:block print:border-t print:border-ink print:pt-2">
            <p className="font-mono text-[7pt] uppercase tracking-[0.14em]">
              Certifications
            </p>
            <dl className="mt-1 space-y-1">
              {Object.entries(byIssuer).map(([issuer, items]) => (
                <div key={issuer}>
                  <dt className="font-mono text-[6.5pt] uppercase tracking-[0.14em] text-muted">
                    {issuer}
                  </dt>
                  <dd className="text-[7.5pt] leading-snug">
                    {items.map((c) => c.name).join(" · ")}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>

        {/* ── Glavni stupac ──────────────────────────────────────── */}
        <div className="lg:col-span-8">
          <Section title="Profile">
            <p className="max-w-[62ch] text-[1.0625rem] leading-relaxed text-muted print:text-[9pt]">
              {cv.summary}
            </p>
          </Section>

          <Section title="What I do">
            <dl className="space-y-5 print:space-y-2">
              {cv.services.map((s) => (
                <div key={s.title} className="print:break-inside-avoid">
                  <dt className="font-display font-extrabold tracking-[-0.02em]">
                    {s.title}
                  </dt>
                  <dd className="mt-1 max-w-[58ch] text-[0.9375rem] leading-relaxed text-muted print:text-[8.5pt]">
                    {s.body}
                  </dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section title="Selected work">
            <ul className="space-y-6 print:space-y-2.5">
              {work.map((item) => (
                <li
                  key={item.slug}
                  className="border-l-2 border-rust pl-4 print:break-inside-avoid print:pl-2"
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-display text-lg font-extrabold tracking-[-0.02em] print:text-[10pt]">
                      {item.name}
                    </h3>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ulink -my-1.5 inline-flex min-h-11 items-center gap-1 text-sm text-rust print:my-0 print:min-h-0 print:text-[8pt] print:text-ink"
                    >
                      {item.href.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                      <ArrowUpRight className="h-3 w-3 print:hidden" />
                    </a>
                  </div>
                  <p className="mt-1.5 max-w-[58ch] text-[0.9375rem] leading-relaxed text-muted print:mt-0.5 print:text-[8.5pt]">
                    {item.description}
                  </p>
                  <p className="mt-1 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted print:text-[7pt]">
                    {item.kind}
                    {item.status === "in-development" && " · In early development"}
                  </p>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Certifications" screenOnly>
            <p className="text-[0.9375rem] text-muted print:hidden">
              Twelve completed certifications. Each links to the certificate.
            </p>
            <dl className="mt-5 space-y-4 print:mt-2 print:space-y-1.5">
              {Object.entries(byIssuer).map(([issuer, items]) => (
                <div key={issuer} className="print:break-inside-avoid">
                  <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-rust print:text-[7pt] print:text-ink">
                    {issuer}
                  </dt>
                  <dd className="mt-2 flex flex-wrap gap-2 print:mt-0.5 print:gap-1">
                    {items.map((c) => (
                      <a
                        key={c.file}
                        href={`/certs/${c.file}.png`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center border border-line px-3 text-[0.8125rem] text-ink transition-colors hover:border-ink hover:bg-paper print:min-h-0 print:px-1.5 print:text-[7.5pt]"
                      >
                        {c.name}
                      </a>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section title="Background" last>
            <ol className="relative space-y-7 border-l border-line pl-6 print:space-y-2.5 print:pl-3">
              {cv.timeline.map((t) => (
                <li key={t.period} className="relative print:break-inside-avoid">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[1.6rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-rust bg-limestone print:hidden"
                  />
                  <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted print:text-[7pt]">
                    {t.period}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-extrabold tracking-[-0.02em] print:text-[10pt]">
                    {t.title}
                  </h3>
                  <p className="text-[0.9375rem] text-muted print:text-[8.5pt]">{t.org}</p>
                  <p className="mt-1.5 max-w-[58ch] text-[0.9375rem] leading-relaxed text-muted print:mt-0.5 print:text-[8.5pt]">
                    {t.note}
                  </p>
                </li>
              ))}
            </ol>
          </Section>
        </div>
      </main>
    </>
  );
}

function Section({
  title,
  children,
  last = false,
  screenOnly = false,
}: {
  title: string;
  children: React.ReactNode;
  last?: boolean;
  screenOnly?: boolean;
}) {
  return (
    <section
      className={`${last ? "" : "mb-11 border-b border-line pb-11"} print:mb-3.5 print:border-0 print:pb-0 ${screenOnly ? "print:hidden" : ""}`}
    >
      <h2 className="eyebrow mb-5 block print:mb-1.5 print:border-b print:border-ink print:pb-0.5 print:text-[9pt] print:text-ink">
        {title}
      </h2>
      {children}
    </section>
  );
}
