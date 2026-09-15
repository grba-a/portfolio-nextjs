/** Rust krug oko riječi — ista crvena olovka kao potez ispod naslova. */
export default function FreeMark({ children, delay }: { children: React.ReactNode; delay?: string }) {
  return (
    <span className="free-mark" style={delay ? ({ "--free-d": delay } as React.CSSProperties) : undefined}>
      {children}
      <svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
        <path
          pathLength="1"
          d="M14 24C10 10 38 3 62 4c24 1 36 9 34 19-2 11-26 15-50 14C22 36 2 31 4 19 6 11 16 7 26 5"
        />
      </svg>
    </span>
  );
}
