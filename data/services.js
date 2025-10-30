import { baseUrl } from "@/lib/seo";

const provider = {
  "@type": ["LocalBusiness", "ProfessionalService"],
  name: "PromNET - Polyák Csaba E.V.",
  url: baseUrl,
  telephone: "+36 20 549 4107",
  email: "info@promnet.hu",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kölcsey Ferenc út 11.",
    addressLocality: "Kállósemjén",
    postalCode: "4324",
    addressCountry: "HU",
  },
};

const areaServed = {
  "@type": "Country",
  name: "Magyarország",
};

const createServiceSchema = ({ name, description, serviceType, path, priceRange }) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  serviceType,
  provider,
  areaServed,
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: `${baseUrl}${path}`,
    availableLanguage: ["hu"],
  },
  offers: priceRange
    ? {
        "@type": "AggregateOffer",
        priceCurrency: "HUF",
        lowPrice: priceRange.low,
        highPrice: priceRange.high,
        availability: "https://schema.org/InStock",
      }
    : undefined,
  url: `${baseUrl}${path}`,
});

export const serviceSchemas = {
  "/dashboard/webdev": createServiceSchema({
    name: "Webfejlesztés és UX",
    description:
      "Reszponzív weboldalak és webshopok tervezése, fejlesztése, mérési csomagokkal és folyamatos támogatással magyar vállalkozások számára.",
    serviceType: ["Webfejlesztés", "UX tervezés", "E-kereskedelem"],
    path: "/dashboard/webdev",
    priceRange: { low: "249000", high: "800000" },
  }),
  "/dashboard/service": createServiceSchema({
    name: "Elektronikai szerviz",
    description:
      "Notebook, PC és hálózati eszköz javítás, helyszíni kiszállással, gyors diagnosztikával és vállalkozásokra szabott karbantartási csomagokkal.",
    serviceType: ["Elektronikai szerviz", "Számítógép javítás", "Hálózati támogatás"],
    path: "/dashboard/service",
  }),
  "/dashboard/hostingbuilder": createServiceSchema({
    name: "Hosting kiépítés és DevOps",
    description:
      "Felhős infrastruktúra tervezés, CI/CD pipeline-ok, monitorozás és üzemeltetési folyamatok kialakítása biztonságos alapokon.",
    serviceType: ["DevOps", "Infrastruktúra tervezés", "Cloud hosting"],
    path: "/dashboard/hostingbuilder",
  }),
  "/dashboard/webhosting": createServiceSchema({
    name: "Menedszelt webhosting",
    description:
      "Gyors és biztonságos webhosting csomagok SSL-lel, napi mentésekkel, Cloudflare optimalizálással és magyar támogatással.",
    serviceType: ["Webhosting", "Tárhely szolgáltatás"],
    path: "/dashboard/webhosting",
    priceRange: { low: "6900", high: "18900" },
  }),
  "/dashboard/vpshosting": createServiceSchema({
    name: "VPS hosting",
    description:
      "Skálázható virtuális szerverek erős hálózati kapcsolattal, container orchestrationnel és dedikált monitorozással.",
    serviceType: ["VPS", "Infrastructure as a Service"],
    path: "/dashboard/vpshosting",
    priceRange: { low: "18900", high: "54900" },
  }),
  "/dashboard/serverhosting": createServiceSchema({
    name: "Dedikált szerver üzemeltetés",
    description:
      "Egyedi szerverek felügyelete, karbantartása és magas rendelkezésre állás biztosítása SLA-val és proaktív monitorozással.",
    serviceType: ["Dedikált szerver", "IT üzemeltetés"],
    path: "/dashboard/serverhosting",
  }),
  "/dashboard/radioserverhosting": createServiceSchema({
    name: "Rádiószerver hosting",
    description:
      "Online rádiók számára optimalizált streaming infrastruktúra sávszélesség-gazdálkodással, hallgatottsági statisztikákkal és SLA-val.",
    serviceType: ["Streaming hosting", "Rádiószerver"],
    path: "/dashboard/radioserverhosting",
  }),
  "/dashboard/gamehosting": createServiceSchema({
    name: "Játékszerver hosting",
    description:
      "Alacsony késleltetésű, DDoS-védett játékszerverek automatikus frissítésekkel és közösségi admin eszközökkel.",
    serviceType: ["Játékszerver", "Game hosting"],
    path: "/dashboard/gamehosting",
  }),
  "/dashboard/mailhosting": createServiceSchema({
    name: "Üzleti levelezés",
    description:
      "Professzionális levelezés spamszűréssel, archiválással, többfaktoros védelemmel és Outlook/Thunderbird integrációval.",
    serviceType: ["E-mail hosting", "Vállalati levelezés"],
    path: "/dashboard/mailhosting",
  }),
  "/dashboard/emailhosting": createServiceSchema({
    name: "E-mail tárhely kisvállalkozásoknak",
    description:
      "Megbízható e-mail fiókok kis cégeknek, migrációs támogatással, alias kezeléssel és dedikált supporttal.",
    serviceType: ["E-mail tárhely", "Üzleti levelezés"],
    path: "/dashboard/emailhosting",
  }),
};

export function getServiceSchema(path) {
  return serviceSchemas[path] ?? null;
}
