import ServerHostingClient from "./ServerHostingClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("/dashboard/serverhosting");

export default function ServerHostingPage() {
  return <ServerHostingClient />;
}
