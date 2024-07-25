"use client";

import Link from "next/link";
import React from "react";
import { PiArrowLeftThin } from "react-icons/pi";
import { motion } from "framer-motion";
import Image from "next/image";

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
          Eddigi projekteim
        </motion.h1>
        <div className="flex items-center gap-x-2 justify-center my-4 font-RubikRegular">
          <p className="bg-[#282828] w-fit text-neutral-300 rounded-md px-2 h-5 flex items-center justify-center text-[10px]">
            Portfolio Weboldalak
          </p>
          <div className="w-1 h-1 rounded-full bg-neutral-400" />
          <span className="text-xs">Frissítve: 2024.07.09.</span>
        </div>
        <section className="relative md:py-12 py-8">
          <div className="container relative">
            <div className="grid grid-cols-1 md:grid-cols-2 mt-10 lg:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <a
                  href="https://tukormuhely.hu"
                  className="text-blue-500 hover:underline"
                >
                  <h3 className="text-lg font-semibold mb-2">Tükörmühely</h3>
                </a>
                <p className="text-gray-700 mb-2">
                  Tükör készitéssel és értékesitéssel foglalkozó weboldal.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <a
                  href="https://webshop.weddingarts.hu/"
                  className="text-blue-500 hover:underline"
                >
                  <h3 className="text-lg font-semibold mb-2">
                    Weddingarts webáruház
                  </h3>
                </a>
                <p className="text-gray-700 mb-2">
                  Esküvöi termékeket értékesitö webáruház, régi munkáink egyike
                  ami még a mai napig megtalálható!
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <a
                  href="https://artbysylviaszluka.hu/"
                  className="text-blue-500 hover:underline"
                >
                  <h3 className="text-lg font-semibold mb-2">
                    Art by Sylvia Szluka
                  </h3>
                </a>
                <p className="text-gray-700 mb-2">
                  Festészettel, értékesitéssel is foglalkozó weboldal.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <a
                  href="https://tradehub.hu"
                  className="text-blue-500 hover:underline"
                >
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{ textDecoration: "line-through" }}
                  >
                    TradeHUB
                  </h3>
                </a>
                <p className="text-gray-700 mb-2">
                  Piac jellegü értékesitö oldal. Ez a weboldal már sajnos nem
                  elérhetö.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <a
                  href="https://hajnalkarpit.hu"
                  className="text-blue-500 hover:underline"
                >
                  <h3 className="text-lg font-semibold mb-2">Hajnal Kárpit</h3>
                </a>
                <p className="text-gray-700 mb-2">
                  Bútorgyártással, kárpitozással, értékesitéssel foglalkozó
                  bemutatkozó oldal.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <a
                  href="https://memgyujto.hu"
                  className="text-blue-500 hover:underline"
                >
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{ textDecoration: "line-through" }}
                  >
                    Mémgyüjtö
                  </h3>
                </a>
                <p className="text-gray-700 mb-2">
                  Vicces képek gyüjteménye. Sajnos már nem elérhető.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <a
                  href="https://moziverzum.hu"
                  className="text-blue-500 hover:underline"
                >
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{ textDecoration: "line-through" }}
                  >
                    Moziverzum
                  </h3>
                </a>
                <p className="text-gray-700 mb-2">
                  Filmek, sorozatok gyüjteménye. Sajnos már nem elérhető.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <a
                  href="https://eletenat.hu"
                  className="text-blue-500 hover:underline"
                >
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{ textDecoration: "line-through" }}
                  >
                    Életen át
                  </h3>
                </a>
                <p className="text-gray-700 mb-2">
                  Rendezvényszervező bemutatkozó oldala. Sajnos már nem
                  elérhető.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <a
                  href="https://eurofiveradio.hu"
                  className="text-blue-500 hover:underline"
                >
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{ textDecoration: "line-through" }}
                  >
                    Euro Five Rádió
                  </h3>
                </a>
                <p className="text-gray-700 mb-2">
                  Online rádió portál, közösségi oldal. Sajnos már nem elérhető.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <a
                  href="https://babocapelus.hu"
                  className="text-blue-500 hover:underline"
                >
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{ textDecoration: "line-through" }}
                  >
                    Babóca Pelus Webáruház
                  </h3>
                </a>
                <p className="text-gray-700 mb-2">
                  Babaruhákat, egyéb kellékeket értékesitö webáruház. Sajnos már
                  nem elérhető.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <a
                  href="https://playhost.hu"
                  className="text-blue-500 hover:underline"
                >
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{ textDecoration: "line-through" }}
                  >
                    PlayHost - játékszerver hoszting
                  </h3>
                </a>
                <p className="text-gray-700 mb-2">
                  Játékszerver bérléssel foglalkozó vállalkozás weboldala.
                  Sajnos már nem elérhető. A domain eladó!
                </p>
              </div>

              <div className="p-6 bg-white rounded-lg shadow-md">
                <a
                  href="https://elisnilufer.hu"
                  className="text-blue-500 hover:underline"
                >
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{ textDecoration: "line-through" }}
                  >
                    Elis Nilufer portfolio
                  </h3>
                </a>
                <p className="text-gray-700 mb-2">
                  Könyviró saját bemutatkozó oldala. Sajnos már nem elérhető.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <a
                  href="https://krutimtrans.hu"
                  className="text-blue-500 hover:underline"
                >
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{ textDecoration: "line-through" }}
                  >
                    Kru-Tim Trans portfolio
                  </h3>
                </a>
                <p className="text-gray-700 mb-2">
                  Szállitmányozással foglalkozó cég online bemutatkozó oldala.
                  Sajnos már nem elérhető.
                </p>
              </div>

              <div className="p-6 bg-white rounded-lg shadow-md">
                <a
                  href="https://dobaifood.hu"
                  className="text-blue-500 hover:underline"
                >
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{ textDecoration: "line-through" }}
                  >
                    Dobai Food pizzéria
                  </h3>
                </a>
                <p className="text-gray-700 mb-2">
                  Pizzéria online rendelés oldala. Sajnos már nem elérhető.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <a
                  href="https://vizszivargasbemeres.hu"
                  className="text-blue-500 hover:underline"
                >
                  <h3 className="text-lg font-semibold mb-2">
                    Vizszivárgás bemérés - Rajt Attila E.V.
                  </h3>
                </a>
                <p className="text-gray-700 mb-2">
                  Viz-gáz-fütés szereléssel foglalkozó vállalkozás bemutatkozó
                  oldala.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <a
                  href="https://dinaphotography.hu"
                  className="text-blue-500 hover:underline"
                >
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{ textDecoration: "line-through" }}
                  >
                    Dina Photography
                  </h3>
                </a>
                <p className="text-gray-700 mb-2">
                  Fotózással, portré készitéssel foglalkozó fotós bemutatkozó
                  oldala. Sajnos már nem elérhető.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <a
                  href="https://statueprint.com"
                  className="text-blue-500 hover:underline"
                >
                  <h3 className="text-lg font-semibold mb-2">Statue Print</h3>
                </a>
                <p className="text-gray-700 mb-2">
                  3D nyomtatás témával foglalkozó webshop. Angol nyelvü. 3D
                  modelleket értékesit.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <a
                  href="https://nistoregon.hu"
                  className="text-blue-500 hover:underline"
                >
                  <h3 className="text-lg font-semibold mb-2">
                    Nistor Egon E.V. portfolio
                  </h3>
                </a>
                <p className="text-gray-700 mb-2">
                  Ablak, ajtó szereléssel foglalkozó vállalkozás bemutatkozó
                  oldala.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <a
                  href="https://promshop.hu"
                  className="text-blue-500 hover:underline"
                >
                  <h3 className="text-lg font-semibold mb-2">
                    PromNET Webáruház
                  </h3>
                </a>
                <p className="text-gray-700 mb-2">
                  Hálózati eszközökkel foglalkozó webáruház. Saját!
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <a
                  href="https://techlabinsights.com"
                  className="text-blue-500 hover:underline"
                >
                  <h3 className="text-lg font-semibold mb-2">
                    TechLab Insights
                  </h3>
                </a>
                <p className="text-gray-700 mb-2">
                  3D nyomtatással, 3D model értékesitéssel foglalkozó angol
                  nyelvü webáruház.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <a
                  href="https://promark.promnet.cloud"
                  className="text-blue-500 hover:underline"
                >
                  <h3 className="text-lg font-semibold mb-2">PromARK</h3>
                </a>
                <p className="text-gray-700 mb-2">
                  PromARK - ARK Survival Evolved - Ascended játékszerverek
                  közösségi oldala. Saját!
                </p>
              </div>
            </div>
            <p>*A lista nem teljes.</p>
          </div>
        </section>
      </div>
    </motion.div>
  );
}

export default Page;
