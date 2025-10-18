"use client";

import Link from "next/link";
import React, { useMemo, useState } from "react";
import { PiArrowLeftThin } from "react-icons/pi";
import { motion } from "framer-motion";
import {
  FaServer,
  FaGamepad,
  FaEnvelope,
  FaComments,
  FaMicrophoneAlt,
  FaHdd,
  FaCloud,
} from "react-icons/fa";

const hostingSolutions = [
  {
    id: "web",
    title: "Webhoszting",
    description:
      "Teljesen menedzselt tárhely kis- és középvállalkozások weboldalaihoz, WordPress-optimalizált stackkel.",
    icon: FaCloud,
    gradient: "from-sky-500/30 via-blue-500/20 to-indigo-500/20",
    href: "/dashboard/webhosting",
    specs: [
      "NVMe alapú tárolás, 99,9% rendelkezésre állás",
      "Automatikus napi mentések és verziókövetett deployment",
      "HTTP/3 + teljes körű SSL menedzsment",
    ],
    sla: "24 órán belüli reakció, hétvégén is",
    bestFor: "Marketing oldalak, bemutatkozó és kampány jellegű webhelyek",
    bundles: [
      "Weboldal fejlesztés + hosting alapcsomag",
      "Tartalomkezelés + üzemeltetés",
    ],
  },
  {
    id: "game",
    title: "Játékhoszting",
    description:
      "Alacsony pingű, dedikált erőforrásokra épülő játék szerver infrastruktúra monitorozással.",
    icon: FaGamepad,
    gradient: "from-purple-500/30 via-indigo-500/20 to-slate-500/20",
    href: "/dashboard/gamehosting",
    specs: [
      "DDoS védelem és valós idejű állapotfigyelés",
      "SSD / NVMe tárhely és magas órajelű CPU-k",
      "Automatizált mod és plugin telepítés",
    ],
    sla: "2 órás incidenskezelés, 0-24 monitorozás",
    bestFor: "Közösségi játék szerverek, e-sport csapatok, streamerek",
    bundles: [
      "Játékportál + szerver hoszting",
      "Discord bot + közösségi integráció",
    ],
  },
  {
    id: "email",
    title: "Email hoszting",
    description:
      "Professzionális levelezés saját domainnel, titkosítással és spamvédelemmel.",
    icon: FaEnvelope,
    gradient: "from-emerald-500/30 via-teal-500/20 to-cyan-500/20",
    href: "/dashboard/emailhosting",
    specs: [
      "DMARC, SPF, DKIM beállítás és folyamatos reputáció monitor",
      "Microsoft 365 / Google Workspace integráció",
      "Jogosultság- és postafiók menedzsment igény szerint",
    ],
    sla: "4 órán belüli reakció munkanapokon",
    bestFor: "Olyan vállalkozások, ahol kritikus az üzleti levelezés",
    bundles: ["Teljes cég infrastruktúra bevezetése", "Helpdesk automatizálás"],
  },
  {
    id: "mail",
    title: "Levelezés hoszting",
    description:
      "Nagy mennyiségű hírlevél és tranzakciós e-mail küldés dedikált szerverről.",
    icon: FaComments,
    gradient: "from-amber-500/30 via-orange-500/20 to-rose-500/20",
    href: "/dashboard/mailhosting",
    specs: [
      "Magas átviteli sebesség és IP reputáció menedzsment",
      "API és SMTP integráció marketing rendszerekhez",
      "Bounce és engagement riportok valós időben",
    ],
    sla: "Kampányidőszakban kiemelt támogatás",
    bestFor: "Hírlevél szolgáltatók, webshopok, SaaS termékek",
    bundles: ["Webshop + hírlevél automatizálás", "Marketing dashboard"],
  },
  {
    id: "radio",
    title: "Rádió hoszting",
    description:
      "Stabil, broadcast-ra optimalizált streaming szerverek rádiók és podcast stúdiók számára.",
    icon: FaMicrophoneAlt,
    gradient: "from-rose-500/30 via-red-500/20 to-orange-500/20",
    href: "/dashboard/radioserverhosting",
    specs: [
      "AAC+ és MP3 stream támogatás 320 kbps-ig",
      "Élő / automatizált műsorvezérlés, tracklista API",
      "Redundáns szerverek földrajzi terítéssel",
    ],
    sla: "1 órán belüli reagálás élő adás alatt",
    bestFor: "Online rádiók, zenei szolgáltatók, hybrid stúdiók",
    bundles: ["Weboldal + mobil app + rádió stream", "Reklámkampány mérés"],
  },
  {
    id: "vps",
    title: "VPS hoszting",
    description:
      "Menedzselt virtuális szerverek rugalmas skálázással és konténeres környezettel.",
    icon: FaHdd,
    gradient: "from-indigo-500/30 via-purple-500/20 to-slate-500/20",
    href: "/dashboard/vpshosting",
    specs: [
      "Kubernetes / Docker támogatás",
      "Terraform alapú infrastruktúra menedzsment",
      "VPN, tűzfal és titkosított adatforgalom",
    ],
    sla: "24/7 elérhető ügyelet, 1 órán belüli beavatkozás",
    bestFor: "SaaS, belső vállalati rendszerek, fejlesztői csapatok",
    bundles: ["CI/CD pipeline kialakítása", "Monitoring + log menedzsment"],
  },
  {
    id: "server",
    title: "Szerver hoszting",
    description:
      "Teljes körű menedzsment fizikai szerverekhez, auditált adatközpontban.",
    icon: FaServer,
    gradient: "from-amber-500/30 via-rose-500/20 to-purple-500/20",
    href: "/dashboard/serverhosting",
    specs: [
      "Rack elhelyezés, tápellátás, 24/7 fizikai hozzáférés",
      "Hardver felügyelet, rendszeres firmware frissítések",
      "Támogatott hibrid felhő architektúra",
    ],
    sla: "30 perces kritikus reagálás, dedikált account manager",
    bestFor: "Fintech, média streaming, nagyvállalati rendszerek",
    bundles: ["Disaster recovery terv", "Felhő + on-prem hibrid integráció"],
  },
];

