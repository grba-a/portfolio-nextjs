import { content, type Copy } from "@/data/content";
import FadeHeading from "@/components/ui/FadeHeading";
import Eyebrow from "@/components/ui/Eyebrow";

/**
 * Činjenice umjesto brojki (odluka 13A): predložak tu hvali 200 % i 50K+,
 * a mi pokazujemo četiri istine koje već stoje na stranici, na nagnutim
 * staklenim pločicama. Broj certifikata se računa iz popisa u site.ts.
 */
const MOBILE = [
  "left-[3%] top-[2%]",
  "right-[2%] top-[17%]",
  "left-[5%] top-[47%]",
  "right-[3%] top-[62%]",
];

export default function Facts({ t = content }: { t?: Copy }) {
  const { facts: f } = t;
  return (
    <section aria-labelledby="facts-h" className="relative overflow-hidden border-t border-line py-20 sm:py-32">
      <div className="grid-light" aria-hidden="true" />
      <div className="shell relative">
        <div className="grid max-w-[40rem] gap-5">
          <Eyebrow>{f.eyebrow}</Eyebrow>
          <FadeHeading id="facts-h" lines={[f.heading]} />
          <p className="t-lede">{f.sub}</p>
        </div>

        <ul className="relative mt-10 h-[400px] [perspective:1000px] sm:h-[460px] lg:mt-16 lg:grid lg:h-auto lg:grid-cols-4 lg:gap-5">
          {f.items.map((it, i) => (
            <li
              key={it.label}
              className={`glass absolute grid w-[55%] max-w-[17rem] gap-1.5 rounded-[22px] p-5 [transform:rotateX(22deg)_rotateZ(-12deg)] sm:p-6 lg:static lg:w-auto lg:max-w-none lg:[transform:rotateX(18deg)_rotateZ(-8deg)] ${MOBILE[i]} ${
                i % 2 ? "lg:translate-y-10" : ""
              }`}
            >
              <b className="chrome-text text-[2.75rem] font-semibold leading-none tracking-[-0.045em] sm:text-5xl">{it.n}</b>
              <span className="text-[0.875rem] leading-snug text-fg-2">{it.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
