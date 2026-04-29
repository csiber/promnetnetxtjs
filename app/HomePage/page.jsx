"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { portfolioProjects } from "@/data/portfolio-projects";
import { trackCtaClick } from "@/lib/analytics";

const SERVICES = [
  { n: "01", title: "Backend infrastruktúra", desc: "API-k, rendszermag, adatmodellek, skálázható architektúra tervezése és megvalósítása produkciós szinten.", tag: "Core" },
  { n: "02", title: "Integrációk és automatizáció", desc: "Külső szolgáltatások, adatfolyamok, API-kapcsolatok összekapcsolása és automatizálása.", tag: "Integration" },
  { n: "03", title: "DevOps és üzemeltetés", desc: "Deploy, CI/CD, monitorozás, incident kezelés és stabil, kiszámítható működés.", tag: "Ops" },
];

const STATS = [
  { v: "10+", l: "év tapasztalat" },
  { v: "30+", l: "lezárt projekt" },
  { v: "10+", l: "élő rendszer" },
];

const STACK = [
  "Node.js / TypeScript",
  "PostgreSQL / Redis",
  "Docker / Kubernetes",
  "Terraform / CI-CD",
  "Cloudflare / Hetzner / AWS",
];

const TRUST = [
  "10+ év backend tapasztalat",
  "Valós produkciós rendszerek",
  "Nem sablon webfejlesztés",
  "Hosszú távú stabilitás",
];

const PROCESS = [
  { n: "01", title: "Igény és célok",  desc: "Rövid egyeztetés a scope-ról, célokról és technikai elvárásokról." },
  { n: "02", title: "Architektúra",    desc: "Rendszertérkép, komponensek, integrációk és döntési pontok dokumentálása." },
  { n: "03", title: "Fejlesztés",      desc: "Kontrollált sprint, transzparens státuszok, heti összefoglalók." },
  { n: "04", title: "Üzemeltetés",     desc: "Dokumentált átadás, monitorozás, opcionális hosszú távú üzemeltetés." },
];

const TICKER_ITEMS = [...STACK, ...STACK, ...STACK, ...STACK];

const OFFICE_HOURS = {
  1: [{ start: 9 * 60, end: 17 * 60 }],
  2: [{ start: 9 * 60, end: 17 * 60 }],
  3: [{ start: 9 * 60, end: 17 * 60 }],
  4: [{ start: 9 * 60, end: 17 * 60 }],
  5: [{ start: 9 * 60, end: 16 * 60 }],
  6: [{ start: 10 * 60, end: 14 * 60 }],
};

const computeAvailability = () => {
  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Europe/Budapest" })
  );
  const today = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const slots = OFFICE_HOURS[today] ?? [];
  return slots.some((s) => minutes >= s.start && minutes < s.end);
};

