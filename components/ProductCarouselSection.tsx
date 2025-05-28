/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Star, ChevronLeft, ChevronRight, MapPin, Award } from "lucide-react";

// Updated spices data with professional categories and slugs
const spicesData = [
  {
    id: 1,
    name: "Ceylon Cinnamon Sticks",
    slug: "ceylon-cinnamon-sticks",
    description: "Premium organic Ceylon cinnamon with sweet, delicate flavor profile. Sustainably sourced from certified plantations.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=750&fit=crop&crop=center",
    category: "Whole Spices",
    origin: "Indonesia",
    certifications: ["Organic", "Fair Trade"],
  },
  {
    id: 2,
    name: "Star Anise Whole",
    slug: "star-anise-whole",
    description: "Hand-selected whole star anise pods with intense licorice notes. Perfect for culinary and pharmaceutical applications.",
    image: "https://images.unsplash.com/photo-1596040033229-a5b2d6c04659?w=600&h=750&fit=crop&crop=center",
    category: "Whole Spices",
    origin: "Indonesia",
    certifications: ["Organic"],
  },
  {
    id: 3,
    name: "Black Peppercorns",
    slug: "black-peppercorns",
    description: "Bold, pungent black pepper with complex heat. Harvested at peak ripeness for maximum potency and flavor depth.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=750&fit=crop&crop=center",
    category: "Whole Spices",
    origin: "Indonesia",
    certifications: ["Premium Quality"],
  },
  {
    id: 4,
    name: "Golden Turmeric Powder",
    slug: "golden-turmeric-powder",
    description: "High curcumin content turmeric powder with vibrant color and earthy flavor. Laboratory tested for purity and potency.",
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=600&h=750&fit=crop&crop=center",
    category: "Ground Spices",
    origin: "Indonesia",
    certifications: ["Organic", "Lab Tested"],
  },
  {
    id: 5,
    name: "Aromatic Clove Powder",
    slug: "aromatic-clove-powder",
    description: "Finely ground premium cloves with intense aromatic properties. Ideal for food processing and culinary applications.",
    image: "https://images.unsplash.com/photo-1596040033229-a5b2d6c04659?w=600&h=750&fit=crop&crop=center",
    category: "Ground Spices",
    origin: "Indonesia",
    certifications: ["Premium Quality"],
  },
  {
    id: 6,
    name: "Signature Curry Blend",
    slug: "signature-curry-blend",
    description: "Expertly crafted blend of 12 premium spices. Balanced heat and aromatic complexity for authentic Indonesian cuisine.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=750&fit=crop&crop=center",
    category: "Spice Blends",
    origin: "Indonesia",
    certifications: ["House Blend"],
  },
  {
    id: 7,
    name: "Rendang Spice Mix",
    slug: "rendang-spice-mix",
    description: "Traditional Indonesian rendang blend with galangal, lemongrass, and premium chilies. Restaurant-grade quality.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=750&fit=crop&crop=center",
    category: "Spice Blends",
    origin: "Indonesia",
    certifications: ["Traditional Recipe"],
  },
  {
    id: 8,
    name: "Organic Cardamom Pods",
    slug: "organic-cardamom-pods",
    description: "Certified organic green cardamom with intense flavor and aroma. Handpicked and carefully processed for premium quality.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=750&fit=crop&crop=center",
    category: "Organic Spices",
    origin: "Indonesia",
    certifications: ["Certified Organic", "Fair Trade"],
  },
  {
    id: 9,
    name: "Organic White Pepper",
    slug: "organic-white-pepper",
    description: "Premium organic white peppercorns with clean, sharp heat. Sustainably farmed using traditional organic methods.",
    image: "https://images.unsplash.com/photo-1596040033229-a5b2d6c04659?w=600&h=750&fit=crop&crop=center",
    category: "Organic Spices",
    origin: "Indonesia",
    certifications: ["Certified Organic"],
  },
  {
    id: 10,
    name: "Nutmeg",
    slug: "nutmeg",
    description: "Ultra-premium Grade A nutmeg from the historic Spice Islands. Complex sweet and warm flavor profile with exceptional aroma.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=750&fit=crop&crop=center",
    category: "Premium Collection",
    origin: "Indonesia",
    certifications: ["Grade A", "Single Origin"],
  },
  {
    id: 11,
    name: "Tahitian Vanilla Beans",
    slug: "tahitian-vanilla-beans",
    description: "Premium Grade A vanilla beans with rich, complex flavor notes. Cured using traditional methods for optimal flavor development.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=750&fit=crop&crop=center",
    category: "Premium Collection",
    origin: "Indonesia",
    certifications: ["Grade A", "Premium Quality"],
  },
];

