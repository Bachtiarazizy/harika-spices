import { Metadata } from "next";
import { Locale } from "@/middleware";
import { getDictionary } from "@/lib/dictionaries";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProductCarouselSection from "@/components/ProductCarouselSection";
import Process from "@/components/shared/process-section";
import BlogSections from "@/components/blog-section";
import GallerySection from "@/components/shared/gallery-section";
// Import other sections as needed

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  // Get dictionary for the locale
  const dictionary = await getDictionary(params.locale);

  return {
    title: `Harika Spices | ${dictionary.metadata.homeTitle}`,
    description: dictionary.metadata.homeDescription,
  };
}

export default async function Home({ params: { locale } }: { params: { locale: Locale } }) {
  // Get dictionary data for the locale
  const dictionary = await getDictionary(locale);

  return (
    <main>
      <HeroSection dictionary={dictionary} />
      <AboutSection dictionary={dictionary} />
      <ProductCarouselSection />
      <Process />
      <GallerySection />
      <BlogSections />
    </main>
  );
}
