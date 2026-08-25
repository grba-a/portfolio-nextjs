/**
 * Snima žive stranice iz src/data/work.ts u public/work/*.webp
 *
 *   npx playwright install chromium     (jednom)
 *   node scripts/shoot.mjs              (sve)
 *   node scripts/shoot.mjs studio-amage (jedan projekt)
 *
 * Zamjenjuje microlink.io — snimke su self-hostane pa se stranica
 * ne oslanja na vanjski servis koji renderira 2,6 MB po slici.
 */
import { chromium } from "playwright";
import sharp from "sharp";
import { readFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public/work");

// Čitamo slug + href izravno iz work.ts da popis živi na jednom mjestu.
function readWork() {
  const src = readFileSync(join(ROOT, "src/data/work.ts"), "utf8");
  const items = [];
  const re = /slug:\s*"([^"]+)"[\s\S]*?href:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src))) items.push({ slug: m[1], href: m[2] });
  return items;
}

// Cookie bannere treba maknuti sa snimke — uvijek biramo odbijanje.
const REJECT = [
  "Reject all", "Reject", "Decline", "Odbij sve", "Odbij", "Odbaci",
  "Only essential", "Samo nužni",
];

async function shoot(page, { slug, href }) {
  await page.goto(href, { waitUntil: "networkidle", timeout: 60_000 });

  for (const label of REJECT) {
    const btn = page.getByRole("button", { name: label, exact: false }).first();
    if (await btn.isVisible().catch(() => false)) {
      await btn.click().catch(() => {});
      break;
    }
  }

  // Pusti hero animacije da sjednu, pa ugasi motion da snimka bude stabilna.
  await page.waitForTimeout(2500);
  await page.addStyleTag({
    content: `*,*::before,*::after{animation-play-state:paused!important;transition:none!important}`,
  });
  await page.waitForTimeout(300);

  const wide = await page.screenshot({ type: "png" });
  await sharp(wide).resize(1440, 900, { fit: "cover", position: "top" })
    .webp({ quality: 82 }).toFile(join(OUT, `${slug}.webp`));

  // Uspravna varijanta — hero marquee klizi stupcima, treba mu visina.
  const tall = await page.screenshot({ type: "png", fullPage: true });
  await sharp(tall).resize(900, 1600, { fit: "cover", position: "top" })
    .webp({ quality: 78 }).toFile(join(OUT, `${slug}-tall.webp`));

  return slug;
}

const only = process.argv[2];
const items = readWork().filter((w) => !only || w.slug === only);
if (!items.length) {
  console.error(only ? `Nema projekta "${only}" u src/data/work.ts` : "work.ts je prazan");
  process.exit(1);
}

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});

for (const item of items) {
  try {
    await shoot(page, item);
    console.log(`  ✓ ${item.slug}`);
  } catch (err) {
    console.error(`  ✗ ${item.slug} — ${err.message}`);
  }
}

await browser.close();
console.log(`\n${items.length} snimljeno u public/work/`);
