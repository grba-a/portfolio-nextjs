import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WorkGallery from "@/components/WorkGallery";
import Eyebrow from "@/components/ui/Eyebrow";
import FadeHeading from "@/components/ui/FadeHeading";
import { content } from "@/data/content";
import { work } from "@/data/work";

export const metadata: Metadata = {
  title: "Work | zip",
  description: "Websites built by zip. Open any project for the details and the live site.",
  alternates: { canonical: "/work" },
};

/** Svi radovi. Klik otvara popup; svaki popup ima vlastiti link (/work#slug). */
export default function WorkPage() {
  const { workPage: t } = content;
  const live = work.filter((w) => w.status === "live").length;
  const building = work.length - live;

  return (
    <>
      <Nav />
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
            <WorkGallery />
          </div>
        </div>
        <div className="h-24 sm:h-32" />
      </main>
      <Footer />
    </>
  );
}
