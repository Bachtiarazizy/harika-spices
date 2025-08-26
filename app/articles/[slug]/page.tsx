/* eslint-disable @typescript-eslint/no-explicit-any */
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { notFound } from "next/navigation";
import ArticleDetail from "@/components/shared/ArticlesDetail";

// Query untuk mendapatkan artikel berdasarkan slug
const ARTICLE_QUERY = `*[
  _type == "blogPost" 
  && slug.current == $slug
][0]{
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
    bio,
    image{
      asset->{
        url
      }
    }
  },
  categories[]->{
    _id,
    title,
    slug
  },
  tags,
  language,
  featured,
  seo{
    title,
    description,
    keywords
  }
}`;

// Query untuk mendapatkan artikel terkait
const RELATED_ARTICLES_QUERY = `*[
  _type == "blogPost" 
  && slug.current != $slug
  && defined(slug.current)
  && count(categories[@._ref in $categoryIds]) > 0
]|order(publishedAt desc)[0...3]{
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
  },
  categories[]->{
    title,
    slug
  }
}`;

const options = { next: { revalidate: 30 } };

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  // Fetch artikel utama
  const post = await client.fetch<SanityDocument>(ARTICLE_QUERY, { slug: params.slug }, options);

  if (!post) {
    notFound();
  }

  // Extract category IDs untuk query artikel terkait
  const categoryIds = post.categories?.map((cat: any) => cat._id) || [];

  // Fetch artikel terkait jika ada kategori
  const relatedPosts =
    categoryIds.length > 0
      ? await client.fetch<SanityDocument[]>(
          RELATED_ARTICLES_QUERY,
          {
            slug: params.slug,
            categoryIds: categoryIds,
          },
          options
        )
      : [];

  return <ArticleDetail post={post} relatedPosts={relatedPosts} />;
}

// Generate metadata untuk SEO
export async function generateMetadata({ params }: ArticlePageProps) {
  const post = await client.fetch<SanityDocument>(
    `*[_type == "blogPost" && slug.current == $slug][0]{
      title,
      excerpt,
      seo,
      mainImage{
        asset->{
          url
        }
      }
    }`,
    { slug: params.slug }
  );

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.excerpt,
    keywords: post.seo?.keywords,
    openGraph: {
      title: post.seo?.title || post.title,
      description: post.seo?.description || post.excerpt,
      images: post.mainImage?.asset?.url
        ? [
            {
              url: post.mainImage.asset.url,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo?.title || post.title,
      description: post.seo?.description || post.excerpt,
      images: post.mainImage?.asset?.url ? [post.mainImage.asset.url] : [],
    },
  };
}

// Generate static params untuk build time
export async function generateStaticParams() {
  const posts = await client.fetch<{ slug: { current: string } }[]>(
    `*[_type == "blogPost" && defined(slug.current)]{
      slug
    }`
  );

  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}
