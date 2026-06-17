"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

const colors = [
  { color: "rgba(124, 219, 255, 0.9)", border: "rgba(124, 219, 255, 0.22)", glow: "rgba(124, 219, 255, 0.12)" },
  { color: "rgba(180, 120, 255, 0.9)", border: "rgba(180, 120, 255, 0.22)", glow: "rgba(180, 120, 255, 0.12)" },
  { color: "rgba(120, 255, 200, 0.9)", border: "rgba(120, 255, 200, 0.22)", glow: "rgba(120, 255, 200, 0.1)" },
  { color: "rgba(255, 184, 120, 0.9)", border: "rgba(255, 184, 120, 0.22)", glow: "rgba(255, 184, 120, 0.1)" },
  { color: "rgba(255, 120, 180, 0.9)", border: "rgba(255, 120, 180, 0.22)", glow: "rgba(255, 120, 180, 0.1)" },
  { color: "rgba(120, 156, 255, 0.9)", border: "rgba(120, 156, 255, 0.22)", glow: "rgba(120, 156, 255, 0.1)" },
];

type ServiceItem = {
  label: string;
  title: string;
  items: readonly string[];
  color: string;
  border: string;
  glow: string;
};

function ServiceCard({
  s,
  featured = false,
  delay = 0,
}: {
  s: ServiceItem;
  featured?: boolean;
  delay?: number;
}) {
  return (
    <article
      className={`service-card-v2 ${featured ? "service-featured" : ""}`}
      data-animate
      data-delay={delay}
      style={{
        borderColor: s.border,
        ["--svc-glow" as string]: s.glow,
        ["--svc-color" as string]: s.color,
      }}
    >
      <p className="svc-label" style={{ color: s.color }}>{s.label}</p>
      <h3 className="svc-title">{s.title}</h3>
      <ul className="svc-list">
        {s.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

export default function Services() {
  const { t } = useLanguage();

  const featured = t.services.featured.map((s, i) => ({ ...s, ...colors[i] }));
  const secondary = t.services.secondary.map((s, i) => ({ ...s, ...colors[i + 2] }));

  return (
    <section className="services section" id="services">
      <div className="container">
        <h2 data-animate>{t.services.heading}</h2>
        <p className="muted" data-animate data-delay="100">
          {t.services.sub}
        </p>
        <div className="services-layout">
          <div className="services-featured-row">
            {featured.map((s, i) => (
              <ServiceCard key={s.title} s={s} featured delay={i * 100} />
            ))}
          </div>
          <div className="services-secondary-row">
            {secondary.map((s, i) => (
              <ServiceCard key={s.title} s={s} delay={i * 80} />
            ))}
          </div>
        </div>
        <div className="services-cta" data-animate>
          <a className="btn btn-primary-glow" href="#contact">{t.services.btnCTA}</a>
        </div>
      </div>
    </section>
  );
}
