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
    name
  },
  categories[]->{
    _id,
    title
  },
  tags
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

// Fix untuk generateMetadata - params sekarang Promise
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  // Await params karena sekarang Promise
  const resolvedParams = await params;
  const post = await client.fetch<SanityDocument>(ARTICLE_QUERY, { slug: resolvedParams.slug });

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt || "",
    openGraph: {
      title: post.title,
      description: post.excerpt || "",
      images: post.mainImage?.asset?.url ? [post.mainImage.asset.url] : [],
    },
  };
}

// Fix untuk default export - params sekarang Promise
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  // Await params karena sekarang Promise
  const resolvedParams = await params;

  const post = await client.fetch<SanityDocument>(ARTICLE_QUERY, { slug: resolvedParams.slug });

  if (!post) {
    notFound();
  }

  const relatedPosts = await client.fetch<SanityDocument[]>(RELATED_ARTICLES_QUERY, { slug: resolvedParams.slug });

  return <ArticleDetail post={post} relatedPosts={relatedPosts || []} />;
}
