"use client";

import { ThemeProvider } from "next-themes";

function Theming({ children }) {
  return (
    <ThemeProvider enableSystem attribute="class">
      {children}
    </ThemeProvider>
  );
}
export default Theming;
