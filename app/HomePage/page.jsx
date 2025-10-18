"use client";
import Link from "next/link";
import React from "react";
import { PiCodeThin } from "react-icons/pi";
import { motion } from "framer-motion";
import Image from "next/image";

const heroText = {
  title: (
    <>
      Üdvözöllek a <span className="text-sm font-RubikMedium text-neutral-200">PromNET</span>{" "}
      <span className="text-sm font-Rubik text-neutral-200">oldalon!</span>
    </>
  ),
  description: (
    <>
      Szia! Polyák Csaba vagyok, full stack developer, aki szenvedélyesen tervezi és hoz létre modern,
      felhasználóbarát weboldalakat. <br /> Tapasztalatom és elkötelezettségem segít abban, hogy ügyfeleimnek
      egyedi és hatékony online megoldásokat kínáljak, amelyek segítik őket az online jelenlétük
      kibővítésében és üzleti céljaik elérésében.
    </>
  ),
};

const quickLinks = [
  {
    href: "https://blogocska.hu",
    media: "/blog.gif",
    title: "Személyes blogom, hasznos tutorialokkal! Érdemes megnézned!",
    subtitle: "",
  },
  {
    href: "/dashboard/portfolio",
    media: "/websiteanimated.gif",
    title: "Projektek",
    subtitle:
      "Ha kíváncsi vagy, mivel henyélek éjszaka, itt van pár weboldal, amiket én főztem össze. Van itt minden, mint a bútoroktól a mémgyűjtésig, még a világűrt sem hagytam ki! Kattints ide, ha érdekel, hogy mihez nyúltam, és ha épp unatkozol, böngéssz nyugodtan. Nem állok meg egy kis rajzfilmvilág vagy esküvői webshop elől sem!",
  },
];

const services = [
  {
    href: "/dashboard/webdev",
    media: "/website.gif",
    title: "Weboldal fejlesztés kedvező áron!",
    description:
      "Tervezz és valósíts meg webprojekteket könnyedén, hogy kiemelkedő online jelenléted legyen, és a digitális térben hatékonyan kommunikálhass ügyfeleiddel. Bízd rám, és segítek elérni az online céljaidat!",
  },
  {
    href: "/dashboard/service",
    media: "/service.gif",
    title: "Elektronikai szerviz",
    description:
      "Számítógéped egy kicsit szeszélyes? Laptopodnak nincs kedve a munkához? Ne aggódj, itt vagyok, hogy mindent helyrehozzunk! Több mint 25 éves tapasztalattal állok rendelkezésedre, hogy segítsek a szoftveres és hardveres kérdésekben egyaránt.",
  },
  {
    href: "/dashboard/hostingbuilder",
    media: "/hostingbuild.gif",
    title: "Teljeskörű hosting kiépítése",
    description:
      "Segítek neked kiépíteni akár teljes körű hosting megoldásokat is, bármilyen igényed is legyen! Gyorsan és megbízhatóan intézem el, hogy a weboldalaid vagy játék szervereid zökkenőmentesen fussanak online. Ne tétovázz, ha kérdésed van, vagy el szeretnéd indítani a projektet!",
  },
];

