import type { Copy } from "./content";

/**
 * Hrvatska verzija stranice — ISTA stranica kao engleska, samo na hrvatskom
 * (Petar, 2026-09-15). Tip `Copy` to čuva: ako engleska kopija dobije novi
 * ključ, ovdje puca build dok se ne prevede.
 *
 * NACRT: tekst je napisao Claude prema pravilima hrvatske gramatike iz
 * vaulta (bez pretpostavljanja roda čitatelja: imenice "Vidljivost.
 * Povjerenje. Rezervacija." umjesto pridjeva). Petar ga odobrava ili
 * prepravlja svojim riječima.
 */
export const hr: Copy = {
  lang: "hr",
  locale: "hr-HR",
  home: "/hr",
  whatsappText: "Dobar dan! Želim besplatnu provjeru stranice. Moja stranica: ",
  drawLabels: { you: "vi?", call: "Nazovi", website: "Web", book: "Rezerviraj" },
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
  },

  hero: {
    eyebrow: "Marketing i rast poslovanja",
    line1: "Sustavi",
    line2: "koji",
    line2Fill: "prodaju.",
    subBefore:
      "Vaša stranica, Google profil i put do rezervacije, složeni u jedno. Provjerimo sve troje, napismeno i",
    subFree: "besplatno.",
    ctaPrimary: "Besplatna provjera",
    ctaSecondary: "Pogledajte radove",
  },

  story: {
    label: "Kako radi besplatna provjera",
    prev: "Prethodna scena",
    next: "Sljedeća scena",
    scenes: [
      { title: "Netko u blizini upravo traži.", free: null, body: "Stol, izlet, smještaj — sada, na mobitelu.", cta: null },
      { title: "Pronađeno.", free: null, body: "Prvo što vide najčešće je vaš Google profil. Vodi li on na vašu stranicu?", cta: null },
      { title: "Povjerenje.", free: null, body: "Stranica ima nekoliko sekundi da pokaže da ste pravi izbor.", cta: null },
      { title: "Rezervirano.", free: null, body: "Jedan pokvaren korak do rezervacije i gost rezervira kod drugoga.", cta: null },
      {
        title: "Provjerimo sve troje.",
        free: "Besplatno.",
        body: "Tri nalaza o vašem profilu, stranici i putu do rezervacije, napismeno.",
        cta: "Besplatna provjera",
      },
    ],
  },

  work: {
    heading: "Radovi",
    sub: "Radimo na malo projekata odjednom, da vaš dobije pažnju koju traži — a kad posao traži fotografa ili copywritera, dovedemo nekoga tko to stvarno zna.",
    visit: "Otvori stranicu",
    statusLive: "Uživo",
    statusDev: "U izradi",
    allCta: "Svi radovi",
    allBlock: {
      eyebrow: "Svi radovi",
      heading: "Svaki projekt, jedna stranica.",
      body: "projekta. Otvorite bilo koji za detalje i živu stranicu.",
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
    cta: {
      heading: "Želite znati što vaša stranica griješi?",
      body: "Pošaljite nam adresu. Provjera je besplatna.",
    },
  },

  pricing: {
    eyebrow: "Paketi",
    heading: ["Izradimo. Povežemo.", "I održavamo."],
    packages: [
      {
        name: "Stranica",
        body: "Dizajn, izrada i objava. Brza na mobitelu, s postavljenim hostingom i analitikom da vidite što radi.",
      },
      {
        name: "Stranica i rezervacije",
        body: "Sve iz paketa Stranica, uz povezan sustav za rezervacije ili kalendar, da vas gosti rezerviraju izravno.",
      },
      {
        name: "Održavanje, mjesečno",
        body: "Hosting, ažuriranja i uredan Google Business profil.",
      },
    ],
    extra:
      "Oglasi i SEO naplaćuju se posebno: Google i Meta oglasi, lokalni SEO i Google Business profil, tekstovi, logo i vizualni identitet, GA4 analitika.",
    reassure: "Točna cijena napismeno nakon besplatne provjere. Bez skrivenih troškova.",
    timeline: "I rok napismeno, uz ponudu.",
  },

  workCta: {
    heading: "Želite znati što vaša stranica griješi?",
    body: "Pošaljite nam adresu. Provjera je besplatna.",
  },

  about: {
    eyebrow: "O nama",
    heading: "S kim biste radili",
    name: "Petar Grbić",
    role: "Head of Operations / Founder",
    portraitAlt: "Petar Grbić, Head of Operations u zipu",
    p1: "Ja sam Petar, iz Dubrovnika, i u zipu vodim sve: stranicu, oglase, pretraživanje i tekstove na svemu tome.",
    p2: "Jedna osoba za sve. Objasnite mi jednom i dalje idem ja; kad posao traži fotografa, copywritera ili stručnjaka, dovedem ga, a vi i dalje razgovarate samo sa mnom.",
    p2b: "Prije ovoga sam tri sezone radio u dubrovačkom turizmu — odnosi s gostima i sigurnost za Maistra Hotels — pa znam što puna sezona radi poslu i koliko vrijedi rezervacija u kolovozu.",
    p3: "Dobrovoljno vojno osposobljavanje pri Ministarstvu obrane 2023. Odatle dolazi disciplina iza svakog roka.",
    certsLine: "Google Ads i Analytics certifikati",
    certsLink: "svih 12 certifikata na mom CV-u",
  },

  process: {
    eyebrow: "Kako radi",
    heading: "Prvo besplatno. Ostalo odlučujete vi.",
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

  book: {
    eyebrow: "Besplatna provjera stranice",
    heading: "Pošaljite nam svoju stranicu.",
    sub: "Tri nalaza o vašoj stranici, Google profilu i putu do rezervacije, napismeno. Besplatno i bez prodajnog razgovora.",
    cta: "Besplatna provjera",
    whatsappLabel: "Besplatna provjera na WhatsAppu",
    stickyLabel: "Provjera na WhatsAppu",
    callLabel: "Ili nazovite",
    emailLabel: "E-mail",
    language: "Hrvatski ili engleski, kako vam odgovara.",
    calendarLabel: "Odaberite termin",
    calendarTitle: "Odaberite dan · 15 minuta",
    calendarCta: "Prikaži slobodne termine",
    nextFree: "Prvi slobodan",
    pickDay: "Radije poziv?",
    timesOn: "Termini za",
    loadingTimes: "Učitavam slobodne termine…",
    loadingForm: "Učitavam obrazac…",
    confirmLabel: "Potvrdite poziv",
    calendarFallback: "Kalendar se ne učitava? Otvorite ga na",
    askFirst: "Radije prvo pitanje?",
    formToggle: "Radije e-mailom?",
    name: "Ime",
    email: "E-mail",
    message: "Poruka",
    messagePlaceholder: "Adresa vaše stranice i čega želite više: rezervacija, poziva, gostiju.",
    send: "Pošalji poruku",
    sending: "Šaljem…",
    success: "Poruka je poslana. Javljamo se u roku od 24 sata.",
    errorServer: "Nešto je pošlo po zlu. Pišite nam izravno na e-mail.",
    errorNetwork: "Greška u mreži. Pišite nam izravno na e-mail.",
    reply: "Odgovaramo u roku od 24 sata.",
    afterSend: "Javljamo se u roku od 24 sata s nekoliko pitanja — bez automatskih poruka i bez newslettera.",
    phone: "Telefon (nije obavezno)",
    required: "Molimo ispunite ovo polje.",
    invalidEmail: "Molimo upišite ispravnu e-mail adresu.",
  },

  footer: {
    tagline: "Marketing i rast za male poslove.",
    copyright: "Sva prava pridržana.",
    backToTop: "Natrag na vrh",
    langHref: "/",
    langLabel: "English",
    cv: "CV",
  },
};

/** Meta oznake hrvatske stranice — zip / marketing genius ostaje u opisu. */
export const hrMeta = {
  title: "Marketing i rast poslovanja — besplatna provjera stranice | zip",
  description:
    "zip / marketing genius. Pomažemo malim poslovima rasti, počevši od besplatne pisane provjere vaše stranice, Google profila i puta do rezervacije.",
};
