"use client";

import Link from "next/link";
import React from "react";
import { PiArrowLeftThin } from "react-icons/pi";
import { motion } from "framer-motion";
import {
  FaGlobe,
  FaWordpress,
  FaCode,
  FaHandshake,
  FaServer,
  FaClock,
} from "react-icons/fa";
import { trackCtaClick } from "@/lib/analytics";

const packages = [
  {
    name: "Alap bemutatkozó",
    price: "249 000 Ft-tól",
    target: "Kisvállalkozások, szolgáltatók",
    delivery: "2-3 hét",
    features: [
      "3-5 oldalas reszponzív weboldal",
      "Egyedi design + arculati illesztés",
      "Kontakt űrlap és alap analitika",
      "1 év tárhely + domain a partner hostingban",
    ],
  },
  {
    name: "Pro webshop",
    price: "449 000 Ft-tól",
    target: "E-kereskedelmi projektek",
    delivery: "3-5 hét",
    features: [
      "Termék- és kategóriakezelés",
      "Online fizetési integráció",
      "Kampánymérés és konverziókövetés",
      "Marketing automatizmusok (hírlevél, elhagyott kosár)",
    ],
  },
  {
    name: "Egyedi rendszer",
    price: "Egyedi ajánlat",
    target: "Komplex, integrációt igénylő projektek",
    delivery: "4-8 hét",
    features: [
      "Folyamatfeltérképezés és UX workshop",
      "Speciális modulok (időpontfoglaló, CRM integráció)",
      "Skálázható infrastruktúra és CI/CD",
      "Külön karbantartási és üzemeltetési SLA",
    ],
  },
];

const processSteps = [
  {
    title: "Discovery & brief",
    description: "Közös kickoff, célmeghatározás, versenytárselemzés, technológiai stack kiválasztása.",
  },
  {
    title: "Wireframe & design sprint",
    description: "Navigáció, UX-flow, prototípus és vizuális irány egyeztetése, módosítási körök dokumentálva.",
  },
  {
    title: "Fejlesztés & integráció",
    description: "Reszponzív build, tartalom bekötés, tesztfázis automatizált ellenőrzésekkel (SEO, sebesség, akadálymentesség).",
  },
  {
    title: "Átadás & támogatás",
    description: "Launch terv, oktató anyagok, mérési dashboard beállítása és 30 napos finomhangolási időszak.",
  },
];

const extras = [
  {
    title: "Teljes körű üzemeltetés",
    description: "Monitoring, biztonsági mentések, szerverfrissítések és SLA szerinti reakcióidő. Ideális, ha a fejlesztés után sem szeretnél technikai teendőkkel foglalkozni.",
  },
  {
    title: "Tartalommarketing csomag",
    description: "Landing oldalak, blogcikkek, automatizált hírlevelek – a konverziónöveléshez tartalmi támogatást is kapsz.",
  },
  {
    title: "Rendszerintegrációk",
    description: "CRM, számlázó, készletkezelő vagy marketing eszközök összekötése biztonságos API integrációval.",
  },
];