const floatingAnimation = {
  animate: {
    y: [0, -12, 0],
    transition: {
      duration: 6,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

const pulseAnimation = {
  animate: {
    scale: [1, 1.08, 1],
    opacity: [0.5, 0.9, 0.5],
    transition: {
      duration: 8,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

function Homepage() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full overflow-hidden"
    >
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-[#10051c] via-neutral-950 to-black" />
      <motion.div
        className="absolute -left-24 top-1/3 -z-10 h-64 w-64 rounded-full bg-violet-700/40 blur-3xl"
        {...pulseAnimation}
      />
      <motion.div
        className="absolute -right-16 top-10 -z-10 h-72 w-72 rounded-full bg-fuchsia-700/40 blur-3xl"
        {...pulseAnimation}
      />
      <motion.div
        className="absolute bottom-10 left-1/2 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-600/40 blur-3xl"
        {...pulseAnimation}
      />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-14 rounded-[2.75rem] border border-white/5 bg-white/5 p-6 shadow-[0_0_100px_-20px_rgba(168,85,247,0.45)] backdrop-blur-2xl lg:p-12">
        <div className="grid gap-10 lg:grid-cols-[auto,1fr] lg:items-center">
          <motion.div
            className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-xl shadow-violet-500/40 lg:h-32 lg:w-32"
            whileHover={{ rotate: 8, scale: 1.05 }}
            {...floatingAnimation}
          >
            <PiCodeThin className="text-6xl" />
            <motion.span
              className="absolute -bottom-4 right-0 rounded-full bg-fuchsia-400/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-100"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              kreativitás
            </motion.span>
          </motion.div>
          <div className="space-y-6 text-neutral-100">
            <h1 className="text-lg font-Rubik tracking-tight lg:text-2xl">{heroText.title}</h1>
            <p className="text-sm leading-relaxed text-neutral-300 lg:text-base">{heroText.description}</p>
            <motion.div
              className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.4em] text-neutral-400"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { staggerChildren: 0.15 },
                },
              }}
            >
              {["full stack", "design", "hosting"].map((badge) => (
                <motion.span
                  key={badge}
                  className="rounded-full border border-white/10 px-4 py-2 backdrop-blur-lg"
                  variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                >
                  {badge}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div
          className="relative overflow-hidden rounded-[2.75rem] border border-yellow-500/60 bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 p-[1px] shadow-[0_40px_120px_-60px_rgba(236,72,153,0.9)]"
          whileHover={{ scale: 1.01 }}
        >
          <motion.div
            className="flex flex-col gap-6 rounded-[2.5rem] bg-black/70 p-6 text-neutral-100 shadow-inner shadow-fuchsia-500/10 md:flex-row md:items-center md:justify-between"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="space-y-2">
              <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-yellow-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Kérdésed van? Hívj bizalommal!
              </span>
              <p className="max-w-3xl text-sm text-neutral-100 md:text-base">
                Ha bármilyen kérdésed lenne, hívj vagy írj az alábbi elérhetőségeimre, és megbeszéljük a részleteket. Mond el, mit
                szeretnél elérni, és biztosan találunk rá megoldást! Keress a{" "}
                <a href="tel:+36205494107" className="underline">
                  +36-20-549-4107
                </a>{" "}
                telefonszámon, vagy írj az{" "}
                <a href="mailto:info@promnet.hu" className="underline">
                  info@promnet.hu
                </a>{" "}
                e-mail címre.
              </p>
            </div>
            <div className="flex flex-col gap-3 text-sm text-neutral-200 md:text-base">
              <a
                href="tel:+36205494107"
                className="inline-flex items-center justify-center rounded-full bg-yellow-300 px-6 py-3 font-semibold text-black transition hover:-translate-y-0.5 hover:bg-yellow-200"
              >
                Telefonhívás indítása
              </a>
              <a
                href="mailto:info@promnet.hu"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 font-semibold transition hover:-translate-y-0.5 hover:border-white/40 hover:text-white"
              >
                E-mail írása
              </a>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {quickLinks.map(({ href, media, title, subtitle }, index) => (
            <Link key={href} href={href} target={href.startsWith("http") ? "_blank" : undefined} className="group">
              <motion.article
                className="flex h-full gap-5 rounded-[2rem] border border-white/10 bg-neutral-900/70 p-6 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.8)] transition duration-500 group-hover:-translate-y-2 group-hover:border-white/40 group-hover:shadow-[0_30px_90px_-40px_rgba(168,85,247,0.5)]"
                whileHover={{ rotateX: 2, rotateY: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.6, ease: "easeOut" }}
              >
                <motion.div
                  className="relative flex-none"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <Image
                    width={160}
                    height={160}
                    className="h-28 w-28 rounded-[1.3rem] object-cover ring-2 ring-white/10"
                    src={media}
                    alt=""
                  />
                  <motion.span
                    className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-fuchsia-500/40 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-200"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.5 }}
                  >
                    link
                  </motion.span>
                </motion.div>
                <div className="space-y-3 text-neutral-200">
                  <h2 className="text-base font-RubikMedium leading-tight lg:text-lg">{title}</h2>
                  {subtitle ? <p className="text-sm text-neutral-400 lg:text-base">{subtitle}</p> : null}
                </div>
              </motion.article>
            </Link>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {services.map(({ href, media, title, description }, index) => (
            <Link key={href} href={href} className="group">
              <motion.article
                className="flex h-full flex-col gap-5 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-neutral-900/80 via-neutral-900/50 to-neutral-800/80 p-6 shadow-[0_30px_80px_-40px_rgba(59,130,246,0.45)] transition duration-500 group-hover:-translate-y-2 group-hover:border-white/40"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.2, duration: 0.6, ease: "easeOut" }}
                whileHover={{ rotate: -1.2 }}
              >
                <motion.div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-neutral-900/60">
                  <Image width={160} height={160} className="h-16 w-16 rounded-xl object-cover" src={media} alt="" />
                </motion.div>
                <div className="space-y-3 text-neutral-200">
                  <h3 className="text-base font-semibold lg:text-lg">{title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-400 lg:text-base">{description}</p>
                </div>
                <motion.span
                  className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-fuchsia-300 transition group-hover:translate-x-2"
                  whileHover={{ gap: 6 }}
                >
                  Tovább a részletekhez
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.span>
              </motion.article>
            </Link>
          ))}
        </div>

        <motion.footer
          className="flex flex-wrap items-center justify-between gap-3 rounded-[2rem] border border-white/10 bg-neutral-900/60 px-6 py-5 text-neutral-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="flex items-center gap-2 text-sm font-RubikMedium text-neutral-200">
            <span>PromNET</span>
            <span className="h-1 w-1 rounded-full bg-neutral-500" />
            <span>Polyák Csaba E.V.</span>
          </div>
          <span className="text-xs text-neutral-400">© 2024 PromNET. Minden jog fenntartva.</span>
        </motion.footer>
      </div>
    </motion.section>
  );
}

export default Homepage;
