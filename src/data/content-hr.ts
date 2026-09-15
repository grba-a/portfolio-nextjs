/**
 * Hrvatska stranica /hr — za vlasnike koji radije čitaju hrvatski.
 *
 * Nije prijevod naslovnice, nego kraća stranica s istom ponudom i istim
 * redoslijedom: prvo besplatna provjera, pa kako radi, pa paketi
 * (Petar, 2026-09-15). Dubrovnik se spominje samo u "O meni".
 *
 * NACRT: tekst je napisao Claude prema pravilima hrvatske gramatike iz
 * vaulta (bez pretpostavljanja roda čitatelja: imenice "Vidljivost.
 * Povjerenje. Rezervacija." umjesto pridjeva). Petar ga odobrava ili
 * prepravlja svojim riječima.
 */
export const hr = {
  meta: {
    title: "Marketing i rast poslovanja — besplatna provjera stranice | zip",
    description:
      "zip / marketing genius. Pomažemo malim tvrtkama rasti, počevši od besplatne pisane provjere vaše stranice, Google profila i puta do rezervacije.",
  },
  nav: { en: "English", cta: "Besplatna provjera" },
  hero: {
    eyebrow: "zip · Marketing i rast poslovanja",
    line1: "Sustavi",
    line2: "koji prodaju.",
    subBefore:
      "Vaša web stranica, Google profil i put do rezervacije, složeni u jedno. Provjerimo sve troje, napismeno i",
    subFree: "besplatno.",
    cta: "Besplatna provjera",
  },
  story: {
    label: "Kako radi besplatna provjera",
    prev: "Prethodna scena",
    next: "Sljedeća scena",
    scenes: [
      { title: "Netko u blizini upravo traži.", free: null, body: "Stol, izlet, smještaj — sada, na mobitelu.", cta: null },
      { title: "Vidljivost.", free: null, body: "Prvo što vide često je vaš Google profil. Vodi li on na vašu stranicu?", cta: null },
      { title: "Povjerenje.", free: null, body: "Stranica ima nekoliko sekundi da pokaže da ste pravi izbor.", cta: null },
      { title: "Rezervacija.", free: null, body: "Jedan pokvaren korak do rezervacije i gost rezervira kod drugoga.", cta: null },
      {
        title: "Provjerimo sve troje.",
        free: "Besplatno.",
        body: "Tri nalaza o vašem profilu, stranici i putu do rezervacije, napismeno.",
        cta: "Besplatna provjera",
      },
    ],
  },
  drawLabels: { you: "vi?", call: "Nazovi", website: "Web", book: "Rezerviraj" },
  work: { cta: "Pogledajte radove", note: "Stranica s radovima je na engleskom." },
  process: {
    eyebrow: "Kako radi",
    heading: "Prvo besplatno. Ostalo odlučujete vi.",
    steps: [
      {
        num: "01",
        title: "Besplatna provjera",
        desc: "Pošaljite adresu svoje stranice. Dobit ćete tri nalaza o Google profilu, stranici i putu do rezervacije, napismeno. Besplatno i bez ikakve obveze.",
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
    heading: "Odaberite što trebate. Cijena stiže napismeno.",
    items: [
      { name: "Web stranica", body: "Dizajn, izrada i objava. Brza na mobitelu, s postavljenim hostingom i analitikom da vidite što radi." },
      { name: "Stranica i rezervacije", body: "Sve iz paketa Web stranica, uz povezan sustav za rezervacije ili kalendar, da vas gosti rezerviraju izravno." },
      { name: "Održavanje, mjesečno", body: "Hosting, ažuriranja i uredan Google Business profil." },
    ],
    extra:
      "Oglasi i SEO naplaćuju se posebno: Google i Meta oglasi, lokalni SEO i Google Business profil, tekstovi, logo i vizualni identitet, GA4 analitika.",
    reassure: "Točna cijena napismeno nakon besplatne provjere. Bez skrivenih troškova.",
  },
  about: {
    eyebrow: "O meni",
    name: "Petar Grbić",
    role: "Head of Operations",
    p1: "Ja sam Petar, iz Dubrovnika, i u zipu vodim sve projekte: stranicu, oglase, pretraživanje i tekstove na svemu tome.",
    p2: "Tri sezone radio sam u dubrovačkom turizmu, na odnosima s gostima i sigurnosti za Maistra Hotels, pa znam što puna sezona radi poslu i koliko vrijedi rezervacija u kolovozu.",
  },
  contact: {
    eyebrow: "Besplatna provjera",
    heading: "Pošaljite nam svoju stranicu.",
    sub: "Tri nalaza o stranici, Google profilu i putu do rezervacije, napismeno. Besplatno i bez prodajnog razgovora.",
    whatsapp: "Besplatna provjera na WhatsAppu",
    reply: "Odgovaramo u roku od 24 sata. Hrvatski ili engleski, kako vam odgovara.",
  },
  footer: { tagline: "Marketing i rast za male tvrtke.", rights: "Sva prava pridržana." },
  whatsappText: "Dobar dan! Želim besplatnu provjeru stranice. Moja stranica: ",
} as const;