function Page() {
  return (
    <motion.div
      className="text-neutral-50"
      initial={{ y: 100, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.8,
          delay: 0.9,
          type: "spring",
          stiffness: 200,
        },
      }}
    >
      <div className="sticky top-5">
        <div>
          <div className="-mt-6">
            <div className="bg-neutral-700/25 backdrop-blur-md h-10 w-full rounded-xl flex items-center gap-x-7">
              <Link href={"/dashboard"}>
                <div className="bg-neutral-700/50 h-8 w-8 rounded-full flex items-center justify-center ml-3">
                  <div className="bg-neutral-300 rounded-full h-5 w-5 flex items-center justify-center">
                    <PiArrowLeftThin className="text-black text-lg" />
                  </div>
                </div>
              </Link>
              <Link href={"/dashboard"}>
                <button className="text-xs bg-neutral-700/25 p-1 w-16 h-6 rounded-md">
                  Kezdőlap
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-9 w-full p-5 border border-neutral-700 rounded-2xl h-full bg-[#1C1C1C]">
        <motion.h1
          initial={{ x: 100, opacity: 0, filter: "blur(4px)" }}
          animate={{
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
              duration: 0.8,
              delay: 0.9,
              type: "spring",
              stiffness: 200,
            },
          }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-RubikExtraBold text-center text-neutral-100"
        >
          Weboldal fejlesztés
        </motion.h1>
        <div className="flex items-center gap-x-2 justify-center my-4 font-RubikRegular">
          <p className="bg-[#282828] w-fit text-neutral-300 rounded-md px-2 h-5 flex items-center justify-center text-[10px]">
            Portfolio Weboldalak, Céges oldal, Webáruház
          </p>
          <div className="w-1 h-1 rounded-full bg-neutral-400" />
          <span className="text-xs text-neutral-300">
            Frissítve: 2024.07.09.
          </span>
        </div>
        <section className="relative md:py-12 py-8">
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className="flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900/80 via-neutral-900/40 to-neutral-800/80 p-6 text-neutral-100 shadow-[0_30px_90px_-40px_rgba(59,130,246,0.35)]"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-RubikMedium text-neutral-50">{pkg.name}</h2>
                  <span className="rounded-full border border-amber-300/40 bg-amber-500/10 px-3 py-1 text-[11px] font-RubikMedium uppercase tracking-[0.25em] text-amber-200">
                    {pkg.delivery}
                  </span>
                </div>
                <p className="text-2xl font-RubikExtraBold text-amber-200">{pkg.price}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">{pkg.target}</p>
                <ul className="mt-2 space-y-2 text-sm text-neutral-200">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <FaGlobe className="mt-1 h-3.5 w-3.5 text-emerald-300" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="#lead-form"
                  className="mt-auto inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-RubikMedium text-neutral-50 transition hover:-translate-y-0.5 hover:border-amber-300/60 hover:text-amber-100"
                  onClick={() => trackCtaClick("webdev-lead", { package: pkg.name })}
                >
                  Ajánlatot kérek
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.5fr,1fr]">
            <div className="rounded-2xl border border-white/10 bg-neutral-900/70 p-6 text-neutral-100">
              <h2 className="text-xl font-RubikMedium text-neutral-50">Így zajlik a közös munka</h2>
              <div className="mt-6 grid gap-4">
                {processSteps.map((step, index) => (
                  <div
                    key={step.title}
                    className="rounded-xl border border-white/10 bg-neutral-950/60 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-RubikMedium text-neutral-200">{step.title}</span>
                      <span className="text-xs text-neutral-500">0{index + 1}</span>
                    </div>
                    <p className="mt-2 text-sm text-neutral-300">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-6 text-neutral-50">
              <h3 className="text-lg font-RubikMedium">Mit tartalmaz minden csomag?</h3>
              <ul className="space-y-3 text-sm text-neutral-100">
                <li className="flex items-start gap-2">
                  <FaWordpress className="mt-1 h-3.5 w-3.5 text-neutral-900" />
                  <span>Modern, reszponzív felület optimalizálva mobilra és asztali gépre is.</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCode className="mt-1 h-3.5 w-3.5 text-neutral-900" />
                  <span>Egyedi fejlesztés: nem sablonból dolgozom, így a márkád is megkülönböztethető marad.</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaServer className="mt-1 h-3.5 w-3.5 text-neutral-900" />
                  <span>1 év tárhely és domain partner hostingban, folyamatos státuszriporttal.</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaHandshake className="mt-1 h-3.5 w-3.5 text-neutral-900" />
                  <span>Transzparens kommunikáció, közös Trello / ClickUp board és heti státusz összefoglaló.</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaClock className="mt-1 h-3.5 w-3.5 text-neutral-900" />
                  <span>Garantált határidők és launch támogatás – a weboldal az egyeztetett időre éles.</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 grid gap-4 rounded-2xl border border-white/10 bg-neutral-900/60 p-6 text-neutral-100">
            <h2 className="text-xl font-RubikMedium text-neutral-50">További opciók a növekedéshez</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {extras.map((extra) => (
                <div key={extra.title} className="rounded-xl border border-white/10 bg-neutral-950/60 p-4">
                  <h3 className="text-base font-RubikMedium text-neutral-50">{extra.title}</h3>
                  <p className="mt-2 text-sm text-neutral-300">{extra.description}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-neutral-400">
              Személyre szabott kombinációk is kérhetők – vedd fel a kapcsolatot velem, és segítek kiválasztani a legjobb megoldást.
            </p>
          </div>
        </section>
      </div>
    </motion.div>
  );
}

export default Page;
