"use client";

import { Printer } from "@/components/icons";

/**
 * Plutajući gumb za ispis / spremanje u PDF.
 *
 * Na staroj verziji su dva ovakva gumba trajno prekrivala chipove
 * s vještinama na 375px. Ovdje je jedan, na mobitelu samo ikona
 * (upola manji otisak preko teksta), a natpis se pojavljuje od 640px.
 * U ispisu nestaje.
 */
export default function PrintButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      aria-label={label}
      title={label}
      className="btn btn-primary fixed bottom-5 right-5 z-40 !px-4 shadow-lg print:hidden sm:bottom-8 sm:right-8 sm:!px-6"
    >
      <Printer className="h-4 w-4" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
