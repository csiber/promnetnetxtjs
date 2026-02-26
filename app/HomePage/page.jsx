"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import {
  PiBrowsersThin,
  PiCloudThin,
  PiMegaphoneThin,
  PiStackThin,
} from "react-icons/pi";
import { motion, useReducedMotion } from "framer-motion";
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
    description: "API-k, rendszermag, adatmodellek, skálázható architektúra.",
    icon: <PiCloudThin aria-hidden="true" className="h-6 w-6" />,
  },
  {
    title: "Integrációk és automatizáció",
    description: "Külső szolgáltatások, adatfolyamok, API-kapcsolatok.",
    icon: <PiStackThin aria-hidden="true" className="h-6 w-6" />,
  },
  {
    title: "DevOps és üzemeltetés",
    description: "Deploy, CI/CD, monitorozás, stabil működés.",
    icon: <PiBrowsersThin aria-hidden="true" className="h-6 w-6" />,
  },
];

const trustPoints = [
  "10+ év backend tapasztalat",
  "valós produkciós rendszerek",
  "nem sablon webfejlesztés",
  "hosszú távú stabilitás",
];

const processSteps = [
  "Igény és célok",
  "Architektúra",
  "Fejlesztés",
  "Üzemeltetés",
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
    description: "Jegyzetek, technikai leírások és rövid összefoglalók fejlesztőknek.",
    external: true,
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

  const references = useMemo(() => {
    return portfolioProjects.map((project) => ({
      name: project.name,
      description: project.description,
      stack: project.tags?.slice(0, 4) ?? [],
      href: project.href,
      status: project.status,
    }));
  }, []);

  return (
    <motion.main
      initial={enableMotion ? { opacity: 0, y: 24 } : false}
      animate={enableMotion ? { opacity: 1, y: 0 } : { opacity: 1 }}
      transition={enableMotion ? { duration: 0.6, ease: "easeOut" } : undefined}
      className="pb-24"
    >
      <section className="section">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-6">
            <p className="section-kicker">PROMNET.HU</p>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground lg:text-5xl">
              {heroText.title}
            </h1>
            <p className="section-body max-w-xl">{heroText.description}</p>
            <p className="section-body max-w-xl">
              A cél egyszerű: stabil backend, tiszta üzemeltetés, és olyan integrációk, amik nem borulnak meg egy
              növekedési hullámtól. Ha a frontend kell, akkor is a backendhez igazítva dolgozom.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="mailto:info@promnet.hu"
                onClick={() => trackCtaClick("projekt-inditas", { location: "hero" })}
                className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition hover:-translate-y-0.5"
              >
                Projekt indítása
              </Link>
              <Link
                href="#referenciak"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:border-white/40"
              >
                Referenciák
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-grid" />
            <div className="hero-glow" style={{ top: "20%", left: "15%" }} />
            <div className="hero-glow" style={{ bottom: "-10%", right: "10%" }} />
            <div className="absolute inset-0 flex items-end p-6 text-sm text-muted">
              <span>infra / api / observability</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="space-y-8">
          <div>
            <p className="section-kicker">Szolgáltatások</p>
            <h2 className="section-title">Fókuszált technológiai szolgáltatások</h2>
            <p className="section-body mt-3 max-w-2xl">
              Nincs túlmagyarázás: ha backend, integráció vagy DevOps kell, itt van három tiszta irány. A scope-ot közösen
              pontosítjuk, és az alapján dolgozom.
            </p>
          </div>
          <div className="grid gap-10 lg:grid-cols-3">
            {services.map((service) => (
              <div key={service.title} className="space-y-3">
                <div className="text-accent">{service.icon}</div>
                <h3 className="text-lg font-semibold text-foreground">{service.title}</h3>
                <p className="section-body">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="grid gap-10 lg:grid-cols-[1fr,0.9fr]">
          <div className="space-y-6">
            <p className="section-kicker">Miért PromNET</p>
            <h2 className="section-title">Senior backend/infra fókusz</h2>
            <p className="section-body">
              A cél nem a látvány, hanem a működés. Produkciós rendszerekben gondolkodom, ahol a stabilitás, a
              átláthatóság és a terhelhetőség számít.
            </p>
            <ul className="space-y-3 text-base text-muted">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-white/10 bg-card/70 p-6">
            <div className="flex items-center gap-4">
              <Image
                src="/black.jpeg"
                alt="Polyák Csaba portré"
                width={80}
                height={80}
                className="h-20 w-20 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-foreground">Polyák Csaba</h3>
                <p className="text-sm text-muted">Backend / infra mérnök</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted">
              Évek óta backend rendszerek, integrációk és infrastruktúra tervezése a fókuszom. A célom egyszerű: stabil,
              átlátható rendszerek, amik skálázhatóak és fenntarthatóak. A mellékágak (3D, szerviz) nem írják felül ezt a
              fókuszt.
            </p>
          </div>
        </div>
      </section>

      <section id="referenciak" className="section">
        <div className="space-y-8">
          <div>
            <p className="section-kicker">Referenciák</p>
            <h2 className="section-title">Weboldal és rendszer referenciák</h2>
            <p className="section-body mt-3 max-w-2xl">
              Az összes jelenlegi referencia itt van listázva. Ha valami archív, azt is jelzem, hogy tiszta legyen a kép.
            </p>
          </div>
          <div className="space-y-6">
            {references.map((project) => (
              <div key={project.name} className="border-b border-white/10 pb-6">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
                      <span className="text-[11px] uppercase tracking-[0.25em] text-muted">
                        {project.status === "live" ? "élő" : "archív"}
                      </span>
                    </div>
                    <p className="text-sm text-muted">{project.description}</p>
                    <p className="text-xs uppercase tracking-[0.25em] text-muted">
                      {project.stack.length > 0 ? project.stack.join(" · ") : "backend / infra"}
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
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="space-y-6">
          <div>
            <p className="section-kicker">Folyamat</p>
            <h2 className="section-title">Egyenes, mérhető lépések</h2>
            <p className="section-body mt-3 max-w-2xl">
              Rövid egyeztetés, tiszta architektúra, kontrollált fejlesztés, stabil üzemeltetés. Itt nincsenek meglepetések,
              csak átlátható lépések.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <div key={step} className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-card/60 text-sm font-semibold text-foreground">
                  0{index + 1}
                </span>
                <span className="text-sm font-semibold text-foreground">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="grid gap-10 lg:grid-cols-[1fr,1fr]">
          <div className="space-y-6">
            <p className="section-kicker">Kiemelt tartalom</p>
            <h2 className="section-title">Hasznos anyagok és rövid összefoglalók</h2>
            <p className="section-body">
              Rövid anyagok, amik segítenek megérteni a szemléletemet és a technikai döntéseket. Nem marketing, hanem
              tényleges tapasztalatokból épített jegyzetek.
            </p>
            <div className="space-y-4">
              {quickLinks.map((linkItem) => (
                <div key={linkItem.title} className="border-b border-white/10 pb-4">
                  <h3 className="text-base font-semibold text-foreground">{linkItem.title}</h3>
                  <p className="text-sm text-muted">{linkItem.description}</p>
                  <Link
                    href={linkItem.href}
                    className="mt-2 inline-flex text-sm font-semibold text-accent"
                    {...(linkItem.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    Megnyitás
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="section-kicker">Friss cikkek</p>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted">
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
            {blogStatus.state === "loading" ? <p className="mt-4 text-sm text-muted">{blogStatus.message}</p> : null}
            {blogStatus.state === "error" ? (
              <div className="mt-4 rounded-xl border border-accent/40 bg-accent/10 p-4 text-sm text-accent">
                {blogStatus.message}{" "}
                <Link href="https://blogocska.hu" className="underline" target="_blank" rel="noopener noreferrer">
                  blogocska.hu
                </Link>
              </div>
            ) : null}
            <div className="mt-4 space-y-4">
              {filteredPosts.slice(0, 5).map((post) => (
                <article key={post.link} className="border-b border-white/10 pb-4">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-accent">
                    {(post.categories ?? ["Blog"])[0]}
                  </p>
                  <h3 className="mt-1 text-base font-semibold text-foreground">{post.title}</h3>
                  <p className="mt-1 text-sm text-muted line-clamp-3">{post.description}</p>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted">
                    <time dateTime={post.publishedAt}>{post.publishedRelative}</time>
                    <Link
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent"
                    >
                      Elolvasom
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
        </div>
      </section>

      <section className="section">
        <div className="rounded-xl border border-white/10 bg-card/80 px-8 py-12 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-accent">CTA</p>
          <h2 className="mt-4 text-2xl font-semibold text-foreground">
            Van egy rendszerötleted vagy meglévő backend problémád?
          </h2>
          <p className="mt-3 text-sm text-muted">
            Írj pár mondatot a helyzetről, és visszajelzek a lehetséges irányokról.
          </p>
          <Link
            href="mailto:info@promnet.hu"
            onClick={() => trackCtaClick("cta-beszeljunk", { location: "cta" })}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition hover:-translate-y-0.5"
          >
            Beszéljünk
          </Link>
        </div>
      </section>
    </motion.main>
  );
}

export default Homepage;
