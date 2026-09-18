/**
 * Snimi stranice kako ih vidi posjetitelj: pravi WebKit (iPhone) na 360, 390
 * i 430 px, i Chromium na 1440 px. Petrovo pravilo je mobile first u pravom
 * WebKitu, ne u Chromeovom emulatoru — ovo je jedan korak za to.
 *
 *   node scripts/snimi.mjs                 → /, /hr, /work na localhost:4100
 *   node scripts/snimi.mjs / /work         → samo te stranice
 *   SNIMI_URL=http://localhost:4200 node scripts/snimi.mjs
 *   SNIMI_OUT=/neka/mapa node scripts/snimi.mjs
 *
 * Svaka snimka je cijela stranica. Prvi posjet u sesiji pušta zatvarač u
 * heroju, pa se čeka 3 s prije snimanja.
 */
import { chromium, webkit } from "playwright";
import { mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const BASE = process.env.SNIMI_URL || "http://localhost:4100";
const OUT = process.env.SNIMI_OUT || join(tmpdir(), "snimi");
const paths = process.argv.slice(2).length ? process.argv.slice(2) : ["/", "/hr", "/work"];
mkdirSync(OUT, { recursive: true });

const runs = [
  ["webkit", webkit, 360, 780, 3],
  ["webkit", webkit, 390, 844, 3],
  ["webkit", webkit, 430, 932, 3],
  ["chromium", chromium, 1440, 900, 1],
];

const errors = [];
for (const [name, type, width, height, dpr] of runs) {
  const browser = await type.launch();
  for (const path of paths) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: dpr });
    page.on("pageerror", (e) => errors.push(`${name} ${width} ${path}: ${e.message}`));
    await page.goto(BASE + path, { waitUntil: "networkidle" });
    await page.waitForTimeout(3000);
    // Prođi stranicu da se učitaju slike i okinu promatrači
    const total = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < total; y += height * 0.8) {
      await page.evaluate((v) => window.scrollTo(0, v), y);
      await page.waitForTimeout(120);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);
    const slug = path === "/" ? "home" : path.replace(/\//g, "-").replace(/^-/, "");
    const file = join(OUT, `${slug}-${name}-${width}.png`);
    await page.screenshot({ path: file, fullPage: true });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    console.log(`${file}${overflow > 0 ? `  ⚠ vodoravni scroll ${overflow}px` : ""}`);
    await page.close();
  }
  await browser.close();
}
if (errors.length) {
  console.log("\nGreške u konzoli:");
  errors.forEach((e) => console.log("  " + e));
}
