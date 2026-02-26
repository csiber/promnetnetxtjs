"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import {
  PiCodeThin,
  PiBrowsersThin,
  PiCloudThin,
  PiMegaphoneThin,
  PiStackThin,
} from "react-icons/pi";
import { motion, useReducedMotion } from "framer-motion";
import { trackCtaClick } from "@/lib/analytics";
import { portfolioProjects } from "@/data/portfolio-projects";
import { caseStudies } from "@/data/case-studies";
import InfoCard from "@/components/ui/InfoCard";

const heroText = {
  title: (
    <>
      Üdvözöllek a <span className="text-sm font-RubikMedium text-accent">PromNET</span>{" "}
      <span className="text-sm font-Rubik text-accent">stúdióban!</span>
    </>
  ),
  description: (
    <>
      Szia! Polyák Csaba vagyok. A fő fókuszom a backend fejlesztés és az ehhez kapcsolódó infrastruktúra.
      A játék/animáció/3D és az elektronikai szerviz mellékágként maradt meg.
      Ha webes munkáról van szó, azt csak akkor vállalom, ha szorosan kapcsolódik a backendhez.
    </>
  ),
};

const quickLinks = [
  {
    href: "/dashboard/case-studies/creatify",
    title: "Creatify esettanulmány",
    domain: "promnet.hu",
    description:
      "Backend és mérési háttér stabilizálása, folyamatok tisztázása, és az eredmények dokumentálása.",
    icon: <PiBrowsersThin aria-hidden="true" className="h-6 w-6" />,
    iconAlt: "Webes esettanulmány ikon",
  },
  {
    href: "https://blogocska.hu",
    title: "Technikai blog magyarul",
    domain: "blogocska.hu",
    description: "Jegyzetek, technikai leírások és rövid összefoglalók fejlesztőknek.",
    icon: <PiMegaphoneThin aria-hidden="true" className="h-6 w-6" />,
    iconAlt: "Blog ikon",
    external: true,
  },
];

const services = [
  {
    href: "/dashboard/hostingbuilder",
    title: "Backend & infrastruktúra",
    domain: "promnet.hu",
    description: "API-k, integrációk, CI/CD, monitorozás és üzemeltetés.",
    icon: <PiCloudThin aria-hidden="true" className="h-6 w-6" />,
    iconAlt: "Backend és infra ikon",
  },
  {
    href: "/dashboard/webdev",
    title: "Játék, animáció & 3D (mellékág)",
    domain: "promnet.hu",
    description: "Játék- és animációkészítés, 3D grafika, 3D modellezés és 3D nyomtatás.",
    icon: <PiBrowsersThin aria-hidden="true" className="h-6 w-6" />,
    iconAlt: "Játék és 3D ikon",
  },
  {
    href: "/dashboard/service",
    title: "Elektronikai szerviz (mellékág)",
    domain: "promnet.hu",
    description: "Notebook, PC és hálózati eszköz szerviz helyszíni kiszállással és gyors diagnosztikával.",
    icon: <PiStackThin aria-hidden="true" className="h-6 w-6" />,
    iconAlt: "Szerviz ikon",
  },
];

const collaborationSteps = [
  {
    title: "Felmérés és irány",
    description:
      "Közösen tisztázzuk a scope-ot, a rendszereket, a függőségeket és az ütemezést.",
    icon: <PiMegaphoneThin aria-hidden="true" className="h-6 w-6 text-cyan-200" />,
  },
  {
    title: "Gyártás és iteráció",
    description:
      "Backend fejlesztés, integrációk és infrastruktúra építés, átlátható review körökkel.",
    icon: <PiCodeThin aria-hidden="true" className="h-6 w-6 text-blue-200" />,
  },
  {
    title: "Átadás és támogatás",
    description: "Átadás, dokumentáció és opcionális üzemeltetési támogatás.",
    icon: <PiCloudThin aria-hidden="true" className="h-6 w-6 text-sky-200" />,
  },
];

