"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PiArrowLeftThin } from "react-icons/pi";
import { FaChartLine, FaFigma, FaMailBulk, FaServer, FaShoppingCart } from "react-icons/fa";
import { trackCtaClick } from "@/lib/analytics";

const projectHighlights = [
  {
    title: "Konverzió",
    value: "+32%",
    description: "Webshop funnel optimalizáció, A/B tesztelt checkout lépések és remarketing kampányok.",
  },
  {
    title: "Átlagos kosárérték",
    value: "+18%",
    description: "Cross-sell blokkok, dinamikus ajánlók és személyre szabott kuponlogika.",
  },
  {
    title: "Support terhelés",
    value: "-27%",
    description: "Automatikus onboarding e-mailek, self-service tudásbázis és chat triage.",
  },
];

const stack = [
  "Next.js 14 + React Server Components",
  "Stripe + Barion fizetési integráció",
  "Sanity headless CMS",
  "Cloudflare Pages + Workers edge cache",
  "Plausible + GA4 analitika",
];

const phases = [
  {
    label: "1. Discovery & benchmark",
    details:
      "Versenytársak auditja, Google Analytics + Hotjar adatgyűjtés, KPI-k rögzítése és workshop a vezetőséggel.",
  },
  {
    label: "2. UX/UI és tartalom",
    details:
      "Figma prototípus, moduláris komponensek, landing sablonok. Copywriting támogatás konverzió fókuszú tartalommal.",
  },
  {
    label: "3. Fejlesztés és automatizáció",
    details:
      "Next.js komponensek, Resend alapú e-mail automatizmus, CRM webhookok és CI/CD pipeline.",
  },
  {
    label: "4. Mérés és támogatás",
    details:
      "Plausible dashboard, event tracking, konverziós riportok és havi optimalizációs sprint.",
  },
];

export default function CreatifyCaseStudyPage() {
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
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-200">
            digitális termékfejlesztés
          </span>
          <h1 className="text-3xl font-RubikExtraBold text-neutral-50">Creatify – digitális tartalom platform megújulása</h1>
          <p className="text-sm text-neutral-300">
            A Creatify csapata digitális sablonokat és marketing eszközöket értékesít európai kisvállalkozásoknak. A célunk egy olyan új márka- és felhasználói élmény volt, amely gyorsabbá, érthetőbbé és mérhetőbbé teszi az értékesítést.
          </p>
        </motion.header>

        <section className="grid gap-4 rounded-2xl border border-white/10 bg-neutral-900/60 p-5 md:grid-cols-3">
          {projectHighlights.map((item) => (
            <div key={item.title} className="rounded-xl border border-white/10 bg-neutral-950/60 p-4">
              <span className="text-[11px] uppercase tracking-[0.3em] text-emerald-200">{item.title}</span>
              <p className="mt-2 text-2xl font-RubikExtraBold text-emerald-100">{item.value}</p>
              <p className="mt-2 text-xs text-neutral-400">{item.description}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-[2fr,1fr]">
          <article className="rounded-2xl border border-white/10 bg-neutral-900/60 p-5 text-neutral-200">
            <h2 className="text-lg font-RubikMedium text-neutral-50">Kihívás</h2>
            <p className="mt-2 text-sm text-neutral-300">
              A régi webshop sablonos volt, hosszú volt a vásárlási folyamat, és hiányzott az egységes mérés. A support csapat manuálisan kezelte a visszatérő kérdéseket, ami rengeteg időt vitt el.
            </p>
            <h2 className="mt-6 text-lg font-RubikMedium text-neutral-50">Megoldás</h2>
            <ul className="mt-2 space-y-2 text-sm text-neutral-300">
              <li className="flex items-start gap-2">
                <FaFigma className="mt-1 text-emerald-300" />
                <span>Mobil-first Figma design rendszer 28 új komponenssel.</span>
              </li>
              <li className="flex items-start gap-2">
                <FaShoppingCart className="mt-1 text-emerald-300" />
                <span>Új vásárlási funnel, dinamikus kosár ajánlások és progress bar a checkoutban.</span>
              </li>
              <li className="flex items-start gap-2">
                <FaMailBulk className="mt-1 text-emerald-300" />
                <span>Automatizált onboarding e-mailek és upsell kampányok Resend + Customer.io integrációval.</span>
              </li>
              <li className="flex items-start gap-2">
                <FaServer className="mt-1 text-emerald-300" />
                <span>Cloudflare Pages deploy, edge cache szabályok és serverless API a licenckulcs kezeléshez.</span>
              </li>
              <li className="flex items-start gap-2">
                <FaChartLine className="mt-1 text-emerald-300" />
                <span>Plausible + GA4 eseménykövetés, real-time dashboard a marketing csapatnak.</span>
              </li>
            </ul>
          </article>
          <aside className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-neutral-900/60 p-5 text-sm text-neutral-300">
            <div>
              <h3 className="text-base font-RubikMedium text-neutral-100">Projekt tények</h3>
              <ul className="mt-2 space-y-1 text-neutral-300">
                <li>Időtartam: 6 hét (2 sprint)</li>
                <li>Csapat: 1 UX, 1 fejlesztő, 1 marketing tanácsadó</li>
                <li>Technológiák: {stack.slice(0, 2).join(", ")}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-base font-RubikMedium text-neutral-100">Felhasznált stack</h3>
              <ul className="mt-2 space-y-1 text-neutral-300">
                {stack.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </aside>
        </section>

        <section className="grid gap-3 rounded-2xl border border-white/10 bg-neutral-900/60 p-5">
          <h2 className="text-lg font-RubikMedium text-neutral-50">Projekt menete</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {phases.map((phase) => (
              <div key={phase.label} className="rounded-xl border border-white/10 bg-neutral-950/60 p-4">
                <h3 className="text-sm font-RubikMedium text-neutral-200">{phase.label}</h3>
                <p className="mt-2 text-sm text-neutral-400">{phase.details}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-5 text-neutral-900">
          <h2 className="text-lg font-RubikMedium">Hasonló eredményeket szeretnél?</h2>
          <p className="text-sm">
            Foglalj 30 perces konzultációt, ahol átbeszéljük a céljaidat, és vázolok egy akciótervet. A hívás után írásban is megkapod az ajánlást.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="https://cal.com/promnet/30-perces-konzultacio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2 text-sm font-RubikMedium text-emerald-100 transition hover:-translate-y-0.5 hover:bg-neutral-800"
              onClick={() => trackCtaClick("case-study-cal", { case: "creatify" })}
            >
              Konzultáció foglalása
            </Link>
            <Link
              href="#lead-form"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-900 px-5 py-2 text-sm font-RubikMedium text-neutral-900 transition hover:-translate-y-0.5 hover:border-neutral-700"
              onClick={() => trackCtaClick("case-study-lead", { case: "creatify" })}
            >
              Projekt megbeszélése
            </Link>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
