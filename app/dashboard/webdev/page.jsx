import WebdevClient from "./WebdevClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("/dashboard/webdev");

export default function WebdevPage() {
  return <WebdevClient />;
}
