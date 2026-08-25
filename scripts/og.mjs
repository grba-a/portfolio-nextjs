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

const strip = readFileSync(join(ROOT, "public/work/hero-strip.webp")).toString("base64");

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
    font-size: 132px; font-weight: 800; line-height: 0.9;
    letter-spacing: -0.035em; color: #14110e; margin-top: 26px;
  }
  .masked {
    background-image: url(data:image/webp;base64,${strip});
    background-size: auto 118%;
    background-position: 0 center;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .sub {
    font-family: "JetBrains Mono", monospace;
    font-size: 19px; color: #6e675e; margin-top: 30px;
  }
  .rule { height: 6px; background: #c2452d; width: 118px; margin-top: 34px; }
  .reel { display: flex; gap: 14px; margin-top: 40px; }
  .reel img { width: 262px; height: 164px; object-fit: cover; object-position: top;
              border: 1px solid rgba(20,17,14,0.12); border-radius: 3px; }
</style></head>
<body>
  <div>
    <p class="eyebrow">Petar Grbić — Dubrovnik, Croatia</p>
    <h1>Websites<br><span class="masked">that sell.</span></h1>
    <div class="rule"></div>
    <p class="sub">Web design &amp; development · Paid ads · SEO</p>
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
