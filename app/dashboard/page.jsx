import React from "react";
import HomePage from "@/app/HomePage/page";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("/dashboard");

export default function DashboardPage() {
  return (
    <div className="">
      <HomePage />
    </div>
  );
}
