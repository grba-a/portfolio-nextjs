"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

const ids = [1, 2, 3];

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section className="testimonials section" id="testimonials">
      <div className="container">
        <h2>{t.testimonials.heading}</h2>
        <p className="muted">{t.testimonials.sub}</p>
        <div className="grid testimonials-grid">
          {ids.map((id) => (
            <div key={id} className="testimonial-card card">
              <span className="testimonial-quote-mark" aria-hidden="true">&ldquo;</span>
              <p className="testimonial-text muted">{t.testimonials.placeholderQuote}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">—</div>
                <div>
                  <p className="testimonial-name">{t.testimonials.placeholderName}</p>
                  <p className="testimonial-role muted">{t.testimonials.placeholderRole}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
