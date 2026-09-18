/**
 * zip u kromu: slova iz brand guidea, ispunjena crtama pod 45° (kao ZipLogo),
 * ali crte nose kromirani prijelaz i preko njih jednom prođe odsjaj.
 *
 * Crtano kodom, ne slikom (Petar, 2026-09-18: brzina je bitna). `id` mora
 * biti jedinstven na stranici jer ga koriste uzorak, maska i gradijenti.
 */
const LETTERS = (
  <>
    <path d="M0 0H88V24L36 76H88V100H0V76L52 24H0Z" />
    <path d="M100 0H130V100H100ZM100 -36H130V-14H100Z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M142 0H182A50 50 0 0 1 182 100H172V145H142ZM172 26H182A24 24 0 0 1 182 74H172Z"
    />
  </>
);

const STOPS: [number, string][] = [
  [0, "var(--c1)"],
  [0.2, "var(--c2)"],
  [0.43, "var(--c3)"],
  [0.5, "var(--c4)"],
  [0.56, "var(--c5)"],
  [0.76, "var(--c6)"],
  [1, "var(--c1)"],
];

export default function ZipChrome({
  id,
  pitch = 11,
  sheen = true,
  className,
}: {
  id: string;
  pitch?: number;
  sheen?: boolean;
  className?: string;
}) {
  const bar = Math.round(pitch * 0.54 * 100) / 100;
  return (
    <svg viewBox="-2 -38 236 185" className={className} aria-hidden="true" focusable="false">
      <defs>
        <pattern id={`${id}-p`} width={pitch} height={pitch} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width={bar} height={pitch} fill="#fff" />
        </pattern>
        <linearGradient id={`${id}-c`} gradientUnits="userSpaceOnUse" x1="0" y1="-38" x2="36" y2="147">
          {STOPS.map(([o, c]) => (
            <stop key={o} offset={o} style={{ stopColor: c }} />
          ))}
        </linearGradient>
        <linearGradient id={`${id}-s`} x1="0" y1="0" x2="1" y2="0.25">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id={`${id}-m`} maskUnits="userSpaceOnUse" x="-10" y="-50" width="260" height="210">
          <rect x="-10" y="-50" width="260" height="210" fill={`url(#${id}-p)`} />
        </mask>
        <clipPath id={`${id}-k`}>{LETTERS}</clipPath>
      </defs>
      <g fill="none" stroke="#fff" strokeOpacity="0.2" strokeWidth="1">
        {LETTERS}
      </g>
      <g mask={`url(#${id}-m)`}>
        <g fill={`url(#${id}-c)`}>{LETTERS}</g>
        {sheen && (
          <g clipPath={`url(#${id}-k)`}>
            <rect className="zip-sheen" x="-130" y="-40" width="80" height="200" fill={`url(#${id}-s)`} />
          </g>
        )}
      </g>
    </svg>
  );
}
