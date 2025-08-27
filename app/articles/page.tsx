import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import BlogPostsClient from "@/components/shared/ArticlesClient";

// Query untuk featured posts
const FEATURED_POSTS_QUERY = `*[
  _type == "blogPost"
  && defined(slug.current)
  && featured == true
]|order(publishedAt desc)[0...3]{
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  featured,
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
  },
}`;

// Query untuk semua posts
const ALL_POSTS_QUERY = `*[
  _type == "blogPost"
  && defined(slug.current)
]|order(publishedAt desc)[0...20]{
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  featured,
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
  },
}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  // Fetch featured posts dan semua posts
  const [featuredPosts, allPosts] = await Promise.all([client.fetch<SanityDocument[]>(FEATURED_POSTS_QUERY, {}, options), client.fetch<SanityDocument[]>(ALL_POSTS_QUERY, {}, options)]);

  return <BlogPostsClient featuredPosts={featuredPosts} allPosts={allPosts} />;
}
