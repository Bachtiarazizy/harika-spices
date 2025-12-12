/* eslint-disable @typescript-eslint/no-require-imports */
// next-sitemap.config.js
const { createClient } = require("next-sanity");

// Fallback values
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;

// Buat client Sanity langsung di sini
const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Keep false during development
  perspective: "published",
  stega: false,
});

/**
 * @type {import('next-sitemap').IConfig}
 */
const config = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://harikaspices.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
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
    const result = [];

    try {
      // Fetch products
      const products = await client.fetch(
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
            changefreq: "weekly",
            priority: 0.8,
            lastmod,
          });
        }
      }

      // Fetch articles
      const articles = await client.fetch(
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
            changefreq: "daily",
            priority: 0.7,
            lastmod,
          });
        }
      }

      console.log(`Generated ${result.length} additional sitemap entries`);
    } catch (error) {
      console.error("Error generating additional paths for sitemap:", error);
    }

    return result;
  },

  // Transform function untuk customization halaman statis dan dinamis
  transform: async (config, path) => {
    // Static pages dengan prioritas berbeda
    const staticPagesConfig = {
      "/": { priority: 1.0, changefreq: "daily" },
      "/products": { priority: 0.9, changefreq: "daily" },
      "/articles": { priority: 0.8, changefreq: "daily" },
      "/about": { priority: 0.6, changefreq: "monthly" },
      "/contact": { priority: 0.5, changefreq: "monthly" },
      "/export-process": { priority: 0.5, changefreq: "monthly" },
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
          const productData = await client.fetch(
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
              changefreq: "weekly",
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
          const articleData = await client.fetch(
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
              changefreq: "daily",
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
      changefreq: config.changefreq || "weekly",
      priority: config.priority || 0.5,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};

module.exports = config;
