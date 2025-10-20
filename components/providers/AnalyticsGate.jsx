"use client";

import { useConsent } from "@/components/providers/ConsentProvider";

export default function AnalyticsGate({ children }) {
  const { status, ready } = useConsent();

  if (!ready || status !== "granted") {
    return null;
  }

  return children;
}
