const featured = [
  {
    id: "s1",
    label: "Web & Tech",
    title: "Web Development",
    color: "rgba(124, 219, 255, 0.9)",
    border: "rgba(124, 219, 255, 0.22)",
    glow: "rgba(124, 219, 255, 0.12)",
    items: [
      "Web design & development",
      "E-commerce & online stores",
      "Web maintenance & hosting setup",
      "Performance & page speed optimization",
      "Mobile-first optimization",
      "Analytics setup (GA4, Tag Manager)",
    ],
  },
  {
    id: "s2",
    label: "Paid Advertising",
    title: "Paid Ads",
    color: "rgba(180, 120, 255, 0.9)",
    border: "rgba(180, 120, 255, 0.22)",
    glow: "rgba(180, 120, 255, 0.12)",
    items: [
      "Google Ads (Search, Display, Video, Shopping)",
      "Meta Ads (Facebook & Instagram)",
      "TikTok Ads",
      "YouTube Ads",
      "Retargeting campaigns",
    ],
  },
];

const secondary = [
  {
    id: "s3",
    label: "SEO",
    title: "Search Optimization",
    color: "rgba(120, 255, 200, 0.9)",
    border: "rgba(120, 255, 200, 0.22)",
    glow: "rgba(120, 255, 200, 0.1)",
    items: [
      "On-page SEO",
      "Technical SEO",
      "Local SEO & Google Business",
      "Keyword research",
    ],
  },
  {
    id: "s4",
    label: "Content & Email",
    title: "Content Marketing",
    color: "rgba(255, 184, 120, 0.9)",
    border: "rgba(255, 184, 120, 0.22)",
    glow: "rgba(255, 184, 120, 0.1)",
    items: [
      "Content strategy",
      "Blog writing & management",
      "Email marketing & automation",
      "Copywriting (web, ads, email)",
    ],
  },
  {
    id: "s5",
    label: "Design & Branding",
    title: "Brand Identity",
    color: "rgba(255, 120, 180, 0.9)",
    border: "rgba(255, 120, 180, 0.22)",
    glow: "rgba(255, 120, 180, 0.1)",
    items: [
      "Logo & visual identity",
      "Brand guidelines",
      "Graphic design",
      "UI/UX design",
    ],
  },
  {
    id: "s6",
    label: "Strategy & Consulting",
    title: "Digital Strategy",
    color: "rgba(120, 156, 255, 0.9)",
    border: "rgba(120, 156, 255, 0.22)",
    glow: "rgba(120, 156, 255, 0.1)",
    items: [
      "Digital marketing strategy",
      "Funnel design & optimization",
      "Competitor & market analysis",
      "Marketing audit",
    ],
  },
];

type ServiceItem = {
  id: string;
  label: string;
  title: string;
  color: string;
  border: string;
  glow: string;
  items: string[];
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
  return (
    <section className="services section" id="services">
      <div className="container">
        <h2 data-animate>Services</h2>
        <p className="muted" data-animate data-delay="100">
          One point of contact — web, ads, SEO, content, branding, and strategy, all handled end to end.
        </p>
        <div className="services-layout">
          <div className="services-featured-row">
            {featured.map((s, i) => (
              <ServiceCard key={s.id} s={s} featured delay={i * 100} />
            ))}
          </div>
          <div className="services-secondary-row">
            {secondary.map((s, i) => (
              <ServiceCard key={s.id} s={s} delay={i * 80} />
            ))}
          </div>
        </div>
        <div className="services-cta" data-animate>
          <a className="btn btn-primary-glow" href="#contact">Discuss your project</a>
        </div>
      </div>
    </section>
  );
}
