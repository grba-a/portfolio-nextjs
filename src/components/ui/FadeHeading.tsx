import { Fragment, type ElementType, type ReactNode } from "react";

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
      {/* Razmak između redaka: bez njega tražilice čitaju "Systemsthat sell." */}
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          <span className="fade-line">{line}</span>
        </Fragment>
      ))}
    </Tag>
  );
}
