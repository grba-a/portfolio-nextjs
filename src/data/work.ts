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
  /** Kratka oznaka djelatnosti i mjesta */
  kind: string;
  /** Opis točno kako stoji na petargrbic.com */
  description: string;
  /** Što stranica konkretno radi za posao — provjerivo na živoj stranici */
  outcome: string;
  tags: string[];
};

export const work: WorkItem[] = [
  {
    slug: "apartments-grbic",
    index: "01",
    name: "Apartments Grbić",
    href: "https://apartmentsgrbic.com",
    status: "live",
    shot: "/work/apartments-grbic.webp",
    kind: "Accommodation · Adriatic coast",
    description:
      "Booking-focused website for a family accommodation business on the Adriatic coast.",
    outcome: "Built around one action — check availability, then book.",
    tags: ["Web Design & Development", "SEO", "Content Marketing"],
  },
  {
    slug: "studio-amage",
    index: "02",
    name: "Studio Amage",
    href: "https://studioamage.com",
    status: "live",
    shot: "/work/studio-amage.webp",
    kind: "Hair studio · Split",
    description: "Clean, modern website for a hair studio in Split, Croatia.",
    outcome: "The work is the first thing you see; booking is one tap away.",
    tags: ["Web Design & Development", "SEO", "Paid Ads"],
  },
  {
    slug: "grbic-doo",
    index: "03",
    name: "GRBIĆ d.o.o.",
    href: "https://grba-a.github.io/grbicdizalice/",
    status: "in-development",
    shot: "/work/grbic-doo.webp",
    kind: "Cranes & heavy equipment · Dubrovnik",
    description: "Corporate website for a crane and heavy equipment company.",
    outcome: "Every service block ends in the same place — send the enquiry.",
    tags: [],
  },
  {
    slug: "vk-festanjuli",
    index: "04",
    name: "VK Festanjuli",
    href: "https://festanjuli-web.vercel.app/",
    status: "in-development",
    shot: "/work/vk-festanjuli.webp",
    kind: "Water polo club · Zagreb",
    description:
      "Website for an amateur water polo team — Dubrovnik locals playing out of Zagreb.",
    outcome: "Squad, season and news in one place the club actually updates.",
    tags: [],
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
  //   kind: "",
  //   description: "",
  //   outcome: "",
  //   tags: [],
  // },
  // ───────────────────────────────────────────────────────────────
];
