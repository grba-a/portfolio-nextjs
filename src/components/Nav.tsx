"use client";

import { useEffect, useState } from "react";
import { content, type Copy } from "@/data/content";
import ZipLogo from "@/components/ZipLogo";
import Link from "next/link";

/**
 * Mobile-first navigacija.
 * Mobitel: ime + hamburger, pa punoekranski izbornik s velikim metama za palac.
 * Od 768px: traka s poveznicama i jednim CTA-om.
 */
export default function Nav({ t = content }: { t?: Copy }) {
  const { nav } = t;
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Traka mora pratiti podlogu ispod sebe: preko tamnog zaključnog bloka
  // svijetla traka izgleda kao šav. Promatramo [data-dark] u pojasu zaglavlja.
  useEffect(() => {
    const darks = document.querySelectorAll("[data-dark]");
    if (!darks.length) return;
    // Skup, ne zadnji entry: kontakt i podnožje su dva zasebna elementa
    // pa bi se inače utrkivali i traka bi treptala na granici među njima.
    const active = new Set<Element>();
    let io: IntersectionObserver | null = null;
    // Pojas visine zaglavlja (76 px) na vrhu ekrana, u pikselima. Prije je
    // bio "-76px 0px -100% 0px" — pojas bez visine; Chromium ga je
    // tolerirao, a WebKit (iPhone) nikad nije javio presjek, pa je traka
    // ostajala svijetla iznad tamnog kontakta (QA-3).
    const watch = () => {
      io?.disconnect();
      active.clear();
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) =>
            e.isIntersecting ? active.add(e.target) : active.delete(e.target),
          );
          setOnDark(active.size > 0);
        },
        { rootMargin: `0px 0px -${Math.max(0, window.innerHeight - 76)}px 0px`, threshold: 0 },
      );
      darks.forEach((d) => io!.observe(d));
    };
    watch();
    window.addEventListener("resize", watch);
    return () => {
      window.removeEventListener("resize", watch);
      io?.disconnect();
    };
  }, []);

  // Escape zatvara izbornik — inače je na tipkovnici zamka
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          // Uvjeti moraju biti složeni, ne isključivi: prije je nad tamnom
          // sekcijom traka dobivala svijetli tekst ALI nikakvu podlogu,
          // pa je na granici ispadalo krem na krem.
          [
            open ? "" : solid ? (onDark ? "bg-ink/85 backdrop-blur-md" : "bg-limestone/85 backdrop-blur-md") : "",
            !open && onDark ? "text-limestone" : "",
          ]
            .filter(Boolean)
            .join(" ")
        }`}
      >
        <div className="shell flex h-[68px] items-center justify-between gap-4 sm:h-[76px]">
          <Link
            href={`${t.home}#top`}
            onClick={() => setOpen(false)}
            className="relative z-50 -my-3 block py-3"
          >
            {/* zip, brand od 2026-09-15; rjeđe crte jer je logo malen */}
            <ZipLogo id="zip-nav" pitch={17} className="h-9 w-auto" />
          </Link>

          {/* Izbornik govori jezikom oznaka (mono, verzal, razmaknuto) kao
              .eyebrow i brojevi projekata. Prije je bio isti font i veličina
              kao rečenice ispod, pa traka nije imala vlastiti glas. */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
            {nav.links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`ulink -my-3 py-3 text-[0.8125rem] font-semibold uppercase tracking-[0.08em] transition-colors ${onDark ? "text-limestone/65 hover:text-limestone" : "text-muted hover:text-ink"}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={`${t.home}#contact`}
              className={`btn hidden !px-5 !py-2.5 !text-sm md:inline-flex ${onDark ? "btn-on-dark" : "btn-primary"}`}
            >
              {nav.cta}
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative z-50 -mr-2 grid h-11 w-11 place-items-center md:hidden"
            >
              <span className="sr-only">{open ? nav.closeMenu : nav.openMenu}</span>
              {/* Znak je iz logotipa: tri debele crte koje se otvaranjem
                  nagnu na 45°, u istom smjeru kao šrafura u "zip"
                  (Petar, 2026-09-15). Zato tri, a ne dvije koje se križaju. */}
              <span
                aria-hidden="true"
                className={`relative block h-[17px] w-7 transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  open ? "-rotate-45" : ""
                }`}
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="absolute left-0 top-0 block h-[3px] w-7 rounded-full bg-current transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ transform: `translateY(${i * (open ? 5.5 : 7)}px)` }}
                  />
                ))}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Punoekranski izbornik — mobitel */}
      <div
        id="mobile-menu"
        hidden={!open}
        className={`fixed inset-0 z-40 bg-limestone transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="shell flex h-full flex-col justify-center gap-1 pb-20">
          {nav.links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2 font-display text-[clamp(2.5rem,12vw,3.75rem)] font-extrabold leading-[1.05] tracking-[-0.035em]"
              style={{
                transitionDelay: open ? `${80 + i * 55}ms` : "0ms",
                transitionProperty: "opacity, transform",
                transitionDuration: "500ms",
                transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
                opacity: open ? 1 : 0,
                transform: open ? "none" : "translateY(14px)",
              }}
            >
              {l.label}
            </Link>
          ))}

          <Link
            href={`${t.home}#contact`}
            onClick={() => setOpen(false)}
            className="btn btn-primary mt-8 justify-center"
          >
            {nav.cta}
          </Link>
        </div>
      </div>
    </>
  );
}
