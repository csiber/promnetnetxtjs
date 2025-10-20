import MailHostingClient from "./MailHostingClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("/dashboard/mailhosting");

export default function MailHostingPage() {
  return <MailHostingClient />;
}
