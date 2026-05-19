const projects = [
  {
    href: "https://apartmentsgrbic.com",
    title: "Apartments Grbić",
    description: "Booking-focused website for a family accommodation business on the Adriatic coast.",
    tag: "Web Design & Development",
    preview:
      "https://api.microlink.io/?url=https://apartmentsgrbic.com&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1400&viewport.height=900",
  },
  {
    href: "https://grba-a.github.io/grbicdizalice/",
    title: "GRBIĆ d.o.o.",
    description: "Corporate website for a crane and heavy equipment company.",
    tag: "Web Design & Development",
    preview:
      "https://api.microlink.io/?url=https://grba-a.github.io/grbicdizalice/&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1400&viewport.height=900",
  },
  {
    href: "https://studioamage.com",
    title: "Studio Amage",
    description: "Clean, modern website for a creative studio.",
    tag: "Web Design & Development",
    preview:
      "https://api.microlink.io/?url=https://studioamage.com&screenshot=true&meta=false&embed=screenshot.url",
  },
];

export default function Projects() {
  return (
    <section className="projects section" id="projects">
      <div className="container">
        <h2 data-animate>Projects</h2>
        <p className="muted" data-animate data-delay="100">
          Every project below is fully my own work — designed, built, and launched from scratch.
        </p>
        <div className="grid projects-grid">
          {projects.map((p, i) => (
            <a
              key={p.href}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card"
              data-animate
              data-delay={i * 120}
            >
              <div className="project-image">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.preview} alt={`${p.title} website preview`} loading="lazy" />
                <div className="project-overlay">
                  <span className="project-visit">Visit site →</span>
                </div>
              </div>
              <div className="project-meta">
                <span className="project-tag">{p.tag}</span>
                <h3>{p.title}</h3>
                <p className="project-desc">{p.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
