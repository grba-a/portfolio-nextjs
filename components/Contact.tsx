"use client";

import { useState, FormEvent } from "react";

export default function Contact() {
  const [hint, setHint] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setHint("Sending...");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xreayqjv", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setHint("Message sent. I'll get back to you within 24 hours.");
        form.reset();
      } else {
        setHint("Something went wrong. Please email me directly.");
      }
    } catch {
      setHint("Network error. Please email me directly.");
    }
  }

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <h2>Contact</h2>
        <p className="muted">
          Have a project in mind, or just want to explore options? Send a message —
          I reply within 24 hours.
        </p>

        <form className="form" onSubmit={handleSubmit}>
          <input type="hidden" name="_subject" value="New message from portfolio" />
          <input type="hidden" name="_format" value="plain" />
          <input type="text" name="_gotcha" style={{ display: "none" }} />

          <div className="field">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" autoComplete="name" required />
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" required />
          </div>

          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={5} required />
          </div>

          <div className="actions">
            <button className="btn" type="submit">Send message</button>
            {hint && <p className="hint">{hint}</p>}
          </div>
        </form>

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
    </section>
  );
}
