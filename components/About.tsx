import Image from "next/image";

export default function About() {
  return (
    <section className="about section" id="about">
      <div className="container two-col">
        <div className="media" data-animate data-delay="0">
          <div className="about-img">
            <Image src="/me.jpg" alt="Petar Grbić" width={290} height={290} />
          </div>
        </div>
        <div className="content" data-animate data-delay="150">
          <h2>About me</h2>
          <p>
            I&apos;m Petar — 23, from Dubrovnik. Second year of Digital Marketing at
            Sveučilište Algebra Bernays, Zagreb.
          </p>
          <p>
            I work as a full-service digital freelancer: one point of contact for everything
            digital — website, ads, SEO, content, and branding. You brief me once, I handle the rest.
          </p>
          <p className="muted about-note">
            12 Google & HubSpot certifications. Three live projects built from scratch.
            Military-trained discipline applied to every deadline.
          </p>
          <div className="about-actions">
            <a className="btn btn-primary-glow" href="#contact">Let&apos;s talk</a>
            <a
              className="btn btn-ghost"
              href="/PetarGrbic_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
