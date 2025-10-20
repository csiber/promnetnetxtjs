import EmailHostingClient from "./EmailHostingClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("/dashboard/emailhosting");

export default function EmailHostingPage() {
  return <EmailHostingClient />;
}
