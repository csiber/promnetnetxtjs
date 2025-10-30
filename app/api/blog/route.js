import { NextResponse } from "next/server";
import { fetchBlogFeed } from "@/lib/blog-feed";

export const runtime = "edge";

export async function GET(request) {
  try {
    const limitParam = request.nextUrl?.searchParams?.get("limit");
    const limit = Number.parseInt(limitParam ?? "6", 10) || 6;

    const items = await fetchBlogFeed({ limit });

    return NextResponse.json({ items });
  } catch (error) {
    console.error("Blog feed feldolgozási hiba", error);
    return NextResponse.json({ items: [] }, { status: 500 });
  }
}
