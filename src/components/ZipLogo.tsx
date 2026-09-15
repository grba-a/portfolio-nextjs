/**
 * zip — logo iz Petrovog brand guidea (Desktop/logo_zip.png, 2026-09-15):
 * "zip" malim slovima, slova ispunjena kosim crtama pod 45°, sve crte istog
 * smjera i debljine. Boja je currentColor, pa je ista komponenta i crna i
 * bijela varijanta — boju daje roditelj (tinta na vapnencu, vapnenac na tinti).
 *
 * `pitch` je razmak crta u jedinicama viewBoxa. Guide je ~10,4; na malim
 * veličinama (header) crte se stope u sivo, pa se tamo koriste rjeđe i
 * deblje crte — kut ostaje 45°, kako guide traži.
 *
 * `id` mora biti jedinstven na stranici (uzorak se referencira po id-u).
 */
export default function ZipLogo({
  id,
  pitch = 14,
  className,
  title = "zip",
}: {
  id: string;
  pitch?: number;
  className?: string;
  title?: string;
}) {
  const bar = Math.round(pitch * 0.54 * 100) / 100;
  return (
    <svg viewBox="-2 -38 236 185" className={className} role="img" aria-label={title}>
      <defs>
        <pattern
          id={id}
          width={pitch}
          height={pitch}
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <rect width={bar} height={pitch} fill="currentColor" />
        </pattern>
      </defs>
      <g fill={`url(#${id})`}>
        {/* z */}
        <path d="M0 0H88V24L36 76H88V100H0V76L52 24H0Z" />
        {/* i s točkom */}
        <path d="M100 0H130V100H100ZM100 -36H130V-14H100Z" />
        {/* p: zdjela s kontrom + silazni potez */}
        <path
          fillRule="evenodd"
          d="M142 0H182A50 50 0 0 1 182 100H172V145H142ZM172 26H182A24 24 0 0 1 182 74H172Z"
        />
      </g>
    </svg>
  );
}
