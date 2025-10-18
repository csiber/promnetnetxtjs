export const trackEvent = (eventName, payload = {}) => {
  if (typeof window === "undefined") {
    return;
  }

  if (window.va && typeof window.va.track === "function") {
    window.va.track(eventName, payload);
  }
};

export const trackCtaClick = (ctaName, extra = {}) => {
  trackEvent("cta_click", { ctaName, ...extra });
};

export const trackLeadSubmission = (status, extra = {}) => {
  trackEvent("lead_submission", { status, ...extra });
};
