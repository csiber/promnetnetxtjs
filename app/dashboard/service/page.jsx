import ServiceClient from "./ServiceClient";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { getServiceSchema } from "@/data/services";

export const metadata = buildMetadata("/dashboard/service");

export default function ServicePage() {
  const schema = getServiceSchema("/dashboard/service");
  return (
    <>
      <JsonLd data={schema} />
      <ServiceClient />
    </>
  );
}
