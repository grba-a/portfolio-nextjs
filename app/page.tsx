import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className="bg-logo" aria-hidden="true" />
      <Nav />
      <main id="top">
        <Hero />
        <About />
        <Services />
        <Process />
        <Projects />
        <Certifications />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
