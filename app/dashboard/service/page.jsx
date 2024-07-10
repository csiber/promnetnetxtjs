"use client";

import Link from "next/link";
import React from "react";
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
  FaGamepad,
  FaCamera,
  FaBook,
} from "react-icons/fa";

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
