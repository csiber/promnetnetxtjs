"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

const focusAreas = [
  "Backend és API tervezés",
  "CI/CD és release folyamat",
  "Monitoring, logging, riasztások",
  "Infrastruktúra kód (Terraform)",
];

export default function HostingBuilderClient() {
  const shouldReduceMotion = useReducedMotion();
  const enableMotion = !shouldReduceMotion;

  return (
    <motion.section
      initial={enableMotion ? { opacity: 0, y: 24 } : false}
      animate={enableMotion ? { opacity: 1, y: 0 } : { opacity: 1 }}
      transition={enableMotion ? { duration: 0.6, ease: "easeOut" } : undefined}
      className="mx-auto w-full max-w-5xl px-6 pb-16 pt-8"
    >
      <header className="space-y-4">
        <p className="section-kicker">Backend & DevOps</p>
        <h1 className="section-title mt-3">Infrastruktúra, ami nem esik szét terhelésnél</h1>
        <p className="section-body max-w-2xl">
          Skálázható backend és üzemeltetés, amit nem kell állandóan tűzoltani. A cél a stabil release folyamat és
          a gyors, kiszámítható működés.
        </p>
      </header>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1fr,1fr]">
        <div className="rounded-xl border border-white/10 bg-card/70 p-6">
          <h2 className="text-lg font-semibold text-foreground">Fókusz</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {focusAreas.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-white/10 bg-card/70 p-6">
          <h2 className="text-lg font-semibold text-foreground">Mit kapsz</h2>
          <p className="mt-3 text-sm text-muted">
            Dokumentált architektúra, áttekinthető infrastruktúra, mérhető stabilitás. A cél, hogy ne az üzemeltetés
            vigye el a csapat kapacitását.
          </p>
          <div className="mt-6 rounded-lg border border-white/10 bg-card/60 p-4 text-sm text-muted">
            Ha meglévő rendszert kell stabilizálni, írd le a jelenlegi helyzetet és visszajelzek a scope-ról.
          </div>
        </div>
      </section>

      <div className="mt-10">
        <Link href="mailto:info@promnet.hu" className="text-sm font-semibold text-accent">
          Kapcsolatfelvétel
        </Link>
      </div>
    </motion.section>
  );
}
