"use client";

import { useLayoutEffect, useRef, useState, type FormEvent } from "react";
import { content } from "@/data/content";
import { site, whatsappHref } from "@/data/site";
import { revealIn } from "@/lib/anim/reveal";
import { ArrowUpRight, Send } from "@/components/icons";
import Booker from "@/components/Booker";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Zaključni blok — jedna glavna radnja, ne gomila gumba.
 *
 * Od 2026-09-14 glavna radnja je besplatna provjera preko WhatsAppa; forma
 * traži adresu stranice, a kalendar je "radije poziv?".
 *
 * Kalendar je sada NA stranici, ne u popupu: kupac vidi slobodne dane i sate
 * odmah, kao na svakoj ozbiljnoj stranici za rezervacije, i bira termin bez
 * ijednog klika u prazno. Prije je ovdje stajala kartica s tri termina koja
 * je otvarala popup — dva koraka do onoga što se sada vidi odmah.
 *
 * Kalendar je VLASTITI (Booker), ne Cal.com iframe: ugrađeni okvir je na
 * mobitelu bio kolona od 1665 px unutar 680 px, pa se skrolalo unutar
 * okvira. Cal.com se sada učita tek kad kupac odabere termin, i to ravno
 * na obrazac za potvrdu.
 */
export default function BookCall() {
  const scope = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  useLayoutEffect(() => {
    if (!scope.current) return;
    return revealIn(scope.current);
  }, []);

  function validate(data: FormData) {
    const next: Record<string, string> = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name) next.name = content.book.required;
    if (!email) next.email = content.book.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
      next.email = content.book.invalidEmail;
    if (!message) next.message = content.book.required;

    return next;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(site.formspree, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("bad response");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  // `outline-none` je prije gasio globalni fokus prsten baš na poljima forme.
  const field =
    "mt-2 w-full border-b border-limestone/30 bg-transparent pb-4 pt-1.5 text-base " +
    "text-limestone transition-colors placeholder:text-limestone/45 " +
    "focus:border-limestone focus-visible:outline-2 focus-visible:outline-offset-4 " +
    "focus-visible:outline-(--color-rust-light)";

  const labelCls =
    "text-sm font-semibold text-limestone/75";

  return (
    <section ref={scope} id="contact" data-dark className="scroll-mt-24 bg-ink text-limestone">
      <div className="shell py-20 sm:py-28 lg:py-32">
        {/*
         * Redoslijed u kodu = redoslijed na mobitelu: naslov, pa KALENDAR, pa
         * ostali kanali. Glavna radnja ne smije biti treća stvar koju vidiš.
         *
         * Na širokom ekranu kalendar ide preko CIJELE širine, u vlastiti
         * redak. Cal.com složi mjesec i stupac sati jedno uz drugo tek od
         * ~900 px; u užem stupcu se presloži u kolonu visoku 1665 px, pa se
         * termini vide tek skrolanjem unutar okvira. Mjereno, ne procijenjeno.
         */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-12 lg:content-start">
          {/* 1 — provjera: naslov, pa odmah WhatsApp. Glavna radnja ne smije
              biti treća stvar koju vidiš. */}
          <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1" data-reveal-group>
            <h2 className="eyebrow block !text-limestone/70" data-reveal>
              {content.book.eyebrow}
            </h2>

            <p
              className="mt-4 font-display text-[clamp(2.25rem,9vw,3.75rem)] font-extrabold leading-[0.95] tracking-[-0.035em]"
              data-reveal
            >
              {content.book.heading}
            </p>

            <p
              className="mt-6 max-w-[38ch] text-[1.0625rem] leading-relaxed text-limestone/75"
              data-reveal
            >
              {content.book.sub}
            </p>

            {whatsappHref && (
              <div className="mt-7 flex flex-col gap-3" data-cta data-reveal>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-on-dark justify-center sm:self-start"
                >
                  {content.book.whatsappLabel}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            )}

            {/* Telefon i mail kao tekst, ne kao još gumba */}
            <div className="mt-6 flex flex-col gap-1" data-reveal>
              <a
                href={`tel:${site.phone}`}
                className="ulink -my-1.5 inline-flex min-h-11 items-center text-sm font-medium text-limestone/75"
              >
                {site.phoneDisplay}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="ulink -my-1.5 inline-flex min-h-11 items-center break-all text-sm font-medium text-limestone/75"
              >
                {site.email}
              </a>
            </div>

            <p className="mt-3 text-sm text-limestone/70" data-reveal>
              {content.book.reply} {content.book.language}
            </p>
          </div>

          {/* 2 — forma, za one koji radije pišu mail: traži adresu stranice.
              Na mobitelu ide PRIJE kalendara; na desktopu stoji lijevo dolje. */}
          <div className="lg:col-span-5 lg:col-start-1 lg:row-start-2" data-reveal-group>
            <details className="border-t border-limestone/20 pt-6" data-reveal>
              <summary className="ulink inline-flex min-h-11 cursor-pointer items-center text-sm text-limestone/75">
                {content.book.formToggle}
              </summary>

              {status === "sent" ? (
                <p
                  role="status"
                  className="mt-5 border-l-2 border-limestone pl-4 text-[1.0625rem] leading-relaxed"
                >
                  {content.book.success}
                </p>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="mt-5 max-w-md">
                  <input type="hidden" name="_subject" value="Free website check request from petargrbic.com" />
                  <input type="hidden" name="_format" value="plain" />
                  <input type="text" name="_gotcha" className="hidden" tabIndex={-1} aria-hidden="true" />

                  {(["name", "email", "message"] as const).map((key) => {
                    const err = errors[key];
                    return (
                      <div key={key} className="mb-6">
                        <label htmlFor={key} className={labelCls}>
                          {content.book[key]}
                        </label>

                        {key === "message" ? (
                          <textarea
                            id={key}
                            name={key}
                            rows={3}
                            placeholder={content.book.messagePlaceholder}
                            aria-invalid={!!err}
                            aria-describedby={err ? `${key}-error` : undefined}
                            className={`${field} resize-none`}
                          />
                        ) : (
                          <input
                            id={key}
                            name={key}
                            type={key === "email" ? "email" : "text"}
                            autoComplete={key === "email" ? "email" : "name"}
                            aria-invalid={!!err}
                            aria-describedby={err ? `${key}-error` : undefined}
                            className={field}
                          />
                        )}

                        {err && (
                          <p id={`${key}-error`} className="mt-2 text-sm text-(--color-rust-light)">
                            {err}
                          </p>
                        )}
                      </div>
                    );
                  })}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn btn-on-dark w-full justify-center disabled:opacity-60 sm:w-auto"
                  >
                    {status === "sending" ? content.book.sending : content.book.send}
                    <Send />
                  </button>

                  <p className="mt-4 max-w-[40ch] text-sm text-limestone/70">
                    {content.book.afterSend}
                  </p>

                  {status === "error" && (
                    <p role="alert" className="mt-4 text-sm text-(--color-rust-light)">
                      {content.book.errorServer}
                    </p>
                  )}
                </form>
              )}
            </details>
          </div>

          {/* 3 — radije poziv: mreža dana + termini odmah ispod nje */}
          {site.booking && (
            <div
              data-cta
              className="lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1"
              data-reveal-group
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1" data-reveal>
                <h3 className="eyebrow block !text-limestone/70">
                  {content.book.pickDay}
                </h3>
                <p className="text-sm text-limestone/60">
                  {content.book.calendarTitle}
                </p>
              </div>

              {/* Sve unutar Bookera je klijentsko i mijenja se pri odabiru
                  dana — data-reveal ide na OKVIR, nikad na ćelije. */}
              <div className="mt-4" data-reveal>
                <Booker />
              </div>

              {/* Ova poveznica nije ukras: ona je jedini href u pojasu
                  kalendara, a blok nosi data-cta i time gasi ljepljivu traku. */}
              <p className="mt-4 text-sm text-limestone/60" data-reveal>
                {content.book.calendarFallback}{" "}
                <a
                  href={site.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ulink -my-2 inline-flex min-h-11 items-center text-limestone"
                >
                  cal.com
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
