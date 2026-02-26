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
      Szia! Polyák Csaba vagyok, játék- és animációkészítéssel, 3D grafikával, 3D modellezéssel és 3D nyomtatással
      foglalkozom. Webfejlesztési megkereséseket már nem vállalok, a fókusz a kreatív és technikai 3D munkákon van az
      ötlettől a végső átadásig.
    </>
  ),
};

const quickLinks = [
  {
    href: "/dashboard/case-studies/creatify",
    title: "Creatify esettanulmány",
    domain: "promnet.hu",
    description:
      "32%-os konverziónövekedés UX finomhangolással, célzott mérésekkel és működő csatornák optimalizálásával.",
    icon: <PiBrowsersThin aria-hidden="true" className="h-6 w-6" />,
    iconAlt: "Webes esettanulmány ikon",
  },
  {
    href: "https://blogocska.hu",
    title: "Technikai blog magyarul",
    domain: "blogocska.hu",
    description: "Tananyagok és kulisszatitkok fejlesztőknek, marketingeseknek és üzleti döntéshozóknak.",
    icon: <PiMegaphoneThin aria-hidden="true" className="h-6 w-6" />,
    iconAlt: "Blog ikon",
    external: true,
  },
];

const services = [
  {
    href: "/dashboard/webdev",
    title: "Játék, animáció & 3D",
    domain: "promnet.hu",
    description: "Játék- és animációkészítés, 3D grafika, 3D modellezés és 3D nyomtatás.",
    icon: <PiBrowsersThin aria-hidden="true" className="h-6 w-6" />,
    iconAlt: "Játék és 3D ikon",
  },
  {
    href: "/dashboard/hostingbuilder",
    title: "Hosting & DevOps",
    domain: "promnet.hu",
    description: "Felhős infrastruktúra, CI/CD, biztonsági mentések és monitorozás egy kézből.",
    icon: <PiCloudThin aria-hidden="true" className="h-6 w-6" />,
    iconAlt: "Felhő infrastruktúra ikon",
  },
  {
    href: "/dashboard/service",
    title: "Elektronikai szerviz",
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
      "Közösen meghatározzuk a briefet, a kreatív irányt, a terjedelmet és az ütemezést a játék, animáció vagy 3D projektben.",
    icon: <PiMegaphoneThin aria-hidden="true" className="h-6 w-6 text-cyan-200" />,
  },
  {
    title: "Gyártás és iteráció",
    description:
      "Modellezés, textúrázás, animáció és interaktív prototípusok, átlátható review körökkel és frissítésekkel.",
    icon: <PiCodeThin aria-hidden="true" className="h-6 w-6 text-blue-200" />,
  },
  {
    title: "Átadás és támogatás",
    description:
      "Végső render, assetek vagy nyomtatásra kész fájlok dokumentált átadással és opcionális támogatással.",
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
    <motion.section
      {...heroSectionMotion}
      className="neo-shell"
    >
      <div className="neo-titlebar">
        <div className="neo-dots">
          <span className="neo-dot" />
          <span className="neo-dot" />
          <span className="neo-dot" />
        </div>
        <span>PromNET Desktop</span>
        <span className="text-[10px] text-muted">auto day/night</span>
      </div>
      <div className="relative flex w-full flex-col gap-12 p-6 lg:p-12">
        <div className="grid gap-10 lg:grid-cols-[auto,1fr] lg:items-center">
          <motion.div
            className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400/90 to-blue-600 text-white shadow-xl shadow-cyan-500/30 lg:h-32 lg:w-32"
            whileHover={enableMotion ? { rotate: 8, scale: 1.05 } : undefined}
            {...floatingBadgeMotion}
          >
            <PiCodeThin className="text-6xl" />
            <motion.span
              className="absolute -bottom-4 right-0 rounded-full border border-cyan-200/40 bg-cyan-400/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-white"
              initial={enableMotion ? { opacity: 0, y: 10 } : false}
              animate={enableMotion ? { opacity: 1, y: 0 } : { opacity: 1 }}
              transition={enableMotion ? { delay: 0.6, duration: 0.6 } : undefined}
            >
              kreativitás
            </motion.span>
          </motion.div>
          <div className="space-y-6 text-foreground">
            <h1 className="text-lg font-Rubik tracking-tight lg:text-2xl">{heroText.title}</h1>
            <p className="text-sm leading-relaxed text-muted lg:text-base">{heroText.description}</p>
            <motion.div
              className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.4em] text-muted"
              initial={enableMotion ? "hidden" : false}
              animate={enableMotion ? "visible" : undefined}
              variants={
                enableMotion
                  ? {
                      hidden: { opacity: 0, y: 10 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { staggerChildren: 0.15 },
                      },
                    }
                  : undefined
              }
            >
              {["full stack", "design", "hosting"].map((badge) => (
                <motion.span
                  key={badge}
                  className="neo-tag"
                  variants={
                    enableMotion
                      ? { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }
                      : undefined
                  }
                >
                  {badge}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div
          className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-card/70 shadow-[0_60px_120px_-55px_rgba(14,165,233,0.45)]"
          whileHover={enableMotion ? { scale: 1.01 } : undefined}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.35),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(37,99,235,0.35),transparent_60%)]"
          />
          <motion.div
            className="relative flex flex-col gap-8 rounded-[2.5rem] bg-gradient-to-br from-black/40 via-black/20 to-black/40 p-8 text-foreground md:flex-row md:items-center md:justify-between"
            initial={enableMotion ? { opacity: 0, y: 24 } : false}
            animate={enableMotion ? { opacity: 1, y: 0 } : { opacity: 1 }}
            transition={enableMotion ? { delay: 0.2, duration: 0.6 } : undefined}
          >
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-accent">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 5.25c0 8.284 6.716 15 15 15h2.25a1.5 1.5 0 001.5-1.5v-2.799a1.5 1.5 0 00-1.329-1.494l-3.558-.406a1.5 1.5 0 00-1.38.784l-.83 1.537a11.048 11.048 0 01-4.943-4.943l1.537-.83a1.5 1.5 0 00.784-1.38l-.406-3.558A1.5 1.5 0 009.048 3H6.75a1.5 1.5 0 00-1.5 1.5V5.25z"
                    />
                  </svg>
                </span>
                Kérdésed van? Hívj bizalommal!
              </span>
              <p className="text-base leading-relaxed text-foreground md:text-lg">
                Ha bármilyen kérdésed lenne, hívj vagy írj, és megbeszéljük a részleteket. Mondd el, mit szeretnél elérni, és biztosan találunk rá megoldást!
              </p>
            </div>
            <div className="flex flex-col gap-3 text-sm text-foreground md:w-auto md:min-w-[240px] md:text-base">
              <a
                href="tel:+36205494107"
                onClick={() => trackCtaClick("telefon", { location: "hero" })}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-accent-foreground shadow-[0_20px_40px_-20px_rgba(14,165,233,0.65)] transition hover:-translate-y-0.5 hover:bg-sky-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 5.25c0 8.284 6.716 15 15 15h2.25a1.5 1.5 0 001.5-1.5v-2.799a1.5 1.5 0 00-1.329-1.494l-3.558-.406a1.5 1.5 0 00-1.38.784l-.83 1.537a11.048 11.048 0 01-4.943-4.943l1.537-.83a1.5 1.5 0 00.784-1.38l-.406-3.558A1.5 1.5 0 009.048 3H6.75a1.5 1.5 0 00-1.5 1.5V5.25z"
                  />
                </svg>
                Telefonhívás indítása
              </a>
              <a
                href="mailto:info@promnet.hu"
                onClick={() => trackCtaClick("email", { location: "hero" })}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-accent/40 px-6 py-3 font-semibold text-foreground transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-6.75 4.05a2.25 2.25 0 01-2.26 0l-6.75-4.05a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                E-mail írása
              </a>
            </div>
          </motion.div>
        </motion.div>

        <section className="neo-panel grid gap-6 lg:grid-cols-[1fr,1fr]">
          <div className="flex flex-col justify-between gap-4">
            <div className="space-y-3">
              <span className="neo-chip">
                üzleti eredmények
              </span>
              <h2 className="text-xl font-RubikMedium text-foreground lg:text-2xl">Valós példák, mérhető hatás</h2>
              <p className="text-sm leading-relaxed text-muted lg:text-base">
                A PromNET projekteknél a modern technológiát stratégiai megközelítéssel kombinálom. A cél minden esetben az, hogy a megjelenés mellett a konverzió, az ügyfélelégedettség és az üzemeltetés is javuljon.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center text-xs font-RubikMedium uppercase tracking-[0.2em] text-muted">
              {caseStudies[0].metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-white/10 bg-card/60 px-3 py-4 text-foreground shadow-inner"
                >
                  <span className="block text-lg font-RubikExtraBold text-accent">{metric.value}</span>
                  <span className="text-[10px] text-muted">{metric.label}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted">
              *A teljesítménymutatókat minden projekt elején rögzítjük, és átadáskor riportban dokumentáljuk.
            </p>
          </div>
          <div className="space-y-4">
            {caseStudies.map((caseStudy, index) => (
              <motion.article
                key={caseStudy.client}
                initial={enableMotion ? { opacity: 0, y: 16 } : false}
                animate={enableMotion ? { opacity: 1, y: 0 } : { opacity: 1 }}
                transition={enableMotion ? { delay: 0.1 * index, duration: 0.5 } : undefined}
                className="group flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-gradient-to-br from-card/80 via-card/60 to-card/80 p-6 shadow-[0_30px_90px_-50px_rgba(14,165,233,0.4)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-RubikMedium text-foreground">{caseStudy.client}</h3>
                    <span className="text-xs uppercase tracking-[0.25em] text-muted">{caseStudy.industry}</span>
                  </div>
                  <span className="inline-flex items-center justify-center rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">
                    siker
                  </span>
                </div>
                <p className="text-sm text-muted">{caseStudy.summary}</p>
                <div className="flex flex-wrap gap-2 text-[11px] text-muted">
                  {caseStudy.metrics.map((metric) => (
                    <span
                      key={`${caseStudy.client}-${metric.label}`}
                      className="rounded-full border border-white/10 bg-card/60 px-3 py-1 text-foreground"
                    >
                      {metric.label}: {metric.value}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/dashboard/case-studies/${caseStudy.slug}`}
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/40 px-4 py-2 text-xs font-RubikMedium text-accent transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                >
                  Esettanulmány részletei
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="neo-panel grid gap-6 lg:grid-cols-[320px,1fr]">
          <div className="flex flex-col gap-4">
            <span className="neo-chip">
              portfólió frissítés
            </span>
            <h2 className="text-xl font-RubikMedium text-foreground lg:text-2xl">
              Legfrissebb, élő webes projektek
            </h2>
            <p className="text-sm leading-relaxed text-muted lg:text-base">
              Összegyűjtöttem a jelenleg is elérhető munkáimat egy modern, gyorsan áttekinthető listába. Nézd meg, milyen megoldásokkal segítem a partnereket a digitális térben.
            </p>
            <div className="grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-card/60 p-4 text-xs text-muted">
              <div>
                <span className="block text-[11px] uppercase tracking-[0.3em] text-muted">Összes projekt</span>
                <span className="text-2xl font-RubikExtraBold text-foreground">{projectSummary.total}+</span>
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-[0.3em] text-muted">Aktív</span>
                <span className="text-2xl font-RubikExtraBold text-accent">{projectSummary.live}</span>
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-[0.3em] text-muted">Archív</span>
                <span className="text-2xl font-RubikExtraBold text-foreground">{projectSummary.archived}</span>
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-[0.3em] text-muted">Kategóriák</span>
                <span className="text-2xl font-RubikExtraBold text-accent">{projectSummary.tags}</span>
              </div>
            </div>
            <Link
              href="/dashboard/portfolio"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/50 bg-accent/10 px-5 py-2 text-xs font-RubikMedium uppercase tracking-[0.25em] text-accent transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
            >
              Teljes portfólió megnyitása
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {highlightedProjects.map((project, index) => {
              const isLive = project.status === "live";

              return (
                <motion.article
                  key={project.name}
                  className="flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-card/70 p-5 shadow-[0_30px_80px_-60px_rgba(14,165,233,0.4)] transition hover:-translate-y-1 hover:border-white/30"
                  initial={enableMotion ? { opacity: 0, y: 16 } : false}
                  animate={enableMotion ? { opacity: 1, y: 0 } : { opacity: 1 }}
                  transition={enableMotion ? { delay: 0.05 * index, duration: 0.5 } : undefined}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] uppercase tracking-[0.3em] text-muted">{project.launch}</span>
                      <h3 className="text-base font-RubikMedium text-foreground">{project.name}</h3>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-RubikMedium uppercase tracking-wide ${
                        isLive
                          ? "border border-accent/60 bg-accent/10 text-accent"
                          : "border border-white/20 bg-white/5 text-muted"
                      }`}
                    >
                      <span className={`h-2 w-2 rounded-full ${isLive ? "bg-accent" : "bg-white/50"}`} />
                      {isLive ? "Élő" : "Archív"}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted">{project.description}</p>
                  <div className="flex flex-wrap gap-2 text-[11px] text-muted">
                    {project.tags.map((tag) => (
                      <span key={`${project.name}-${tag}`} className="rounded-full border border-white/10 bg-card/60 px-2 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-3 text-xs text-muted">
                    {project.statusNote ? <span className="text-accent">{project.statusNote}</span> : <span />}
                    <Link
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-RubikMedium transition ${
                        isLive
                          ? "border border-accent/60 text-accent hover:border-accent hover:text-accent"
                          : "border border-white/10 text-muted hover:border-accent/40 hover:text-accent"
                      }`}
                    >
                      {isLive ? "Megnyitás" : "Részletek"}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="neo-panel-soft grid gap-6">
          <div className="flex flex-col gap-3">
            <span className="neo-chip">
              együttműködés
            </span>
            <h2 className="text-xl font-RubikMedium text-foreground lg:text-2xl">Így lesz az ötletből kézzelfogható digitális megoldás</h2>
            <p className="text-sm text-muted lg:text-base">
              A folyamat minden lépésénél fókuszban tartjuk az üzleti céljaidat: közösen térképezzük fel a kihívásokat, majd transzparens mérföldkövekkel haladunk a bevezetésig.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {collaborationSteps.map((step, index) => (
              <motion.article
                key={step.title}
                className="flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-card/60 p-6"
                initial={enableMotion ? { opacity: 0, y: 20 } : {}}
                animate={enableMotion ? { opacity: 1, y: 0 } : { opacity: 1 }}
                transition={enableMotion ? { delay: 0.1 * index, duration: 0.5 } : undefined}
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-card/70">
                  {step.icon}
                </span>
                <div className="space-y-2">
                  <h3 className="text-base font-RubikMedium text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted">{step.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-card/60 p-6 text-sm text-muted">
            <p className="max-w-2xl">
              Ha szeretnél személyre szabott ajánlatot vagy részletesebb tervet kapni, írj egy rövid bemutatkozást a projektedről, és 24 órán belül válaszolok.
            </p>
            <Link
              href="mailto:info@promnet.hu"
              className="inline-flex items-center gap-2 rounded-full border border-accent/60 bg-accent/10 px-4 py-2 text-sm font-RubikMedium text-accent transition hover:border-accent hover:text-accent"
              onClick={() => trackCtaClick("kapcsolat-email", { location: "homepage-collaboration" })}
            >
              Kapcsolatfelvétel
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

        <section className="neo-panel-soft space-y-6 shadow-soft">
          <div className="space-y-3">
            <span className="promnet-badge">kiemelt tartalom</span>
            <h2 className="text-xl font-semibold text-foreground lg:text-2xl">
              Gyorsan elérhető anyagok és inspirációk
            </h2>
            <p className="text-sm text-muted lg:text-base">
              Valós projektekből származó tapasztalatok, dokumentált esettanulmányok és a kulisszák mögött készülő tartalmak.
            </p>
          </div>
          <div className="promnet-grid">
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
        </section>

        <section className="neo-panel-soft grid gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="neo-chip">
                friss cikkek
              </span>
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
          {blogStatus.state === "loading" ? (
            <p className="text-sm text-muted">{blogStatus.message}</p>
          ) : null}
          {blogStatus.state === "error" ? (
            <div className="rounded-2xl border border-accent/40 bg-accent/10 p-4 text-sm text-accent">
              {blogStatus.message}{" "}
              <Link href="https://blogocska.hu" className="underline" target="_blank" rel="noopener noreferrer">
                blogocska.hu
              </Link>
            </div>
          ) : null}
          <div className="grid gap-4 md:grid-cols-3">
            {filteredPosts.slice(0, 3).map((post) => (
              <article
                key={post.link}
                className="flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-card/60 p-5 text-foreground"
              >
                <span className="text-[11px] uppercase tracking-[0.3em] text-accent">
                  {(post.categories ?? ["Blog"])[0]}
                </span>
                <h3 className="text-base font-RubikMedium text-foreground">{post.title}</h3>
                <p className="text-sm text-muted line-clamp-4">{post.description}</p>
                <div className="mt-auto flex items-center justify-between text-xs text-muted">
                  <time dateTime={post.publishedAt}>{post.publishedRelative}</time>
                  <Link
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-accent transition hover:text-accent"
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
        </section>

        <section className="neo-panel-soft space-y-6 shadow-soft">
          <div className="space-y-3">
            <span className="promnet-badge">szolgáltatások</span>
            <h2 className="text-xl font-semibold text-foreground lg:text-2xl">
              Megoldások a stratégia, fejlesztés és üzemeltetés metszetében
            </h2>
            <p className="text-sm text-muted lg:text-base">
              Három fókuszterület, ahol mérhető üzleti eredményeket szállítok – legyen szó új digitális termék építéséről vagy meglévő infrastruktúra stabilizálásáról.
            </p>
          </div>
          <div className="promnet-grid">
            {services.map((service, index) => (
              <motion.div
                key={service.href}
                className="h-full"
                initial={enableMotion ? { opacity: 0, y: 18 } : false}
                animate={enableMotion ? { opacity: 1, y: 0 } : { opacity: 1 }}
                transition={enableMotion ? { delay: 0.12 * index, duration: 0.5 } : undefined}
              >
                <InfoCard {...service} />
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </motion.section>
  );
}

export default Homepage;
