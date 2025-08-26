// types/blog.ts
export interface SanityImageAsset {
  _id: string;
  url: string;
}

export interface SanityImage {
  asset?: SanityImageAsset;
  alt?: string;
}

export interface SanitySlug {
  current: string;
  _type: "slug";
}

export interface Author {
  _id: string;
  name: string;
  slug: SanitySlug;
  image?: SanityImage;
  bio?: string;
}

export interface BlogCategory {
  _id: string;
  title: string;
  slug: SanitySlug;
  description?: string;
}

export interface BlogPost {
  _id: string;
  _type: "blogPost";
  title: string;
  slug: SanitySlug;
  excerpt?: string;
  mainImage?: SanityImage;
  categories?: BlogCategory[];
  tags?: string[];
  publishedAt: string;
  language: "en" | "id";
  featured: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any; // This would be the portable text content
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  author?: Author;
  // For the flattened query response
  authorName?: string;
  categoryTitle?: string;
}

export interface BlogPostsResponse {
  posts: BlogPost[];
  total: number;
}
