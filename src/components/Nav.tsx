"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { content, type Copy } from "@/data/content";
import ZipLogo from "@/components/ZipLogo";

/**
 * Plutajuća staklena kapsula (odluka 6A).
 *
 * Mobitel: logo i hamburger; izbornik je staklena ploča koja raste iz
 * hamburgera (transform-origin gore desno). Gumb "Free check" u zaglavlju
 * na mobitelu se ne prikazuje, jer dolje već stoji staklena kapsula s istom
 * radnjom (Petar, 2026-09-18). Od 768 px: poveznice u sredini, jezik i CTA.
 */
export default function Nav({ t = content }: { t?: Copy }) {
  const { nav, footer } = t;
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!panel.current?.contains(target) && !button.current?.contains(target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 px-3 print:hidden"
      style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 12px)" }}
    >
      <a href="#main" className="skip">
        Skip to content
      </a>

      <div
        data-refract
        className="glass mx-auto flex h-14 max-w-[1100px] items-center gap-1 rounded-full pl-5 pr-2 [--g-bg:rgb(18_18_20/0.5)] [--g-blur:14px]"
      >
        <Link href={t.home} aria-label="zip" className="-my-2 mr-2 flex min-h-11 items-center text-fg">
          <ZipLogo id="zip-nav" pitch={16} className="h-[22px] w-auto" />
        </Link>

        <nav aria-label="Main" className="hidden flex-1 justify-center md:flex">
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-[0.9375rem] text-fg-2 transition-colors duration-200 hover:text-fg"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <span className="flex-1 md:hidden" />

        <a
          href={footer.langHref}
          hrefLang={t.lang === "en" ? "hr" : "en"}
          className="hidden min-h-11 items-center px-3 text-sm text-fg-3 transition-colors duration-200 hover:text-fg md:inline-flex"
        >
          {footer.langLabel}
        </a>
        <a href={`${t.home}#contact`} className="btn btn-primary btn-sm hidden md:inline-flex">
          {nav.cta}
        </a>

        <button
          ref={button}
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="nav-menu"
          aria-label={open ? nav.closeMenu : nav.openMenu}
          className="grid h-11 w-11 place-content-center gap-[4px] rounded-full md:hidden"
        >
          {/* Tri deblje crte koje se okrenu za -45°, kao kose crte u logu */}
          {[0, 1, 2].map((i) => (
            <i
              key={i}
              className={`block h-[2.5px] w-[17px] rounded-full bg-fg transition-transform duration-300 ease-out ${
                open ? "-rotate-45" : ""
              }`}
            />
          ))}
        </button>
      </div>

      <div
        ref={panel}
        id="nav-menu"
        data-open={open}
        inert={!open}
        className="menu-panel glass absolute right-3 mt-2 w-[min(18rem,calc(100vw-1.5rem))] rounded-[26px] p-2.5 md:hidden [--g-bg:rgb(18_18_20/0.72)] [--g-blur:20px]"
      >
        <nav aria-label="Menu" className="grid">
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-[14px] px-3 py-3 text-[1.0625rem] font-medium tracking-[-0.015em] text-fg"
            >
              {l.label}
            </a>
          ))}
          <a
            href={footer.langHref}
            hrefLang={t.lang === "en" ? "hr" : "en"}
            className="rounded-[14px] px-3 py-3 text-[1.0625rem] font-medium tracking-[-0.015em] text-fg"
          >
            <small className="block text-xs font-normal text-fg-3">{nav.langCaption}</small>
            {footer.langLabel}
          </a>
        </nav>
      </div>
    </header>
  );
}
