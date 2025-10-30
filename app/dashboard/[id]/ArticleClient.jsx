"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PiArrowLeftThin } from "react-icons/pi";

export default function ArticleClient({ post }) {
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
              <button className="h-6 w-20 rounded-md bg-neutral-700/25 text-xs">Vissza</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-9 w-full rounded-2xl border border-neutral-700 bg-[#1C1C1C] p-5 shadow-[0_30px_80px_-50px_rgba(59,130,246,0.5)]">
        <motion.header
          initial={{ x: 60, opacity: 0, filter: "blur(6px)" }}
          animate={{
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
              duration: 0.8,
              delay: 0.5,
              type: "spring",
              stiffness: 220,
            },
          }}
          className="space-y-4"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-500/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-sky-200">
            blogocska.hu
          </span>
          <h1 className="text-3xl font-RubikExtraBold text-neutral-50">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400">
            {post.categories.map((category) => (
              <span key={category} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 uppercase tracking-[0.2em]">
                {category}
              </span>
            ))}
            {post.publishedRelative ? (
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Megjelenés: {post.publishedRelative}
              </span>
            ) : null}
          </div>
        </motion.header>

        <article className="mt-6 space-y-5 text-sm leading-relaxed text-neutral-200">
          {post.content.map((paragraph, index) => (
            <p key={index} className="text-neutral-300">
              {paragraph}
            </p>
          ))}
        </article>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-neutral-900/60 p-4 text-sm text-neutral-200">
          <p className="max-w-[520px] text-neutral-300">
            Tetszett a bejegyzés? A teljes cikk a Blogocska felületén érhető el, ahol további technikai tartalmakat is találsz.
          </p>
          <Link
            href={post.link}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-xs font-RubikMedium uppercase tracking-[0.25em] text-emerald-100 transition hover:-translate-y-0.5 hover:border-emerald-200 hover:text-emerald-50"
          >
            Teljes cikk megnyitása
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
