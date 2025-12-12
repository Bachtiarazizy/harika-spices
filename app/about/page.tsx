import React from "react";
import { Leaf, Star, Shield, TrendingUp } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "About Us | Trusted Indonesian Spices Exporter & Supplier",
  description: "Discover Harika Spices, a reliable Indonesian spices exporter and supplier delivering premium-quality natural spices for global markets. Learn about our values and sourcing.",
  keywords: "Indonesian spices exporter, Indonesian spices supplier, premium spices from Indonesia, indonesian agricultural products, natural spice company Indonesia",
  openGraph: {
    title: "About Us | Trusted Indonesian Spices Exporter & Supplier",
    description: "Discover Harika Spices, a reliable Indonesian spices exporter and supplier delivering premium-quality natural spices for global markets. Learn about our values and sourcing.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Trusted Indonesian Spices Exporter & Supplier",
    description: "Discover Harika Spices, a reliable Indonesian spices exporter and supplier delivering premium-quality natural spices for global markets. Learn about our values and sourcing.",
  },
};

const AboutPage = () => {
  const differences = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Direct Sourcing",
      description: "No middlemen — straight from farmers to your business",
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Premium Quality Selection",
      description: "Only the finest grades make it through our quality control",
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Transparent & Ethical",
      description: "Full visibility into our supply chain and fair trade practices",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Consistent & Reliable",
      description: "Dependable volume and repeatability for your business needs",
    },
  ];

  const spices = ["Aromatic and oil-rich cloves", "High-curcumin turmeric", "Bold nutmeg & cinnamon", "Versatile pepper & blends"];

  return (
    <div className="min-h-screen bg-[#392E20]">
      {/* Hero Section */}

      <section className="bg-[#392E20] py-12 md:py-20 px-4 md:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-white font-calistoga text-2xl md:text-4xl lg:text-5xl mb-4 md:mb-6 mt-8 md:mt-12 leading-tight px-2">Trusted Indonesian Spices Exporter & Supplie</h1>
            <p className="text-gray-200 text-sm md:text-lg max-w-3xl mx-auto px-4"> Harika Spices is a premium Indonesian spices exporter and supplier, committed to delivering the finest spices from Indonesia to global markets.</p>
          </div>
        </div>
      </section>

      {/* Who We Are Section - Light Background */}
      <section className="bg-white py-20 font-raleway">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="w-full">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg">
                <Image src="/hero.jpg" fill alt="Indonesian Spices" className="object-cover w-full h-full" />
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-calistoga text-gray-900 leading-snug mb-6">Who We Are</h2>
              <p className="text-gray-700 text-base md:text-lg mb-6 leading-relaxed">
                Harika Spices is a trusted Indonesian spices exporter and supplier committed to delivering authentic, high-quality spices to the global market. We believe that spices are more than just ingredients — they are a bridge
                between cultures, a symbol of tradition, and a source of natural richness.{" "}
              </p>
              <p className="text-gray-700 text-base md:text-lg mb-6 leading-relaxed">
                Our journey began with a clear purpose: To connect the world with Indonesia’s finest natural spices — sourced ethically, processed with care, and delivered with integrity.
              </p>
              <p className="text-gray-700 text-base md:text-lg mb-6 leading-relaxed">
                We work hand-in-hand with skilled local growers and producers across the country, ensuring every batch meets international quality standards. From sourcing to packaging, every step is done with full transparency and deep
                respect for the origin of our products.{" "}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section - Dark Background */}
      <section className="bg-[#392E20] py-20 px-6 font-raleway">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-white font-calistoga text-3xl md:text-4xl lg:text-5xl mb-4">Our Difference</h2>
            <p className="text-gray-200 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">What makes Harika Spices different from typical spice traders?</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {differences.map((item, index) => (
              <div key={index} className="group bg-[#402013] backdrop-blur-sm rounded-2xl p-6 hover:shadow-lg hover:bg-[#ff6600]/25 transition-all duration-300 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full text-[#94837b] bg-[#392E20] group-hover:text-[#ff6600] transition-all duration-300">{item.icon}</div>
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-300 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">We understand the expectations of global markets — and we deliver. </p>
          </div>
        </div>
      </section>

      {/* Our Difference Section - Light Background */}
      <section className="bg-white py-20 px-6 font-raleway">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-calistoga text-gray-900 leading-snug mb-4">Why Indonesia?</h2>
            <p className="text-gray-700 text-base md:text-lg max-w-2xl mx-auto">
              {" "}
              Indonesia is one of the world&apos;s richest spice-producing regions. Its tropical climate, volcanic soil, and deep cultural knowledge of spices make it an unbeatable source for premium quality products.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {spices.map((spice, index) => (
              <div key={index} className="bg-gray-200 rounded-lg p-5 flex items-center gap-3 hover:bg-gray-200/70 transition-all duration-300">
                <Star className="w-5 h-5 text-gray-700 flex-shrink-0" />
                <span className="text-gray-700">{spice}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">As a dedicated Indonesian spices exporter, we take pride in elevating the quality and value of these spices for the global culinary scene.</p>
          </div>
        </div>
      </section>

      {/* Why Indonesia Section - Dark Background */}

      {/* CTA Section - Light Background */}
      <section className="bg-gray-100 py-20 font-raleway">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-[#392E20] rounded-2xl p-8 md:p-12 text-center shadow-lg">
            <h3 className="text-3xl md:text-4xl font-calistoga text-white mb-4">Work With Us</h3>
            <p className="text-gray-200 mb-8 max-w-2xl text-base md:text-lg mx-auto leading-relaxed">
              Looking for a trustworthy <strong>Indonesian spices supplier</strong> who understands global standards, speaks your language, and delivers on time?
            </p>
            <p className="text-gray-300 mb-10 text-base md:text-lg">Let&apos;s build a spice partnership rooted in trust, quality, and growth.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#392E20] px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">Contact Harika Spices Today</button>
              <button className="text-white border border-white px-8 py-3 rounded-md font-medium hover:bg-white hover:text-[#392E20] transition-colors">Request Product Catalog</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
