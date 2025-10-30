import GameHostingClient from "./GameHostingClient";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { getServiceSchema } from "@/data/services";

export const metadata = buildMetadata("/dashboard/gamehosting");

export default function GameHostingPage() {
  const schema = getServiceSchema("/dashboard/gamehosting");
  return (
    <>
      <JsonLd data={schema} />
      <GameHostingClient />
    </>
  );
}
