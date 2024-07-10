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
          Webhoszting szolgáltatás kiépitése
        </motion.h1>
        <div className="flex items-center gap-x-2 justify-center my-4 font-RubikRegular">
          <p className="bg-[#282828] w-fit text-neutral-300 rounded-md px-2 h-5 flex items-center justify-center text-[10px]">
            Webtárhely, webhosting
          </p>
          <div className="w-1 h-1 rounded-full bg-neutral-400" />
          <span className="text-xs">Frissítve: 2024.07.09.</span>
        </div>
        <div className="my-11 font-RubikMedium">
          <Image
            width={1000}
            height={1000}
            className="rounded-lg h-56 w-full object-cover"
            src="/webhostingbuilding.webp"
            alt=""
          />
          <p className="my-7">
            A cikk fő részeiben bemutatjuk a legfontosabb webhoszting
            szolgáltatásokat, mint például:
          </p>
          <ul>
            <li>
              <strong>Webhoszting:</strong> A weboldalak tárolására és
              elérhetőségére szolgál.
            </li>
            <li>
              <strong>E-mail hoszting:</strong> Az e-mail fiókok tárolására és
              kezelésére szolgál.
            </li>
            <li>
              <strong>VPS hoszting:</strong> Virtuális privát szerverek
              biztosítása.
            </li>
            <li>
              <strong>Szerver hoszting:</strong> Fizikai szerverek berekesztése
              és fenntartása.
            </li>
          </ul>
          <div className="my-9">
            <Image
              height={1000}
              width={1000}
              className="rounded-lg h-56 w-full object-cover"
              src="/webhostanimated.gif"
              alt="webhost"
            />
          </div>
          <h2 className="text-2xl font-RubikExtraBold">
            Hogyan történik a Webhoszting kiépitése?{" "}
          </h2>
          <p className="my-4">
            A webhoszting, vagy webtárhely szolgáltatás nyújtása nem csupán a
            szerverek elhelyezését és üzemeltetését jelenti, hanem egy összetett
            folyamatot, amely során számos lépésen kell átmenni annak érdekében,
            hogy a weboldalak és alkalmazások megfelelően működjenek és
            elérhetők legyenek az interneten. Ebben a cikkben megvizsgáljuk,
            hogy hogyan történik a webhoszting kiépítése, és milyen lépéseken
            kell átmenni ebben a folyamatban.
          </p>
          <h2 className="text-2xl font-RubikBold my-5">
            {" "}
            1. Ügyfél igényeinek és elképzeléseinek megértése{" "}
          </h2>
          <p className="my-4">
            {" "}
            A webhoszting szolgáltatás kiépítése először is az ügyfél igényeinek
            és elképzeléseinek megértésével kezdődik. Fontos tisztázni, hogy
            milyen típusú weboldalt vagy alkalmazást szeretne a ügyfél hostolni,
            milyen mennyiségű forgalomra számít, és milyen funkciókat kell
            támogatnia a tárhely szolgáltatásnak.
          </p>{" "}
          <h2 className="text-2xl font-RubikBold my-5">
            {" "}
            2. Szükséges infrastruktúra kiválasztása{" "}
          </h2>{" "}
          <p className="my-4">
            Az igények alapján a szolgáltató kiválasztja a megfelelő
            infrastruktúrát. Ez lehet fizikai szerver az adatközpontban,
            virtuális privát szerver (VPS), felhőalapú szolgáltatás vagy
            dedikált szerver. A választás függ az alkalmazás komplexitásától, a
            biztonsági igényektől és a skálázhatósági követelményektől.
          </p>{" "}
          <h2 className="text-2xl font-RubikBold my-5">
            3. Hardver és szoftver konfiguráció
          </h2>{" "}
          <p className="my-4">
            Miután kiválasztották az infrastruktúrát, a szolgáltató beállítja és
            konfigurálja a szükséges hardveres és szoftveres elemeket. Ez
            magában foglalja a szerverek telepítését, a szükséges operációs
            rendszer telepítését és konfigurálását, valamint a biztonsági
            beállítások és a tűzfalak konfigurálását.{" "}
          </p>
          <h2 className="text-2xl font-RubikBold my-5">
            {" "}
            4. Webhoszting szolgáltatás beállítása
          </h2>{" "}
          <p className="my-4">
            A következő lépésben a webhoszting szolgáltatás kerül beállításra.
            Ez magában foglalja a domain nevének regisztrációját vagy a már
            meglévő domainekhez történő kapcsolódást, a DNS beállítások
            konfigurálását, a webalkalmazások vagy weboldalak telepítését és
            azok optimalizálását a gyors és megbízható működés érdekében.
          </p>{" "}
          <h2 className="text-2xl font-RubikBold my-5">
            5. Biztonsági intézkedések és mentési stratégiák beállítása
          </h2>{" "}
          <p className="my-4">
            A biztonság alapvető fontosságú a webhoszting szolgáltatásoknál.
            Ezért a szolgáltatók biztonsági intézkedéseket kell, hogy
            alkalmazzanak, mint például SSL tanúsítványok telepítése, rendszeres
            biztonsági frissítések végrehajtása, tűzfalak beállítása és
            monitorozása, valamint mentési és helyreállítási stratégiák
            kidolgozása.
          </p>{" "}
          <h2 className="text-2xl font-RubikBold my-5">
            {" "}
            6. Ügyfél kapcsolattartás és támogatás
          </h2>{" "}
          <p className="my-4">
            Végül, a webhoszting szolgáltatás kiépítése során fontos, hogy a
            szolgáltató folyamatos kommunikációt és támogatást biztosítson az
            ügyfél számára. Ez magában foglalja az ügyfélszolgálatot, a
            problémamegoldást és az esetleges kérések kezelését.
          </p>{" "}
          <p className="my-4">
            Összegzés: A webhoszting szolgáltatás kiépítése tehát egy összetett
            folyamat, amelyet alapos tervezés, konfiguráció és tesztelés előz
            meg. A megfelelő infrastruktúra kiválasztása és beállítása, a
            biztonsági intézkedések és a folyamatos ügyféltámogatás biztosítása
            kulcsfontosságúak a sikeres webhoszting szolgáltatás nyújtásában. A
            szakértői tudás és a tapasztalat nélkülözhetetlen a komplex
            technológiai kihívások megoldásában és a megbízható online jelenlét
            biztosításában.
          </p>{" "}
        </div>
      </div>
    </motion.div>
  );
}

export default Page;
