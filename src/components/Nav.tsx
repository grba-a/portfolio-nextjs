"use client";

import { useEffect, useState } from "react";
import { content } from "@/data/content";
import ZipLogo from "@/components/ZipLogo";

/**
 * Mobile-first navigacija.
 * Mobitel: ime + hamburger, pa punoekranski izbornik s velikim metama za palac.
 * Od 768px: traka s poveznicama i jednim CTA-om.
 */
export default function Nav() {
  const { nav } = content;
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
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) =>
          e.isIntersecting ? active.add(e.target) : active.delete(e.target),
        );
        setOnDark(active.size > 0);
      },
      { rootMargin: "-76px 0px -100% 0px", threshold: 0 },
    );
    darks.forEach((d) => io.observe(d));
    return () => io.disconnect();
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
          <a
            href="#top"
            onClick={() => setOpen(false)}
            className="relative z-50 -my-3 block py-3"
          >
            {/* zip, brand od 2026-09-15; rjeđe crte jer je logo malen */}
            <ZipLogo id="zip-nav" pitch={17} className="h-9 w-auto" />
          </a>

          {/* Izbornik govori jezikom oznaka (mono, verzal, razmaknuto) kao
              .eyebrow i brojevi projekata. Prije je bio isti font i veličina
              kao rečenice ispod, pa traka nije imala vlastiti glas. */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
            {nav.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`ulink -my-3 py-3 font-mono text-xs uppercase tracking-[0.12em] transition-colors ${onDark ? "text-limestone/65 hover:text-limestone" : "text-muted hover:text-ink"}`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className={`btn hidden !px-5 !py-2.5 !text-sm md:inline-flex ${onDark ? "btn-on-dark" : "btn-primary"}`}
            >
              {nav.cta}
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative z-50 -mr-2 grid h-11 w-11 place-items-center md:hidden"
            >
              <span className="sr-only">{open ? nav.closeMenu : nav.openMenu}</span>
              <span aria-hidden="true" className="relative block h-3 w-6">
                <span
                  className={`absolute left-0 block h-px w-6 bg-current transition-all duration-300 ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-6 bg-current transition-all duration-300 ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
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
            <a
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
            </a>
          ))}

          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="btn btn-primary mt-8 justify-center"
          >
            {nav.cta}
          </a>
        </div>
      </div>
    </>
  );
}
