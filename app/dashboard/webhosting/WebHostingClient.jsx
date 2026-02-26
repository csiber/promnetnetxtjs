"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

const highlights = [
  "Menedszelt webhosting",
  "Biztonsági mentések",
  "Teljesítmény monitorozás",
  "Gyors hibaelhárítás",
];

export default function WebHostingClient() {
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
        <p className="section-kicker">Webhosting</p>
        <h1 className="section-title mt-3">Stabil webhosting, tiszta üzemeltetéssel</h1>
        <p className="section-body max-w-2xl">
          Ha webes réteg is szükséges a backend mellé, menedzselt hostingot és felügyeletet adok. Nem tömegszolgáltatás,
          hanem kontrollált üzemeltetés.
        </p>
      </header>

      <section className="mt-10 rounded-xl border border-white/10 bg-card/70 p-6">
        <h2 className="text-lg font-semibold text-foreground">Fókusz</h2>
        <ul className="mt-4 space-y-2 text-sm text-muted">
          {highlights.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-10">
        <Link href="mailto:info@promnet.hu" className="text-sm font-semibold text-accent">
          Kapcsolatfelvétel
        </Link>
      </div>
    </motion.section>
  );
}
