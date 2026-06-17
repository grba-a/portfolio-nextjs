"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Process() {
  const { t } = useLanguage();

  return (
    <section className="process section" id="process">
      <div className="container">
        <h2 data-animate>{t.process.heading}</h2>
        <p className="muted" data-animate data-delay="100">
          {t.process.sub}
        </p>
        <div className="process-steps">
          {t.process.steps.map((step, i) => (
            <div
              key={step.num}
              className="process-step"
              data-animate
              data-delay={i * 120}
            >
              <div className="process-num-circle">
                <span>{step.num}</span>
              </div>
              {i < t.process.steps.length - 1 && (
                <div className="process-connector" aria-hidden="true" />
              )}
              <h3 className="process-title">{step.title}</h3>
              <p className="process-desc muted">{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="process-cta" data-animate>
          <a className="btn btn-primary-glow" href="#contact">{t.process.btnCTA}</a>
        </div>
      </div>
    </section>
  );
}
