"use client";

import { useLayoutEffect, useRef, useState, type FormEvent } from "react";
import { content } from "@/data/content";
import { site, whatsappHref } from "@/data/site";
import { revealIn } from "@/lib/anim/reveal";
import { ArrowUpRight, Send } from "@/components/icons";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Zaključni blok — jedina radnja na stranici.
 *
 * Tamno je namjerno i samo ovdje: hero i tijelo su vapnenasti, a zadnji
 * blok i podnožje su tamni kao zastor na kraju. Nije nasumična tamna
 * sekcija u sredini svijetle stranice, nego kraj.
 *
 * Forma ima stvarnu validaciju s porukama uz polje — bez window.alert,
 * i bez "Oops!". Mobile-first: polja su 16px da iOS ne zumira na fokus.
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

  const field =
    "mt-2 w-full border-b border-limestone/25 bg-transparent pb-3 text-base text-limestone " +
    "outline-none transition-colors placeholder:text-limestone/35 focus:border-limestone";

  return (
    <section
      ref={scope}
      id="contact"
      data-dark
      className="scroll-mt-16 bg-ink text-limestone"
    >
      <div className="shell py-20 sm:py-28 lg:py-36">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Poziv */}
          <div className="lg:col-span-6" data-reveal-group>
            <p className="eyebrow !text-limestone/45" data-reveal>
              {content.book.eyebrow}
            </p>

            <h2
              className="mt-4 text-[clamp(2.25rem,9vw,4.25rem)] leading-[0.95]"
              data-reveal
            >
              {content.book.heading}
            </h2>

            <p
              className="mt-6 max-w-[40ch] text-[1.0625rem] leading-relaxed text-limestone/60"
              data-reveal
            >
              {content.book.sub}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center" data-reveal>
              <a
                href={`mailto:${site.email}`}
                className="btn btn-on-dark justify-center sm:justify-start"
              >
                {content.book.emailLabel}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>

              {whatsappHref && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn justify-center border-limestone/30 text-limestone hover:border-limestone sm:justify-start"
                >
                  WhatsApp
                </a>
              )}
            </div>

            <a
              href={`mailto:${site.email}`}
              className="ulink -mb-2.5 mt-5 inline-block break-all py-2.5 font-mono text-sm text-limestone/70"
              data-reveal
            >
              {site.email}
            </a>

            <p className="mt-2 text-sm text-limestone/45" data-reveal>
              {content.book.reply}
            </p>

            <ul className="mt-9 flex flex-wrap gap-x-5 gap-y-2" data-reveal>
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ulink -my-2.5 inline-block py-2.5 text-sm text-limestone/60 hover:text-limestone"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Forma */}
          <div className="lg:col-span-5 lg:col-start-8" data-reveal-group>
            <p className="eyebrow !text-limestone/45" data-reveal>
              {content.book.formHeading}
            </p>

            {status === "sent" ? (
              <p
                role="status"
                className="mt-6 border-l-2 border-limestone pl-4 text-[1.0625rem] leading-relaxed"
              >
                {content.book.success}
              </p>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-6" data-reveal>
                <input type="hidden" name="_subject" value="New message from petargrbic.com" />
                <input type="hidden" name="_format" value="plain" />
                <input type="text" name="_gotcha" className="hidden" tabIndex={-1} aria-hidden="true" />

                {(["name", "email", "message"] as const).map((key) => {
                  const label = content.book[key];
                  const err = errors[key];
                  return (
                    <div key={key} className="mb-7">
                      <label
                        htmlFor={key}
                        className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-limestone/45"
                      >
                        {label}
                      </label>

                      {key === "message" ? (
                        <textarea
                          id={key}
                          name={key}
                          rows={4}
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
                        <p id={`${key}-error`} className="mt-2 text-sm text-rust">
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

                {status === "error" && (
                  <p role="alert" className="mt-4 text-sm text-rust">
                    {content.book.errorServer}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
