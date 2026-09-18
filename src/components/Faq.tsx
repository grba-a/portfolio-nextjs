"use client";

import { useState } from "react";
import { content, type Copy } from "@/data/content";
import FadeHeading from "@/components/ui/FadeHeading";
import Eyebrow from "@/components/ui/Eyebrow";

/**
 * Pitanja kao harmonika; otvoreno pitanje postaje bijelo (odluka 16A).
 * Svaki odgovor je rečenica koja već stoji na stranici. Visina se otvara
 * kroz grid-template-rows (.acc-panel), ne animiranjem height.
 */
export default function Faq({ t = content }: { t?: Copy }) {
  const { faq } = t;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-h" className="scroll-mt-24 py-20 sm:py-32">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div className="grid content-start gap-5 lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>{faq.eyebrow}</Eyebrow>
          <FadeHeading id="faq-h" lines={faq.heading} />
        </div>

        <div className="grid content-start gap-2">
          {faq.items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div
                key={it.q}
                data-open={isOpen}
                className={`acc overflow-hidden rounded-[18px] border transition-colors duration-200 ${
                  isOpen ? "border-transparent bg-fg text-void" : "border-line bg-card-hi/60 text-fg"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    id={`faq-b${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-p${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex min-h-14 w-full items-center justify-between gap-4 px-4 py-3.5 text-left text-[0.9375rem] font-medium tracking-[-0.01em] sm:px-5 sm:text-base"
                  >
                    {it.q}
                    <span
                      aria-hidden="true"
                      className={`acc-plus relative h-6 w-6 flex-none rounded-full ${isOpen ? "bg-black/10" : "bg-white/10"}`}
                    />
                  </button>
                </h3>
                <div id={`faq-p${i}`} role="region" aria-labelledby={`faq-b${i}`} className="acc-panel">
                  <div>
                    <p className={`px-4 pb-4 text-[0.9375rem] leading-relaxed sm:px-5 sm:pb-5 ${isOpen ? "text-black/65" : "text-fg-2"}`}>
                      {it.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
