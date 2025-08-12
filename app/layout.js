import "./globals.css";
import Theming from "@/components/providers/Theme";

export const runtime = "edge";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>PromNET - Csaba Polyak</title>
        <meta
          name="description"
          content="Website development quickly and affordably!"
        />
        <meta property="og:title" content="PromNET - Csaba Polyak" />
        <meta
          property="og:description"
          content="Website development quickly and affordably!"
        />
        <meta property="og:image" content="/logo-white.png" />
        <meta property="og:url" content="https://www.promnet.hu" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body className="bg-[#171717]">
        <Theming>{children}</Theming>
      </body>
    </html>
  );
}
