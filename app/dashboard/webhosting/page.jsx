import WebHostingClient from "./WebHostingClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("/dashboard/webhosting");

export default function WebHostingPage() {
  return <WebHostingClient />;
}
