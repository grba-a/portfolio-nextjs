/** Kontakt i poveznice — preuzeto s petargrbic.com. */

export const site = {
  name: "Petar Grbić",
  url: "https://petargrbic.com",
  email: "thepetargrbic@gmail.com",
  cv: "/PetarGrbic_CV.pdf",
  formspree: "https://formspree.io/f/xreayqjv",

  /**
   * Primarni CTA. Dok Petar ne pošalje Cal.com poveznicu, gumb vodi na
   * sekciju s kontaktom — nikad na mrtvi link.
   * Kad stigne: booking = "https://cal.com/…" i gumb radi bez druge izmjene.
   */
  booking: null as string | null,

  /**
   * WhatsApp u međunarodnom formatu, bez plusa i razmaka (npr. "385991234567").
   * Za vlasnika malog posla je najbrži kanal — konvertira bolje od forme.
   */
  whatsapp: null as string | null,

  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/petar-grbi%C4%87-455880398/" },
    { label: "GitHub", href: "https://github.com/grba-a?tab=repositories" },
    { label: "Instagram", href: "https://www.instagram.com/grbicpetarr/" },
    { label: "Facebook", href: "https://web.facebook.com/petaargrbic?locale=hr_HR" },
  ],
} as const;

/** Kamo vodi primarni CTA — kalendar ako postoji, inače sekcija kontakta. */
export const bookingHref = site.booking ?? "#contact";

export const whatsappHref = site.whatsapp
  ? `https://wa.me/${site.whatsapp}`
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
