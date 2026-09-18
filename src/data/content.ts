import { certs } from "./site";

/**
 * Sav tekst stranice, na jednom mjestu.
 *
 * Redizajn 2026-09-18: nove sekcije (traka, provjera, činjenice, pitanja)
 * složene su od rečenica koje su već stajale na stranici. Nijedna tvrdnja
 * nije izmišljena: nema brojki o rezultatima, nema recenzija, nema cijena.
 * Stranica govori samo o firmi (Petar: "ovo je isključivo za firmu").
 */

export const content = {
  lang: "en",
  locale: "en-GB",
  home: "/",
  /** Pripremljena poruka: vlasnik dopiše samo adresu. */
  whatsappText: "Hello! I'd like the free website check. My site: ",
  week: ["S", "M", "T", "W", "T", "F", "S"],
  weekFull: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],

  nav: {
    links: [
      { href: "/#work", label: "Work" },
      { href: "/#how", label: "How it works" },
      { href: "/#about", label: "About" },
      { href: "/#contact", label: "Contact" },
    ],
    cta: "Free check",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    langCaption: "Language",
  },

  // Naslov ostaje (odluka 15. 9.); zadnja riječ se puni kromom
  hero: {
    badgeTag: "Free",
    badge: "Website check, in writing",
    line1: "Systems",
    line2: "that",
    line2Fill: "sell.",
    sub: "Your website, Google listing and booking path, working as one. We check all three, in writing and for free.",
    ctaPrimary: "Get the free check",
    ctaSecondary: "See the work",
  },

  // Umjesto tuđih logotipa s predloška: ono što stvarno imamo (odluka 8B)
  strip: {
    label: "Google Ads & Analytics certified",
    items: [
      "Google Ads certified",
      "Google Analytics certified",
      "HubSpot certified",
      "Google Business Profile",
      "Meta ads",
      "Next.js",
      "Vercel",
      "Cal.com",
    ],
  },

  // Bento: svaka kartica je dio provjere (odluka 9A). Mini sučelja su
  // ilustracija, bez ijedne brojke o nečijem poslu.
  check: {
    eyebrow: "How the free check works",
    heading: ["We check", "all three."],
    sub: "Three findings about your listing, your site and your booking path, in writing.",
    found: {
      title: "Found.",
      body: "Often the first thing they see is your Google listing. Does it lead to your site?",
      search: "a table nearby",
      business: "Your business",
      chips: ["Call", "Website", "Directions"],
    },
    trusted: {
      title: "Trusted.",
      body: "Your site has a few seconds to show them you're the right choice.",
      seconds: "3s",
    },
    booked: {
      title: "Booked.",
      body: "One broken step between them and the booking, and they book someone else.",
      path: ["Search", "Website", "Book now"],
    },
    free: {
      title: "Free.",
      body: "Three findings, in writing. No pitch attached.",
      cta: "Get the free check",
    },
  },

  work: {
    eyebrow: "Work",
    heading: ["A few projects", "at a time."],
    sub: "So yours gets the attention it needs — and when a job calls for a photographer or a copywriter, we bring in someone who is genuinely good at it.",
    visit: "Visit site",
    details: "Details",
    statusLive: "Live",
    statusDev: "In early development",
    allBlock: {
      eyebrow: "All work",
      heading: "Every project, one page.",
      count: "projects",
    },
  },

  // /work — svi radovi; klik otvara popup, a svaki popup ima vlastiti link
  workPage: {
    title: "Work",
    heading: "Everything built so far.",
    open: "Details",
    close: "Close",
    prev: "Previous project",
    next: "Next project",
    preview: "Scroll to see more of the page",
    live: "live",
    building: "in progress",
    cta: {
      heading: "Want to know what yours gets wrong?",
      body: "Send us the address. The check is free.",
    },
  },

  process: {
    eyebrow: "How it works",
    heading: ["Free first.", "You decide the rest."],
    freeTag: "Free",
    steps: [
      {
        num: "01",
        title: "The free check",
        desc: "Send us your address. You get three findings about your Google listing, your website and your booking path, in writing. Free, and it commits you to nothing.",
      },
      {
        num: "02",
        title: "A proposal in writing",
        desc: "If you want them fixed: scope, timeline and price, agreed in writing before any work begins. No hidden costs.",
      },
      {
        num: "03",
        title: "Build and hand over",
        desc: "You see it at every stage. At launch you get full ownership: files, accounts, access to everything.",
      },
    ],
  },

  // Tri paketa (Petar, 2026-09-18, druga runda): Website i Growth su dijelovi,
  // System u sredini ih spaja uz AI i automatizaciju. Nijedne cijene; svaki
  // paket ima svoj gumb, a WhatsApp poruka nosi ime paketa. AI stavke je
  // Petar potvrdio kvačicama kao nešto što isporučujemo.
  packages: {
    eyebrow: "Packages",
    heading: ["One part,", "or the whole system."],
    sub: "Every part works on its own, and better together.",
    tiers: [
      {
        id: "website",
        name: "Website",
        promise: "A website that takes bookings.",
        modules: [
          { icon: "web", label: "Website" },
          { icon: "cal", label: "Booking" },
          { icon: "pin", label: "Google profile" },
        ],
        includes: "",
        items: [
          "Design, build and launch, fast on a phone",
          "Booking system connected",
          "Google Business profile linked",
          "Analytics, so you see what it does",
        ],
        foot: "The foundation.",
        cta: "Start with the website",
        whatsapp: "Hello! I'm interested in the Website package. My site: ",
        highlight: false,
        tag: "",
      },
      {
        id: "system",
        name: "System",
        promise: "Website, search, ads and AI, working as one.",
        modules: [
          { icon: "web", label: "Website" },
          { icon: "cal", label: "Booking" },
          { icon: "search", label: "SEO" },
          { icon: "ads", label: "Ads" },
          { icon: "ai", label: "AI" },
          { icon: "auto", label: "Automation" },
        ],
        includes: "Everything in Website and Growth, plus:",
        items: [
          "AI assistant on your site",
          "Automatic replies to enquiries",
          "Booking confirmations and reminders",
          "Review requests after a visit",
          "AI translations of your site",
          "Every enquiry in one place",
          "A monthly report, built automatically",
          "Care, monthly: hosting and updates",
        ],
        foot: "The system that sells for you.",
        cta: "Get the system",
        whatsapp: "Hello! I'm interested in the System package. My site: ",
        highlight: true,
        tag: "The whole system",
      },
      {
        id: "growth",
        name: "Growth",
        promise: "More of the right people find you.",
        modules: [
          { icon: "search", label: "SEO" },
          { icon: "ads", label: "Google Ads" },
          { icon: "ads", label: "Meta Ads" },
        ],
        includes: "",
        items: [
          "Local SEO and your Google Business profile",
          "Google Ads and Meta Ads, run for you",
          "Copywriting for pages and ads",
          "A report every month",
        ],
        foot: "Works with a site you already have.",
        cta: "Start growing",
        whatsapp: "Hello! I'm interested in the Growth package. My site: ",
        highlight: false,
        tag: "",
      },
    ],
    note: "No hidden costs. Every project starts with the free check.",
  },

  // Predložak tu ima 200 % i 50K+. Mi nemamo takve brojke, pa stoje četiri
  // koje su već napisane na stranici (odluka 13A).
  facts: {
    eyebrow: "Good to know",
    heading: "No hidden costs.",
    sub: "Everything here is already true, and already in writing.",
    items: [
      { n: "3", label: "findings in every free check" },
      { n: "24 h", label: "to reply, no automated email" },
      { n: String(certs.length), label: "Google & HubSpot certificates" },
      { n: "100%", label: "yours at launch: files, accounts, access" },
    ],
  },

  // Samo firma, bez imena i portreta (odluka 15A, Petar 2026-09-18). Zagreb.
  about: {
    eyebrow: "About",
    heading: ["Who you'd be", "working with"],
    p1: "One point of contact for all of it. You brief us once and we handle the rest; when a job needs a photographer, a copywriter or a specialist, we bring one in.",
    p2: "The site, the ads, the search, and the words on all of it.",
    location: "Zagreb, Croatia",
    certs: "Google Ads & Analytics certified",
  },

  // Naslov je nacrt; svaki odgovor je rečenica koja već stoji na stranici
  faq: {
    eyebrow: "Questions",
    heading: ["Before you send", "the address."],
    items: [
      {
        q: "What does the free check cover?",
        a: "Three findings about your Google listing, your website and your booking path, in writing. Free, and it commits you to nothing.",
      },
      { q: "How much does a website cost?", a: "Exact price in writing after the free check. No hidden costs." },
      { q: "How long does it take?", a: "Timeline in writing too, with the quote." },
      { q: "Who owns the site?", a: "You do. At launch you get full ownership: files, accounts, access to everything." },
      { q: "Croatian or English?", a: "Croatian or English, whichever suits you." },
      {
        q: "Do you do ads and SEO?",
        a: "Yes. Google and Meta ads, local SEO, your Google Business profile and copywriting are the Growth package, and part of the System. Logo and identity too, on request.",
      },
    ],
  },

  book: {
    eyebrow: "Free website check",
    heading: ["Send us", "your website."],
    sub: "Three findings about your site, your Google listing and the path to a booking, in writing. Free, and no pitch attached.",
    whatsappLabel: "Get the free check on WhatsApp",
    stickyLabel: "Free check on WhatsApp",
    callLabel: "Or call",
    language: "Croatian or English, whichever suits you.",
    reply: "We reply within 24 hours.",
    calendarLabel: "Pick a time",
    calendarTitle: "Pick a day · 15 minutes",
    calendarCta: "See available times",
    pickDay: "Prefer a call?",
    timesOn: "Times on",
    loadingTimes: "Loading available times…",
    loadingForm: "Loading the booking form…",
    confirmLabel: "Confirm your call",
    calendarFallback: "Calendar not loading? Open it on",
    formToggle: "Rather send it by email?",
    name: "Name",
    email: "Email",
    message: "Message",
    messagePlaceholder: "Your website address, and what you want more of: bookings, calls, walk-ins.",
    send: "Send message",
    sending: "Sending…",
    success: "Message sent. We'll get back to you within 24 hours.",
    errorServer: "Something went wrong. Please email us directly.",
    afterSend: "We'll reply within 24 hours with a few questions — no automated email, no newsletter.",
    required: "Please fill in this field.",
    invalidEmail: "Please enter a valid email address.",
  },

  footer: {
    // Slogan = domena (donebyzip.com), isti i na /hr (Petar, 2026-09-18)
    heading: ["Get it done", "by zip."],
    body: "Send us the address. The check is free.",
    cta: "Get the free check",
    site: "Site",
    more: "More",
    allWork: "All work",
    questions: "Questions",
    tagline: "Marketing and growth for small businesses.",
    copyright: "All rights reserved.",
    langHref: "/hr",
    langLabel: "Hrvatski",
  },
};

/**
 * Oblik cijele kopije. Hrvatska verzija (`content-hr.ts`) mora imati SVE
 * što i engleska — TypeScript to čuva — pa je /hr ista stranica.
 */
export type Copy = typeof content;
