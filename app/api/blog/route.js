import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";

export const runtime = "nodejs";

const BLOG_FEED_URL = "https://blogocska.hu/feed";

const stripHtml = (input = "") => input.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const toRelativeTime = (dateString) => {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffMinutes = Math.round(diffMs / 60000);

  const rtf = new Intl.RelativeTimeFormat("hu", { numeric: "auto" });

  const units = [
    { unit: "year", value: 60 * 24 * 365 },
    { unit: "month", value: 60 * 24 * 30 },
    { unit: "week", value: 60 * 24 * 7 },
    { unit: "day", value: 60 * 24 },
    { unit: "hour", value: 60 },
    { unit: "minute", value: 1 },
  ];

  for (const { unit, value } of units) {
    if (Math.abs(diffMinutes) >= value || unit === "minute") {
      const amount = Math.round(diffMinutes / value);
      return rtf.format(amount, unit);
    }
  }

  return "";
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Number.parseInt(searchParams.get("limit") ?? "6", 10) || 6;

    const response = await fetch(BLOG_FEED_URL, {
      headers: { "User-Agent": "PromNET-site" },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return NextResponse.json({ items: [] }, { status: 502 });
    }

    const xml = await response.text();
    const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "" });
    const parsed = parser.parse(xml);
    const feedItems = parsed?.rss?.channel?.item ?? [];

    const items = feedItems.slice(0, limit).map((item) => {
      const categories = Array.isArray(item.category)
        ? item.category.map((category) => category.toString())
        : item.category
        ? [item.category.toString()]
        : [];

      const description = stripHtml(item.description ?? item["content:encoded"] ?? "");
      const publishedAt = item.pubDate ? new Date(item.pubDate).toISOString() : null;

      return {
        title: item.title ?? "Ismeretlen bejegyzés",
        link: item.link,
        description: description.slice(0, 220),
        categories,
        publishedAt,
        publishedRelative: publishedAt ? toRelativeTime(publishedAt) : "",
      };
    });

    return NextResponse.json({ items });
  } catch (error) {
    console.error("Blog feed feldolgozási hiba", error);
    return NextResponse.json({ items: [] }, { status: 500 });
  }
}
