/* eslint-disable @typescript-eslint/no-explicit-any */
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { notFound } from "next/navigation";
import ArticleDetail from "@/components/shared/ArticlesDetail";
import { Metadata } from "next";

const ARTICLE_QUERY = `*[_type == "blogPost" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  body,
  mainImage{
    asset->{
      _id,
      url
    },
    alt,
    caption
  },
  author->{
    _id,
    name,
    bio
  },
  categories[]->{
    _id,
    title,
    slug
  },
  tags,
  featured,
  language,
  seo{
    metaTitle,
    metaDescription,
    keywords,
    ogImage{
      asset->{
        _id,
        url
      },
      alt
    },
    noIndex,
    canonicalUrl
  }
}`;

const RELATED_ARTICLES_QUERY = `*[_type == "blogPost" && slug.current != $slug][0...3]{
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage{
    asset->{
      _id,
      url
    },
    alt
  }
}`;

// Generate metadata untuk SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await client.fetch<SanityDocument>(ARTICLE_QUERY, {
    slug: resolvedParams.slug,
  });

  if (!post) {
    return {
      title: "Article Not Found | Blog",
      description: "The article you're looking for could not be found.",
    };
  }

  // Prioritas SEO: gunakan data dari schema SEO terlebih dahulu
  const seoTitle = post.seo?.metaTitle || `${post.title} | Blog`;

  const seoDescription = post.seo?.metaDescription || post.excerpt || `Read our latest article: ${post.title}. Published on ${new Date(post.publishedAt).toLocaleDateString()}.`;

  // Convert keywords array to string untuk meta keywords
  const seoKeywords = post.seo?.keywords?.join(", ") || `${post.title}, ${post.categories?.map((cat: any) => cat.title).join(", ") || ""}, ${post.tags?.join(", ") || ""}`.replace(/,\s*,/g, ",");

  // Gunakan OG Image dari SEO schema jika ada, fallback ke mainImage
  const ogImageUrl = post.seo?.ogImage?.asset?.url || post.mainImage?.asset?.url;
  const ogImageAlt = post.seo?.ogImage?.alt || post.mainImage?.alt || post.title;

  // Format published date untuk article structured data
  const publishedTime = post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined;

  const metadata: Metadata = {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    // Respect noIndex setting
    robots: post.seo?.noIndex ? "noindex, nofollow" : "index, follow",
    // Use canonical URL if specified
    alternates: post.seo?.canonicalUrl
      ? {
          canonical: post.seo.canonicalUrl,
        }
      : undefined,
    // Article specific metadata
    authors: post.author?.name ? [{ name: post.author.name }] : undefined,
    category: post.categories?.[0]?.title,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: "article",
      publishedTime,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: ogImageUrl
        ? [
            {
              url: ogImageUrl,
              width: 1200,
              height: 630,
              alt: ogImageAlt,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: ogImageUrl ? [ogImageUrl] : [],
    },
  };

  return metadata;
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;

  const post = await client.fetch<SanityDocument>(ARTICLE_QUERY, {
    slug: resolvedParams.slug,
  });

  if (!post) {
    notFound();
  }

  const relatedPosts = await client.fetch<SanityDocument[]>(RELATED_ARTICLES_QUERY, {
    slug: resolvedParams.slug,
  });

  return <ArticleDetail post={post} relatedPosts={relatedPosts || []} />;
}
