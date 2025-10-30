import ArticleClient from "./ArticleClient";
import { notFound } from "next/navigation";
import { fetchBlogPostBySlug } from "@/lib/blog-feed";
import JsonLd from "@/components/seo/JsonLd";
import { baseUrl, siteMetadata } from "@/lib/seo";

export const revalidate = 300;

const fallbackMetadata = {
  title: `${siteMetadata.title} | Blog előnézet`,
  description: siteMetadata.description,
};

const buildCanonical = (slug) => `${baseUrl}/dashboard/${slug}`;

const createArticleJsonLd = (post) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  alternativeHeadline: `${post.title} – Blogocska.hu`,
  description: post.excerpt,
  datePublished: post.publishedAt ?? undefined,
  dateModified: post.publishedAt ?? undefined,
  mainEntityOfPage: post.link ?? buildCanonical(post.slug),
  inLanguage: "hu",
  author: {
    "@type": "Person",
    name: "Polyák Csaba",
  },
  publisher: {
    "@type": "Organization",
    name: "PromNET",
    url: baseUrl,
  },
  articleSection: post.categories,
  url: buildCanonical(post.slug),
});

export async function generateMetadata({ params }) {
  try {
    const post = await fetchBlogPostBySlug(params.id);
    if (!post) {
      return fallbackMetadata;
    }

    const canonical = buildCanonical(post.slug);
    return {
      title: `${post.title} | PromNET x Blogocska`,
      description: post.excerpt,
      alternates: {
        canonical,
      },
      openGraph: {
        title: `${post.title} | PromNET x Blogocska`,
        description: post.excerpt,
        url: canonical,
        type: "article",
        article: {
          section: post.categories?.[0],
          publishedTime: post.publishedAt ?? undefined,
        },
      },
      twitter: {
        card: "summary_large_image",
        title: `${post.title} | PromNET x Blogocska`,
        description: post.excerpt,
      },
    };
  } catch (error) {
    console.error("Dinamikus metadata előállítási hiba", error);
    return fallbackMetadata;
  }
}

export default async function Page({ params }) {
  let post = null;
  try {
    post = await fetchBlogPostBySlug(params.id);
  } catch (error) {
    console.error("Blogbejegyzés betöltési hiba", error);
  }

  if (!post) {
    notFound();
  }

  const schema = createArticleJsonLd(post);

  return (
    <>
      <JsonLd data={schema} />
      <ArticleClient post={{ ...post, categories: post.categories ?? [] }} />
    </>
  );
}
