export const caseStudies = [
  {
    slug: "creatify",
    client: "Creatify",
    industry: "Digitális tartalom értékesítés",
    summary:
      "6 hetes redesign és webshop-optimalizáció után a Creatify konverziós rátája 32%-kal nőtt, miközben a support terhelése 27%-kal csökkent.",
    metrics: [
      { label: "Konverzió", value: "+32%" },
      { label: "Átlagos kosárérték", value: "+18%" },
      { label: "Ügyfélszolgálati ticket", value: "-27%" },
    ],
    overview: {
      title: "Creatify digitális platform",
      summary:
        "Funkcionális redesign, kampány landingek és mérési stratégia, amely 32%-os konverziónövekedést eredményezett 6 hét alatt.",
      tags: ["Webshop", "UX", "Automatizáció"],
    },
  },
  {
    slug: "promark",
    client: "PromARK",
    industry: "Játékos közösség",
    summary:
      "Teljes infrastruktúra-átállás és egyedi modulok bevezetése 41%-kal növelte az aktív tagok számát három hónap alatt.",
    metrics: [
      { label: "Aktív tagok", value: "+41%" },
      { label: "Oldalon töltött idő", value: "+22%" },
      { label: "Szerver leállások", value: "-80%" },
    ],
    overview: {
      title: "PromARK közösségi infrastruktúra",
      summary:
        "Dedikált szerverpark, egyedi közösségi modulok és automatikus skálázás, 41%-kal több aktív taggal három hónapon belül.",
      tags: ["Infra", "Next.js", "Közösség"],
    },
  },
];

export function getCaseStudyBySlug(slug) {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug) ?? null;
}