export default function Homepage() {
  const [scrolled, setScrolled]     = useState(false);
  const [refFilter, setRefFilter]   = useState("all");
  const [available, setAvailable]   = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    const tick = () => setAvailable(computeAvailability());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  const references = useMemo(() =>
    portfolioProjects.map((p) => ({
      name: p.name,
      description: p.description,
      tags: p.tags?.slice(0, 4) ?? [],
      href: p.href,
      status: p.status,
    })), []
  );

  const filtered = useMemo(() =>
    references.filter((p) => refFilter === "all" || p.status === refFilter),
    [references, refFilter]
  );

  return (
    <>
      {/* ── NAV ── */}
      <header className={`pn-nav ${scrolled ? "pn-nav-up" : ""}`}>
        <span style={{ fontSize: "1.0625rem", fontWeight: 700, letterSpacing: "-.03em" }}>
          Prom<span style={{ color: "var(--accent)" }}>NET</span>
        </span>
        <nav className="hidden md:flex items-center gap-8">
          {[
            ["#szolgaltatasok", "Szolgáltatások"],
            ["#miert-promnet",  "Miért PromNET"],
            ["#referenciak",    "Referenciák"],
            ["#kapcsolat",      "Kapcsolat"],
          ].map(([href, label]) => (
            <Link key={href} href={href} className="text-sm no-underline"
              style={{ color: "var(--muted2)", transition: "color .2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--fg)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--muted2)"}
            >{label}</Link>
          ))}
        </nav>
        <Link href="mailto:info@promnet.hu"
          onClick={() => trackCtaClick("nav-cta", { location: "nav" })}
          className="pn-btn-p sm no-underline">
          Projekt indítása
        </Link>
      </header>

      {/* ── HERO ── */}
      <section className="pn-hero">
        <div className="pn-hero-inner">
          <div>
            <div className="pn-hero-badge">
              <span className="pn-badge-dot" />
              <span className="pn-lbl" style={{ display: "inline", margin: 0 }}>
                promnet.hu — Backend &amp; Infra
              </span>
            </div>
            <h1 className="pn-hero-title">
              Backend és<br />
              infrastruktúra,<br />
              <span style={{ color: "var(--accent)" }}>ami stabilan</span><br />
              viszi a terméked.
            </h1>
            <p className="pn-hero-desc">
              Backend, DevOps és integrációs rendszerek tervezése és építése startupoknak és
              technológiai cégeknek. Nem sablon webfejlesztés, hanem hosszú távon karbantartható,
              skálázható alapok.
            </p>
            <div className="pn-hero-actions">
              <Link href="mailto:info@promnet.hu"
                onClick={() => trackCtaClick("hero-cta", { location: "hero" })}
                className="pn-btn-p no-underline">
                Projekt indítása →
              </Link>
              <Link href="#referenciak" className="pn-btn-g no-underline">Referenciák</Link>
            </div>
            <div className="pn-stats-row">
              {STATS.map((s, i) => (
                <div key={i} className="pn-stat">
                  <span className="pn-stat-v">{s.v}</span>
                  <span className="pn-stat-l">{s.l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Terminal visual */}
          <div className="pn-hero-r">
            <div className="pn-terminal">
              <div className="pn-term-bar">
                <span className="pn-dot" style={{ background: "#FF5F57" }} />
                <span className="pn-dot" style={{ background: "#FEBC2E" }} />
                <span className="pn-dot" style={{ background: "#28C840" }} />
                <span className="pn-term-title">infra / api / observability</span>
              </div>
              <div className="pn-term-body">
                <p><span className="pn-t-ok">✓</span> API gateway: <span className="pn-t-val">healthy</span></p>
                <p><span className="pn-t-ok">✓</span> Database: <span className="pn-t-val">12ms avg latency</span></p>
                <p><span className="pn-t-ok">✓</span> CI/CD pipeline: <span className="pn-t-val">passing</span></p>
                <p><span className="pn-t-live">●</span> Deploy: <span className="pn-t-val">production</span></p>
                <p className="pn-t-dim" style={{ marginTop: ".75rem" }}>$ kubectl get pods --all-namespaces</p>
                <p><span className="pn-t-dim">NAMESPACE&nbsp;&nbsp;&nbsp;&nbsp;STATUS</span></p>
                <p>api-gateway&nbsp;&nbsp;<span className="pn-t-ok">Running</span></p>
                <p>db-primary&nbsp;&nbsp;&nbsp;<span className="pn-t-ok">Running</span></p>
                <p>cache-redis&nbsp;&nbsp;<span className="pn-t-ok">Running</span></p>
              </div>
              <div className="pn-term-foot">
                <span>uptime 99.9%</span>
                <span style={{ color: "#28C840" }}>● Rendszer aktív</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="pn-ticker-wrap" aria-hidden>
        <div className="pn-ticker-track">
          {TICKER_ITEMS.map((item, i) => (
            <span key={i} className="pn-ticker-item">
              {item}
              <span style={{ color: "var(--border)", margin: "0 1rem" }}>——</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section className="pn-sec" id="szolgaltatasok">
        <span className="pn-lbl">01 — Szolgáltatások</span>
        <h2 className="pn-sec-title">Fókuszált technológiai<br />szolgáltatások</h2>
        <div>
          {SERVICES.map((s) => (
            <div key={s.n} className="pn-svc-row">
              <span className="pn-svc-n">{s.n}</span>
              <div>
                <h3 className="pn-svc-title">{s.title}</h3>
                <p className="pn-svc-desc">{s.desc}</p>
              </div>
              <span className="pn-tag">{s.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── STUDIO ── */}
      <div className="pn-sec-alt">
        <div className="pn-split">
          <div className="flex flex-col gap-6">
            <span className="pn-lbl">02 — Stúdió</span>
            <h2 className="pn-sec-title" style={{ margin: 0 }}>Komoly mérnöki<br />fókusz, kis csapat</h2>
            <p className="pn-body">
              A PromNET nem ügynökség. Mérnöki fókuszú stúdióként dolgozom: átlátható scope,
              stabil üzemeltetés és hosszú távon fenntartható rendszerek. A cél nem a gyors
              látvány, hanem a működés.
            </p>
            <ul className="pn-check-list">
              {[
                "Produkciós rendszerek skálázása és stabilizálása",
                "Integrációk, adatfolyamok, API-kapcsolatok",
                "Üzemeltetés: monitorozás, incident kezelés, optimalizálás",
              ].map((item) => (
                <li key={item}><span className="pn-dash">—</span>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="pn-about-card">
              <div className="pn-about-head">
                <div className="pn-about-photo">
                  <Image
                    src="/black.jpeg"
                    alt="Polyák Csaba portré"
                    width={72}
                    height={72}
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  />
                </div>
                <div>
                  <div className="pn-about-name">Polyák Csaba</div>
                  <div className="pn-about-role">Backend / infra mérnök</div>
                  <div style={{
                    marginTop: ".5rem", fontFamily: "var(--mono)", fontSize: ".5625rem",
                    letterSpacing: ".12em", textTransform: "uppercase",
                    color: available ? "#28C840" : "#FF5F57",
                  }}>{available ? "● Elérhető" : "● Nem elérhető"}</div>
                </div>
              </div>
              <p className="pn-about-bio">
                Évek óta backend rendszerek, integrációk és infrastruktúra tervezése a fókuszom.
                A célom egyszerű: stabil, átlátható rendszerek, amik skálázhatóak és fenntarthatóak.
              </p>
              <div className="flex flex-wrap gap-2">
                {STACK.map((s) => <span key={s} className="pn-tag">{s}</span>)}
              </div>
              <div style={{ marginTop: "1.25rem", paddingTop: "1.25rem", borderTop: "1px solid var(--border)" }}>
                <span className="pn-lbl" style={{ display: "block", marginBottom: ".75rem" }}>
                  Minősítések
                </span>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: ".5rem", fontSize: ".8125rem", color: "var(--muted)" }}>
                  <li>Google Analytics 4 &amp; Tag Manager — 2024-es tanúsítvány</li>
                  <li>Cloudflare Solution Partner (performance &amp; security)</li>
                  <li>Resend Transactional Email szakértő</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── WHY PROMNET ── */}
      <section className="pn-sec" id="miert-promnet">
        <span className="pn-lbl">03 — Miért PromNET</span>
        <div className="pn-trust-grid">
          <div>
            <h2 className="pn-sec-title">Senior backend/<br />infra fókusz</h2>
            <p className="pn-body">
              A cél nem a látvány, hanem a működés. Produkciós rendszerekben gondolkodom,
              ahol a stabilitás, az átláthatóság és a terhelhetőség számít.
            </p>
          </div>
          <div>
            {TRUST.map((t, i) => (
              <div key={i} className="pn-trust-item">
                <span className="pn-trust-n">{String(i + 1).padStart(2, "0")}</span>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REFERENCES ── */}
      <div className="pn-sec-alt">
        <div className="pn-sec" id="referenciak" style={{ borderTop: "none" }}>
          <div className="pn-ref-bar">
            <div>
              <span className="pn-lbl">04 — Referenciák</span>
              <h2 className="pn-sec-title" style={{ marginBottom: 0 }}>
                Weboldal és rendszer<br />referenciák
              </h2>
            </div>
            <div className="pn-filter-group">
              {[["all", "Összes"], ["live", "Élő"], ["archived", "Archív"]].map(([k, l]) => (
                <button key={k} className={`pn-flt ${refFilter === k ? "on" : ""}`}
                  onClick={() => setRefFilter(k)}>{l}</button>
              ))}
            </div>
          </div>
          <div className="pn-ref-grid">
            {filtered.map((p) => (
              <Link key={p.name} href={p.href} target="_blank" rel="noopener noreferrer"
                className="pn-ref-card">
                <div className="pn-ref-top">
                  <h3 className="pn-ref-name">{p.name}</h3>
                  {p.status === "live"
                    ? <span className="pn-live">● élő</span>
                    : <span className="pn-arch">○ archív</span>}
                </div>
                <p className="pn-ref-desc">{p.description}</p>
                <div className="pn-ref-tags">
                  {p.tags.map((t) => <span key={t} className="pn-tag">{t}</span>)}
                </div>
              </Link>
            ))}
          </div>
          {filtered.length === 0 && (
            <p style={{ textAlign: "center", color: "var(--muted)", paddingTop: "3rem", fontFamily: "var(--mono)", fontSize: ".75rem" }}>
              Nincs találat ebben a szűrőben.
            </p>
          )}
        </div>
      </div>

      {/* ── PROCESS ── */}
      <section className="pn-sec">
        <span className="pn-lbl">05 — Folyamat</span>
        <h2 className="pn-sec-title">Egyenes, mérhető lépések</h2>
        <div className="pn-proc-grid">
          {PROCESS.map((p) => (
            <div key={p.n} className="pn-proc-item">
              <span className="pn-proc-n">{p.n}</span>
              <h3 className="pn-proc-title">{p.title}</h3>
              <p className="pn-proc-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="pn-cta-wrap">
        <div className="pn-cta">
          <div className="pn-cta-line" />
          <span className="pn-lbl" style={{ display: "block", marginBottom: "1rem" }}>Kezdjük el</span>
          <h2 className="pn-cta-title">Van egy rendszerötleted vagy<br />meglévő backend problémád?</h2>
          <p className="pn-cta-sub">Írj pár mondatot a helyzetről, és visszajelzek a lehetséges irányokról.</p>
          <div className="pn-cta-btns">
            <Link href="mailto:info@promnet.hu"
              onClick={() => trackCtaClick("cta-main", { location: "cta" })}
              className="pn-btn-p no-underline">
              Beszéljünk →
            </Link>
            <Link href="#referenciak" className="pn-btn-g no-underline">Referenciák megnézése</Link>
          </div>
        </div>
      </div>

      {/* ── CONTACT ── */}
      <div className="pn-sec-alt" id="kapcsolat">
        <div className="pn-split">
          <div className="flex flex-col gap-6">
            <span className="pn-lbl">06 — Kapcsolat</span>
            <h2 className="pn-sec-title" style={{ margin: 0 }}>Gyors egyeztetés,<br />tiszta irány</h2>
            <p className="pn-body">
              Írj pár mondatot a problémáról vagy az ötletedről. Visszajelzek, hogy mi a reális
              irány, mennyi idő és milyen lépések kellenek hozzá.
            </p>
            <div className="flex flex-col gap-2">
              <a href="mailto:info@promnet.hu" className="pn-clink">info@promnet.hu</a>
              <a href="tel:+36205494107" className="pn-clink">+36 20 549 4107</a>
              <p style={{ color: "var(--muted2)", fontSize: ".9375rem" }}>
                4324 Kállósemjén, Kölcsey Ferenc út 11.
              </p>
            </div>
          </div>
          <div>
            <div className="pn-ops-card">
              <span className="pn-lbl" style={{ marginBottom: ".875rem" }}>Működés</span>
              <h3 style={{ fontSize: "1.0625rem", fontWeight: 600, color: "var(--fg)" }}>
                Praktikus keretek
              </h3>
              <ul className="pn-check-list">
                {[
                  "Átlátható scope és mérföldkövek",
                  "Heti státusz és rövid, technikai összefoglaló",
                  "Dokumentált átadás és opcionális üzemeltetés",
                ].map((item) => (
                  <li key={item}><span className="pn-dash">—</span>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
