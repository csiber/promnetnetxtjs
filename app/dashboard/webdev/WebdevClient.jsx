"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

const packages = [
  {
    name: "Játék- és animációkészítés",
    description: "Storyboard, animáció, VFX és átadás ütemezett formában.",
  },
  {
    name: "3D grafika & vizualizáció",
    description: "Fotorealisztikus render, assetek és vizuális anyagok.",
  },
  {
    name: "3D modellezés & nyomtatás",
    description: "Nyomtatható modellek, ellenőrzött topológia, technikai fájlok.",
  },
];

export default function WebdevClient() {
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
        <p className="section-kicker">Játék / 3D</p>
        <h1 className="section-title mt-3">Játék, animáció és 3D (mellékág)</h1>
        <p className="section-body max-w-2xl">
          Ez mellékág, nem a fő profil. Ha backendhez kapcsolódó igényed van, az elsőbbséget élvez.
        </p>
      </header>

      <section className="mt-10 space-y-4">
        {packages.map((pkg) => (
          <article key={pkg.name} className="rounded-xl border border-white/10 bg-card/70 p-6">
            <h2 className="text-lg font-semibold text-foreground">{pkg.name}</h2>
            <p className="mt-2 text-sm text-muted">{pkg.description}</p>
          </article>
        ))}
      </section>

      <div className="mt-10">
        <Link href="mailto:info@promnet.hu" className="text-sm font-semibold text-accent">
          Kapcsolatfelvétel
        </Link>
      </div>
    </motion.section>
  );
}
