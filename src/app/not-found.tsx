import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import { waHref } from "@/data/site";
import { content } from "@/data/content";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Page not found | zip",
  robots: { index: false, follow: false },
};

/**
 * 404 u stilu zipa (Petar, 2026-09-18). "404" je u kromu i izrezan kosim
 * crtama pod 45°, kao slova u logu. Tekst je nacrt. Engleski je glavni, a
 * hrvatski posjetitelj ima svoju poveznicu, jer 404 je jedna za cijelu stranicu.
 */
export default function NotFound() {
  const whatsappHref = waHref(content.whatsappText);
  return (
    <>
      <Nav />
      <main id="main" className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-16 pt-32">
        <div className="grid-light" aria-hidden="true" />
        <div className="shell relative grid gap-6">
          <p
            aria-hidden="true"
            className="chrome-text rise select-none text-[clamp(8rem,40vw,19rem)] font-semibold leading-[0.8] tracking-[-0.06em] [mask-image:repeating-linear-gradient(45deg,#000_0_7px,transparent_7px_12px)] [-webkit-mask-image:repeating-linear-gradient(45deg,#000_0_7px,transparent_7px_12px)]"
          >
            404
          </p>
          <h1 className="t-h2 rise" style={{ "--i": 1 } as React.CSSProperties}>
            <span className="fade-line">This page</span>
            <span className="fade-line">came unzipped.</span>
          </h1>
          <p className="t-lede rise" style={{ "--i": 2 } as React.CSSProperties}>
            The link may be old, or the address has a typo. The rest of the site is right where you left it.
          </p>
          <div className="rise flex flex-wrap gap-3" style={{ "--i": 3 } as React.CSSProperties}>
            <Link href="/" className="btn btn-primary btn-lg">
              Back to the home page
            </Link>
            {whatsappHref && (
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-glass btn-lg glass">
                {content.hero.ctaPrimary}
                <ArrowRight />
              </a>
            )}
          </div>
          <p className="rise text-sm text-fg-3" style={{ "--i": 4 } as React.CSSProperties} lang="hr">
            Na hrvatskom?{" "}
            <Link href="/hr" className="-my-2 inline-flex min-h-11 items-center text-fg-2 underline underline-offset-4 hover:text-fg">
              Natrag na početnu
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
