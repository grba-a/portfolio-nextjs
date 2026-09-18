---
name: snimi
description: Snimi stranice donebyzip.com u pravom WebKitu na 360/390/430 i u Chromiumu na 1440 (cijela stranica), javi vodoravni scroll i greške u konzoli. Koristi nakon svake vizualne izmjene i prije nego Petru kažeš da je gotovo.
---

# /snimi

Petrovo pravilo: mobile first, provjereno u **pravom WebKitu** na 360, 390 i 430 px — ne u
Chromeovom emulatoru. Ovaj skill je jedan korak za to.

1. Dev server mora raditi (`npm run dev`, port 4100) ili produkcijski (`npm start`, 4200).
2. Pokreni: `node scripts/snimi.mjs [putanje…]` — bez argumenata snima `/`, `/hr`, `/work`.
   - Druga adresa: `SNIMI_URL=http://localhost:4200 node scripts/snimi.mjs`
   - Druga mapa: `SNIMI_OUT=<mapa> node scripts/snimi.mjs` (zadano: `$TMPDIR/snimi`)
3. Skripta ispisuje putanju svake snimke, upozorenje `⚠ vodoravni scroll` i greške iz konzole.
4. Pogledaj snimke (Read). Duge mobilne snimke izreži po visini prije gledanja, inače su
   presitne za prosudbu.
5. Petru javi što si vidio, s putanjama do snimki. Vodoravni scroll ili greška u konzoli
   nikad nisu "gotovo".
