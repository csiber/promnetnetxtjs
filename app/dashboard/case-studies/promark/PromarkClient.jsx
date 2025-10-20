"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PiArrowLeftThin } from "react-icons/pi";
import { FaCloud, FaHeadset, FaNetworkWired, FaRegClock, FaUsers } from "react-icons/fa";
import { trackCtaClick } from "@/lib/analytics";

const impact = [
  {
    title: "Aktív tagok",
    value: "+41%",
    detail: "Szegmentált onboarding folyam, gamifikált jutalmak és közösségi esemény modul.",
  },
  {
    title: "Oldalon töltött idő",
    value: "+22%",
    detail: "Egyedi feed algoritmus és valós idejű esemény stream Next.js streaminggel.",
  },
  {
    title: "Szerver leállások",
    value: "-80%",
    detail: "Automatikus failover, Terraform alapú infrastruktúra és 24/7 monitoring.",
  },
];

const infraStack = [
  "Next.js 14 App Router",
  "Fastify + WebSocket gateway",
  "PostgreSQL + Prisma",
  "Redis alapú cache réteg",
  "Docker + Terraform + Hetzner Cloud",
];

const milestones = [
  {
    title: "Discovery sprint",
    description:
      "Közösségi igényfelmérés, moderátor interjúk és status quo audit. Megalkottuk a növekedési célokat és SLA-t.",
  },
  {
    title: "Mikroszerviz architektúra",
    description:
      "Felépítettük a kommunikációs gateway-t, auth szolgáltatást és logging pipeline-t, IaC sablonokkal.",
  },
  {
    title: "Közösségi modulok",
    description:
      "Egyedi rangrendszer, esemény naptár, moduláris feed komponensek és Discord szinkronizáció.",
  },
  {
    title: "Üzemeltetés",
    description:
      "Prometheus + Grafana monitoring, PagerDuty riasztások, havi teljesítmény riport és proaktív kapacitás-tervezés.",
  },
];

