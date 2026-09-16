# donebyzip.com

Osobni web Petra Grbića — web razvoj, oglasi i SEO za male tvrtke.
Next.js 16 (App Router) · Tailwind v4 · GSAP · TypeScript. Statički prerender.

```bash
npm install
npm run dev      # http://localhost:4100 (učitava ~/.config/petargrbic/env.local)
npm run build
```

## Struktura

```
src/
  app/          layout, page, globals.css (tokeni dizajn sustava)
  components/   Nav, Hero, Work, Offer, About, Process, BookCall, Footer
  lib/anim/     GSAP: registracija, reveal, paralaks, matchMedia
  data/
    work.ts     ← projekti (dodavanje = jedan objekt)
    content.ts  ← sav tekst stranice
    site.ts     ← kontakt, poveznice, certifikati, CTA
public/
  work/         snimke projekata (WebP) + hero-strip.webp
  certs/        12 certifikata, otvaraju se iz sekcije About
```

## Dodavanje novog projekta

1. Kopiraj okvir s dna `src/data/work.ts` i popuni ga.
2. Snimi stranicu:

```bash
node scripts/shoot.mjs <slug>
```

Skripta otvori živi URL, odbije cookie banner, zamrzne animacije i spremi
`public/work/<slug>.webp` (1440×900) i `<slug>-tall.webp`. Komponente se ne diraju.

Prvi put treba jednom: `npx playwright install chromium`

## Skripte

| Naredba | Što radi |
|---|---|
| `node scripts/shoot.mjs [slug]` | snimi stranice projekata iz `work.ts` |
| `node scripts/og.mjs` | regeneriraj `public/og-image.png` (pregled pri dijeljenju) |
| `node scripts/verify.mjs` | provjeri build — 12 testova, vidi niže |

## Verifikacija

`scripts/verify.mjs` pokreće se protiv živog servera
(`VERIFY_URL=http://localhost:4200 node scripts/verify.mjs`) i provjerava:

- sadržaj je vidljiv **bez JavaScripta** (prethodna verzija je imala 27 od 27 elemenata na `opacity: 0`)
- sve slike se učitaju (prethodna verzija: 0/4 projekta, 0/36 certifikata)
- `loadEventEnd` ispod 2,5 s (prethodna verzija: 10,0 s)
- nema vodoravnog scrolla ni elemenata izvan kadra na 360/390/768/1440/1920 px
- `prefers-reduced-motion` zaustavlja sve animacije, sadržaj ostaje čitljiv
- **WebKit**: maska teksta u heroju i lijeno učitavanje slika u traci
- dodirne mete ≥ 44 px
- sve vanjske poveznice vraćaju 200

Build pokretati tek **nakon** gašenja dev servera — Turbopack inače tiho
servira staru verziju modula.

## Napomene

- Nema hrvatske verzije — stranica je namjerno samo na engleskom.
- `CAL_API_KEY` živi u `~/.config/petargrbic/env.local`, izvan repoa i iCloud-a.
  `npm run dev` i `npm start` ga učitavaju odande; bez njega birač termina
  nudi poveznicu na Cal.com. Na Vercelu je u environment variables.
- Sekcija About je bez portreta dok ne stigne bolja fotografija;
  `public/me.webp` je spreman za povratak.
