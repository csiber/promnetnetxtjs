import ServiceClient from "./ServiceClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("/dashboard/service");

export default function ServicePage() {
  return <ServiceClient />;
}
