"use client";

import Link from "next/link";
import React, { useMemo, useState } from "react";
import { PiArrowLeftThin } from "react-icons/pi";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaTools,
  FaLaptop,
  FaTachometerAlt,
  FaHdd,
  FaRecycle,
  FaWindows,
  FaPrint,
  FaCheckCircle,
  FaGamepad,
  FaCamera,
  FaBook,
  FaClock,
  FaShieldAlt,
  FaTruck,
} from "react-icons/fa";
import { trackCtaClick } from "@/lib/analytics";

const supportPackages = [
  {
    name: "Alap gyorsszerviz",
    price: "9 900 Ft-tól",
    response: "48 órán belüli bevizsgálás",
    features: ["Szoftveres karbantartás", "Hardver diagnosztika", "Alap adatmentés"],
  },
  {
    name: "Prémium üzleti",
    price: "19 900 Ft-tól",
    response: "24 órán belüli bevizsgálás",
    features: ["Helyszíni kiszállás Sz-Sz-B megyében", "Csere laptop igény szerint", "Heti státuszriport"],
  },
  {
    name: "Non-stop ügyelet",
    price: "34 900 Ft-tól",
    response: "6 órán belüli hibaelhárítás",
    features: ["24/7 ügyelet", "Kritikus rendszerek monitorozása", "Proaktív karbantartási terv"],
  },
];

const faqs = [
  {
    question: "Mennyi idő alatt készül el a javítás?",
    answer:
      "Szoftveres hibák többsége 24 órán belül megoldható. Hardver csere esetén az alkatrész beérkezésétől függően 2-5 nap.",
  },
  {
    question: "Van lehetőség sürgősségi kiszállásra?",
    answer:
      "Igen, a Szabolcs-Szatmár-Bereg megyei címekre 3 órán belül ki tudok érkezni. Ezt a Prémium vagy Non-stop csomag tartalmazza.",
  },
  {
    question: "Adatmentésre is van megoldás?",
    answer:
      "SSD, HDD és pendrive adatmentést is vállalok. A sikerességet előzetes diagnosztika után tudom garantálni.",
  },
  {
    question: "Biztosítasz cserekészüléket?",
    answer:
      "Igen, üzleti ügyfelek számára van csere laptop és monitor készlet, hogy a leállás alatt se álljon meg a munka.",
  },
];

const logisticsOptions = [
  {
    label: "Hozod a készüléket",
    multiplier: 1,
    description: "Telephelyi átvétel Kállósemjénben időpontfoglalással.",
  },
  {
    label: "Futárral küldöd",
    multiplier: 1.15,
    description: "Foxpost / MPL futárral előre egyeztetett időpontban.",
  },
  {
    label: "Helyszíni kiszállás",
    multiplier: 1.35,
    description: "Személyes kiszállás Sz-Sz-B megyében akár aznap.",
  },
];

const basePrices = {
  "Alap gyorsszerviz": 9900,
  "Prémium üzleti": 19900,
  "Non-stop ügyelet": 34900,
};

const urgencyOptions = [
  { label: "Normál (2-3 nap)", value: "normal", multiplier: 1 },
  { label: "Sürgős (24 óra)", value: "urgent", multiplier: 1.3 },
  { label: "Azonnali (6 óra)", value: "immediate", multiplier: 1.6 },
];

