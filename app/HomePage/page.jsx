"use client";
import Link from "next/link";
import React from "react";
import { PiCodeThin } from "react-icons/pi";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";

function Homepage() {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.8,
          delay: 0.6,
          type: "spring",
          stiffness: 200,
        },
      }}
      className="w-full lg:w-fit "
    >
      <div className="  bg-[#1C1C1C] lg:bg-transparent rounded-2xl ">
        <div>
          <div className="flex gap-x-6 p-4">
            <PiCodeThin className="text-6xl text-neutral-50 slow-spin" />

            <div>
              <h1 className="text-sm font-Rubik text-neutral-300">
                Üdvözöllek a{" "}
                <span className="text-sm font-RubikMedium text-neutral-400">
                  PromNET
                </span>{" "}
                <span className="text-sm font-Rubik text-neutral-300">
                  oldalon!
                </span>
              </h1>
              <p className="max-w-sm text-neutral-400 text-sm">
                Szia! Polyák Csaba vagyok, full stack developer, aki
                szenvedélyesen tervezi és hoz létre modern, felhasználóbarát
                weboldalakat. <br /> Tapasztalatom és elkötelezettségem segít
                abban, hogy ügyfeleimnek egyedi és hatékony online megoldásokat
                kínáljak, amelyek segítik őket az online jelenlétük
                kibővítésében és üzleti céljaik elérésében.
              </p>
            </div>
          </div>

          <div className="relative mt-5 bg-gradient-to-r from-[#4F46E5] to-[#8F32EB] rounded-lg text-white overflow-hidden group animate-bounce-once">
            <div className="p-4">
              <div className="flex items-center gap-x-3">
                <div>
                  <span className="text-sm font-bold flex items-center gap-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-yellow-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Kérdésed van? Hívj bizalommal!
                  </span>
                  <p className="text-sm">
                    Ha bármilyen kérdésed lenne, hívj vagy írj az alábbi
                    elérhetőségeimre, és megbeszéljük a részleteket. Mond el,
                    mit szeretnél elérni, és biztosan találunk rá megoldást!
                    Keress a{" "}
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
              </div>
            </div>
            {/* Sárga fényes keret animáció */}
            <div className="absolute inset-0 border-4 border-yellow-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-100"></div>
          </div>

          <div className="border border-neutral-700 my-5" />

          <div className="  bg-[#1C1C1C] rounded-lg text-neutral-400">
            <Link href={"https://blogocska.hu"} target="blank">
              <div className="hover:bg-neutral-800 duration-200 transition-all ease-in p-4">
                <div className="  flex items-center gap-x-3">
                  <Image
                    width={1000}
                    height={1000}
                    className="w-24 h-24 object-cover rounded-md"
                    src="/blog.gif"
                    alt=""
                  />
                  <div>
                    <h2 className="text-sm font-RubikMedium">
                      Személyes blogom, hasznos tutorialokkal! Érdemes
                      megnézned!
                    </h2>
                  </div>
                </div>
              </div>
            </Link>
            <Link href={"/dashboard/portfolio"}>
              <div className="hover:bg-neutral-800 duration-200 transition-all ease-in p-4">
                <div className="  flex items-center gap-x-3">
                  <Image
                    height={1000}
                    width={1000}
                    className="w-24 h-24 object-cover rounded-md"
                    src="/websiteanimated.gif"
                    alt=""
                  />
                  <div>
                    <span className="text-sm font-RubikMedium">Projektek</span>
                    <h2 className="text-sm">
                      Ha kíváncsi vagy, mivel henyélek éjszaka, itt van pár
                      weboldal, amiket én főztem össze. Van itt minden, mint a
                      bútoroktól a mémgyűjtésig, még a világűrt sem hagytam ki!
                      Kattints ide, ha érdekel, hogy mihez nyúltam, és ha épp
                      unatkozol, böngéssz nyugodtan. Nem állok meg egy kis
                      rajzfilmvilág vagy esküvői webshop elől sem!
                    </h2>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* With image */}

          <div className="mt-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg text-neutral-400 relative overflow-hidden">
            <div className="hover:bg-neutral-800 duration-200 transition-all ease-in p-4">
              <Link href={"/dashboard/webdev"}>
                <div className="flex items-center gap-x-3">
                  <Image
                    height={1000}
                    width={1000}
                    className="w-24 h-24 object-cover rounded-md"
                    src="/website.gif"
                    alt=""
                  />
                  <div>
                    <span className="text-sm font-medium">
                      Weboldal fejlesztés kedvező áron!
                    </span>
                    <p className="text-sm">
                      Tervezz és valósíts meg webprojekteket könnyedén, hogy
                      kiemelkedő online jelenléted legyen, és a digitális térben
                      hatékonyan kommunikálhass ügyfeleiddel. Bízd rám, és
                      segítek elérni az online céljaidat!
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="hover:bg-neutral-800 duration-200 transition-all ease-in p-4">
              <Link href={"/dashboard/service"}>
                <div className="flex items-center gap-x-3">
                  <Image
                    height={1000}
                    width={1000}
                    className="w-24 h-24 object-cover rounded-md"
                    src="/service.gif"
                    alt=""
                  />
                  <div>
                    <span className="text-sm font-medium">
                      Elektronikai szerviz
                    </span>
                    <p className="text-sm">
                      Számítógéped egy kicsit szeszélyes? Laptopodnak nincs
                      kedve a munkához? Ne aggódj, itt vagyok, hogy mindent
                      helyrehozzunk! Több mint 25 éves tapasztalattal állok
                      rendelkezésedre, hogy segítsek a szoftveres és hardveres
                      kérdésekben egyaránt.
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="hover:bg-neutral-800 duration-200 transition-all ease-in p-4">
              <Link href={"/dashboard/hostingbuilder"}>
                <div className="flex items-center gap-x-3">
                  <Image
                    height={1000}
                    width={1000}
                    className="w-24 h-24 object-cover rounded-md"
                    src="/hostingbuild.gif"
                    alt=""
                  />
                  <div>
                    <span className="text-sm font-medium">
                      Teljeskörű hosting kiépítése
                    </span>
                    <p className="text-sm">
                      Segítek neked kiépíteni akár teljes körű hosting
                      megoldásokat is, bármilyen igényed is legyen! Gyorsan és
                      megbízhatóan intézem el, hogy a weboldalaid vagy játék
                      szervereid zökkenőmentesen fussanak online. Ne tétovázz,
                      ha kérdésed van, vagy el szeretnéd indítani a projektet!
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Szuper keret hozzáadása */}
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-blue-500 to-blue-300 opacity-25 mix-blend-lighten rounded-lg pointer-events-none"></div>
          </div>

          {/* without image */}

          <div className="mt-6 bg-[#1C1C1C] rounded-lg text-neutral-400 p-4">
            <div className="p-4 rounded-lg">
              <div className="flex items-center gap-x-3">
                <div className="flex items-center gap-x-2">
                  <h2 className="text-sm font-RubikMedium">PromNET</h2>
                  <div className="w-1 h-1 rounded-full bg-neutral-400" />
                  <span className="text-xs font-RubikMedium">
                    Polyák Csaba E.V.
                  </span>
                  <div className="w-1 h-1 rounded-full bg-neutral-400" />
                  <span className="text-xs font-RubikMedium text-neutral-300">
                    © 2024 PromNET. Minden jog fenntartva.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Homepage;
