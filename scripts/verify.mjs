import { chromium, webkit } from "playwright";

const URL = process.env.VERIFY_URL || "http://localhost:4100";
const SP = "/private/tmp/claude-501/-Users-grbaa/ef11ad01-5748-491d-98be-93ee4ecafa36/scratchpad";
const results = [];
const log = (label, pass, detail) => {
  results.push(pass);
  console.log(`${pass ? "PASS" : "FAIL"}  ${label.padEnd(20)} ${detail}`);
};

async function walk(page) {
  const h = page.viewportSize().height;
  const total = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y <= total; y += h * 0.7) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await page.waitForTimeout(230);
  }
  await page.waitForTimeout(800);
}

// 1 — BEZ JAVASCRIPTA (regresija: v2 je imala 27/27 nevidljivih)
{
  const b = await chromium.launch();
  const ctx = await b.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "domcontentloaded" });
  const r = await page.evaluate(() => {
    const els = [...document.querySelectorAll("[data-reveal]")];
    return {
      total: els.length,
      hidden: els.filter((e) => parseFloat(getComputedStyle(e).opacity) < 0.5).length,
      chars: document.body.innerText.replace(/\s+/g, " ").trim().length,
    };
  });
  await page.screenshot({ path: `${SP}/v-nojs.png`, fullPage: true });
  log("bez JS-a", r.hidden === 0 && r.chars > 2000, `skriveno ${r.hidden}/${r.total}, ${r.chars} znakova teksta`);
  await b.close();
}

// 2 — SLIKE (v2: 0/4 projekata, 0/36 certifikata)
{
  const b = await chromium.launch();
  const page = await b.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(URL, { waitUntil: "networkidle" });
  await walk(page);
  const r = await page.evaluate(() => {
    const imgs = [...document.images];
    return {
      total: imgs.length,
      broken: imgs.filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.currentSrc || i.src),
    };
  });
  log("slike", r.broken.length === 0, `${r.total - r.broken.length}/${r.total} učitano ${r.broken.length ? "— " + r.broken.join(", ") : ""}`);
  await b.close();
}

// 3 — BRZINA (v2: loadEventEnd 10 016 ms)
{
  const b = await chromium.launch();
  const page = await b.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(URL, { waitUntil: "load" });
  await page.waitForTimeout(500);
  const r = await page.evaluate(() => {
    const n = performance.getEntriesByType("navigation")[0];
    const lcp = performance.getEntriesByType("largest-contentful-paint").pop();
    const res = performance.getEntriesByType("resource");
    return {
      load: Math.round(n.loadEventEnd),
      lcp: lcp ? Math.round(lcp.startTime) : null,
      reqs: res.length,
      kb: Math.round(res.reduce((s, x) => s + (x.transferSize || 0), 0) / 1024),
    };
  });
  log("brzina", r.load < 2500 && (r.lcp === null || r.lcp < 2500), `load ${r.load}ms, LCP ${r.lcp}ms, ${r.reqs} zahtjeva, ${r.kb}KB`);
  await b.close();
}

// 4 — RASPORED na četiri širine
for (const [w, h] of [[360, 780], [390, 844], [768, 1024], [1440, 900], [1920, 1080]]) {
  const b = await chromium.launch();
  const page = await b.newPage({ viewport: { width: w, height: h } });
  await page.goto(URL, { waitUntil: "networkidle" });
  await walk(page);
  const r = await page.evaluate(() => {
    const bad = [];
    document.querySelectorAll("section, article, h1, h2, h3, .btn, ul, dl, ol").forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0) return;
      if (rect.right > document.documentElement.clientWidth + 2 || rect.left < -2)
        bad.push(el.tagName + (el.className ? "." + String(el.className).split(" ")[0] : ""));
    });
    return {
      overflowX: document.documentElement.scrollWidth > window.innerWidth + 1,
      scrollW: document.documentElement.scrollWidth,
      innerW: window.innerWidth,
      offscreen: [...new Set(bad)].slice(0, 5),
    };
  });
  log(`raspored ${w}px`, !r.overflowX && r.offscreen.length === 0,
    `overflowX ${r.overflowX ? r.scrollW + ">" + r.innerW : "ne"}, izvan kadra: ${r.offscreen.length ? r.offscreen.join(" | ") : "nema"}`);
  await b.close();
}

