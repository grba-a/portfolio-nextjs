const testimonials = [
  {
    id: 1,
    quote: "Testimonial coming soon.",
    name: "Client name",
    role: "Business owner",
    initials: "—",
  },
  {
    id: 2,
    quote: "Testimonial coming soon.",
    name: "Client name",
    role: "Business owner",
    initials: "—",
  },
  {
    id: 3,
    quote: "Testimonial coming soon.",
    name: "Client name",
    role: "Business owner",
    initials: "—",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials section" id="testimonials">
      <div className="container">
        <h2>What clients say</h2>
        <p className="muted">Testimonials coming soon — reach out if you&apos;d like to be the first.</p>
        <div className="grid testimonials-grid">
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card card">
              <span className="testimonial-quote-mark" aria-hidden="true">&ldquo;</span>
              <p className="testimonial-text muted">{t.quote}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.initials}</div>
                <div>
                  <p className="testimonial-name">{t.name}</p>
                  <p className="testimonial-role muted">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
