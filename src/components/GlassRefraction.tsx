"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Lom svjetla na rubu stakla — pravi "liquid glass", samo u Chromiumu.
 *
 * Svaki element s `data-refract` dobije vlastiti SVG filter: karta pomaka
 * (displacement map) nacrtana na canvasu za točnu veličinu i radijus
 * elementa, pa rub zakrivi ono što je iza njega. Safari i iPhone ne znaju
 * `backdrop-filter: url()`, pa tamo ostaje mat staklo iz `.glass` — i
 * stranica mora izgledati dobro i bez ovoga (Petar je to znao u artifactu).
 *
 * Ništa se ne događa uz smanjenu prozirnost ili izvan Chromiuma.
 */
const cache = new Map<string, string>();

function lensMap(w: number, h: number, r: number, band: number) {
  const key = `${w}x${h}x${r}x${band}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d");
  if (!ctx) return "";
  const im = ctx.createImageData(w, h);
  const d = im.data;
  const cx = w / 2;
  const cy = h / 2;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const px = x + 0.5 - cx;
      const py = y + 0.5 - cy;
      const qx = Math.abs(px) - (cx - r);
      const qy = Math.abs(py) - (cy - r);
      // udaljenost od ruba zaobljenog pravokutnika, pozitivna prema unutra
      const dist = r - (Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0));
      let nx = 0;
      let ny = 0;
      if (qx > 0 && qy > 0) {
        const l = Math.hypot(qx, qy) || 1;
        nx = (qx / l) * Math.sign(px);
        ny = (qy / l) * Math.sign(py);
      } else if (qx > qy) nx = Math.sign(px);
      else ny = Math.sign(py);
      const m = dist < band ? Math.pow(1 - Math.max(dist, 0) / band, 2) : 0;
      const i = (y * w + x) * 4;
      d[i] = 128 - nx * m * 127;
      d[i + 1] = 128 - ny * m * 127;
      d[i + 2] = 128;
      d[i + 3] = 255;
    }
  }
  ctx.putImageData(im, 0, 0);
  const url = c.toDataURL();
  cache.set(key, url);
  return url;
}

let uid = 0;

export default function GlassRefraction() {
  const pathname = usePathname();

  useEffect(() => {
    const ua = navigator.userAgent;
    const chromium = /Chrome\/\d+/.test(ua) && !/Firefox|CriOS|FxiOS|EdgiOS/.test(ua);
    if (!chromium || matchMedia("(prefers-reduced-transparency: reduce)").matches) return;

    const NS = "http://www.w3.org/2000/svg";
    let svg = document.getElementById("glass-fx") as SVGSVGElement | null;
    if (!svg) {
      svg = document.createElementNS(NS, "svg");
      svg.id = "glass-fx";
      svg.setAttribute("width", "0");
      svg.setAttribute("height", "0");
      svg.setAttribute("aria-hidden", "true");
      svg.style.position = "absolute";
      svg.appendChild(document.createElementNS(NS, "defs"));
      document.body.appendChild(svg);
    }
    const defs = svg.firstChild as SVGDefsElement;

    const apply = (el: HTMLElement) => {
      const w = Math.round(el.offsetWidth);
      const h = Math.round(el.offsetHeight);
      if (w < 8 || h < 8) return;
      const r = Math.min(h / 2, parseFloat(getComputedStyle(el).borderTopLeftRadius) || h / 2);
      const id = el.dataset.fid || (el.dataset.fid = `glass-f${++uid}`);
      let f = document.getElementById(id) as SVGFilterElement | null;
      if (!f) {
        f = document.createElementNS(NS, "filter") as SVGFilterElement;
        f.id = id;
        f.setAttribute("color-interpolation-filters", "sRGB");
        defs.appendChild(f);
      }
      const map = lensMap(w, h, Math.round(r), Math.min(22, Math.round(h * 0.42)));
      if (!map) return;
      f.innerHTML =
        `<feImage href="${map}" x="0" y="0" width="${w}" height="${h}" result="map"/>` +
        `<feDisplacementMap in="SourceGraphic" in2="map" scale="${Math.round(Math.min(46, h * 0.7))}" xChannelSelector="R" yChannelSelector="G"/>`;
      el.style.backdropFilter = `url(#${id}) blur(1.2px) saturate(1.7) brightness(1.08)`;
    };

    const ro = new ResizeObserver((entries) => entries.forEach((e) => apply(e.target as HTMLElement)));
    document.querySelectorAll<HTMLElement>("[data-refract]").forEach((el) => ro.observe(el));
    return () => ro.disconnect();
  }, [pathname]);

  return null;
}
