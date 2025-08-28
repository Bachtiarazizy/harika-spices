// app/products/[slug]/page.tsx
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/shared/ProductDetailClient";
import { Metadata } from "next";

// Query untuk mendapatkan single product berdasarkan slug
const PRODUCT_QUERY = `*[
  _type == "product" 
  && slug.current == $slug
][0]{
  _id,
  name,
  slug,
  scientificName,
  commonNames,
  description,
  shortDescription,
  images[]{
    asset->{
      _id,
      url
    },
    alt,
    caption
  },
  category->{
    _id,
    name,
    slug,
    description
  },
  subCategory->{
    _id,
    name,
    slug,
    description
  },
  origin,
  harvestSeason,
  specifications{
    moisture,
    purity,
    packaging,
    shelfLife,
    storage,
    certifications
  },
  nutritionalInfo{
    calories,
    protein,
    fat,
    carbohydrates,
    fiber,
    sodium
  },
  culinaryUses,
  healthBenefits,
  flavor{
    taste,
    aroma,
    intensity
  },
  exportMarkets,
  minimumOrder,
  pricing{
    currency,
    priceRange,
    bulkDiscount
  },
  availability,
  featured,
  newProduct,
  seo{
    metaTitle,
    metaDescription,
    keywords,
    ogImage{
      asset->{
        _id,
        url
      },
      alt
    },
    noIndex,
    canonicalUrl
  }
}`;

// Query untuk mendapatkan related products
const RELATED_PRODUCTS_QUERY = `*[
  _type == "product" 
  && slug.current != $slug
  && category._ref == $categoryId
][0...4]{
  _id,
  name,
  slug,
  scientificName,
  shortDescription,
  images[]{
    asset->{
      _id,
      url
    },
    alt
  },
  availability,
  featured,
  newProduct,
  pricing{
    priceRange
  }
}`;

// Generate metadata untuk SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;

  const product = await client.fetch<SanityDocument>(PRODUCT_QUERY, {
    slug: resolvedParams.slug,
  });

  if (!product) {
    return {
      title: "Product Not Found | Harika Spices",
      description: "The product you're looking for could not be found.",
    };
  }

  // Prioritas SEO: gunakan data dari schema SEO terlebih dahulu
  const seoTitle = product.seo?.metaTitle || `${product.name} - Premium Indonesian Spices | Harika Spices`;

  const seoDescription = product.seo?.metaDescription || product.shortDescription || `Premium ${product.name} from Indonesia. ${product.scientificName ? `Scientific name: ${product.scientificName}.` : ""} High quality spice for export.`;

  // Convert keywords array to string untuk meta keywords
  const seoKeywords = product.seo?.keywords?.join(", ") || `${product.name}, Indonesian spices, ${product.scientificName || ""}, spice export, premium spices`.replace(", ,", ",");

  // Gunakan OG Image dari SEO schema jika ada, fallback ke product images
  const ogImageUrl = product.seo?.ogImage?.asset?.url || product.images?.[0]?.asset?.url;
  const ogImageAlt = product.seo?.ogImage?.alt || product.images?.[0]?.alt || product.name;

  const metadata: Metadata = {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    // Respect noIndex setting
    robots: product.seo?.noIndex ? "noindex, nofollow" : "index, follow",
    // Use canonical URL if specified
    alternates: product.seo?.canonicalUrl
      ? {
          canonical: product.seo.canonicalUrl,
        }
      : undefined,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: "website",
      images: ogImageUrl
        ? [
            {
              url: ogImageUrl,
              width: 1200,
              height: 630,
              alt: ogImageAlt,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: ogImageUrl ? [ogImageUrl] : [],
    },
  };

  return metadata;
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;

  // Fetch product data
  const product = await client.fetch<SanityDocument>(PRODUCT_QUERY, {
    slug: resolvedParams.slug,
  });

  if (!product) {
    notFound();
  }

  // Fetch related products
  const relatedProducts = await client.fetch<SanityDocument[]>(RELATED_PRODUCTS_QUERY, {
    slug: resolvedParams.slug,
    categoryId: product.category?._id,
  });

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