export default function PromarkCaseStudyPage() {
  return (
    <motion.div
      className="text-neutral-50"
      initial={{ y: 100, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.8,
          delay: 0.4,
          type: "spring",
          stiffness: 200,
        },
      }}
    >
      <div className="sticky top-5">
        <div className="-mt-6">
          <div className="flex h-10 w-full items-center gap-x-7 rounded-xl bg-neutral-700/25 backdrop-blur-md">
            <Link href={"/dashboard/case-studies"}>
              <div className="ml-3 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-700/50">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-300">
                  <PiArrowLeftThin className="text-lg text-black" />
                </div>
              </div>
            </Link>
            <Link href={"/dashboard/case-studies"}>
              <button className="h-6 w-28 rounded-md bg-neutral-700/25 text-xs">Esettanulmányok</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-9 flex flex-col gap-6 rounded-2xl border border-neutral-700 bg-[#1C1C1C] p-5">
        <motion.header
          initial={{ x: 60, opacity: 0, filter: "blur(6px)" }}
          animate={{
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
              duration: 0.8,
              delay: 0.6,
              type: "spring",
              stiffness: 200,
            },
          }}
          className="space-y-4"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-sky-200">
            közösségi platform
          </span>
          <h1 className="text-3xl font-RubikExtraBold text-neutral-50">PromARK – gamer közösség skálázható infrastruktúrája</h1>
          <p className="text-sm text-neutral-300">
            A PromARK több ezer gamer közösséget szolgál ki. A cél egy stabil, moduláris és könnyen karbantartható platform volt, amely kiszolgálja a folyamatosan növekvő igényeket.
          </p>
        </motion.header>

        <section className="grid gap-4 rounded-2xl border border-white/10 bg-neutral-900/60 p-5 md:grid-cols-3">
          {impact.map((item) => (
            <div key={item.title} className="rounded-xl border border-white/10 bg-neutral-950/60 p-4">
              <span className="text-[11px] uppercase tracking-[0.3em] text-sky-200">{item.title}</span>
              <p className="mt-2 text-2xl font-RubikExtraBold text-sky-100">{item.value}</p>
              <p className="mt-2 text-xs text-neutral-400">{item.detail}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-[2fr,1fr]">
          <article className="rounded-2xl border border-white/10 bg-neutral-900/60 p-5 text-neutral-200">
            <h2 className="text-lg font-RubikMedium text-neutral-50">Kihívás</h2>
            <p className="mt-2 text-sm text-neutral-300">
              A régi szerver infrastruktúra monolitikus volt, gyakori leállásokkal és manuális deploy folyamattal. A közösség gyorsan bővült, de az onboarding lassú, a support túlterhelt volt.
            </p>
            <h2 className="mt-6 text-lg font-RubikMedium text-neutral-50">Megoldás</h2>
            <ul className="mt-2 space-y-2 text-sm text-neutral-300">
              <li className="flex items-start gap-2">
                <FaCloud className="mt-1 text-sky-300" />
                <span>Hetzner Cloud alapú Kubernetes klaszter Terraform infrastruktúrával.</span>
              </li>
              <li className="flex items-start gap-2">
                <FaNetworkWired className="mt-1 text-sky-300" />
                <span>Valós idejű kommunikáció WebSocket gateway és Redis pub/sub réteg segítségével.</span>
              </li>
              <li className="flex items-start gap-2">
                <FaUsers className="mt-1 text-sky-300" />
                <span>Automatikus rangrendszer, reputáció pontozás és esemény modul.</span>
              </li>
              <li className="flex items-start gap-2">
                <FaRegClock className="mt-1 text-sky-300" />
                <span>Zero-downtime deploy CI/CD-vel, canary release forgatókönyvek.</span>
              </li>
              <li className="flex items-start gap-2">
                <FaHeadset className="mt-1 text-sky-300" />
                <span>Support triage bot, Discord és HelpScout integráció.</span>
              </li>
            </ul>
          </article>
          <aside className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-neutral-900/60 p-5 text-sm text-neutral-300">
            <div>
              <h3 className="text-base font-RubikMedium text-neutral-100">Projekt tények</h3>
              <ul className="mt-2 space-y-1 text-neutral-300">
                <li>Időtartam: 8 hét + ongoing DevOps</li>
                <li>Csapat: 2 fejlesztő, 1 DevOps, 1 community lead</li>
                <li>Technológiák: {infraStack.slice(0, 2).join(", ")}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-base font-RubikMedium text-neutral-100">Felhasznált stack</h3>
              <ul className="mt-2 space-y-1 text-neutral-300">
                {infraStack.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </aside>
        </section>

        <section className="grid gap-3 rounded-2xl border border-white/10 bg-neutral-900/60 p-5">
          <h2 className="text-lg font-RubikMedium text-neutral-50">Mérföldkövek</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {milestones.map((item) => (
              <div key={item.title} className="rounded-xl border border-white/10 bg-neutral-950/60 p-4">
                <h3 className="text-sm font-RubikMedium text-neutral-200">{item.title}</h3>
                <p className="mt-2 text-sm text-neutral-400">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4 rounded-2xl border border-sky-400/30 bg-sky-500/10 p-5 text-neutral-900">
          <h2 className="text-lg font-RubikMedium">Infrastruktúra modernizációt tervezel?</h2>
          <p className="text-sm">
            Szívesen segítek a meglévő rendszered auditjában, költségoptimalizációban vagy teljes újratervezésben. A konzultáció ingyenes, csak foglalj időpontot.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="https://cal.com/promnet/30-perces-konzultacio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2 text-sm font-RubikMedium text-sky-100 transition hover:-translate-y-0.5 hover:bg-neutral-800"
              onClick={() => trackCtaClick("case-study-cal", { case: "promark" })}
            >
              Konzultáció foglalása
            </Link>
            <Link
              href="#lead-form"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-900 px-5 py-2 text-sm font-RubikMedium text-neutral-900 transition hover:-translate-y-0.5 hover:border-neutral-700"
              onClick={() => trackCtaClick("case-study-lead", { case: "promark" })}
            >
              Projekt megbeszélése
            </Link>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
