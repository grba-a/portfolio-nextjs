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
          "E-commerce & online stores",
          "Performance & page speed",
          "Mobile-first optimization",
          "Analytics setup (GA4, Tag Manager)",
          "Maintenance & hosting setup",
        ],
      },
      {
        num: "02",
        title: "The traffic",
        body: "Getting the right people to it — paid where it pays, organic where it lasts.",
        list: [
          "Google Ads (Search, Display, Video, Shopping)",
          "Meta Ads (Facebook & Instagram)",
          "TikTok & YouTube Ads",
          "Retargeting campaigns",
          "On-page & technical SEO",
          "Local SEO & Google Business",
        ],
      },
      {
        num: "03",
        title: "Everything around it",
        body: "The parts most people bolt on later, done at the same time as the rest.",
        list: [
          "Logo & visual identity",
          "Brand guidelines",
          "Copywriting (web, ads, email)",
          "Content strategy & blog",
          "Email marketing & automation",
          "Funnel design & marketing audit",
        ],
      },
    ],
  },

  about: {
    eyebrow: "About",
    heading: "Who you'd be working with",
    p1: "I'm Petar — 23, from Dubrovnik. Second year of Digital Marketing at Sveučilište Algebra Bernays, Zagreb.",
    p2: "I work as a full-service digital freelancer: one point of contact for everything digital — website, ads, SEO, content, and branding. You brief me once, I handle the rest.",
    p3: "Military-trained discipline applied to every deadline.",
    certsLabel: "12 certifications from Google & HubSpot",
    cv: "Download CV",
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
    emailLabel: "Email me directly",
    formHeading: "Or send a message",
    name: "Name",
    email: "Email",
    message: "Message",
    messagePlaceholder: "What are you building, and what's in the way?",
    send: "Send message",
    sending: "Sending…",
    success: "Message sent. I'll get back to you within 24 hours.",
    errorServer: "Something went wrong. Please email me directly.",
    errorNetwork: "Network error. Please email me directly.",
    reply: "I reply within 24 hours.",
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
