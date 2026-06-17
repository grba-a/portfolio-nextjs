"use client";

import { useEffect, useRef, useState } from "react";
import ProjectTags from "./ProjectTags";

export type Slide =
  | { type: "image"; src: string; href: string }
  | { type: "instagram"; href: string };

const AUTO_MS = 7000;

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="72"
      height="72"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4.4" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function ProjectCarousel({
  slides,
  title,
  description,
  tags,
  delay,
  visitLabel,
  igLabel,
}: {
  slides: Slide[];
  title: string;
  description: string;
  tags: string[];
  delay: number;
  visitLabel: string;
  igLabel: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);

  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" });
  };

  // Keep track of the current slide so auto-advance continues from wherever
  // the user manually scrolled to.
  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    activeRef.current = Math.round(track.scrollLeft / track.clientWidth);
  };

  // Track whether the card is in view — autoplay only runs while visible.
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Auto-advance every AUTO_MS while visible, not hovered, and motion is allowed.
  useEffect(() => {
    if (!visible || paused) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = setInterval(() => {
      goTo((activeRef.current + 1) % slides.length);
    }, AUTO_MS);
    return () => clearInterval(id);
  }, [visible, paused, slides.length]);

  return (
    <div
      ref={cardRef}
      className="project-card project-card--carousel"
      data-animate
      data-delay={delay}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="project-image">
        <div className="project-carousel-track" ref={trackRef} onScroll={onScroll}>
          {slides.map((s) => (
            <a
              key={s.href}
              className="project-slide"
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {s.type === "image" ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.src} alt={`${title} website preview`} loading="lazy" />
                  <div className="project-overlay">
                    <span className="project-visit">{visitLabel}</span>
                  </div>
                </>
              ) : (
                <div className="project-ig-slide">
                  <InstagramIcon />
                  <span className="project-ig-label">{igLabel}</span>
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
      <div className="project-meta">
        <h3>{title}</h3>
        <p className="project-desc">{description}</p>
        <ProjectTags tags={tags} />
      </div>
    </div>
  );
}
