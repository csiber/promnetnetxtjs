# Landing Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A `/dashboard` ketoszlopos layout (Left sidebar + content) leszerelese, helyette egyoszlopos landing page. A lead form es a kapcsolodo API kidobasra kerul, profil/vallalkozasi info atrendezve.

**Architecture:** A `app/dashboard/layout.jsx` egyoszlopos wrapper-re egyszerusodik (nincs Left import). Az `app/dashboard/Left/page.jsx` es az `app/api/leads/route.js` torlesre kerul. Az `app/HomePage/page.jsx` megkapja a Studio szekcioba a minositesi blokkot. A `components/layout/SiteFooter.jsx` kiegeszul vallalkozasi adatokkal. A `ServiceClient.jsx`-ben a `#lead-form` link `mailto:`-ra cserelodik.

**Tech Stack:** Next.js 14 (app router), React, Tailwind CSS, custom `pn-*` CSS osztalyok, `next/image`, `next/link`. Cloudflare Pages target via `@cloudflare/next-on-pages`.

---

## Erintett fajlok

- **Modositas:** `app/dashboard/layout.jsx` — egyoszlopos wrapper, Left import torolve
- **Torles:** `app/dashboard/Left/page.jsx` — teljes sidebar komponens
- **Torles:** `app/api/leads/route.js` — lead form API endpoint
- **Modositas:** `app/HomePage/page.jsx` — minosites blokk a Studio szekciooba
- **Modositas:** `components/layout/SiteFooter.jsx` — vallalkozasi adatok hozzaadasa
- **Modositas:** `app/dashboard/service/ServiceClient.jsx` — `#lead-form` link csere `mailto:`-ra
- **Modositas:** `lib/analytics.js` — (opcionalis) `trackLeadSubmission` torlese, mert sehol nem hasznaljuk tobbe

---

### Task 1: Lead form API torlese

**Files:**
- Delete: `app/api/leads/route.js`

- [ ] **Step 1: Erositsd meg, hogy mas nem hivatkozik az endpointra**

Run: `grep -r "/api/leads" app components lib data 2>/dev/null` (Windows: hasznalj Grep tool-t)

Expected: csak `app/dashboard/Left/page.jsx:317` (ami torlesre kerul a Task 2-ben)

- [ ] **Step 2: Toröld a route fajlt**

```bash
rm app/api/leads/route.js
```

A `app/api/leads/` mappa is uressere kerul — ha mas fajl nincs benne, toröld a mappat is:

```bash
rmdir app/api/leads
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove unused leads API route"
```

---

### Task 2: Left sidebar komponens torlese

**Files:**
- Delete: `app/dashboard/Left/page.jsx`

- [ ] **Step 1: Toröld a Left page fajlt**

```bash
rm app/dashboard/Left/page.jsx
rmdir app/dashboard/Left
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "chore: remove dashboard Left sidebar component"
```

---

### Task 3: Dashboard layout egyoszlopossa alakitasa

**Files:**
- Modify: `app/dashboard/layout.jsx`

- [ ] **Step 1: Cseréld le a layout teljes tartalmat**

A teljes fajlt a kovetkezore cserelni:

```jsx
export default function DashboardLayout({ children }) {
  return (
    <div className="mx-auto w-full max-w-[78rem]">
      {children}
    </div>
  );
}
```

A `Left` import torolve, a flex/sidebar wrapper torolve, csak a max-width container marad.

- [ ] **Step 2: Inditsd el a dev szervert es ellenorizd**

Run: `npm run dev`

Nyisd meg `http://localhost:3000/dashboard` — a sidebar nem latszik, a HomePage tartalom rendere­lodik teljes szelessegben.

Allitsd le a dev szervert (Ctrl+C).

- [ ] **Step 3: Commit**

```bash
git add app/dashboard/layout.jsx
git commit -m "refactor: simplify dashboard layout to single column"
```

---

### Task 4: HomePage frissitese (minosites + vallalkozasi infok eltavolitasa)

**Files:**
- Modify: `app/HomePage/page.jsx`

A jelenlegi HomePage mar lenyegeben landing page szerkezetu — csak a Studio szekciot kell kibovteni a Left sidebarbol atszarmazo "Minositesek" blokkal. A vallalkozasi adatok footerbe kerulnek (Task 5).

- [ ] **Step 1: A Studio szekcio (`pn-sec-alt` blokkban a `pn-about-card` utan) bovitsd ki a minosites listaval**

Az `app/HomePage/page.jsx`-ben keresd meg ezt a sort (~244):

```jsx
              <div className="flex flex-wrap gap-2">
                {STACK.map((s) => <span key={s} className="pn-tag">{s}</span>)}
              </div>
            </div>
```

