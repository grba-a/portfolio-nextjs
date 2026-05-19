"use client";

import { useState, useEffect } from "react";

const links = [
  { href: "#about",          label: "About" },
  { href: "#services",       label: "Services" },
  { href: "#process",        label: "Process" },
  { href: "#projects",       label: "Projects" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact",        label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

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
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#process">Process</a></li>
            <li className="nav-brand">
              <a href="#top" className="brand">Petar Grbić</a>
            </li>
            <li><a href="#certifications">Certs</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>

          {/* Mobile bar */}
          <div className="nav-mobile-bar">
            <a href="#top" className="brand" onClick={() => setOpen(false)}>
              Petar Grbić
            </a>
            <button
              className={`hamburger${open ? " is-open" : ""}`}
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span className="hb-line" />
              <span className="hb-line" />
              <span className="hb-line" />
            </button>
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
