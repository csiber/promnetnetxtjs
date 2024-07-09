import "./globals.css";
import Theming from "@/components/providers/Theme";
import Dashboard from "@/app/dashboard/layout";
import Head from 'next/head';
export const runtime = 'edge';

export default function RootLayout({ children }) {
  return (
    <html lang="hu">
      <Head>
        <title>PromNET - Polyák Csaba E.V.</title>
        <meta name="description" content="Weboldal fejlesztés gyorsan, olcsón!" />
        <meta property="og:title" content="PromNET - Polyák Csaba E.V." />
        <meta property="og:description" content="Weboldal fejlesztés gyorsan, olcsón!" />
        <meta property="og:image" content="/logo-white.png" />
        <meta property="og:url" content="https://www.promnet.hu" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <body className="bg-[#171717]">
        <Theming>
          {/* <Dashboard /> */}
          {children}
        </Theming>
      </body>
    </html>
  );
}