A `</div>` (a `pn-about-card` zarasa) ELOTT szurd be a kovetkezot:

```jsx
              <div style={{ marginTop: "1.25rem", paddingTop: "1.25rem", borderTop: "1px solid var(--border)" }}>
                <span className="pn-lbl" style={{ display: "block", marginBottom: ".75rem" }}>
                  Minositesek
                </span>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: ".5rem", fontSize: ".8125rem", color: "var(--muted)" }}>
                  <li>Google Analytics 4 &amp; Tag Manager — 2024-es tanusitvany</li>
                  <li>Cloudflare Solution Partner (performance &amp; security)</li>
                  <li>Resend Transactional Email szakerto</li>
                </ul>
              </div>
```

Igy a `pn-about-card` belso szerkezete: foto + nev + bio + stack badges + minositesek (uj).

- [ ] **Step 2: Inditsd el a dev szervert es ellenorizd**

Run: `npm run dev`

Nyisd meg `http://localhost:3000/dashboard` — a Studio szekcio profil kartyaja most tartalmazza a minosites listat is.

Allitsd le a dev szervert.

- [ ] **Step 3: Commit**

```bash
git add app/HomePage/page.jsx
git commit -m "feat: add certifications block to studio section"
```

---

### Task 5: SiteFooter bovitese vallalkozasi adatokkal

**Files:**
- Modify: `components/layout/SiteFooter.jsx`

A footerben jelenleg verzio naplo + kapcsolat van. Adunk hozza egy "Vallalkozas adatai" oszlopot.

- [ ] **Step 1: Frissitsd a SiteFooter teljes tartalmat**

Cseréld a `components/layout/SiteFooter.jsx` teljes tartalmat erre:

```jsx
import Link from "next/link";
import { currentRelease } from "@/lib/release-note";

const contactLinks = [
  { href: "mailto:info@promnet.hu", label: "info@promnet.hu" },
  { href: "tel:+36205494107", label: "+36 20 549 4107" },
  { href: "https://www.linkedin.com/in/csaba-polyak-3497b0133/", label: "LinkedIn", external: true },
];

const businessDetails = [
  { label: "Cegnev", value: "Polyak Csaba E.V." },
  { label: "Cim", value: "4324 Kallosemjen, Kolcsey Ferenc ut 11." },
  { label: "Adoszam", value: "68747961-1-35" },
  { label: "Nyilvantartasi szam", value: "52193909" },
];

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border/70 bg-card/60 backdrop-blur">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-12 md:grid-cols-3">
        <section aria-label="Legfrissebb kiadas" className="space-y-4">
          <div className="promnet-badge w-fit">Verzio naplo</div>
          <h2 className="text-lg font-semibold text-foreground">
            PromNET v{currentRelease.version} – {currentRelease.date}
          </h2>
          <ul className="space-y-2 text-sm text-muted">
            {currentRelease.highlights.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span aria-hidden className="mt-1 inline-flex h-2 w-2 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
        <section aria-label="Kapcsolat" className="space-y-3 text-sm text-muted">
          <h2 className="text-lg font-semibold text-foreground">Kapcsolat</h2>
          <ul className="space-y-2">
            {contactLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-medium text-foreground hover:text-accent"
                  {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section aria-label="Vallalkozas adatai" className="space-y-3 text-sm text-muted">
          <h2 className="text-lg font-semibold text-foreground">Vallalkozas adatai</h2>
          <dl className="space-y-2">
            {businessDetails.map((item) => (
              <div key={item.label} className="flex flex-col">
                <dt className="text-xs uppercase tracking-wide text-muted/80">{item.label}</dt>
                <dd className="font-medium text-foreground">{item.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
      <div className="mx-auto w-full max-w-6xl px-6 pb-8">
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} PromNET – Polyak Csaba e.v. Minden jog fenntartva.
        </p>
      </div>
    </footer>
  );
}
```

Valtozasok:
- A `flex-col md:flex-row md:justify-between` -> `grid md:grid-cols-3` lett (3 oszlop md+ szelessegen)
- Uj harmadik oszlop: vallalkozas adatok (`businessDetails` lista)
- A copyright sor lekerult a grid alatti kulon sorba

- [ ] **Step 2: Ellenorizd a footert**

Run: `npm run dev`

Nyisd meg `http://localhost:3000/dashboard` es gorgess le — a footer harom oszloposan latszik desktop nezetben (verzio naplo, kapcsolat, vallalkozas adatok).

Allitsd le a dev szervert.

- [ ] **Step 3: Commit**

```bash
git add components/layout/SiteFooter.jsx
git commit -m "feat: add business details column to site footer"
```

---

### Task 6: ServiceClient #lead-form hivatkozas javitasa

