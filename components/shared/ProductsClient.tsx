/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { type SanityDocument } from "next-sanity";
import { Search, Filter, Grid, List, Star, Leaf, MapPin, Package, Award, TrendingUp, Clock, DollarSign, CheckCircle, AlertCircle, Calendar, ArrowRight, Tag, Eye, Heart } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.6,
    },
  },
};

// Helper functions
const getAvailabilityColor = (availability: string) => {
  switch (availability) {
    case "available":
      return "text-green-600 bg-green-100";
    case "limited":
      return "text-yellow-600 bg-yellow-100";
    case "preorder":
      return "text-blue-600 bg-blue-100";
    case "unavailable":
      return "text-red-600 bg-red-100";
    case "seasonal":
      return "text-purple-600 bg-purple-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

const getAvailabilityText = (availability: string) => {
  switch (availability) {
    case "available":
      return "Available";
    case "limited":
      return "Limited Stock";
    case "preorder":
      return "Pre-order";
    case "unavailable":
      return "Out of Stock";
    case "seasonal":
      return "Seasonal";
    default:
      return "Unknown";
  }
};

const getAvailabilityIcon = (availability: string) => {
  switch (availability) {
    case "available":
      return <CheckCircle size={14} />;
    case "limited":
      return <AlertCircle size={14} />;
    case "preorder":
      return <Clock size={14} />;
    case "seasonal":
      return <Calendar size={14} />;
    default:
      return <AlertCircle size={14} />;
  }
};

const getHarvestSeasonText = (season: string) => {
  switch (season) {
    case "q1":
      return "Jan-Mar";
    case "q2":
      return "Apr-Jun";
    case "q3":
      return "Jul-Sep";
    case "q4":
      return "Oct-Dec";
    case "year_round":
      return "Year Round";
    default:
      return season;
  }
};

interface ProductsClientProps {
  products: SanityDocument[];
  categories: SanityDocument[];
}

export default function ProductsClient({ products, categories }: ProductsClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedAvailability, setSelectedAvailability] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  // Filter dan sort products
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.scientificName?.toLowerCase().includes(searchTerm.toLowerCase()) || product.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === "all" || product.category?._id === selectedCategory;

      const matchesAvailability = selectedAvailability === "all" || product.availability === selectedAvailability;

      return matchesSearch && matchesCategory && matchesAvailability;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "featured":
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          if (a.newProduct && !b.newProduct) return -1;
          if (!a.newProduct && b.newProduct) return 1;
          return a.name.localeCompare(b.name);
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "new":
          if (a.newProduct && !b.newProduct) return -1;
          if (!a.newProduct && b.newProduct) return 1;
          return 0;
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, searchTerm, selectedCategory, selectedAvailability, sortBy]);

  const featuredProducts = products.filter((product) => product.featured).slice(0, 3);
  const availabilityOptions = [
    { value: "all", label: "All Availability" },
    { value: "available", label: "Available" },
    { value: "limited", label: "Limited Stock" },
    { value: "preorder", label: "Pre-order" },
    { value: "seasonal", label: "Seasonal" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section className="bg-[#392E20] py-20 px-6 relative overflow-hidden" initial="hidden" animate="visible" variants={staggerContainer}>
        {/* Background Pattern */}

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-calistoga text-white mb-6 mt-12 leading-tight">Discover Our Premium Indonesian Spices</h1>

            <p className="text-lg md:text-xl text-gray-100 leading-relaxed mb-8 max-w-3xl mx-auto">Authentic cloves, nutmeg, pepper and other spices ethically sourced, carefully selected, and ready for global trade.</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <motion.section className="py-20 px-6 md:px-16" initial="hidden" animate="visible" variants={staggerContainer}>
          <div className="max-w-7xl mx-auto">
            <motion.div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-calistoga text-[#392E20] mb-4">Featured Products</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">Our most popular and premium quality spices, carefully selected for their exceptional taste and aroma.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product: SanityDocument, index: number) => (
                <motion.div key={product._id} whileHover={{ y: -8, transition: { duration: 0.3 } }} className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <Link href={`/products/${product.slug.current}`}>
                    <div className="relative">
                      {product.images?.[0]?.asset?.url && (
                        <div className="h-64 overflow-hidden">
                          <Image src={product.images[0].asset.url} alt={product.images[0].alt || product.name} width={400} height={300} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                      )}

                      {/* Featured Badge */}
                      <div className="absolute top-4 left-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                        <Star size={14} />
                        Featured
                      </div>

                      {/* New Badge */}
                      {product.newProduct && <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">New</div>}
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-calistoga text-[#392E20] group-hover:text-amber-700 transition-colors mb-2 leading-tight">{product.name}</h3>

                      {product.scientificName && <p className="text-gray-500 text-sm italic mb-3">{product.scientificName}</p>}

                      {product.shortDescription && <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">{product.shortDescription}</p>}

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          {getAvailabilityIcon(product.availability)}
                          <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${getAvailabilityColor(product.availability)}`}>{getAvailabilityText(product.availability)}</span>
                        </div>

                        {product.origin && (
                          <div className="flex items-center gap-1 text-gray-500 text-xs">
                            <MapPin size={12} />
                            {product.origin}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-[#392E20] font-semibold group-hover:text-[#392E20]/70 transition-colors">View more</span>
                        <ArrowRight size={16} className="text-[#392E20] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Products Section */}
      <motion.section id="products-section" className="py-20 px-6 md:px-16 bg-gray-50" initial="hidden" animate="visible" variants={staggerContainer}>
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-calistoga text-[#392E20] mb-4">All Products</h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">Explore our comprehensive range of premium spices sourced from Indonesia&apos;s finest farms.</p>
          </motion.div>

          {/* Search and Controls */}
          <motion.div className="mb-8">
            {/* Top Row - Search and View Toggle */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between mb-6">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#392E20] focus:border-transparent shadow-sm transition-all"
                />
              </div>

              {/* View Mode and Filter Toggle */}
              <div className="flex gap-3 justify-end">
                {/* Filter Toggle for Mobile */}
                <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden bg-white border border-gray-200 px-4 py-4 rounded-xl flex items-center gap-3 shadow-sm hover:shadow-md transition-all">
                  <Filter size={20} />
                  <span className="font-medium">Filters</span>
                  <div className={`w-2 h-2 rounded-full transition-all ${showFilters ? "bg-[#392E20]" : "bg-gray-300"}`} />
                </button>

                {/* View Mode Toggle */}
                <div className="flex bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                  <button onClick={() => setViewMode("grid")} className={`px-4 py-4 transition-all ${viewMode === "grid" ? "bg-[#392E20] text-white shadow-sm" : "text-gray-600 hover:bg-gray-50"}`}>
                    <Grid size={20} />
                  </button>
                  <button onClick={() => setViewMode("list")} className={`px-4 py-4 transition-all ${viewMode === "list" ? "bg-[#392E20] text-white shadow-sm" : "text-gray-600 hover:bg-gray-50"}`}>
                    <List size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Filters Section */}
            <div className={`transition-all duration-300 ease-in-out ${showFilters ? "block opacity-100" : "hidden lg:block opacity-100"}`}>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Category Filter */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#392E20] focus:bg-white transition-all"
                    >
                      <option value="all">All Categories</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Availability Filter */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Availability</label>
                    <select
                      value={selectedAvailability}
                      onChange={(e) => setSelectedAvailability(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#392E20] focus:bg-white transition-all"
                    >
                      {availabilityOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sort Options */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#392E20] focus:bg-white transition-all"
                    >
                      <option value="featured">Featured First</option>
                      <option value="name-asc">Name A-Z</option>
                      <option value="name-desc">Name Z-A</option>
                      <option value="new">New Products</option>
                    </select>
                  </div>

                  {/* Clear Filters Button */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Actions</label>
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedCategory("all");
                        setSelectedAvailability("all");
                        setSortBy("featured");
                      }}
                      className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                    >
                      <Filter size={16} />
                      Clear All
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results Summary */}
          <motion.div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center gap-4">
              <p className="text-gray-600 font-medium">
                Showing <span className="text-[#392E20] font-semibold">{filteredAndSortedProducts.length}</span> of <span className="text-gray-800 font-semibold">{products.length}</span> products
              </p>
              {(searchTerm || selectedCategory !== "all" || selectedAvailability !== "all") && <span className="px-3 py-1 bg-[#392E20]/10 text-[#392E20] text-sm font-medium rounded-full">Filtered</span>}
            </div>

            {/* Quick Stats */}
            <div className="hidden md:flex items-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                {products.filter((p) => !p.outOfStock).length} Available
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                {products.filter((p) => p.newProduct).length} New
              </span>
            </div>
          </motion.div>

          {/* Products Grid/List */}
          <motion.div variants={staggerContainer}>
            {filteredAndSortedProducts.length > 0 ? (
              <div className={viewMode === "grid" ? "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}>
                {filteredAndSortedProducts.map((product: SanityDocument) => (
                  <motion.div
                    key={product._id}
                    className={
                      viewMode === "grid"
                        ? "group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100"
                        : "group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100"
                    }
                  >
                    <Link href={`/products/${product.slug.current}`}>
                      <div className={viewMode === "grid" ? "" : "flex"}>
                        <div className={`relative ${viewMode === "grid" ? "" : "w-48 flex-shrink-0"}`}>
                          {product.images?.[0]?.asset?.url && (
                            <div className={viewMode === "grid" ? "h-48 overflow-hidden" : "h-32 overflow-hidden"}>
                              <Image
                                src={product.images[0].asset.url}
                                alt={product.images[0].alt || product.name}
                                width={viewMode === "grid" ? 300 : 192}
                                height={viewMode === "grid" ? 200 : 128}
                                className="w-full h-full aspect-[4/3] object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                          )}

                          {/* Badges */}
                          <div className={`absolute ${viewMode === "grid" ? "top-3 left-3" : "top-2 left-2"} flex flex-col gap-2`}>
                            {product.newProduct && <div className="bg-green-600 text-white px-2 py-1 rounded-lg text-xs font-semibold">New</div>}
                          </div>
                        </div>

                        <div className={viewMode === "grid" ? "p-4" : "p-4 flex-1"}>
                          <div className={`flex items-start justify-between ${viewMode === "grid" ? "mb-2" : "mb-1"}`}>
                            <h3 className={`font-calistoga text-[#392E20] group-hover:text-[#392E20]/70 transition-colors leading-tight text-medium md:text-lg`}>{product.name}</h3>
                          </div>

                          {product.scientificName && <p className={`text-gray-500 hidden md:block italic  ${viewMode === "grid" ? "text-sm mb-2" : "text-sm mb-1"}`}>{product.scientificName}</p>}

                          {product.shortDescription && <p className="text-gray-600 leading-relaxed  text-sm mb-3 line-clamp-2">{product.shortDescription}</p>}

                          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <span className="text-[#392E20] font-semibold group-hover:text-[#392E20]/70 transition-colors text-sm">View Details</span>
                            <ArrowRight size={16} className="text-[#392E20] group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div className="text-center py-16">
                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="text-gray-400" size={48} />
                </div>
                <h3 className="text-2xl font-calistoga text-gray-600 mb-3">No products found</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">We couldn&apos;t find any products matching your search criteria. Try adjusting your filters or search terms.</p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setSelectedAvailability("all");
                    setSortBy("featured");
                  }}
                  className="bg-[#392E20] hover:bg-[#392E20]/80 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
