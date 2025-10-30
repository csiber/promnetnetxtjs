'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { PiArrowLeftThin } from "react-icons/pi";
import { caseStudies } from "@/data/case-studies";

export default function CaseStudiesPage() {
  return (
    <motion.div
      className="text-neutral-50"
      initial={{ y: 100, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.8,
          delay: 0.4,
          type: "spring",
          stiffness: 200,
        },
      }}
    >
      <div className="sticky top-5">
        <div className="-mt-6">
          <div className="flex h-10 w-full items-center gap-x-7 rounded-xl bg-neutral-700/25 backdrop-blur-md">
            <Link href={"/dashboard"}>
              <div className="ml-3 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-700/50">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-300">
                  <PiArrowLeftThin className="text-lg text-black" />
                </div>
              </div>
            </Link>
            <Link href={"/dashboard"}>
              <button className="h-6 w-16 rounded-md bg-neutral-700/25 text-xs">Kezdőlap</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-9 h-full w-full rounded-2xl border border-neutral-700 bg-[#1C1C1C] p-5">
        <motion.h1
          initial={{ x: 80, opacity: 0, filter: "blur(4px)" }}
          animate={{
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
              duration: 0.8,
              delay: 0.6,
              type: "spring",
              stiffness: 200,
            },
          }}
          className="text-3xl font-RubikExtraBold text-neutral-50"
        >
          Esettanulmányok
        </motion.h1>
        <p className="mt-4 text-sm text-neutral-300">
          Valós projektek, részletesen dokumentált folyamatokkal, mérhető eredményekkel és tanulságokkal. Nézd meg, hogyan építünk fel egy sikeres digitális terméket az ötlettől a hosszú távú üzemeltetésig.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {caseStudies.map((study, index) => (
            <Link key={study.slug} href={`/dashboard/case-studies/${study.slug}`}>
              <motion.article
                className="flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-neutral-900/60 p-5 text-neutral-100 transition hover:-translate-y-1 hover:border-emerald-200/40"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              >
                <h2 className="text-lg font-RubikMedium text-neutral-50">{study.overview.title}</h2>
                <p className="text-sm text-neutral-300">{study.overview.summary}</p>
                <div className="mt-auto flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.2em] text-neutral-400">
                  {study.overview.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 px-3 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
