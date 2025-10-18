"use client";

import Link from "next/link";
import React from "react";
import { PiArrowLeftThin } from "react-icons/pi";
import { motion } from "framer-motion";

const projects = [
  {
    name: "Creatify",
    href: "https://creatify.hu",
    description: "Digitális tartalom értékesítésével foglalkozó webáruház.",
    status: "live",
    tags: ["Webshop", "Digitális termékek"],
  },
  {
    name: "CsumpiNET",
    href: "https://csumpinet.hu",
    description: "Webhoszting szolgáltatás könnyed, humoros megközelítésben.",
    status: "live",
    tags: ["Hosting", "Saját brand"],
  },
  {
    name: "Online Torta",
    href: "https://onlinetorta.hu",
    description: "Torták és sütemények rendelését biztosító webáruház.",
    status: "live",
    tags: ["Webshop", "Gasztronómia"],
  },
  {
    name: "Tükörműhely",
    href: "https://tukormuhely.hu",
    description: "Egyedi tükrök gyártására és értékesítésére fókuszáló oldal.",
    status: "live",
    tags: ["Bemutatkozó", "Gyártás"],
  },
  {
    name: "Weddingarts webáruház",
    href: "https://webshop.weddingarts.hu/",
    description: "Esküvői dekorációkat és kiegészítőket kínáló webáruház.",
    status: "live",
    tags: ["Webshop", "Esküvő"],
  },
  {
    name: "Art by Sylvia Szluka",
    href: "https://artbysylviaszluka.hu/",
    description: "Festmények és művészeti alkotások bemutatása és értékesítése.",
    status: "live",
    tags: ["Portfólió", "Művészet"],
  },
  {
    name: "TradeHUB",
    href: "https://tradehub.hu",
    description: "Piac jellegű értékesítő oldal.",
    status: "archived",
    statusNote: "Ez az oldal már nem elérhető.",
    tags: ["Marketplace"],
  },
  {
    name: "Hajnal Kárpit",
    href: "https://hajnalkarpit.hu",
    description: "Bútorgyártással és kárpitozással foglalkozó vállalkozás bemutatkozása.",
    status: "live",
    tags: ["Bemutatkozó", "Belsőépítészet"],
  },
  {
    name: "Mémgyűjtő",
    href: "https://memgyujto.hu",
    description: "Vicces képek és mémek gyűjteménye.",
    status: "archived",
    statusNote: "Sajnos már nem elérhető.",
    tags: ["Közösség", "Szórakozás"],
  },
  {
    name: "Moziverzum",
    href: "https://moziverzum.hu",
    description: "Filmek és sorozatok gyűjteményét összegyűjtő oldal.",
    status: "archived",
    statusNote: "Sajnos már nem elérhető.",
    tags: ["Szórakozás"],
  },
  {
    name: "Életen át",
    href: "https://eletenat.hu",
    description: "Rendezvényszervező vállalkozás bemutatkozó oldala.",
    status: "archived",
    statusNote: "Sajnos már nem elérhető.",
    tags: ["Bemutatkozó", "Szolgáltatás"],
  },
  {
    name: "Euro Five Rádió",
    href: "https://eurofiveradio.hu",
    description: "Online rádió portál és közösségi platform.",
    status: "archived",
    statusNote: "Sajnos már nem elérhető.",
    tags: ["Média"],
  },
  {
    name: "Babóca Pelus webáruház",
    href: "https://babocapelus.hu",
    description: "Babaholmikat és kiegészítőket értékesítő webshop.",
    status: "archived",
    statusNote: "Sajnos már nem elérhető.",
    tags: ["Webshop", "Baba"],
  },
  {
    name: "PlayHost - játékszerver hosting",
    href: "https://playhost.hu",
    description: "Játékszerver bérlésével foglalkozó weboldal.",
    status: "archived",
    statusNote: "Sajnos már nem elérhető. A domain eladó!",
    tags: ["Hosting", "Gaming"],
  },
  {
    name: "Elis Nilufer portfólió",
    href: "https://elisnilufer.hu",
    description: "Könyvíró személyes bemutatkozó oldala.",
    status: "archived",
    statusNote: "Sajnos már nem elérhető.",
    tags: ["Portfólió", "Irodalom"],
  },
  {
    name: "Kru-Tim Trans portfólió",
    href: "https://krutimtrans.hu",
    description: "Szállítmányozással foglalkozó vállalkozás online jelenléte.",
    status: "archived",
    statusNote: "Sajnos már nem elérhető.",
    tags: ["Bemutatkozó", "Logisztika"],
  },
  {
    name: "Dobai Food pizzéria",
    href: "https://dobaifood.hu",
    description: "Pizzéria online rendelési felülete.",
    status: "archived",
    statusNote: "Sajnos már nem elérhető.",
    tags: ["Vendéglátás", "Webshop"],
  },
  {
    name: "Vízszivárgás bemérés - Rajt Attila E.V.",
    href: "https://vizszivargasbemeres.hu",
    description: "Víz-, gáz- és fűtésszereléssel foglalkozó szolgáltató weboldala.",
    status: "live",
    tags: ["Bemutatkozó", "Szolgáltatás"],
  },
  {
    name: "Dina Photography",
    href: "https://dinaphotography.hu",
    description: "Portréfotózással foglalkozó fotós bemutatkozó oldala.",
    status: "archived",
    statusNote: "Sajnos már nem elérhető.",
    tags: ["Portfólió", "Fotózás"],
  },
  {
    name: "Statue Print",
    href: "https://statueprint.com",
    description: "3D nyomtatott modelleket értékesítő webshop (angol nyelven).",
    status: "live",
    tags: ["Webshop", "3D nyomtatás"],
  },
  {
    name: "Nistor Egon E.V. portfólió",
    href: "https://nistoregon.hu",
    description: "Nyílászárók szerelésével foglalkozó vállalkozás bemutatkozó oldala.",
    status: "live",
    tags: ["Bemutatkozó", "Építőipar"],
  },
  {
    name: "PromNET webáruház",
    href: "https://promshop.hu",
    description: "Hálózati eszközöket kínáló webáruház (saját projekt).",
    status: "live",
    tags: ["Webshop", "Saját brand"],
  },
  {
    name: "TechLab Insights",
    href: "https://techlabinsights.com",
    description: "3D nyomtatással és modellek értékesítésével foglalkozó angol nyelvű oldal.",
    status: "live",
    tags: ["Blog", "3D nyomtatás"],
  },
  {
    name: "PromARK",
    href: "https://promark.promnet.cloud",
    description: "ARK Survival Evolved – Ascended közösségi oldal (saját projekt).",
    status: "live",
    tags: ["Gaming", "Közösség", "Saját brand"],
  },
];

