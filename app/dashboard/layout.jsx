import View from "@/app/ui/dashboard/View/page";
import Left from "@/app/dashboard/Left/page";
import Theming from "@/components/providers/Theme";
export default function RootLayout({ children }) {
  return (
    <html lang="hu">
      <title>PromNET - Polyák Csaba E.V.</title>
        <meta name="description" content="Weboldal fejlesztés gyorsan, olcsón!" />
        <meta property="og:title" content="PromNET - Polyák Csaba E.V." />
        <meta property="og:description" content="Weboldal fejlesztés gyorsan, olcsón!" />
        <meta property="og:image" content="/logo-whiute.png" />
        <meta property="og:url" content="https://www.promnet.hu" />
        <meta name="twitter:card" content="summary_large_image" />
      <body className="">
        <Theming>
          <div className="max-w-[78rem] mx-auto ">
            <div className=" gap-4 flex md:mt-5    flex-col md:flex-row  ">
              <Left />
              {children}
              <View />
            </div>
          </div>
        </Theming>
      </body>
    </html>
  );
}
