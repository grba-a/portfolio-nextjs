/**
 * Podstranice usluga i djelatnosti (runda 2026-10-14, Petar: Da u artifactu).
 *
 * - Usluge (izrada, redizajn): tekst iz kolegina previewa, prenesen bez prepravljanja.
 * - Djelatnosti (apartmani, restorani, izleti brodom, vinarije): tekst napisao
 *   Claude 2026-10-14 — ČEKA Petrov pregled prije objave. Engleske ciljaju
 *   inozemstvo, hrvatske domaće tržište (Petar, 2026-10-14).
 *
 * Bez izmišljenih tvrdnji: nema brojki o rezultatima, cijena ni rokova.
 * Primjer projekta samo gdje postoji pravi (Apartments Grbić, uz oznaku
 * obiteljskog posla). AI stavke su one koje je Petar potvrdio u paketu System.
 */

export type Lang = "en" | "hr";

export type Section =
  | { kind: "list"; heading: string; items: string[] }
  | { kind: "text"; heading: string; body: string }
  | { kind: "example"; heading: string; name: string; body: string; href: string; label: string }
  | { kind: "calc" }
  | { kind: "steps" };

export type Landing = {
  lang: Lang;
  slug: string;
  /** Ista stranica na drugom jeziku (slug), za hreflang i prekidač jezika */
  alt: string | null;
  group: "service" | "industry";
  metaTitle: string;
  metaDesc: string;
  eyebrow: string;
  h1: string;
  lede: string;
  whatsapp: string;
  sections: Section[];
  faq: { q: string; a: string }[];
  cross: { text: string; label: string; slug: string };
};

const costEn = {
  q: "How much does a website cost?",
  a: "It depends on four things: how many pages, whether you need bookings or an enquiry form, who writes the copy, and how many languages. You get the exact amount in writing after the free check, before any work starts.",
};
const costHr = {
  q: "Koliko košta izrada web stranice?",
  a: "Ovisi o četiri stvari: broju stranica, trebate li rezervacije ili obrazac za upite, tko piše tekstove i na koliko jezika. Točan iznos dobijete napismeno nakon besplatne provjere, prije bilo kakvog posla.",
};
const ownEn = { q: "Who owns the site?", a: "You do. At launch you get full ownership: files, accounts, access to everything." };
const ownHr = { q: "Čija je stranica?", a: "Vaša. Na kraju sve prelazi u vaše vlasništvo: datoteke, računi i pristup svemu." };
const photoEn = {
  q: "Do you take the photos?",
  a: "When a job calls for a photographer or a copywriter, we bring in someone who is genuinely good at it.",
};
const photoHr = {
  q: "Radite li fotografije?",
  a: "Kad posao traži fotografa ili copywritera, dovedemo nekoga tko to stvarno zna.",
};

const grbicEn = {
  kind: "example" as const,
  heading: "Example",
  name: "Apartments Grbić",
  body: "Our own family's accommodation business on the Adriatic coast. The site is built around one action: check availability, then book.",
  href: "/work#apartments-grbic",
  label: "See the project",
};
const grbicHr = {
  kind: "example" as const,
  heading: "Primjer",
  name: "Apartments Grbić",
  body: "Naš obiteljski smještaj na Jadranu. Stranica je složena oko jedne radnje: provjeri slobodne termine, pa rezerviraj.",
  href: "/work#apartments-grbic",
  label: "Pogledajte projekt",
};

