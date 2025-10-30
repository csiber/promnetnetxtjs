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
      Üdvözöllek a <span className="text-sm font-RubikMedium text-neutral-200">PromNET</span>{" "}
      <span className="text-sm font-Rubik text-neutral-200">oldalon!</span>
    </>
  ),
  description: (
    <>
      Szia! Polyák Csaba vagyok, full stack fejlesztő, aki szenvedélyesen tervez és hoz létre modern,
      felhasználóbarát webes megoldásokat. Tapasztalatom segít abban, hogy ügyfeleimnek egyedi és hatékony online jelenlétet
      biztosítsak – a stratégiától az üzemeltetésig.
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
    title: "Webfejlesztés & UX",
    domain: "promnet.hu",
    description: "Digitális termékek tervezése és fejlesztése mérésekkel, SEO-val és üzleti fókuszú UX-szel.",
    icon: <PiBrowsersThin aria-hidden="true" className="h-6 w-6" />,
    iconAlt: "Webfejlesztés ikon",
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
    title: "Felmérés és célkitűzés",
    description:
      "Közösen elemezzük a jelenlegi digitális jelenlétedet, majd meghatározzuk az üzleti célokat és mérőszámokat.",
    icon: <PiMegaphoneThin aria-hidden="true" className="h-6 w-6 text-sky-200" />,
  },
  {
    title: "Megoldás-tervezés",
    description:
      "Prototípusokat, UX koncepciót és technológiai tervet készítek, hogy pontosan lásd, milyen irányba indulunk.",
    icon: <PiCodeThin aria-hidden="true" className="h-6 w-6 text-emerald-200" />,
  },
  {
    title: "Megvalósítás és támogatás",
    description:
      "Iteratív fejlesztés, folyamatos visszajelzés és átlátható státuszriportok mellett jutunk el az éles indításig.",
    icon: <PiCloudThin aria-hidden="true" className="h-6 w-6 text-amber-200" />,
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

  const pulseMotion = enableMotion
    ? {
        animate: { scale: [1, 1.08, 1], opacity: [0.5, 0.9, 0.5] },
        transition: { duration: 8, ease: "easeInOut", repeat: Infinity },
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
      className="relative w-full overflow-hidden rounded-[3rem]"
    >
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-[#10051c] via-neutral-950 to-black" />
      <motion.div
        className="absolute -left-24 top-1/3 -z-10 h-64 w-64 rounded-full bg-violet-700/40 blur-3xl"
        {...pulseMotion}
      />
      <motion.div
        className="absolute -right-16 top-10 -z-10 h-72 w-72 rounded-full bg-fuchsia-700/40 blur-3xl"
        {...pulseMotion}
      />
      <motion.div
        className="absolute bottom-10 left-1/2 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-600/40 blur-3xl"
        {...pulseMotion}
      />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-14 rounded-[2.75rem] border border-white/5 bg-white/5 p-6 shadow-[0_0_100px_-20px_rgba(168,85,247,0.45)] backdrop-blur-2xl lg:p-12">
        <div className="grid gap-10 lg:grid-cols-[auto,1fr] lg:items-center">
          <motion.div
            className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-xl shadow-violet-500/40 lg:h-32 lg:w-32"
            whileHover={enableMotion ? { rotate: 8, scale: 1.05 } : undefined}
            {...floatingBadgeMotion}
          >
            <PiCodeThin className="text-6xl" />
            <motion.span
              className="absolute -bottom-4 right-0 rounded-full bg-fuchsia-400/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-100"
              initial={enableMotion ? { opacity: 0, y: 10 } : false}
              animate={enableMotion ? { opacity: 1, y: 0 } : { opacity: 1 }}
              transition={enableMotion ? { delay: 0.6, duration: 0.6 } : undefined}
            >
              kreativitás
            </motion.span>
          </motion.div>
          <div className="space-y-6 text-neutral-100">
            <h1 className="text-lg font-Rubik tracking-tight lg:text-2xl">{heroText.title}</h1>
            <p className="text-sm leading-relaxed text-neutral-300 lg:text-base">{heroText.description}</p>
            <motion.div
              className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.4em] text-neutral-400"
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
                  className="rounded-full border border-white/10 px-4 py-2 backdrop-blur-lg"
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
          className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-neutral-950/80 shadow-[0_60px_120px_-50px_rgba(99,102,241,0.55)]"
          whileHover={enableMotion ? { scale: 1.01 } : undefined}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.35),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.3),transparent_60%)]"
          />
          <motion.div
            className="relative flex flex-col gap-8 rounded-[2.5rem] bg-gradient-to-br from-black/70 via-black/40 to-black/60 p-8 text-neutral-100 md:flex-row md:items-center md:justify-between"
            initial={enableMotion ? { opacity: 0, y: 24 } : false}
            animate={enableMotion ? { opacity: 1, y: 0 } : { opacity: 1 }}
            transition={enableMotion ? { delay: 0.2, duration: 0.6 } : undefined}
          >
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-amber-200">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-200/10 text-amber-200">
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
              <p className="text-base leading-relaxed text-neutral-100 md:text-lg">
                Ha bármilyen kérdésed lenne, hívj vagy írj, és megbeszéljük a részleteket. Mondd el, mit szeretnél elérni, és biztosan találunk rá megoldást!
              </p>
            </div>
            <div className="flex flex-col gap-3 text-sm text-neutral-200 md:w-auto md:min-w-[240px] md:text-base">
              <a
                href="tel:+36205494107"
                onClick={() => trackCtaClick("telefon", { location: "hero" })}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-300 px-6 py-3 font-semibold text-black shadow-[0_20px_40px_-20px_rgba(250,204,21,0.75)] transition hover:-translate-y-0.5 hover:bg-amber-200"
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
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-neutral-100 transition hover:-translate-y-0.5 hover:border-white/40 hover:text-white"
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

        <section className="grid gap-6 rounded-[2.5rem] border border-white/10 bg-neutral-950/70 p-6 shadow-[0_40px_100px_-60px_rgba(59,130,246,0.6)] lg:grid-cols-[1fr,1fr] lg:p-12">
          <div className="flex flex-col justify-between gap-4">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-500/40 bg-fuchsia-500/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-fuchsia-200">
                üzleti eredmények
              </span>
              <h2 className="text-xl font-RubikMedium text-neutral-50 lg:text-2xl">Valós példák, mérhető hatás</h2>
              <p className="text-sm leading-relaxed text-neutral-300 lg:text-base">
                A PromNET projekteknél a modern technológiát stratégiai megközelítéssel kombinálom. A cél minden esetben az, hogy a megjelenés mellett a konverzió, az ügyfélelégedettség és az üzemeltetés is javuljon.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center text-xs font-RubikMedium uppercase tracking-[0.2em] text-neutral-300">
              {caseStudies[0].metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-3 py-4 text-neutral-100 shadow-inner"
                >
                  <span className="block text-lg font-RubikExtraBold text-amber-200">{metric.value}</span>
                  <span className="text-[10px] text-neutral-400">{metric.label}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-neutral-500">
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
                className="group flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-gradient-to-br from-neutral-900/80 via-neutral-900/40 to-neutral-800/80 p-6 shadow-[0_30px_90px_-40px_rgba(168,85,247,0.4)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-RubikMedium text-neutral-50">{caseStudy.client}</h3>
                    <span className="text-xs uppercase tracking-[0.25em] text-neutral-400">{caseStudy.industry}</span>
                  </div>
                  <span className="inline-flex items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-emerald-200">
                    siker
                  </span>
                </div>
                <p className="text-sm text-neutral-300">{caseStudy.summary}</p>
                <div className="flex flex-wrap gap-2 text-[11px] text-neutral-400">
                  {caseStudy.metrics.map((metric) => (
                    <span
                      key={`${caseStudy.client}-${metric.label}`}
                      className="rounded-full border border-white/10 bg-neutral-950/40 px-3 py-1 text-neutral-200"
                    >
                      {metric.label}: {metric.value}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/dashboard/case-studies/${caseStudy.slug}`}
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-fuchsia-400/30 px-4 py-2 text-xs font-RubikMedium text-fuchsia-200 transition hover:-translate-y-0.5 hover:border-fuchsia-200 hover:text-fuchsia-100"
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

        <section className="grid gap-6 rounded-[2.5rem] border border-white/10 bg-neutral-950/70 p-6 lg:grid-cols-[320px,1fr] lg:p-12">
          <div className="flex flex-col gap-4">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-200">
              portfólió frissítés
            </span>
            <h2 className="text-xl font-RubikMedium text-neutral-50 lg:text-2xl">
              Legfrissebb, élő webes projektek
            </h2>
            <p className="text-sm leading-relaxed text-neutral-300 lg:text-base">
              Összegyűjtöttem a jelenleg is elérhető munkáimat egy modern, gyorsan áttekinthető listába. Nézd meg, milyen megoldásokkal segítem a partnereket a digitális térben.
            </p>
            <div className="grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-neutral-200">
              <div>
                <span className="block text-[11px] uppercase tracking-[0.3em] text-neutral-500">Összes projekt</span>
                <span className="text-2xl font-RubikExtraBold text-neutral-50">{projectSummary.total}+</span>
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-[0.3em] text-neutral-500">Aktív</span>
                <span className="text-2xl font-RubikExtraBold text-emerald-200">{projectSummary.live}</span>
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-[0.3em] text-neutral-500">Archív</span>
                <span className="text-2xl font-RubikExtraBold text-rose-200">{projectSummary.archived}</span>
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-[0.3em] text-neutral-500">Kategóriák</span>
                <span className="text-2xl font-RubikExtraBold text-amber-200">{projectSummary.tags}</span>
              </div>
            </div>
            <Link
              href="/dashboard/portfolio"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-5 py-2 text-xs font-RubikMedium uppercase tracking-[0.25em] text-amber-100 transition hover:-translate-y-0.5 hover:border-amber-200 hover:text-amber-50"
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
                  className="flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-neutral-900/70 p-5 shadow-[0_30px_80px_-50px_rgba(245,158,11,0.45)] transition hover:-translate-y-1 hover:border-white/30"
                  initial={enableMotion ? { opacity: 0, y: 16 } : false}
                  animate={enableMotion ? { opacity: 1, y: 0 } : { opacity: 1 }}
                  transition={enableMotion ? { delay: 0.05 * index, duration: 0.5 } : undefined}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] uppercase tracking-[0.3em] text-neutral-500">{project.launch}</span>
                      <h3 className="text-base font-RubikMedium text-neutral-50">{project.name}</h3>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-RubikMedium uppercase tracking-wide ${
                        isLive
                          ? "border border-emerald-300/60 bg-emerald-500/10 text-emerald-100"
                          : "border border-rose-300/40 bg-rose-500/10 text-rose-100"
                      }`}
                    >
                      <span className={`h-2 w-2 rounded-full ${isLive ? "bg-emerald-300" : "bg-rose-300"}`} />
                      {isLive ? "Élő" : "Archív"}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-neutral-300">{project.description}</p>
                  <div className="flex flex-wrap gap-2 text-[11px] text-neutral-400">
                    {project.tags.map((tag) => (
                      <span key={`${project.name}-${tag}`} className="rounded-full border border-white/10 bg-neutral-950/60 px-2 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-3 text-xs text-neutral-300">
                    {project.statusNote ? <span className="text-rose-300">{project.statusNote}</span> : <span />}
                    <Link
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-RubikMedium transition ${
                        isLive
                          ? "border border-amber-300/60 text-amber-200 hover:border-amber-200 hover:text-amber-100"
                          : "border border-white/10 text-neutral-400 hover:border-rose-300/40 hover:text-rose-200"
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

        <section className="grid gap-6 rounded-[2.5rem] border border-white/10 bg-neutral-900/70 p-6 lg:p-10">
          <div className="flex flex-col gap-3">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-200">
              együttműködés
            </span>
            <h2 className="text-xl font-RubikMedium text-neutral-50 lg:text-2xl">Így lesz az ötletből kézzelfogható digitális megoldás</h2>
            <p className="text-sm text-neutral-300 lg:text-base">
              A folyamat minden lépésénél fókuszban tartjuk az üzleti céljaidat: közösen térképezzük fel a kihívásokat, majd transzparens mérföldkövekkel haladunk a bevezetésig.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {collaborationSteps.map((step, index) => (
              <motion.article
                key={step.title}
                className="flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-neutral-950/60 p-6"
                initial={enableMotion ? { opacity: 0, y: 20 } : {}}
                animate={enableMotion ? { opacity: 1, y: 0 } : { opacity: 1 }}
                transition={enableMotion ? { delay: 0.1 * index, duration: 0.5 } : undefined}
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-neutral-900/70">
                  {step.icon}
                </span>
                <div className="space-y-2">
                  <h3 className="text-base font-RubikMedium text-neutral-100">{step.title}</h3>
                  <p className="text-sm text-neutral-300">{step.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-neutral-950/60 p-6 text-sm text-neutral-300">
            <p className="max-w-2xl">
              Ha szeretnél személyre szabott ajánlatot vagy részletesebb tervet kapni, írj egy rövid bemutatkozást a projektedről, és 24 órán belül válaszolok.
            </p>
            <Link
              href="mailto:info@promnet.hu"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-300/60 bg-emerald-500/10 px-4 py-2 text-sm font-RubikMedium text-emerald-100 transition hover:border-emerald-200 hover:text-emerald-50"
              onClick={() => trackCtaClick("kapcsolat-email", { location: "homepage-collaboration" })}
            >
              Kapcsolatfelvétel
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

        <section className="space-y-6 rounded-[2.5rem] border border-border/70 bg-card/40 p-6 shadow-soft lg:p-10">
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

        <section className="grid gap-6 rounded-[2.5rem] border border-white/10 bg-neutral-900/70 p-6 lg:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-sky-200">
                friss cikkek
              </span>
              <h2 className="mt-3 text-xl font-RubikMedium text-neutral-50 lg:text-2xl">Legújabb bejegyzések a blogról</h2>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-300">
              <label htmlFor="blog-category" className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                Szűrés
              </label>
              <select
                id="blog-category"
                className="rounded-full border border-white/10 bg-neutral-950/70 px-3 py-2 text-xs text-neutral-100"
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
            <p className="text-sm text-neutral-400">{blogStatus.message}</p>
          ) : null}
          {blogStatus.state === "error" ? (
            <div className="rounded-2xl border border-rose-500/40 bg-rose-500/10 p-4 text-sm text-rose-200">
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
                className="flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-neutral-950/60 p-5 text-neutral-100"
              >
                <span className="text-[11px] uppercase tracking-[0.3em] text-sky-200">
                  {(post.categories ?? ["Blog"])[0]}
                </span>
                <h3 className="text-base font-RubikMedium text-neutral-50">{post.title}</h3>
                <p className="text-sm text-neutral-400 line-clamp-4">{post.description}</p>
                <div className="mt-auto flex items-center justify-between text-xs text-neutral-500">
                  <time dateTime={post.publishedAt}>{post.publishedRelative}</time>
                  <Link
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sky-200 transition hover:text-sky-100"
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
              <p className="text-sm text-neutral-400">
                Ebben a kategóriában még nincs publikált bejegyzés. Nézz körül később, vagy válassz másik címkét.
              </p>
            ) : null}
          </div>
        </section>

        <section className="space-y-6 rounded-[2.5rem] border border-border/70 bg-card/50 p-6 shadow-soft lg:p-10">
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