**Files:**
- Modify: `app/dashboard/service/ServiceClient.jsx:463`

A jelenlegi link a torolt `#lead-form` anchorra mutat. Cseréld `mailto:`-ra.

- [ ] **Step 1: Cseréld a 462-468 sorok kozotti Link-et**

Az `app/dashboard/service/ServiceClient.jsx` 462-468 sorok kozotti Link blokkot:

```jsx
                <Link
                  href="#lead-form"
                  className="inline-flex items-center justify-center rounded-full border border-accent/40 px-5 py-2 font-RubikMedium text-foreground transition hover:-translate-y-0.5 hover:border-white/10"
                  onClick={() => trackCtaClick("service-lead", { service: "it-service" })}
                >
                  Üzenet küldése
                </Link>
```

Cseréld erre:

```jsx
                <Link
                  href="mailto:info@promnet.hu"
                  className="inline-flex items-center justify-center rounded-full border border-accent/40 px-5 py-2 font-RubikMedium text-foreground transition hover:-translate-y-0.5 hover:border-white/10"
                  onClick={() => trackCtaClick("service-lead", { service: "it-service" })}
                >
                  Üzenet küldése
                </Link>
```

Csak a `href` valtozott `#lead-form` -> `mailto:info@promnet.hu`. A tobbi (className, onClick, szoveg) marad.

- [ ] **Step 2: Ellenorizd**

Run: `npm run dev`

Nyisd meg `http://localhost:3000/dashboard/service` — az "Üzenet küldése" gomb most a mailto-ra mutat (kattintaskor email kliens nyilik).

Allitsd le a dev szervert.

- [ ] **Step 3: Commit**

```bash
git add app/dashboard/service/ServiceClient.jsx
git commit -m "fix: replace lead-form anchor with mailto in service page"
```

---

### Task 7: Hasznalatlan analytics fuggveny torlese

**Files:**
- Modify: `lib/analytics.js`

A `trackLeadSubmission` fuggvenyt csak a Left sidebar hasznalta, ami torlesre kerult.

- [ ] **Step 1: Erositsd meg, hogy nincs tobb hasznalat**

Run: Grep tool keresd `trackLeadSubmission`-re a teljes projektben.

Expected: csak `lib/analytics.js` (a definiicio).

- [ ] **Step 2: Toröld a `trackLeadSubmission` exportot**

Olvasd be a `lib/analytics.js` fajlt, keresd meg a `trackLeadSubmission` definiciot (kb. 19. sortol), es toröld azt + a hozza tartozo doc/jsdoc commentet, ha van.

A pelda alakok (a tenyleges fajlbol kell vagni):

```js
export const trackLeadSubmission = (status, extra = {}) => {
  // ...
};
```

Ezt a teljes blokkot toröld.

- [ ] **Step 3: Commit**

```bash
git add lib/analytics.js
git commit -m "chore: drop unused trackLeadSubmission analytics helper"
```

---

### Task 8: Verifikacio — dev szerver es build

**Files:** —

- [ ] **Step 1: Dev szerver es manualis tesztek**

Run: `npm run dev`

Ellenorizd a kovetkezo URL-eket bongesonben:
- `http://localhost:3000/` — root redirect mukodik
- `http://localhost:3000/dashboard` — landing page sidebar nelkul, minden szekciio renderelodik
- `http://localhost:3000/dashboard/service` — service oldal, gomb mailto-ra mutat
- `http://localhost:3000/dashboard/portfolio` — portfolio oldal mukodik
- `http://localhost:3000/dashboard/webhosting` — aloldal mukodik
- `http://localhost:3000/dashboard/serverhosting` — aloldal mukodik

Mobil nezet (Chrome DevTools responsive mode, 375px szelesseg) — sehol nincs vizszintes scroll, footer szepen 1 oszloppa rendeződik.

Allitsd le a dev szervert.

- [ ] **Step 2: Production build**

Run: `npm run build`

Expected: a build hiba nelkul lefut. Nincs `Module not found` a `Left` vagy `/api/leads` miatt.

- [ ] **Step 3: Cloudflare Pages build**

Run: `npx @cloudflare/next-on-pages` (ha telepitve van)

Expected: a build hiba nelkul lefut.

Ha nincs telepitve es nem akarjuk csak ezert telepiteni, ezt a step-et hagyd ki es jegyezd fel, hogy a kovetkezo CF Pages deployon kell tesztelni.

- [ ] **Step 4: Vegso commit (ha barmi maradt)**

```bash
git status
```

Ha tiszta, kesz vagyunk. Ha valami modositas maradt (pl. lock fajl), nezd meg miert es commitold:

```bash
git add -A
git commit -m "chore: finalize landing page redesign"
```