export const pages: Landing[] = [
  // ───────────── USLUGE (kolegin preview) ─────────────
  {
    lang: "en",
    slug: "small-business-websites",
    alt: "izrada-web-stranica",
    group: "service",
    metaTitle: "Small business websites | zip",
    metaDesc: "Websites for small businesses: fast on a phone, linked to your Google profile and built to bring enquiries. Start with a free written check.",
    eyebrow: "Small business websites",
    h1: "Websites for small businesses",
    lede: "For small businesses that don’t have a website yet, or only have Facebook and a Google profile. We build a site that loads fast on a phone, connects to your Google profile and leads visitors to get in touch.",
    whatsapp: "Hello! I'd like a new website. My business: ",
    sections: [
      {
        kind: "list",
        heading: "Who it’s for",
        items: [
          "You don’t have a website, and people search for your service and town on Google.",
          "Customers only find you through Facebook or Instagram.",
          "You have a Google profile, but it doesn’t lead anywhere.",
        ],
      },
      {
        kind: "list",
        heading: "What you get",
        items: [
          "Design and build, fast on a phone.",
          "An enquiry form or a booking system, depending on how you work.",
          "Your Google Business profile linked.",
          "Analytics, so you see what the site brings in.",
          "Everything is yours: files, accounts and access.",
        ],
      },
      { kind: "steps" },
      grbicEn,
    ],
    faq: [
      costEn,
      { q: "How long does it take?", a: "You get the timeline in writing, with the proposal." },
      { q: "Do I have to write the copy?", a: "No. We can write it for you, in Croatian or English." },
    ],
    cross: { text: "Have a site that doesn’t work?", label: "See website redesign", slug: "website-redesign" },
  },
  {
    lang: "en",
    slug: "website-redesign",
    alt: "redizajn-web-stranice",
    group: "service",
    metaTitle: "Website redesign for small businesses | zip",
    metaDesc: "Website redesign for small businesses. A free check shows what’s holding your site back, and we tell you in writing whether to fix it or rebuild.",
    eyebrow: "Website redesign",
    h1: "Website redesign",
    lede: "Have a website that doesn’t bring enquiries? We check for free what’s holding it back, then tell you in writing whether it’s worth fixing or better rebuilt.",
    whatsapp: "Hello! I'd like the free check for my current website: ",
    sections: [
      {
        kind: "list",
        heading: "Signs your site needs a redesign",
        items: [
          "It loads slowly on a phone.",
          "Visitors can’t tell where to click to contact you.",
          "It looks dated, so you look closed.",
          "It doesn’t show up on Google when people search for your service and town.",
        ],
      },
      {
        kind: "list",
        heading: "What we check",
        items: [
          "Google profile: does it send people to your site.",
          "Your site: does it show in a few seconds that you’re the right choice.",
          "The path to an enquiry: can a visitor get in touch or book without effort.",
        ],
      },
      {
        kind: "text",
        heading: "Fix it or rebuild?",
        body: "If the foundation is sound, we fix what’s holding it back. If it isn’t, a new site is often cheaper than patching the old one. Either way, you decide, based on written findings.",
      },
      { kind: "steps" },
    ],
    faq: [
      costEn,
      {
        q: "Will I lose my Google rankings?",
        a: "We take care of that. Old addresses are redirected to the new ones, so neither Google nor visitors land on an empty page.",
      },
      { q: "Do I keep my domain?", a: "Yes. The domain is yours, and at launch you get full ownership: files, accounts, access to everything." },
    ],
    cross: { text: "No website yet?", label: "See small business websites", slug: "small-business-websites" },
  },
  {
    lang: "hr",
    slug: "izrada-web-stranica",
    alt: "small-business-websites",
    group: "service",
    metaTitle: "Izrada web stranica za male tvrtke | zip",
    metaDesc: "Izrada web stranica za obrte i male tvrtke: brza na mobitelu, povezana s Google profilom i vodi do upita. Počnite s besplatnom pisanom provjerom.",
    eyebrow: "Izrada web stranica",
    h1: "Izrada web stranica za male tvrtke",
    lede: "Za obrte i male tvrtke koje još nemaju stranicu, ili imaju samo Facebook i Google profil. Napravimo stranicu koja se brzo otvara na mobitelu, povezana je s vašim Google profilom i vodi posjetitelja do upita.",
    whatsapp: "Dobar dan! Trebam novu web stranicu. Moj posao: ",
    sections: [
      {
        kind: "list",
        heading: "Za koga je",
        items: [
          "Nemate stranicu, a ljudi vas traže na Googleu po usluzi i mjestu.",
          "Klijenti vas nalaze samo preko Facebooka ili Instagrama.",
          "Imate Google profil, ali on ne vodi nikamo.",
        ],
      },
      {
        kind: "list",
        heading: "Što dobivate",
        items: [
          "Dizajn i izrada, brza na mobitelu.",
          "Obrazac za upite ili sustav za rezervacije, ovisno o tome kako radite.",
          "Povezan Google Business profil.",
          "Analitika, da vidite što stranica donosi.",
          "Sve u vašem vlasništvu: datoteke, računi i pristup svemu.",
        ],
      },
      { kind: "steps" },
      grbicHr,
    ],
    faq: [
      costHr,
      { q: "Koliko traje izrada?", a: "Rok dobijete napismeno, zajedno s ponudom." },
      { q: "Moram li sam pisati tekstove?", a: "Ne morate. Tekstove možemo napisati mi, na hrvatskom ili engleskom." },
    ],
    cross: { text: "Imate stranicu koja ne radi?", label: "Pogledajte redizajn web stranice", slug: "redizajn-web-stranice" },
  },
  {
    lang: "hr",
    slug: "redizajn-web-stranice",
    alt: "website-redesign",
    group: "service",
    metaTitle: "Redizajn web stranice koja ne donosi upite | zip",
    metaDesc: "Redizajn web stranice za male tvrtke. Besplatna provjera pokaže što stranicu koči, a napismeno vam kažemo isplati li se popraviti ili napraviti novu.",
    eyebrow: "Redizajn web stranice",
    h1: "Redizajn web stranice",
    lede: "Imate stranicu, ali ne donosi upite? Prvo besplatno provjerimo što je koči, pa vam napismeno kažemo isplati li se popraviti postojeću ili napraviti novu.",
    whatsapp: "Dobar dan! Želim besplatnu provjeru postojeće stranice: ",
    sections: [
      {
        kind: "list",
        heading: "Znakovi da stranica treba redizajn",
        items: [
          "Sporo se otvara na mobitelu.",
          "Posjetitelj ne zna gdje kliknuti da vas kontaktira.",
          "Izgleda zastarjelo, pa djeluje kao da ne radite.",
          "Ne pojavljuje se na Googleu kad vas traže po usluzi i mjestu.",
        ],
      },
      {
        kind: "list",
        heading: "Što provjeravamo",
        items: [
          "Google profil: vodi li ljude na vašu stranicu.",
          "Stranicu: pokazuje li u nekoliko sekundi da ste pravi izbor.",
          "Put do upita: može li posjetitelj bez muke poslati upit ili rezervirati.",
        ],
      },
      {
        kind: "text",
        heading: "Popraviti ili napraviti novu?",
        body: "Ako je temelj dobar, popravimo ono što koči. Ako nije, nova stranica često je jeftinija od krpanja stare. U oba slučaja odluku donosite vi, na temelju pisanih nalaza.",
      },
      { kind: "steps" },
    ],
    faq: [
      costHr,
      {
        q: "Hoću li izgubiti pozicije na Googleu?",
        a: "Pazimo na to. Stare adrese preusmjeravamo na nove, pa ni Google ni posjetitelji ne završe na praznoj stranici.",
      },
      { q: "Ostaje li mi domena?", a: "Da. Domena je vaša, a na kraju sve prelazi u vaše vlasništvo: datoteke, računi i pristup svemu." },
    ],
    cross: { text: "Još nemate stranicu?", label: "Pogledajte izradu web stranica", slug: "izrada-web-stranica" },
  },

  // ───────────── DJELATNOSTI (Claude, čeka Petrov pregled) ─────────────
  {
    lang: "en",
    slug: "websites-for-holiday-rentals",
    alt: "web-stranice-za-apartmane",
    group: "industry",
    metaTitle: "Websites for holiday rentals and apartments | zip",
    metaDesc: "Websites for apartments, villas and holiday homes: guests check availability and book directly, with your Google profile linked. Start with a free written check.",
    eyebrow: "Holiday rentals",
    h1: "Websites for holiday rentals",
    lede: "For apartments, villas and holiday homes. A fast site where guests check availability and book directly, linked to your Google profile.",
    whatsapp: "Hello! I'd like the free check for my holiday rental. My site or listing: ",
    sections: [
      {
        kind: "list",
        heading: "Who it’s for",
        items: [
          "Most of your guests come through Booking.com or Airbnb.",
          "Guests find you on Google, then land on a portal listing.",
          "Your current site is slow or hard to book on a phone.",
        ],
      },
      { kind: "calc" },
      {
        kind: "list",
        heading: "What you get",
        items: [
          "A site built around one action: check availability, then book.",
          "Fast on a phone, in the languages your guests speak.",
          "Your Google Business profile linked to the site.",
          "Analytics, so you see where bookings come from.",
          "Everything is yours: files, accounts and access.",
        ],
      },
      grbicEn,
      { kind: "steps" },
    ],
    faq: [
      {
        q: "Do I have to leave Booking.com or Airbnb?",
        a: "No. Direct bookings come on top of the portals. You decide the balance.",
      },
      {
        q: "Can guests book directly on the site?",
        a: "Yes: a booking system or an enquiry form, depending on how you work. The free check shows which one fits.",
      },
      costEn,
      ownEn,
    ],
    cross: { text: "Have a site that doesn’t bring bookings?", label: "See website redesign", slug: "website-redesign" },
  },
  {
    lang: "en",
    slug: "websites-for-restaurants",
    alt: "web-stranice-za-restorane",
    group: "industry",
    metaTitle: "Websites for restaurants, cafés and bars | zip",
    metaDesc: "Websites for restaurants, cafés and bars: the menu, opening hours and the way to you, one tap from Google. Start with a free written check.",
    eyebrow: "Restaurants",
    h1: "Websites for restaurants",
    lede: "For restaurants, taverns, cafés and bars. A site that shows the menu, the opening hours and the way to you, and turns a search into a booked table or a call.",
    whatsapp: "Hello! I'd like the free check for my restaurant. My site or Google listing: ",
    sections: [
      {
        kind: "list",
        heading: "Who it’s for",
        items: [
          "People find you on Google Maps, but your listing has no website or an old menu.",
          "Your menu is a PDF or a photo that is hard to read on a phone.",
          "Tables are booked only by phone, when you’re busiest.",
        ],
      },
      {
        kind: "list",
        heading: "What you get",
        items: [
          "The menu as real text, readable on a phone.",
          "Opening hours, location and phone, one tap away.",
          "Table bookings or an enquiry form, depending on how you work.",
          "Your Google Business profile linked to the site.",
          "Analytics, so you see what the site brings in.",
        ],
      },
      { kind: "steps" },
    ],
    faq: [
      {
        q: "Do you set up the Google profile too?",
        a: "Yes. Your Google Business profile is linked in every website, and local SEO is part of the Growth package.",
      },
      photoEn,
      costEn,
      ownEn,
    ],
    cross: { text: "Have a site that doesn’t bring guests?", label: "See website redesign", slug: "website-redesign" },
  },
  {
    lang: "en",
    slug: "websites-for-boat-tours",
    alt: "web-stranice-za-izlete-brodom",
    group: "industry",
    metaTitle: "Websites for boat tours and excursions | zip",
    metaDesc: "Websites for boat tours, excursions and charters: every trip on its own page, bookings or enquiries by date, WhatsApp one tap away. Start with a free written check.",
    eyebrow: "Boat tours",
    h1: "Websites for boat tours and excursions",
    lede: "For boat tours, excursions and charters. A site that shows the trips, the departures and what’s included, and gets a guest from search to a booked seat or a message.",
    whatsapp: "Hello! I'd like the free check for my boat tours. My site or listing: ",
    sections: [
      {
        kind: "list",
        heading: "Who it’s for",
        items: [
          "Most of your bookings come through resellers, a stand on the waterfront or a portal.",
          "Guests ask you the same questions on WhatsApp every day.",
          "Your trips don’t show up when people search for tours in your town.",
        ],
      },
      {
        kind: "list",
        heading: "What you get",
        items: [
          "A page for each trip: route, duration, what’s included, meeting point.",
          "Bookings or enquiries by date, depending on how you work.",
          "WhatsApp one tap away.",
          "Your Google Business profile linked to the site.",
          "In the languages your guests speak.",
        ],
      },
      { kind: "steps" },
    ],
    faq: [
      {
        q: "Can the site answer the questions guests keep asking?",
        a: "Yes. The System package includes an AI assistant on your site and automatic replies to enquiries.",
      },
      photoEn,
      costEn,
      ownEn,
    ],
    cross: { text: "Have a site that doesn’t bring bookings?", label: "See website redesign", slug: "website-redesign" },
  },
  {
    lang: "en",
    slug: "websites-for-wineries",
    alt: "web-stranice-za-vinarije",
    group: "industry",
    metaTitle: "Websites for wineries and wine estates | zip",
    metaDesc: "Websites for wineries: your story, your wines and tasting bookings, with your Google profile linked. Start with a free written check.",
    eyebrow: "Wineries",
    h1: "Websites for wineries",
    lede: "For wineries and wine estates. A site that tells your story, shows your wines and turns a visit into a booked tasting or an order enquiry.",
    whatsapp: "Hello! I'd like the free check for my winery. My site or Google listing: ",
    sections: [
      {
        kind: "list",
        heading: "Who it’s for",
        items: [
          "Visitors find you on Google Maps but can’t book a tasting online.",
          "Your wines are on shelves and wine lists, but your own site says little about them.",
          "Tour groups and agencies can’t tell who to contact.",
        ],
      },
      {
        kind: "list",
        heading: "What you get",
        items: [
          "A page for each wine.",
          "Tasting and visit bookings, or an enquiry form.",
          "Directions and opening hours, one tap away.",
          "Your Google Business profile linked to the site.",
          "In the languages your visitors speak.",
        ],
      },
      { kind: "steps" },
    ],
    faq: [
      photoEn,
      { q: "Croatian or English?", a: "Croatian or English, whichever suits you. The site itself can be in the languages your visitors speak." },
      costEn,
      ownEn,
    ],
    cross: { text: "Have a site that doesn’t bring visitors?", label: "See website redesign", slug: "website-redesign" },
  },

  {
    lang: "hr",
    slug: "web-stranice-za-apartmane",
    alt: "websites-for-holiday-rentals",
    group: "industry",
    metaTitle: "Izrada web stranica za apartmane i vile | zip",
    metaDesc: "Web stranice za apartmane, vile i kuće za odmor: gost provjeri slobodne termine i rezervira izravno, uz povezan Google profil. Počnite s besplatnom provjerom.",
    eyebrow: "Apartmani i vile",
    h1: "Web stranice za apartmane",
    lede: "Za apartmane, vile i kuće za odmor. Brza stranica na kojoj gost provjeri slobodne termine i rezervira izravno, povezana s vašim Google profilom.",
    whatsapp: "Dobar dan! Želim besplatnu provjeru za svoj smještaj. Moja stranica ili oglas: ",
    sections: [
      {
        kind: "list",
        heading: "Za koga je",
        items: [
          "Većina gostiju dolazi preko Bookinga ili Airbnba.",
          "Gosti vas nađu na Googleu, pa završe na oglasu na portalu.",
          "Postojeća stranica je spora ili se na mobitelu teško rezervira.",
        ],
      },
      { kind: "calc" },
      {
        kind: "list",
        heading: "Što dobivate",
        items: [
          "Stranicu složenu oko jedne radnje: provjeri slobodne termine, pa rezerviraj.",
          "Brzu na mobitelu, na jezicima vaših gostiju.",
          "Povezan Google Business profil.",
          "Analitiku, da vidite odakle dolaze rezervacije.",
          "Sve u vašem vlasništvu: datoteke, računi i pristup svemu.",
        ],
      },
      grbicHr,
      { kind: "steps" },
    ],
    faq: [
      { q: "Moram li odustati od Bookinga ili Airbnba?", a: "Ne. Izravne rezervacije dolaze uz portale. Omjer odlučujete vi." },
      {
        q: "Mogu li gosti rezervirati izravno na stranici?",
        a: "Da: sustav za rezervacije ili obrazac za upit, ovisno o tome kako radite. Besplatna provjera pokaže što vam odgovara.",
      },
      costHr,
      ownHr,
    ],
    cross: { text: "Imate stranicu koja ne donosi rezervacije?", label: "Pogledajte redizajn web stranice", slug: "redizajn-web-stranice" },
  },
  {
    lang: "hr",
    slug: "web-stranice-za-restorane",
    alt: "websites-for-restaurants",
    group: "industry",
    metaTitle: "Izrada web stranica za restorane, konobe i kafiće | zip",
    metaDesc: "Web stranice za restorane, konobe i kafiće: jelovnik, radno vrijeme i put do vas, jedan dodir od Googlea. Počnite s besplatnom pisanom provjerom.",
    eyebrow: "Restorani i konobe",
    h1: "Web stranice za restorane i konobe",
    lede: "Za restorane, konobe, kafiće i barove. Stranica koja pokaže jelovnik, radno vrijeme i put do vas, i od pretrage napravi rezervirani stol ili poziv.",
    whatsapp: "Dobar dan! Želim besplatnu provjeru za svoj restoran. Moja stranica ili Google profil: ",
    sections: [
      {
        kind: "list",
        heading: "Za koga je",
        items: [
          "Ljudi vas nađu na Google kartama, a profil nema stranicu ili ima stari jelovnik.",
          "Jelovnik je PDF ili fotografija koja se na mobitelu teško čita.",
          "Stolovi se rezerviraju samo telefonom, baš kad je najveća gužva.",
        ],
      },
      {
        kind: "list",
        heading: "Što dobivate",
        items: [
          "Jelovnik kao pravi tekst, čitljiv na mobitelu.",
          "Radno vrijeme, lokacija i telefon, jedan dodir daleko.",
          "Rezervacija stola ili obrazac za upit, ovisno o tome kako radite.",
          "Povezan Google Business profil.",
          "Analitiku, da vidite što stranica donosi.",
        ],
      },
      { kind: "steps" },
    ],
    faq: [
      {
        q: "Sredite li i Google profil?",
        a: "Da. Google Business profil povežemo uz svaku stranicu, a lokalni SEO je dio paketa Growth.",
      },
      photoHr,
      costHr,
      ownHr,
    ],
    cross: { text: "Imate stranicu koja ne dovodi goste?", label: "Pogledajte redizajn web stranice", slug: "redizajn-web-stranice" },
  },
  {
    lang: "hr",
    slug: "web-stranice-za-izlete-brodom",
    alt: "websites-for-boat-tours",
    group: "industry",
    metaTitle: "Izrada web stranica za izlete brodom i čartere | zip",
    metaDesc: "Web stranice za izlete brodom, ture i čartere: svaki izlet na svojoj stranici, rezervacija ili upit po datumu, WhatsApp na dodir. Počnite s besplatnom provjerom.",
    eyebrow: "Izleti brodom",
    h1: "Web stranice za izlete brodom",
    lede: "Za izlete brodom, ture i čartere. Stranica koja pokaže izlete, polaske i što je uključeno, i dovede gosta od pretrage do rezerviranog mjesta ili poruke.",
    whatsapp: "Dobar dan! Želim besplatnu provjeru za svoje izlete. Moja stranica ili oglas: ",
    sections: [
      {
        kind: "list",
        heading: "Za koga je",
        items: [
          "Većina rezervacija dolazi preko preprodavača, štanda na rivi ili portala.",
          "Gosti vas svaki dan na WhatsAppu pitaju ista pitanja.",
          "Vaši izleti se ne pojavljuju kad ljudi traže ture u vašem mjestu.",
        ],
      },
      {
        kind: "list",
        heading: "Što dobivate",
        items: [
          "Stranicu za svaki izlet: ruta, trajanje, što je uključeno, mjesto polaska.",
          "Rezervaciju ili upit po datumu, ovisno o tome kako radite.",
          "WhatsApp na jedan dodir.",
          "Povezan Google Business profil.",
          "Na jezicima vaših gostiju.",
        ],
      },
      { kind: "steps" },
    ],
    faq: [
      {
        q: "Može li stranica odgovarati na pitanja koja gosti stalno postavljaju?",
        a: "Da. Paket System uključuje AI asistenta na vašoj stranici i automatske odgovore na upite.",
      },
      photoHr,
      costHr,
      ownHr,
    ],
    cross: { text: "Imate stranicu koja ne donosi rezervacije?", label: "Pogledajte redizajn web stranice", slug: "redizajn-web-stranice" },
  },
  {
    lang: "hr",
    slug: "web-stranice-za-vinarije",
    alt: "websites-for-wineries",
    group: "industry",
    metaTitle: "Izrada web stranica za vinarije i vinske podrume | zip",
    metaDesc: "Web stranice za vinarije: vaša priča, vaša vina i rezervacija degustacije, uz povezan Google profil. Počnite s besplatnom pisanom provjerom.",
    eyebrow: "Vinarije",
    h1: "Web stranice za vinarije",
    lede: "Za vinarije i vinske podrume. Stranica koja ispriča vašu priču, pokaže vaša vina i od posjeta napravi rezerviranu degustaciju ili upit za narudžbu.",
    whatsapp: "Dobar dan! Želim besplatnu provjeru za svoju vinariju. Moja stranica ili Google profil: ",
    sections: [
      {
        kind: "list",
        heading: "Za koga je",
        items: [
          "Posjetitelji vas nađu na Google kartama, ali degustaciju ne mogu rezervirati online.",
          "Vaša vina su na policama i vinskim kartama, a vaša stranica o njima govori malo.",
          "Grupe i agencije ne znaju koga kontaktirati.",
        ],
      },
      {
        kind: "list",
        heading: "Što dobivate",
        items: [
          "Stranicu za svako vino.",
          "Rezervaciju degustacija i posjeta, ili obrazac za upit.",
          "Upute do vas i radno vrijeme, jedan dodir daleko.",
          "Povezan Google Business profil.",
          "Na jezicima vaših posjetitelja.",
        ],
      },
      { kind: "steps" },
    ],
    faq: [
      photoHr,
      { q: "Hrvatski ili engleski?", a: "Hrvatski ili engleski, kako vam odgovara. Sama stranica može biti na jezicima vaših posjetitelja." },
      costHr,
      ownHr,
    ],
    cross: { text: "Imate stranicu koja ne dovodi posjetitelje?", label: "Pogledajte redizajn web stranice", slug: "redizajn-web-stranice" },
  },
];

export const pagesIn = (lang: Lang) => pages.filter((p) => p.lang === lang);
export const findPage = (lang: Lang, slug: string) => pages.find((p) => p.lang === lang && p.slug === slug);
export const pagePath = (lang: Lang, slug: string) => (lang === "hr" ? `/hr/${slug}` : `/${slug}`);
