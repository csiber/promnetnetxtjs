"use client";

import Link from "next/link";
import React from "react";
import { PiArrowLeftThin } from "react-icons/pi";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaServer,
  FaFireExtinguisher,
  FaTemperatureHigh,
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
              <Link href={"/dashboard/hostingbuilder"}>
                <button className="text-xs bg-neutral-700/25 p-1 w-16 h-6 rounded-md">
                  Hoszting
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
          Fizikai szerver hoszting szolgáltatás kiépitése
        </motion.h1>
        <div className="flex items-center gap-x-2 justify-center my-4 font-RubikRegular">
          <p className="bg-[#282828] w-fit text-neutral-300 rounded-md px-2 h-5 flex items-center justify-center text-[10px]">
            fizikai szerver, szerver hoszting
          </p>
          <div className="w-1 h-1 rounded-full bg-neutral-400" />
          <span className="text-xs">Frissítve: 2024.07.09.</span>
        </div>
        <div className="my-11 font-RubikMedium">
          <Image
            width={1000}
            height={1000}
            className="rounded-lg h-56 w-full object-cover"
            src="/serverhosting.webp"
            alt=""
          />
          <p className="my-7">
            A cikk fő részeiben bemutatom a legfontosabb szolgáltatásokat, amik
            ide kapcsolódnak:
          </p>
          <ul>
            <li>
              <strong>Webhoszting:</strong> A weboldalak tárolására és
              elérhetőségére szolgál. Ez lehet ügyfeleid weboldalai, vps
              szolgáltatásai, de akár a hosztingod saját weboldala is.
            </li>
            <li>
              <strong>E-mail hoszting:</strong> Az e-mail küldésére szolgál, ez
              többnyire tartalmazza a webhoszting.
            </li>
            <li>
              <strong>VPS hoszting:</strong> Virtuális privát szerverek
              biztosítása. Ez nagyban függ, hogyan szeretnéd a értékesiteni a
              szervereid eröforrását.
            </li>
            <li>
              <strong>Szerver hoszting:</strong> Fizikai szerverek berekesztése
              és fenntartása. Ez a kulcsa az egész szerver hosztingnak.
            </li>
          </ul>
          <div className="my-9">
            <Image
              height={1000}
              width={1000}
              className="rounded-lg h-56 w-full object-cover"
              src="/serverhostinganimated.gif"
              alt="serverhostinganimated"
            />
          </div>
          <h2 className="text-2xl font-RubikExtraBold">
            Hogyan történik a fizikai szerver hoszting kiépítése?{" "}
          </h2>
          <div className="my-4">
            <p className="mt-4">
              A fizikai szerver hoszting szolgáltatás lehetőséget nyújt
              vállalatoknak és szervezeteknek arra, hogy szervereiket külső
              adatközpontokban üzemeltessék, kiváltva ezzel a saját
              infrastruktúra költségeit és feladatait.
            </p>

            <h2 className="mt-6 font-RubikMedium">Előnyei</h2>
            <ul className="list-disc list-inside mt-3">
              <li>
                Költségcsökkentés, mivel nem szükséges saját szerverterem
                fenntartása.
              </li>
              <li>
                Magasabb rendelkezésre állás és biztonságosabb adatkezelés.
              </li>
              <li>
                Skálázhatóság: könnyebb és gyorsabb növekedési lehetőségek
                biztosítása.
              </li>
              <li>
                Professzionális infrastruktúra és szolgáltatások elérhetősége
                (pl. tűzoltórendszerek, klímaberendezések).
              </li>
            </ul>

            <h2 className="mt-6 font-RubikMedium">Hátrányai</h2>
            <ul className="list-disc list-inside mt-3">
              <li>
                Függés egy külső szolgáltatótól, amely befolyásolhatja a
                rendelkezésre állást és a szolgáltatás minőségét.
              </li>
              <li>
                Magasabb havi költségek, mint a saját infrastruktúra
                üzemeltetése esetén.
              </li>
              <li>
                Korlátozott egyedi szerverkonfigurációk és testreszabási
                lehetőségek.
              </li>
            </ul>

            <h2 className="mt-6 font-RubikMedium">
              Szükséges felszerelések és standard elvárások
            </h2>
            <p className="mt-3">
              A fizikai szerver hoszting szolgáltatás igénybevétele során fontos
              szempont a megfelelő felszerelések biztosítása az adatközpontban:
            </p>
            <ul className="list-disc list-inside mt-3">
              <li>
                Saját szerverszoba vagy szekrény biztosítása, lehetőség szerint
                klímaberendezéssel a hőmérséklet és páratartalom
                szabályozásához.
              </li>
              <li>
                Tűzvédelmi rendszerek, például tűzoltórendszerek és
                füstérzékelők, hogy megvédjék az eszközöket és az adatokat.
              </li>
              <li>
                Folyamatos áramellátás biztosítása (UPS rendszerek) és
                megbízható hűtési megoldások.
              </li>
            </ul>

            <div className="mt-8 flex justify-between">
              <div className="flex gap-x-3">
                <FaServer className="text-xl" />
                <div className="-mt-1">
                  <h3 className="text-sm font-RubikMedium">VPS Hoszting</h3>
                  <p className="text-[12px]">
                    Fizikai szerverek hosting szolgáltatása nagy teljesítményű
                    alkalmazásokhoz, vagy virtuális szerverekhez ajánlott.
                  </p>
                </div>
              </div>
              <small className="text-[12px] text-neutral-300">
                <a href="/dashboard/vpshosting">
                  További információkért látogass el ide.
                </a>
              </small>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Page;
