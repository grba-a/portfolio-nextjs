import { content, type Copy } from "@/data/content";
import { Spark } from "@/components/icons";

/**
 * Traka ispod heroja (odluka 8B). Na predlošku su tu logotipi Applea i
 * Adobea; mi pokazujemo ono što stvarno imamo: certifikate i alate.
 * Popis se ponavlja dvaput da petlja nema šav; drugi primjerak je aria-hidden.
 */
export default function Strip({ t = content }: { t?: Copy }) {
  const { strip } = t;
  const row = (hidden: boolean) =>
    strip.items.map((item, i) => (
      <li key={`${hidden}-${i}`} aria-hidden={hidden || undefined} className="flex items-center gap-2.5 whitespace-nowrap text-[0.9375rem] font-semibold tracking-[-0.015em] text-fg-2">
        <Spark className="h-3.5 w-3.5 opacity-60" />
        {item}
      </li>
    ));

  return (
    <section aria-label={strip.label} className="border-y border-line py-7 sm:py-9">
      <p className="shell mb-4 text-center text-[0.8125rem] text-fg-3">{strip.label}</p>
      <div className="marquee">
        <ul className="marquee-track">
          {row(false)}
          {row(true)}
        </ul>
      </div>
    </section>
  );
}
