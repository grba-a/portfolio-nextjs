"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export type Cert = {
  name: string;
  file: string;
  platform: string;
  accent: string;
};

const SPEED = -0.5; // px per frame; negative = cards drift to the right
const IDLE_MS = 1500; // resume auto-scroll this long after the last interaction

// Official monochrome brand icons (Simple Icons), tinted via currentColor.
const PLATFORM_ICONS: Record<string, string> = {
  "Google Ads":
    "M3.9998 22.9291C1.7908 22.9291 0 21.1383 0 18.9293s1.7908-3.9998 3.9998-3.9998 3.9998 1.7908 3.9998 3.9998-1.7908 3.9998-3.9998 3.9998zm19.4643-6.0004L15.4632 3.072C14.3586 1.1587 11.9121.5028 9.9988 1.6074S7.4295 5.1585 8.5341 7.0718l8.0009 13.8567c1.1046 1.9133 3.5511 2.5679 5.4644 1.4646 1.9134-1.1046 2.568-3.5511 1.4647-5.4644zM7.5137 4.8438L1.5645 15.1484A4.5 4.5 0 0 1 4 14.4297c2.5597-.0075 4.6248 2.1585 4.4941 4.7148l3.2168-5.5723-3.6094-6.25c-.4499-.7793-.6322-1.6394-.5878-2.4784z",
  "Google Analytics":
    "M22.84 2.9982v17.9987c.0086 1.6473-1.3197 2.9897-2.967 2.9984a2.9808 2.9808 0 01-.3677-.0208c-1.528-.226-2.6477-1.5558-2.6105-3.1V3.1204c-.0369-1.5458 1.0856-2.8762 2.6157-3.1 1.6361-.1915 3.1178.9796 3.3093 2.6158.014.1201.0208.241.0202.3619zM4.1326 18.0548c-1.6417 0-2.9726 1.331-2.9726 2.9726C1.16 22.6691 2.4909 24 4.1326 24s2.9726-1.3309 2.9726-2.9726-1.331-2.9726-2.9726-2.9726zm7.8728-9.0098c-.0171 0-.0342 0-.0513.0003-1.6495.0904-2.9293 1.474-2.891 3.1256v7.9846c0 2.167.9535 3.4825 2.3505 3.763 1.6118.3266 3.1832-.7152 3.5098-2.327.04-.1974.06-.3983.0593-.5998v-8.9585c.003-1.6474-1.33-2.9852-2.9773-2.9882z",
  HubSpot:
    "M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z",
};

function PlatformIcon({ platform }: { platform: string }) {
  const d = PLATFORM_ICONS[platform];
  if (!d) return null;
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export default function CertCarousel({
  certs,
  certificateLabel,
}: {
  certs: Cert[];
  certificateLabel: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const hoveredRef = useRef(false);
  const visibleRef = useRef(false);
  const lastInteractRef = useRef(0);
  const dragRef = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  // Render three identical copies so the scroll position can wrap seamlessly.
  const loop = [...certs, ...certs, ...certs];

  const normalize = (el: HTMLDivElement) => {
    const sw = el.scrollWidth / 3;
    if (sw <= 0) return;
    if (el.scrollLeft < sw) el.scrollLeft += sw;
    else if (el.scrollLeft >= 2 * sw) el.scrollLeft -= sw;
  };

  // Start in the middle copy so there is content to scroll in both directions.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const init = () => {
      const sw = el.scrollWidth / 3;
      if (sw > 0) el.scrollLeft = sw;
      else requestAnimationFrame(init);
    };
    init();
  }, []);

  // Track visibility — auto-scroll only runs while the section is on screen.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Continuous gentle auto-scroll + seamless loop normalization.
  useEffect(() => {
    let raf = 0;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tick = () => {
      const el = trackRef.current;
      if (el) {
        const idle = Date.now() - lastInteractRef.current > IDLE_MS;
        if (
          !reduce &&
          visibleRef.current &&
          !hoveredRef.current &&
          !dragRef.current.active &&
          idle
        ) {
          el.scrollLeft += SPEED;
        }
        normalize(el);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return; // touch/trackpad use native scrolling
    const el = trackRef.current;
    if (!el) return;
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: false,
    };
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag.active) return;
    const el = trackRef.current;
    if (!el) return;
    const dx = e.clientX - drag.startX;
    if (Math.abs(dx) > 4) drag.moved = true;
    el.scrollLeft = drag.startScroll - dx;
    normalize(el);
    lastInteractRef.current = Date.now();
  };

  const endDrag = () => {
    dragRef.current.active = false;
  };

  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragRef.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      dragRef.current.moved = false;
    }
  };

  const markInteract = () => {
    lastInteractRef.current = Date.now();
  };

  return (
    <div className="cert-carousel">
      <div
        ref={trackRef}
        className="cert-track"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onMouseEnter={() => {
          hoveredRef.current = true;
        }}
        onMouseLeave={() => {
          hoveredRef.current = false;
          endDrag();
        }}
        onWheel={markInteract}
        onTouchStart={markInteract}
        onTouchMove={markInteract}
        onClickCapture={onClickCapture}
      >
        {loop.map((cert, i) => (
          <a
            key={`${cert.file}-${i}`}
            href={cert.file}
            target="_blank"
            rel="noopener noreferrer"
            className="cert-card"
            title={`${cert.name} ${certificateLabel}`}
            aria-hidden={i >= certs.length ? true : undefined}
            tabIndex={i >= certs.length ? -1 : undefined}
            draggable={false}
          >
            <Image
              src={cert.file}
              alt={`${cert.name} ${certificateLabel}`}
              width={180}
              height={126}
              draggable={false}
            />
            <span className="cert-card-platform" style={{ color: cert.accent }}>
              <PlatformIcon platform={cert.platform} />
              {cert.platform}
            </span>
            <span className="cert-card-name">{cert.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
