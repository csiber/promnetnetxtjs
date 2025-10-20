"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const ConsentContext = createContext({
  status: "unknown",
  ready: false,
  grant: () => {},
  deny: () => {},
});

const STORAGE_KEY = "promnet-consent";

function normalizeStatus(value) {
  return value === "granted" || value === "denied" ? value : "unknown";
}

export function ConsentProvider({ children }) {
  const [status, setStatus] = useState(() => "unknown");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (stored) {
      const normalized = normalizeStatus(stored);
      setStatus(normalized);
      if (typeof window !== "undefined") {
        window.__promnetConsent = normalized;
      }
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) {
      return;
    }
    if (typeof window === "undefined") {
      return;
    }
    if (status === "unknown") {
      window.localStorage.removeItem(STORAGE_KEY);
      window.__promnetConsent = status;
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, status);
    window.__promnetConsent = status;
  }, [ready, status]);

  const grant = useCallback(() => setStatus("granted"), []);
  const deny = useCallback(() => setStatus("denied"), []);

  const value = useMemo(
    () => ({
      status,
      ready,
      grant,
      deny,
    }),
    [status, ready, grant, deny]
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export const useConsent = () => useContext(ConsentContext);
