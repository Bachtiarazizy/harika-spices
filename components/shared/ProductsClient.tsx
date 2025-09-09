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
      <motion.section className="bg-[#392E20] py-12 md:py-20 px-4 md:px-6 relative overflow-hidden" initial="hidden" animate="visible" variants={staggerContainer}>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div className="text-center max-w-2xl mx-auto">
            <h1 className="text-white font-calistoga text-2xl md:text-4xl lg:text-5xl mb-4 md:mb-6 mt-8 md:mt-12 leading-tight px-2">Discover Our Premium Indonesian Spices</h1>
            <p className="text-gray-200 text-sm md:text-lg max-w-3xl mx-auto px-4">Authentic cloves, nutmeg, pepper and other spices ethically sourced, carefully selected, and ready for global trade.</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <motion.section className="py-12 md:py-20 px-4 md:px-16" initial="hidden" animate="visible" variants={staggerContainer}>
          <div className="max-w-7xl mx-auto">
            <motion.div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-calistoga text-[#392E20] mb-3 md:mb-4">Featured Products</h2>
              <p className="hidden md:block text-gray-600 text-medium md:text-lg max-w-2xl mx-auto">Our most popular and premium quality spices, carefully selected for their exceptional taste and aroma.</p>
            </motion.div>

            {/* Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {featuredProducts.map((product: SanityDocument, index: number) => (
                <motion.div key={product._id} whileHover={{ y: -8, transition: { duration: 0.3 } }} className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <Link href={`/products/${product.slug.current}`}>
                    <div className="relative">
                      {product.images?.[0]?.asset?.url && (
                        <div className="h-48 md:h-64 overflow-hidden">
                          <Image src={product.images[0].asset.url} alt={product.images[0].alt || product.name} width={400} height={300} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                      )}

                      {/* Featured Badge */}
                      <div className="absolute top-3 md:top-4 left-3 md:left-4 bg-amber-600 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold flex items-center gap-1">
                        <Star size={12} className="md:w-3.5 md:h-3.5" />
                        Featured
                      </div>

                      {/* New Badge */}
                      {product.newProduct && <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-green-600 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold">New</div>}
                    </div>

                    <div className="p-4 md:p-6">
                      <h3 className="text-lg md:text-xl font-calistoga text-[#392E20] group-hover:text-amber-700 transition-colors mb-2 leading-tight line-clamp-2">{product.name}</h3>

                      {product.scientificName && <p className="text-gray-500 text-xs md:text-sm italic mb-2 md:mb-3 line-clamp-1">{product.scientificName}</p>}

                      {product.shortDescription && <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-3 md:mb-4 line-clamp-2">{product.shortDescription}</p>}

                      <div className="flex items-center justify-between mb-3 md:mb-4">
                        <div className="flex items-center gap-2">
                          {getAvailabilityIcon(product.availability)}
                          <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${getAvailabilityColor(product.availability)}`}>{getAvailabilityText(product.availability)}</span>
                        </div>

                        {product.origin && (
                          <div className="flex items-center gap-1 text-gray-500 text-xs">
                            <MapPin size={10} className="md:w-3 md:h-3" />
                            <span className="truncate max-w-20">{product.origin}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-gray-100">
                        <span className="text-[#392E20] font-semibold group-hover:text-[#392E20]/70 transition-colors text-sm">View more</span>
                        <ArrowRight size={14} className="md:w-4 md:h-4 text-[#392E20] group-hover:translate-x-1 transition-transform" />
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
      <motion.section id="products-section" className="py-12 md:py-20 px-4 md:px-16 bg-gray-50" initial="hidden" animate="visible" variants={staggerContainer}>
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-calistoga text-[#392E20] mb-3 md:mb-4">All Products</h2>
            <p className="hidden md:block text-gray-600 text-medium md:text-lg max-w-3xl mx-auto">Explore our comprehensive range of premium spices sourced from Indonesia&apos;s finest farms.</p>
          </motion.div>

          {/* Search and Controls */}
          <motion.div className="mb-6 md:mb-8">
            {/* Top Row - Search and View Toggle */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-stretch sm:items-center justify-between mb-4 md:mb-6">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#392E20] focus:border-transparent shadow-sm transition-all text-sm md:text-base"
                />
              </div>

              {/* View Mode and Filter Toggle */}
              <div className="flex gap-2 md:gap-3 justify-end">
                {/* Filter Toggle for Mobile */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden bg-white border border-gray-200 px-3 md:px-4 py-3 md:py-4 rounded-xl flex items-center gap-2 md:gap-3 shadow-sm hover:shadow-md transition-all text-sm md:text-base"
                >
                  <Filter size={18} />
                  <span className="font-medium">Filters</span>
                  <div className={`w-2 h-2 rounded-full transition-all ${showFilters ? "bg-[#392E20]" : "bg-gray-300"}`} />
                </button>

                {/* View Mode Toggle */}
                <div className="flex bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                  <button onClick={() => setViewMode("grid")} className={`px-3 md:px-4 py-3 md:py-4 transition-all ${viewMode === "grid" ? "bg-[#392E20] text-white shadow-sm" : "text-gray-600 hover:bg-gray-50"}`}>
                    <Grid size={18} />
                  </button>
                  <button onClick={() => setViewMode("list")} className={`px-3 md:px-4 py-3 md:py-4 transition-all ${viewMode === "list" ? "bg-[#392E20] text-white shadow-sm" : "text-gray-600 hover:bg-gray-50"}`}>
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Filters Section */}
            <div className={`transition-all duration-300 ease-in-out ${showFilters ? "block opacity-100" : "hidden lg:block opacity-100"}`}>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                  {/* Category Filter */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#392E20] focus:bg-white transition-all text-sm md:text-base"
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
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#392E20] focus:bg-white transition-all text-sm md:text-base"
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
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#392E20] focus:bg-white transition-all text-sm md:text-base"
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
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all flex items-center justify-center gap-2 text-sm md:text-base"
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
          <motion.div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 md:gap-4 mb-6 md:mb-8">
            <div className="flex items-center gap-3 md:gap-4">
              <p className="text-gray-600 font-medium text-sm md:text-base">
                Showing <span className="text-[#392E20] font-semibold">{filteredAndSortedProducts.length}</span> of <span className="text-gray-800 font-semibold">{products.length}</span> products
              </p>
              {(searchTerm || selectedCategory !== "all" || selectedAvailability !== "all") && <span className="px-2 md:px-3 py-1 bg-[#392E20]/10 text-[#392E20] text-xs md:text-sm font-medium rounded-full">Filtered</span>}
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
              <div className={viewMode === "grid" ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6" : "space-y-3 md:space-y-4"}>
                {filteredAndSortedProducts.map((product: SanityDocument) => (
                  <motion.div key={product._id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100">
                    <Link href={`/products/${product.slug.current}`}>
                      <div className={viewMode === "grid" ? "" : "flex"}>
                        <div className={`relative ${viewMode === "grid" ? "" : "w-32 md:w-48 flex-shrink-0"}`}>
                          {product.images?.[0]?.asset?.url && (
                            <div className={viewMode === "grid" ? "h-40 md:h-48 overflow-hidden" : "h-24 md:h-32 overflow-hidden"}>
                              <Image
                                src={product.images[0].asset.url}
                                alt={product.images[0].alt || product.name}
                                width={viewMode === "grid" ? 300 : 192}
                                height={viewMode === "grid" ? 200 : 128}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                          )}

                          {/* Badges */}
                          <div className={`absolute ${viewMode === "grid" ? "top-2 md:top-3 left-2 md:left-3" : "top-1.5 md:top-2 left-1.5 md:left-2"} flex flex-col gap-1 md:gap-2`}>
                            {product.newProduct && <div className="bg-green-600 text-white px-1.5 md:px-2 py-0.5 md:py-1 rounded-lg text-xs font-semibold">New</div>}
                          </div>
                        </div>

                        <div className={viewMode === "grid" ? "p-3 md:p-4" : "p-3 md:p-4 flex-1"}>
                          <div className="flex items-start justify-between mb-1 md:mb-2">
                            <h3 className="font-calistoga text-[#392E20] group-hover:text-[#392E20]/70 transition-colors leading-tight text-sm md:text-lg line-clamp-2 flex-1 pr-2">{product.name}</h3>
                          </div>

                          {product.scientificName && <p className="text-gray-500 text-xs italic mb-2 line-clamp-1">{product.scientificName}</p>}

                          {product.shortDescription && viewMode === "grid" && <p className="text-gray-600 hidden md:block leading-relaxed text-xs mb-3 line-clamp-2">{product.shortDescription}</p>}

                          <div className="flex items-center justify-between pt-2 md:pt-3 border-t border-gray-100">
                            <span className="text-[#392E20] font-semibold group-hover:text-[#392E20]/70 transition-colors text-xs md:text-sm">View Details</span>
                            <ArrowRight size={14} className="text-[#392E20] group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div className="text-center py-12 md:py-16">
                <div className="w-24 md:w-32 h-24 md:h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                  <Search className="text-gray-400" size={32} />
                </div>
                <h3 className="text-xl md:text-2xl font-calistoga text-gray-600 mb-2 md:mb-3">No products found</h3>
                <p className="text-gray-500 mb-4 md:mb-6 max-w-md mx-auto text-sm md:text-base px-4">We couldn&apos;t find any products matching your search criteria. Try adjusting your filters or search terms.</p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setSelectedAvailability("all");
                    setSortBy("featured");
                  }}
                  className="bg-[#392E20] hover:bg-[#392E20]/80 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg text-sm md:text-base"
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
