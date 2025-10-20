"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("PromNET hibaoldal", error);
  }, [error]);

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <span className="promnet-badge">500</span>
      <h1 className="text-3xl font-semibold text-foreground">Valami félresikerült</h1>
      <p className="max-w-md text-sm text-muted">
        A rendszerhiba naplózásra került. Próbáld újra a műveletet, vagy jelezd felénk, ha a probléma továbbra is fennáll.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-full border border-border px-5 py-2 text-sm font-semibold text-foreground transition hover:bg-border/40"
        >
          Újrapróbálom
        </button>
        <Link
          href="mailto:info@promnet.hu"
          className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground shadow-soft transition hover:bg-accent/90"
        >
          Hibabejelentés
        </Link>
      </div>
    </main>
  );
}
