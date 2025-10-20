import CreatifyClient from "./CreatifyClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("/dashboard/case-studies/creatify");

export default function CreatifyPage() {
  return <CreatifyClient />;
}
