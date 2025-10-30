import { XMLParser } from "fast-xml-parser";
import { decode } from "html-entities";

const BLOG_FEED_URL = "https://blogocska.hu/feed";

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "" });

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

const extractSlugFromLink = (link) => {
  if (!link) {
    return null;
  }

  try {
    const url = new URL(link);
    const segments = url.pathname.split("/").filter(Boolean);
    return segments[segments.length - 1] ?? null;
  } catch (error) {
    return null;
  }
};

const normaliseContent = (html) => {
  if (!html) {
    return [];
  }

  const withBreaks = html
    .replace(/<\/(p|div)>/gi, "</$1>\n")
    .replace(/<br\s*\/?>(\s*<br\s*\/?>)*/gi, "\n");

  const decoded = decode(stripHtml(withBreaks));
  return decoded
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
};

export async function fetchBlogFeed({ limit = 6 } = {}) {
  const response = await fetch(BLOG_FEED_URL, {
    headers: { "User-Agent": "PromNET-site" },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Feed lekérés sikertelen: ${response.status}`);
  }

  const xml = await response.text();
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
      slug: extractSlugFromLink(item.link),
    };
  });

  return items;
}

export async function fetchBlogPostBySlug(slug) {
  if (!slug) {
    return null;
  }

  const response = await fetch(BLOG_FEED_URL, {
    headers: { "User-Agent": "PromNET-site" },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Feed lekérés sikertelen: ${response.status}`);
  }

  const xml = await response.text();
  const parsed = parser.parse(xml);
  const feedItems = parsed?.rss?.channel?.item ?? [];

  for (const item of feedItems) {
    const linkSlug = extractSlugFromLink(item.link);
    if (linkSlug !== slug) {
      continue;
    }

    const categories = Array.isArray(item.category)
      ? item.category.map((category) => category.toString())
      : item.category
      ? [item.category.toString()]
      : [];

    const publishedAt = item.pubDate ? new Date(item.pubDate).toISOString() : null;
    const contentSource = item["content:encoded"] ?? item.description ?? "";
    const paragraphs = normaliseContent(contentSource);

    return {
      title: item.title ?? "Ismeretlen bejegyzés",
      slug,
      link: item.link,
      categories,
      publishedAt,
      publishedRelative: publishedAt ? toRelativeTime(publishedAt) : "",
      excerpt: decode(stripHtml(contentSource)).slice(0, 180),
      content: paragraphs,
    };
  }

  return null;
}

export { BLOG_FEED_URL };
