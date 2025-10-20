"use client";

import { useEffect, useState } from "react";
import { useConsent } from "@/components/providers/ConsentProvider";
import Link from "next/link";

export default function ConsentBanner() {
  const { status, ready, grant, deny } = useConsent();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (ready && status === "unknown") {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [ready, status]);

  if (!visible) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Süti és mérési engedélykérés"
      className="fixed bottom-4 left-1/2 z-50 w-[min(680px,calc(100%-2rem))] -translate-x-1/2 rounded-3xl border border-border/70 bg-card/95 p-5 shadow-accent backdrop-blur-lg"
    >
      <div className="flex flex-col gap-4 text-sm text-foreground">
        <div className="space-y-2">
          <p className="font-semibold text-base">Adatvédelmi beállítások</p>
          <p className="leading-relaxed text-muted">
            A PromNET anonim statisztikákat gyűjt a felhasználói élmény javításához. A mérések csak a hozzájárulásod után indulnak el, a sütiket pedig bármikor letilthatod.
          </p>
          <p className="text-xs text-muted">
            Részletek: <Link href="/dashboard/privacy" className="font-semibold">adatvédelmi tájékoztató</Link>.
          </p>
        </div>
        <div className="flex flex-wrap justify-end gap-2 text-sm">
          <button
            type="button"
            onClick={deny}
            className="rounded-full border border-border px-4 py-2 font-medium text-foreground transition hover:bg-border/40"
          >
            Csak szükségesek
          </button>
          <button
            type="button"
            onClick={grant}
            className="rounded-full bg-accent px-5 py-2 font-semibold text-accent-foreground shadow-soft transition hover:bg-accent/90"
          >
            Elfogadom a statisztikát
          </button>
        </div>
      </div>
    </div>
  );
}
