"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
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

  // Scroll spy — highlight the nav link of the section currently at the top
  useEffect(() => {
    const ids = ["about", "services", "process", "projects", "certifications", "contact"];
    let raf = 0;

    const update = () => {
      raf = 0;
      const offset = 100; // header height + a little breathing room
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) current = id;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <header className="header">
        <nav className="nav container">
          {/* Desktop */}
          <ul className="navbar navbar-center navbar-desktop">
            <li><a href="#about" className={active === "about" ? "is-active" : undefined}>{t.nav.about}</a></li>
            <li><a href="#services" className={active === "services" ? "is-active" : undefined}>{t.nav.services}</a></li>
            <li><a href="#process" className={active === "process" ? "is-active" : undefined}>{t.nav.process}</a></li>
            <li className="nav-brand">
              <a href="#top" className="brand" aria-label="Petar Grbić">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo-mark.png" alt="Petar Grbić" className="brand-logo" />
              </a>
            </li>
            <li><a href="#projects" className={active === "projects" ? "is-active" : undefined}>{t.nav.projects}</a></li>
            <li><a href="#certifications" className={active === "certifications" ? "is-active" : undefined}>{t.nav.certs}</a></li>
            <li><a href="#contact" className={active === "contact" ? "is-active" : undefined}>{t.nav.contact}</a></li>
            <li className="nav-lang"><LanguageToggle /></li>
          </ul>

          {/* Mobile bar */}
          <div className="nav-mobile-bar">
            <a href="#top" className="brand" aria-label="Petar Grbić" onClick={() => setOpen(false)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-mark.png" alt="Petar Grbić" className="brand-logo" />
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
