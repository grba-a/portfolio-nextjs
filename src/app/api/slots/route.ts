import { NextResponse } from "next/server";
import { site } from "@/data/site";

/**
 * Sljedeći slobodni termini s Cal.coma.
 *
 * Ovo postoji SAMO zato da API ključ ostane na serveru. Stranica je inače
 * statična, pa bi ključ u kodu bio čitljiv svakom posjetitelju — a Cal.com
 * ključ ne samo čita nego i mijenja: tuđi bi mogao otkazati sastanke,
 * vidjeti imena i mailove klijenata ili zatrpati kalendar.
 *
 * Ključ se postavlja u Vercel → Settings → Environment Variables
 * kao `CAL_API_KEY`. Nikad u repozitorij, nikad u .env koji se commita.
 *
 * Ako ključa nema ili Cal.com ne odgovori, ruta vraća prazan popis —
 * sučelje tada samo prikaže gumb koji otvara cijeli kalendar. Posjetitelj
 * nikad ne vidi grešku.
 */

/**
 * Ruta se MORA vrtjeti po zahtjevu. Sa samim `revalidate` Next ju je
 * predrenderirao u trenutku builda — kad ključa u okolini još nema —
 * i zauvijek servirao "not-configured".
 * Keširanje je na samom pozivu prema Cal.comu (5 min), pa ga i dalje ne davimo.
 */
export const dynamic = "force-dynamic";
const CACHE_SECONDS = 300;

const CAL_API = "https://api.cal.com/v2/slots";
const DAYS_AHEAD = 14;
const MAX_SLOTS = 3;

type CalResponse = {
  status?: string;
  data?: Record<string, { start: string }[]>;
};

export async function GET() {
  const key = process.env.CAL_API_KEY;

  // Bez ključa nije greška — samo nemamo termine za pokazati.
  if (!key || !site.calUsername || !site.calEventSlug) {
    return NextResponse.json({ slots: [], reason: "not-configured" });
  }

  const now = new Date();
  const end = new Date(now.getTime() + DAYS_AHEAD * 864e5);

  const url =
    `${CAL_API}?username=${encodeURIComponent(site.calUsername)}` +
    `&eventTypeSlug=${encodeURIComponent(site.calEventSlug)}` +
    `&start=${now.toISOString()}` +
    `&end=${end.toISOString()}` +
    `&timeZone=${encodeURIComponent(site.timeZone)}`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${key}`,
        "cal-api-version": "2024-09-04",
      },
      next: { revalidate: CACHE_SECONDS },
    });

    if (!res.ok) {
      return NextResponse.json({ slots: [], reason: `cal-${res.status}` });
    }

    const json = (await res.json()) as CalResponse;

    /*
     * Po JEDAN termin iz svakog dana. Cal.com vraća sve slobodne intervale,
     * pa bi "prva tri" bila 09:00, 09:15 i 09:30 istog jutra — tri puta
     * ista informacija. Prvi slobodan iz tri različita dana daje čovjeku
     * stvaran izbor.
     */
    const byDay = json.data ?? {};
    const slots = Object.keys(byDay)
      .sort()
      .map((day) => byDay[day]?.map((x) => x?.start).filter(Boolean).sort()[0])
      .filter((s): s is string => typeof s === "string")
      .slice(0, MAX_SLOTS);

    return NextResponse.json({ slots });
  } catch {
    return NextResponse.json({ slots: [], reason: "unreachable" });
  }
}
