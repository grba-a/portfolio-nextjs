import { chromium, webkit } from "playwright";

const URL = process.env.VERIFY_URL || "http://localhost:4100";
// Snimke idu u SHOTS ako je zadan, inače u sistemski temp — prije je ovdje
// stajala apsolutna putanja jedne sesije, koja drugdje ne postoji.
const SP = process.env.SHOTS || (await import("node:os")).tmpdir();
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
      // Traka certifikata je namjerno šira od ekrana: klizi unutar maske
      if (el.closest(".marquee")) return;
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

// 5 — REDUCED MOTION: sve vidljivo, nema zatvarača, traka stoji
{
  const b = await chromium.launch();
  const ctx = await b.newContext({ reducedMotion: "reduce", viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  const r = await page.evaluate(() => {
    const els = [...document.querySelectorAll(".rise, .rise-h")];
    const mq = document.querySelector(".marquee-track");
    return {
      hidden: els.filter((e) => parseFloat(getComputedStyle(e).opacity) < 0.5).length,
      total: els.length,
      zipper: document.documentElement.dataset.zz || "off",
      marquee: mq ? getComputedStyle(mq).animationName : "n/a",
    };
  });
  log("reduced motion", r.hidden === 0 && r.zipper === "off" && (r.marquee === "none" || r.marquee === "n/a"),
    `skriveno ${r.hidden}/${r.total}, zatvarač:${r.zipper}, traka:${r.marquee}`);
  await b.close();
}

// 6 — WEBKIT: zatvarač nestane, naslov i punjenje riječi rade (pravi iPhone motor)
{
  const b = await webkit.launch();
  const page = await b.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(3200);
  const r = await page.evaluate(() => {
    const zz = document.querySelector(".zz");
    const fill = document.querySelector(".fill-word");
    const cs = fill ? getComputedStyle(fill) : null;
    const lines = [...document.querySelectorAll("h1 .fade-line")];
    return {
      zipper: zz ? getComputedStyle(zz).display === "none" || parseFloat(getComputedStyle(zz).opacity) < 0.05 : true,
      clip: cs ? cs.webkitBackgroundClip || cs.backgroundClip : "n/a",
      hidden: lines.filter((e) => parseFloat(getComputedStyle(e).opacity) < 0.5).length,
      overflowX: document.documentElement.scrollWidth > window.innerWidth + 1,
    };
  });
  await walk(page);
  const broken = await page.evaluate(() => [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).length);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: `${SP}/v-webkit-hero.png` });
  const clipOK = r.clip === "n/a" || r.clip === "text";
  log("WebKit", r.zipper && clipOK && r.hidden === 0 && !r.overflowX && broken === 0,
    `zatvarač gotov:${r.zipper}, punjenje:${r.clip}, skriveno ${r.hidden}, overflowX:${r.overflowX}, slike loše:${broken}`);
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
      if (rect.height < 44) small.push((el.textContent || el.tagName).trim().slice(0, 22) + ` ${Math.round(rect.height)}px`);
    });
    return { small: [...new Set(small)] };
  });
  log("dodirne mete", r.small.length === 0, r.small.length ? `ispod 44px: ${r.small.slice(0, 8).join(", ")}` : "sve ≥44px");
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
    // wa.me ograničava brzinu kad ga skripta pogodi više puta zaredom
    { host: "wa.me", status: 429 },
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


// 10 — CTA NA SVAKOM EKRANU (prije: ekrani 1-7 nisu imali nijedan)
{
  const b = await chromium.launch();
  const page = await b.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(URL, { waitUntil: "networkidle" });
  const H = 844;
  const total = await page.evaluate(() => document.body.scrollHeight);
  const empty = [];
  for (let i = 0; i < Math.ceil(total / H); i++) {
    await page.evaluate((y) => window.scrollTo(0, y), i * H);
    await page.waitForTimeout(320);
    const n = await page.evaluate(() => {
      let count = 0;
      document.querySelectorAll("a, button").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < 0 || r.bottom > window.innerHeight || !r.width) return;
        if (el.closest("[aria-hidden='true']")) return;
        const href = el.getAttribute("href") || "";
        if (/^tel:|^mailto:|wa\.me|cal\.com|#contact/.test(href)) count++;
      });
      return count;
    });
    // Zadnji ekran je podnožje, odmah nakon kontakta — traka je tamo
    // namjerno skrivena da ne duplira kanale koje je korisnik upravo prošao.
    const isLast = i === Math.ceil(total / H) - 1;
    if (n === 0 && !isLast) empty.push(i);
  }
  log("CTA na svakom ekranu", empty.length === 0,
    empty.length ? `bez CTA na ekranima: ${empty.join(", ")}` : `svih ${Math.ceil(total / H)} ekrana ima kontakt`);
  await b.close();
}

