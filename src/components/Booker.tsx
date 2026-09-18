"use client";

import { useEffect, useRef, useState } from "react";
import { content, type Copy } from "@/data/content";
import { site } from "@/data/site";
import Modal from "@/components/Modal";

type Days = Record<string, string[]>;


/** "2026-08-27" iz Date, u lokalnoj zoni — toISOString bi vratio UTC dan. */
const key = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/**
 * Birač termina — vlastita mreža dana, termini odmah ispod nje.
 *
 * Zamjenjuje ugrađeni Cal.com iframe. Iframe je na mobitelu bio kolona od
 * 1665 px unutar okvira od 680 px, pa se skrolalo UNUTAR okvira — najskuplji
 * mobilni defekt koji stranica može imati na mjestu gdje se odlučuje.
 *
 * Termini idu inline, ne u popup: kad čovjek otvori krivi dan (a otvorit će
 * ga), inline mu isti jedan dodir zamijeni popis, dok bi popup tražio
 * zatvaranje pa ponovni odabir. Popup usto nosi Android back tipku, zamku
 * fokusa i iOS scroll-lock — inline ne nosi ništa od toga.
 *
 * Cal.com se otvara TEK na odabrani termin, i to izravno na obrazac
 * (provjereno: parametar `slot` sam otvara formu, bez izbora dana i sata).
 * Time 555 KB Cal.coma dolazi POSLIJE odluke, a ne prije nje.
 */
