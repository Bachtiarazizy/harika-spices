/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Calendar, User, Clock, ChevronLeft, ChevronRight, Tag, BookOpen } from "lucide-react";

// Sample blog data with categories and slugs
const blogData = [
  {
    id: 1,
    title: "The Ancient History of Indonesian Spice Trade",
    slug: "ancient-history-indonesian-spice-trade",
    excerpt: "Explore the rich history of Indonesia's spice trade dating back to the 7th century and its impact on global commerce and culture.",
    image: "https://images.unsplash.com/photo-1596040033229-a5b2d6c04659?w=600&h=400&fit=crop&crop=center",
    category: "Culture & History",
    author: "Dr. Sarah Chen",
    date: "May 15, 2025",
    readTime: "8 min read",
    tags: ["History", "Trade", "Culture"],
    featured: true,
  },
  {
    id: 2,
    title: "Sustainable Farming Practices in Modern Spice Production",
    slug: "sustainable-farming-spice-production",
    excerpt: "How traditional knowledge combined with modern sustainable practices is shaping the future of spice cultivation in Indonesia.",
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=600&h=400&fit=crop&crop=center",
    category: "Culture & History",
    author: "Ahmad Wijaya",
    date: "April 28, 2025",
    readTime: "6 min read",
    tags: ["Sustainability", "Farming", "Innovation"],
    featured: false,
  },
  {
    id: 3,
    title: "Culinary Applications of Rare Indonesian Spices",
    slug: "culinary-applications-rare-spices",
    excerpt: "Discover how world-renowned chefs are incorporating rare Indonesian spices into innovative fusion cuisine.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&crop=center",
    category: "Culture & History",
    author: "Chef Marco Rossi",
    date: "May 2, 2025",
    readTime: "10 min read",
    tags: ["Culinary", "Recipes", "Gastronomy"],
    featured: true,
  },
  {
    id: 4,
    title: "Health Benefits of Traditional Indonesian Spice Blends",
    slug: "health-benefits-traditional-spice-blends",
    excerpt: "Research reveals the powerful antioxidant and anti-inflammatory properties of traditional Indonesian spice combinations.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=center",
    category: "Health & Wellness",
    author: "Dr. Amelia Patel",
    date: "April 10, 2025",
    readTime: "7 min read",
    tags: ["Health", "Wellness", "Research"],
    featured: false,
  },
  {
    id: 5,
    title: "The Art of Spice Blending: Master Class Insights",
    slug: "art-spice-blending-master-class",
    excerpt: "Learn the secrets of perfect spice blending from Indonesia's most respected spice masters and their centuries-old techniques.",
    image: "https://images.unsplash.com/photo-1596040033229-a5b2d6c04659?w=600&h=400&fit=crop&crop=center",
    category: "Tips & Guides",
    author: "Budi Santoso",
    date: "March 25, 2025",
    readTime: "9 min read",
    tags: ["Techniques", "Tradition", "Craftsmanship"],
    featured: true,
  },
  {
    id: 6,
    title: "Global Spice Market Trends: Indonesia's Growing Influence",
    slug: "global-spice-market-trends-indonesia",
    excerpt: "Analysis of how Indonesia is positioning itself as a premium spice supplier in the evolving global marketplace.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&crop=center",
    category: "Tips & Guides",
    author: "Emma Thompson",
    date: "May 8, 2025",
    readTime: "5 min read",
    tags: ["Market", "Business", "Trade"],
    featured: false,
  },
  {
    id: 7,
    title: "From Farm to Table: The Journey of Indonesian Spices",
    slug: "farm-to-table-journey-indonesian-spices",
    excerpt: "Follow the fascinating journey of Indonesian spices from cultivation to your kitchen, and the people who make it possible.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=center",
    category: "Tips & Guides",
    author: "Liam Parker",
    date: "April 15, 2025",
    readTime: "8 min read",
    tags: ["Supply Chain", "Agriculture", "Community"],
    featured: true,
  },
  {
    id: 8,
    title: "Spice Preservation Techniques for Maximum Flavor",
    slug: "spice-preservation-techniques-flavor",
    excerpt: "Expert advice on how to properly store and preserve your premium spices to maintain their flavor and potency.",
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=600&h=400&fit=crop&crop=center",
    category: "Culture & History",
    author: "Sofia Rodriguez",
    date: "March 30, 2025",
    readTime: "6 min read",
    tags: ["Storage", "Quality", "Tips"],
    featured: false,
  },
];

const categories = ["All Articles", "Culture & History", "Tips & Guides", "Health & Wellness"];

type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  featured: boolean;
};

// Custom hook for intersection observer (reused from product section)
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

