# PromNET — Next.js Export

Ez a mappa tartalmazza az újratervezett PromNET oldal Next.js fájljait.

## Fájlok és célhelyek

| Fájl | Másolás ide |
|------|-------------|
| `app/globals.css` | `app/globals.css` |
| `app/layout.js` | `app/layout.js` |
| `app/HomePage/page.jsx` | `app/HomePage/page.jsx` |
| `components/SiteFooter.jsx` | `components/layout/SiteFooter.jsx` |

## Telepítés

```bash
# 1. Másold a fájlokat a Next.js projektbe
cp app/globals.css    /path/to/promnetnetxtjs/app/globals.css
cp app/layout.js      /path/to/promnetnetxtjs/app/layout.js
cp app/HomePage/page.jsx /path/to/promnetnetxtjs/app/HomePage/page.jsx
cp components/SiteFooter.jsx /path/to/promnetnetxtjs/components/layout/SiteFooter.jsx

# 2. Törölt dependencia: Rubik font (nem kell többé)
# Hozzáadott fontok: Space Grotesk + JetBrains Mono (next/font/google — nincs extra install)

# 3. Push
git add .
git commit -m "redesign: industrial editorial dark theme"
git push
```

## Mi változott?

- **Betűtípus:** Rubik → Space Grotesk + JetBrains Mono
- **Design:** Glassmorphism/glow → flat industrial editorial
- **Szín:** Sky blue → Amber (#E8A838) akcentszín
- **Layout:** Cyber grid eltávolítva, tiszta border-alapú rács
- **CSS:** Tailwind megtartva + egyedi `pn-*` prefix osztályok
- **Theme.jsx:** Eltávolítva a layoutból (dark-only dizájn)
