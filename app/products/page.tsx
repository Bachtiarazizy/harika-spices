import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import ProductsClient from "@/components/shared/ProductsClient";

// Query untuk mendapatkan semua products
const PRODUCTS_QUERY = `*[
  _type == "product"
  && defined(slug.current)
]|order(featured desc, newProduct desc, name asc)[0...50]{
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
    alt,
    caption
  },
  category->{
    _id,
    name,
    slug
  },
  subCategory->{
    _id,
    name,
    slug
  },
  origin,
  harvestSeason,
  specifications{
    moisture,
    purity,
    packaging,
    certifications
  },
  flavor{
    taste,
    intensity
  },
  availability,
  featured,
  newProduct,
  pricing{
    currency,
    priceRange
  },
  minimumOrder
}`;

// Query untuk mendapatkan categories
const CATEGORIES_QUERY = `*[
  _type == "productCategory"
]|order(name asc){
  _id,
  name,
  slug,
  description
}`;

const options = { next: { revalidate: 30 } };

export default async function ProductsPage() {
  // Fetch products dan categories secara parallel
  const [products, categories] = await Promise.all([client.fetch<SanityDocument[]>(PRODUCTS_QUERY, {}, options), client.fetch<SanityDocument[]>(CATEGORIES_QUERY, {}, options)]);

  return <ProductsClient products={products} categories={categories} />;
}

// Generate metadata untuk SEO
export const metadata = {
  title: "Premium Indonesian Spices & Products | Harika Spices",
  description: "Discover our premium collection of Indonesian spices and agricultural products. From authentic spices to specialty items, sourced directly from Indonesian farmers.",
  keywords: "Indonesian spices, premium spices, spice export, agricultural products, Indonesia, spice supplier",
  openGraph: {
    title: "Premium Indonesian Spices & Products | Harika Spices",
    description: "Discover our premium collection of Indonesian spices and agricultural products. From authentic spices to specialty items, sourced directly from Indonesian farmers.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Indonesian Spices & Products | Harika Spices",
    description: "Discover our premium collection of Indonesian spices and agricultural products.",
  },
};
