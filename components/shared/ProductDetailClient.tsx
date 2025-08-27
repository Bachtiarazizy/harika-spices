/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// components/shared/ProductDetailClient.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { type SanityDocument } from "next-sanity";
import { Star, MapPin, Package, CheckCircle, AlertCircle, Clock, Calendar, Leaf, Award, Shield, Heart, Share2, Mail, Droplets, Clock3, ShoppingCart, Info, Send, X, ArrowRight, Phone, Building, User } from "lucide-react";
import { PortableText } from "@portabletext/react";

// const fadeInUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.6, ease: "easeInOut" },
//   },
// };

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

// PortableText components for custom styling
const portableTextComponents = {
  block: {
    normal: ({ children }: any) => <p className="mb-4 text-slate-700 leading-relaxed">{children}</p>,
    h1: ({ children }: any) => <h1 className="text-3xl font-bold mb-4 text-slate-900">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl font-semibold mb-3 text-slate-900">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-semibold mb-2 text-slate-900">{children}</h3>,
    blockquote: ({ children }: any) => <blockquote className="border-l-4 border-amber-500 pl-4 my-4 italic text-slate-600 bg-amber-50 py-2">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li className="text-slate-700">{children}</li>,
    number: ({ children }: any) => <li className="text-slate-700">{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-semibold text-slate-900">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ children, value }: any) => (
      <a href={value?.href} className="text-amber-600 hover:text-amber-700 underline" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

// Helper functions
const getAvailabilityColor = (availability: string) => {
  switch (availability) {
    case "available":
      return "text-emerald-700 bg-emerald-50 border-emerald-200";
    case "limited":
      return "text-amber-700 bg-amber-50 border-amber-200";
    case "preorder":
      return "text-blue-700 bg-blue-50 border-blue-200";
    case "unavailable":
      return "text-red-700 bg-red-50 border-red-200";
    case "seasonal":
      return "text-purple-700 bg-purple-50 border-purple-200";
    default:
      return "text-slate-700 bg-slate-50 border-slate-200";
  }
};

const getAvailabilityText = (availability: string) => {
  switch (availability) {
    case "available":
      return "In Stock";
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
      return <CheckCircle size={16} />;
    case "limited":
      return <AlertCircle size={16} />;
    case "preorder":
      return <Clock size={16} />;
    case "seasonal":
      return <Calendar size={16} />;
    default:
      return <AlertCircle size={16} />;
  }
};

const getHarvestSeasonText = (season: string) => {
  switch (season) {
    case "q1":
      return "Jan - Mar";
    case "q2":
      return "Apr - Jun";
    case "q3":
      return "Jul - Sep";
    case "q4":
      return "Oct - Dec";
    case "year_round":
      return "Year Round";
    default:
      return season;
  }
};

const getCertificationIcon = (cert: string) => {
  switch (cert) {
    case "organic":
      return <Leaf className="text-emerald-600" size={18} />;
    case "halal":
      return <Shield className="text-blue-600" size={18} />;
    case "haccp":
      return <Award className="text-purple-600" size={18} />;
    case "iso22000":
      return <Award className="text-red-600" size={18} />;
    case "fda":
      return <Shield className="text-blue-800" size={18} />;
    case "eu_organic":
      return <Leaf className="text-emerald-700" size={18} />;
    case "kosher":
      return <Shield className="text-indigo-600" size={18} />;
    case "fair_trade":
      return <Heart className="text-pink-600" size={18} />;
    default:
      return <Award className="text-slate-600" size={18} />;
  }
};

const getCertificationLabel = (cert: string) => {
  switch (cert) {
    case "organic":
      return "Organic Certified";
    case "halal":
      return "Halal Certified";
    case "haccp":
      return "HACCP";
    case "iso22000":
      return "ISO 22000";
    case "fda":
      return "FDA Approved";
    case "eu_organic":
      return "EU Organic";
    case "kosher":
      return "Kosher";
    case "fair_trade":
      return "Fair Trade";
    default:
      return cert;
  }
};

interface ProductDetailClientProps {
  product: SanityDocument;
  relatedProducts: SanityDocument[];
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    quantity: "",
    message: "",
    name: "",
    email: "",
    company: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/send-inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName: product.name,
          name: inquiryForm.name,
          email: inquiryForm.email,
          company: inquiryForm.company,
          quantity: inquiryForm.quantity,
          message: inquiryForm.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Reset form dan tutup modal
        setInquiryForm({
          quantity: "",
          message: "",
          name: "",
          email: "",
          company: "",
        });
        setShowInquiryModal(false);

        // Show success message
        alert("Thank you for your inquiry! We'll get back to you within 24 hours. A confirmation email has been sent to your address.");
      } else {
        setSubmitError(data.error || "Failed to send inquiry");
      }
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      setSubmitError("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.shortDescription,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Product link copied to clipboard!");
    }
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: Info },
    { id: "specifications", label: "Specifications", icon: Package },
    { id: "culinary", label: "Culinary Uses", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Breadcrumb */}
      <motion.div className="bg-[#392E20] backdrop-blur-sm py-10 px-6 md:px-16  " initial="hidden" animate="visible"></motion.div>
      {/* Breadcrumb */}
      <motion.div className="py-10 px-6 md:px-16  border-b border-slate-200" initial="hidden" animate="visible">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-amber-600 hover:text-amber-700 transition-colors">
              Home
            </Link>
            <span className="text-slate-400">/</span>
            <Link href="/products" className="text-amber-600 hover:text-amber-700 transition-colors">
              Products
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-700 font-medium">{product.name}</span>
          </nav>
        </div>
      </motion.div>

      {/* Product Header */}
      <motion.section className="py-16 px-6 md:px-16" initial="hidden" animate="visible" variants={staggerContainer}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Product Images */}
            <motion.div>
              <div className="space-y-6">
                {/* Main Image */}
                <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl overflow-hidden shadow-2xl">
                  {product.images?.[selectedImageIndex]?.asset?.url ? (
                    <Image
                      src={product.images[selectedImageIndex].asset.url}
                      alt={product.images[selectedImageIndex].alt || product.name}
                      width={600}
                      height={600}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package size={80} className="text-slate-400" />
                    </div>
                  )}
                </div>

                {/* Image Thumbnails */}
                {product.images && product.images.length > 1 && (
                  <div className="flex space-x-3 overflow-x-auto pb-2">
                    {product.images.map((image: any, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-3 transition-all duration-300 ${
                          selectedImageIndex === index ? "border-amber-500 shadow-lg scale-105" : "border-slate-200 hover:border-slate-300 hover:shadow-md"
                        }`}
                      >
                        <Image src={image.asset.url} alt={image.alt || product.name} width={96} height={96} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div className="space-y-8">
              {/* Badges */}
              <div className="flex flex-wrap gap-3">
                {product.featured && (
                  <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
                    <Star size={16} />
                    Featured Product
                  </span>
                )}
                {product.newProduct && <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">New Arrival</span>}
                <span className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 border ${getAvailabilityColor(product.availability)}`}>
                  {getAvailabilityIcon(product.availability)}
                  {getAvailabilityText(product.availability)}
                </span>
              </div>

              {/* Product Name & Scientific Name */}
              <div>
                <h1 className="text-4xl md:text-5xl font-calistoga text-slate-900 mb-4 leading-tight">{product.name}</h1>
                {product.scientificName && <p className="text-xl text-slate-600 italic mb-2">{product.scientificName}</p>}
                {product.category && (
                  <p className="text-amber-600 font-semibold text-lg">
                    {product.category.name}
                    {product.subCategory && ` • ${product.subCategory.name}`}
                  </p>
                )}
              </div>

              {/* Short Description */}
              {product.shortDescription && <p className="text-slate-700 text-xl leading-relaxed font-light">{product.shortDescription}</p>}

              {/* Key Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                {product.origin && (
                  <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <MapPin className="text-amber-600" size={20} />
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 font-medium">Origin</div>
                      <div className="font-semibold text-slate-900">{product.origin}</div>
                    </div>
                  </div>
                )}

                {product.harvestSeason && (
                  <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <Calendar className="text-emerald-600" size={20} />
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 font-medium">Harvest Season</div>
                      <div className="font-semibold text-slate-900">{getHarvestSeasonText(product.harvestSeason)}</div>
                    </div>
                  </div>
                )}

                {product.pricing?.priceRange && (
                  <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Package className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 font-medium">Price Range</div>
                      <div className="font-semibold text-slate-900">{product.pricing.priceRange}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => setShowInquiryModal(true)}
                  className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <Mail size={20} />
                  Request Quote
                </button>
                <button
                  onClick={handleShare}
                  className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg"
                >
                  <Share2 size={20} />
                  Share Product
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Product Details Tabs */}
      <motion.section className="py-16 px-6 md:px-16 bg-white" initial="hidden" animate="visible" variants={staggerContainer}>
        <div className="max-w-7xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-12 border-b border-slate-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-8 py-4 font-semibold rounded-t-xl transition-all duration-300 ${
                  activeTab === tab.id ? "bg-white text-amber-600 border-b-3 border-amber-600 shadow-lg -mb-px" : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                <tab.icon size={20} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-12">
                {/* Description */}
                {product.description && (
                  <div>
                    <h3 className="text-3xl font-calistoga text-slate-900 mb-6">Product Description</h3>
                    <div className="prose max-w-none text-slate-700 text-lg leading-relaxed">
                      <PortableText value={product.description} components={portableTextComponents} />
                    </div>
                  </div>
                )}

                {/* Common Names */}
                {product.commonNames && product.commonNames.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-900 mb-6">Common Names</h3>
                    <div className="flex flex-wrap gap-3">
                      {product.commonNames.map((name: string, index: number) => (
                        <span key={index} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium border border-slate-200">
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Flavor Profile */}
                {product.flavor && (
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-900 mb-6">Flavor Profile</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      {product.flavor.taste && (
                        <div className="p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl border border-amber-200">
                          <h4 className="font-semibold text-amber-800 mb-4 text-lg">Primary Taste</h4>
                          <div className="flex flex-wrap gap-2">
                            {product.flavor.taste.map((taste: string, index: number) => (
                              <span key={index} className="px-3 py-1 bg-amber-200 text-amber-800 rounded-lg text-sm font-medium">
                                {taste}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {product.flavor.intensity && (
                        <div className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl border border-emerald-200">
                          <h4 className="font-semibold text-emerald-800 mb-4 text-lg">Intensity</h4>
                          <span className="px-4 py-2 bg-emerald-200 text-emerald-800 rounded-full text-sm font-medium capitalize">{product.flavor.intensity.replace("_", " ")}</span>
                        </div>
                      )}

                      {product.flavor.aroma && (
                        <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200">
                          <h4 className="font-semibold text-purple-800 mb-4 text-lg">Aroma</h4>
                          <p className="text-purple-700 text-sm leading-relaxed">{product.flavor.aroma}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Specifications Tab */}
            {activeTab === "specifications" && product.specifications && (
              <div className="space-y-12">
                <h3 className="text-3xl font-calistoga text-slate-900 mb-8">Technical Specifications</h3>

                <div className="grid md:grid-cols-2 gap-12">
                  {/* Quality Parameters */}
                  <div className="space-y-6">
                    <h4 className="text-xl font-semibold text-slate-900 mb-6">Quality Parameters</h4>

                    {product.specifications.moisture && (
                      <div className="flex items-center justify-between p-5 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-200 rounded-lg">
                            <Droplets className="text-blue-600" size={18} />
                          </div>
                          <span className="text-blue-800 font-medium">Moisture Content</span>
                        </div>
                        <span className="font-bold text-blue-800 text-lg">{product.specifications.moisture}%</span>
                      </div>
                    )}

                    {product.specifications.purity && (
                      <div className="flex items-center justify-between p-5 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-emerald-200 rounded-lg">
                            <Award className="text-emerald-600" size={18} />
                          </div>
                          <span className="text-emerald-800 font-medium">Purity</span>
                        </div>
                        <span className="font-bold text-emerald-800 text-lg">{product.specifications.purity}%</span>
                      </div>
                    )}

                    {product.specifications.shelfLife && (
                      <div className="flex items-center justify-between p-5 bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl border border-amber-200">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-amber-200 rounded-lg">
                            <Clock3 className="text-amber-600" size={18} />
                          </div>
                          <span className="text-amber-800 font-medium">Shelf Life</span>
                        </div>
                        <span className="font-bold text-amber-800 text-lg">{product.specifications.shelfLife} months</span>
                      </div>
                    )}
                  </div>

                  {/* Packaging & Storage */}
                  <div className="space-y-6">
                    <h4 className="text-xl font-semibold text-slate-900 mb-6">Packaging & Storage</h4>

                    {product.specifications.packaging && (
                      <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                        <h5 className="font-semibold text-purple-800 mb-4 text-lg">Available Packaging</h5>
                        <div className="flex flex-wrap gap-2">
                          {product.specifications.packaging.map((pkg: string, index: number) => (
                            <span key={index} className="px-3 py-2 bg-purple-200 text-purple-800 rounded-lg text-sm font-medium">
                              {pkg}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {product.specifications.storage && (
                      <div className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
                        <h5 className="font-semibold text-slate-800 mb-4 text-lg">Storage Conditions</h5>
                        <p className="text-slate-700 text-sm leading-relaxed">{product.specifications.storage}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            {activeTab === "culinary" && product.culinaryUses && product.culinaryUses.length > 0 && (
              <div className="space-y-12">
                <h3 className="text-3xl font-calistoga text-slate-900 mb-8">Technical Specifications</h3>

                <div className="grid md:grid-cols-2 gap-12">
                  {/* Quality Parameters */}
                  <div className="space-y-6">
                    <h4 className="text-xl font-semibold text-slate-900 mb-6">Culinary Use</h4>

                    {product.culinaryUses.map((use: string, index: number) => (
                      <div key={index} className="flex items-start gap-4 p-6 bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl border border-amber-200 hover:shadow-md transition-shadow">
                        <CheckCircle className="text-amber-600 mt-1 flex-shrink-0" size={20} />
                        <span className="text-amber-800 font-medium leading-relaxed">{use}</span>
                      </div>
                    ))}
                  </div>

                  {/* Packaging & Storage */}
                  <div className="space-y-6">
                    <h4 className="text-xl font-semibold text-slate-900 mb-6">Health Benefits</h4>

                    {/* Health Benefits */}
                    {product.healthBenefits && product.healthBenefits.length > 0 && (
                      <div>
                        {product.healthBenefits.map((benefit: string, index: number) => (
                          <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200">
                            <CheckCircle className="text-emerald-600 mt-1 flex-shrink-0" size={20} />
                            <span className="text-emerald-800 text-sm font-medium leading-relaxed">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Related Products Section */}
      {relatedProducts && relatedProducts.length > 0 && (
        <motion.section className="py-16 px-6 md:px-16 bg-gradient-to-b from-slate-50 to-white" initial="hidden" animate="visible" variants={staggerContainer}>
          <div className="max-w-7xl mx-auto">
            <motion.h2 className="text-3xl font-calistoga text-slate-900 text-center mb-12">Related Products</motion.h2>
            <motion.div className="grid md:grid-cols-3 lg:grid-cols-3 gap-8" variants={staggerContainer}>
              {relatedProducts.slice(0, 3).map((relatedProduct: SanityDocument, index: number) => (
                <motion.div key={relatedProduct._id} className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200">
                  <div className="aspect-square bg-slate-100 overflow-hidden">
                    {relatedProduct.images?.[0]?.asset?.url ? (
                      <Image
                        src={relatedProduct.images[0].asset.url}
                        alt={relatedProduct.images[0].alt || relatedProduct.name}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package size={48} className="text-slate-400" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">{relatedProduct.name}</h3>
                    {relatedProduct.shortDescription && <p className="text-slate-600 text-sm mb-4 line-clamp-2">{relatedProduct.shortDescription}</p>}
                    <Link href={`/products/${relatedProduct.slug?.current}`} className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium text-sm group-hover:gap-3 transition-all">
                      View Details
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Inquiry Modal */}
      {showInquiryModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-calistoga text-slate-900">Product Inquiry</h2>
                  <p className="text-slate-600 mt-1">Get a personalized quote for {product.name}</p>
                </div>
                <button onClick={() => setShowInquiryModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X size={24} className="text-slate-500" />
                </button>
              </div>

              {/* Inquiry Form */}
              <form onSubmit={handleInquirySubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      <User size={16} className="inline mr-2" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={inquiryForm.name}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      <Mail size={16} className="inline mr-2" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={inquiryForm.email}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      <Building size={16} className="inline mr-2" />
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={inquiryForm.company}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, company: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                      placeholder="Your company name (optional)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      <Package size={16} className="inline mr-2" />
                      Required Quantity
                    </label>
                    <input
                      type="text"
                      value={inquiryForm.quantity}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, quantity: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                      placeholder="e.g., 100kg, 5 tons"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Additional Message</label>
                  <textarea
                    rows={4}
                    value={inquiryForm.message}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Any specific requirements, delivery location, or questions..."
                  />
                </div>

                {/* Error message */}
                {submitError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 flex items-center gap-2">
                    <AlertCircle size={18} />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Inquiry
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowInquiryModal(false)}
                    disabled={isSubmitting}
                    className="flex-1 border-2 border-slate-300 text-slate-700 hover:bg-slate-50 px-6 py-4 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>

                {/* Contact Info */}
                <div className="pt-6 border-t border-slate-200">
                  <p className="text-sm text-slate-600 text-center">
                    Or contact us directly:{" "}
                    <span className="inline-flex items-center gap-1 text-amber-600 font-medium">
                      <Phone size={14} />
                      +90 (542) 179-3483
                    </span>{" "}
                    |{" "}
                    <span className="inline-flex items-center gap-1 text-amber-600 font-medium">
                      <Mail size={14} />
                      info@harikaspices.com
                    </span>
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
