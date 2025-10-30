import WebdevClient from "./WebdevClient";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { getServiceSchema } from "@/data/services";

export const metadata = buildMetadata("/dashboard/webdev");

export default function WebdevPage() {
  const schema = getServiceSchema("/dashboard/webdev");
  return (
    <>
      <JsonLd data={schema} />
      <WebdevClient />
    </>
  );
}
