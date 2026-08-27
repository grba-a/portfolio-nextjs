import { content } from "@/data/content";
import { site } from "@/data/site";
import { Facebook, GitHub, Instagram, LinkedIn } from "@/components/icons";

/** Znak po nazivu mreže iz site.socials — bez ovog para popis i ikone se raziđu. */
const socialIcon: Record<string, (p: { className?: string }) => React.ReactElement> = {
  LinkedIn,
  GitHub,
  Instagram,
  Facebook,
};

/** Podnožje. Tamno, nastavlja zaključni blok — bez farme poveznica. */
export default function Footer() {
  // Namjerno bez godine: ovo je statički prerender, pa bi se new Date()
  // zapekao u trenutak builda i mjesecima prikazivao staru godinu.
  return (
    <footer data-dark className="bg-ink text-limestone">
      <div className="shell border-t border-limestone/12 py-10 sm:py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {/* Logotip je i povratak na vrh — zaseban redak „Back to top" je
                bio još jedna poveznica za istu radnju. Natpis ostaje za
                čitače ekrana, jer im sama slika ne kaže kamo vodi. */}
            <a
              href="#top"
              className="-my-2 inline-flex min-h-11 items-center font-display text-lg font-extrabold tracking-[-0.02em]"
            >
              Petar Grbić
              <span className="sr-only"> — {content.footer.backToTop}</span>
            </a>
            <p className="mt-1.5 text-sm text-limestone/75">{content.footer.tagline}</p>
            <p className="mt-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-limestone/60">
              {content.footer.based}
            </p>
          </div>

          <div className="flex flex-col gap-5 sm:items-end">
            <ul className="-mx-2.5 flex flex-wrap">
              {site.socials.map((sn) => {
                const Icon = socialIcon[sn.label];
                return (
                  <li key={sn.label}>
                    <a
                      href={sn.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={sn.label}
                      className="grid h-11 w-11 place-items-center text-limestone/70 transition-colors hover:text-limestone"
                    >
                      {Icon ? <Icon /> : sn.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <p className="mt-9 font-mono text-[0.6875rem] text-limestone/60">
          © {site.name}. {content.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