const BlogCard = ({ post }: { post: BlogPost }) => {
  const handleReadMore = () => {
    // Navigate to blog post detail page
    window.location.href = `/blog/${post.slug}`;
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-700 hover:shadow-2xl group transform scale-95 opacity-90 hover:scale-100 hover:opacity-100" style={{ minHeight: "480px" }}>
      {/* Image Container */}
      <div className="relative h-60 overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

        {/* Featured Badge */}
        {post.featured && (
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-600 text-white text-xs font-medium rounded-full">
              <BookOpen className="w-3 h-3" />
              Featured
            </span>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-xs font-medium rounded-full">
            <Tag className="w-3 h-3" />
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col justify-between" style={{ minHeight: "220px" }}>
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                <Calendar className="w-3 h-3" />
                {post.date}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-amber-700 transition-colors line-clamp-2">{post.title}</h3>

          <p className="text-slate-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1 text-xs text-amber-700 font-medium">
              <User className="w-3 h-3" />
              {post.author}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleReadMore}
          className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group"
        >
          <span className="text-sm">Read Article</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

const BlogSections = () => {
  const [activeCategory, setActiveCategory] = useState("All Articles");
  const [filteredPosts, setFilteredPosts] = useState(blogData);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Intersection observer for animation
  const [sectionRef, isSectionVisible] = useIntersectionObserver(0.1);

  // Filter posts based on category
  useEffect(() => {
    if (activeCategory === "All Articles") {
      setFilteredPosts(blogData);
    } else {
      setFilteredPosts(blogData.filter((post) => post.category === activeCategory));
    }
    setCurrentIndex(0); // Reset to first slide when category changes
  }, [activeCategory]);

  // Get number of visible posts based on screen size
  const getVisibleCount = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
    }
    return 3; // Default to desktop size
  };

  // Navigation functions - Modified to scroll one card at a time
  const goToNext = () => {
    const visibleCount = getVisibleCount();
    const maxIndex = Math.max(0, filteredPosts.length - visibleCount);
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  };

  const goToPrevious = () => {
    const visibleCount = getVisibleCount();
    const maxIndex = Math.max(0, filteredPosts.length - visibleCount);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? maxIndex : prevIndex - 1));
  };

  // Handle view all button click
  const handleViewAll = () => {
    // Navigate to blog listing page
    window.location.href = `/blog`;
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-amber-50 py-8">
      {/* Blog Section Header */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-8 h-0.5 bg-gradient-to-r from-amber-600 to-orange-600"></div>
            <p className="font-semibold text-amber-800 uppercase tracking-wider text-sm">Our Spice Journal</p>
            <div className="w-8 h-0.5 bg-gradient-to-r from-amber-600 to-orange-600"></div>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-[#4A2C1D] leading-tight sm:leading-tight md:leading-tight mb-6">
            Insights & Stories from
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">The World of Spices</span>
          </h2>

          <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-4">
            Explore our collection of articles covering everything from ancient spice trading routes to modern culinary applications, sustainable farming practices, and health benefits of Indonesia&apos;s finest spices.
          </p>

          {/* Category Filter */}
          <div className="flex justify-center flex-wrap gap-3 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg transform scale-105"
                    : "bg-white/70 text-slate-700 border border-slate-200 hover:bg-amber-50 hover:border-amber-300 hover:transform hover:scale-105"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Carousel */}
      <section className="px-4 pb-8">
        <div ref={sectionRef} className={`max-w-7xl mx-auto transition-all duration-1000 ${isSectionVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"}`}>
          {filteredPosts.length > 0 ? (
            <>
              {/* Carousel Container */}
              <div className="relative mb-8">
                {/* Navigation Buttons - Show only when there are more cards than visible */}
                {filteredPosts.length > getVisibleCount() && (
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

                {/* Cards Container with Horizontal Scroll */}
                <div className="overflow-hidden">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                      transform: `translateX(-${currentIndex * (100 / getVisibleCount())}%)`,
                      width: `${(filteredPosts.length / getVisibleCount()) * 100}%`,
                    }}
                  >
                    {filteredPosts.map((post, index) => (
                      <div key={post.id} className="px-3" style={{ width: `${100 / getVisibleCount()}%` }}>
                        <BlogCard post={post} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Carousel Indicator Dots - Updated for one-by-one scrolling */}
              {filteredPosts.length > getVisibleCount() && (
                <div className="flex justify-center items-center gap-2 mb-6">
                  {Array.from({ length: Math.max(0, filteredPosts.length - getVisibleCount() + 1) }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === index ? "bg-gradient-to-r from-amber-600 to-orange-600 scale-125" : "bg-slate-300 hover:bg-slate-400"}`}
                    />
                  ))}
                </div>
              )}

              {/* View All Button */}
              <div className="text-center mt-8">
                <button
                  onClick={handleViewAll}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg group"
                >
                  <span>View All Articles</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-slate-600">No articles found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogSections;
