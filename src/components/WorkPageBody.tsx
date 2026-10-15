import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WorkGallery from "@/components/WorkGallery";
import Eyebrow from "@/components/ui/Eyebrow";
import FadeHeading from "@/components/ui/FadeHeading";
import { content, type Copy } from "@/data/content";
import { work } from "@/data/work";

/**
 * Svi radovi, na oba jezika (/work i /hr/radovi od 2026-10-15).
 * Klik otvara popup; svaki popup ima vlastiti link (/work#slug, /hr/radovi#slug).
 */
export default function WorkPageBody({ t: copy = content }: { t?: Copy }) {
  const { workPage: t } = copy;
  const live = work.filter((w) => w.status === "live").length;
  const building = work.length - live;

  return (
    <>
      <Nav t={copy} langHref={copy.lang === "en" ? "/hr/radovi" : "/work"} />
      <main id="main" className="relative pt-36 sm:pt-44">
        <div className="grid-light" aria-hidden="true" />
        <div className="shell relative">
          <header className="grid max-w-2xl gap-5">
            <Eyebrow>{t.title}</Eyebrow>
            <FadeHeading as="h1" className="t-display" lines={[t.heading]} />
            <p className="t-lede">
              {live} {t.live}, {building} {t.building}.
            </p>
          </header>

          <div className="mt-14 sm:mt-20">
            <WorkGallery t={copy} />
          </div>
        </div>
        <div className="h-24 sm:h-32" />
      </main>
      <Footer t={copy} langHref={copy.lang === "en" ? "/hr/radovi" : "/work"} />
    </>
  );
}
