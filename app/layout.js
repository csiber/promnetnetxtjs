import "./globals.css";
import Theming from "@/components/providers/Theme";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const runtime = "edge";

const structuredData = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  name: "PromNET - Polyák Csaba E.V.",
  image: "https://www.promnet.hu/logo-white.png",
  url: "https://www.promnet.hu",
  telephone: "+36 20 549 4107",
  email: "info@promnet.hu",
  description:
    "Full stack webfejlesztés, digitális termék- és infrastruktúra fejlesztés magyar vállalkozásoknak.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kölcsey Ferenc út 11.",
    addressLocality: "Kállósemjén",
    postalCode: "4324",
    addressCountry: "HU",
  },
  sameAs: [
    "https://www.promnet.hu",
    "https://github.com/promnet",
    "https://www.linkedin.com/in/csaba-polyak-3497b0133/",
  ],
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Magyarország",
  },
  serviceType: [
    "Weboldal fejlesztés",
    "Webáruház készítés",
    "Rendszergazdai szolgáltatás",
    "Elektronikai szerviz",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="hu">
      <head>
        <title>PromNET - Polyák Csaba webfejlesztés és üzemeltetés</title>
        <meta
          name="description"
          content="Polyák Csaba (PromNET) egyedi weboldalakat, hosting megoldásokat és informatikai szerviz szolgáltatásokat kínál magyar vállalkozásoknak."
        />
        <meta property="og:title" content="PromNET - Polyák Csaba" />
        <meta
          property="og:description"
          content="Professzionális webfejlesztés, digitális termék- és üzemeltetési szolgáltatások KKV-knak és alkotóknak Magyarországon."
        />
        <meta property="og:image" content="/logo-white.png" />
        <meta property="og:url" content="https://www.promnet.hu" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://www.promnet.hu" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-[#171717]">
        <Theming>{children}</Theming>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
