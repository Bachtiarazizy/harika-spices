/* eslint-disable @next/next/no-img-element */
"use client";
import { useIntersectionObserver } from "@/app/hooks/useIntersectionObserver";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
// Update the import path below if your hook is located elsewhere

// Mock blog data
const blogPosts = [
  {
    id: 1,
    title: "The History of Indonesian Spices",
    excerpt: "Discover how Indonesia became the 'Spice Islands' and its influence on global trade.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8xfFxpbnRlcm5hdGlvbmFsJTIwc3BpY2UlMjBobGlzdG9yeXxlbnwwfHx8fDE3MTc3NTE1MDJ8MA&auto=format&fit=crop&w=800&q=80 ",
    author: "Spice Experts Team",
    date: "April 5, 2025",
    category: "Culture & History",
    slug: "history-indonesian-spices",
  },
  {
    id: 2,
    title: "How to Store Spices Properly",
    excerpt: "Maximize flavor and shelf life with these expert tips on spice storage techniques.",
    image:
      "https://images.unsplash.com/photo-1602744581622-e14e3aee9966?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wzMTA3fDB8MHwxfHNlYXJjaHwxfHxzYWZlIHNwaWNlcyUyMHRpc3xlbnwwfHx8fDE3MTc3NTE1MjZ8MA&auto=format&fit=crop&w=800&q=80 ",
    author: "Chef Maya Suryadi",
    date: "March 28, 2025",
    category: "Tips & Guides",
    slug: "store-spices-properly",
  },
  {
    id: 3,
    title: "Top 5 Spices for Immune Support",
    excerpt: "Learn which spices are not only flavorful but also packed with health benefits.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wzMTA3fDB8MHwxfHNlYXJjaHwxfHxzcGljZXMlMjBmb3IlMjBob2FsdGhlJTIwZWZmZWN0cw&auto=format&fit=crop&w=800&q=80 ",
    author: "Dr. Sarah Lin",
    date: "March 15, 2025",
    category: "Health & Wellness",
    slug: "spices-immune-support",
  },
];

export const BlogSection = () => {
  const [activeCategory, setActiveCategory] = useState("All Articles");
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [isHovered, setIsHovered] = useState(false);

  // Categories extracted from posts
  const categories = ["All Articles", ...new Set(blogPosts.map((post) => post.category))];

  // Filter by category
  useEffect(() => {
    if (activeCategory === "All Articles") {
      setFilteredPosts(blogPosts);
    } else {
      setFilteredPosts(blogPosts.filter((post) => post.category === activeCategory));
    }
  }, [activeCategory]);

  // Intersection Observer for animation
  const [ref] = useIntersectionObserver(0.1);

  return (
    <section ref={ref} className="py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-amber-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-0.5 bg-gradient-to-r from-amber-600 to-orange-600"></div>
            <p className="font-semibold text-amber-800 uppercase tracking-wider text-sm">Insights & Stories</p>
            <div className="w-8 h-0.5 bg-gradient-to-r from-amber-600 to-orange-600"></div>
          </div>
          <h2 className="text-4xl font-bold text-[#4A2C1D] leading-tight mb-4">
            Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Latest Insights</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">Dive into stories about spices, culture, health benefits, and culinary traditions.</p>

          {/* Category Filter */}
          <div className="flex justify-center flex-wrap gap-3 mt-8">
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

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => <BlogCard key={post.id} post={post} />)
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="text-xl text-slate-600">No articles found in this category.</p>
            </div>
          )}
        </div>

        {!isHovered && (
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105"
            >
              View All Articles
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

// Blog Card Component
const BlogCard = ({ post }: { post: (typeof blogPosts)[0] }) => {
  const handleReadMore = () => {
    window.location.href = `/blog/${post.slug}`;
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group" style={{ minHeight: "400px" }}>
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        <div className="absolute bottom-4 left-4">
          <span className="inline-block px-3 py-1 bg-amber-600 text-white text-xs font-medium rounded-full">{post.category}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-2 group-hover:text-amber-700 transition-colors">{post.title}</h3>
        <p className="text-slate-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
          <span>By {post.author}</span>
          <span>{post.date}</span>
        </div>
        <button
          onClick={handleReadMore}
          className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-2 px-4 rounded-full font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <span className="text-sm">Read More</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};
