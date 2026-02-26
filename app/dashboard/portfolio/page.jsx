import Link from "next/link";
import { portfolioProjects } from "@/data/portfolio-projects";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("/dashboard/portfolio");

export default function PortfolioPage() {
  const total = portfolioProjects.length;
  const live = portfolioProjects.filter((project) => project.status === "live").length;
  const archived = portfolioProjects.filter((project) => project.status === "archived").length;

  return (
    <div className="mx-auto w-full max-w-5xl px-6 pb-16 pt-12">
      <header className="space-y-4">
        <p className="section-kicker">Portfólió</p>
        <h1 className="section-title mt-3">Backend és webes projektek listája</h1>
        <p className="section-body max-w-2xl">
          Itt van minden releváns projekt egy helyen. Az élő és az archív munkákat külön jelölöm, hogy tiszta legyen a kép.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted">
          <span className="rounded-full border border-white/10 bg-card/60 px-3 py-1">Összes: {total}</span>
          <span className="rounded-full border border-white/10 bg-card/60 px-3 py-1">Aktív: {live}</span>
          <span className="rounded-full border border-white/10 bg-card/60 px-3 py-1">Archív: {archived}</span>
        </div>
      </header>

      <section className="mt-10 space-y-6">
        {portfolioProjects.map((project) => (
          <article key={project.name} className="border-b border-white/10 pb-6">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-foreground">{project.name}</h2>
                  <span className="text-[11px] uppercase tracking-[0.25em] text-muted">
                    {project.status === "live" ? "élő" : "archív"}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted">{project.description}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.25em] text-muted">
                  {project.tags.join(" · ")}
                </p>
              </div>
              <Link
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-accent"
              >
                Megnyitás
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
