import Image from "next/image";

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
    accent: "rgba(124, 219, 255, 0.9)",
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

export default function Certifications() {
  return (
    <section className="certs section" id="certifications">
      <div className="container">
        <h2 data-animate>Certifications</h2>
        <p className="muted" data-animate data-delay="100">
          12 completed certifications from Google and HubSpot. Click any to view full certificate.
        </p>
        <div className="cert-groups">
          {certGroups.map((group) => (
            <div key={group.platform} className="cert-group" data-animate>
              <p className="cert-platform" style={{ color: group.accent }}>
                {group.platform}
              </p>
              <div className="cert-images">
                {group.certs.map((cert, i) => (
                  <a
                    key={cert.name}
                    href={cert.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-img-wrap"
                    title={`${cert.name} Certificate`}
                    data-animate
                    data-delay={i * 60}
                  >
                    <Image
                      src={cert.file}
                      alt={`${cert.name} certificate`}
                      width={180}
                      height={126}
                      style={{ objectFit: "cover" }}
                    />
                    <span className="cert-img-label">{cert.name}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
