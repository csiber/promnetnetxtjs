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
            <PiCodeThin className="text-6xl text-neutral-50" />

            <div>
              <h1 className="text-sm font-Rubik text-neutral-300">
                Üdvözöllek a{" "}
                <span className="text-sm font-RubikMedium text-neutral-400">PromNET</span>{" "}
                <span className="text-sm font-Rubik text-neutral-300">oldalon!</span>
              </h1>
              <p className="max-w-sm text-neutral-400 text-sm">Szia! Polyák Csaba vagyok, full stack developer, aki szenvedélyesen tervezi és hoz létre modern, felhasználóbarát weboldalakat. <br />{" "}Tapasztalatom és elkötelezettségem segít abban, hogy ügyfeleimnek egyedi és hatékony online megoldásokat kínáljak, amelyek segítik őket az online jelenlétük kibővítésében és üzleti céljaik elérésében.
              </p>
            </div>
          </div>


          <div className="mt-6 bg-gradient-to-r from-[#4F46E5] to-[#8F32EB] rounded-lg text-white p-4">
  <div className="hover:bg-purple-700 duration-200 transition-all ease-in p-4">
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
          Ha bármilyen kérdésed lenne, hívj vagy írj az alábbi elérhetőségeimre, és megbeszéljük a részleteket. Mond el, mit szeretnél elérni, és biztosan találunk rá megoldást!
          Keress a <a href="tel:+36205494107" className="underline">+36-20-549-4107</a> telefonszámon, vagy írj az <a href="mailto:info@promnet.hu" className="underline">info@promnet.hu</a> e-mail címre.
        </p>
      </div>
    </div>
  </div>
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
                    src="/blog.webp"
                    alt=""
                  />
                  <div>
                    <h2 className="text-sm font-RubikMedium">
                      Személyes blogom, hasznos tutorialokkal! Érdemes megnézned!
                    </h2>
                  </div>
                </div>
              </div>
            </Link>
            <div className="hover:bg-neutral-800 duration-200 transition-all ease-in p-4">
              <div className="  flex items-center gap-x-3">
                <Image
                  height={1000}
                  width={1000}
                  className="w-24 h-24 object-cover rounded-md"
                  src="/game.jpg"
                  alt=""
                />
                <div>
                  <span className="text-sm">July 22, 2023</span>
                  <h2 className="text-sm font-RubikMedium">
                    Smooth Animation with React and Framer Motion
                  </h2>
                </div>
              </div>
            </div>
            <div className="hover:bg-neutral-800 duration-200 transition-all ease-in p-4">
              <div className="  flex items-center gap-x-3">
                <Image
                  height={1000}
                  width={1000}
                  className="w-24 h-24 object-cover rounded-md"
                  src="/scult.jpeg"
                  alt=""
                />
                <div>
                  <span className="text-sm">July 22, 2023</span>
                  <h2 className="text-sm font-RubikMedium">
                    Smooth Animation with React and Framer Motion
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* With image */}

          <div className=" mt-6  bg-[#1C1C1C] rounded-lg text-neutral-400">
            <div className="hover:bg-neutral-800 duration-200 transition-all ease-in p-4">
              <div className="  flex items-center gap-x-3">
                <Image
                  height={1000}
                  width={1000}
                  className="w-24 h-24 object-cover rounded-md"
                  src="/website.gif"
                  alt=""
                />
                <div>
                  <span className="text-sm font-RubikMedium">Weboldal fejlesztés kedvező áron!</span>
                  <h2 className="text-sm">
                  Tervezz és valósíts meg webprojekteket könnyedén, hogy kiemelkedő online jelenléted legyen, és a digitális térben hatékonyan kommunikálhass ügyfeleiddel. Bízd rám, és segítek elérni az online céljaidat!
                  </h2>
                </div>
              </div>
            </div>
            <div className="hover:bg-neutral-800 duration-200 transition-all ease-in p-4">
              <div className="  flex items-center gap-x-3">
                <Image
                  height={1000}
                  width={1000}
                  className="w-24 h-24 object-cover rounded-md"
                  src="/service.gif"
                  alt=""
                />
                <div>
                  <span className="text-sm font-RubikMedium">Elektronikai szerviz</span>
                  <h2 className="text-sm">
                  Számítógéped egy kicsit szeszélyes? Laptopodnak nincs kedve a munkához? Ne aggódj, itt vagyunk, hogy mindent helyrehozzunk! Több mint 25 éves tapasztalattal állunk rendelkezésre, hogy segítsünk a szoftveres és hardveres kérdésekben egyaránt.
                  </h2>
                </div>
              </div>
            </div>
            <div className="hover:bg-neutral-800 duration-200 transition-all ease-in p-4">
              <div className="  flex items-center gap-x-3">
                <Image
                  height={1000}
                  width={1000}
                  className="w-24 h-24 object-cover rounded-md"
                  src="/hostingbuild.gif"
                  alt=""
                />
                <div>
                  <span className="text-sm font-RubikMedium">Teljeskörü hoszting kiépitése</span>
                  <h2 className="text-sm">
                  Segítek neked kiépíteni akár teljes körű hosting megoldásokat is, bármilyen igényed is legyen! Gyorsan és megbízhatóan intézem el, hogy a weboldalaid vagy játék szervereid zökkenőmentesen fussanak online. Ne tétovázz, ha kérdésed van, vagy el szeretnéd indítani a projektet!
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* without image */}

          <div className="mt-6  bg-[#1C1C1C] rounded-lg text-neutral-400">
            <div className="hover:bg-neutral-800 duration-200 transition-all ease-in p-4">
              <div className="  flex items-center gap-x-3">
                <div>
                  <h2 className="text-sm font-RubikMedium">
                    Smooth Animation with React and Framer Motion
                  </h2>
                  <div className="flex items-center gap-x-2 font-RubikBold">
                    <p className="bg-[#282828] w-fit text-neutral-300 rounded-md px-2 h-5 flex items-center justify-center text-[11px] ">
                      TypeScript
                    </p>
                    <div className="w-1 h-1 rounded-full bg-neutral-400" />
                    <span className="text-xs">Sunday, July 22, 2023</span>
                  </div>
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
