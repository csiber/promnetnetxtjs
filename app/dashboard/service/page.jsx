import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("/dashboard/service");

const serviceItems = [
  {
    title: "Alap gyorsszerviz",
    description: "Gyors diagnosztika, alap javítások, adatmentési tanácsadás.",
    price: "9 900 Ft",
  },
  {
    title: "Hardver diagnosztika",
    description: "Hibakeresés, alkatrész javaslatok, stabilitás ellenőrzés.",
    price: "15 900 Ft",
  },
  {
    title: "Helyszíni kiszállás",
    description: "Kiszállás, állapotfelmérés, azonnali beavatkozás.",
    price: "Egyedi",
  },
];

export default function ServicePage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 pb-16 pt-12">
      <header className="space-y-4">
        <p className="section-kicker">Elektronikai szerviz</p>
        <h1 className="section-title mt-3">Gyors, átlátható szerviz mellékág</h1>
        <p className="section-body max-w-2xl">
          Ez egy mellékág, ami a helyi ügyfeleknek szól. A fókusz továbbra is backend és infrastruktúra, de ha gyors
          segítség kell hardver vagy hálózat esetén, itt lehet elindulni.
        </p>
      </header>

      <section className="mt-10 space-y-6">
        {serviceItems.map((item) => (
          <article key={item.title} className="rounded-xl border border-white/10 bg-card/70 p-6">
            <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-foreground">{item.title}</h2>
                <p className="mt-2 text-sm text-muted">{item.description}</p>
              </div>
              <span className="text-sm font-semibold text-accent">{item.price}</span>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
