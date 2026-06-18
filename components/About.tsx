"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Chat, Download } from "@/components/icons";

export default function About() {
  const { t } = useLanguage();

  return (
    <section className="about section" id="about">
      <div className="container two-col">
        <div className="media" data-animate data-delay="0">
          <div className="about-img">
            <Image src="/me.jpg" alt="Petar Grbić" width={290} height={290} />
          </div>
        </div>
        <div className="content" data-animate data-delay="150">
          <h2>{t.about.heading}</h2>
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
          <p className="muted about-note">{t.about.p3}</p>
          <div className="about-actions">
            <a className="btn btn-primary-glow" href="#contact">
              <Chat />
              {t.about.btnTalk}
            </a>
            <a
              className="btn btn-ghost"
              href="/PetarGrbic_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              <Download />
              {t.about.btnCV}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
