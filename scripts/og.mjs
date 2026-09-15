/**
 * Generira public/og-image.png (1200×630) — pregled kad se poveznica
 * dijeli na WhatsAppu, Facebooku, LinkedInu.
 *
 *   node scripts/og.mjs
 *
 * Renderira se kroz pravi preglednik da tipografija bude identična
 * stranici (Archivo iz Google Fontsa), a ne približna.
 */
import { chromium } from "playwright";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const b64 = (f) =>
  "data:image/webp;base64," +
  readFileSync(join(ROOT, "public/work", f)).toString("base64");

// zip logo — isti crtež kao src/components/ZipLogo.tsx, gustoća crta iz brand guidea
const LOGO = `<svg viewBox="-2 -38 236 185" role="img" aria-label="zip"><defs><pattern id="s" width="10.4" height="10.4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="5.6" height="10.4" fill="currentColor"/></pattern></defs><g fill="url(#s)"><path d="M0 0H88V24L36 76H88V100H0V76L52 24H0Z"/><path d="M100 0H130V100H100ZM100 -36H130V-14H100Z"/><path fill-rule="evenodd" d="M142 0H182A50 50 0 0 1 182 100H172V145H142ZM172 26H182A24 24 0 0 1 182 74H172Z"/></g></svg>`;
const ULINE = `<svg class="ul" viewBox="0 0 300 16" preserveAspectRatio="none" aria-hidden="true"><path d="M4 11C46 5 96 3.5 152 6.5 208 9.5 254 11.5 296 6"/></svg>`;

// Snimke idu kao data URI: setContent razrješava relativne putanje prema
// about:blank, pa presretanje mreže nikad ne okine i okviri ostanu prazni.
const shots = ["apartments-grbic", "studio-amage", "grbic-doo", "vk-festanjuli"]
  .map((n) => b64(`${n}.webp`));

const html = `<!doctype html>
<html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@800&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px;
    background: #f5f2ed;
    display: flex; flex-direction: column; justify-content: space-between;
    padding: 68px 72px 0;
    font-family: Archivo, sans-serif;
  }
  .eyebrow {
    font-family: "JetBrains Mono", monospace;
    font-size: 17px; letter-spacing: 0.18em; text-transform: uppercase;
    color: #6e675e;
  }
  h1 {
    font-size: 104px; font-weight: 800; line-height: 0.92;
    letter-spacing: -0.035em; color: #14110e; margin-top: 26px;
  }
  .logo svg { height: 66px; width: auto; display: block; color: #14110e; }
  .u { position: relative; display: inline-block; }
  .u .ul { position: absolute; left: 0; bottom: 0.01em; width: 100%; height: 0.16em;
           overflow: visible; fill: none; stroke: #c2452d; stroke-width: 7; stroke-linecap: round; }
  .sub {
    font-family: "JetBrains Mono", monospace;
    font-size: 19px; color: #6e675e; margin-top: 30px;
  }
  .reel { display: flex; gap: 14px; margin-top: 40px; }
  .reel img { width: 262px; height: 164px; object-fit: cover; object-position: top;
              border: 1px solid rgba(20,17,14,0.12); border-radius: 3px; }
</style></head>
<body>
  <div>
    <div class="logo">${LOGO}</div>
    <h1>Systems<br><span class="u">that sell.${ULINE}</span></h1>
    <p class="sub">Free check · Marketing · Websites · Ads · Local SEO</p>
  </div>
  <div class="reel">
    ${shots.map((src) => `<img src="${src}">`).join("")}
  </div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });

await page.setContent(html, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(1200);
await page.screenshot({ path: join(ROOT, "public/og-image.png") });
await browser.close();

console.log("public/og-image.png 1200×630");
