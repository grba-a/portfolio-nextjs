import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Pricing from "@/components/Pricing";
import Process from "@/components/Process";
import About from "@/components/About";
import Offer from "@/components/Offer";
import BookCall from "@/components/BookCall";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";

/**
 * Redoslijed prati kako kupac odlučuje, ne kako je portfolio složen:
 * može li → koliko košta → je li sigurno → tko je → što još radi → kako počinjem.
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
        <Pricing />
        <Process />
        <About />
        <Offer />
        <BookCall />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
