# Landing Page Redesign — Sidebar eltavolitasa

## Context

A jelenlegi ketoszlopos layout (Left sidebar + Right content) Cloudflare Pages-en nem mukodik megbizhatoan. A megoldas: egyoszlopos landing page, sidebar nelkul.

## Dontes

- **Layout:** Egyoszlopos landing page, nincs sidebar
- **Lead form:** Kidobjuk — mailto + telefon/email eleg
- **Profil info:** Foto + nev a Studio szekcioban, vallalkozasi adatok a footerbe
- **Megkozelites:** Minimalista — a munka beszel

## Szekciok sorrendje

1. **Nav** — Fix nav felul: PromNET logo + szekciio linkek (Szolgaltatasok, Miert PromNET, Referenciak, Kapcsolat) + "Projekt inditasa" mailto CTA gomb
2. **Hero** — Nagy cimsor + leiras + CTA gombok + statisztikak (10+ ev, 30+ projekt, 10+ elo rendszer) + terminal vizual
3. **Ticker** — Stack technologiak futo savja
4. **Szolgaltatasok** — 3 szolgaltatas (Backend infra, Integraciok, DevOps)
5. **Studio** — "Komoly mernoki fokusz, kis csapat" — foto, nev, role, stack badges, minosites
6. **Miert PromNET** — Trust pontok (10+ ev, valos rendszerek, stb.)
7. **Referenciak** — Portfolio grid szurokkel (elo/archiv)
8. **Folyamat** — 4 lepes grid (Igeny, Architektura, Fejlesztes, Uzemeltetes)
9. **CTA** — "Van egy rendszerotleted?" blokk mailto linkkel
10. **Kapcsolat** — Email + telefon + cim (nincs form)
11. **Footer** — Vallalkozasi adatok (cegnev, adoszam, nyilvantartasi szam), copyright

## Torlendo fajlok / komponensek

- `app/dashboard/Left/page.jsx` — teljes Left sidebar komponens
- `app/dashboard/layout.jsx` — ketoszlopos layout (uj egyoszlopos valtja)
- `app/dashboard/page.jsx` — kozvetitio oldal (egyszerusodik)
- `app/HomePage/page.jsx` — atalakul a fo landing page-ge
- `app/api/leads/route.js` — lead form API (nem kell)

## Megmarado fajlok (valtozatlanul)

- `data/portfolio-projects.js` — portfolio adatok
- `data/services.js` — szolgaltatas adatok
- `components/layout/SiteFooter.jsx` — bovitjuk vallalkozasi adatokkal
- `app/layout.js` — root layout (valtozatlan)
- `app/globals.css` — CSS (valtozatlan, pn-* osztalyok maradnak)
- `lib/analytics.js` — analytics (valtozatlan)

## Architektura

```
app/
  layout.js          — root layout (valtozatlan)
  page.js            — redirect /dashboard-ra (valtozatlan)
  globals.css        — CSS (valtozatlan)
  dashboard/
    layout.jsx       — UJ: egyoszlopos layout (max-width wrapper, nincs sidebar)
    page.jsx         — UJ: kozvetlenul rendereli a HomePage-t
  HomePage/
    page.jsx         — MODOSITOTT: lead form es sidebar-fuggo reszek eltavolitva,
                       minosites beolvasztva Studio szekciooba
components/
  layout/
    SiteFooter.jsx   — MODOSITOTT: vallalkozasi adatok hozzaadva
```

## Reszletes valtozasok

### `app/dashboard/layout.jsx`
- Ketoszlopos flex layout -> egyoszlopos wrapper
- Left import torlese
- Gyerek elemek kozvetlenul renderelodnek

### `app/HomePage/page.jsx`
- Minosites blokk beolvasztasa a Studio szekciooba
- Lead form hivatkozasok eltavolitasa
- Kapcsolat szekcio: form helyett email/telefon/cim linkek

### `components/layout/SiteFooter.jsx`
- Vallalkozasi adatok hozzaadasa: cegnev, cim, adoszam, nyilvantartasi szam

### `app/dashboard/Left/page.jsx`
- TORLES

### `app/api/leads/route.js`
- TORLES

## Verifikacio

1. `npm run dev` — lokalis dev szerver inditasa
2. Bongeszoben ellenorizni: `/dashboard` betolt, minden szekciio renderelodik
3. Mobil nezet tesztelese (Chrome DevTools responsive mode)
4. `npx @cloudflare/next-on-pages` — CF Pages build sikeressege
5. Aloldalak tesztelese: `/dashboard/webhosting`, `/dashboard/serverhosting` stb.
