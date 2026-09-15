/**
 * Sav tekst stranice, na jednom mjestu.
 *
 * Sadržaj potječe s petargrbic.com — bio, usluge, proces, certifikati.
 * Prepakiran je i skraćen, ali nijedna tvrdnja nije izmišljena:
 * nema brojki o rezultatima, nema klijentskih citata, nema fiktivnih logotipa.
 */

export const content = {
  nav: {
    links: [
      { href: "#work", label: "Work" },
      { href: "#how", label: "How it works" },
      { href: "#about", label: "About" },
      { href: "#contact", label: "Contact" },
    ],
    cta: "Free check",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },

  // Pozicioniranje "Provjera" (Petar, 2026-09-14): prvi korak je besplatna
  // pisana provjera, ne poziv. Bez obećanog roka — broj dana nije zadan.
  hero: {
    eyebrow: "Petar Grbić · Web design in Dubrovnik",
    // Maska ide na drugi redak: kratak i težak, da se snimka iza vidi
    line1: "Systems",
    line2: "that sell.",
    // "for free" dobiva rust krug: prvo dajemo besplatno, pa educiramo, pa
    // tek onda naplaćujemo (Petar, 2026-09-15)
    subBefore: "Your website, your Google listing and your booking path, working as one. Send me your address and I'll check all three, in writing and",
    subFree: "for free.",
    ctaPrimary: "Get the free check",
    ctaSecondary: "See the work",
    croatian: "Govorim hrvatski.",
  },

  // Priča u pet poteza — špil u heroju. Scene 2–4 su točno ono što provjera
  // gleda; peta je gumb. Edukacija prije naplate.
  story: {
    label: "How the free check works",
    prev: "Previous scene",
    next: "Next scene",
    scenes: [
      { title: "Someone nearby is searching.", free: null, body: "For a table, a boat, a room — right now, on a phone.", cta: null },
      { title: "Found.", free: null, body: "Often the first thing they see is your Google listing. Does it lead to your site?", cta: null },
      { title: "Trusted.", free: null, body: "Your site has a few seconds to show them you're the right choice.", cta: null },
      { title: "Booked.", free: null, body: "One broken step between them and the booking, and they book someone else.", cta: null },
      { title: "I check all three.", free: "Free.", body: "Three findings about your listing, your site and your booking path, in writing.", cta: "Get the free check" },
    ],
  },

  work: {
    heading: "Work",
    // Prije je pisalo "fully my own work" — to prodaje mene, a kupca zanima
    // koliko pažnje dobiva on. Sada: malo projekata odjednom, i majstor
    // se dovodi kad ga posao traži.
    sub: "A few projects at a time, so yours gets the attention it needs — and when a job calls for a photographer or a copywriter, I bring in someone who is genuinely good at it.",
    visit: "Visit site",
    statusLive: "Live",
    statusDev: "In early development",
  },

  // Nijedna cifra nigdje na stranici (Petar, 2026-09-14: "ne želim da se
  // igdje vidi točna cijena"). Tri paketa točno kako ih je potvrdio.
  pricing: {
    eyebrow: "Packages",
    heading: "Pick what you need. The price comes in writing.",
    packages: [
      {
        name: "The website",
        body: "Design, build and launch. Fast on a phone, hosting set up, analytics so you see what it does.",
      },
      {
        name: "Website + bookings",
        body: "Everything in The website, plus your booking system or calendar connected, so guests book you directly.",
      },
      {
        name: "Care, monthly",
        body: "Hosting, updates and your Google Business profile kept right.",
      },
    ],
    // Bivša sekcija Offer (9 usluga), sažeta u jedan redak
    extra: "Ads and SEO on top, priced separately: Google and Meta ads, local SEO and your Google Business profile, copywriting, logo and identity, GA4 analytics.",
    reassure: "Exact price in writing after the free check. No hidden costs.",
    timeline: "Timeline in writing too, with the quote.",
  },

  // 3,2 ekrana dokaza prije ovoga završavala su u ništa.
  workCta: {
    heading: "Want to know what yours gets wrong?",
    body: "Send me the address. The check is free.",
  },

  about: {
    eyebrow: "About",
    heading: "Who you'd be working with",
    // Studij se preselio na /cv, gdje ga poslodavac traži. Kupac koji kupuje
    // web ne kupuje godinu studija — kupuje čovjeka koji zna posao.
    p1: "I'm Petar, from Dubrovnik. I run the digital side for small businesses — the site, the ads, the search, and the words on all of it.",
    p2: "One point of contact for all of it. You brief me once and I handle the rest; when a job needs a photographer, a copywriter or a specialist, I bring one in and you still deal only with me.",
    p2b: "Before this I spent three seasons in Dubrovnik hospitality — client relations and safety operations for Maistra Hotels — so I know what a full season does to a business, and what a booking is worth in August.",
    p3: "Voluntary military training with the Croatian Ministry of Defence in 2023. That is where the discipline behind every deadline comes from.",
    certsLine: "Google Ads & Analytics certified",
    certsLink: "all 12 certificates on my CV",
  },

  // Prvo besplatno, pa edukacija, pa naplata (Petar, 2026-09-15): prvi korak
  // je provjera, cijena dolazi tek u drugom, napismeno.
  process: {
    eyebrow: "How it works",
    heading: "Free first. You decide the rest.",
    steps: [
      {
        num: "01",
        title: "The free check",
        desc: "Send me your address. You get three findings about your Google listing, your website and your booking path, in writing. Free, and it commits you to nothing.",
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

  book: {
    eyebrow: "Free website check",
    heading: "Send me your website.",
    sub: "Three findings about your site, your Google listing and the path to a booking, in writing. Free, and no pitch attached.",
    cta: "Get the free check",
    whatsappLabel: "Get the free check on WhatsApp",
    stickyLabel: "Free check on WhatsApp",
    callLabel: "Or call",
    emailLabel: "Email",
    // Engleska rečenica, ne prijevod — stranica ostaje engleska,
    // ali lokalnom kupcu skida najveću kočnicu.
    language: "Dubrovnik-based. Croatian or English, whichever suits you.",
    calendarLabel: "Pick a time",
    calendarTitle: "Pick a day · 15 minutes",
    calendarCta: "See available times",
    nextFree: "Next free",
    // Mreža dana i termini ispod nje — vlastiti birač, ne Cal.com okvir
    pickDay: "Prefer a call?",
    timesOn: "Times on",
    loadingTimes: "Loading available times…",
    loadingForm: "Loading the booking form…",
    confirmLabel: "Confirm your call",
    calendarFallback: "Calendar not loading? Open it on",
    askFirst: "Rather ask first?",
    formToggle: "Rather send it by email?",
    name: "Name",
    email: "Email",
    message: "Message",
    messagePlaceholder: "Your website address, and what you want more of: bookings, calls, walk-ins.",
    send: "Send message",
    sending: "Sending…",
    success: "Message sent. I'll get back to you within 24 hours.",
    errorServer: "Something went wrong. Please email me directly.",
    errorNetwork: "Network error. Please email me directly.",
    reply: "I reply within 24 hours.",
    afterSend: "I'll reply within 24 hours with a few questions — no automated email, no newsletter.",
    phone: "Phone (optional)",
    required: "Please fill in this field.",
    invalidEmail: "Please enter a valid email address.",
  },

  footer: {
    tagline: "Websites, ads and SEO for small businesses.",
    based: "Dubrovnik, Croatia",
    copyright: "All rights reserved.",
    backToTop: "Back to top",
  },
} as const;
