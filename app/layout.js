import "./globals.css";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { ConsentProvider } from "@/components/providers/ConsentProvider";
import AnalyticsGate from "@/components/providers/AnalyticsGate";
import ConsentBanner from "@/components/consent/ConsentBanner";
import SiteFooter from "@/components/layout/SiteFooter";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { baseUrl, siteMetadata } from "@/lib/seo";
import ConsoleArt from "@/components/ui/ConsoleArt";

export const runtime = "edge";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-sg",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jb",
  weight: ["400", "500"],
});

const structuredData = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  name: "PromNET - Polyák Csaba E.V.",
  image: `${baseUrl}/logo-white.png`,
  url: baseUrl,
  telephone: "+36 20 549 4107",
  email: "info@promnet.hu",
  description:
    "Backend fejlesztés, infrastruktúra és integrációk. Mellékág: 3D/animáció és elektronikai szerviz.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kölcsey Ferenc út 11.",
    addressLocality: "Kállósemjén",
    postalCode: "4324",
    addressCountry: "HU",
  },
  sameAs: [
    baseUrl,
    "https://github.com/promnet",
    "https://www.linkedin.com/in/csaba-polyak-3497b0133/",
  ],
  areaServed: { "@type": "AdministrativeArea", name: "Magyarország" },
  serviceType: ["Backend fejlesztés", "Infrastruktúra", "Integrációk", "DevOps"],
};

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: { default: siteMetadata.title, template: "%s | PromNET" },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: baseUrl,
    siteName: "PromNET",
    locale: "hu_HU",
    type: "website",
    images: [{ url: `${baseUrl}/logo-white.png`, width: 1200, height: 630, alt: "PromNET logó" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [`${baseUrl}/logo-white.png`],
  },
  alternates: { canonical: baseUrl },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }], apple: "/favicon.svg" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

export default function RootLayout({ children }) {
  const isVercel =
    process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ||
    process.env.NEXT_PUBLIC_VERCEL_ENV === "preview";

  return (
    <html lang="hu" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} min-h-screen`}>
        <ConsentProvider>
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <ConsentBanner />
          {isVercel ? (
            <AnalyticsGate>
              <Analytics />
              <SpeedInsights />
            </AnalyticsGate>
          ) : null}
          <ConsoleArt />
        </ConsentProvider>
      </body>
    </html>
  );
}