function Homepage() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Összes");
  const [blogStatus, setBlogStatus] = useState({ state: "idle", message: "" });
  const shouldReduceMotion = useReducedMotion();
  const enableMotion = !shouldReduceMotion;

  useEffect(() => {
    let cancelled = false;
    const fetchPosts = async () => {
      setBlogStatus({ state: "loading", message: "Bejegyzések betöltése..." });
      try {
        const response = await fetch("/api/blog?limit=6");
        if (!response.ok) {
          throw new Error("Hálózati hiba");
        }
        const data = await response.json();
        if (cancelled) return;
        setBlogPosts(data.items ?? []);
        setBlogStatus({ state: "ready", message: "" });
      } catch (error) {
        console.error("Blog betöltési hiba", error);
        if (cancelled) return;
        setBlogStatus({
          state: "error",
          message: "Nem sikerült betölteni a cikkeket. Látogasd meg közvetlenül a blogot!",
        });
      }
    };

    fetchPosts();
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(() => {
    const unique = new Set();
    blogPosts.forEach((post) => {
      (post.categories ?? []).forEach((category) => unique.add(category));
    });
    return ["Összes", ...Array.from(unique)];
  }, [blogPosts]);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "Összes") {
      return blogPosts;
    }
    return blogPosts.filter((post) => (post.categories ?? []).includes(selectedCategory));
  }, [blogPosts, selectedCategory]);

  const heroSectionMotion = enableMotion
    ? {
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: "easeOut" },
      }
    : {
        initial: false,
        animate: { opacity: 1 },
        transition: { duration: 0 },
      };

  const floatingBadgeMotion = enableMotion
    ? {
        animate: { y: [0, -12, 0] },
        transition: { duration: 6, ease: "easeInOut", repeat: Infinity },
      }
    : {};

  const highlightedProjects = useMemo(() => {
    return portfolioProjects
      .filter((project) => project.status === "live")
      .sort((a, b) => (b.launch ?? "").localeCompare(a.launch ?? ""))
      .slice(0, 6);
  }, []);

  const projectSummary = useMemo(() => {
    const live = portfolioProjects.filter((project) => project.status === "live").length;
    const archived = portfolioProjects.filter((project) => project.status === "archived").length;
    const uniqueTags = new Set();
    portfolioProjects.forEach((project) => {
      project.tags.forEach((tag) => uniqueTags.add(tag));
    });

    return {
      total: portfolioProjects.length,
      live,
      archived,
      tags: uniqueTags.size,
    };
  }, []);

  return (
    <motion.section {...heroSectionMotion} className="relative">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-16 pt-10 lg:px-6">
        <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-card/70 p-8 shadow-[0_40px_120px_-60px_rgba(14,165,233,0.45)] backdrop-blur-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.25),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(37,99,235,0.25),transparent_60%)]" />
            <div className="relative space-y-6">
              <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.35em] text-muted">
                {["backend", "infra", "integrációk"].map((badge) => (
                  <span key={badge} className="neo-tag">
                    {badge}
                  </span>
                ))}
              </div>
              <div className="flex items-start gap-6">
                <motion.div
                  className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/90 to-blue-600 text-white shadow-xl shadow-cyan-500/30"
                  whileHover={enableMotion ? { rotate: 8, scale: 1.05 } : undefined}
                  {...floatingBadgeMotion}
                >
                  <PiCodeThin className="text-4xl" />
                </motion.div>
                <div className="space-y-4 text-foreground">
                  <h1 className="text-xl font-Rubik tracking-tight lg:text-3xl">{heroText.title}</h1>
                  <p className="text-sm leading-relaxed text-muted lg:text-base">{heroText.description}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="rounded-[2rem] border border-white/10 bg-card/60 p-6 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.3em] text-accent">Kapcsolat</p>
              <p className="mt-3 text-sm text-muted">
                Ha kérdésed van, írj vagy hívj. Röviden egyeztetünk, utána tisztán látni fogod a következő lépést.
              </p>
              <div className="mt-4 flex flex-col gap-3">
                <a
                  href="tel:+36205494107"
                  onClick={() => trackCtaClick("telefon", { location: "hero" })}
                  className="neo-button"
                >
                  Telefonhívás indítása
                </a>
                <a
                  href="mailto:info@promnet.hu"
                  onClick={() => trackCtaClick("email", { location: "hero" })}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-accent/40 px-6 py-3 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                >
                  E-mail írása
                </a>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 rounded-[2rem] border border-white/10 bg-card/60 p-5 text-center text-xs text-muted">
              {caseStudies[0].metrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-white/10 bg-card/70 p-3">
                  <span className="block text-lg font-RubikExtraBold text-accent">{metric.value}</span>
                  <span className="text-[10px] text-muted">{metric.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
          <div className="rounded-[2.5rem] border border-white/10 bg-card/70 p-6 shadow-[0_30px_90px_-60px_rgba(14,165,233,0.4)]">
            <span className="neo-chip">fókusz</span>
            <h2 className="mt-3 text-xl font-RubikMedium text-foreground">Megoldások backend, üzemeltetés és integrációk metszetében</h2>
            <p className="mt-3 text-sm text-muted">
              Három fókuszterület, ahol rendszereket teszek stabilabbá, gyorsabbá és karbantarthatóbbá.
              Ha kell, ebbe befér egy kisebb webes réteg is, de nem ez a fő irány.
            </p>
            <div className="mt-6 grid gap-3">
              {services.map((service) => (
                <InfoCard key={service.href} {...service} />
              ))}
            </div>
          </div>
          <div className="rounded-[2.5rem] border border-white/10 bg-card/60 p-6">
            <span className="neo-chip">esettanulmányok</span>
            <div className="mt-4 space-y-4">
              {caseStudies.map((caseStudy, index) => (
                <motion.article
                  key={caseStudy.client}
                  initial={enableMotion ? { opacity: 0, y: 16 } : false}
                  animate={enableMotion ? { opacity: 1, y: 0 } : { opacity: 1 }}
                  transition={enableMotion ? { delay: 0.08 * index, duration: 0.5 } : undefined}
                  className="rounded-2xl border border-white/10 bg-card/70 p-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base font-RubikMedium text-foreground">{caseStudy.client}</h3>
                      <span className="text-xs uppercase tracking-[0.25em] text-muted">{caseStudy.industry}</span>
                    </div>
                    <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">
                      {caseStudy.metrics[0]?.value ?? "eredmény"}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-muted">{caseStudy.summary}</p>
                  <Link
                    href={`/dashboard/case-studies/${caseStudy.slug}`}
                    className="mt-4 inline-flex w-fit items-center gap-2 text-xs font-RubikMedium text-accent"
                  >
                    Esettanulmány részletei
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.7fr,1.3fr]">
          <div className="rounded-[2.5rem] border border-white/10 bg-card/60 p-6">
            <span className="neo-chip">folyamat</span>
            <h2 className="mt-3 text-xl font-RubikMedium text-foreground">Így dolgozunk együtt</h2>
            <p className="mt-2 text-sm text-muted">
              A folyamat során először tisztázzuk az üzleti és technikai igényeket, utána jön a tervezés és a megvalósítás.
              Végig mérföldkövekkel és tiszta kommunikációval haladunk.
            </p>
            <div className="mt-6 space-y-4">
              {collaborationSteps.map((step, index) => (
                <div key={step.title} className="rounded-2xl border border-white/10 bg-card/70 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-RubikMedium text-foreground">{step.title}</span>
                    <span className="text-xs uppercase tracking-[0.3em] text-muted">0{index + 1}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[2.5rem] border border-white/10 bg-card/70 p-6">
            <span className="neo-chip">portfólió</span>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted">
              <span className="rounded-full border border-white/10 bg-card/60 px-3 py-1">Összes: {projectSummary.total}+</span>
              <span className="rounded-full border border-white/10 bg-card/60 px-3 py-1">Aktív: {projectSummary.live}</span>
              <span className="rounded-full border border-white/10 bg-card/60 px-3 py-1">Archív: {projectSummary.archived}</span>
            </div>
            <p className="mt-3 text-sm text-muted">
              Összegyűjtöttem a jelenleg is elérhető munkáimat egy modern, gyorsan áttekinthető listába.
              Többségük backend és infrastruktúra, de látszanak a mellékágak is.
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {highlightedProjects.map((project, index) => {
                const isLive = project.status === "live";
                return (
                  <motion.article
                    key={project.name}
                    className="flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-card/80 p-4"
                    initial={enableMotion ? { opacity: 0, y: 16 } : false}
                    animate={enableMotion ? { opacity: 1, y: 0 } : { opacity: 1 }}
                    transition={enableMotion ? { delay: 0.05 * index, duration: 0.5 } : undefined}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[11px] uppercase tracking-[0.3em] text-muted">{project.launch}</span>
                        <h3 className="text-base font-RubikMedium text-foreground">{project.name}</h3>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-RubikMedium uppercase tracking-wide ${
                          isLive ? "border border-accent/60 bg-accent/10 text-accent" : "border border-white/20 bg-white/5 text-muted"
                        }`}
                      >
                        <span className={`h-2 w-2 rounded-full ${isLive ? "bg-accent" : "bg-white/50"}`} />
                        {isLive ? "Élő" : "Archív"}
                      </span>
                    </div>
                    <p className="text-sm text-muted">{project.description}</p>
                    <div className="flex flex-wrap gap-2 text-[11px] text-muted">
                      {project.tags.map((tag) => (
                        <span key={`${project.name}-${tag}`} className="rounded-full border border-white/10 bg-card/60 px-2 py-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-2 text-xs font-RubikMedium text-accent"
                    >
                      {isLive ? "Megnyitás" : "Részletek"}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </motion.article>
                );
              })}
            </div>
            <Link
              href="/dashboard/portfolio"
              className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-accent/50 bg-accent/10 px-4 py-2 text-xs font-RubikMedium uppercase tracking-[0.25em] text-accent transition hover:-translate-y-0.5 hover:border-accent"
            >
              Teljes portfólió
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr,1fr]">
          <div className="rounded-[2.5rem] border border-white/10 bg-card/60 p-6">
            <span className="neo-chip">kiemelt tartalom</span>
            <h2 className="mt-3 text-xl font-semibold text-foreground lg:text-2xl">
              Gyorsan elérhető anyagok és inspirációk
            </h2>
            <p className="mt-2 text-sm text-muted lg:text-base">
              Valós projektekből származó tapasztalatok, dokumentált esettanulmányok és a kulisszák mögött készülő tartalmak.
            </p>
            <div className="mt-5 grid gap-4">
              {quickLinks.map((card, index) => (
                <motion.div
                  key={card.href}
                  className="h-full"
                  initial={enableMotion ? { opacity: 0, y: 16 } : false}
                  animate={enableMotion ? { opacity: 1, y: 0 } : { opacity: 1 }}
                  transition={enableMotion ? { delay: 0.1 * index, duration: 0.5 } : undefined}
                >
                  <InfoCard {...card} />
                </motion.div>
              ))}
            </div>
          </div>
          <div className="rounded-[2.5rem] border border-white/10 bg-card/70 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="neo-chip">friss cikkek</span>
                <h2 className="mt-3 text-xl font-RubikMedium text-foreground lg:text-2xl">Legújabb bejegyzések a blogról</h2>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                <label htmlFor="blog-category" className="text-[11px] uppercase tracking-[0.2em] text-muted">
                  Szűrés
                </label>
                <select
                  id="blog-category"
                  className="rounded-full border border-white/10 bg-card/70 px-3 py-2 text-xs text-foreground"
                  value={selectedCategory}
                  onChange={(event) => setSelectedCategory(event.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {blogStatus.state === "loading" ? <p className="mt-4 text-sm text-muted">{blogStatus.message}</p> : null}
            {blogStatus.state === "error" ? (
              <div className="mt-4 rounded-2xl border border-accent/40 bg-accent/10 p-4 text-sm text-accent">
                {blogStatus.message}{" "}
                <Link href="https://blogocska.hu" className="underline" target="_blank" rel="noopener noreferrer">
                  blogocska.hu
                </Link>
              </div>
            ) : null}
            <div className="mt-4 grid gap-4">
              {filteredPosts.slice(0, 3).map((post) => (
                <article
                  key={post.link}
                  className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-card/60 p-4 text-foreground"
                >
                  <span className="text-[11px] uppercase tracking-[0.3em] text-accent">
                    {(post.categories ?? ["Blog"])[0]}
                  </span>
                  <h3 className="text-base font-RubikMedium text-foreground">{post.title}</h3>
                  <p className="text-sm text-muted line-clamp-3">{post.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted">
                    <time dateTime={post.publishedAt}>{post.publishedRelative}</time>
                    <Link
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-accent"
                    >
                      Elolvasom
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
              {filteredPosts.length === 0 && blogStatus.state === "ready" ? (
                <p className="text-sm text-muted">
                  Ebben a kategóriában még nincs publikált bejegyzés. Nézz körül később, vagy válassz másik címkét.
                </p>
              ) : null}
            </div>
          </div>
        </section>
      </div>
    </motion.section>
  );
}

export default Homepage;
