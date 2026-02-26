import Link from "next/link";
import { caseStudies } from "@/data/case-studies";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("/dashboard/case-studies");

export default function CaseStudiesPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 pb-16 pt-12">
      <header className="space-y-4">
        <p className="section-kicker">Esettanulmányok</p>
        <h1 className="section-title mt-3">Valós rendszerek, mérhető eredmények</h1>
        <p className="section-body max-w-2xl">
          Két példa, ahol a backend és az infrastruktúra stabilizálása volt a kulcs. A fókusz nem a látványon,
          hanem a működésen és a skálázhatóságon volt.
        </p>
      </header>

      <section className="mt-10 space-y-6">
        {caseStudies.map((study) => (
          <article
            key={study.slug}
            className="rounded-xl border border-white/10 bg-card/70 p-6"
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
          </article>
        ))}
      </section>
    </div>
  );
}