const statusConfig = {
  live: {
    label: "Élő",
    badgeClass:
      "bg-emerald-500/20 text-emerald-200 border border-emerald-400/30",
    dotClass: "bg-emerald-400",
  },
  archived: {
    label: "Archív",
    badgeClass: "bg-rose-500/15 text-rose-200 border border-rose-400/20",
    dotClass: "bg-rose-400",
  },
};

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
          className="text-3xl font-RubikExtraBold text-center"
        >
          Eddigi projekteim
        </motion.h1>
        <div className="flex items-center gap-x-2 justify-center my-4 font-RubikRegular">
          <p className="bg-[#282828] w-fit text-neutral-300 rounded-md px-2 h-5 flex items-center justify-center text-[10px]">
            Portfolio Weboldalak
          </p>
          <div className="w-1 h-1 rounded-full bg-neutral-400" />
          <span className="text-xs">Frissítve: 2024.11.19.</span>
        </div>
        <section className="relative py-8 md:py-12">
          <div className="relative">
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => {
                const status = statusConfig[project.status];

                return (
                  <motion.article
                    key={project.name}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.5 }}
                    className="group flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-neutral-900/80 p-6 text-neutral-100 shadow-[0_20px_60px_-30px_rgba(59,130,246,0.35)] transition hover:-translate-y-2 hover:border-white/30 hover:shadow-[0_30px_90px_-40px_rgba(236,72,153,0.35)]"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <h3
                          className={`text-lg font-RubikMedium ${
                            project.status === "archived"
                              ? "text-neutral-300"
                              : "text-neutral-50"
                          }`}
                        >
                          {project.name}
                        </h3>
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-RubikMedium uppercase tracking-wide ${status.badgeClass}`}
                        >
                          <span className={`h-2 w-2 rounded-full ${status.dotClass}`} />
                          {status.label}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-300">{project.description}</p>
                      {project.statusNote ? (
                        <p className="text-xs text-rose-300">{project.statusNote}</p>
                      ) : null}
                    </div>
                    <div className="mt-4 flex items-end justify-between">
                      <div className="flex flex-wrap gap-2 text-[11px] text-neutral-400">
                        {project.tags.map((tag) => (
                          <span
                            key={`${project.name}-${tag}`}
                            className="rounded-full border border-white/10 bg-neutral-950/40 px-2 py-1"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-RubikMedium transition ${
                          project.status === "archived"
                            ? "border-white/10 text-neutral-400 hover:border-rose-300/40 hover:text-rose-200"
                            : "border-amber-300/50 text-amber-200 hover:border-amber-200 hover:text-amber-100"
                        }`}
                      >
                        {project.status === "archived" ? "Részletek" : "Megnyitás"}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </motion.article>
                );
              })}
            </div>
            <p className="mt-6 text-center text-xs text-neutral-500">*A lista nem teljes.</p>
          </div>
        </section>
      </div>
    </motion.div>
  );
}

export default Page;