export default function Booker({ t = content }: { t?: Copy }) {
  const [days, setDays] = useState<Days>({});
  const [state, setState] = useState<"loading" | "ready" | "empty">("loading");
  const [selected, setSelected] = useState<string | null>(null);
  const [monthShift, setMonthShift] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  const [calLoaded, setCalLoaded] = useState(false);
  const timesRef = useRef<HTMLDivElement>(null);

  /*
   * Dok termini ne stignu, NIŠTA se ne računa iz new Date(). Stranica je
   * prerenderirana: server bi zapekao mjesec i "danas" s dana builda, a
   * preglednik bi tjednima kasnije nacrtao drugi mjesec — React tada baca
   * #418 i baca cijeli serverski HTML (hero se vrti ispočetka).
   * Vidi vault: 60-Knowledge/prerender-bakes-build-date.md
   */
  const ready = state !== "loading";

  useEffect(() => {
    let alive = true;
    fetch("/api/slots")
      .then((r) => (r.ok ? r.json() : { days: {} }))
      .then((d) => {
        if (!alive) return;
        const got: Days = d && typeof d.days === "object" && d.days ? d.days : {};
        setDays(got);
        const first = Object.keys(got).sort()[0] ?? null;
        setSelected(first);
        setState(first ? "ready" : "empty");
      })
      .catch(() => alive && setState("empty"));
    return () => {
      alive = false;
    };
  }, []);

  /** Vremena se ispisuju u zoni POSJETITELJA i zona se imenuje — inače
   *  stranac rezervira krivi sat i dođe sat vremena promašeno. */
  const localZone =
    typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : site.timeZone;
  const time = (iso: string) =>
    new Intl.DateTimeFormat(t.locale, { hour: "2-digit", minute: "2-digit" }).format(new Date(iso));
  const longDay = (day: string) => {
    const d = new Date(`${day}T12:00:00`);
    return `${t.weekFull[d.getDay()]}, ${d.getDate()} ${d.toLocaleString(t.locale, { month: "long" })}`;
  };

  // Mjesec koji se crta: mjesec prvog slobodnog dana, pomaknut strelicama.
  const firstDay = Object.keys(days).sort()[0];
  const base = firstDay ? new Date(`${firstDay}T12:00:00`) : new Date();
  const shown = new Date(base.getFullYear(), base.getMonth() + monthShift, 1);
  const lastDay = Object.keys(days).sort().slice(-1)[0];
  const monthsSpanned =
    firstDay && lastDay
      ? (new Date(`${lastDay}T12:00:00`).getFullYear() - base.getFullYear()) * 12 +
        new Date(`${lastDay}T12:00:00`).getMonth() -
        base.getMonth()
      : 0;

  const daysInMonth = new Date(shown.getFullYear(), shown.getMonth() + 1, 0).getDate();
  const lead = shown.getDay();
  const today = ready ? key(new Date()) : "";

  const pick = (day: string) => {
    setSelected(day);
    // Popis koji se otvori ispod ruba ekrana čita se kao "dodir nije radio".
    requestAnimationFrame(() => timesRef.current?.scrollIntoView({ block: "nearest" }));
  };

  /* Tamna tema: popup je sada tamna ploha kao cijela stranica (redizajn
     2026-09-18), pa bi svijetli Cal.com obrazac u njemu izgledao kao tuđi ekran. */
  const calUrl = slot && site.booking
    ? `${site.booking}?embed=true&theme=dark&slot=${encodeURIComponent(slot)}`
    : null;

  /* Naslov prozora kaže KOJI termin je odabran — prazan "Confirm your call"
     dok se Cal.com učitava čitao se kao greška. */
  const slotLabel = slot
    ? `${t.book.confirmLabel} · ${new Intl.DateTimeFormat(t.locale, {
        weekday: "short",
        day: "numeric",
        month: "short",
      }).format(new Date(slot))}, ${time(slot)}`
    : t.book.confirmLabel;

  const openSlot = (iso: string) => {
    setCalLoaded(false);
    setSlot(iso);
  };

  return (
    <div>
      <div className="rounded-[14px]">
        {/* Zaglavlje mjeseca */}
        <div className="flex items-center justify-between gap-4">
          {ready ? (
            <p className="text-lg font-semibold tracking-[-0.02em]">
              {shown.toLocaleString(t.locale, { month: "long" })}{" "}
              <span className="text-fg-3">{shown.getFullYear()}</span>
            </p>
          ) : (
            <span className="block h-7 w-36 rounded-[8px] bg-white/[0.06]" aria-hidden="true" />
          )}

          <div className="-mr-2 flex">
            {([-1, 1] as const).map((dir) => {
              const disabled =
                state !== "ready" ||
                (dir === -1 ? monthShift <= 0 : monthShift >= monthsSpanned);
              return (
                <button
                  key={dir}
                  type="button"
                  onClick={() => setMonthShift((m) => m + dir)}
                  disabled={disabled}
                  aria-label={dir === -1 ? "Previous month" : "Next month"}
                  className="grid h-11 w-11 place-items-center text-fg-2 transition-opacity hover:text-fg disabled:opacity-25"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={dir === -1 ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
                  </svg>
                </button>
              );
            })}
          </div>
        </div>

        {/* Nazivi dana — jedno slovo, jer na 360px sedam riječi ne stane */}
        <div className="mt-4 grid grid-cols-7">
          {t.week.map((d, i) => (
            <p key={i} className="pb-2 text-center text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-fg-3">
              <span aria-hidden="true">{d}</span>
              <span className="sr-only">{t.weekFull[i]}</span>
            </p>
          ))}
        </div>

        {/* Mreža. BEZ data-reveal na ćelijama: revealIn je ScrollTrigger s
            once:true, pa bi ćelije koje React zamijeni pri promjeni mjeseca
            ostale na opacity 0, bez ijedne greške u konzoli. */}
        <div className="grid grid-cols-7">
          {/* Kostur bez datuma dok se termini učitavaju: isti HTML na serveru
              i u pregledniku, bez obzira na dan builda. */}
          {!ready &&
            Array.from({ length: 35 }, (_, i) => (
              <div key={`s${i}`} className="p-[2px]" aria-hidden="true">
                <div className="h-11 rounded-[8px] bg-white/[0.04]" />
              </div>
            ))}

          {ready && Array.from({ length: lead }).map((_, i) => <div key={`b${i}`} />)}

          {ready && Array.from({ length: daysInMonth }, (_, i) => {
            const day = key(new Date(shown.getFullYear(), shown.getMonth(), i + 1));
            const free = !!days[day]?.length;
            const isSel = day === selected;
            const isToday = day === today;

            return (
              <div key={day} className="p-[2px]">
                <button
                  type="button"
                  disabled={!free}
                  onClick={() => pick(day)}
                  aria-pressed={isSel}
                  aria-label={`${longDay(day)}${free ? "" : " — no times"}`}
                  className={
                    "relative grid h-11 w-full place-items-center rounded-[8px] text-sm transition-colors " +
                    // Puna inverzija za odabrani dan: polutransparentna svijetla
                    // ploha s tamnim tekstom daje ~1:1 kontrast na tinti.
                    (isSel
                      ? "bg-fg font-semibold text-void"
                      : free
                        ? "bg-white/[0.07] text-fg hover:bg-white/15"
                        : "cursor-default text-fg-3/70")
                  }
                >
                  {i + 1}
                  {isToday && !isSel && (
                    <span className="absolute bottom-1 h-1 w-1 rounded-full bg-fg-2" aria-hidden="true" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Termini odabranog dana */}
      <div ref={timesRef} className="mt-5 min-h-[6.5rem]">
        {state === "loading" && (
          <p className="text-sm text-fg-3">{t.book.loadingTimes}</p>
        )}

        {state === "empty" && (
          <a
            href={site.booking ?? "#contact"}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary w-full sm:w-auto"
          >
            {t.book.calendarCta}
          </a>
        )}

        {state === "ready" && selected && (
          <>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="text-sm font-medium text-fg-2">
                {t.book.timesOn} {longDay(selected)}
              </p>
              <p className="text-xs text-fg-3">
                {localZone.replace("_", " ")}
              </p>
            </div>

            <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label={t.book.calendarLabel}>
              {(days[selected] ?? []).map((iso) => (
                <button
                  key={iso}
                  type="button"
                  onClick={() => openSlot(iso)}
                  className="inline-flex min-h-11 items-center rounded-full border border-line-2 px-4 text-sm font-medium tabular-nums text-fg transition-[colors,transform] duration-150 hover:border-fg hover:bg-white/10 active:scale-[0.97]"
                >
                  {time(iso)}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Cal.com se učita tek ovdje — i to ravno na obrazac za odabrani termin */}
      <Modal open={!!calUrl} onClose={() => setSlot(null)} label={slotLabel}>
        {calUrl && (
          <div className="relative">
            {!calLoaded && (
              <div className="absolute inset-0 grid content-start gap-3 p-5" aria-hidden="true">
                <div className="h-5 w-2/3 rounded-[3px] bg-white/[0.06]" />
                <div className="h-11 rounded-[3px] bg-white/[0.06]" />
                <div className="h-11 rounded-[3px] bg-white/[0.06]" />
                <div className="h-24 rounded-[3px] bg-white/[0.06]" />
                <p className="text-sm text-fg-3">{t.book.loadingForm}</p>
              </div>
            )}
            <iframe
              src={calUrl}
              title={slotLabel}
              onLoad={() => setCalLoaded(true)}
              className={
                "relative h-[70vh] min-h-[480px] w-full border-0 transition-opacity duration-200 " +
                (calLoaded ? "opacity-100" : "opacity-0")
              }
            />
          </div>
        )}
      </Modal>
    </div>
  );
}
