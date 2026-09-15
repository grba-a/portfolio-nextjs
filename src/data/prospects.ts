/**
 * Privatne stranice za vlasnike kojima se Petar prvi javlja: /p/<slug>.
 *
 * Jedan vlasnik = jedan objekt ovdje. Stranica je na hrvatskom, skrivena
 * od Googlea (noindex, nije u sitemapu) i ima jedan gumb: WhatsApp s imenom
 * posla u poruci — pa se iz poruke odmah vidi koji je link upalio.
 *
 * PRAVILA (vault: never-invent-facts)
 *   - svaki nalaz Petar provjeri NA DAN SLANJA i upiše datum u `checkedOn`;
 *     dosjei u vaultu su iz kolovoza i nalazi zastarijevaju
 *   - `slug` se ne smije moći pogoditi: ime + nasumični nastavak,
 *     npr. "konoba-primjer-7f3a"
 *   - `concept` je Vercelov link za dijeljenje (spec verzije su zaključane),
 *     nikad obični *.vercel.app URL
 *
 * OKVIR ZA PRVOG VLASNIKA — kopiraj u niz ispod i popuni:
 * {
 *   slug: "",
 *   name: "",
 *   site: "https://",
 *   findings: [
 *     { title: "", check: "" },
 *     { title: "", check: "" },
 *     { title: "", check: "" },
 *   ],
 *   checkedOn: "2026-09-",
 * },
 */

export type Finding = {
  /** Što ne valja, jednom rečenicom, jezikom vlasnika */
  title: string;
  /** Kako to sam provjeri za minutu */
  check: string;
};

export type Prospect = {
  slug: string;
  /** Ime posla točno kako ga vlasnik piše */
  name: string;
  /** Njegova sadašnja stranica */
  site?: string;
  findings: Finding[];
  /** Link za dijeljenje na Petrov prijedlog, ako postoji */
  concept?: string;
  /** Dan kad su nalazi provjereni, "GGGG-MM-DD" */
  checkedOn: string;
};

export const prospects: Prospect[] = [];
