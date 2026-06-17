"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import ProjectCarousel, { type Slide } from "./ProjectCarousel";
import ProjectTags from "./ProjectTags";

type Media =
  | { preview: string; href: string }
  | { carousel: Slide[] };

// Order matches t.projects.items — each entry pairs with the same-index item.
const media: Media[] = [
  {
    carousel: [
      {
        type: "image",
        src: "https://api.microlink.io/?url=https://apartmentsgrbic.com&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1400&viewport.height=900",
        href: "https://apartmentsgrbic.com",
      },
      { type: "instagram", href: "https://www.instagram.com/apartments_grbic/" },
    ],
  },
  {
    preview:
      "https://api.microlink.io/?url=https://studioamage.com&screenshot=true&meta=false&embed=screenshot.url",
    href: "https://studioamage.com",
  },
  {
    preview:
      "https://api.microlink.io/?url=https://grba-a.github.io/grbicdizalice/&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1400&viewport.height=900",
    href: "https://grba-a.github.io/grbicdizalice/",
  },
  {
    preview:
      "https://api.microlink.io/?url=https://festanjuli-web.vercel.app&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1400&viewport.height=900",
    href: "https://festanjuli-web.vercel.app/",
  },
];

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section className="projects section" id="projects">
      <div className="container">
        <h2 data-animate>{t.projects.heading}</h2>
        <p className="muted" data-animate data-delay="100">
          {t.projects.sub}
        </p>
        <div className="grid projects-grid">
          {media.map((m, i) => {
            const p = t.projects.items[i];

            if ("carousel" in m) {
              return (
                <ProjectCarousel
                  key={p.title}
                  slides={m.carousel}
                  title={p.title}
                  description={p.description}
                  tags={p.tags}
                  delay={i * 120}
                  visitLabel={t.projects.visitSite}
                  igLabel={t.projects.viewInstagram}
                />
              );
            }

            return (
              <a
                key={p.title}
                href={m.href}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card"
                data-animate
                data-delay={i * 120}
              >
                <div className="project-image">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.preview} alt={`${p.title} website preview`} loading="lazy" />
                  <div className="project-overlay">
                    <span className="project-visit">{t.projects.visitSite}</span>
                  </div>
                </div>
                <div className="project-meta">
                  <h3>{p.title}</h3>
                  <p className="project-desc">{p.description}</p>
                  <ProjectTags tags={p.tags} />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
