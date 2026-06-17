"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero section">
      <div className="hero-glow" aria-hidden="true" />
      <div className="container">
        <div className="availability-badge">
          <span className="availability-dot" />
          {t.hero.badge}
        </div>
        <h1>Petar Grbić</h1>
        <p className="hero-sub">{t.hero.sub}</p>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-num">4</span>
            <span className="stat-label">{t.hero.statLiveProjects}</span>
          </div>
          <div className="stat-sep" aria-hidden="true" />
          <div className="stat">
            <span className="stat-num">6</span>
            <span className="stat-label">{t.hero.statServiceAreas}</span>
          </div>
          <div className="stat-sep" aria-hidden="true" />
          <div className="stat">
            <span className="stat-num">12</span>
            <span className="stat-label">{t.hero.statCertifications}</span>
          </div>
        </div>
        <div className="hero-actions">
          <a className="btn btn-primary-glow" href="#services">{t.hero.btnOffer}</a>
          <a
            className="btn btn-ghost"
            href="/PetarGrbic_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            {t.hero.btnCV}
          </a>
        </div>
      </div>
    </section>
  );
}
