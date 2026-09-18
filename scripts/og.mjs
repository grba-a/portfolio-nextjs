/**
 * Generira public/og-image.png (1200×630) — pregled kad se poveznica
 * dijeli na WhatsAppu, Facebooku, LinkedInu.
 *
 *   node scripts/og.mjs
 *
 * Redizajn 2026-09-18: crna podloga, naslov koji prelazi iz sive u bijelu,
 * kromirani zip s crtama pod 45° (isti crtež kao ZipChrome.tsx). Renderira
 * se kroz pravi preglednik, s Geistom, da tipografija bude ista kao na stranici.
 */
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const LETTERS = `<path d="M0 0H88V24L36 76H88V100H0V76L52 24H0Z"/><path d="M100 0H130V100H100ZM100 -36H130V-14H100Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M142 0H182A50 50 0 0 1 182 100H172V145H142ZM172 26H182A24 24 0 0 1 182 74H172Z"/>`;
const STOPS = [[0, "#fff"], [0.2, "#d6d6dc"], [0.43, "#5c5c64"], [0.5, "#19191d"], [0.56, "#f5f5f7"], [0.76, "#8e8e96"], [1, "#fff"]]
  .map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join("");
const ZIP = `<svg viewBox="-2 -38 236 185" aria-hidden="true"><defs>
  <pattern id="p" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="5.4" height="10" fill="#fff"/></pattern>
  <linearGradient id="c" gradientUnits="userSpaceOnUse" x1="0" y1="-38" x2="36" y2="147">${STOPS}</linearGradient>
  <mask id="m" maskUnits="userSpaceOnUse" x="-10" y="-50" width="260" height="210"><rect x="-10" y="-50" width="260" height="210" fill="url(#p)"/></mask>
</defs><g fill="none" stroke="#fff" stroke-opacity=".2" stroke-width="1">${LETTERS}</g><g mask="url(#m)" fill="url(#c)">${LETTERS}</g></svg>`;

const html = `<!doctype html>
<html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;600&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: #000; color: #fafafa; font-family: Geist, sans-serif; position: relative; overflow: hidden; }
  .grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,.09) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.09) 1px, transparent 1px); background-size: 56px 56px; -webkit-mask-image: radial-gradient(70% 70% at 72% 30%, #000, transparent 75%); opacity: .55; }
  .light { position: absolute; inset: -20% -10% auto; height: 80%; background: radial-gradient(45% 55% at 70% 35%, rgba(255,255,255,.12), transparent 70%); }
  .zip { position: absolute; right: -40px; top: 70px; width: 600px; transform: rotate(-7deg); }
  .copy { position: absolute; left: 72px; top: 150px; display: grid; gap: 26px; }
  .badge { display: inline-flex; align-items: center; gap: 10px; padding: 5px 16px 5px 5px; border: 1px solid rgba(255,255,255,.12); border-radius: 999px; font-size: 20px; color: #a1a1a9; width: fit-content; }
  .badge b { background: #fafafa; color: #000; border-radius: 999px; padding: 3px 12px; font-size: 16px; font-weight: 600; }
  h1 { font-size: 118px; font-weight: 600; letter-spacing: -0.045em; line-height: .95; }
  h1 span { display: block; width: fit-content; background: linear-gradient(90deg, #5c5c63 0%, #fafafa 36%); -webkit-background-clip: text; color: transparent; }
  .foot { position: absolute; left: 72px; bottom: 56px; font-size: 22px; color: #85858d; letter-spacing: -0.01em; }
</style></head>
<body>
  <div class="grid"></div><div class="light"></div>
  <div class="zip">${ZIP}</div>
  <div class="copy">
    <p class="badge"><b>Free</b>Website check, in writing</p>
    <h1><span>Systems</span><span>that sell.</span></h1>
  </div>
  <p class="foot">donebyzip.com</p>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: join(ROOT, "public/og-image.png") });
await browser.close();
console.log("public/og-image.png");
