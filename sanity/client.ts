import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";

// Fallback values
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "r9vvbjp4";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Keep false during development
  perspective: "published",
  stega: false,
});

const builder = imageUrlBuilder(client);

export function urlForImage(source: unknown) {
  if (!source) return null;

  try {
    return builder.image(source);
  } catch (error) {
    console.error("Error building image URL:", error);
    return null;
  }
}

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Don't use CDN for writes
});

// Test connection function
export async function testConnection() {
  try {
    const result = await client.fetch(`*[_type == "siteSettings"]`);
    console.log("✅ Connection successful:", result);
    return result;
  } catch (error) {
    console.error("❌ Connection failed:", error);
    throw error;
  }
}