function Page() {
  const [activeSolution, setActiveSolution] = useState(hostingSolutions[0]);

  const highlightMetrics = useMemo(
    () => [
      { label: "Aktív hoszting projekt", value: "40+" },
      { label: "Átlagos SLA", value: "<2 óra" },
      { label: "Mentések gyakorisága", value: "Napi" },
    ],
    []
  );

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
          Hoszting épités szolgáltatás
        </motion.h1>
        <div className="flex items-center gap-x-2 justify-center my-4 font-RubikRegular">
          <p className="bg-[#282828] w-fit text-neutral-300 rounded-md px-2 h-5 flex items-center justify-center text-[10px]">
            Web, Játék, Email, Rádiószerver, VPS, Szerver
          </p>
          <div className="w-1 h-1 rounded-full bg-neutral-400" />
          <span className="text-xs">Frissítve: 2024.07.09.</span>
        </div>
        <section className="relative py-8 md:py-12">
          <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
            <div className="grid gap-5">
              <div className="grid gap-4 md:grid-cols-2">
                {hostingSolutions.map((solution) => {
                  const Icon = solution.icon;
                  const isActive = activeSolution.id === solution.id;

                  return (
                    <button
                      key={solution.id}
                      type="button"
                      onClick={() => setActiveSolution(solution)}
                      className={`group flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-neutral-900/70 p-4 text-left transition ${
                        isActive
                          ? "border-emerald-300/60 shadow-[0_30px_90px_-40px_rgba(52,211,153,0.45)]"
                          : "hover:border-white/30 hover:-translate-y-1"
                      }`}
                    >
                      <div
                        className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${solution.gradient} p-4`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-black/30 p-3">
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-base font-RubikMedium text-neutral-50">{solution.title}</h3>
                            <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-200">
                              Specializált infrastruktúra
                            </p>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-neutral-300">{solution.description}</p>
                      <div className="flex flex-wrap gap-2 text-[11px] text-neutral-400">
                        {solution.bundles.slice(0, 2).map((bundle) => (
                          <span
                            key={`${solution.id}-${bundle}`}
                            className="rounded-full border border-white/10 bg-neutral-950/40 px-2 py-1"
                          >
                            {bundle}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={solution.href}
                        className="inline-flex w-fit items-center gap-2 text-xs font-RubikMedium text-emerald-200 transition hover:text-emerald-100"
                      >
                        Részletek megtekintése
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </button>
                  );
                })}
              </div>
              <div className="rounded-2xl border border-white/10 bg-neutral-900/70 p-6">
                <h3 className="text-lg font-RubikMedium text-neutral-50">
                  Miért érdemes rám bízni az üzemeltetést?
                </h3>
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  {highlightMetrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-xl border border-white/10 bg-neutral-950/60 p-4 text-center"
                    >
                      <p className="text-2xl font-RubikExtraBold text-emerald-200">{metric.value}</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-neutral-400">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-neutral-400">
                  Minden projektet monitorozok, és proaktív riasztásokat állítok be, így még a felhasználók előtt
                  kiderül, ha beavatkozásra van szükség.
                </p>
              </div>
            </div>
            <aside className="flex flex-col gap-4 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-6 text-neutral-50">
              <div>
                <span className="text-[11px] uppercase tracking-[0.3em] text-emerald-200">Aktív fókusz</span>
                <h3 className="mt-2 text-xl font-RubikMedium text-neutral-50">{activeSolution.title}</h3>
                <p className="mt-2 text-sm text-neutral-100">{activeSolution.description}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-neutral-950/40 p-4 text-neutral-100">
                <h4 className="text-sm font-RubikMedium">Kulcs jellemzők</h4>
                <ul className="mt-3 space-y-2 text-sm text-neutral-200">
                  {activeSolution.specs.map((spec) => (
                    <li key={`${activeSolution.id}-${spec}`} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-300" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-white/10 bg-neutral-950/40 p-4 text-sm text-neutral-200">
                <p>
                  <strong>SLA:</strong> {activeSolution.sla}
                </p>
                <p className="mt-2">
                  <strong>Ideális:</strong> {activeSolution.bestFor}
                </p>
                <p className="mt-2">
                  <strong>Kiegészítők:</strong> {activeSolution.bundles.join(", ")}
                </p>
              </div>
              <Link
                href={activeSolution.href}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-RubikMedium text-neutral-50 transition hover:-translate-y-0.5 hover:border-white/40"
              >
                Ajánlat a(z) {activeSolution.title} csomagra
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </aside>
          </div>
          <div className="mt-10 grid gap-6 rounded-2xl border border-white/10 bg-neutral-900/60 p-6 text-neutral-100 lg:grid-cols-[1fr,1fr]">
            <div>
              <h3 className="text-lg font-RubikMedium text-neutral-50">Weboldal + hosting, egy kézből</h3>
              <p className="mt-2 text-sm text-neutral-300">
                Ha a webfejlesztési szolgáltatásomat választod, az infrastruktúra-tervezéstől az üzemeltetésig
                végigkísérem a projektet. Így nincs kommunikációs szakadék a fejlesztők és az üzemeltetők között.
              </p>
              <Link
                href="/dashboard/webdev"
                className="mt-4 inline-flex items-center gap-2 text-xs font-RubikMedium text-emerald-200 transition hover:text-emerald-100"
              >
                Nézd meg a webfejlesztési csomagokat
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-neutral-100">
              <h4 className="text-base font-RubikMedium text-neutral-50">Audit & migráció</h4>
              <p className="mt-2">
                Meglévő rendszeredet is átvizsgálom: terhelési tesztet végzek, feltárom a szűk keresztmetszeteket, és
                ütemezetten migrálom az új környezetbe downtime nélkül.
              </p>
              <p className="mt-3 text-xs text-neutral-200">
                Ajánlatkéréskor kérj auditot, így pontos képet kapsz a jelenlegi infrastruktúrádról és a szükséges
                fejlesztésekről.
              </p>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}

export default Page;
