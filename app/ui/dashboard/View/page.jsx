"use client";
import React from "react";
import { PiGithubLogoLight } from "react-icons/pi";
import { SiCss3, SiFramer } from "react-icons/si";

import TestimonialTooltip from "@/app/TestimonialTooltip/page";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { SiLinux } from "react-icons/si";

function page() {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          delay: 0.9,
          type: "spring",
          stiffness: 200,
        },
      }}
      className="lg:block w-ful lg:w-fit hidden  max-xl:hidden "
    >
      <div className=" md:w-60 w-full rounded-2xl h-fit sticky top-5 ">
        <div>
          <div className="bg-[#1C1C1C] min-w-min rounded-2xl p-4 border border-neutral-800 h-fit hover:scale-110 animate-grow">
            <h2 className="font-RubikBold text-neutral-200">
              Webtárhely kupon
            </h2>
            <p className="text-xs my-3 text-neutral-400 font-RubikRegular">
              Használd a <b>RES-PCS-TH</b> kuponkódot, hogy 20% kedvezményt kapj
              webtárhely szolgáltatások rendelésekor!
            </p>
            <a
              href="https://www.mhosting.hu/tarhely#altalanos"
              className="bg-[#696969] h-7 p-1 rounded-md text-xs w-full font-RubikMedium text-neutral-50 block text-center hover:bg-neutral-800 duration-200 transition-all ease-in hover:scale-110 animate-grow"
            >
              Irány az mhosting.hu
            </a>
            <div className="border border-neutral-700 my-5" />

            <div className="text-neutral-400">
              <h1 className="font-RubikMedium text-neutral-200">
                Szolgáltatások
              </h1>
              <div className="flex items-center gap-x-3 mt-6 hover:bg-neutral-800  p-2 rounded-md ">
                <div className="bg-neutral-700/50 h-8 w-8 rounded-full flex items-center justify-center">
                  <PiGithubLogoLight className="text-lg" />
                </div>
                <h3 className="text-xs ">
                  Weboldal fejlesztés <br /> gyors határidővel
                </h3>
              </div>
              <div className="flex items-center gap-x-3 mt-6 hover:bg-neutral-800  p-2 rounded-md">
                <div className="bg-neutral-700/50 h-8 w-8 rounded-full flex items-center justify-center">
                  <SiFramer className="text-lg" />
                </div>
                <h3 className="text-xs ">
                  Elektronikai szerviz <br /> informatikai eszközök gyors és
                  szakszerü javitása
                </h3>
              </div>
              <div className="flex items-center gap-x-3 mt-6 hover:bg-neutral-800  p-2 rounded-md">
                <div className="bg-neutral-700/50 h-8 w-8 rounded-full flex items-center justify-center">
                  <SiLinux className="text-lg" />
                </div>
                <h3 className="text-xs ">Rendszergazdai szolgáltatások</h3>
              </div>

              <div className="border border-neutral-700 my-5" />

              <div className="flex items-center justify-center gap-x-2">
                <TestimonialTooltip />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-w-min rounded-2xl p-4 border border-neutral-800 mt-3 text-neutral-50 hover:scale-110 animate-grow">
          <Image
            width={1000}
            height={1000}
            className="h-32 w-56 object-cover rounded-lg"
            src="/web.gif"
            alt=""
          />
          <p className="my-3 font-medium text-sm">Bemutatkozó oldal kellene?</p>
          <button className="bg-[#696969] h-7 p-1 rounded-md text-xs w-full font-medium hover:bg-neutral-800 duration-200 transition-all ease-in hover:scale-110 animate-grow">
            <a
              href="mailto:info@promnet.hu?subject=Érdeklődés&"
              className="h-full w-full block text-center"
            >
              Már 50.000 Ft-tól!
            </a>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default page;
