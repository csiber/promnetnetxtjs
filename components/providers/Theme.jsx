"use client";

import { ThemeProvider } from "next-themes";

function Theming({ children }) {
  return (
    <ThemeProvider enableSystem attribute="class" defaultTheme="system">
      {children}
    </ThemeProvider>
  );
}
export default Theming;
