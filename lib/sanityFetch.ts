/* eslint-disable @typescript-eslint/no-explicit-any */
import { queries } from "./queries";
import { client } from "../sanity/client";

export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  mainImage?: any;
  publishedAt: string;
  language: "en" | "id";
  featured: boolean;
  author?: {
    name: string;
    slug: { current: string };
    image?: any;
  };
  categories?: Array<{
    title: string;
    slug: { current: string };
    color?: { hex: string };
  }>;
  tags?: string[];
  body?: any;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

export interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  scientificName?: string;
  commonNames?: string[];
  description?: any;
  shortDescription?: string;
  images: any[];
  category?: {
    name: string;
    slug: { current: string };
    description?: string;
  };
  subCategory?: {
    name: string;
    slug: { current: string };
  };
  origin?: string;
  harvestSeason?: string;
  specifications?: {
    moisture?: number;
    purity?: number;
    packaging?: string[];
    shelfLife?: number;
    storage?: string;
    certifications?: string[];
  };
  nutritionalInfo?: {
    calories?: number;
    protein?: number;
    fat?: number;
    carbohydrates?: number;
    fiber?: number;
    sodium?: number;
  };
  culinaryUses?: string[];
  healthBenefits?: string[];
  flavor?: {
    taste?: string[];
    aroma?: string;
    intensity?: string;
  };
  exportMarkets?: string[];
  minimumOrder?: string;
  pricing?: {
    currency?: string;
    priceRange?: string;
    bulkDiscount?: boolean;
  };
  availability: "available" | "limited" | "preorder" | "unavailable" | "seasonal";
  featured: boolean;
  newProduct: boolean;
}

export interface ProductCategory {
  _id: string;
  name: string;
  slug: { current: string };
  description?: string;
  image?: any;
  icon?: string;
  featured: boolean;
}

// Blog data fetching functions
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await client.fetch(queries.getAllBlogPosts);
    return posts || [];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await client.fetch(queries.getFeaturedBlogPosts);
    return posts || [];
  } catch (error) {
    console.error("Error fetching featured blog posts:", error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const post = await client.fetch(queries.getBlogPostBySlug, { slug });
    return post || null;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

export async function getBlogCategories() {
  try {
    const categories = await client.fetch(queries.getBlogCategories);
    return categories || [];
  } catch (error) {
    console.error("Error fetching blog categories:", error);
    return [];
  }
}

// Product data fetching functions
export async function getAllProducts(): Promise<Product[]> {
  try {
    const products = await client.fetch(queries.getAllProducts);
    return products || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const products = await client.fetch(queries.getFeaturedProducts);
    return products || [];
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const product = await client.fetch(queries.getProductBySlug, { slug });
    return product || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function getProductCategories(): Promise<ProductCategory[]> {
  try {
    const categories = await client.fetch(queries.getProductCategories);
    return categories || [];
  } catch (error) {
    console.error("Error fetching product categories:", error);
    return [];
  }
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  try {
    const products = await client.fetch(queries.getProductsByCategory, { categorySlug });
    return products || [];
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
}

export async function getCompanyInfo() {
  try {
    const info = await client.fetch(queries.getCompanyInfo);
    return info || null;
  } catch (error) {
    console.error("Error fetching company info:", error);
    return null;
  }
}
