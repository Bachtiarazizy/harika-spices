// pages/index.tsx
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProcessSection from "@/components/ProcessSection";
import ProductsSection from "@/components/ProductsSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import Head from "next/head";

export default function Home() {
  return (
    <div className="bg-white text-gray-900">
      <Head>
        <title>Harika Spices - Indonesian Spices, Global Flavor</title>
        <meta name="description" content="Bringing the Best of Indonesian Spices to the World" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <HeroSection />
        <AboutSection />
        <ProductsSection />
        <ProcessSection />
        <WhyChooseSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
