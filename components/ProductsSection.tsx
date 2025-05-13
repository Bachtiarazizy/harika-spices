"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Package, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    name: "Clove",
    description: "Naturally dried, high aromatic intensity, oil content ≥12%",
    origin: "Java & Maluku Islands",
    icon: "🌼",
    features: ["Premium Quality", "Hand-Selected", "Organic Certified"],
  },
  {
    name: "Black Pepper",
    description: "Full-bodied flavor, uniform size, hand-picked selection",
    origin: "Lampung & Bangka Regions",
    icon: "⚫",
    features: ["Robust Taste", "Consistent Grading", "Direct Trade"],
  },
  {
    name: "Cinnamon",
    description: "Ceylon & Cassia, cut & rolled varieties",
    origin: "West Sumatra",
    icon: "🌿",
    features: ["Multi-Origin", "Artisan Processed", "Flavor Complexity"],
  },
  {
    name: "Nutmeg",
    description: "Whole round kernels, Grade A quality",
    origin: "Maluku Islands",
    icon: "🌰",
    features: ["Whole Kernel", "Premium Grade", "Strict Selection"],
  },
  {
    name: "Cardamom",
    description: "Natural green, aromatic, manually sorted",
    origin: "West Java",
    icon: "🍃",
    features: ["Hand-Sorted", "Pure Essence", "Sustainable Sourcing"],
  },
];

export default function ProductsSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const productItems = productsRef.current?.children;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    // Title animation
    tl.fromTo(
      title,
      {
        opacity: 0,
        y: 50,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      }
    );

    // Product items animation
    if (productItems) {
      tl.fromTo(
        productItems,
        {
          opacity: 0,
          y: 50,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.2,
          duration: 0.6,
          ease: "power2.out",
        },
        0.4
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative bg-gradient-to-br from-[#F5E6D3] to-[#E6D3BA] 
      text-gray-900 py-16 md:py-24 px-4 md:px-12 lg:px-24 
      overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-12 -left-12 w-96 h-96 bg-[#8B4513]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-12 -right-12 w-96 h-96 bg-[#4A2C1D]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 
          text-[#4A2C1D] leading-tight"
        >
          Our Premium <span className="text-[#8B4513]">Spice Collection</span>
        </h2>

        <div ref={productsRef} className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-xl 
              transform transition-all duration-300 
              hover:scale-105 hover:shadow-2xl 
              group relative overflow-hidden"
            >
              {/* Decorative overlay */}
              <div
                className="absolute inset-0 bg-[#8B4513]/10 
                opacity-0 group-hover:opacity-20 
                transition duration-300"
              ></div>

              <div className="relative z-10">
                <div className="text-6xl mb-4 text-center text-[#8B4513]">{product.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-center text-[#4A2C1D]">{product.name}</h3>
                <p className="text-gray-700 text-center mb-4 h-16">{product.description}</p>
                <p className="text-sm text-gray-500 text-center mb-4">Origin: {product.origin}</p>

                {/* Feature Tags */}
                <div className="flex justify-center space-x-2 mb-4">
                  {product.features.map((feature, featureIndex) => (
                    <span
                      key={featureIndex}
                      className="px-3 py-1 bg-[#8B4513]/10 text-[#8B4513] 
                      rounded-full text-xs font-semibold"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="text-center mt-16 space-y-6">
          <div className="flex justify-center space-x-4">
            <div
              className="flex items-center gap-2 bg-white/50 
              backdrop-blur-sm px-6 py-3 rounded-full 
              shadow-md transform transition hover:scale-105"
            >
              <Package className="text-[#8B4513]" size={24} />
              <span className="text-[#4A2C1D]">Available in 25kg–50kg packaging (Jute/Vacuum bags)</span>
            </div>
            <div
              className="flex items-center gap-2 bg-white/50 
              backdrop-blur-sm px-6 py-3 rounded-full 
              shadow-md transform transition hover:scale-105"
            >
              <Award className="text-[#8B4513]" size={24} />
              <span className="text-[#4A2C1D]">Export-Ready Documentation</span>
            </div>
          </div>
          <p className="text-lg text-[#4A2C1D]/80">Comprehensive export documentation including Phytosanitary Certificate, Certificate of Analysis, Invoice, and Packing List</p>
        </div>
      </div>
    </section>
  );
}
