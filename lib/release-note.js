import packageJson from "../package.json";

export const currentRelease = {
  version: packageJson.version,
  date: "2024-09-25",
  highlights: [
    "Új kártyakomponens szolgáltatás és esettanulmány blokkokhoz",
    "Consent alapú, anonim analitika és frissített biztonsági beállítások",
    "Light/Dark automatikus téma és hozzáférhető fókuszjelölések",
  ],
};
