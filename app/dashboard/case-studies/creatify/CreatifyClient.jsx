import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { PiArrowLeftThin } from "react-icons/pi";

const summary = [
  {
    label: "Átlagos növekedés",
    value: "32%",
    note: "konverzió",
  },
  {
    label: "Integrációk",
    value: "5+",
    note: "külső rendszer",
  },
  {
    label: "Idő",
    value: "8 hét",
    note: "szállítás",
  },
];

const highlights = [
  "Stripe + Barion fizetési integráció",
  "Termék- és felhasználói szegmensek bevezetése",
  "Automatizált onboarding és e-mail flow",
  "Teljesítmény- és stabilitásmérések",
];

export default function CreatifyClient() {
  const shouldReduceMotion = useReducedMotion();
  const enableMotion = !shouldReduceMotion;

  return (
    <motion.section
      initial={enableMotion ? { opacity: 0, y: 24 } : false}
      animate={enableMotion ? { opacity: 1, y: 0 } : { opacity: 1 }}
      transition={enableMotion ? { duration: 0.6, ease: "easeOut" } : undefined}
      className="mx-auto w-full max-w-5xl px-6 pb-16 pt-8"
    >
      <div className="flex items-center gap-3 text-sm text-muted">
        <Link href="/dashboard/case-studies" className="inline-flex items-center gap-2 text-accent">
          <PiArrowLeftThin />
          Vissza az esettanulmányokhoz
        </Link>
      </div>

      <header className="mt-6 space-y-4">
        <p className="section-kicker">Creatify</p>
        <h1 className="section-title mt-3">Digitális tartalom platform megújulása</h1>
        <p className="section-body max-w-2xl">
          A fókusz a stabil backend és a megbízható integrációk voltak. A cél az volt, hogy a mérési és onboarding folyamat
          kiszámítható legyen, és ne legyenek rejtett technikai adósságok.
        </p>
      </header>

      <section className="mt-10 grid gap-6 lg:grid-cols-3">
        {summary.map((item) => (
          <div key={item.label} className="rounded-xl border border-white/10 bg-card/70 p-5">
            <p className="text-sm text-muted">{item.label}</p>
            <p className="mt-3 text-3xl font-semibold text-foreground">{item.value}</p>
            <p className="text-xs text-muted">{item.note}</p>
          </div>
        ))}
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="space-y-6">
          <div className="rounded-xl border border-white/10 bg-card/70 p-6">
            <h2 className="text-lg font-semibold text-foreground">Helyzet</h2>
            <p className="mt-3 text-sm text-muted">
              Több forrásból érkező adat, különálló automatizmusok és részben manuális folyamatok. A cél az volt, hogy a
              backend réteg összefogja a rendszereket, és legyen stabil mérési alap.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-card/70 p-6">
            <h2 className="text-lg font-semibold text-foreground">Megoldás</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <aside className="rounded-xl border border-white/10 bg-card/70 p-6">
          <h3 className="text-lg font-semibold text-foreground">Projekt tények</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>Stack: Next.js, Node.js, Stripe, Barion</li>
            <li>Szerep: backend + integrációk</li>
            <li>Időtáv: 8 hét</li>
            <li>Átadás: dokumentált integrációk + monitoring</li>
          </ul>
          <div className="mt-6 rounded-lg border border-white/10 bg-card/60 p-4 text-sm text-muted">
            Ha hasonló rendszerben gondolkodsz, írd meg a scope-ot és visszajelzek.
          </div>
        </aside>
      </section>
    </motion.section>
  );
}
