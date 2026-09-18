import type { ElementType, ReactNode } from "react";

/**
 * Naslov čiji svaki redak prelazi iz sive u bijelu (element s predloška).
 * Redci su zadani, ne prelomljeni širinom: prijelaz uvijek pada na prva slova.
 */
export default function FadeHeading({
  lines,
  as: Tag = "h2",
  className = "t-h2",
  id,
}: {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  id?: string;
}) {
  return (
    <Tag id={id} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="fade-line">
          {line}
        </span>
      ))}
    </Tag>
  );
}
