import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { caseStudies } from "@/data/case-studies";

export default function CaseStudiesClient() {
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
        <p className="section-kicker">Esettanulmányok</p>
        <h1 className="section-title mt-3">Valós rendszerek, mérhető eredmények</h1>
        <p className="section-body max-w-2xl">
          Két példa, ahol a backend és az infrastruktúra stabilizálása volt a kulcs. Rövid, őszinte összefoglalók,
          a lényegre fókuszálva.
        </p>
      </header>

      <div className="mt-10 grid gap-6">
        {caseStudies.map((study, index) => (
          <motion.article
            key={study.slug}
            className="rounded-xl border border-white/10 bg-card/70 p-6"
            initial={enableMotion ? { opacity: 0, y: 16 } : false}
            animate={enableMotion ? { opacity: 1, y: 0 } : { opacity: 1 }}
            transition={enableMotion ? { delay: 0.1 * index, duration: 0.5 } : undefined}
          >
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-foreground">{study.client}</h2>
                <p className="text-sm text-muted">{study.overview?.title ?? study.industry}</p>
              </div>
              <Link
                href={`/dashboard/case-studies/${study.slug}`}
                className="text-sm font-semibold text-accent"
              >
                Részletek
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted">{study.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted">
              {study.metrics.map((metric) => (
                <span
                  key={`${study.slug}-${metric.label}`}
                  className="rounded-full border border-white/10 bg-card/60 px-3 py-1"
                >
                  {metric.label}: {metric.value}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}
