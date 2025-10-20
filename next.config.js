/** @type {import('next').NextConfig} */
const securityHeaders = [
  {
    key: "Content-Security-Policy-Report-Only",
    value:
      "default-src 'self'; frame-ancestors 'self'; img-src 'self' data: https:; media-src 'self' https:; script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://vitals.vercel-insights.com https://vitals.vercel-analytics.com https://cal.com https://api.cal.com; frame-src https://cal.com; report-to csp-endpoint;",
  },
  {
    key: "Report-To",
    value: JSON.stringify({
      group: "csp-endpoint",
      max_age: 10886400,
      endpoints: [{ url: "https://promnet.report-uri.com/r/d/csp/reportOnly" }],
    }),
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig = {
  images: {
    // Disable Next.js image optimization for Cloudflare compatibility
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
