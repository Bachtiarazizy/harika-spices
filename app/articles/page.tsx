import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import BlogPostsClient from "@/components/shared/ArticlesClient";

const POSTS_QUERY = `*[
  _type == "blogPost"
  && defined(slug.current)
]|order(publishedAt desc)[0...20]{
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
  },
}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return <BlogPostsClient posts={posts} />;
}
