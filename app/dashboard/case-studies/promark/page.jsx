import PromarkClient from "./PromarkClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("/dashboard/case-studies/promark");

export default function PromarkPage() {
  return <PromarkClient />;
}
