import { content, type Copy } from "@/data/content";
import FadeHeading from "@/components/ui/FadeHeading";
import Eyebrow from "@/components/ui/Eyebrow";
import CheckCards from "@/components/Check";
import Steps from "@/components/Steps";

/**
 * Kako radi. Od 2026-10-14 jedna sekcija umjesto dvije: na vrhu tri dijela
 * provjere i uzorak (CheckCards), ispod koraci s okomitom linijom koja
 * svijetli od prvog (odluka 11A). Brojevi 01–03 imaju smisla jer je ovo pravi slijed.
 */
export default function Process({ t = content }: { t?: Copy }) {
  const { process: p } = t;
  return (
    <section id="how" aria-labelledby="how-h" className="scroll-mt-24 py-20 sm:py-32">
      <div className="shell">
        <div className="grid max-w-[40rem] gap-5">
          <Eyebrow>{p.eyebrow}</Eyebrow>
          <FadeHeading id="how-h" lines={p.heading} />
          <p className="t-lede">{t.check.sub}</p>
        </div>
        <div className="mt-12 lg:mt-16">
          <CheckCards t={t} />
        </div>
      </div>

      <div className="shell mt-16 sm:mt-24">
        <Steps t={t} />
      </div>
    </section>
  );
}
