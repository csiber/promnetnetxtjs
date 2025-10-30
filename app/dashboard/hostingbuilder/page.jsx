import HostingBuilderClient from "./HostingBuilderClient";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { getServiceSchema } from "@/data/services";

export const metadata = buildMetadata("/dashboard/hostingbuilder");

export default function HostingBuilderPage() {
  const schema = getServiceSchema("/dashboard/hostingbuilder");
  return (
    <>
      <JsonLd data={schema} />
      <HostingBuilderClient />
    </>
  );
}