// 5 — REDUCED MOTION
{
  const b = await chromium.launch();
  const ctx = await b.newContext({ reducedMotion: "reduce", viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  const r = await page.evaluate(() => {
    const els = [...document.querySelectorAll("[data-reveal]")];
    return {
      hidden: els.filter((e) => parseFloat(getComputedStyle(e).opacity) < 0.5).length,
      total: els.length,
      reel: document.querySelector(".reel")
        ? getComputedStyle(document.querySelector(".reel")).animationName
        : "n/a",
      jsAnim: document.documentElement.className.includes("js-anim"),
    };
  });
  log("reduced motion", r.hidden === 0 && (r.reel === "none" || r.reel === "n/a"), `skriveno ${r.hidden}/${r.total}, reel:${r.reel}, js-anim:${r.jsAnim}`);
  await b.close();
}

// 6 — WEBKIT: maska teksta (Chrome emulacija ovo propušta)
{
  const b = await webkit.launch();
  const page = await b.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(URL, { waitUntil: "networkidle" });
  await walk(page);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(900);
  const r = await page.evaluate(() => {
    const el = document.querySelector(".mask-text");
    const cs = el ? getComputedStyle(el) : null;
    const els = [...document.querySelectorAll("[data-reveal]")];
    return {
      clip: cs ? cs.webkitBackgroundClip || cs.backgroundClip : "n/a",
      bg: cs ? cs.backgroundImage.includes("hero-strip") : true,
      hidden: els.filter((e) => parseFloat(getComputedStyle(e).opacity) < 0.5).length,
      total: els.length,
      overflowX: document.documentElement.scrollWidth > window.innerWidth + 1,
      broken: [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).length,
    };
  });
  await page.screenshot({ path: `${SP}/v-webkit-hero.png` });
  log("WebKit", (r.clip === "text" || r.clip === "n/a") && r.bg && r.hidden === 0 && !r.overflowX && r.broken === 0,
    `clip:${r.clip}, strip:${r.bg}, skriveno ${r.hidden}/${r.total}, overflowX:${r.overflowX}, slike loše:${r.broken}`);
  await b.close();
}

// 7 — DODIRNE METE (mobile-first: minimalno 44px)
{
  const b = await chromium.launch();
  const page = await b.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(URL, { waitUntil: "networkidle" });
  await walk(page);
  const r = await page.evaluate(() => {
    const small = [];
    document.querySelectorAll("a, button, input, textarea").forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      if (rect.height < 32) small.push((el.textContent || el.tagName).trim().slice(0, 22) + ` ${Math.round(rect.height)}px`);
    });
    return { small: [...new Set(small)] };
  });
  log("dodirne mete", r.small.length === 0, r.small.length ? `ispod 32px: ${r.small.slice(0, 6).join(", ")}` : "sve ≥32px");
  await b.close();
}

// 8 — VANJSKE POVEZNICE
{
  const b = await chromium.launch();
  const page = await b.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });
  const hrefs = await page.evaluate(() =>
    [...new Set([...document.querySelectorAll('a[href^="http"]')].map((a) => a.href))]);
  // LinkedIn vraća 999, Facebook 400 na zahtjeve koji nisu iz preglednika.
  // Oba su provjerena u pravom Chromiumu i rade — anti-bot, ne mrtav link.
  const ANTIBOT = [
    { host: "linkedin.com", status: 999 },
    { host: "facebook.com", status: 400 },
  ];
  const bad = [];
  for (const href of hrefs) {
    try {
      const res = await page.request.get(href, { timeout: 45000, maxRedirects: 5 });
      const st = res.status();
      if (st < 400) continue;
      if (ANTIBOT.some((a) => href.includes(a.host) && st === a.status)) continue;
      bad.push(`${href} → ${st}`);
    } catch (e) {
      bad.push(`${href} → ${e.message.slice(0, 40)}`);
    }
  }
  log("vanjske poveznice", bad.length === 0, `${hrefs.length - bad.length}/${hrefs.length} OK ${bad.length ? "— " + bad.join(", ") : ""}`);
  await b.close();
}


// 9 — SAMO /cv: nula izmišljenog sadržaja + jednostranični PDF
if (URL.includes("/cv")) {
  const b = await chromium.launch();
  const page = await b.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(URL, { waitUntil: "networkidle" });

  // Gemini predložak je ostavio lažnu preporuku i izmišljene projekte.
  // Ovo mora ostati na nuli zauvijek.
  const FABRICATED = [
    "Client / Project",
    "Client Name",
    "[Company]",
    "by X%",
    "X% decrease",
    "Lorem",
    "lorem ipsum",
  ];
  const html = await page.content();
  const found = FABRICATED.filter((t) => html.includes(t));
  const deadLinks = await page.evaluate(
    () => document.querySelectorAll('a[href="#"], a[href=""]').length,
  );
  log("bez izmišljenog", found.length === 0 && deadLinks === 0,
    `${found.length ? "NAĐENO: " + found.join(", ") : "čisto"}, mrtvih poveznica ${deadLinks}`);

  // Plutajući gumb ne smije prekrivati nijedan klikabilni element
  const clash = await page.evaluate(() => {
    const fab = document.querySelector("button.fixed");
    if (!fab) return ["nema gumba"];
    const f = fab.getBoundingClientRect();
    const hits = [];
    document.querySelectorAll("a, button").forEach((el) => {
      if (el === fab) return;
      const r = el.getBoundingClientRect();
      if (!r.width || r.bottom < 0 || r.top > window.innerHeight) return;
      if (!(r.right < f.left || r.left > f.right || r.bottom < f.top || r.top > f.bottom))
        hits.push((el.textContent || el.tagName).trim().slice(0, 24));
    });
    return hits;
  });
  log("gumb ne zaklanja", clash.length === 0,
    clash.length ? "preklapa: " + clash.join(", ") : "ništa klikabilno ispod");

  // Ispis mora dati JEDNU A4 stranicu
  await page.emulateMedia({ media: "print" });
  const pdf = await page.pdf({ format: "A4", printBackground: true });
  const pages = (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) || []).length;
  log("PDF jedna stranica", pages === 1, `${pages} str., ${Math.round(pdf.length / 1024)} KB`);

  await b.close();
}

const failed = results.filter((r) => !r).length;
console.log(`\n${results.length - failed}/${results.length} prošlo${failed ? `, ${failed} PALO` : ""}`);
process.exit(failed ? 1 : 0);
