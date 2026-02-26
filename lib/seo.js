const baseUrl = "https://www.promnet.hu";

export const siteMetadata = {
  title: "PromNET – Backend és infrastruktúra",
  description:
    "PromNET – Polyák Csaba: backend fejlesztés, infrastruktúra és integrációk. Mellékág: 3D/animáció és elektronikai szerviz.",
  keywords: [
    "backend fejlesztés",
    "infrastruktúra",
    "integrációk",
    "devops",
    "cloud",
    "promnet",
    "Polyák Csaba",
  ],
};

export const pageMetadata = {
  "/": {
    title: "PromNET – Backend és infrastruktúra",
    description:
      "Backend fejlesztés, infrastruktúra és integrációk. Mellékág: 3D/animáció és elektronikai szerviz.",
    changeFrequency: "weekly",
    priority: 1,
  },
  "/dashboard": {
    title: "PromNET irányítópult",
    description:
      "Áttekintés a backend, infrastruktúra és integrációs fókuszú szolgáltatásokról, esettanulmányokról és portfólióról.",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  "/dashboard/webdev": {
    title: "Játék, animáció és 3D (mellékág) – PromNET",
    description:
      "Játék- és animációkészítés, 3D grafika, 3D modellezés és 3D nyomtatás mellékágként. Webes munkát csak backendhez kapcsolódva vállalok.",
  },
  "/dashboard/service": {
    title: "Elektronikai szerviz – PromNET",
    description:
      "Notebook, PC és hálózati eszközök szakszerű javítása, helyszíni kiszállással és átlátható árazással.",
  },
  "/dashboard/hostingbuilder": {
    title: "Backend infrastruktúra és DevOps – PromNET",
    description:
      "Backend rendszerekhez illesztett infrastruktúra, CI/CD és monitorozás tervezése és bevezetése.",
  },
  "/dashboard/webhosting": {
    title: "Webhosting szolgáltatás – PromNET",
    description:
      "Gyors és biztonságos webhosting csomagok magyar támogatással és dedikált monitorozással.",
  },
  "/dashboard/vpshosting": {
    title: "VPS hosting – PromNET",
    description:
      "Rugalmas VPS megoldások, felügyelettel, biztonsági mentésekkel és optimalizált teljesítménnyel.",
  },
  "/dashboard/serverhosting": {
    title: "Dedikált szerver hosting – PromNET",
    description:
      "Egyedi szerverek üzemeltetése és menedzsmentje, profi felügyelettel és karbantartással.",
  },
  "/dashboard/radioserverhosting": {
    title: "Rádiószerver hosting – PromNET",
    description:
      "Stabil rádiószerver hosting streaming projektekhez, átfogó statisztikákkal és SLA-val.",
  },
  "/dashboard/gamehosting": {
    title: "Játékszerver hosting – PromNET",
    description:
      "Alacsony késleltetésű, skálázható játékszerver hosting gamer közösségeknek.",
  },
  "/dashboard/mailhosting": {
    title: "Üzleti levelezés – PromNET",
    description:
      "Professzionális levelezés spamszűréssel, archiválással és integrációkkal magyar támogatással.",
  },
  "/dashboard/emailhosting": {
    title: "E-mail hosting small business – PromNET",
    description:
      "Megbízható e-mail tárhely kisvállalkozásoknak, biztonságos fiókkezeléssel és migrációval.",
  },
  "/dashboard/portfolio": {
    title: "Portfólió – PromNET",
    description:
      "Aktív és archív projektek bemutatása iparáganként és eredményekkel.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  "/dashboard/case-studies": {
    title: "Esettanulmányok – PromNET",
    description:
      "Részletes esettanulmányok a PromNET által szállított eredményekről és üzleti hatásokról.",
  },
  "/dashboard/case-studies/creatify": {
    title: "Creatify esettanulmány – PromNET",
    description:
      "Hogyan növeltük 32%-kal a Creatify konverzióját célzott UX és mérési fejlesztésekkel.",
  },
  "/dashboard/case-studies/promark": {
    title: "PromARK esettanulmány – PromNET",
    description:
      "Infrastruktúra modernizálás és egyedi modulok 41%-os aktivitásnövekedéssel.",
  },
  "/dashboard/privacy": {
    title: "Adatvédelmi áttekintés – PromNET",
    description:
      "Tájékoztató az analitikai sütikről, adatkezelési gyakorlatról és a hozzájárulás visszavonásáról.",
    changeFrequency: "yearly",
    priority: 0.4,
  },
};

export function buildMetadata(path) {
  const meta = pageMetadata[path];
  if (!meta) {
    return {
      title: siteMetadata.title,
      description: siteMetadata.description,
      alternates: { canonical: `${baseUrl}${path}` },
      openGraph: {
        title: siteMetadata.title,
        description: siteMetadata.description,
        url: `${baseUrl}${path}`,
        siteName: "PromNET",
        images: [
          {
            url: `${baseUrl}/logo-white.png`,
            width: 1200,
            height: 630,
            alt: "PromNET logó",
          },
        ],
        locale: "hu_HU",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: siteMetadata.title,
        description: siteMetadata.description,
        images: [`${baseUrl}/logo-white.png`],
      },
    };
  }

  const pageUrl = `${baseUrl}${path}`;
  return {
    title: meta.title,
    description: meta.description,
    keywords: siteMetadata.keywords,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: pageUrl,
      siteName: "PromNET",
      images: [
        {
          url: `${baseUrl}/logo-white.png`,
          width: 1200,
          height: 630,
          alt: "PromNET logó",
        },
      ],
      locale: "hu_HU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [`${baseUrl}/logo-white.png`],
    },
  };
}

export function sitemapEntries() {
  const today = new Date().toISOString().split("T")[0];
  return Object.entries(pageMetadata).map(([path, meta]) => ({
    url: `${baseUrl}${path}`,
    lastModified: today,
    changeFrequency: meta.changeFrequency ?? "monthly",
    priority: meta.priority ?? 0.7,
  }));
}

export { baseUrl };
