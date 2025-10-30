import VpsHostingClient from "./VpsHostingClient";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { getServiceSchema } from "@/data/services";

export const metadata = buildMetadata("/dashboard/vpshosting");

export default function VpsHostingPage() {
  const schema = getServiceSchema("/dashboard/vpshosting");
  return (
    <>
      <JsonLd data={schema} />
      <VpsHostingClient />
    </>
  );
}