const taskSuggestions = [
  {
    task: "Lassú laptop vagy asztali PC",
    suggestions: [
      "SSD-re vagy nagyobb kapacitású NVMe meghajtóra váltás a gyorsabb rendszerindításért.",
      "Memóriabővítés és a háttérben futó indítási programok átvizsgálása.",
      "Portalanítás és hűtés-karbantartás a teljesítmény visszaállításához.",
    ],
  },
  {
    task: "Nem kapcsol be az eszköz",
    suggestions: [
      "Tápegység, akkumulátor és töltőkábel állapotának ellenőrzése.",
      "Alaplap és tápellátási áramkör diagnosztikája rövidzárlat kizárására.",
      "BIOS-reset és firmware frissítés, ha a hardver rendben van.",
    ],
  },
  {
    task: "Adatmentési feladatok",
    suggestions: [
      "Forensik-barát klónozás a sérült meghajtóról további károsodás nélkül.",
      "NAS vagy felhő alapú redundáns mentési stratégia kialakítása a jövőbeni veszteség elkerülésére.",
      "Titkosított tárolás és jogosultságkezelés bevezetése üzleti adatokhoz.",
    ],
  },
  {
    task: "Vírus- vagy kártevőgyanús rendszer",
    suggestions: [
      "Offline vírusirtás és rootkit vizsgálat megbízható eszközökkel.",
      "Felhasználói jogosultságok auditja és többfaktoros védelem bekapcsolása.",
      "Biztonsági frissítések automatizálása és végpontvédelem telepítése.",
    ],
  },
];

