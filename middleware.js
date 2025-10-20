import { NextResponse } from "next/server";

const primaryHost = "promnet.hu";
const previewHosts = ["localhost", "127.0.0.1", "promnet.pages.dev"];

export function middleware(request) {
  const url = request.nextUrl;
  const host = request.headers.get("host");

  if (!host) {
    return NextResponse.next();
  }

  if (previewHosts.some((previewHost) => host.includes(previewHost))) {
    return NextResponse.next();
  }

  if (host === primaryHost) {
    return NextResponse.next();
  }

  const normalizedHost = host.replace(/^www\./, "");
  if (normalizedHost === primaryHost) {
    const redirectUrl = new URL(url.toString());
    redirectUrl.host = primaryHost;
    redirectUrl.protocol = "https";
    return NextResponse.redirect(redirectUrl, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
