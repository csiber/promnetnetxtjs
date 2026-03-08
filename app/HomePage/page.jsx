"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import {
  PiBrowsersThin,
  PiCloudThin,
  PiMegaphoneThin,
  PiStackThin,
  PiArrowRightThin,
  PiArrowUpRightThin,
  PiCheckCircleThin,
  PiLightningThin,
  PiShieldCheckThin,
  PiChartLineUpThin,
} from "react-icons/pi";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { trackCtaClick } from "@/lib/analytics";
import { portfolioProjects } from "@/data/portfolio-projects";
import Image from "next/image";

const heroText = {
  title: "Backend és infrastruktúra, ami stabilan viszi a terméked.",
  description:
    "Backend, DevOps és integrációs rendszerek tervezése és építése startupoknak és technológiai cégeknek. Nem sablon webfejlesztés, hanem hosszú távon karbantartható, skálázható alapok.",
};

const services = [
  {
    title: "Backend infrastruktúra",
    description:
      "API-k, rendszermag, adatmodellek, skálázható architektúra tervezése és megvalósítása produkciós szinten.",
    icon: <PiCloudThin aria-hidden="true" className="h-6 w-6" />,
    tag: "Core",
  },
  {
    title: "Integrációk és automatizáció",
    description:
      "Külső szolgáltatások, adatfolyamok, API-kapcsolatok összekapcsolása és automatizálása.",
    icon: <PiStackThin aria-hidden="true" className="h-6 w-6" />,
    tag: "Integration",
  },
  {
    title: "DevOps és üzemeltetés",
    description:
      "Deploy, CI/CD, monitorozás, incident kezelés és stabil, kiszámítható működés.",
    icon: <PiBrowsersThin aria-hidden="true" className="h-6 w-6" />,
    tag: "Ops",
  },
];

const trustPoints = [
  { text: "10+ év backend tapasztalat", icon: <PiLightningThin className="h-5 w-5" /> },
  { text: "Valós produkciós rendszerek", icon: <PiChartLineUpThin className="h-5 w-5" /> },
  { text: "Nem sablon webfejlesztés", icon: <PiShieldCheckThin className="h-5 w-5" /> },
  { text: "Hosszú távú stabilitás", icon: <PiCheckCircleThin className="h-5 w-5" /> },
];

const stats = [
  { value: "10+", label: "év tapasztalat" },
  { value: "30+", label: "lezárt projekt" },
  { value: "10+", label: "élő rendszer" },
];

const processSteps = [
  {
    step: "01",
    title: "Igény és célok",
    description: "Rövid egyeztetés a scope-ról, célokról és technikai elvárásokról.",
  },
  {
    step: "02",
    title: "Architektúra",
    description: "Rendszertérkép, komponensek, integrációk és döntési pontok dokumentálása.",
  },
  {
    step: "03",
    title: "Fejlesztés",
    description: "Kontrollált sprint, transzparens státuszok, heti összefoglalók.",
  },
  {
    step: "04",
    title: "Üzemeltetés",
    description: "Dokumentált átadás, monitorozás, opcionális hosszú távú üzemeltetés.",
  },
];

const stackItems = [
  "Node.js / TypeScript",
  "PostgreSQL / Redis",
  "Docker / Kubernetes",
  "Terraform / CI-CD",
  "Cloudflare / Hetzner / AWS",
];

const quickLinks = [
  {
    href: "/dashboard/case-studies/creatify",
    title: "Creatify esettanulmány",
    description:
      "Backend és mérési háttér stabilizálása, folyamatok tisztázása, és az eredmények dokumentálása.",
  },
  {
    href: "https://blogocska.hu",
    title: "Technikai blog magyarul",
    description:
      "jegyzetek, technikai leírások és rövid összefoglalók fejlesztőknek.",
    external: true,
  },
];

// ── Animation variants ──────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const staggerFast = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

// ── Animated section wrapper ────────────────────────────────────────────────

