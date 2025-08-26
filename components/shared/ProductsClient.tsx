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
      <motion.section className="bg-gradient-to-br from-[#392E20] via-[#4A3B28] to-[#392E20] py-20 px-6 relative overflow-hidden" initial="hidden" animate="visible" variants={staggerContainer}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-6 px-4 py-2 bg-amber-600/20 border border-amber-500/30 rounded-full">
              <span className="text-amber-200 text-sm font-semibold tracking-wide">PREMIUM QUALITY</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-calistoga text-white mb-6 leading-tight">Indonesian Spices & Products</h1>

            <p className="text-xl text-amber-100 leading-relaxed mb-8 max-w-3xl mx-auto">
              Discover our premium collection of authentic Indonesian spices and agricultural products, sourced directly from local farmers and processed with the highest quality standards.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => document.getElementById("products-section")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors flex items-center gap-2 justify-center"
              >
                <Package size={20} />
                Browse Products
              </button>
              <Link href="/contact" className="bg-transparent border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-4 rounded-xl font-semibold transition-colors flex items-center gap-2 justify-center">
                <ArrowRight size={20} />
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section className="py-16 px-6 bg-gray-50" initial="hidden" animate="visible" variants={staggerContainer}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div className="text-center">
              <div className="w-16 h-16 bg-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Package className="text-white" size={24} />
              </div>
              <div className="text-3xl font-calistoga text-[#392E20] mb-2">{products.length}+</div>
              <div className="text-gray-600">Products</div>
            </motion.div>

            <motion.div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="text-white" size={24} />
              </div>
              <div className="text-3xl font-calistoga text-[#392E20] mb-2">{featuredProducts.length}</div>
              <div className="text-gray-600">Featured</div>
            </motion.div>

            <motion.div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-white" size={24} />
              </div>
              <div className="text-3xl font-calistoga text-[#392E20] mb-2">{categories.length}</div>
              <div className="text-gray-600">Categories</div>
            </motion.div>

            <motion.div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Leaf className="text-white" size={24} />
              </div>
              <div className="text-3xl font-calistoga text-[#392E20] mb-2">100%</div>
              <div className="text-gray-600">Natural</div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <motion.section className="py-20 px-6" initial="hidden" animate="visible" variants={staggerContainer}>
          <div className="max-w-7xl mx-auto">
            <motion.div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-calistoga text-[#392E20] mb-4">Featured Products</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">Our most popular and premium quality spices, carefully selected for their exceptional taste and aroma.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product: SanityDocument, index: number) => (
                <motion.div key={product._id} whileHover={{ y: -8, transition: { duration: 0.3 } }} className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-amber-200">
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
                        <span className="text-amber-600 font-semibold group-hover:text-amber-700 transition-colors">Learn More</span>
                        <ArrowRight size={16} className="text-amber-600 group-hover:translate-x-1 transition-transform" />
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
      <motion.section id="products-section" className="py-20 px-6 bg-gray-50" initial="hidden" animate="visible" variants={staggerContainer}>
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-calistoga text-[#392E20] mb-4">All Products</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Browse our complete collection of premium Indonesian spices and agricultural products.</p>
          </motion.div>

          {/* Filters and Search */}
          <motion.div className="mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              {/* Filter Toggle */}
              <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden bg-white border border-gray-200 px-4 py-3 rounded-xl flex items-center gap-2">
                <Filter size={18} />
                Filters
              </button>

              {/* View Mode Toggle */}
              <div className="flex bg-white border border-gray-200 rounded-xl p-1">
                <button onClick={() => setViewMode("grid")} className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-amber-600 text-white" : "text-gray-600 hover:text-amber-600"}`}>
                  <Grid size={18} />
                </button>
                <button onClick={() => setViewMode("list")} className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-amber-600 text-white" : "text-gray-600 hover:text-amber-600"}`}>
                  <List size={18} />
                </button>
              </div>
            </div>

            {/* Filters Row */}
            <div className={`mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-300 ${showFilters ? "block" : "hidden lg:grid"}`}>
              {/* Category Filter */}
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500">
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>

              {/* Availability Filter */}
              <select value={selectedAvailability} onChange={(e) => setSelectedAvailability(e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500">
                {availabilityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {/* Sort */}
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500">
                <option value="featured">Featured First</option>
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
                <option value="new">New Products</option>
              </select>
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredAndSortedProducts.length} of {products.length} products
            </p>
          </motion.div>

          {/* Products Grid/List */}
          <motion.div variants={staggerContainer}>
            {filteredAndSortedProducts.length > 0 ? (
              <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}>
                {filteredAndSortedProducts.map((product: SanityDocument) => (
                  <motion.div
                    key={product._id}
                    className={
                      viewMode === "grid"
                        ? "group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
                        : "group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
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
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                          )}

                          {/* Badges */}
                          <div className={`absolute ${viewMode === "grid" ? "top-3 left-3" : "top-2 left-2"} flex flex-col gap-2`}>
                            {product.featured && (
                              <div className="bg-amber-600 text-white px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                                <Star size={10} />
                                Featured
                              </div>
                            )}
                            {product.newProduct && <div className="bg-green-600 text-white px-2 py-1 rounded-lg text-xs font-semibold">New</div>}
                          </div>
                        </div>

                        <div className={viewMode === "grid" ? "p-4" : "p-4 flex-1"}>
                          <div className={`flex items-start justify-between ${viewMode === "grid" ? "mb-2" : "mb-1"}`}>
                            <h3 className={`font-calistoga text-[#392E20] group-hover:text-amber-700 transition-colors leading-tight ${viewMode === "grid" ? "text-lg" : "text-xl"}`}>{product.name}</h3>
                          </div>

                          {product.scientificName && <p className={`text-gray-500 italic ${viewMode === "grid" ? "text-sm mb-2" : "text-sm mb-1"}`}>{product.scientificName}</p>}

                          {product.shortDescription && <p className={`text-gray-600 leading-relaxed ${viewMode === "grid" ? "text-sm mb-3 line-clamp-2" : "text-sm mb-2 line-clamp-1"}`}>{product.shortDescription}</p>}

                          <div className={`flex flex-wrap gap-2 ${viewMode === "grid" ? "mb-3" : "mb-2"}`}>
                            <div className="flex items-center gap-2">
                              {getAvailabilityIcon(product.availability)}
                              <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${getAvailabilityColor(product.availability)}`}>{getAvailabilityText(product.availability)}</span>
                            </div>

                            {product.category && <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">{product.category.name}</span>}

                            {product.origin && (
                              <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg">
                                <MapPin size={10} />
                                {product.origin}
                              </div>
                            )}
                          </div>

                          {product.pricing?.priceRange && (
                            <div className={`flex items-center gap-2 ${viewMode === "grid" ? "mb-3" : "mb-2"}`}>
                              <DollarSign size={14} className="text-green-600" />
                              <span className="text-green-600 font-semibold text-sm">{product.pricing.priceRange}</span>
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <span className="text-amber-600 font-semibold group-hover:text-amber-700 transition-colors text-sm">View Details</span>
                            <ArrowRight size={16} className="text-amber-600 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="text-gray-400" size={32} />
                </div>
                <h3 className="text-xl font-calistoga text-gray-600 mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria.</p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setSelectedAvailability("all");
                  }}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section className="bg-gradient-to-br from-[#392E20] to-[#4A3B28] py-20 px-6 relative overflow-hidden" initial="hidden" animate="visible">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-amber-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-amber-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6 px-4 py-2 bg-amber-600/20 border border-amber-500/30 rounded-full">
            <span className="text-amber-200 text-sm font-semibold tracking-wide">READY TO ORDER?</span>
          </div>

          <h2 className="text-white text-3xl md:text-4xl font-calistoga mb-4 leading-tight">Get Premium Indonesian Spices</h2>

          <p className="text-amber-100 text-lg mb-8 max-w-2xl mx-auto">Contact us today to discuss your requirements, get quotes, and place orders for our premium quality spices.</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors flex items-center gap-2 justify-center">
              <ArrowRight size={20} />
              Contact Us
            </Link>
            <Link href="/about" className="bg-transparent border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-4 rounded-xl font-semibold transition-colors flex items-center gap-2 justify-center">
              <Eye size={20} />
              Learn More
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
