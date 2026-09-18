/**
 * Slike za mailove (public/email/*.png). Gmail ne prikazuje SVG, pa se zip
 * logo i kromirani zip iscrtaju ovdje, u pravom pregledniku, 2× za retina.
 *
 *   node scripts/email-assets.mjs
 *
 * Mail ih učitava s https://donebyzip.com/email/… — rade tek kad su objavljene.
 */
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "email");
const L = `<path d="M0 0H88V24L36 76H88V100H0V76L52 24H0Z"/><path d="M100 0H130V100H100ZM100 -36H130V-14H100Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M142 0H182A50 50 0 0 1 182 100H172V145H142ZM172 26H182A24 24 0 0 1 182 74H172Z"/>`;
const stops = [[0, "#fff"], [0.2, "#d6d6dc"], [0.43, "#5c5c64"], [0.5, "#19191d"], [0.56, "#f5f5f7"], [0.76, "#8e8e96"], [1, "#fff"]]
  .map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join("");
const solid = (pitch) => `<svg viewBox="-2 -38 236 185"><defs><pattern id="s" width="${pitch}" height="${pitch}" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="${pitch * 0.54}" height="${pitch}" fill="#fafafa"/></pattern></defs><g fill="url(#s)">${L}</g></svg>`;
const chrome = (pitch) => `<svg viewBox="-2 -38 236 185"><defs><pattern id="p" width="${pitch}" height="${pitch}" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="${pitch * 0.54}" height="${pitch}" fill="#fff"/></pattern><linearGradient id="c" gradientUnits="userSpaceOnUse" x1="0" y1="-38" x2="36" y2="147">${stops}</linearGradient><mask id="m" maskUnits="userSpaceOnUse" x="-10" y="-50" width="260" height="210"><rect x="-10" y="-50" width="260" height="210" fill="url(#p)"/></mask></defs><g fill="none" stroke="#fff" stroke-opacity=".2" stroke-width="1">${L}</g><g mask="url(#m)" fill="url(#c)">${L}</g></svg>`;
const grid = `background-image:linear-gradient(rgba(255,255,255,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.08) 1px,transparent 1px);background-size:44px 44px;`;

const shots = [
  // logo u zaglavlju: 112×88 → prikaz 56×44
  { name: "zip-logo.png", w: 112, h: 88, transparent: true, html: `<div style="width:112px;height:88px">${solid(16)}</div>` },
  // hero traka: crno, mreža, svjetlo, kromirani zip nagnut kao na stranici
  { name: "hero.png", w: 600, h: 220, html: `<div style="position:relative;width:600px;height:220px;background:#000;overflow:hidden"><div style="position:absolute;inset:0;${grid}-webkit-mask-image:radial-gradient(70% 90% at 70% 40%,#000,transparent 75%)"></div><div style="position:absolute;inset:0;background:radial-gradient(40% 60% at 68% 40%,rgba(255,255,255,.13),transparent 70%)"></div><div style="position:absolute;right:-30px;top:-40px;width:420px;transform:rotate(-7deg)">${chrome(11)}</div></div>` },
  // zupci zatvarača ispod modula paketa System
  { name: "zipline.png", w: 520, h: 10, transparent: true, html: `<div style="width:520px;height:10px;opacity:.55;background:repeating-linear-gradient(90deg,#000 0 5px,transparent 5px 10px) center top/100% 4px no-repeat,repeating-linear-gradient(90deg,transparent 0 5px,#000 5px 10px) center bottom/100% 4px no-repeat"></div>` },
  // podnožje: golemi kromirani zip, odrezan na dnu
  { name: "footer.png", w: 600, h: 234, html: `<div style="width:600px;height:234px;background:#000;overflow:hidden"><div style="width:600px">${chrome(8)}</div></div>` },
];

const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 2 });
for (const s of shots) {
  await page.setViewportSize({ width: s.w, height: s.h });
  await page.setContent(`<!doctype html><html><body style="margin:0;background:${s.transparent ? "transparent" : "#000"}">${s.html}</body></html>`);
  await page.screenshot({ path: join(OUT, s.name), omitBackground: !!s.transparent, clip: { x: 0, y: 0, width: s.w, height: s.h } });
  console.log("public/email/" + s.name);
}
await browser.close();
