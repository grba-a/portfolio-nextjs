import { content } from "@/data/content";
import { site } from "@/data/site";

/** Podnožje. Tamno, nastavlja zaključni blok — bez farme poveznica. */
export default function Footer() {
  // Namjerno bez godine: ovo je statički prerender, pa bi se new Date()
  // zapekao u trenutak builda i mjesecima prikazivao staru godinu.
  return (
    <footer data-dark className="bg-ink text-limestone">
      <div className="shell border-t border-limestone/12 py-10 sm:py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-lg font-extrabold tracking-[-0.02em]">
              Petar Grbić
            </p>
            <p className="mt-1.5 text-sm text-limestone/75">{content.footer.tagline}</p>
            <p className="mt-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-limestone/60">
              {content.footer.based}
            </p>
          </div>

          <div className="flex flex-col gap-5 sm:items-end">
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              {site.socials.map((sn) => (
                <li key={sn.label}>
                  <a
                    href={sn.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ulink -my-2 inline-flex min-h-11 items-center text-sm text-limestone/75 hover:text-limestone"
                  >
                    {sn.label}
                  </a>
                </li>
              ))}
            </ul>

            <a href="#top" className="ulink -my-2.5 inline-flex min-h-11 items-center self-start text-sm text-limestone/75 sm:self-auto">
              {content.footer.backToTop}
            </a>
          </div>
        </div>

        <p className="mt-9 font-mono text-[0.6875rem] text-limestone/60">
          © {site.name}. {content.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
