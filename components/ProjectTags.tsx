// Pill colors mirror the per-card accent colors in the Services section.
// Keyed by both EN and HR labels so the color is language-independent.
const TAG_COLORS: Record<string, string> = {
  // Web & Tech — blue
  "Web Design & Development": "124, 219, 255",
  "Web dizajn i razvoj": "124, 219, 255",
  // Paid Advertising — purple
  "Paid Ads": "180, 120, 255",
  "Plaćeni oglasi": "180, 120, 255",
  // SEO — green
  SEO: "120, 255, 200",
  // Content & Email — orange
  "Content Marketing": "255, 184, 120",
  "Content marketing": "255, 184, 120",
  // Status — bright red
  "In Early Development": "255, 75, 75",
  "U ranoj fazi izrade": "255, 75, 75",
};

const DEFAULT_RGB = "124, 219, 255";

export default function ProjectTags({ tags }: { tags: string[] }) {
  return (
    <div className="project-tags">
      {tags.map((tag) => {
        const rgb = TAG_COLORS[tag] ?? DEFAULT_RGB;
        return (
          <span
            key={tag}
            className="project-tag"
            style={{
              color: `rgb(${rgb})`,
              borderColor: `rgba(${rgb}, 0.3)`,
              background: `rgba(${rgb}, 0.1)`,
            }}
          >
            {tag}
          </span>
        );
      })}
    </div>
  );
}
