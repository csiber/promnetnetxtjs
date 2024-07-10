"use client";

import Link from "next/link";
import React from "react";
import { PiArrowLeftThin } from "react-icons/pi";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaGlobe,
  FaWordpress,
  FaCode,
  FaHandshake,
  FaServer,
  FaClock,
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
              <Link href={"/"}>
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
          <div className="mt-6 bg-gradient-to-r from-gray-800 to-blue-800 rounded-lg text-neutral-900 p-6 shadow-lg">
            <h2 className="text-xl font-RubikMedium text-neutral-100">
              Legyen saját bemutatkozó weboldalad!
            </h2>
            <p className="mt-4 text-neutral-100">Amit kapsz:</p>
            <ul className="mt-4 space-y-2 text-neutral-100">
              <li className="flex items-center">
                <FaGlobe className="text-neutral-400 mr-2" />
                <span>
                  Weboldal fejlesztés egységáron! Nincs egyéb rejtett költség!
                </span>
              </li>
              <li className="flex items-center">
                <FaWordpress className="text-neutral-400 mr-2" />
                <span>
                  Projektől és elképzeléstől függően keretrendszer alapú
                  weboldal
                </span>
              </li>
              <li className="flex items-center">
                <FaCode className="text-neutral-400 mr-2" />
                <span>
                  Egyedi témák, nem sablon alapúak, így nem fogod máshol
                  meglátni! (nem tucatra megyek)
                </span>
              </li>
              <li className="flex items-center">
                <FaHandshake className="text-neutral-400 mr-2" />
                <span>
                  Szerződéskötést és előleg elutalása után már neki is állok, a
                  kapott anyagok beérkezését követően.
                </span>
              </li>
              <li className="flex items-center">
                <FaServer className="text-neutral-400 mr-2" />
                <span>
                  Hozzáférést biztosítok, így meg tudod tekinteni, hol tart a
                  projekted.
                </span>
              </li>
              <li className="flex items-center">
                <FaServer className="text-neutral-400 mr-2" />
                <span>
                  Az árban már benne a webtárhely és a domain 1 évre partner
                  hostingban!
                </span>
              </li>
              <li className="flex items-center">
                <FaClock className="text-red-400 mr-2" />
                <span>Gyors fejlesztési idő, maximum 30 napon belül kész!</span>
              </li>
            </ul>
          </div>
          <div className="mt-6 bg-[#1C1C1C] rounded-lg text-neutral-400 border border-gradient-gray p-6 shadow-lg">
            <h2 className="text-xl font-RubikMedium text-neutral-100">
              Érdeklődni szeretnél?
            </h2>
            <p className="mt-2 text-neutral-100">
              Kérlek, vedd fel velünk a kapcsolatot!
            </p>
            <p className="mt-4 text-neutral-100">
              Telefon:{" "}
              <a
                href="tel:+36205494107"
                className="text-lime-400 hover:text-lime-300 transition duration-200"
              >
                +36 20 549 4107
              </a>
            </p>
            <p className="mt-2 text-neutral-100">
              Email:{" "}
              <a
                href="mailto:info@promnet.hu"
                className="text-lime-400 hover:text-lime-300 transition duration-200"
              >
                info@promnet.hu
              </a>
            </p>
          </div>
        </section>
      </div>
    </motion.div>
  );
}

export default Page;
