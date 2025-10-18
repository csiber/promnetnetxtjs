"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { PiCodeThin } from "react-icons/pi";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { trackCtaClick } from "@/lib/analytics";

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
    media: "/websiteanimated.gif",
    title: "Creatify esettanulmány",
    subtitle:
      "Hogyan hoztunk 32%-os konverziónövekedést egy digitális tartalom platformnál célzott redesignnal és mérésekkel?",
  },
  {
    href: "https://blogocska.hu",
    media: "/blog.gif",
    title: "Személyes blogom, hasznos tutorialokkal",
    subtitle: "Technikai cikkek, kulisszatitkok és tanulási segédanyagok magyarul.",
  },
];

const services = [
  {
    href: "/dashboard/webdev",
    media: "/website.gif",
    title: "Weboldal fejlesztés kedvező áron",
    description:
      "UX fókuszú weboldalak és webshopok Next.js, Laravel és WordPress alapon. Teljes körű mérés, SEO és hosting támogatás.",
  },
  {
    href: "/dashboard/service",
    media: "/service.gif",
    title: "Elektronikai szerviz",
    description:
      "Notebook, PC és hálózati eszközök javítása + helyszíni kiszállás Szabolcsban. Gyors diagnosztika, átlátható árazás.",
  },
  {
    href: "/dashboard/hostingbuilder",
    media: "/hostingbuild.gif",
    title: "Teljeskörű hosting kiépítése",
    description:
      "Költséghatékony felhős infrastruktúra tervezése, CI/CD bevezetés, monitorozás és biztonsági mentések egy kézből.",
  },
];

const caseStudies = [
  {
    slug: "creatify",
    client: "Creatify",
    industry: "Digitális tartalom értékesítés",
    summary:
      "6 hetes redesign és webshop-optimalizáció után a Creatify konverziós rátája 32%-kal nőtt, miközben a support terhelése 27%-kal csökkent.",
    metrics: [
      { label: "Konverzió", value: "+32%" },
      { label: "Átlagos kosárérték", value: "+18%" },
      { label: "Ügyfélszolgálati ticket", value: "-27%" },
    ],
  },
  {
    slug: "promark",
    client: "PromARK",
    industry: "Játékos közösség",
    summary:
      "Teljes infrastruktúra-átállás és egyedi modulok bevezetése 41%-kal növelte az aktív tagok számát három hónap alatt.",
    metrics: [
      { label: "Aktív tagok", value: "+41%" },
      { label: "Oldalon töltött idő", value: "+22%" },
      { label: "Szerver leállások", value: "-80%" },
    ],
  },
];

