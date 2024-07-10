"use client";

import Link from "next/link";
import React from "react";
import { PiArrowLeftThin } from "react-icons/pi";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaHdd, FaCloudUploadAlt, FaServer } from "react-icons/fa";

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
          Virtuális szerver hoszting szolgáltatás kiépitése
        </motion.h1>
        <div className="flex items-center gap-x-2 justify-center my-4 font-RubikRegular">
          <p className="bg-[#282828] w-fit text-neutral-300 rounded-md px-2 h-5 flex items-center justify-center text-[10px]">
            fizikai szerver, szerver hoszting, virtuális szerver, vps
          </p>
          <div className="w-1 h-1 rounded-full bg-neutral-400" />
          <span className="text-xs">Frissítve: 2024.07.09.</span>
        </div>
        <div className="my-11 font-RubikMedium">
          <Image
            width={1000}
            height={1000}
            className="rounded-lg h-56 w-full object-cover"
            src="/vpshosting.webp"
            alt="vpshosting"
          />
          <p className="my-7">
            A cikk fő részeiben bemutatom a legfontosabb szolgáltatásokat, amik
            ide kapcsolódnak:
          </p>
          <ul>
            <li>
              <strong>Webhoszting:</strong> A weboldalak tárolására és
              elérhetőségére szolgál. Ez lehet ügyfeleid játékszervereinek, de
              akár a hosztingod saját weboldala is.
            </li>
            <li>
              <strong>E-mail hoszting:</strong> Az e-mail küldésére szolgál, ez
              többnyire tartalmazza a webhoszting.
            </li>
            <li>
              <strong>VPS hoszting:</strong> Virtuális privát szerverek
              biztosítása. Ez nagyban függ, hogyan szeretnéd a játékszervereket
              biztositani.
            </li>
            <li>
              <strong>Szerver hoszting:</strong> Fizikai szerverek berekesztése
              és fenntartása. Ez a kulcsa az egész játékszerver hosztingnak.
            </li>
          </ul>
          <div className="my-9">
            <Image
              height={1000}
              width={1000}
              className="rounded-lg h-56 w-full object-cover"
              src="/vpsservers.gif"
              alt="vpsservers"
            />
          </div>
          <h2 className="text-2xl font-RubikExtraBold">
            Hogyan történik a virtuális szerver hoszting kiépítése?{" "}
          </h2>
          <div className="my-4">
            <p className="mt-4">
              A VPS hoszting lehetőséget nyújt vállalkozásoknak és egyéni
              felhasználóknak egyaránt, hogy rugalmasan és gazdaságosan
              használják a szerverkapacitást a szükségleteiknek megfelelően.
            </p>

            <h2 className="mt-6 font-RubikMedium">
              Saját Szervergép Hosztolás vs. Bérelt Szervergép Hosztolás
            </h2>
            <p className="mt-3">
              A VPS hoszting lehetőséget ad a vállalatoknak, hogy
              választhassanak saját szervergépek (dedikált VPS) vagy bérelt
              szerverek (shared VPS) között, attól függően, hogy melyik megoldás
              felel meg jobban az üzleti igényeiknek és költségkeretüknek.
            </p>

            <h3 className="mt-6 font-RubikMedium">
              Saját Szervergép Hosztolás
            </h3>
            <ul className="list-disc list-inside mt-3">
              <li>
                Kizárólagos hozzáférés a szerverkapacitáshoz és erőforrásokhoz.
              </li>
              <li>
                Magasabb szintű biztonság és adatvédelem, mivel nincs más ügyfél
                szervereivel megosztva.
              </li>
              <li>
                Nagyobb testreszabási lehetőségek a hardver és szoftver
                konfigurációk terén.
              </li>
            </ul>

            <h3 className="mt-6 font-RubikMedium">
              Bérelt Szervergép Hosztolás
            </h3>
            <ul className="list-disc list-inside mt-3">
              <li>
                Gazdaságosabb megoldás kezdő és kisebb vállalkozások számára.
              </li>
              <li>
                Kevesebb karbantartási feladat, mivel a szolgáltató felelős a
                szerverüzemeltetésért.
              </li>
              <li>
                Kisebb skálázhatóság, mivel az erőforrások más ügyfelekkel
                vannak megosztva.
              </li>
            </ul>

            <h2 className="mt-6 font-RubikMedium">Mikor Jobb és Rosszabb?</h2>
            <p className="mt-3">
              A döntés saját szervergép vagy bérelt szervergép hosztolása között
              függ az adott vállalat igényeitől és prioritásaiktól. Például,
              nagyobb vállalatok gyakran választják a saját szervergép
              hosztolást, mivel ez magasabb fokú biztonságot és
              testreszabhatóságot biztosít. Kis- és középvállalatoknak vagy
              kezdő vállalkozásoknak viszont lehet, hogy a bérelt szervergép
              hosztolás gazdaságosabb megoldás.
            </p>

            <div className="mt-8 flex justify-between">
              <div className="flex gap-x-3">
                <FaHdd className="text-xl" />
                <div className="-mt-1">
                  <h3 className="text-sm font-RubikMedium">Szerver Hoszting</h3>
                  <p className="text-[12px]">
                    Virtuális privát szerverek biztosítása és kezeléséhez
                    feltétlenül szükséges szolgáltatás, a szervergépek
                    hosztoláa.
                  </p>
                </div>
              </div>
              <small className="text-[12px] text-neutral-300">
                <a href="/dashboard/serverhosting">
                  További információkért látogass el ide
                </a>
                .
              </small>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Page;