function AnimSection({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeUp}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── SectionHeader ───────────────────────────────────────────────────────────

function SectionHeader({ kicker, title, body, center = false }) {
  return (
    <AnimSection className={`space-y-4 ${center ? "text-center" : ""}`}>
      <p className="section-kicker">{kicker}</p>
      <h2 className={`section-title ${center ? "mx-auto max-w-2xl" : ""}`}>{title}</h2>
      {body && (
        <p className={`section-body mt-2 ${center ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>
          {body}
        </p>
      )}
    </AnimSection>
  );
}

// ── Homepage ────────────────────────────────────────────────────────────────

function Homepage() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Összes");
  const [blogStatus, setBlogStatus] = useState({ state: "idle", message: "" });
  const [refFilter, setRefFilter] = useState("all");
  const [scrolled, setScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const enableMotion = !shouldReduceMotion;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const fetchPosts = async () => {
      setBlogStatus({ state: "loading", message: "Bejegyzések betöltése..." });
      try {
        const response = await fetch("/api/blog?limit=6");
        if (!response.ok) throw new Error("Hálózati hiba");
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
    return () => { cancelled = true; };
  }, []);

  const categories = useMemo(() => {
    const unique = new Set();
    blogPosts.forEach((post) => {
      (post.categories ?? []).forEach((cat) => unique.add(cat));
    });
    return ["Összes", ...Array.from(unique)];
  }, [blogPosts]);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "Összes") return blogPosts;
    return blogPosts.filter((post) => (post.categories ?? []).includes(selectedCategory));
  }, [blogPosts, selectedCategory]);

  const references = useMemo(() => {
    return portfolioProjects.map((project) => ({
      name: project.name,
      description: project.description,
      stack: project.tags?.slice(0, 4) ?? [],
      href: project.href,
      status: project.status,
    }));
  }, []);

  const filteredRefs = useMemo(() => {
    if (refFilter === "live") return references.filter((r) => r.status === "live");
    if (refFilter === "archived") return references.filter((r) => r.status === "archived");
    return references;
  }, [references, refFilter]);

  return (
    <>
      {/* ── Sticky Navigation ── */}
      <motion.header
        initial={enableMotion ? { y: -64, opacity: 0 } : false}
        animate={enableMotion ? { y: 0, opacity: 1 } : { opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`saas-nav ${scrolled ? "shadow-[0_1px_30px_rgba(0,0,0,0.3)]" : ""}`}
      >
        <span className="text-base font-bold tracking-tight text-foreground">
          Prom<span className="text-accent">NET</span>
        </span>
        <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
          <Link href="#szolgaltatasok" className="no-underline hover:text-foreground transition-colors">
            Szolgáltatások
          </Link>
          <Link href="#miert-promnet" className="no-underline hover:text-foreground transition-colors">
            Miért PromNET
          </Link>
          <Link href="#referenciak" className="no-underline hover:text-foreground transition-colors">
            Referenciák
          </Link>
          <Link href="#kapcsolat" className="no-underline hover:text-foreground transition-colors">
            Kapcsolat
          </Link>
        </nav>
        <Link
          href="mailto:info@promnet.hu"
          onClick={() => trackCtaClick("nav-cta", { location: "nav" })}
          className="btn-primary py-2 px-5 text-xs no-underline"
        >
          Projekt indítása
        </Link>
      </motion.header>

      <div className="pb-24 pt-16">
        {/* ── Hero ── */}
        <section className="section pt-24 lg:pt-32">
          <motion.div
            initial={enableMotion ? "hidden" : false}
            animate={enableMotion ? "visible" : false}
            variants={stagger}
            className="grid items-center gap-12 lg:grid-cols-[1.1fr,0.9fr]"
          >
            <div className="space-y-8">
              <motion.div variants={fadeUp}>
                <span className="promnet-badge">PROMNET.HU — Backend &amp; Infra</span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-4xl font-bold tracking-tight text-foreground lg:text-6xl lg:leading-[1.1]"
              >
                Backend és infrastruktúra,{" "}
                <span className="gradient-text">ami stabilan viszi</span> a terméked.
              </motion.h1>

              <motion.p variants={fadeUp} className="section-body max-w-xl text-lg leading-relaxed">
                {heroText.description}
              </motion.p>

              <motion.p variants={fadeUp} className="section-body max-w-xl">
                A cél egyszerű: stabil backend, tiszta üzemeltetés, és olyan integrációk,
                amik nem borulnak meg egy növekedési hullámtól.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <Link
                  href="mailto:info@promnet.hu"
                  onClick={() => trackCtaClick("projekt-inditas", { location: "hero" })}
                  className="btn-primary no-underline"
                >
                  Projekt indítása
                  <PiArrowRightThin className="h-4 w-4" />
                </Link>
                <Link href="#referenciak" className="btn-secondary no-underline">
                  Referenciák
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4 pt-2">
                {stats.map((s) => (
                  <div key={s.label} className="stat-card">
                    <span className="stat-value">{s.value}</span>
                    <span className="stat-label">{s.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Hero visual */}
            <motion.div variants={fadeIn} className="hero-visual">
              <div className="hero-grid" />
              <div className="hero-glow" style={{ top: "15%", left: "10%" }} />
              <div className="hero-glow" style={{ bottom: "-20%", right: "5%", animationDelay: "3s" }} />
              {/* Floating terminal-style card */}
              <div className="absolute left-6 right-6 top-8 rounded-xl border border-white/10 bg-card/80 p-4 backdrop-blur-xl">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                  <span className="ml-2 text-[11px] uppercase tracking-[0.2em] text-muted">
                    infra / api / observability
                  </span>
                </div>
                <div className="space-y-2 font-mono text-xs text-muted">
                  <p><span className="text-accent">✓</span> API gateway: healthy</p>
                  <p><span className="text-accent">✓</span> Database: 12ms avg latency</p>
                  <p><span className="text-accent">✓</span> CI/CD pipeline: passing</p>
                  <p><span className="text-green-400">●</span> Deploy: <span className="text-foreground">production</span></p>
                </div>
              </div>
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[11px] text-muted">
                <span className="uppercase tracking-[0.2em]">uptime 99.9%</span>
                <span className="flex items-center gap-1.5">
                  <span className="status-live">Rendszer aktív</span>
                </span>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <div className="gradient-divider mx-auto max-w-6xl" />

        {/* ── Services ── */}
        <section id="szolgaltatasok" className="section">
          <SectionHeader
            kicker="Szolgáltatások"
            title="Fókuszált technológiai szolgáltatások"
            body="Nincs túlmagyarázás: ha backend, integráció vagy DevOps kell, itt van három tiszta irány. A scope-ot közösen pontosítjuk, és az alapján dolgozom."
          />

          <motion.div
            initial={enableMotion ? "hidden" : false}
            whileInView={enableMotion ? "visible" : false}
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="mt-12 grid gap-5 lg:grid-cols-3"
          >
            {services.map((service) => (
              <motion.div key={service.title} variants={fadeUp} className="service-card group">
                <div className="flex items-start justify-between">
                  <div className="service-card-icon group-hover:bg-accent/20 transition-colors duration-300">
                    {service.icon}
                  </div>
                  <span className="tag-chip">{service.tag}</span>
                </div>
                <h3 className="mt-1 text-xl font-semibold text-foreground">{service.title}</h3>
                <p className="section-body mt-1 text-sm">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <div className="gradient-divider mx-auto max-w-6xl" />

        {/* ── Studio / About ── */}
        <section className="section">
          <div className="grid gap-10 lg:grid-cols-2">
            <AnimSection className="space-y-6">
              <p className="section-kicker">Stúdió</p>
              <h2 className="section-title">Komoly mérnöki fókusz, kis csapat</h2>
              <p className="section-body">
                A PromNET nem ügynökség. Mérnöki fókuszú stúdióként dolgozom: átlátható scope,
                stabil üzemeltetés és hosszú távon fenntartható rendszerek. A cél nem a gyors
                látvány, hanem a működés.
              </p>
              <ul className="space-y-4">
                {[
                  "Produkciós rendszerek skálázása és stabilizálása",
                  "Integrációk, adatfolyamok, API-kapcsolatok",
                  "Üzemeltetés: monitorozás, incident kezelés, optimalizálás",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
                      <PiCheckCircleThin className="h-3.5 w-3.5 text-accent" />
                    </span>
                    <span className="text-sm text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </AnimSection>

            <AnimSection delay={0.1} className="saas-card p-6">
              <p className="section-kicker">Technológiai fókusz</p>
              <h3 className="mt-3 text-lg font-semibold text-foreground">Gyakran használt stack</h3>
              <p className="mt-2 text-sm text-muted">
                Nem vendor listát írok, hanem eszközöket választok a problémához.
                Ezekkel dolgozom a legtöbbet.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {stackItems.map((item) => (
                  <span key={item} className="tag-chip">
                    {item}
                  </span>
                ))}
              </div>
            </AnimSection>
          </div>
        </section>

        <div className="gradient-divider mx-auto max-w-6xl" />

        {/* ── Why PromNET ── */}
        <section id="miert-promnet" className="section">
          <div className="grid gap-10 lg:grid-cols-[1fr,0.9fr]">
            <AnimSection className="space-y-6">
              <p className="section-kicker">Miért PromNET</p>
              <h2 className="section-title">Senior backend/infra fókusz</h2>
              <p className="section-body">
                A cél nem a látvány, hanem a működés. Produkciós rendszerekben gondolkodom,
                ahol a stabilitás, az átláthatóság és a terhelhetőség számít.
              </p>
              <motion.ul
                initial={enableMotion ? "hidden" : false}
                whileInView={enableMotion ? "visible" : false}
                viewport={{ once: true }}
                variants={stagger}
                className="space-y-3"
              >
                {trustPoints.map((point) => (
                  <motion.li key={point.text} variants={fadeUp} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent">
                      {point.icon}
                    </span>
                    <span className="text-sm font-medium text-foreground">{point.text}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </AnimSection>

            <AnimSection delay={0.15} className="saas-card overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-4">
                  <Image
                    src="/black.jpeg"
                    alt="Polyák Csaba portré"
                    width={72}
                    height={72}
                    className="h-[72px] w-[72px] rounded-2xl object-cover ring-2 ring-accent/20"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Polyák Csaba</h3>
                    <p className="text-sm text-muted">Backend / infra mérnök</p>
                    <div className="mt-1 flex gap-2">
                      <span className="status-live">Elérhető</span>
                    </div>
                  </div>
                </div>
                <p className="mt-5 text-sm text-muted leading-relaxed">
                  Évek óta backend rendszerek, integrációk és infrastruktúra tervezése a fókuszom.
                  A célom egyszerű: stabil, átlátható rendszerek, amik skálázhatóak és
                  fenntarthatóak. A mellékágak (3D, szerviz) nem írják felül ezt a fókuszt.
                </p>
              </div>
            </AnimSection>
          </div>
        </section>

        <div className="gradient-divider mx-auto max-w-6xl" />

        {/* ── References ── */}
        <section id="referenciak" className="section">
          <div className="space-y-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeader
                kicker="Referenciák"
                title="Weboldal és rendszer referenciák"
                body="Az összes jelenlegi referencia itt van listázva. Ha valami archív, azt is jelzem, hogy tiszta legyen a kép."
              />

              {/* Filter tabs */}
              <AnimSection className="flex shrink-0 gap-2">
                {[
                  { key: "all", label: "Összes" },
                  { key: "live", label: "Élő" },
                  { key: "archived", label: "Archív" },
                ].map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setRefFilter(f.key)}
                    className={`filter-btn ${refFilter === f.key ? "filter-btn-active" : ""}`}
                  >
                    {f.label}
                  </button>
                ))}
              </AnimSection>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={refFilter}
                initial={enableMotion ? "hidden" : false}
                animate={enableMotion ? "visible" : false}
                variants={staggerFast}
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filteredRefs.map((project, index) => (
                  <motion.div
                    key={project.name}
                    variants={fadeUp}
                    custom={index}
                    className="ref-card group"
                  >
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold text-foreground leading-snug">
                        {project.name}
                      </h3>
                      {project.status === "live" ? (
                        <span className="status-live shrink-0">élő</span>
                      ) : (
                        <span className="status-archived shrink-0">archív</span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-xs text-muted leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    {/* Footer row */}
                    <div className="mt-auto flex items-center justify-between gap-2 pt-1">
                      <div className="flex flex-wrap gap-1">
                        {project.stack.map((tag) => (
                          <span key={tag} className="tag-chip">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 flex items-center gap-1 text-xs font-semibold text-accent no-underline opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                        aria-label={`${project.name} megnyitása`}
                      >
                        <PiArrowUpRightThin className="h-4 w-4" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredRefs.length === 0 && (
              <p className="text-center text-sm text-muted py-12">Nincs találat ebben a szűrőben.</p>
            )}
          </div>
        </section>

        <div className="gradient-divider mx-auto max-w-6xl" />

        {/* ── Process ── */}
        <section className="section">
          <SectionHeader
            kicker="Folyamat"
            title="Egyenes, mérhető lépések"
            body="Rövid egyeztetés, tiszta architektúra, kontrollált fejlesztés, stabil üzemeltetés. Itt nincsenek meglepetések, csak átlátható lépések."
          />

          <motion.div
            initial={enableMotion ? "hidden" : false}
            whileInView={enableMotion ? "visible" : false}
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="mt-12 grid gap-5 lg:grid-cols-4"
          >
            {processSteps.map((step, index) => (
              <motion.div key={step.step} variants={fadeUp} className="process-step group">
                {/* Connector line (except last) */}
                {index < processSteps.length - 1 && (
                  <div
                    className="absolute -right-2 top-8 hidden h-px w-4 bg-gradient-to-r from-accent/30 to-transparent lg:block"
                    aria-hidden
                  />
                )}
                <div className="process-step-number">{step.step}</div>
                <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <div className="gradient-divider mx-auto max-w-6xl" />

        {/* ── Content / Blog ── */}
        <section className="section">
          <div className="grid gap-10 lg:grid-cols-[1fr,1fr]">
            <AnimSection className="space-y-6">
              <p className="section-kicker">Kiemelt tartalom</p>
              <h2 className="section-title">Hasznos anyagok és rövid összefoglalók</h2>
              <p className="section-body">
                Rövid anyagok, amik segítenek megérteni a szemléletemet és a technikai
                döntéseket. Nem marketing, hanem tényleges tapasztalatokból épített jegyzetek.
              </p>
              <div className="space-y-4">
                {quickLinks.map((linkItem) => (
                  <div key={linkItem.title} className="saas-card p-5 group">
                    <h3 className="text-sm font-semibold text-foreground">{linkItem.title}</h3>
                    <p className="mt-1 text-xs text-muted leading-relaxed">{linkItem.description}</p>
                    <Link
                      href={linkItem.href}
                      className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent no-underline"
                      {...(linkItem.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      Megnyitás
                      <PiArrowUpRightThin className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                ))}
              </div>
            </AnimSection>

            <AnimSection delay={0.1}>
              <div className="flex items-center justify-between">
                <p className="section-kicker">Friss cikkek</p>
                <div className="flex items-center gap-2">
                  <label htmlFor="blog-category" className="text-[11px] uppercase tracking-[0.2em] text-muted sr-only">
                    Szűrés
                  </label>
                  <select
                    id="blog-category"
                    className="rounded-full border border-white/10 bg-card/70 px-3 py-1.5 text-xs text-foreground backdrop-blur-sm"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {blogStatus.state === "loading" && (
                <p className="mt-4 text-sm text-muted">{blogStatus.message}</p>
              )}
              {blogStatus.state === "error" && (
                <div className="mt-4 rounded-xl border border-accent/30 bg-accent/8 p-4 text-sm text-accent">
                  {blogStatus.message}{" "}
                  <Link href="https://blogocska.hu" className="underline" target="_blank" rel="noopener noreferrer">
                    blogocska.hu
                  </Link>
                </div>
              )}

              <div className="mt-4 space-y-3">
                {filteredPosts.slice(0, 5).map((post) => (
                  <article key={post.link} className="saas-card p-4 group">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-accent">
                      {(post.categories ?? ["Blog"])[0]}
                    </p>
                    <h3 className="mt-1 text-sm font-semibold text-foreground leading-snug">
                      {post.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted line-clamp-2 leading-relaxed">
                      {post.description}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <time className="text-[10px] text-muted" dateTime={post.publishedAt}>
                        {post.publishedRelative}
                      </time>
                      <Link
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[11px] font-semibold text-accent no-underline"
                      >
                        Elolvasom
                        <PiArrowUpRightThin className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </article>
                ))}
                {filteredPosts.length === 0 && blogStatus.state === "ready" && (
                  <p className="text-sm text-muted">
                    Ebben a kategóriában még nincs publikált bejegyzés.
                  </p>
                )}
              </div>
            </AnimSection>
          </div>
        </section>

        <div className="gradient-divider mx-auto max-w-6xl" />

        {/* ── Contact ── */}
        <section id="kapcsolat" className="section">
          <div className="grid gap-8 lg:grid-cols-2">
            <AnimSection className="space-y-5">
              <p className="section-kicker">Kapcsolat</p>
              <h2 className="section-title">Gyors egyeztetés, tiszta irány</h2>
              <p className="section-body">
                Írj pár mondatot a problémáról vagy az ötletedről. Visszajelzek, hogy mi a
                reális irány, mennyi idő és milyen lépések kellenek hozzá.
              </p>
              <div className="space-y-2 text-sm text-muted">
                <p>
                  <a href="mailto:info@promnet.hu" className="text-foreground no-underline hover:text-accent transition-colors">
                    info@promnet.hu
                  </a>
                </p>
                <p>
                  <a href="tel:+36205494107" className="no-underline text-foreground hover:text-accent transition-colors">
                    +36 20 549 4107
                  </a>
                </p>
                <p>4324 Kállósemjén, Kölcsey Ferenc út 11.</p>
              </div>
            </AnimSection>

            <AnimSection delay={0.1} className="saas-card p-6">
              <p className="section-kicker">Működés</p>
              <h3 className="mt-3 text-lg font-semibold text-foreground">Praktikus keretek</h3>
              <ul className="mt-4 space-y-3">
                {[
                  "Átlátható scope és mérföldkövek",
                  "Heti státusz és rövid, technikai összefoglaló",
                  "Dokumentált átadás és opcionális üzemeltetés",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent/20 bg-accent/10">
                      <PiCheckCircleThin className="h-3 w-3 text-accent" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </AnimSection>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="section pt-0">
          <AnimSection>
            <div className="cta-banner">
              <p className="text-xs uppercase tracking-[0.3em] text-accent">Kezdjük el</p>
              <h2 className="mt-4 text-3xl font-bold text-foreground lg:text-4xl">
                Van egy rendszerötleted vagy meglévő backend problémád?
              </h2>
              <p className="mt-3 text-base text-muted max-w-xl mx-auto">
                Írj pár mondatot a helyzetről, és visszajelzek a lehetséges irányokról.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="mailto:info@promnet.hu"
                  onClick={() => trackCtaClick("cta-beszeljunk", { location: "cta" })}
                  className="btn-primary no-underline"
                >
                  Beszéljünk
                  <PiArrowRightThin className="h-4 w-4" />
                </Link>
                <Link href="#referenciak" className="btn-secondary no-underline">
                  Referenciák megnézése
                </Link>
              </div>
            </div>
          </AnimSection>
        </section>
      </div>
    </>
  );
}

export default Homepage;
