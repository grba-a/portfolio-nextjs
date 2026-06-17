"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  const links = [
    { href: "#about",          label: t.nav.about },
    { href: "#services",       label: t.nav.services },
    { href: "#process",        label: t.nav.process },
    { href: "#projects",       label: t.nav.projects },
    { href: "#certifications", label: t.nav.certifications },
    { href: "#contact",        label: t.nav.contact },
  ];

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className="header">
        <nav className="nav container">
          {/* Desktop */}
          <ul className="navbar navbar-center navbar-desktop">
            <li><a href="#about">{t.nav.about}</a></li>
            <li><a href="#services">{t.nav.services}</a></li>
            <li><a href="#process">{t.nav.process}</a></li>
            <li className="nav-brand">
              <a href="#top" className="brand">Petar Grbić</a>
            </li>
            <li><a href="#certifications">{t.nav.certs}</a></li>
            <li><a href="#projects">{t.nav.projects}</a></li>
            <li><a href="#contact">{t.nav.contact}</a></li>
            <li><LanguageToggle /></li>
          </ul>

          {/* Mobile bar */}
          <div className="nav-mobile-bar">
            <a href="#top" className="brand" onClick={() => setOpen(false)}>
              Petar Grbić
            </a>
            <div className="nav-mobile-right">
              <LanguageToggle />
              <button
                className={`hamburger${open ? " is-open" : ""}`}
                onClick={() => setOpen(!open)}
                aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
                aria-expanded={open}
              >
                <span className="hb-line" />
                <span className="hb-line" />
                <span className="hb-line" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div className={`mobile-menu${open ? " mobile-menu-open" : ""}`} aria-hidden={!open}>
        <ul className="mobile-nav">
          {links.map((link, i) => (
            <li
              key={link.href}
              className="mobile-nav-item"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <a
                href={link.href}
                className="mobile-nav-link"
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mobile-menu-footer">
          <a
            href="mailto:thepetargrbic@gmail.com"
            className="mobile-menu-email"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
          >
            thepetargrbic@gmail.com
          </a>
          <div className="mobile-menu-socials">
            <a href="https://www.linkedin.com/in/petar-grbi%C4%87-455880398/" target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>LinkedIn</a>
            <span>·</span>
            <a href="https://github.com/grba-a" target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>GitHub</a>
            <span>·</span>
            <a href="https://www.instagram.com/grbicpetarr/" target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>Instagram</a>
          </div>
        </div>
      </div>
    </>
  );
}
