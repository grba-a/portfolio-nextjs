/**
 * Podaci specifični za /cv.
 *
 * Projekti, certifikati i kontakt NISU ovdje — dolaze iz `work.ts` i `site.ts`
 * da se CV i portfolio ne mogu razići.
 *
 * Sve tvrdnje ispod su Petrove, preuzete iz njegove ranije verzije CV-a.
 * Ništa izmišljeno: bez brojki o rezultatima, bez preporuka, bez poslodavaca
 * kod kojih nije radio.
 */

export const cv = {
  // zip je brand od 2026-09-15; /cv ostaje Petrov osobni životopis
  role: "Head of Operations / Founder of zip",
  location: "Zagreb / Dubrovnik, Croatia",

  summary:
    "I run zip, a small marketing and growth agency: websites, ads, local search and the copy on all of it, handled in one place. Every job starts with a free written check of a business’s site, Google listing and booking path. Currently studying Digital Marketing at Algebra, Zagreb, with twelve Google and HubSpot certifications; two sites live and two in progress.",

  /** Kratki popis za pobočni stupac. Šire liste su u content.ts (Offer). */
  coreStack: [
    "Web Design",
    "Web Development",
    "SEO",
    "Google Ads",
    "Meta Ads",
    "Copywriting",
    "Analytics",
    "Branding",
  ],

  /** Što radim — sažeto na tri, isto kao na portfoliju. */
  services: [
    {
      title: "Web design & development",
      body: "Fast, responsive sites built to convert — from first sketch to launch and hosting.",
    },
    {
      title: "SEO",
      body: "On-page and technical work, local SEO and Google Business, so the site gets found.",
    },
    {
      title: "Paid ads (Google & Meta)",
      body: "Campaign setup, targeting and tracking, with the analytics to see what it returns.",
    },
  ],

  /**
   * Iskustvo i obrazovanje.
   * TREBA POTVRDU: službeni naziv škole te datumi i nazivi poslodavaca.
   */
  timeline: [
    {
      period: "Sep 2024 — Present",
      title: "Digital Marketing",
      org: "Algebra University College, Zagreb",
      note: "Digital strategy, analytics and campaign management.",
    },
    {
      period: "Oct — Dec 2023",
      title: "Voluntary Military Training",
      org: "Croatian Ministry of Defence (MORH)",
      note: "Where the discipline behind every deadline comes from.",
    },
    {
      period: "2022 — 2024 (seasonal)",
      title: "Client Relations & Safety Operations",
      org: "Maistra Hotels · Pimaro d.o.o., Dubrovnik area",
      note: "Safety protocols and direct guest communication in high-season conditions.",
    },
  ],
} as const;
