import EmailHostingClient from "./EmailHostingClient";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { getServiceSchema } from "@/data/services";

export const metadata = buildMetadata("/dashboard/emailhosting");

export default function EmailHostingPage() {
  const schema = getServiceSchema("/dashboard/emailhosting");
  return (
    <>
      <JsonLd data={schema} />
      <EmailHostingClient />
    </>
  );
}
