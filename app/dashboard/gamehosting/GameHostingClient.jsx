"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

const highlights = [
  "Dedikált erőforrások",
  "DDoS védelem",
  "Skálázható kapacitás",
  "Monitorozás és üzemeltetés",
];

export default function GameHostingClient() {
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
        <p className="section-kicker">Játékszerver</p>
        <h1 className="section-title mt-3">Stabil játékszerver infrastruktúra</h1>
        <p className="section-body max-w-2xl">
          Ha alacsony késleltetés és stabil üzemeltetés kell, erre van a szolgáltatás. A cél a folyamatos elérhetőség.
        </p>
      </header>

      <section className="mt-10 rounded-xl border border-white/10 bg-card/70 p-6">
        <h2 className="text-lg font-semibold text-foreground">Főbb pontok</h2>
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
