import RadioServerHostingClient from "./RadioServerHostingClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("/dashboard/radioserverhosting");

export default function RadioServerHostingPage() {
  return <RadioServerHostingClient />;
}
