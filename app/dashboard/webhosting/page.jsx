import WebHostingClient from "./WebHostingClient";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { getServiceSchema } from "@/data/services";

export const metadata = buildMetadata("/dashboard/webhosting");

export default function WebHostingPage() {
  const schema = getServiceSchema("/dashboard/webhosting");
  return (
    <>
      <JsonLd data={schema} />
      <WebHostingClient />
    </>
  );
}
