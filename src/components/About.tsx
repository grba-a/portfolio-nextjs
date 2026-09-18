import { content, type Copy } from "@/data/content";
import FadeHeading from "@/components/ui/FadeHeading";
import Eyebrow from "@/components/ui/Eyebrow";
import ZipChrome from "@/components/ZipChrome";

/**
 * O nama — samo firma (odluka 15A; Petar 2026-09-18: "ne ide nitko od nas").
 * Bez imena, portreta i CV-a. Grad je Zagreb.
 */
export default function About({ t = content }: { t?: Copy }) {
  const { about: a } = t;
  return (
    <section id="about" aria-labelledby="about-h" className="scroll-mt-24 border-t border-line bg-ink-1 py-20 sm:py-32">
      <div className="shell grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="order-2 lg:order-1">
          <ZipChrome id="zip-about" pitch={10} sheen={false} className="h-auto w-[72%] max-w-[26rem] lg:w-[80%]" />
        </div>
        <div className="order-1 grid gap-5 lg:order-2">
          <Eyebrow>{a.eyebrow}</Eyebrow>
          <FadeHeading id="about-h" lines={a.heading} />
          <p className="t-lede max-w-[46ch]">{a.p1}</p>
          <p className="text-[0.9375rem] text-fg-2">{a.p2}</p>
          <ul className="mt-1 flex flex-wrap gap-2">
            <li className="chip">{a.location}</li>
            <li className="chip">{a.certs}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
