# Fejlesztési javaslatok a PromNET oldalhoz

Az alábbi pontok a jelenlegi kódállomány gyors áttekintése alapján gyűjtött fejlesztési ötletek. Mindegyik javaslat konkrét problémát vagy növekedési lehetőséget céloz, illetve röviden vázolja a megvalósítás lehetséges irányát.

## 2025-10-30 frissítés
- A mobil lead űrlap mostantól modálként is elérhető, fókuszcsapdával és akadálymentes vezérléssel.
- Az esettanulmány metaadatok a `data/case-studies.js` modulban centralizáltak, így a főoldal és a dashboard is onnan dolgozik.
- A `/dashboard/[id]` útvonal blogbejegyzéseket tölt be a blogocska.hu feedjéből, valós tartalommal és dinamikus metadatával.
- Szolgáltatás oldalakra `Service` típusú JSON-LD sémák kerültek, a `data/services.js` forrás alapján.

## 1. Lead űrlap elérhetőség mobilon
- **Megfigyelés:** A vezérlő sávban elhelyezett lead űrlap `hidden` osztályt kap, így csak `md` törésponttól jelenik meg. Mobilon jelenleg nincs mód strukturált lead bekérésre, csak gyors akció linkek érhetők el.【F:app/dashboard/Left/page.jsx†L451-L520】
- **Miért fontos:** A forgalom jelentős része mobilról érkezik, emiatt elveszhetnek az érdeklődők. A form kitöltése ráadásul mélyebb projekt-információt ad már az első kapcsolatfelvételnél.
- **Javasolt lépések:**
  1. Vezess be mobilon is elérhető űrlapot – például egy „Ajánlatkérés” gombot, ami modálban vagy külön szekcióban nyitja meg ugyanazt az űrlapot.
  2. Gondoskodj a billentyűzethasználat és a fókuszkezelés akadálymentesítéséről (focus trap, `aria-modal`).
  3. A lead-küldési API már létezik, így kliens oldalon csak a submit logikát kell újrahasznosítani.

## 2. Esettanulmány adatok központosítása
- **Megfigyelés:** A `HomePage` komponensben és a case study listanézetben duplikált tömbök tárolják ugyanazokat az esettanulmány metaadatokat.【F:app/HomePage/page.jsx†L102-L127】【F:app/dashboard/case-studies/CaseStudiesClient.jsx†L7-L22】
- **Miért fontos:** A kettős karbantartás növeli a hibák esélyét (például eltérő cím, tag lista). Ha több esettanulmány kerül fel, ez exponenciálisan rosszabb lesz.
- **Javasolt lépések:**
  1. Hozz létre egy `data/case-studies.js` modult, amely exportálja az összes esettanulmány struktúrált adatait.
  2. A `HomePage` és a `CaseStudiesClient` csak ebből a forrásból olvasson, így garantált a konzisztencia.
  3. A részletes oldalak (`creatify`, `promark`) is ugyanebből a modulból húzhatják be a mutatószámokat, így egy helyen lehet frissíteni az adatokat.

## 3. Dinamikus tartalom a `/dashboard/[id]` útvonalon
- **Megfigyelés:** A dinamikus route jelenleg egy angol nyelvű, általános cikket renderel, amely nem illeszkedik a PromNET márkához.【F:app/dashboard/[id]/ClientPage.jsx†L63-L184】
- **Miért fontos:** A felhasználó olyan oldalra juthat, amely félrevezető tartalmat mutat, ez rontja a professzionális benyomást és a SEO relevanciát.
- **Javasolt lépések:**
  1. Döntsd el, hogy a route milyen tartalmat szolgáljon ki (pl. dinamikus blog import a blogocska.hu-ról, vagy esettanulmány-sablon).
  2. Ha blogbejegyzés lenne, alakíts ki slug alapú fetch-t (RSS -> cache -> render). Ha esettanulmány, akkor kapcsolódjon a központosított adatforráshoz.
  3. Gondoskodj arról, hogy a metadata (`buildMetadata`) a valós tartalomra utaljon a jobb SEO érdekében.

## 4. Strukturált adatok (Schema.org) felvétele
- **Megfigyelés:** A `lib/seo.js` megfelelő címleírásokat szolgáltat, de JSON-LD alapú strukturált adatok nincsenek beállítva az oldalakon.【F:lib/seo.js†L1-L107】
- **Miért fontos:** A strukturált adatok segítenek a keresőmotoroknak megérteni a szolgáltatás kínálatát (pl. `ProfessionalService`, `Service`, `FAQ`). Ez növelheti a rich snippet megjelenés esélyét.
- **Javasolt lépések:**
  1. Bővítsd a `buildMetadata` függvényt vagy a layoutokat úgy, hogy JSON-LD scriptet injektáljon (például `Organization` + `Service` sémákkal).
  2. A dinamikus oldalakhoz (esettanulmányok, szolgáltatások) generálj egyedi `Service` objektumot.
  3. Validáld a Google Rich Results Test eszközzel a bevezetés után.

---

Ezek az ötletek azonnali értéket adhatnak a felhasználói élmény, a lead generálás és a keresőoptimalizálás terén. Ha valamelyik prioritást élvez, szívesen segítek a megvalósítási terv részleteinek kidolgozásában is.
