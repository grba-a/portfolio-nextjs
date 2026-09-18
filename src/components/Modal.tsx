"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Popup na nativnom <dialog>.
 *
 * Nativni element daje zamku za fokus, Escape i inertnost pozadine bez
 * ijednog retka našeg koda — ručne implementacije to redovito promaše
 * (mobilni izbornik je prije imao 33 elementa dostupna tabom iza prekrivača).
 *
 * Otvara se ISKLJUČIVO na korisnikovu radnju. Popup koji iskoči sam ruši
 * konverziju; popup koji je čovjek sam otvorio je korisna kratica.
 */
export default function Modal({
  open,
  onClose,
  label,
  children,
  wide = false,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
  wide?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) {
      el.showModal();
      // Fokus na naslov, ne na X: dialog inače fokusira prvi gumb, a WebKit
      // mu i nakon dodira nacrta rust prsten — "zatvori" istaknut u trenutku
      // kad čovjek potvrđuje termin.
      titleRef.current?.focus({ preventScroll: true });
    }
    if (!open && el.open) el.close();
  }, [open]);

  // Zaključaj scroll pozadine dok je otvoreno
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      onCancel={onClose}
      // Klik na podlogu zatvara; klik unutar sadržaja ne
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      // Statične klase, ne template literal: Tailwind skenira izvor i klasu
      // složenu u stringu pri izvođenju nikad ne bi ni generirao.
      className={`m-auto overflow-hidden rounded-[22px] border border-line-2 bg-card p-0 text-fg backdrop:bg-black/70 backdrop:backdrop-blur-sm ${
        wide ? "w-[min(94vw,980px)]" : "w-[min(94vw,760px)]"
      }`}
    >
      <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3">
        <p ref={titleRef} tabIndex={-1} className="text-sm font-medium text-fg-2 outline-none">
          {label}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="-mr-2 grid h-11 w-11 place-items-center text-fg-3 transition-colors hover:text-fg"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="max-h-[78vh] overflow-y-auto">{children}</div>
    </dialog>
  );
}
