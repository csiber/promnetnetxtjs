import GameHostingClient from "./GameHostingClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("/dashboard/gamehosting");

export default function GameHostingPage() {
  return <GameHostingClient />;
}
