"use client";

import { useEffect, useLayoutEffect, useRef, useState, type FormEvent } from "react";
import { content } from "@/data/content";
import { site, whatsappHref } from "@/data/site";
import { revealIn } from "@/lib/anim/reveal";
import { ArrowUpRight, Send } from "@/components/icons";
import Modal from "@/components/Modal";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Zaključni blok — jedna glavna radnja, ne gomila gumba.
 *
 * Prije je ovdje stajalo tri gumba (WhatsApp, kalendar, poziv), dva
 * tekstualna kanala i forma od četiri polja. Previše odluka na mjestu
 * gdje čovjek treba donijeti samo jednu.
 *
 * Sada: kalendar je ugrađen pa se termin bira odmah, bez odlaska sa
 * stranice i bez razgovora sa strancem. Uz njega jedan gumb (WhatsApp)
 * za one koji žele prvo pitati, dva kanala kao tekst, i forma sklopljena
 * u <details> — kanal ostaje, ali ne troši pažnju.
 *
 * Kalendar nije ugrađen na stranicu nego u popup: iframe se montira tek
 * na klik, pa ne košta ništa dok ga netko ne otvori, i ne troši 680 px
 * visine stranice. Bez embed skripte i bez API ključa — stranica je
 * statična, pa bi svaki ključ u kodu bio javan.
 *
 * Stvarne slobodne termine ne možemo prikazati bez API ključa; kalendar
 * ih pokazuje sam, unutar popupa.
 */
export default function BookCall() {
  const scope = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [calOpen, setCalOpen] = useState(false);
  const [calUrl, setCalUrl] = useState<string | null>(null);
  const [slots, setSlots] = useState<string[]>([]);

  /**
   * Sljedeći slobodni termini dolaze s NAŠE rute, ne izravno s Cal.coma —
   * API ključ tako ostaje na serveru. Ako ruta vrati prazno (nema ključa,
   * Cal.com ne odgovara), sekcija samo prikaže gumb za cijeli kalendar.
   * Posjetitelj nikad ne vidi grešku.
   */
  useEffect(() => {
    let alive = true;
    fetch("/api/slots")
      .then((r) => (r.ok ? r.json() : { slots: [] }))
      .then((d) => alive && setSlots(Array.isArray(d.slots) ? d.slots : []))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const openCal = (iso?: string) => {
    const base = site.booking ?? "";
    if (iso) {
      const d = iso.slice(0, 10);
      setCalUrl(`${base}?embed=true&theme=light&date=${d}&month=${d.slice(0, 7)}&slot=${encodeURIComponent(iso)}`);
    } else {
      setCalUrl(`${base}?embed=true&theme=light`);
    }
    setCalOpen(true);
  };

  const fmt = (iso: string) =>
    new Intl.DateTimeFormat("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: site.timeZone,
    }).format(new Date(iso));

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
    "focus-visible:outline-[--color-rust-light]";

  const labelCls =
    "font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-limestone/70";

  return (
    <section ref={scope} id="contact" data-dark className="scroll-mt-16 bg-ink text-limestone">
      <div className="shell py-20 sm:py-28 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Poziv */}
          <div className="lg:col-span-5" data-reveal-group>
            <h2 className="eyebrow caret block !text-limestone/70" data-reveal>
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

            {/* Jedan gumb, ne tri — za one koji žele prvo pitati, a ne odmah termin */}
            <div className="mt-8 flex flex-col gap-3" data-cta data-reveal>
              {whatsappHref && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-on-dark justify-center sm:self-start"
                >
                  {content.book.whatsappLabel}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
            </div>

            {/* Ostali kanali kao tekst, ne kao još gumba */}
            <div className="mt-7 flex flex-col gap-1" data-reveal>
              <a
                href={`tel:${site.phone}`}
                className="ulink -my-1.5 inline-flex min-h-11 items-center font-mono text-sm text-limestone/75"
              >
                {site.phoneDisplay}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="ulink -my-1.5 inline-flex min-h-11 items-center break-all font-mono text-sm text-limestone/75"
              >
                {site.email}
              </a>
            </div>

            <p className="mt-3 text-sm text-limestone/70" data-reveal>
              {content.book.reply}
            </p>
            <p className="mt-1.5 text-sm text-limestone/70" data-reveal>
              {content.book.language}
            </p>
          </div>

          {/* Kalendar uživo — termin se bira odmah, bez odlaska sa stranice.
              Prikazuje se samo ako poveznica postoji; dok Cal.com termini
              nisu objavljeni, `site.booking` je null i cijeli blok otpada
              umjesto da vodi na 404. */}
          <div className="lg:col-span-7" data-reveal-group>
            {site.booking && (
              <>
            <h3 className="eyebrow block !text-limestone/70" data-reveal>
              {content.book.calendarLabel}
            </h3>

            <div
              className="mt-4 border border-limestone/20 p-5 sm:p-6"
              data-reveal
            >
              <p className="font-display text-xl font-extrabold tracking-[-0.02em]">
                {content.book.calendarTitle}
              </p>
              <p className="mt-1.5 text-sm text-limestone/75">
                {content.book.calendarNote}
              </p>

              {/* Mjesto je rezervirano da dolazak termina ne pomakne raspored */}
              <div className="mt-5 min-h-[3.25rem]">
                {slots.length > 0 ? (
                  <>
                    <p className="eyebrow !text-limestone/70">
                      {content.book.nextFree}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {slots.map((iso) => (
                        <button
                          key={iso}
                          type="button"
                          onClick={() => openCal(iso)}
                          className="inline-flex min-h-11 items-center border border-limestone/40 px-3.5 text-sm text-limestone transition-colors hover:border-limestone hover:bg-limestone/10"
                        >
                          {fmt(iso)}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => openCal()}
                        className="ulink -my-2 inline-flex min-h-11 items-center px-1 text-sm text-limestone/75"
                      >
                        {content.book.otherTimes}
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => openCal()}
                    className="btn btn-on-dark w-full justify-center sm:w-auto"
                  >
                    {content.book.calendarCta}
                  </button>
                )}
              </div>

              <p className="mt-4 text-sm text-limestone/70">
                {content.book.calendarFallback}{" "}
                <a
                  href={site.booking ?? "#contact"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ulink -my-2 inline-flex min-h-11 items-center text-limestone"
                >
                  cal.com
                </a>
              </p>
            </div>

              </>
            )}

            {/* Forma ostaje kao kanal, ali sklopljena — ne troši pažnju */}
            <details className="mt-8 border-t border-limestone/20 pt-6" data-reveal>
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
                  <input type="hidden" name="_subject" value="New message from petargrbic.com" />
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
                          <p id={`${key}-error`} className="mt-2 text-sm text-[--color-rust-light]">
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
                    <p role="alert" className="mt-4 text-sm text-[--color-rust-light]">
                      {content.book.errorServer}
                    </p>
                  )}
                </form>
              )}
            </details>
          </div>
        </div>
      </div>

      {/* Iframe se montira tek kad je popup otvoren — dok nije, ne košta ništa */}
      <Modal
        open={calOpen && !!site.booking}
        onClose={() => setCalOpen(false)}
        label={content.book.calendarLabel}
        wide
      >
        {calOpen && calUrl && (
          <iframe
            src={calUrl}
            title={content.book.calendarLabel}
            className="h-[70vh] min-h-[520px] w-full border-0"
          />
        )}
      </Modal>
    </section>
  );
}
