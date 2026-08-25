import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Offer from "@/components/Offer";
import About from "@/components/About";
import Process from "@/components/Process";
import BookCall from "@/components/BookCall";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <span id="top" />
        <Hero />
        <Work />
        <Offer />
        <About />
        <Process />
        <BookCall />
      </main>
      <Footer />
    </>
  );
}
