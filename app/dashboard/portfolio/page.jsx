import PortfolioClient from "./PortfolioClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("/dashboard/portfolio");

export default function PortfolioPage() {
  return <PortfolioClient />;
}
