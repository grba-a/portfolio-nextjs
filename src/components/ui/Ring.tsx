"use client";

import { useEffect, useRef, useState } from "react";

/** Prsten "nekoliko sekundi" — puni se jednom, kad uđe u kadar. */
export default function Ring({ label }: { label: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative h-[76px] w-[76px]" aria-hidden="true">
      <svg ref={ref} viewBox="0 0 74 74" className="h-full w-full -rotate-90">
        <circle cx="37" cy="37" r="32" fill="none" stroke="rgb(255 255 255 / 0.1)" strokeWidth="5" />
        <circle
          className={`ring-fill${on ? " is-on" : ""}`}
          cx="37"
          cy="37"
          r="32"
          fill="none"
          stroke="var(--color-fg)"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>
      <b className="absolute inset-0 grid place-items-center text-xl font-semibold tracking-[-0.03em]">{label}</b>
    </div>
  );
}
