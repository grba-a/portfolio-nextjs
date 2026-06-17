"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import CertCarousel from "./CertCarousel";

const certGroups = [
  {
    platform: "Google Ads",
    accent: "rgba(124, 219, 255, 0.9)",
    certs: [
      { name: "Search", file: "/certs/ads-search.png" },
      { name: "Display", file: "/certs/ads-display.png" },
      { name: "Video", file: "/certs/ads-video.png" },
      { name: "Apps", file: "/certs/ads-apps.png" },
      { name: "Creative", file: "/certs/ads-creative.png" },
      { name: "Measurement", file: "/certs/ads-measurement.png" },
      { name: "AI Performance", file: "/certs/ads-ai-performance.png" },
      { name: "AI Shopping", file: "/certs/ads-ai-shopping.png" },
    ],
  },
  {
    platform: "Google Analytics",
    accent: "rgba(255, 209, 102, 0.9)",
    certs: [
      { name: "Google Analytics", file: "/certs/analytics.png" },
    ],
  },
  {
    platform: "HubSpot",
    accent: "rgba(255, 140, 105, 0.9)",
    certs: [
      { name: "Content Marketing", file: "/certs/hubspot-content.png" },
      { name: "Email Marketing", file: "/certs/hubspot-email.png" },
      { name: "Inbound Marketing", file: "/certs/hubspot-inbound.png" },
    ],
  },
];

const allCerts = certGroups.flatMap((group) =>
  group.certs.map((cert) => ({
    ...cert,
    platform: group.platform,
    accent: group.accent,
  }))
);

export default function Certifications() {
  const { t } = useLanguage();

  return (
    <section className="certs section" id="certifications">
      <div className="container">
        <h2 data-animate>{t.certifications.heading}</h2>
        <p className="muted" data-animate data-delay="100">
          {t.certifications.sub}
        </p>
        <div data-animate data-delay="150">
          <CertCarousel certs={allCerts} certificateLabel={t.certifications.certificate} />
        </div>
      </div>
    </section>
  );
}