function Page() {
  const [openFaq, setOpenFaq] = useState(0);
  const [deviceCount, setDeviceCount] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState(supportPackages[0].name);
  const [selectedLogistics, setSelectedLogistics] = useState(logisticsOptions[0]);
  const [selectedUrgency, setSelectedUrgency] = useState(urgencyOptions[0]);

  const selectedPackageDetails = useMemo(
    () => supportPackages.find((item) => item.name === selectedPackage) ?? supportPackages[0],
    [selectedPackage]
  );

  const priceEstimate = useMemo(() => {
    const base = basePrices[selectedPackage] ?? 9900;
    const logisticsMultiplier = selectedLogistics?.multiplier ?? 1;
    const urgencyMultiplier = selectedUrgency?.multiplier ?? 1;
    const estimated = base * deviceCount * logisticsMultiplier * urgencyMultiplier;
    const rounded = Math.ceil(estimated / 500) * 500;
    return new Intl.NumberFormat("hu-HU", { style: "currency", currency: "HUF", maximumFractionDigits: 0 }).format(rounded);
  }, [deviceCount, selectedLogistics, selectedUrgency, selectedPackage]);

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
          Informatikai szerviz szolgáltatás
        </motion.h1>
        <div className="flex items-center gap-x-2 justify-center my-4 font-RubikRegular">
          <p className="bg-[#282828] w-fit text-neutral-300 rounded-md px-2 h-5 flex items-center justify-center text-[10px]">
            Elektronikai szerviz, Kállósemjén
          </p>
          <div className="w-1 h-1 rounded-full bg-neutral-400" />
          <span className="text-xs">Frissítve: 2024.07.09.</span>
        </div>
        <section className="relative md:py-12 py-8">
          <div className="mt-6 bg-[#1C1C1C] rounded-lg text-neutral-400 p-4">
            <h2 className="text-xl font-RubikMedium text-neutral-100">
              Tevékenységek :
            </h2>
            <p className="mt-2 text-neutral-300">
              Elektronikai szervizünk az alábbi tevékenységekben tud segítséget
              nyújtani:
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center">
                <FaLaptop className="text-lime-400 mr-2" />
                <span>Laptopok, asztali számítógépek szakszerű javítása</span>
              </li>
              <li className="flex items-center">
                <FaTachometerAlt className="text-lime-400 mr-2" />
                <span>Gyorsítás, tuningolás eszközök cseréjével</span>
              </li>
              <li className="flex items-center">
                <FaHdd className="text-lime-400 mr-2" />
                <span>Nem használt merevlemezekről adatmentés</span>
              </li>
              <li className="flex items-center">
                <FaRecycle className="text-lime-400 mr-2" />
                <span>Felvásárlás, beszámítás</span>
              </li>
              <li className="flex items-center">
                <FaWindows className="text-lime-400 mr-2" />
                <span>
                  Operációs rendszer (többnyire Windows) telepítése,
                  újratelepítés adatmentéssel, alap általános programokkal (nem
                  üresen kapod)
                </span>
              </li>
              <li className="flex items-center">
                <FaPrint className="text-lime-400 mr-2" />
                <span>Dokumentumok nyomtatása</span>
              </li>
              <li className="flex items-center">
                <FaGamepad className="text-lime-400 mr-2" />
                <span>
                  Gamer PC összeszerelés, akár hozott alkatrészekből is
                </span>
              </li>
              <li className="flex items-center">
                <FaCamera className="text-lime-400 mr-2" />
                <span>IP kamera rendszer telepítése</span>
              </li>
              <li className="flex items-center">
                <FaBook className="text-lime-400 mr-2" />
                <span>Oktatás</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-neutral-900/60 p-5">
            <h3 className="text-lg font-RubikMedium text-neutral-50">Feladatonkénti javaslatok</h3>
            <p className="mt-2 text-sm text-neutral-300">
              Gyakori helyzetekhez összegyűjtöttem a legfontosabb teendőket, hogy már az első vizsgálat előtt tudd, mire érdemes figyelni.
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {taskSuggestions.map((item) => (
                <div
                  key={item.task}
                  className="rounded-xl border border-white/10 bg-neutral-950/60 p-4"
                >
                  <h4 className="text-sm font-RubikMedium text-neutral-100">{item.task}</h4>
                  <ul className="mt-3 space-y-2 text-xs text-neutral-300">
                    {item.suggestions.map((suggestion) => (
                      <li key={suggestion} className="flex items-start gap-2">
                        <FaCheckCircle className="mt-0.5 text-emerald-300" />
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-4 rounded-2xl border border-white/10 bg-neutral-900/60 p-5 md:grid-cols-3">
            {supportPackages.map((pkg) => {
              const active = pkg.name === selectedPackage;
              return (
                <button
                  key={pkg.name}
                  onClick={() => setSelectedPackage(pkg.name)}
                  className={`flex h-full flex-col gap-3 rounded-xl border p-4 text-left transition ${
                    active
                      ? "border-emerald-300/60 bg-emerald-500/10 text-emerald-50 shadow-[0_20px_60px_-40px_rgba(16,185,129,0.7)]"
                      : "border-white/10 bg-neutral-950/40 text-neutral-200 hover:border-white/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-RubikMedium">{pkg.name}</h3>
                    <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[11px] uppercase tracking-[0.2em]">
                      {pkg.response}
                    </span>
                  </div>
                  <p className="text-2xl font-RubikExtraBold">{pkg.price}</p>
                  <ul className="space-y-2 text-sm">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <FaShieldAlt className="mt-1 text-emerald-300" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>

          <div className="mt-6 grid gap-6 rounded-2xl border border-white/10 bg-neutral-900/60 p-5 md:grid-cols-[1.1fr,0.9fr]">
            <div className="space-y-4">
              <h3 className="text-lg font-RubikMedium text-neutral-50">Gyors árbecslés</h3>
              <div className="grid gap-3 text-sm text-neutral-300">
                <label className="flex flex-col gap-2">
                  <span>Hány eszközt kell javítani?</span>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={deviceCount}
                    onChange={(event) => setDeviceCount(Number(event.target.value))}
                    className="accent-emerald-400"
                  />
                  <span className="text-xs text-neutral-400">{deviceCount} db</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {urgencyOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setSelectedUrgency(option)}
                      className={`rounded-full border px-3 py-1.5 text-xs transition ${
                        option.value === selectedUrgency.value
                          ? "border-emerald-300/60 bg-emerald-500/10 text-emerald-100"
                          : "border-white/10 text-neutral-300 hover:border-white/30"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  <span>Átvétel módja</span>
                  <div className="grid gap-2 md:grid-cols-3">
                    {logisticsOptions.map((option) => (
                      <button
                        key={option.label}
                        type="button"
                        onClick={() => setSelectedLogistics(option)}
                        className={`rounded-xl border p-3 text-left text-xs transition ${
                          option.label === selectedLogistics.label
                            ? "border-emerald-300/60 bg-emerald-500/10 text-emerald-100"
                            : "border-white/10 bg-neutral-950/40 text-neutral-300 hover:border-white/30"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <FaTruck className="text-emerald-300" />
                          <span className="font-RubikMedium">{option.label}</span>
                        </div>
                        <p className="mt-2 text-[11px] text-neutral-400">{option.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between rounded-2xl border border-emerald-400/40 bg-emerald-500/10 p-5 text-neutral-100">
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-[0.3em] text-emerald-200">Becsült költség</span>
                <p className="text-3xl font-RubikExtraBold">{priceEstimate}</p>
                <p className="text-xs text-neutral-200">
                  A pontos árat diagnosztika után küldöm el. A becslés tartalmazza a(z) {selectedPackageDetails.name.toLowerCase()} csomag szolgáltatásait.
                </p>
              </div>
              <div className="space-y-2 text-xs text-neutral-100">
                <div className="flex items-center gap-2">
                  <FaClock className="text-emerald-200" />
                  <span>{selectedPackageDetails.response}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaShieldAlt className="text-emerald-200" />
                  <span>90 nap javítási garancia minden munkára</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-r from-lime-400 to-teal-400 rounded-lg text-neutral-900 p-6 shadow-lg">
            <div className="flex items-center gap-x-3">
              <FaTools className="text-2xl text-neutral-900" />
              <h2 className="text-xl font-RubikMedium">
                Segítségnyújtás akár aznap!
              </h2>
            </div>
            <p className="mt-4">
              Számítógéped egy kicsit szeszélyes? Laptopodnak nincs kedve a
              munkához? Ne aggódj, itt vagyok, hogy mindent helyrehozzunk! Több
              mint 25 éves tapasztalattal állok rendelkezésedre, hogy segítsek a
              szoftveres és hardveres kérdésekben egyaránt.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-[1.4fr,1fr]">
            <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-5 text-neutral-100">
              <h3 className="text-lg font-RubikMedium text-neutral-50">Gyakori kérdések</h3>
              <div className="mt-4 space-y-2">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <button
                      key={faq.question}
                      className="w-full rounded-xl border border-white/10 bg-neutral-950/60 p-4 text-left transition hover:border-white/30"
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-RubikMedium text-neutral-100">{faq.question}</span>
                        <span className="text-xs text-neutral-400">{isOpen ? "-" : "+"}</span>
                      </div>
                      {isOpen ? (
                        <p className="mt-2 text-xs text-neutral-400">{faq.answer}</p>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="rounded-2xl border border-emerald-400/40 bg-emerald-500/10 p-5 text-neutral-900">
              <h3 className="text-lg font-RubikMedium">Kérj visszahívást</h3>
              <p className="mt-2 text-sm">
                Add le az üzeneted a bal oldali űrlapon, vagy foglalj azonnal időpontot egy 15 perces telefonos egyeztetésre.
              </p>
              <div className="mt-4 flex flex-col gap-3 text-sm">
                <Link
                  href="https://cal.com/promnet/15-perces-gyors-egyeztetes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2 font-RubikMedium text-emerald-100 transition hover:-translate-y-0.5 hover:bg-neutral-800"
                  onClick={() => trackCtaClick("service-cal", { service: "it-service" })}
                >
                  Gyors hívás foglalása
                </Link>
                <Link
                  href="#lead-form"
                  className="inline-flex items-center justify-center rounded-full border border-neutral-900 px-5 py-2 font-RubikMedium text-neutral-900 transition hover:-translate-y-0.5 hover:border-neutral-700"
                  onClick={() => trackCtaClick("service-lead", { service: "it-service" })}
                >
                  Üzenet küldése
                </Link>
              </div>
              <p className="mt-4 text-xs text-neutral-900">
                Átlagos válaszidő hétköznapokon <strong>2 óra</strong>.
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-lime-400 to-teal-400 rounded-lg shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2676.8952818882703!2d21.9179604914669!3d47.860991296162844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47477dd67600fa77%3A0x6ebc5d8ebbbf1c75!2sPoly%C3%A1k%20Csaba%20E.V!5e0!3m2!1shu!2shu!4v1713860244353!5m2!1shu!2shu"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </div>
    </motion.div>
  );
}

export default Page;
