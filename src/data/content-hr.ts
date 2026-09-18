import type { Copy } from "./content";
import { certs } from "./site";

/**
 * Hrvatska verzija stranice — ISTA stranica kao engleska, samo na hrvatskom.
 * Tip `Copy` to čuva: ako engleska kopija dobije novi ključ, ovdje puca
 * build dok se ne prevede.
 *
 * NACRT: tekst je napisao Claude (redizajn 2026-09-18; postojeće rečenice
 * preuzete iz prethodne /hr). Bez pretpostavljanja roda čitatelja. Petar
 * ga odobrava ili prepravlja svojim riječima.
 */
export const hr: Copy = {
  lang: "hr",
  locale: "hr-HR",
  home: "/hr",
  whatsappText: "Dobar dan! Želim besplatnu provjeru stranice. Moja stranica: ",
  week: ["N", "P", "U", "S", "Č", "P", "S"],
  weekFull: ["nedjelja", "ponedjeljak", "utorak", "srijeda", "četvrtak", "petak", "subota"],

  nav: {
    links: [
      { href: "/hr#work", label: "Radovi" },
      { href: "/hr#how", label: "Kako radi" },
      { href: "/hr#about", label: "O nama" },
      { href: "/hr#contact", label: "Kontakt" },
    ],
    cta: "Besplatna provjera",
    openMenu: "Otvori izbornik",
    closeMenu: "Zatvori izbornik",
    langCaption: "Jezik",
  },

  hero: {
    badgeTag: "Besplatno",
    badge: "Provjera stranice, napismeno",
    line1: "Sustavi",
    line2: "koji",
    line2Fill: "prodaju.",
    sub: "Vaša stranica, Google profil i put do rezervacije, složeni u jedno. Provjerimo sve troje, napismeno i besplatno.",
    ctaPrimary: "Besplatna provjera",
    ctaSecondary: "Pogledajte radove",
  },

  strip: {
    label: "Google Ads i Analytics certifikati",
    items: [
      "Google Ads certifikat",
      "Google Analytics certifikat",
      "HubSpot certifikati",
      "Google Business profil",
      "Meta oglasi",
      "Next.js",
      "Vercel",
      "Cal.com",
    ],
  },

  check: {
    eyebrow: "Kako radi besplatna provjera",
    heading: ["Provjerimo", "sve troje."],
    sub: "Tri nalaza o vašem profilu, stranici i putu do rezervacije, napismeno.",
    found: {
      title: "Pronađeno.",
      body: "Prvo što vide najčešće je vaš Google profil. Vodi li on na vašu stranicu?",
      search: "stol u blizini",
      business: "Vaš posao",
      chips: ["Nazovi", "Web", "Upute"],
    },
    trusted: {
      title: "Povjerenje.",
      body: "Stranica ima nekoliko sekundi da pokaže da ste pravi izbor.",
      seconds: "3 s",
    },
    booked: {
      title: "Rezervirano.",
      body: "Jedan pokvaren korak do rezervacije i gost rezervira kod drugoga.",
      path: ["Traži", "Web", "Rezerviraj"],
    },
    free: {
      title: "Besplatno.",
      body: "Tri nalaza, napismeno. Bez prodajnog razgovora.",
      cta: "Besplatna provjera",
    },
  },

  work: {
    eyebrow: "Radovi",
    heading: ["Malo projekata", "odjednom."],
    sub: "Da vaš dobije pažnju koju traži — a kad posao traži fotografa ili copywritera, dovedemo nekoga tko to stvarno zna.",
    visit: "Otvori stranicu",
    details: "Detalji",
    statusLive: "Uživo",
    statusDev: "U izradi",
    allBlock: {
      eyebrow: "Svi radovi",
      heading: "Svaki projekt, jedna stranica.",
      count: "projekta",
    },
  },

  workPage: {
    title: "Radovi",
    heading: "Sve napravljeno do sada.",
    open: "Detalji",
    close: "Zatvori",
    prev: "Prethodni projekt",
    next: "Sljedeći projekt",
    preview: "Skrolajte za više stranice",
    live: "uživo",
    building: "u izradi",
    cta: {
      heading: "Želite znati što vaša stranica griješi?",
      body: "Pošaljite nam adresu. Provjera je besplatna.",
    },
  },

  process: {
    eyebrow: "Kako radi",
    heading: ["Prvo besplatno.", "Ostalo odlučujete vi."],
    freeTag: "Besplatno",
    steps: [
      {
        num: "01",
        title: "Besplatna provjera",
        desc: "Pošaljite nam adresu svoje stranice. Dobit ćete tri nalaza o Google profilu, stranici i putu do rezervacije, napismeno. Besplatno i bez ikakve obveze.",
      },
      {
        num: "02",
        title: "Ponuda napismeno",
        desc: "Ako želite da to popravimo: opseg, rok i cijena, dogovoreni napismeno prije početka rada. Bez skrivenih troškova.",
      },
      {
        num: "03",
        title: "Izrada i predaja",
        desc: "Vidite svaki korak. Na kraju sve prelazi u vaše vlasništvo: datoteke, računi i pristup svemu.",
      },
    ],
  },

  packages: {
    eyebrow: "Paketi",
    heading: ["Jedan dio,", "ili cijeli sustav."],
    sub: "Svaki dio radi sam, a zajedno još bolje.",
    // Imena paketa ostaju engleska, kao ime marke (kao i "Get it done by zip.")
    tiers: [
      {
        id: "website",
        name: "Website",
        promise: "Stranica koja prima rezervacije.",
        modules: [
          { icon: "web", label: "Stranica" },
          { icon: "cal", label: "Rezervacije" },
          { icon: "pin", label: "Google profil" },
        ],
        includes: "",
        items: [
          "Dizajn, izrada i objava, brza na mobitelu",
          "Povezan sustav za rezervacije",
          "Povezan Google Business profil",
          "Analitika, da vidite što radi",
        ],
        foot: "Temelj.",
        cta: "Počnite sa stranicom",
        whatsapp: "Dobar dan! Zanima me paket Website. Moja stranica: ",
        highlight: false,
        tag: "",
      },
      {
        id: "system",
        name: "System",
        promise: "Stranica, pretraga, oglasi i AI, složeni u jedno.",
        modules: [
          { icon: "web", label: "Stranica" },
          { icon: "cal", label: "Rezervacije" },
          { icon: "search", label: "SEO" },
          { icon: "ads", label: "Oglasi" },
          { icon: "ai", label: "AI" },
          { icon: "auto", label: "Automatizacija" },
        ],
        includes: "Sve iz paketa Website i Growth, plus:",
        items: [
          "AI asistent na vašoj stranici",
          "Automatski odgovori na upite",
          "Potvrde i podsjetnici za rezervacije",
          "Zahtjevi za recenziju nakon posjeta",
          "AI prijevodi stranice",
          "Svi upiti na jednom mjestu",
          "Mjesečni izvještaj, složen automatski",
          "Mjesečno održavanje: hosting i ažuriranja",
        ],
        foot: "Sustav koji prodaje za vas.",
        cta: "Želim sustav",
        whatsapp: "Dobar dan! Zanima me paket System. Moja stranica: ",
        highlight: true,
        tag: "Cijeli sustav",
      },
      {
        id: "growth",
        name: "Growth",
        promise: "Da vas nađu pravi ljudi.",
        modules: [
          { icon: "search", label: "SEO" },
          { icon: "ads", label: "Google Ads" },
          { icon: "ads", label: "Meta Ads" },
        ],
        includes: "",
        items: [
          "Lokalni SEO i vaš Google Business profil",
          "Google i Meta oglasi, vodimo ih mi",
          "Tekstovi za stranicu i oglase",
          "Izvještaj svaki mjesec",
        ],
        foot: "Radi i sa stranicom koju već imate.",
        cta: "Počnite rasti",
        whatsapp: "Dobar dan! Zanima me paket Growth. Moja stranica: ",
        highlight: false,
        tag: "",
      },
    ],
    note: "Bez skrivenih troškova. Svaki projekt počinje besplatnom provjerom.",
  },

  facts: {
    eyebrow: "Dobro je znati",
    heading: "Bez skrivenih troškova.",
    sub: "Sve ovdje već je istina, i već stoji napismeno.",
    items: [
      { n: "3", label: "nalaza u svakoj besplatnoj provjeri" },
      { n: "24 h", label: "za odgovor, bez automatskih poruka" },
      { n: String(certs.length), label: "Google i HubSpot certifikata" },
      { n: "100 %", label: "vaše na kraju: datoteke, računi, pristup" },
    ],
  },

  about: {
    eyebrow: "O nama",
    heading: ["S kim biste", "radili"],
    p1: "Jedno mjesto za sve. Objasnite nam jednom i dalje idemo mi; kad posao traži fotografa, copywritera ili stručnjaka, dovedemo ga.",
    p2: "Stranica, oglasi, pretraživanje i tekstovi na svemu tome.",
    location: "Zagreb, Hrvatska",
    certs: "Google Ads i Analytics certifikati",
  },

  faq: {
    eyebrow: "Pitanja",
    heading: ["Prije nego", "pošaljete adresu."],
    items: [
      {
        q: "Što pokriva besplatna provjera?",
        a: "Tri nalaza o vašem Google profilu, stranici i putu do rezervacije, napismeno. Besplatno i bez ikakve obveze.",
      },
      { q: "Koliko košta stranica?", a: "Točna cijena napismeno nakon besplatne provjere. Bez skrivenih troškova." },
      { q: "Koliko traje izrada?", a: "I rok napismeno, uz ponudu." },
      { q: "Čija je stranica?", a: "Vaša. Na kraju sve prelazi u vaše vlasništvo: datoteke, računi i pristup svemu." },
      { q: "Hrvatski ili engleski?", a: "Hrvatski ili engleski, kako vam odgovara." },
      {
        q: "Radite li oglase i SEO?",
        a: "Da. Google i Meta oglasi, lokalni SEO, Google Business profil i tekstovi čine paket Growth i dio su paketa System. Logo i vizualni identitet također, na upit.",
      },
    ],
  },

  book: {
    eyebrow: "Besplatna provjera stranice",
    heading: ["Pošaljite nam", "svoju stranicu."],
    sub: "Tri nalaza o vašoj stranici, Google profilu i putu do rezervacije, napismeno. Besplatno i bez prodajnog razgovora.",
    whatsappLabel: "Besplatna provjera na WhatsAppu",
    stickyLabel: "Provjera na WhatsAppu",
    callLabel: "Ili nazovite",
    language: "Hrvatski ili engleski, kako vam odgovara.",
    reply: "Odgovaramo u roku od 24 sata.",
    calendarLabel: "Odaberite termin",
    calendarTitle: "Odaberite dan · 15 minuta",
    calendarCta: "Prikaži slobodne termine",
    pickDay: "Radije poziv?",
    timesOn: "Termini za",
    loadingTimes: "Učitavam slobodne termine…",
    loadingForm: "Učitavam obrazac…",
    confirmLabel: "Potvrdite poziv",
    calendarFallback: "Kalendar se ne učitava? Otvorite ga na",
    formToggle: "Radije e-mailom?",
    name: "Ime",
    email: "E-mail",
    message: "Poruka",
    messagePlaceholder: "Adresa vaše stranice i čega želite više: rezervacija, poziva, gostiju.",
    send: "Pošalji poruku",
    sending: "Šaljem…",
    success: "Poruka je poslana. Javljamo se u roku od 24 sata.",
    errorServer: "Nešto je pošlo po zlu. Pišite nam izravno na e-mail.",
    afterSend: "Javljamo se u roku od 24 sata s nekoliko pitanja — bez automatskih poruka i bez newslettera.",
    required: "Molimo ispunite ovo polje.",
    invalidEmail: "Molimo upišite ispravnu e-mail adresu.",
  },

  footer: {
    // Slogan = domena (donebyzip.com), isti i na /hr (Petar, 2026-09-18)
    heading: ["Get it done", "by zip."],
    body: "Pošaljite nam adresu. Provjera je besplatna.",
    cta: "Besplatna provjera",
    site: "Stranica",
    more: "Više",
    allWork: "Svi radovi",
    questions: "Pitanja",
    tagline: "Marketing i rast za male poslove.",
    copyright: "Sva prava pridržana.",
    langHref: "/",
    langLabel: "English",
  },
};

/** Meta oznake hrvatske stranice — bez "agencije", kao i engleski naslov. */
export const hrMeta = {
  title: "Besplatna provjera stranice | zip",
  description:
    "zip / marketing genius. Pomažemo malim poslovima rasti, počevši od besplatne pisane provjere vaše stranice, Google profila i puta do rezervacije.",
};
