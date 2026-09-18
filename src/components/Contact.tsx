"use client";

import { useState, type FormEvent } from "react";
import { content, type Copy } from "@/data/content";
import { site, waHref } from "@/data/site";
import FadeHeading from "@/components/ui/FadeHeading";
import Eyebrow from "@/components/ui/Eyebrow";
import Booker from "@/components/Booker";
import { ArrowUpRight, Chat, Send } from "@/components/icons";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Kontakt: WhatsApp prvi (odluka 17B, i odluka 14. 9. za hladne vlasnike).
 * Telefon krupno, e-mail ispod. Kalendar je "Radije poziv?": na mobitelu se
 * otvara na dodir, na desktopu stoji desno otvoren. Booker je uvijek
 * montiran, pa se termini učitavaju jednom, bez obzira na širinu.
 * Obrazac za e-mail ostaje kao i prije, sklopljen.
 */
export default function Contact({ t = content }: { t?: Copy }) {
  const { book } = t;
  const whatsappHref = waHref(t.whatsappText);
  const [callOpen, setCallOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(data: FormData) {
    const next: Record<string, string> = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name) next.name = book.required;
    if (!email) next.email = book.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = book.invalidEmail;
    if (!message) next.message = book.required;
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

  const field =
    "mt-2 w-full rounded-xl border border-line-2 bg-white/[0.04] px-4 py-3 text-base text-fg " +
    "transition-colors placeholder:text-fg-3 focus:border-fg focus:outline-none";

  return (
    <section id="contact" aria-labelledby="contact-h" className="relative scroll-mt-24 overflow-hidden border-t border-line py-20 sm:py-32">
      <div className="grid-light" aria-hidden="true" />
      <div className="shell relative grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
        <div className="grid content-start gap-5" data-cta>
          <Eyebrow>{book.eyebrow}</Eyebrow>
          <FadeHeading id="contact-h" lines={book.heading} />
          <p className="t-lede">{book.sub}</p>

          {whatsappHref && (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg mt-2 w-full sm:w-fit"
            >
              <Chat />
              {book.whatsappLabel}
            </a>
          )}

          <div className="mt-4 grid gap-1">
            <p className="text-[0.8125rem] text-fg-3">{book.callLabel}</p>
            <a
              href={`tel:${site.phone}`}
              className="tnum -my-1 inline-flex min-h-11 w-fit items-center text-[clamp(1.75rem,8vw,2.5rem)] font-semibold tracking-[-0.035em] text-fg"
            >
              {site.phoneDisplay}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="-my-1.5 inline-flex min-h-11 w-fit items-center break-all text-[1.0625rem] text-fg-2 transition-colors duration-200 hover:text-fg"
            >
              {site.email}
            </a>
            <p className="mt-2 text-sm text-fg-3">
              {book.reply} {book.language}
            </p>
          </div>

          {/* E-mail obrazac, kao i prije: sklopljen, za one koji radije pišu */}
          <details className="mt-4 border-t border-line pt-5">
            <summary className="inline-flex min-h-11 cursor-pointer items-center text-sm text-fg-2 underline underline-offset-4 hover:text-fg">
              {book.formToggle}
            </summary>
            {status === "sent" ? (
              <p role="status" className="mt-5 text-[1.0625rem] leading-relaxed">
                {book.success}
              </p>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-5 grid max-w-md gap-5">
                <input type="hidden" name="_subject" value="Free website check request from donebyzip.com" />
                <input type="hidden" name="_format" value="plain" />
                <input type="text" name="_gotcha" className="hidden" tabIndex={-1} aria-hidden="true" />
                {(["name", "email", "message"] as const).map((key) => {
                  const err = errors[key];
                  return (
                    <div key={key}>
                      <label htmlFor={key} className="text-sm font-medium text-fg-2">
                        {book[key]}
                      </label>
                      {key === "message" ? (
                        <textarea
                          id={key}
                          name={key}
                          rows={3}
                          placeholder={book.messagePlaceholder}
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
                        <p id={`${key}-error`} className="mt-2 text-sm text-fg">
                          {err}
                        </p>
                      )}
                    </div>
                  );
                })}
                <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full disabled:opacity-60 sm:w-fit">
                  {status === "sending" ? book.sending : book.send}
                  <Send />
                </button>
                <p className="text-sm text-fg-3">{book.afterSend}</p>
                {status === "error" && (
                  <p role="alert" className="text-sm text-fg">
                    {book.errorServer}
                  </p>
                )}
              </form>
            )}
          </details>
        </div>

        {site.booking && (
          <div className="grid content-start gap-4" data-cta>
            <button
              type="button"
              onClick={() => setCallOpen((o) => !o)}
              aria-expanded={callOpen}
              aria-controls="call-panel"
              className="flex min-h-14 items-center justify-between rounded-[18px] border border-line px-5 text-left text-base font-medium lg:pointer-events-none lg:border-0 lg:px-0"
            >
              <span className="grid">
                {book.pickDay}
                <span className="text-[0.8125rem] font-normal text-fg-3">{book.calendarTitle}</span>
              </span>
              <span aria-hidden="true" className={`text-xl text-fg-3 transition-transform duration-200 lg:hidden ${callOpen ? "rotate-45" : ""}`}>
                +
              </span>
            </button>

            <div id="call-panel" className={`${callOpen ? "block" : "hidden"} lg:block`}>
              <div className="card p-4 sm:p-6">
                <Booker t={t} />
              </div>
              <p className="mt-4 text-sm text-fg-3">
                {book.calendarFallback}{" "}
                <a
                  href={site.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="-my-2 inline-flex min-h-11 items-center gap-1 text-fg underline underline-offset-4"
                >
                  cal.com
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
