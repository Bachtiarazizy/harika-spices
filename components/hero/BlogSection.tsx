// components/sections/BlogSectionHome.tsx
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import BlogCardSectionClient from "./BlogSectionClient";

// Query untuk mengambil 3 blog posts terbaru
const BLOG_POSTS_QUERY = `*[
  _type == "blogPost"
  && defined(slug.current)
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
  },
}`;

const options = { next: { revalidate: 30 } };

export default async function BlogSection() {
  try {
    // Fetch blog posts dari Sanity CMS
    const blogPosts = await client.fetch<SanityDocument[]>(BLOG_POSTS_QUERY, {}, options);

    return (
      <BlogCardSectionClient
        posts={blogPosts}
        showAllLink={true}
        maxPosts={3}
        sectionTitle="Latest From Our Experts"
        sectionSubtitle="Stay informed with the latest market trends, industry analysis, and expert insights from Indonesia's leading spice exporters."
      />
    );
  } catch (error) {
    console.error("Error fetching blog posts for home page:", error);

    // Fallback jika error
    return (
      <BlogCardSectionClient
        posts={[]}
        showAllLink={true}
        maxPosts={3}
        sectionTitle="Latest From Our Experts"
        sectionSubtitle="Stay informed with the latest market trends, industry analysis, and expert insights from Indonesia's leading spice exporters."
      />
    );
  }
}
