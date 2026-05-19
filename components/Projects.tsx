const projects = [
  {
    href: "https://apartmentsgrbic.com",
    title: "Apartments Grbić",
    preview:
      "https://api.microlink.io/?url=https://apartmentsgrbic.com&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1400&viewport.height=900",
  },
  {
    href: "https://grba-a.github.io/grbicdizalice/",
    title: "GRBIĆ d.o.o.",
    preview:
      "https://api.microlink.io/?url=https://grba-a.github.io/grbicdizalice/&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1400&viewport.height=900",
  },
  {
    href: "https://studioamage.com",
    title: "Studio Amage",
    preview:
      "https://api.microlink.io/?url=https://studioamage.com&screenshot=true&meta=false&embed=screenshot.url",
  },
];

export default function Projects() {
  return (
    <section className="projects section" id="projects">
      <div className="container">
        <h2>Projects</h2>
        <div className="grid projects-grid">
          {projects.map((p) => (
            <a
              key={p.href}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card"
            >
              <div className="project-image">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.preview} alt={`${p.title} website preview`} loading="lazy" />
              </div>
              <h3>{p.title}</h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
