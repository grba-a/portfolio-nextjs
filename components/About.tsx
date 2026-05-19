import Image from "next/image";

export default function About() {
  return (
    <section className="about section" id="about">
      <div className="container two-col">
        <div className="media">
          <div className="about-img">
            <Image src="/me.jpg" alt="Petar" width={240} height={240} />
          </div>
        </div>
        <div className="content">
          <h2>About</h2>
          <p>
            As a young entrepreneur, I focus on helping businesses grow through modern websites,
            paid advertising, and strategic thinking. I believe that strong digital presence is
            built through simplicity, clarity, and performance, not complexity.
          </p>
          <a className="btn" href="#contact">Contact</a>
        </div>
      </div>
    </section>
  );
}
