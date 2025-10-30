import ServerHostingClient from "./ServerHostingClient";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { getServiceSchema } from "@/data/services";

export const metadata = buildMetadata("/dashboard/serverhosting");

export default function ServerHostingPage() {
  const schema = getServiceSchema("/dashboard/serverhosting");
  return (
    <>
      <JsonLd data={schema} />
      <ServerHostingClient />
    </>
  );
}