const consultationEmbedUrl =
  "https://cal.com/embed/promnet/30-perces-konzultacio?background_color=171717&text_color=f8fafc&primary_color=8b5cf6";

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

  return (
    <motion.section
      {...heroSectionMotion}
      className="relative w-full overflow-hidden"
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
          className="relative overflow-hidden rounded-[2.75rem] border border-yellow-500/60 bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 p-[1px] shadow-[0_40px_120px_-60px_rgba(236,72,153,0.9)]"
          whileHover={enableMotion ? { scale: 1.01 } : undefined}
        >
          <motion.div
            className="flex flex-col gap-6 rounded-[2.5rem] bg-black/70 p-6 text-neutral-100 shadow-inner shadow-fuchsia-500/10 md:flex-row md:items-center md:justify-between"
            initial={enableMotion ? { opacity: 0, y: 24 } : false}
            animate={enableMotion ? { opacity: 1, y: 0 } : { opacity: 1 }}
            transition={enableMotion ? { delay: 0.2, duration: 0.6 } : undefined}
          >
            <div className="space-y-2">
              <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-yellow-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Kérdésed van? Hívj bizalommal!
              </span>
              <p className="max-w-3xl text-sm text-neutral-100 md:text-base">
                Ha bármilyen kérdésed lenne, hívj vagy írj, és megbeszéljük a részleteket. Mondd el, mit szeretnél elérni, és biztosan találunk rá megoldást!
              </p>
            </div>
            <div className="flex flex-col gap-3 text-sm text-neutral-200 md:text-base">
              <a
                href="tel:+36205494107"
                onClick={() => trackCtaClick("telefon", { location: "hero" })}
                className="inline-flex items-center justify-center rounded-full bg-yellow-300 px-6 py-3 font-semibold text-black transition hover:-translate-y-0.5 hover:bg-yellow-200"
              >
                Telefonhívás indítása
              </a>
              <a
                href="mailto:info@promnet.hu"
                onClick={() => trackCtaClick("email", { location: "hero" })}
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 font-semibold transition hover:-translate-y-0.5 hover:border-white/40 hover:text-white"
              >
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

        <section className="grid gap-6 rounded-[2.5rem] border border-white/10 bg-neutral-900/70 p-6 lg:p-10">
          <div className="flex flex-col gap-3">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-200">
              időpontfoglalás
            </span>
            <h2 className="text-xl font-RubikMedium text-neutral-50 lg:text-2xl">Foglalj 30 perces online konzultációt</h2>
            <p className="text-sm text-neutral-300 lg:text-base">
              A Cal.com naptárban azonnal látod a szabad idősávokat. Foglalás után megerősítő e-mailt kapsz Google Meet linkkel és teendőlistával.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/60">
            <iframe
              title="Cal.com foglalási űrlap"
              src={consultationEmbedUrl}
              className="h-[560px] w-full"
              loading="lazy"
              allow="fullscreen"
            />
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          {quickLinks.map(({ href, media, title, subtitle }, index) => (
            <Link
              key={href}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group"
            >
              <motion.article
                className="flex h-full gap-5 rounded-[2rem] border border-white/10 bg-neutral-900/70 p-6 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.8)] transition duration-500 group-hover:-translate-y-2 group-hover:border-white/40 group-hover:shadow-[0_30px_90px_-40px_rgba(168,85,247,0.5)]"
                initial={enableMotion ? { opacity: 0, y: 20 } : false}
                animate={enableMotion ? { opacity: 1, y: 0 } : { opacity: 1 }}
                transition={enableMotion ? { delay: 0.1 * index, duration: 0.6, ease: "easeOut" } : undefined}
              >
                <motion.div
                  className="relative flex-none"
                  whileHover={enableMotion ? { scale: 1.05 } : undefined}
                  transition={enableMotion ? { type: "spring", stiffness: 200, damping: 15 } : undefined}
                >
                  <Image
                    width={160}
                    height={160}
                    loading={index === 0 ? "eager" : "lazy"}
                    className="h-28 w-28 rounded-[1.3rem] object-cover ring-2 ring-white/10"
                    src={media}
                    alt="Ajánlott tartalom"
                  />
                  <motion.span
                    className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-fuchsia-500/40 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-200"
                    initial={enableMotion ? { opacity: 0, y: 8 } : false}
                    animate={enableMotion ? { opacity: 1, y: 0 } : { opacity: 1 }}
                    transition={enableMotion ? { delay: 0.25, duration: 0.5 } : undefined}
                  >
                    link
                  </motion.span>
                </motion.div>
                <div className="space-y-3 text-neutral-200">
                  <h2 className="text-base font-RubikMedium leading-tight lg:text-lg">{title}</h2>
                  {subtitle ? <p className="text-sm text-neutral-400 lg:text-base">{subtitle}</p> : null}
                </div>
              </motion.article>
            </Link>
          ))}
        </div>

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

        <div className="grid gap-6 lg:grid-cols-3">
          {services.map(({ href, media, title, description }, index) => (
            <Link key={href} href={href} className="group">
              <motion.article
                className="flex h-full flex-col gap-5 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-neutral-900/80 via-neutral-900/50 to-neutral-800/80 p-6 shadow-[0_30px_80px_-40px_rgba(59,130,246,0.45)] transition duration-500 group-hover:-translate-y-2 group-hover:border-white/40"
                initial={enableMotion ? { opacity: 0, y: 24 } : false}
                animate={enableMotion ? { opacity: 1, y: 0 } : { opacity: 1 }}
                transition={enableMotion ? { delay: 0.1 * index + 0.2, duration: 0.6, ease: "easeOut" } : undefined}
                whileHover={enableMotion ? { rotate: -1.2 } : undefined}
              >
                <motion.div
                  className="flex h-24 w-24 items-center justify-center rounded-2xl bg-neutral-900/60"
                  whileHover={enableMotion ? { scale: 1.05 } : undefined}
                >
                  <Image
                    width={160}
                    height={160}
                    loading="lazy"
                    className="h-16 w-16 rounded-xl object-cover"
                    src={media}
                    alt="Szolgáltatás illusztráció"
                  />
                </motion.div>
                <div className="space-y-3 text-neutral-200">
                  <h3 className="text-base font-semibold lg:text-lg">{title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-400 lg:text-base">{description}</p>
                </div>
                <motion.span
                  className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-fuchsia-300 transition group-hover:translate-x-2"
                  whileHover={enableMotion ? { gap: 6 } : undefined}
                >
                  Tovább a részletekhez
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.span>
              </motion.article>
            </Link>
          ))}
        </div>

        <motion.footer
          className="flex flex-wrap items-center justify-between gap-3 rounded-[2rem] border border-white/10 bg-neutral-900/60 px-6 py-5 text-neutral-300"
          initial={enableMotion ? { opacity: 0, y: 20 } : false}
          animate={enableMotion ? { opacity: 1, y: 0 } : { opacity: 1 }}
          transition={enableMotion ? { delay: 0.6, duration: 0.6 } : undefined}
        >
          <div className="flex items-center gap-2 text-sm font-RubikMedium text-neutral-200">
            <span>PromNET</span>
            <span className="h-1 w-1 rounded-full bg-neutral-500" />
            <span>Polyák Csaba E.V.</span>
          </div>
          <span className="text-xs text-neutral-400">© 2024 PromNET. Minden jog fenntartva.</span>
        </motion.footer>
      </div>
    </motion.section>
  );
}

export default Homepage;