const categories = ["All Products", "Whole Spices", "Ground Spices", "Spice Blends", "Organic Spices", "Premium Collection"];

type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  category: string;
  origin: string;
  certifications: string[];
};

// Custom hook for intersection observer
const useIntersectionObserver = (threshold = 0.1) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return [ref, isIntersecting] as const;
};

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 2000, isVisible }: { value: number | string; duration?: number; isVisible: boolean }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);

      if (typeof value === "string") {
        // For non-numeric values like "100%", just show them after a delay
        const timer = setTimeout(() => setCount(parseInt(value) || 0), 300);
        return () => clearTimeout(timer);
      }

      const numericValue = typeof value === "number" ? value : typeof value === "string" ? parseInt(value) : 0;
      let startTime: number;
      const startCount = 0;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);

        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * numericValue));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isVisible, value, duration, hasAnimated]);

  if (typeof value === "string" && value.includes("%")) {
    return <span>{isVisible && hasAnimated ? value : "0%"}</span>;
  }

  return <span>{count}+</span>;
};

const ProductCard = ({ product }: { product: Product }) => {
  const handleViewDetails = () => {
    // Navigate to product detail page
    window.location.href = `/product/${product.slug}`;
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-700 hover:shadow-2xl group transform scale-95 opacity-80" style={{ minHeight: "500px" }}>
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

        {/* Certifications Badge */}
        <div className="absolute top-4 right-4">
          {product.certifications.slice(0, 1).map((cert, index) => (
            <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-xs font-medium rounded-full">
              <Award className="w-3 h-3" />
              {cert}
            </span>
          ))}
        </div>

        {/* Origin Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-600 text-white text-xs font-medium rounded-full">
            <MapPin className="w-3 h-3" />
            {product.origin}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col justify-between" style={{ minHeight: "220px" }}>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-amber-600 uppercase tracking-wider">{product.category}</span>
            <div className="flex items-center gap-1"></div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-amber-700 transition-colors">{product.name}</h3>

          <p className="text-slate-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        </div>

        {/* Action Button */}
        <button
          onClick={handleViewDetails}
          className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group"
        >
          <span className="text-sm">View Details</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

const ProductCarouselSection = () => {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [filteredProducts, setFilteredProducts] = useState(spicesData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Intersection observer for stats animation
  const [statsRef, isStatsVisible] = useIntersectionObserver(0.3);

  // Filter products based on category
  useEffect(() => {
    if (activeCategory === "All Products") {
      setFilteredProducts(spicesData);
    } else {
      setFilteredProducts(spicesData.filter((product) => product.category === activeCategory));
    }
    setCurrentIndex(0); // Reset to first slide when category changes
  }, [activeCategory]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || filteredProducts.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === filteredProducts.length - 1 ? 0 : prevIndex + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [filteredProducts.length, isAutoPlaying]);

  // Navigation functions
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === filteredProducts.length - 1 ? 0 : prevIndex + 1));
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? filteredProducts.length - 1 : prevIndex - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Get visible products for different screen sizes
  const getVisibleProducts = React.useCallback(() => {
    const products = [];
    const totalProducts = filteredProducts.length;

    if (totalProducts === 0) return [];

    // Show 3 products on desktop, 2 on tablet, 1 on mobile
    const visibleCount = window.innerWidth >= 1024 ? Math.min(3, totalProducts) : window.innerWidth >= 768 ? Math.min(2, totalProducts) : 1;

    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % totalProducts;
      products.push(filteredProducts[index]);
    }

    return products;
  }, [currentIndex, filteredProducts]);

  const [visibleProducts, setVisibleProducts] = useState<typeof spicesData>([]);

  useEffect(() => {
    const updateVisibleProducts = () => {
      setVisibleProducts(getVisibleProducts());
    };

    updateVisibleProducts();

    const handleResize = () => {
      updateVisibleProducts();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex, filteredProducts, getVisibleProducts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-8 h-0.5 bg-gradient-to-r from-amber-600 to-orange-600"></div>
            <p className="font-semibold text-amber-800 uppercase tracking-wider text-sm">Premium Indonesian Spices</p>
            <div className="w-8 h-0.5 bg-gradient-to-r from-amber-600 to-orange-600"></div>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-[#4A2C1D] leading-tight sm:leading-tight md:leading-tight mb-6">
            Authentic Spices from
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Indonesia&apos;s Finest Regions</span>
          </h1>

          <p className="text-medium md:text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed mb-12">
            Sourced directly from certified farms across Indonesia&apos;s spice islands. Each product represents centuries of tradition, sustainable farming, and uncompromising quality standards.
          </p>

          {/* Category Filter */}
          <div className="flex justify-center flex-wrap gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-amber-600 to-orange-600 text-medium text-white shadow-lg transform scale-105"
                    : "bg-white/70 text-slate-700 border text-medium border-slate-200 hover:bg-amber-50 hover:border-amber-300 hover:transform hover:scale-105"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredProducts.length > 0 ? (
            <>
              {/* Main Carousel */}
              <div className="relative mb-12" onMouseEnter={() => setIsAutoPlaying(false)} onMouseLeave={() => setIsAutoPlaying(true)}>
                {/* Navigation Buttons */}
                {filteredProducts.length > 1 && (
                  <>
                    <button
                      onClick={goToPrevious}
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 flex items-center justify-center group hover:scale-110"
                    >
                      <ChevronLeft className="w-6 h-6 text-slate-700 group-hover:text-amber-600" />
                    </button>
                    <button
                      onClick={goToNext}
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 flex items-center justify-center group hover:scale-110"
                    >
                      <ChevronRight className="w-6 h-6 text-slate-700 group-hover:text-amber-600" />
                    </button>
                  </>
                )}

                {/* Cards Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                  {visibleProducts.map((product, index) => (
                    <ProductCard key={`${product.id}-${index}`} product={product} />
                  ))}
                </div>
              </div>

              {/* Pagination Dots */}
              {filteredProducts.length > 1 && (
                <div className="flex justify-center items-center gap-2 mb-8">
                  {filteredProducts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-gradient-to-r from-amber-600 to-orange-600 scale-125" : "bg-slate-300 hover:bg-slate-400"}`}
                    />
                  ))}
                </div>
              )}

              {/* Animated Stats Section */}
              <div
                ref={statsRef}
                className={`grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 bg-white/50 backdrop-blur-sm rounded-2xl p-8 transition-all duration-1000 ${
                  isStatsVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
                }`}
              >
                <div className={`text-center transition-all duration-700 delay-100 ${isStatsVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"}`}>
                  <div className="text-3xl font-bold text-slate-800 mb-2">
                    <AnimatedCounter value={filteredProducts.length} isVisible={isStatsVisible} />
                  </div>
                  <div className="text-slate-600 font-medium">Premium Products</div>
                </div>
                <div className={`text-center transition-all duration-700 delay-200 ${isStatsVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"}`}>
                  <div className="text-3xl font-bold text-slate-800 mb-2">
                    <AnimatedCounter value={15} isVisible={isStatsVisible} />
                  </div>
                  <div className="text-slate-600 font-medium">Source Regions</div>
                </div>
                <div className={`text-center transition-all duration-700 delay-300 ${isStatsVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"}`}>
                  <div className="text-3xl font-bold text-slate-800 mb-2">
                    <AnimatedCounter value="100%" isVisible={isStatsVisible} />
                  </div>
                  <div className="text-slate-600 font-medium">Quality Assured</div>
                </div>
                <div className={`text-center transition-all duration-700 delay-500 ${isStatsVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"}`}>
                  <div className="text-3xl font-bold text-slate-800 mb-2">
                    <AnimatedCounter value={50} isVisible={isStatsVisible} />
                  </div>
                  <div className="text-slate-600 font-medium">Years Experience</div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-slate-600">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductCarouselSection;
