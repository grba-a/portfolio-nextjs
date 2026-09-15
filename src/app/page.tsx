import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Pricing from "@/components/Pricing";
import Process from "@/components/Process";
import About from "@/components/About";
import BookCall from "@/components/BookCall";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";

/**
 * Redoslijed prati Petrovo pravilo (2026-09-15): prvo besplatno (provjera u
 * heroju), pa edukacija (priča u heroju, radovi, kako radi), pa naplata
 * (paketi) → tko je → kako počinjem. Offer (9 usluga) je sažet u pakete.
 *
 * "How it works" je prije bio na 71 % dubine iako sadrži dvije rečenice koje
 * ubijaju najveće strahove ("No hidden costs", "You get full ownership").
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <span id="top" />
        <Hero />
        <Work />
        <Process />
        <Pricing />
        <About />
        <BookCall />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
