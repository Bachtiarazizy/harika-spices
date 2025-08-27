// next-sitemap.config.ts
import type { IConfig, ISitemapField } from "next-sitemap";
import { client } from "./sanity/client";

type ChangefreqValue = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

interface SanityProduct {
  slug: string;
  updatedAt?: string;
  publishedAt?: string;
  _updatedAt?: string;
}

interface SanityArticle {
  slug: string;
  updatedAt?: string;
  publishedAt?: string;
  _updatedAt?: string;
}

const config: IConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://harikaspices.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false, // Untuk performa yang lebih baik jika tidak terlalu banyak halaman

  // SEO optimizations
  changefreq: "weekly",
  priority: 0.7,
  autoLastmod: true,

  // Robots.txt configuration
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/studio/", "/_next/", "/draft/"],
      },
      // Khusus untuk search engine bots
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin/", "/api/", "/studio/", "/draft/"],
        crawlDelay: 1,
      },
    ],
    additionalSitemaps: [`${process.env.NEXT_PUBLIC_SITE_URL || "https://harikaspices.com"}/sitemap.xml`],
  },

  // Exclude paths dari sitemap
  exclude: ["/admin/*", "/api/*", "/studio/*", "/404", "/500", "/draft/*", "/_next/*", "/sitemap*.xml", "/robots.txt"],

  // Generate dynamic paths
  additionalPaths: async () => {
    const result: ISitemapField[] = [];

    try {
      // Fetch products with better error handling and optimization
      const products = await client.fetch<SanityProduct[]>(
        `*[_type == "product" && defined(slug.current)]{ 
          "slug": slug.current, 
          updatedAt,
          publishedAt,
          _updatedAt
        } | order(_updatedAt desc)`
      );

      for (const product of products) {
        if (product.slug) {
          const lastmod = product.updatedAt || product.publishedAt || product._updatedAt || new Date().toISOString();

          result.push({
            loc: `/products/${product.slug}`,
            changefreq: "weekly" as ChangefreqValue,
            priority: 0.8,
            lastmod,
          });
        }
      }

      // Fetch articles with better error handling and optimization
      const articles = await client.fetch<SanityArticle[]>(
        `*[_type == "article" && defined(slug.current)]{ 
          "slug": slug.current, 
          updatedAt,
          publishedAt,
          _updatedAt
        } | order(_updatedAt desc)`
      );

      for (const article of articles) {
        if (article.slug) {
          const lastmod = article.updatedAt || article.publishedAt || article._updatedAt || new Date().toISOString();

          result.push({
            loc: `/articles/${article.slug}`,
            changefreq: "daily" as ChangefreqValue,
            priority: 0.7,
            lastmod,
          });
        }
      }

      console.log(`Generated ${result.length} additional sitemap entries`);
    } catch (error) {
      console.error("Error generating additional paths for sitemap:", error);
      // Don't throw error, just log it to prevent build failures
    }

    return result;
  },

  // Transform function untuk customization halaman statis dan dinamis
  transform: async (config, path) => {
    // Static pages dengan prioritas berbeda
    const staticPagesConfig: Record<string, { priority: number; changefreq: ChangefreqValue }> = {
      "/": { priority: 1.0, changefreq: "daily" }, // Homepage
      "/products": { priority: 0.9, changefreq: "daily" }, // Product listing
      "/articles": { priority: 0.8, changefreq: "daily" }, // Articles listing
      "/about": { priority: 0.6, changefreq: "monthly" },
      "/contact": { priority: 0.5, changefreq: "monthly" },
      "/quality-standards": { priority: 0.5, changefreq: "monthly" },
      "/privacy-policy": { priority: 0.3, changefreq: "yearly" },
      "/terms-of-service": { priority: 0.3, changefreq: "yearly" },
    };

    // Handle static pages
    if (staticPagesConfig[path]) {
      return {
        loc: path,
        changefreq: staticPagesConfig[path].changefreq,
        priority: staticPagesConfig[path].priority,
        lastmod: new Date().toISOString(),
      };
    }

    // Handle dynamic product pages
    if (path.startsWith("/products/")) {
      try {
        const slug = path.replace("/products/", "");
        if (slug && slug !== "products") {
          const productData = await client.fetch<{
            updatedAt?: string;
            publishedAt?: string;
            _updatedAt?: string;
          }>(
            `*[_type == "product" && slug.current == $slug][0]{
              updatedAt,
              publishedAt,
              _updatedAt
            }`,
            { slug }
          );

          if (productData) {
            const lastmod = productData.updatedAt || productData.publishedAt || productData._updatedAt || new Date().toISOString();

            return {
              loc: path,
              changefreq: "weekly" as ChangefreqValue,
              priority: 0.8,
              lastmod,
            };
          }
        }
      } catch (error) {
        console.error(`Error fetching product data for sitemap path ${path}:`, error);
      }
    }

    // Handle dynamic article pages
    if (path.startsWith("/articles/")) {
      try {
        const slug = path.replace("/articles/", "");
        if (slug && slug !== "articles") {
          const articleData = await client.fetch<{
            updatedAt?: string;
            publishedAt?: string;
            _updatedAt?: string;
          }>(
            `*[_type == "article" && slug.current == $slug][0]{
              updatedAt,
              publishedAt,
              _updatedAt
            }`,
            { slug }
          );

          if (articleData) {
            const lastmod = articleData.updatedAt || articleData.publishedAt || articleData._updatedAt || new Date().toISOString();

            return {
              loc: path,
              changefreq: "daily" as ChangefreqValue,
              priority: 0.7,
              lastmod,
            };
          }
        }
      } catch (error) {
        console.error(`Error fetching article data for sitemap path ${path}:`, error);
      }
    }

    // Default configuration untuk halaman lain
    return {
      loc: path,
      changefreq: (config.changefreq as ChangefreqValue) || "weekly",
      priority: config.priority || 0.5,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};

export default config;
