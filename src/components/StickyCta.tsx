"use client";

import { useEffect, useState } from "react";
import { site, waHref } from "@/data/site";
import { content, type Copy } from "@/data/content";
import { Phone } from "@/components/icons";

/**
 * Ljepljiva traka s kontaktom — samo mobitel.
 *
 * Izmjereno prije ovoga: stranica je 10,4 ekrana, a ekrani 1 do 7 nisu imali
 * NIJEDAN CTA. Prvi telefon je bio na 83 % dubine. Cijela sekcija Radovi —
 * koja gradi najviše želje — završavala je s četiri poveznice van stranice
 * i ničim natrag.
 *
 * Traka se pojavi kad hero prođe i skloni se kad kontakt uđe u kadar,
 * da ne dupla ono što je već na ekranu.
 *
 * Na desktopu je ne treba: tamo CTA stalno stoji u zaglavlju.
 */
export default function StickyCta({ t = content }: { t?: Copy }) {
  const [show, setShow] = useState(false);
  const whatsappHref = waHref(t.whatsappText);

  useEffect(() => {
    let pastHero = false;
    // Skup, ne jedan element: stranica ima više CTA blokova, a traka
    // ne smije duplirati gumb koji je već na ekranu.
    const visibleCtas = new Set<Element>();
    const sync = () => setShow(pastHero && visibleCtas.size === 0);

    const onScroll = () => {
      pastHero = window.scrollY > window.innerHeight * 0.9;
      sync();
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const blocks = document.querySelectorAll("[data-cta]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) =>
          e.isIntersecting ? visibleCtas.add(e.target) : visibleCtas.delete(e.target),
        );
        sync();
      },
      // Donji rub skraćen za visinu trake: traka nestane tek kad gumb
      // stranice bude CIJELI iznad nje. S 0.6 je ležala 18 px preko njega,
      // a s punim rubom se gasila dok je gumb još presječen dnom ekrana.
      { threshold: 0, rootMargin: "0px 0px -72px 0px" },
    );
    blocks.forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-limestone/95 backdrop-blur-md transition-transform duration-300 ease-out motion-reduce:transition-none sm:hidden print:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex gap-2 px-4 py-3">
        {whatsappHref && (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={show ? 0 : -1}
            className="btn btn-primary flex-[3] justify-center whitespace-nowrap !py-3.5"
          >
            {t.book.stickyLabel}
          </a>
        )}
        <a
          href={`tel:${site.phone}`}
          tabIndex={show ? 0 : -1}
          aria-label={`Call ${site.phoneDisplay}`}
          className="btn btn-ghost flex-1 justify-center !py-3.5"
        >
          <Phone className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}