// 11 — KONTRAST (canvas razrješava oklab; naivni RGB parser daje besmislice)
{
  const b = await chromium.launch();
  const page = await b.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(URL, { waitUntil: "networkidle" });
  await walk(page);
  const bad = await page.evaluate(() => {
    const c = document.createElement("canvas"); c.width = c.height = 1;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    const toRGBA = (css) => {
      ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = "#000"; ctx.fillStyle = css;
      ctx.clearRect(0, 0, 1, 1); ctx.fillRect(0, 0, 1, 1);
      const d = ctx.getImageData(0, 0, 1, 1).data;
      return [d[0], d[1], d[2], d[3] / 255];
    };
    const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    const L = ([r, g, bl]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(bl);
    const bgOf = (el) => { let n = el; while (n) { const v = toRGBA(getComputedStyle(n).backgroundColor); if (v[3] > 0.9) return v.slice(0, 3); n = n.parentElement; } return [0, 0, 0]; };
    const out = [];
    document.querySelectorAll("p,span,a,li,label,dt,dd,button,h1,h2,h3").forEach((el) => {
      const txt = (el.textContent || "").trim();
      if (!txt || el.children.length) return;
      const cs = getComputedStyle(el); const rect = el.getBoundingClientRect();
      if (!rect.width || cs.visibility === "hidden" || parseFloat(cs.opacity) < 0.1) return;
      if (el.closest(".skip") || el.closest("header") || el.className.toString().includes("sr-only")) return;
      // Tekst s prijelazom ili kromom ima color: transparent — boja je u pozadini
      if (cs.webkitTextFillColor === "rgba(0, 0, 0, 0)" || toRGBA(cs.color)[3] === 0) return;
      const fg = toRGBA(cs.color); const bg = bgOf(el);
      const eff = [0, 1, 2].map((i) => fg[3] * fg[i] + (1 - fg[3]) * bg[i]);
      const l1 = L(eff), l2 = L(bg);
      const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
      const size = parseFloat(cs.fontSize), wt = parseInt(cs.fontWeight) || 400;
      const need = size >= 24 || (size >= 18.66 && wt >= 700) ? 3 : 4.5;
      if (ratio < need) out.push(`${ratio.toFixed(2)}:1 "${txt.slice(0, 24)}"`);
    });
    return [...new Set(out)];
  });
  log("kontrast", bad.length === 0, bad.length ? bad.slice(0, 5).join(" · ") : "sve iznad praga");
  await b.close();
}

// 12 — SLIKE IZNAD PREGIBA BEZ SKROLANJA
{
  const b = await chromium.launch();
  const page = await b.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(2200);
  const r = await page.evaluate(() => {
    const bad = [];
    [...document.images].forEach((i) => {
      const rect = i.getBoundingClientRect();
      const nearTop = rect.top < window.innerHeight * 1.2;
      if (!nearTop) return;
      if (!i.currentSrc || i.naturalWidth === 0) bad.push(i.alt || i.src.slice(-26));
    });
    return bad;
  });
  log("slike bez skrolanja", r.length === 0, r.length ? `ne učitane: ${r.join(", ")}` : "sve iznad pregiba učitane");
  await b.close();
}

// 13 — GREŠKE U KONZOLI, sa satom 45 dana nakon builda.
// Prerender zapeče dan builda; ako se klijent ne slaže sa serverom, React
// baca #418 i gradi stranicu ispočetka (hero se vrti ponovo). Tako je
// #418 prošao na produkciju: nijedna provjera nije slušala greške.
{
  const b = await chromium.launch();
  const page = await b.newPage({ viewport: { width: 390, height: 844 } });
  const errs = [];
  page.on("pageerror", (e) => errs.push(e.message.slice(0, 70)));
  page.on("console", (m) => {
    // Vercel Analytics skripta postoji samo na Vercelu; lokalno je 404
    if (m.type() === "error" && !/_vercel\/insights|status of 404/.test(m.text())) errs.push(m.text().slice(0, 70));
  });
  await page.clock.install({ time: new Date(Date.now() + 45 * 864e5) });
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.clock.runFor(3000);
  log("konzola (+45 dana)", errs.length === 0, errs.length ? errs.slice(0, 3).join(" | ") : "bez grešaka, bez #418");
  await b.close();
}

const failed = results.filter((r) => !r).length;
console.log(`\n${results.length - failed}/${results.length} prošlo${failed ? `, ${failed} PALO` : ""}`);
process.exit(failed ? 1 : 0);
