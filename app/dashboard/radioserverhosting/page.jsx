import RadioServerHostingClient from "./RadioServerHostingClient";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { getServiceSchema } from "@/data/services";

export const metadata = buildMetadata("/dashboard/radioserverhosting");

export default function RadioServerHostingPage() {
  const schema = getServiceSchema("/dashboard/radioserverhosting");
  return (
    <>
      <JsonLd data={schema} />
      <RadioServerHostingClient />
    </>
  );
}
