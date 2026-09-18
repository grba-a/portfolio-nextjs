"use client";

import { useEffect, useState } from "react";
import { waHref } from "@/data/site";
import { content, type Copy } from "@/data/content";
import { Chat } from "@/components/icons";

/**
 * Staklena kapsula pod palcem — samo mobitel (odluka 19A).
 *
 * Pojavi se kad hero ode s ekrana i skloni se čim je u kadru neki drugi
 * blok s istom radnjom ([data-cta]), da ne dupla ono što već stoji.
 * Dolazi kao materijal: zamućenje i veličina se slože zajedno.
 */
export default function StickyCta({ t = content }: { t?: Copy }) {
  const [show, setShow] = useState(false);
  const whatsappHref = waHref(t.whatsappText);

  useEffect(() => {
    let pastHero = false;
    const visible = new Set<Element>();
    const sync = () => setShow(pastHero && visible.size === 0);

    const onScroll = () => {
      pastHero = window.scrollY > window.innerHeight * 0.85;
      sync();
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
        sync();
      },
      { threshold: 0, rootMargin: "0px 0px -80px 0px" },
    );
    document.querySelectorAll("[data-cta]").forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  if (!whatsappHref) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 md:hidden print:hidden"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 14px)" }}
    >
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        data-show={show}
        data-refract
        aria-hidden={!show}
        tabIndex={show ? 0 : -1}
        className="sticky-cta glass flex h-14 items-center gap-3 rounded-full pl-5 pr-2 text-[0.9375rem] font-medium text-fg [--g-bg:rgb(18_18_20/0.82)] [--g-blur:20px]"
      >
        {t.book.stickyLabel}
        <span className="grid h-10 w-10 place-items-center rounded-full bg-fg text-void">
          <Chat className="h-[18px] w-[18px]" />
        </span>
      </a>
    </div>
  );
}
