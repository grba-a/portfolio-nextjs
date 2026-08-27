/** Kontakt i poveznice — preuzeto s petargrbic.com. */

export const site = {
  name: "Petar Grbić",
  url: "https://petargrbic.com",
  email: "thepetargrbic@gmail.com",
  /** CV je ruta unutar ovog projekta — /cv */
  cv: "/cv",
  formspree: "https://formspree.io/f/xreayqjv",

  /**
   * Primarni CTA — Cal.com termin "15 min meeting".
   * Obična poveznica, bez embeda i bez API ključa: stranica je statična,
   * pa bi svaki ključ u kodu bio čitljiv svakom posjetitelju.
   */
  /*
   * Termin "Free 15-min call", 15 min, Cal Video, Europe/Zagreb.
   * Provjereno 2026-08-26: javno vraća 200.
   *
   * NAPOMENA: raniji /15min i /30min vraćaju 404 — postoje u dashboardu
   * ali nisu objavljeni. Ne koristiti ih.
   */
  booking: "https://cal.com/petar-grbic-lhjstb/intro" as string | null,

  /**
   * Javni podaci Cal.com termina — ovo smije u kod.
   * API KLJUČ NE SMIJE: živi kao `CAL_API_KEY` u Vercel environment
   * variables i čita ga isključivo /api/slots na serveru.
   */
  calUsername: "petar-grbic-lhjstb",
  calEventSlug: "intro",
  timeZone: "Europe/Zagreb",

  /** Za tel: poveznicu — bez razmaka, s pozivnim brojem */
  phone: "+385981834111",
  /** Kako se broj piše ljudima */
  phoneDisplay: "(+385) 98 183 4111",

  /**
   * WhatsApp u međunarodnom formatu, bez plusa i razmaka.
   * Za vlasnika malog posla je najbrži kanal — konvertira bolje od forme.
   */
  whatsapp: "385981834111" as string | null,

  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/petar-grbi%C4%87-455880398/" },
    { label: "GitHub", href: "https://github.com/grba-a?tab=repositories" },
    { label: "Instagram", href: "https://www.instagram.com/grbicpetarr/" },
    { label: "Facebook", href: "https://web.facebook.com/petaargrbic?locale=hr_HR" },
  ],
} as const;

/*
 * Primarni CTA (zaglavlje, hero) NE vodi više izravno na cal.com.
 * Kalendar je sada ugrađen u sekciju kontakta, pa gumb vodi na `#contact`:
 * kupac ostaje na stranici, vidi termine i uz njih ostale kanale.
 * Izravna poveznica `site.booking` ostaje — koristi ju sam kalendar.
 */

/**
 * Prazan WhatsApp chat je sam po sebi kočnica — kupac mora smisliti prvu
 * rečenicu. Pripremljena poruka ostavlja mu da dopiše samo svoj posao.
 */
const WA_TEXT = "Hi Petar — I saw your site. I run a ";

export const whatsappHref = site.whatsapp
  ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(WA_TEXT)}`
  : null;

/** 12 certifikata, točno kako stoje u public/certs/. */
export const certs = [
  { file: "ads-search", issuer: "Google Ads", name: "Search" },
  { file: "ads-display", issuer: "Google Ads", name: "Display" },
  { file: "ads-video", issuer: "Google Ads", name: "Video" },
  { file: "ads-apps", issuer: "Google Ads", name: "Apps" },
  { file: "ads-creative", issuer: "Google Ads", name: "Creative" },
  { file: "ads-measurement", issuer: "Google Ads", name: "Measurement" },
  { file: "ads-ai-performance", issuer: "Google Ads", name: "AI Performance" },
  { file: "ads-ai-shopping", issuer: "Google Ads", name: "AI Shopping" },
  { file: "analytics", issuer: "Google", name: "Analytics" },
  { file: "hubspot-content", issuer: "HubSpot", name: "Content Marketing" },
  { file: "hubspot-email", issuer: "HubSpot", name: "Email Marketing" },
  { file: "hubspot-inbound", issuer: "HubSpot", name: "Inbound Marketing" },
] as const;
