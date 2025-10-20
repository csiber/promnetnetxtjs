import { redirect } from "next/navigation";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("/");

export default function Page() {
  redirect("/dashboard");
}
