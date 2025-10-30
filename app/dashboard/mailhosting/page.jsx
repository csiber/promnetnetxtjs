import MailHostingClient from "./MailHostingClient";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { getServiceSchema } from "@/data/services";

export const metadata = buildMetadata("/dashboard/mailhosting");

export default function MailHostingPage() {
  const schema = getServiceSchema("/dashboard/mailhosting");
  return (
    <>
      <JsonLd data={schema} />
      <MailHostingClient />
    </>
  );
}
