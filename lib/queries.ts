// sanityQueries.ts

import { client } from "../sanity/client";

// Base query for blog posts with only required fields
const basePostQuery = `
  _id,
  title,
  slug,
  excerpt,
  mainImage {
    asset-> {
      url
    }
  },
  publishedAt
`;

// Get all published posts
export async function getAllPosts(limit: number | null = null) {
  const limitClause = limit ? `[0...${limit}]` : "";
  const query = `*[_type == "post" && publishedAt <= now()] | order(publishedAt desc)${limitClause} {
    ${basePostQuery}
  }`;

  try {
    const posts = await client.fetch(query);
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

// Get single post by slug with full content and navigation
export async function getPostBySlug(slug: string) {
  const query = `*[_type == "post" && slug.current == "${slug}"][0] {
    ${basePostQuery},
    body,
    "previousPost": *[_type == "post" && publishedAt < ^.publishedAt && publishedAt <= now()] | order(publishedAt desc)[0] {
      title,
      slug
    },
    "nextPost": *[_type == "post" && publishedAt > ^.publishedAt && publishedAt <= now()] | order(publishedAt asc)[0] {
      title,
      slug
    }
  }`;

  try {
    const post = await client.fetch(query);
    return post;
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}

// Get latest posts (for homepage)
export async function getLatestPosts(limit: number = 6) {
  return await getAllPosts(limit);
}
