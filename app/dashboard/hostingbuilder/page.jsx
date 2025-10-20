import HostingBuilderClient from "./HostingBuilderClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("/dashboard/hostingbuilder");

export default function HostingBuilderPage() {
  return <HostingBuilderClient />;
}
