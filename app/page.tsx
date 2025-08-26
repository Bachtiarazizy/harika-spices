import HeroSection from "@/components/hero/HeroSection";
import QualitySection from "@/components/hero/QualitySection";
import WhyChooseUs from "@/components/hero/WhyChooseUs";
import CtaProduct from "@/components/hero/CtaProduct";
import CardSection from "@/components/hero/CardSection";
import BlogSection from "@/components/hero/BlogSection";
// Import other sections as needed

export default async function Home() {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <QualitySection />
      <CardSection />
      <WhyChooseUs />
      <CtaProduct />
      <BlogSection />
    </main>
  );
}
