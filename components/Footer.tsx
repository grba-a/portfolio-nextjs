"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

const socialLinks = [
  {
    label: "Email",
    href: "mailto:thepetargrbic@gmail.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 7l-10 7L2 7" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/petar-grbi%C4%87-455880398/",
    target: "_blank",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/grba-a",
    target: "_blank",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/grbicpetarr/",
    target: "_blank",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function Footer() {
  const { t } = useLanguage();

  const navLinks = [
    { href: "#about",          label: t.nav.about },
    { href: "#services",       label: t.nav.services },
    { href: "#process",        label: t.nav.process },
    { href: "#projects",       label: t.nav.projects },
    { href: "#certifications", label: t.nav.certifications },
    { href: "#contact",        label: t.nav.contact },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-cta">
          <p className="footer-cta-label">{t.footer.ctaLabel}</p>
          <a href="#contact" className="footer-cta-link">
            {t.footer.ctaLink} <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="footer-divider" />
        <div className="footer-body">
          <div className="footer-brand">
            <span className="footer-name">Petar Grbić</span>
            <span className="footer-tagline muted">{t.footer.tagline}</span>
          </div>
          <nav className="footer-nav" aria-label="Footer navigation">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>{link.label}</a>
            ))}
          </nav>
          <div className="footer-social">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.target}
                rel={s.target ? "noopener noreferrer" : undefined}
                className="footer-social-icon"
                aria-label={s.label}
                title={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <p className="muted">© {new Date().getFullYear()} Petar Grbić. {t.footer.copyright}</p>
          <a href="#top" className="to-top" aria-label={t.footer.backToTopLabel}>{t.footer.backToTop}</a>
        </div>
      </div>
    </footer>
  );
}
