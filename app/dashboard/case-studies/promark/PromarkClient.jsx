"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { PiArrowLeftThin } from "react-icons/pi";

const summary = [
  {
    label: "Aktív tagok",
    value: "41%",
    note: "növekedés",
  },
  {
    label: "Infrastruktúra",
    value: "K8s",
    note: "migráció",
  },
  {
    label: "Support",
    value: "24/7",
    note: "monitoring",
  },
];

const milestones = [
  "Mikroszerviz architektúra bevezetése",
  "Automatikus failover és skálázás",
  "Discord + HelpScout integráció",
  "CI/CD és infrastruktúra kód (Terraform)",
];

export default function PromarkClient() {
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
        <p className="section-kicker">PromARK</p>
        <h1 className="section-title mt-3">Gamer közösség skálázható infrastruktúrája</h1>
        <p className="section-body max-w-2xl">
          A cél egy stabil, skálázható backend és infrastruktúra volt. A régi rendszer túl sok kézi lépést igényelt, és a
          növekedés után már nem volt kiszámítható.
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
              Monolitikus infrastruktúra, gyakori leállások, manuális deploy. A közösség gyorsan bővült, de az onboarding
              lassú volt, és a support leterhelt.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-card/70 p-6">
            <h2 className="text-lg font-semibold text-foreground">Megoldás</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {milestones.map((item) => (
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
            <li>Stack: Kubernetes, Terraform, Discord API</li>
            <li>Szerep: infra + automatizáció</li>
            <li>Időtáv: 10 hét</li>
            <li>Átadás: monitoring + on-call folyamat</li>
          </ul>
          <div className="mt-6 rounded-lg border border-white/10 bg-card/60 p-4 text-sm text-muted">
            Ha legacy rendszert kell modernizálni, megírod a kontextust és pontosítjuk a scope-ot.
          </div>
        </aside>
      </section>
    </motion.section>
  );
}
