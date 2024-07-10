"use client";

import Link from "next/link";
import React from "react";
import { PiArrowLeftThin } from "react-icons/pi";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaServer,
  FaGamepad,
  FaEnvelope,
  FaComments,
  FaMicrophoneAlt,
  FaHdd,
  FaCloud,
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
          className="text-3xl font-RubikExtraBold text-center"
        >
          Hoszting épités szolgáltatás
        </motion.h1>
        <div className="flex items-center gap-x-2 justify-center my-4 font-RubikRegular">
          <p className="bg-[#282828] w-fit text-neutral-300 rounded-md px-2 h-5 flex items-center justify-center text-[10px]">
            Web, Játék, Email, Rádiószerver, VPS, Szerver
          </p>
          <div className="w-1 h-1 rounded-full bg-neutral-400" />
          <span className="text-xs">Frissítve: 2024.07.09.</span>
        </div>
        <section className="relative md:py-12 py-8">
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="bg-gray-800 rounded-lg text-neutral-100 p-6 shadow-md w-[300px] transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gray-700">
              <Link href="/dashboard/webhosting">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-gray-700 p-3 hover:shadow-lg hover:bg-blue-800">
                    <FaCloud className="text-gray-400 text-2xl animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Webhoszting</h3>
                    <p className="text-sm">
                      Weboldalak tárolása és hozzáférés biztosítása.
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="bg-gray-800 rounded-lg text-neutral-100 p-6 shadow-md w-[300px] transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gray-700">
              <Link href="/gamehosting">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-gray-700 p-3 hover:shadow-lg hover:bg-indigo-800">
                    <FaGamepad className="text-gray-400 text-2xl animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Játékhoszting</h3>
                    <p className="text-sm">
                      Online játékok szervereinak biztosítása.
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="bg-gray-800 rounded-lg text-neutral-100 p-6 shadow-md w-[300px] transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gray-700">
              <Link href="/emailhosting">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-gray-700 p-3 hover:shadow-lg hover:bg-green-800">
                    <FaEnvelope className="text-gray-400 text-2xl animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Email hoszting</h3>
                    <p className="text-sm">
                      Email szolgáltatások biztosítása, levelezési
                      infrastruktúra.
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="bg-gray-800 rounded-lg text-neutral-100 p-6 shadow-md w-[300px] transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gray-700">
              <Link href="/mailhosting">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-gray-700 p-3 hover:shadow-lg hover:bg-teal-800">
                    <FaComments className="text-gray-400 text-2xl animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      Levelezés hoszting
                    </h3>
                    <p className="text-sm">
                      Üzleti levelezési megoldások hosting szolgáltatása.
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="bg-gray-800 rounded-lg text-neutral-100 p-6 shadow-md w-[300px] transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gray-700">
              <Link href="/radioserverhosting">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-gray-700 p-3 hover:shadow-lg hover:bg-red-800">
                    <FaMicrophoneAlt className="text-gray-400 text-2xl animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      Rádiószerver hoszting
                    </h3>
                    <p className="text-sm">
                      Online rádióállomások számára szerverkapacitás
                      biztosítása.
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="bg-gray-800 rounded-lg text-neutral-100 p-6 shadow-md w-[300px] transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gray-700">
              <Link href="/vpshosting">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-gray-700 p-3 hover:shadow-lg hover:bg-yellow-800">
                    <FaHdd className="text-gray-400 text-2xl animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">VPS hoszting</h3>
                    <p className="text-sm">
                      Virtuális privát szerverek biztosítása és kezelése.
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="bg-gray-800 rounded-lg text-neutral-100 p-6 shadow-md w-[300px] transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gray-700">
              <Link href="/serverhosting">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-gray-700 p-3 hover:shadow-lg hover:bg-orange-800">
                    <FaServer className="text-gray-400 text-2xl animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Szerver hoszting</h3>
                    <p className="text-sm">
                      Fizikai szerverek hosting szolgáltatása nagy teljesítményű
                      alkalmazásokhoz.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}

export default Page;
