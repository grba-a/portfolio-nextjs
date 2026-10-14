"use client";

import { useState } from "react";

/**
 * Kalkulator provizije za smještaj (Petar: Da u artifactu, 2026-10-14).
 * Vlasnik upiše svoje brojke i vidi koliko godišnje ide portalu. Početne
 * vrijednosti su PRIMJER i tako piše ispod; nisu ničiji stvarni podaci.
 * Postotak provizije upisuje vlasnik, jer se razlikuje po portalu i ugovoru.
 */
const copy = {
  en: {
    heading: "What the portals cost you",
    nights: "Nights booked through portals, per year",
    price: "Average price per night (€)",
    rate: "Portal commission (%)",
    result: "a year goes to commission",
    note: "The numbers above are an example. Enter your own. Every booking that comes directly through your own site keeps that commission, minus payment fees.",
    locale: "en-GB",
  },
  hr: {
    heading: "Koliko vas koštaju portali",
    nights: "Noćenja preko portala, godišnje",
    price: "Prosječna cijena noćenja (€)",
    rate: "Provizija portala (%)",
    result: "godišnje ode na proviziju",
    note: "Brojke gore su primjer. Upišite svoje. Svaka rezervacija koja dođe izravno preko vaše stranice tu proviziju zadrži, umanjeno za troškove naplate.",
    locale: "hr-HR",
  },
};

export default function CommissionCalc({ lang }: { lang: "en" | "hr" }) {
  const c = copy[lang];
  const [nights, setNights] = useState("120");
  const [price, setPrice] = useState("90");
  const [rate, setRate] = useState("15");
  const n = (v: string) => Math.max(0, Number(v.replace(",", ".")) || 0);
  const total = Math.round((n(nights) * n(price) * Math.min(n(rate), 100)) / 100);

  const field = (id: string, label: string, value: string, set: (v: string) => void, max?: number) => (
    <label htmlFor={id} className="grid grid-cols-[minmax(0,1fr)_6.5rem] items-center gap-3 text-[0.9375rem] text-fg-2">
      {label}
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min={0}
        max={max}
        value={value}
        onChange={(e) => set(e.target.value)}
        className="tnum min-h-11 w-full rounded-xl border border-line-2 bg-void px-3 text-right text-base text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
      />
    </label>
  );

  return (
    <div className="card grid gap-6 p-5 sm:p-7 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center lg:gap-10">
      <div className="grid gap-4">
        <h2 className="t-h3">{c.heading}</h2>
        {field(`calc-n-${lang}`, c.nights, nights, setNights)}
        {field(`calc-p-${lang}`, c.price, price, setPrice)}
        {field(`calc-r-${lang}`, c.rate, rate, setRate, 100)}
      </div>
      <div className="grid gap-3">
        <output
          htmlFor={`calc-n-${lang} calc-p-${lang} calc-r-${lang}`}
          aria-live="polite"
          className="grid gap-1 rounded-[18px] bg-fg p-5 text-void"
        >
          <span className="tnum text-[clamp(2rem,8vw,2.75rem)] font-semibold leading-none tracking-[-0.04em]">
            {total.toLocaleString(c.locale)} €
          </span>
          <span className="text-[0.9375rem] text-black/65">{c.result}</span>
        </output>
        <p className="text-sm text-fg-3">{c.note}</p>
      </div>
    </div>
  );
}
