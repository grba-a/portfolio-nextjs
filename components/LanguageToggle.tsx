"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function LanguageToggle({ tabIndex }: { tabIndex?: number }) {
  const { lang, toggle } = useLanguage();

  return (
    <button
      onClick={toggle}
      tabIndex={tabIndex}
      className="lang-toggle"
      aria-label={lang === "en" ? "Prebaci na hrvatski" : "Switch to English"}
      title={lang === "en" ? "Prebaci na hrvatski" : "Switch to English"}
    >
      <span className={lang === "en" ? "lang-active" : "lang-inactive"}>EN</span>
      <span className="lang-sep">|</span>
      <span className={lang === "hr" ? "lang-active" : "lang-inactive"}>HR</span>
    </button>
  );
}
