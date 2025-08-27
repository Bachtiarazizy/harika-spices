// app/products/[slug]/page.tsx
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/shared/ProductDetailClient";

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
    title,
    description,
    keywords
  }
}`;

// Query untuk mendapatkan related products - FIXED
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

const options = { next: { revalidate: 30 } };

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  // Fetch product data
  const product = await client.fetch<SanityDocument>(PRODUCT_QUERY, { slug }, options);

  if (!product) {
    notFound();
  }

  // Fetch related products - FIXED query parameters
  const relatedProducts = await client.fetch<SanityDocument[]>(
    RELATED_PRODUCTS_QUERY,
    {
      slug,
      categoryId: product.category?._id,
    },
    options
  );

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}

// Generate metadata untuk SEO
export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = params;

  const product = await client.fetch<SanityDocument>(PRODUCT_QUERY, { slug }, { next: { revalidate: 30 } });

  if (!product) {
    return {
      title: "Product Not Found | Harika Spices",
      description: "The product you're looking for could not be found.",
    };
  }

  const seoTitle = product.seo?.title || `${product.name} `;
  const seoDescription = product.seo?.description || product.shortDescription || `Premium ${product.name} from Indonesia. ${product.scientificName ? `Scientific name: ${product.scientificName}.` : ""} High quality spice for export.`;
  const seoKeywords = product.seo?.keywords || `${product.name}, Indonesian spices, ${product.scientificName}, spice export, premium spices`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: "website",
      images: product.images?.[0]?.asset?.url
        ? [
            {
              url: product.images[0].asset.url,
              width: 800,
              height: 600,
              alt: product.images[0].alt || product.name,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: product.images?.[0]?.asset?.url ? [product.images[0].asset.url] : [],
    },
  };
}

// Generate static params untuk ISR
export async function generateStaticParams() {
  const products = await client.fetch<{ slug: { current: string } }[]>(
    `*[_type == "product" && defined(slug.current)]{
      "slug": slug
    }`,
    {},
    { next: { revalidate: 3600 } } // revalidate every hour
  );

  return products.map((product) => ({
    slug: product.slug.current,
  }));
}
