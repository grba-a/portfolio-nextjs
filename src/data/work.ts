/**
 * Popis radova. Jedan projekt = jedan objekt ovdje + jedna snimka.
 *
 * DODAVANJE NOVOG PROJEKTA
 *   1. kopiraj okvir s dna ove datoteke i popuni ga
 *   2. node scripts/shoot.mjs <slug>     → snimi public/work/<slug>.webp
 *   Komponente se ne diraju.
 *
 * Sadržaj je preuzet s petargrbic.com — bez izmišljenih tvrdnji i brojki.
 */

export type WorkStatus = "live" | "in-development";

export type WorkItem = {
  slug: string;
  /** Redni broj na stranici — "01", "02"… */
  index: string;
  name: string;
  href: string;
  status: WorkStatus;
  /** public/work/<slug>.webp — snima scripts/shoot.mjs */
  shot: string;
  /** Na naslovnici su samo tri; ostali žive na /work (Petar, 2026-09-15) */
  featured: boolean;
  /** Kratka oznaka djelatnosti i mjesta */
  kind: string;
  /** Opis točno kako stoji na petargrbic.com */
  description: string;
  /** Što stranica konkretno radi za posao — provjerivo na živoj stranici */
  outcome: string;
  tags: string[];
  /** Isti tekst na hrvatskom, za /hr (Petar, 2026-09-15) */
  hr: { kind: string; description: string; outcome: string; tags: string[] };
};

/** Vrati tekst projekta na jeziku stranice. */
export const inLang = (w: WorkItem, lang: string) =>
  lang === "hr" ? { ...w, ...w.hr } : w;

export const work: WorkItem[] = [
  {
    slug: "apartments-grbic",
    index: "01",
    name: "Apartments Grbić",
    href: "https://apartmentsgrbic.com",
    status: "live",
    shot: "/work/apartments-grbic.webp",
    featured: true,
    kind: "My family's business · accommodation, Adriatic coast",
    description:
      "Booking-focused website for a family accommodation business on the Adriatic coast.",
    outcome: "Built around one action — check availability, then book.",
    tags: ["Web Design & Development", "SEO", "Content Marketing"],
    hr: {
      kind: "Obiteljski posao · smještaj, Jadran",
      description: "Stranica za obiteljski smještaj na Jadranu, složena oko rezervacije.",
      outcome: "Sve vodi na jednu radnju — provjeri slobodne termine, pa rezerviraj.",
      tags: ["Izrada stranice", "SEO", "Tekstovi"],
    },
  },
  {
    slug: "studio-amage",
    index: "02",
    name: "Studio Amage",
    href: "https://studioamage.com",
    status: "live",
    shot: "/work/studio-amage.webp",
    featured: true,
    kind: "Hair studio · Split",
    description: "Clean, modern website for a hair studio in Split, Croatia.",
    outcome: "The work is the first thing you see; booking is one tap away.",
    tags: ["Web Design & Development", "SEO", "Paid Ads"],
    hr: {
      kind: "Frizerski studio · Split",
      description: "Čista, moderna stranica za frizerski studio u Splitu.",
      outcome: "Prvo se vidi rad; naručivanje je jedan dodir dalje.",
      tags: ["Izrada stranice", "SEO", "Oglasi"],
    },
  },
  {
    slug: "grbic-doo",
    index: "03",
    name: "GRBIĆ d.o.o.",
    href: "https://grba-a.github.io/grbicdizalice/",
    status: "in-development",
    shot: "/work/grbic-doo.webp",
    featured: true,
    kind: "My family's business · cranes & heavy equipment, Dubrovnik",
    description: "Corporate website for a crane and heavy equipment company.",
    outcome: "Every service block ends in the same place — send the enquiry.",
    tags: [],
    hr: {
      kind: "Obiteljski posao · dizalice i teška mehanizacija, Dubrovnik",
      description: "Stranica za tvrtku koja iznajmljuje dizalice i tešku mehanizaciju.",
      outcome: "Svaki blok usluge završava na istom mjestu — pošalji upit.",
      tags: [],
    },
  },
  {
    slug: "vk-festanjuli",
    index: "04",
    name: "VK Festanjuli",
    href: "https://festanjuli-web.vercel.app/",
    status: "in-development",
    shot: "/work/vk-festanjuli.webp",
    featured: false,
    kind: "Water polo club · Zagreb",
    description:
      "Website for an amateur water polo team — Dubrovnik locals playing out of Zagreb.",
    outcome: "Squad, season and news in one place the club actually updates.",
    tags: [],
    hr: {
      kind: "Vaterpolski klub · Zagreb",
      description: "Stranica za amaterski vaterpolski klub — Dubrovčani koji igraju iz Zagreba.",
      outcome: "Momčad, sezona i novosti na jednom mjestu koje klub doista održava.",
      tags: [],
    },
  },

  // ───────────────────────────────────────────────────────────────
  // OKVIR ZA SLJEDEĆI PROJEKT — otkomentiraj, popuni, pa pokreni
  //   node scripts/shoot.mjs <slug>
  //
  // {
  //   slug: "",
  //   index: "05",
  //   name: "",
  //   href: "https://",
  //   status: "live",
  //   shot: "/work/<slug>.webp",
  //   featured: false,
  //   kind: "",
  //   description: "",
  //   outcome: "",
  //   tags: [],
  // },
  // ───────────────────────────────────────────────────────────────
];
