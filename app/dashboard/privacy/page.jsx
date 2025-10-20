import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("/dashboard/privacy");

export default function PrivacyPage() {
  return (
    <section className="promnet-surface mx-auto mt-6 w-full max-w-3xl space-y-6 p-8">
      <header className="space-y-3">
        <h1 className="text-2xl font-semibold text-foreground">Adatvédelmi áttekintés</h1>
        <p className="text-sm text-muted">
          Az alábbi összefoglaló ismerteti, hogyan használjuk az anonim analitikát, milyen sütik működnek az oldalon és miként vonhatod vissza a hozzájárulásodat.
        </p>
      </header>
      <article className="space-y-4 text-sm leading-relaxed text-muted">
        <section aria-labelledby="analytics-heading" className="space-y-2">
          <h2 id="analytics-heading" className="text-lg font-semibold text-foreground">
            Anonim analitika
          </h2>
          <p>
            A PromNET a Vercel Analytics szolgáltatást használja összesített, személyre nem visszavezethető statisztikákhoz. Az IP-címeket nem tároljuk, a mérések célja a teljesítmény és felhasználhatóság fejlesztése.
          </p>
        </section>
        <section aria-labelledby="consent-heading" className="space-y-2">
          <h2 id="consent-heading" className="text-lg font-semibold text-foreground">
            Hozzájárulás kezelése
          </h2>
          <p>
            A consent sávban bármikor eldöntheted, hogy engedélyezed-e a statisztikai sütiket. Elutasítás esetén nem töltünk be mérőkódot és az eseménykövetés inaktív marad.
          </p>
        </section>
        <section aria-labelledby="contact-heading" className="space-y-2">
          <h2 id="contact-heading" className="text-lg font-semibold text-foreground">
            Kapcsolat az adatkezeléssel kapcsolatban
          </h2>
          <p>
            Kérdés vagy kérelem esetén írj az <a href="mailto:info@promnet.hu" className="text-accent">info@promnet.hu</a> címre. Az adatkezeléssel kapcsolatos kérelmeket 30 napon belül elbíráljuk.
          </p>
        </section>
      </article>
    </section>
  );
}
