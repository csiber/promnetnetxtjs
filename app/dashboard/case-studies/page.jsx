import CaseStudiesClient from "./CaseStudiesClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("/dashboard/case-studies");

export default function CaseStudiesPage() {
  return <CaseStudiesClient />;
}
