"use client";

import { useEffect } from "react";

const PROMNET_ART = [
  "      ██████████      ",
  "    ██████████████    ",
  "   ████      ████     ",
  "  ███  ████  ████     ",
  "  ███ █████ ████      ",
  " ███ █████ ██████     ",
  " ███ █████ ██████     ",
  " ███ █████ ██████     ",
  " ███ █████ ██████     ",
  "  ███ █████ ████      ",
  "  ███  ████  ████     ",
  "   ████      ████     ",
  "    ██████████████    ",
  "      ██████████      ",
  "        ██████        ",
  "       ████████       ",
];

export default function ConsoleArt() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const art = PROMNET_ART.join("\n");
    const style =
      "color:#38bdf8;font-weight:600;font-size:12px;line-height:12px;font-family:monospace;";
    // eslint-disable-next-line no-console
    console.log("%cPROMNET console\n%c" + art, "color:#38bdf8;", style);
  }, []);

  return null;
}
