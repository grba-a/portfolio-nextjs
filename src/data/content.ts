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
      { href: "#offer", label: "What I do" },
      { href: "#about", label: "About" },
      { href: "#contact", label: "Contact" },
    ],
    cta: "Book a call",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },

  hero: {
    eyebrow: "Petar Grbić — Dubrovnik, Croatia",
    // Riječi maske: kratke i teške, da se snimka iza njih vidi
    line1: "Websites",
    line2: "that sell.",
    sub: "I design, build and launch the whole thing myself — for small businesses that need to be found, trusted and booked.",
    ctaPrimary: "Book a free call",
    ctaSecondary: "See the work",
  },

  work: {
    heading: "Work",
    sub: "Every project below is fully my own work — designed, built, and launched from scratch.",
    // Kupac izbroji: četiri projekta, dva nose njegovo prezime, i tiho
    // zaključi "obiteljska usluga". Bolje to reći prvi, nego pustiti sumnju.
    family:
      "Two of these are family businesses — which means I had to live with the results at Sunday lunch, and that is a harder review than any client gives you.",
    visit: "Visit site",
    statusLive: "Live",
    statusDev: "In early development",
  },

  offer: {
    heading: "What I do",
    sub: "One person, start to finish. No agency layers, no handoffs, no waiting on someone else's calendar.",
    items: [
      {
        num: "01",
        title: "The website",
        body: "Design, build and launch. Fast on a phone, easy to update, set up so you can see what it does.",
        list: [
          "Web design & development",
          "Mobile-first speed & performance",
          "Hosting setup & maintenance",
        ],
      },
      {
        num: "02",
        title: "The traffic",
        body: "Getting the right people to it — paid where it pays, organic where it lasts.",
        list: [
          "Google Ads",
          "Meta Ads (Facebook & Instagram)",
          "Local SEO & Google Business",
        ],
      },
      {
        num: "03",
        title: "Everything around it",
        body: "The parts most people bolt on later, done at the same time as the rest.",
        list: [
          "Copywriting (web & ads)",
          "Logo & visual identity",
          "Analytics setup (GA4)",
        ],
      },
    ],
    // Devet vjerodostojnih usluga bolje prolazi od osamnaest nevjerojatnih.
    // Ova rečenica hvata ostalo bez da nabraja.
    footnote:
      "If you need something that isn't here, ask — I'll tell you if it's mine to do, or point you to someone else.",
  },

  // Cijena je bila najveća prešućena kočnica: tišina se ne čita kao
  // neutralnost nego kao "skupo", pa kupac ne zove da provjeri.
  pricing: {
    eyebrow: "What it costs",
    heading: "From €800.",
    body: "That covers design, build, launch, hosting setup, mobile speed and analytics — all done by me, not passed around. Bigger builds, with ads and SEO running, cost more.",
    reassure: "You get the exact number in writing before any work starts. No hidden costs.",
    timeline: "Timeline depends on scope — you get that in writing too, with the quote.",
  },

  // 3,2 ekrana dokaza prije ovoga završavala su u ništa.
  workCta: {
    heading: "Want yours to work like these?",
    body: "Fifteen minutes, no pitch.",
  },

  about: {
    eyebrow: "About",
    heading: "Who you'd be working with",
    p1: "I'm Petar — 23, from Dubrovnik. Third year of Digital Marketing at Algebra University College, Zagreb.",
    p2: "I work as a full-service digital freelancer: one point of contact for everything digital — website, ads, SEO, content, and branding. You brief me once, I handle the rest.",
    p2b: "Before this I spent three seasons in Dubrovnik hospitality — client relations and safety operations for Maistra Hotels — so I know what a full season does to a business, and what a booking is worth in August.",
    p3: "Voluntary military training with the Croatian Ministry of Defence in 2023. That is where the discipline behind every deadline comes from.",
    certsLabel: "12 certifications from Google & HubSpot",
    cv: "See my CV",
  },

  process: {
    eyebrow: "How it works",
    heading: "Four steps, no surprises.",
    steps: [
      {
        num: "01",
        title: "Discovery",
        desc: "We talk about your project, goals, and budget. No forms, no pressure — just a straightforward conversation to make sure we're the right fit.",
      },
      {
        num: "02",
        title: "Proposal",
        desc: "You receive a clear proposal — scope, timeline, and price. Everything agreed in writing before any work begins. No hidden costs.",
      },
      {
        num: "03",
        title: "Build & Review",
        desc: "I execute and keep you in the loop at every stage. You review, give feedback, and we refine until it's exactly right.",
      },
      {
        num: "04",
        title: "Launch",
        desc: "We go live. You get full ownership — files, accounts, access to everything. I stay available after launch for questions and adjustments.",
      },
    ],
  },

  book: {
    eyebrow: "Ready to start?",
    heading: "Let's talk it through.",
    sub: "Fifteen minutes, no pitch. If I'm not the right fit for what you need, I'll tell you.",
    cta: "Book a free call",
    whatsappLabel: "Message on WhatsApp",
    callLabel: "Or call",
    emailLabel: "Email",
    // Engleska rečenica, ne prijevod — stranica ostaje engleska,
    // ali lokalnom kupcu skida najveću kočnicu.
    language: "Dubrovnik-based. Croatian or English, whichever suits you.",
    calendarLabel: "Pick a time",
    calendarTitle: "Free 15-minute call",
    calendarNote: "Pick a slot that suits you — the calendar shows what's actually free.",
    calendarCta: "See available times",
    nextFree: "Next free",
    otherTimes: "Other times",
    calendarFallback: "Prefer a full page? Open it on",
    formToggle: "Rather write a message?",
    name: "Name",
    email: "Email",
    message: "Message",
    messagePlaceholder: "Tell me about your business and what's not working on your website right now.",
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
