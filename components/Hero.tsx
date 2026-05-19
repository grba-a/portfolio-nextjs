export default function Hero() {
  return (
    <section className="hero section">
      <div className="hero-glow" aria-hidden="true" />
      <div className="container">
        <div className="availability-badge">
          <span className="availability-dot" />
          Available for new projects
        </div>
        <h1>Petar Grbić</h1>
        <p className="hero-sub">
          Web development, paid ads, SEO, content, and branding —<br />
          handled end to end. One contact, full execution.
        </p>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-num">3</span>
            <span className="stat-label">Live projects</span>
          </div>
          <div className="stat-sep" aria-hidden="true" />
          <div className="stat">
            <span className="stat-num">6</span>
            <span className="stat-label">Service areas</span>
          </div>
          <div className="stat-sep" aria-hidden="true" />
          <div className="stat">
            <span className="stat-num">12</span>
            <span className="stat-label">Certifications</span>
          </div>
          <div className="stat-sep" aria-hidden="true" />
          <div className="stat">
            <span className="stat-num">C1</span>
            <span className="stat-label">English</span>
          </div>
        </div>
        <div className="hero-actions">
          <a className="btn btn-primary-glow" href="#services">See what I offer</a>
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
    </section>
  );
}
