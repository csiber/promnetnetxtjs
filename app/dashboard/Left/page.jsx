"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  PiBookOpenTextLight,
  PiMagicWandThin,
  PiShapesThin,
  PiHouseLight,
} from "react-icons/pi";
import {
  FaCalendarCheck,
  FaComments,
  FaUser,
  FaMapMarkerAlt,
  FaPhone,
  FaIdCard,
  FaMoneyCheck,
} from "react-icons/fa";

import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { trackCtaClick, trackLeadSubmission } from "@/lib/analytics";

const dayNames = [
  "Vasárnap",
  "Hétfő",
  "Kedd",
  "Szerda",
  "Csütörtök",
  "Péntek",
  "Szombat",
];

const officeHours = {
  1: [{ start: 9 * 60, end: 17 * 60 }],
  2: [{ start: 9 * 60, end: 17 * 60 }],
  3: [{ start: 9 * 60, end: 17 * 60 }],
  4: [{ start: 9 * 60, end: 17 * 60 }],
  5: [{ start: 9 * 60, end: 16 * 60 }],
  6: [{ start: 10 * 60, end: 14 * 60 }],
};

const formatMinutes = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60)
    .toString()
    .padStart(2, "0");
  const minutes = (totalMinutes % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const getBudapestDate = () => {
  const now = new Date();
  const localised = new Date(
    now.toLocaleString("en-US", { timeZone: "Europe/Budapest" })
  );

  return localised;
};

const computeAvailability = () => {
  const now = getBudapestDate();
  const today = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const todaysSlots = officeHours[today] ?? [];

  let available = false;
  let nextChange = null;

  for (const slot of todaysSlots) {
    if (currentMinutes >= slot.start && currentMinutes < slot.end) {
      available = true;
      nextChange = {
        day: today,
        minutes: slot.end,
        type: "closing",
      };
      break;
    }
  }

  if (!available) {
    const sameDaySlot = todaysSlots.find((slot) => currentMinutes < slot.start);
    if (sameDaySlot) {
      nextChange = {
        day: today,
        minutes: sameDaySlot.start,
        type: "opening",
      };
    }
  }

  if (!nextChange) {
    for (let offset = 1; offset <= 7; offset += 1) {
      const day = (today + offset) % 7;
      const slots = officeHours[day];
      if (slots && slots.length > 0) {
        nextChange = {
          day,
          minutes: slots[0].start,
          type: "opening",
        };
        break;
      }
    }
  }

  return { available, nextChange };
};

const quickActions = [
  {
    label: "Telefonhívás indítása",
    href: "tel:+36205494107",
    icon: FaPhone,
    analytics: "telefon",
  },
  {
    label: "Időpont egyeztetése",
    href: "https://cal.com/promnet/30-perces-konzultacio",
    icon: FaCalendarCheck,
    analytics: "idopont",
    external: true,
  },
  {
    label: "Üzenet küldése",
    icon: FaComments,
    analytics: "uzenet",
    scrollTarget: "lead-form",
  },
];

const featureOptions = [
  "Reszponzív dizájn",
  "Webshop modul",
  "Időpontfoglaló",
  "Blog / tartalommarketing",
  "Integrációk (CRM, számlázó)",
  "Hosting és üzemeltetés",
];

function Leftpage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    industry: "",
    budget: "",
    timeline: "",
    message: "",
    features: [],
  });
  const [formStatus, setFormStatus] = useState({ type: "idle", message: "" });
  const [availability, setAvailability] = useState(() => computeAvailability());

  const controls = useAnimation();

  useEffect(() => {
    const tick = () => setAvailability(computeAvailability());
    tick();

    const interval = setInterval(tick, 60_000);
    return () => clearInterval(interval);
  }, []);

  const availabilityText = useMemo(() => {
    if (!availability.nextChange) {
      return "Időpontért keress üzenetben.";
    }

    const { day, minutes, type } = availability.nextChange;
    const formatted = formatMinutes(minutes);

    if (availability.available && type === "closing") {
      return `Ma ${formatted}-ig érek rá.`;
    }

    const dayName = dayNames[day];
    return `Következő szabad időpont: ${dayName} ${formatted}`;
  }, [availability]);

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleFeature = (feature) => {
    setFormData((prev) => {
      const hasFeature = prev.features.includes(feature);
      return {
        ...prev,
        features: hasFeature
          ? prev.features.filter((item) => item !== feature)
          : [...prev.features, feature],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setFormStatus({ type: "error", message: "Add meg a neved, hogy tudjam, ki keres." });
      controls.start({
        x: [0, -10, 10, -6, 6, 0],
        transition: { duration: 0.5, ease: "easeInOut" },
      });
      return;
    }

    if (!isValidEmail(formData.email)) {
      setFormStatus({ type: "error", message: "Adj meg egy érvényes e-mail címet, hogy válaszolhassak." });
      controls.start({
        x: [0, -10, 10, -6, 6, 0],
        transition: { duration: 0.5, ease: "easeInOut" },
      });
      return;
    }

    if (!formData.budget.trim()) {
      setFormStatus({ type: "error", message: "A tervezett költségkeret segít a megfelelő ajánlat összeállításában." });
      controls.start({
        x: [0, -10, 10, -6, 6, 0],
        transition: { duration: 0.5, ease: "easeInOut" },
      });
      return;
    }

    if (!formData.message.trim()) {
      setFormStatus({ type: "error", message: "Írd le röviden a projekt célját, hogy fel tudjam venni a fonalat." });
      controls.start({
        x: [0, -10, 10, -6, 6, 0],
        transition: { duration: 0.5, ease: "easeInOut" },
      });
      return;
    }

    setFormStatus({ type: "loading", message: "Küldés folyamatban..." });

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: "sidebar",
        }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        const message = error ?? "Nem sikerült elküldeni az üzenetet.";
        setFormStatus({ type: "error", message });
        trackLeadSubmission("error", { location: "sidebar", message });
        controls.start({
          x: [0, -10, 10, -6, 6, 0],
          transition: { duration: 0.5, ease: "easeInOut" },
        });
        return;
      }

      setFormStatus({
        type: "success",
        message: "Köszönöm a bizalmat! 1 munkanapon belül jelentkezem a részletekkel.",
      });
      trackLeadSubmission("success", { location: "sidebar" });
      controls.start({ x: [0, 4, -4, 2, -2, 0], transition: { duration: 0.6, ease: "easeInOut" } });

      setFormData({
        name: "",
        email: "",
        company: "",
        industry: "",
        budget: "",
        timeline: "",
        message: "",
        features: [],
      });
    } catch (error) {
      console.error("Lead küldési hiba", error);
      setFormStatus({
        type: "error",
        message: "Technikai hiba történt. Írj közvetlenül az info@promnet.hu címre, vagy próbáld újra később.",
      });
      trackLeadSubmission("error", { location: "sidebar", reason: "network" });
      controls.start({
        x: [0, -10, 10, -6, 6, 0],
        transition: { duration: 0.5, ease: "easeInOut" },
      });
    }
  };

  const formStatusStyles = {
    success: "text-emerald-300",
    error: "text-rose-300",
    loading: "text-amber-300",
    idle: "text-neutral-400",
  };

  return (
    <div>
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { duration: 0.3, type: "spring", stiffness: 200 },
        }}
        className="hidden h-fit w-full md:sticky md:top-5 md:block md:w-80 bg-[#1C1C1C]"
      >
        <div className="h-full w-full rounded-2xl border border-neutral-800 bg-[#1C1C1C] p-3 md:w-80">
          <div className="flex">
            <div className="relative w-full">
              <Image
                width={1000}
                height={1000}
                className="h-28 w-28 rounded-full object-cover shadow-md"
                src="/black.jpeg"
                alt="Polyák Csaba portré"
              />
              <div className="absolute top-20 left-24 flex items-center gap-2">
                <span
                  className={`h-3 w-3 rounded-full ${
                    availability.available
                      ? "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]"
                      : "bg-rose-400 shadow-[0_0_12px_rgba(251,113,133,0.8)]"
                  } animate-pulse`}
                />
                <span className="rounded-full border border-white/10 bg-neutral-900/60 px-2 py-1 text-[9px] font-RubikMedium uppercase tracking-wide text-neutral-200">
                  {availability.available ? "Most elérhető" : "Épp nem elérhető"}
                </span>
              </div>
              <p className="mt-3 text-[11px] font-RubikRegular text-neutral-400">
                {availabilityText}
              </p>
              <h1 className="mt-2 font-RubikExtraBold text-xl text-neutral-100">
                Polyák Csaba E.V.
              </h1>
              <p className="mt-2 text-xs font-RubikMedium text-neutral-300">
                <Link href={"mailto:info@promnet.hu"} target="blank" className="transition hover:text-neutral-100">
                  info@promnet.hu 📧
                </Link>
              </p>

              <p className="mt-1 text-xs font-RubikMedium text-neutral-300">
                <Link href={"/"} target="blank" className="transition hover:text-neutral-100">
                  promnet.hu 🌍
                </Link>
              </p>

              <div className="flex w-full">
                <div className="my-4 flex gap-x-1 text-xs">
                  {["WordPress", "Git", "NodeJS", "Laravel"].map((skill) => (
                    <p
                      key={skill}
                      className="flex h-5 items-center justify-center rounded-md bg-[#282828] px-2 text-[11px] font-RubikBold text-neutral-300"
                    >
                      {skill}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex h-fit w-full gap-x-1">
              <Link href={"/"}>
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-700/50">
                  <PiHouseLight className="text-neutral-100" />
                </div>
              </Link>

              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-700/50">
                <PiBookOpenTextLight className="text-neutral-100" />
              </div>
            </div>
          </div>

          <motion.div
            className="mt-4 space-y-3 rounded-2xl border border-white/5 bg-gradient-to-br from-neutral-900/60 to-neutral-950/70 p-4 text-neutral-200"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-[11px] font-RubikMedium uppercase tracking-[0.2em] text-amber-200">Azonnali kapcsolódás</span>
            <div className="flex flex-col gap-2">
              {quickActions.map(({ label, href, icon: Icon, analytics, scrollTarget, external }) => {
                const handleClick = (event) => {
                  trackCtaClick(analytics, { location: "sidebar" });

                  if (scrollTarget) {
                    event.preventDefault();
                    const targetElement = document.getElementById(scrollTarget);
                    if (targetElement) {
                      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
                      targetElement.focus?.({ preventScroll: true });
                    }
                  }
                };

                const content = (
                  <span className="flex items-center gap-2 font-RubikMedium text-neutral-200 group-hover:text-neutral-50">
                    <Icon className="text-[14px] text-amber-200" />
                    {label}
                  </span>
                );

                return href ? (
                  <Link
                    key={label}
                    href={href}
                    target={external ? "_blank" : undefined}
                    onClick={handleClick}
                    className="group flex items-center justify-between rounded-xl border border-white/5 bg-neutral-900/60 px-3 py-2 text-[12px] transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-neutral-900/80"
                  >
                    {content}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5 text-neutral-500 transition group-hover:text-amber-200"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ) : (
                  <button
                    key={label}
                    type="button"
                    onClick={handleClick}
                    className="group flex items-center justify-between rounded-xl border border-white/5 bg-neutral-900/60 px-3 py-2 text-[12px] transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-neutral-900/80"
                  >
                    {content}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5 text-neutral-500 transition group-hover:text-amber-200"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                );
              })}
            </div>
          </motion.div>

          <form
            onSubmit={handleSubmit}
            id="lead-form"
            className="mt-6 hidden w-full flex-col gap-3 rounded-2xl border border-white/5 bg-[#282828] p-4 md:flex"
            tabIndex={-1}
          >
            <div className="grid grid-cols-1 gap-3">
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="h-10 rounded-xl border border-white/10 bg-neutral-900/60 px-3 text-xs font-RubikMedium text-neutral-100 placeholder:text-neutral-500 focus:border-amber-400/60 focus:outline-none"
                placeholder="Név"
                type="text"
                aria-label="Név"
              />
              <input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="h-10 rounded-xl border border-white/10 bg-neutral-900/60 px-3 text-xs font-RubikMedium text-neutral-100 placeholder:text-neutral-500 focus:border-amber-400/60 focus:outline-none"
                placeholder="E-mail cím"
                type="email"
                aria-label="E-mail cím"
              />
              <input
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="h-10 rounded-xl border border-white/10 bg-neutral-900/60 px-3 text-xs font-RubikMedium text-neutral-100 placeholder:text-neutral-500 focus:border-amber-400/60 focus:outline-none"
                placeholder="Cég / márkanév (opcionális)"
                type="text"
                aria-label="Cég vagy márkanév"
              />
              <input
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className="h-10 rounded-xl border border-white/10 bg-neutral-900/60 px-3 text-xs font-RubikMedium text-neutral-100 placeholder:text-neutral-500 focus:border-amber-400/60 focus:outline-none"
                placeholder="Iparág (pl. vendéglátás, e-kereskedelem)"
                type="text"
                aria-label="Iparág"
              />
              <input
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="h-10 rounded-xl border border-white/10 bg-neutral-900/60 px-3 text-xs font-RubikMedium text-neutral-100 placeholder:text-neutral-500 focus:border-amber-400/60 focus:outline-none"
                placeholder="Becsült költségkeret (pl. 600 000 Ft)"
                type="text"
                aria-label="Becsült költségkeret"
              />
              <input
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                className="h-10 rounded-xl border border-white/10 bg-neutral-900/60 px-3 text-xs font-RubikMedium text-neutral-100 placeholder:text-neutral-500 focus:border-amber-400/60 focus:outline-none"
                placeholder="Mikorra szeretnéd élesíteni?"
                type="text"
                aria-label="Tervezett indulás"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {featureOptions.map((feature) => {
                const active = formData.features.includes(feature);
                return (
                  <button
                    key={feature}
                    type="button"
                    onClick={() => toggleFeature(feature)}
                    className={`rounded-full border px-3 py-1.5 text-[11px] font-RubikMedium transition ${
                      active
                        ? "border-emerald-300/60 bg-emerald-500/10 text-emerald-100"
                        : "border-white/10 text-neutral-300 hover:border-white/30 hover:text-neutral-100"
                    }`}
                  >
                    {feature}
                  </button>
                );
              })}
            </div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="min-h-[80px] rounded-xl border border-white/10 bg-neutral-900/60 px-3 py-2 text-xs font-RubikMedium text-neutral-100 placeholder:text-neutral-500 focus:border-amber-400/60 focus:outline-none"
              placeholder="Mesélj az ötletedről, célokról, eddigi tapasztalatokról..."
              aria-label="Projekt leírás"
            />
            <motion.button
              animate={controls}
              className="h-10 rounded-xl bg-amber-400 text-xs font-RubikMedium text-neutral-900 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
              disabled={formStatus.type === "loading"}
            >
              {formStatus.type === "loading" ? "Küldés..." : "Projekt összefoglaló küldése"}
            </motion.button>
          </form>
          <p
            className={`mt-2 min-h-[1.5rem] text-[11px] font-RubikRegular ${formStatusStyles[formStatus.type]}`}
            aria-live="polite"
          >
            {formStatus.message}
          </p>

          <div className="mt-5 w-full text-neutral-300">
            <h2 className="font-RubikBold my-4">Info</h2>
            <p className="text-[12px]  font-RubikRegular my-3">
              Professzionális webfejlesztés, egyedi megoldások: Neked készítem a
              legmenőbb weboldalt! Kreatív kódolás, ami még a macskádnak is
              tetszeni fog. Bízd rám a weboldalad, és emelkedj ki a tömegből!{" "}
            </p>

            <div className="grid gap-2 rounded-xl border border-emerald-400/20 bg-neutral-900/60 p-3 text-[11px] text-neutral-200">
              <span className="font-RubikMedium uppercase tracking-[0.2em] text-emerald-300">
                Minősítések &amp; bizalom
              </span>
              <ul className="space-y-1 text-neutral-300">
                <li>
                  ✔️ Google Analytics 4 &amp; Tag Manager beállítás 2024-es tanúsítvánnyal
                </li>
                <li>✔️ Cloudflare Solution Partner (performance &amp; security)</li>
                <li>✔️ Resend Transactional Email szakértő</li>
              </ul>
              <p className="text-[10px] text-neutral-400">
                Kérésre részletes referencia PDF-et is küldök az elmúlt 12 hónap projektjeiről.
              </p>
            </div>

            <div className="mt-6 flex justify-between text-sm">
              <div className="flex items-center gap-x-1">
                <PiShapesThin />
                <span className="text-xs font-RubikRegular">
                  2008 óta{" "}
                  <Link
                    href={
                      "https://en.wikipedia.org/wiki/Solution_stack#Full-stack_developer"
                    }
                    target="blank"
                  >
                    full stack
                  </Link>{" "}
                  webfejlesztő
                </span>
              </div>
              <div className="flex items-center gap-x-1">
                <PiMagicWandThin />
                <Link href={"/dashboard/portfolio"}>
                  <span className="text-xs font-RubikRegular">+20 projekt</span>
                </Link>
              </div>
            </div>

            <div className="border border-[#282828] text-neutral-300 my-6" />

            <div className="my-4">
              <h1 className="font-RubikRegular">Vállalkozás adatai</h1>
              <div className="mt-7 flex justify-between">
                <div className="flex gap-x-3">
                  <FaUser className="text-xl" />
                  <div className="-mt-1">
                    <h3 className="text-sm font-RubikMedium">Cégnév</h3>
                    <p className="text-[12px]">Polyák Csaba E.V</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <div className="flex gap-x-3">
                  <FaMapMarkerAlt className="text-xl" />
                  <div className="-mt-1">
                    <h3 className="text-sm font-RubikMedium">Cím</h3>
                    <p className="text-[12px]">
                      4324 Kállósemjén, Kölcsey Ferenc út 11
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <div className="flex gap-x-3">
                  <FaPhone className="text-xl" />
                  <div className="-mt-1">
                    <h3 className="text-sm font-RubikMedium">Telefonszám</h3>
                    <p className="text-[12px]">+36 20 549 4107</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <div className="flex gap-x-3">
                  <FaIdCard className="text-xl" />
                  <div className="-mt-1">
                    <h3 className="text-sm font-RubikMedium">
                      Nyilvántartási szám
                    </h3>
                    <p className="text-[12px]">52193909</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <div className="flex gap-x-3">
                  <FaMoneyCheck className="text-xl" />
                  <div className="-mt-1">
                    <h3 className="text-sm font-RubikMedium">Adószám</h3>
                    <p className="text-[12px]">68747961-1-35</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Leftpage;
