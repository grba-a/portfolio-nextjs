import { content, type Copy } from "@/data/content";
import ZipLogo from "@/components/ZipLogo";
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
export default function Footer({ t = content }: { t?: Copy }) {
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
              href={`${t.home}#top`}
              className="-my-2 inline-flex min-h-11 items-center"
              aria-label={`zip — ${t.footer.backToTop}`}
            >
              <ZipLogo id="zip-foot" className="h-12 w-auto" />
            </a>
            <p className="mt-1.5 text-sm text-limestone/75">{t.footer.tagline}</p>
          </div>

          <div className="flex flex-col gap-5 sm:items-end">
            {/* CV je ovdje, ne u sekciji O meni: kupac weba ne kupuje životopis */}
            <div className="flex gap-5 self-start sm:self-end">
              <a
                href={t.footer.langHref}
                lang={t.lang === "hr" ? "en" : "hr"}
                className="ulink -my-2 inline-flex min-h-11 items-center text-sm text-limestone/75"
              >
                {t.footer.langLabel}
              </a>
              <a href={site.cv} className="ulink -my-2 inline-flex min-h-11 items-center text-sm text-limestone/75">
                {t.footer.cv}
              </a>
            </div>
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

        <p className="mt-9 text-xs text-limestone/60">
          © {site.name}. {t.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
