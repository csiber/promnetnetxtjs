import VpsHostingClient from "./VpsHostingClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("/dashboard/vpshosting");

export default function VpsHostingPage() {
  return <VpsHostingClient />;
}
