import { NextResponse } from "next/server";
import { site } from "@/data/site";

/**
 * Slobodni termini s Cal.coma, po danima.
 *
 * Ovo je izvor za vlastitu mrežu dana u sekciji kontakta. Prije je vraćalo
 * samo tri termina; mreži trebaju svi dani.
 *
 * Zašto ruta na serveru, a ne poziv iz preglednika:
 *  1. `GET /v2/slots` je javan i radi bez ključa — ali ako ključ POSTOJI,
 *     šaljemo ga, a on ne smije u kod jer je stranica statična.
 *  2. Keširanje na jednom mjestu umjesto po posjetitelju.
 *
 * Ako ključ postoji ali je neispravan (istekao, rotiran), Cal vrati 401 —
 * tada se poziv PONAVLJA bez ključa. Bez toga bi jedan pokvaren ključ
 * ugasio kalendar iako endpoint radi i bez njega.
 */

/**
 * Ruta se MORA vrtjeti po zahtjevu. Sa samim `revalidate` Next ju je
 * predrenderirao u trenutku builda — kad ključa u okolini još nema —
 * i zauvijek servirao prazno.
 */
export const dynamic = "force-dynamic";

/** 60 s, ne 300: uz punu mrežu termina veći keš znači da netko odabere
 *  termin koji je u međuvremenu zauzet i bude odbijen na tuđoj domeni. */
const CACHE_SECONDS = 60;

const CAL_API = "https://api.cal.com/v2/slots";
/** Zaglavlje mora biti TOČNO ovo — svaka druga vrijednost daje 404 koji
 *  izgleda kao da event type ne postoji. */
const CAL_VERSION = "2024-09-04";

/** Tri tjedna: dalje od toga nitko ne dogovara uvodni poziv, a prazan
 *  kalendar pun slobodnih dana čita se kao „nitko ga ne zove". */
const DAYS_AHEAD = 21;
/** Najviše šest termina po danu, razmaknutih kroz dan — Cal nudi svakih
 *  15 minuta, pa bi prvih šest bilo šest puta isto jutro. */
const PER_DAY = 6;

type CalResponse = { data?: Record<string, { start: string }[]> };

/** Ravnomjeran izbor n elemenata iz niza, uvijek uključuje prvi. */
function spread(list: string[], n: number) {
  if (list.length <= n) return list;
  const step = (list.length - 1) / (n - 1);
  return Array.from({ length: n }, (_, i) => list[Math.round(i * step)]);
}

export async function GET() {
  if (!site.calUsername || !site.calEventSlug) {
    return NextResponse.json({ days: {}, reason: "not-configured" });
  }

  const now = new Date();
  const end = new Date(now.getTime() + DAYS_AHEAD * 864e5);

  const url =
    `${CAL_API}?username=${encodeURIComponent(site.calUsername)}` +
    `&eventTypeSlug=${encodeURIComponent(site.calEventSlug)}` +
    `&start=${now.toISOString()}` +
    `&end=${end.toISOString()}` +
    `&timeZone=${encodeURIComponent(site.timeZone)}`;

  const call = (key?: string) =>
    fetch(url, {
      headers: {
        "cal-api-version": CAL_VERSION,
        ...(key ? { Authorization: `Bearer ${key}` } : {}),
      },
      next: { revalidate: CACHE_SECONDS },
    });

  try {
    const key = process.env.CAL_API_KEY;
    let res = await call(key);
    // Pokvaren ključ ne smije ugasiti kalendar — endpoint radi i bez njega.
    if (key && (res.status === 401 || res.status === 403)) res = await call();

    if (!res.ok) {
      return NextResponse.json({ days: {}, reason: `cal-${res.status}` });
    }

    const json = (await res.json()) as CalResponse;
    const byDay = json.data ?? {};

    const days: Record<string, string[]> = {};
    for (const day of Object.keys(byDay).sort()) {
      const times = (byDay[day] ?? [])
        .map((x) => x?.start)
        .filter((s): s is string => typeof s === "string")
        .sort();
      if (times.length) days[day] = spread(times, PER_DAY);
    }

    return NextResponse.json({ days, timeZone: site.timeZone });
  } catch {
    return NextResponse.json({ days: {}, reason: "unreachable" });
  }
}
