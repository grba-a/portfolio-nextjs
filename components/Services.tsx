import Image from "next/image";

const services = [
  {
    id: "s1",
    image: "/web.jpg",
    alt: "Web development",
    title: "Web Development",
    items: [
      "Modern, fast, mobile-first websites",
      "Conversion-focused structure",
      "SEO and performance basics",
      "Booking, forms, integrations",
    ],
    cta: "Build my website",
  },
  {
    id: "s2",
    image: "/meta.jpg",
    alt: "Meta Paid Advertising",
    title: "Meta Paid Advertising",
    items: [
      "Campaign setup and targeting",
      "Lead generation and testing",
      "Creative and funnel structure",
      "Performance tracking",
    ],
    cta: "Start ads",
  },
  {
    id: "s3",
    image: "/gds.jpg",
    alt: "Growth & Digital Strategy",
    title: "Growth & Digital Strategy",
    items: [
      "Website + ads + funnel alignment",
      "Customer journey optimization",
      "Conversion and analytics insights",
      "Long-term growth planning",
    ],
    cta: "Grow my business",
  },
];

export default function Services() {
  return (
    <section className="services section" id="services">
      <div className="container">
        <h2>Services</h2>
        <div className="grid services-grid">
          {services.map((s) => (
            <article key={s.id} className={`card service-card ${s.id}`}>
              <div className="service-image">
                <Image src={s.image} alt={s.alt} fill style={{ objectFit: "cover" }} />
              </div>
              <h3>{s.title}</h3>
              <ul className="service-list">
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a className="btn service-cta" href="#contact">{s.cta}</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
