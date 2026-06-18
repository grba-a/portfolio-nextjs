"use client";

import { useState, FormEvent } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Send } from "@/components/icons";

export default function Contact() {
  const [hint, setHint] = useState("");
  const { t } = useLanguage();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setHint(t.contact.sending);
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xreayqjv", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setHint(t.contact.success);
        form.reset();
      } else {
        setHint(t.contact.errorServer);
      }
    } catch {
      setHint(t.contact.errorNetwork);
    }
  }

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <div className="contact-layout">
          {/* Left — CTA */}
          <div className="contact-intro">
            <p className="contact-eyebrow">{t.footer.ctaLabel}</p>
            <h2 className="contact-title">{t.footer.ctaLink}</h2>
            <p className="muted contact-sub">{t.contact.sub}</p>

            <div className="contact-links">
              <a href="mailto:thepetargrbic@gmail.com">thepetargrbic@gmail.com</a>
              <span className="dot">·</span>
              <a href="https://www.linkedin.com/in/petar-grbi%C4%87-455880398/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <span className="dot">·</span>
              <a href="https://github.com/grba-a?tab=repositories" target="_blank" rel="noopener noreferrer">GitHub</a>
              <span className="dot">·</span>
              <a href="https://www.instagram.com/grbicpetarr/" target="_blank" rel="noopener noreferrer">Instagram</a>
              <span className="dot">·</span>
              <a href="https://web.facebook.com/petaargrbic?locale=hr_HR" target="_blank" rel="noopener noreferrer">Facebook</a>
            </div>
          </div>

          {/* Right — form */}
          <form className="form" onSubmit={handleSubmit}>
            <input type="hidden" name="_subject" value="New message from portfolio" />
            <input type="hidden" name="_format" value="plain" />
            <input type="text" name="_gotcha" style={{ display: "none" }} />

            <div className="field">
              <label htmlFor="name">{t.contact.name}</label>
              <input id="name" name="name" type="text" autoComplete="name" required />
            </div>

            <div className="field">
              <label htmlFor="email">{t.contact.email}</label>
              <input id="email" name="email" type="email" autoComplete="email" required />
            </div>

            <div className="field">
              <label htmlFor="message">{t.contact.message}</label>
              <textarea id="message" name="message" rows={5} required />
            </div>

            <div className="actions">
              <button className="btn btn-primary" type="submit">
                {t.contact.send}
                <Send />
              </button>
              {hint && <p className="hint">{hint}</p>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
