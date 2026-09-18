import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Strip from "@/components/Strip";
import Check from "@/components/Check";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Packages from "@/components/Packages";
import Facts from "@/components/Facts";
import About from "@/components/About";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";

/**
 * Redizajn 2026-09-18, redom kako ih je Petar izabrao u artifactu:
 * prvo besplatno (hero, provjera), pa dokaz i edukacija (radovi, koraci),
 * pa naplata (paketi, činjenice) → tko smo → pitanja → kontakt.
 * Recenzija nema dok ne stigne prva prava (odluka 14A).
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Strip />
        <Check />
        <Work />
        <Process />
        <Packages />
        <Facts />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
