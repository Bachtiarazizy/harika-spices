/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// components/shared/ProductDetailClient.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { type SanityDocument } from "next-sanity";
import { Star, MapPin, Package, CheckCircle, AlertCircle, Clock, Calendar, Leaf, Award, Shield, Heart, Share2, Mail, Globe, Thermometer, Droplets, Clock3, ShoppingCart, Info } from "lucide-react";

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

// Helper functions (same as ProductsClient)
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
      return "January - March";
    case "q2":
      return "April - June";
    case "q3":
      return "July - September";
    case "q4":
      return "October - December";
    case "year_round":
      return "Year Round";
    default:
      return season;
  }
};

const getCertificationIcon = (cert: string) => {
  switch (cert) {
    case "organic":
      return <Leaf className="text-green-600" size={16} />;
    case "halal":
      return <Shield className="text-blue-600" size={16} />;
    case "haccp":
      return <Award className="text-purple-600" size={16} />;
    case "iso22000":
      return <Award className="text-red-600" size={16} />;
    case "fda":
      return <Shield className="text-blue-800" size={16} />;
    case "eu_organic":
      return <Leaf className="text-green-700" size={16} />;
    case "kosher":
      return <Shield className="text-indigo-600" size={16} />;
    case "fair_trade":
      return <Heart className="text-pink-600" size={16} />;
    default:
      return <Award className="text-gray-600" size={16} />;
  }
};

const getCertificationLabel = (cert: string) => {
  switch (cert) {
    case "organic":
      return "Organic";
    case "halal":
      return "Halal";
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
  const [inquiryForm, setInquiryForm] = useState({
    quantity: "",
    message: "",
    name: "",
    email: "",
    company: "",
  });

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - could integrate with email service
    console.log("Inquiry submitted:", inquiryForm);
    alert("Thank you for your inquiry! We'll get back to you soon.");
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
      alert("Link copied to clipboard!");
    }
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: Info },
    { id: "specifications", label: "Specifications", icon: Package },
    { id: "nutrition", label: "Nutrition", icon: Leaf },
    { id: "culinary", label: "Culinary Uses", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <motion.div className="bg-gray-50 py-4 px-6" initial="hidden" animate="visible">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-amber-600 hover:text-amber-700">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/products" className="text-amber-600 hover:text-amber-700">
              Products
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{product.name}</span>
          </nav>
        </div>
      </motion.div>

      {/* Product Header */}
      <motion.section className="py-12 px-6" initial="hidden" animate="visible" variants={staggerContainer}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <motion.div>
              <div className="space-y-4">
                {/* Main Image */}
                <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                  {product.images?.[selectedImageIndex]?.asset?.url ? (
                    <Image src={product.images[selectedImageIndex].asset.url} alt={product.images[selectedImageIndex].alt || product.name} width={600} height={600} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package size={64} className="text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Image Thumbnails */}
                {product.images && product.images.length > 1 && (
                  <div className="flex space-x-2 overflow-x-auto">
                    {product.images.map((image: any, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${selectedImageIndex === index ? "border-amber-600" : "border-gray-200 hover:border-gray-300"}`}
                      >
                        <Image src={image.asset.url} alt={image.alt || product.name} width={80} height={80} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div className="space-y-6">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {product.featured && (
                  <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star size={14} />
                    Featured
                  </span>
                )}
                {product.newProduct && <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">New</span>}
                <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 ${getAvailabilityColor(product.availability)}`}>
                  {getAvailabilityIcon(product.availability)}
                  {getAvailabilityText(product.availability)}
                </span>
              </div>

              {/* Product Name & Scientific Name */}
              <div>
                <h1 className="text-3xl md:text-4xl font-calistoga text-[#392E20] mb-2">{product.name}</h1>
                {product.scientificName && <p className="text-lg text-gray-600 italic">{product.scientificName}</p>}
                {product.category && (
                  <p className="text-amber-600 font-semibold mt-1">
                    {product.category.name}
                    {product.subCategory && ` • ${product.subCategory.name}`}
                  </p>
                )}
              </div>

              {/* Short Description */}
              {product.shortDescription && <p className="text-gray-700 text-lg leading-relaxed">{product.shortDescription}</p>}

              {/* Key Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                {product.origin && (
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="text-amber-600" size={18} />
                    <div>
                      <div className="text-sm text-gray-600">Origin</div>
                      <div className="font-semibold">{product.origin}</div>
                    </div>
                  </div>
                )}

                {product.harvestSeason && (
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="text-green-600" size={18} />
                    <div>
                      <div className="text-sm text-gray-600">Harvest</div>
                      <div className="font-semibold">{getHarvestSeasonText(product.harvestSeason)}</div>
                    </div>
                  </div>
                )}

                {product.pricing?.priceRange && (
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Package className="text-blue-600" size={18} />
                    <div>
                      <div className="text-sm text-gray-600">Price Range</div>
                      <div className="font-semibold">{product.pricing.priceRange}</div>
                    </div>
                  </div>
                )}

                {product.minimumOrder && (
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <ShoppingCart className="text-purple-600" size={18} />
                    <div>
                      <div className="text-sm text-gray-600">Min. Order</div>
                      <div className="font-semibold">{product.minimumOrder}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
                  <Mail size={20} />
                  Request Quote
                </Link>
                <button onClick={handleShare} className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
                  <Share2 size={20} />
                  Share Product
                </button>
              </div>

              {/* Certifications */}
              {product.specifications?.certifications && product.specifications.certifications.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-[#392E20] mb-3">Certifications</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.specifications.certifications.map((cert: string, index: number) => (
                      <div key={index} className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg">
                        {getCertificationIcon(cert)}
                        <span className="text-sm font-medium">{getCertificationLabel(cert)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Product Details Tabs */}
      <motion.section className="py-12 px-6 bg-gray-50" initial="hidden" animate="visible" variants={staggerContainer}>
        <div className="max-w-7xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-t-lg transition-colors ${activeTab === tab.id ? "bg-white text-amber-600 border-b-2 border-amber-600" : "text-gray-600 hover:text-gray-800"}`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-white rounded-2xl p-8">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Description */}
                {product.description && (
                  <div>
                    <h3 className="text-2xl font-calistoga text-[#392E20] mb-4">Product Description</h3>
                    {/* Note: In real implementation, you'd render rich text blocks here */}
                    <div className="prose max-w-none text-gray-700">
                      <p>Detailed product description would be rendered here from Sanity&apos;s block content.</p>
                    </div>
                  </div>
                )}

                {/* Common Names */}
                {product.commonNames && product.commonNames.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-[#392E20] mb-3">Common Names</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.commonNames.map((name: string, index: number) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Flavor Profile */}
                {product.flavor && (
                  <div>
                    <h3 className="text-xl font-semibold text-[#392E20] mb-4">Flavor Profile</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      {product.flavor.taste && (
                        <div className="p-4 bg-amber-50 rounded-lg">
                          <h4 className="font-semibold text-amber-800 mb-2">Primary Taste</h4>
                          <div className="flex flex-wrap gap-1">
                            {product.flavor.taste.map((taste: string, index: number) => (
                              <span key={index} className="px-2 py-1 bg-amber-200 text-amber-800 rounded text-xs">
                                {taste}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {product.flavor.intensity && (
                        <div className="p-4 bg-green-50 rounded-lg">
                          <h4 className="font-semibold text-green-800 mb-2">Intensity</h4>
                          <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm capitalize">{product.flavor.intensity.replace("_", " ")}</span>
                        </div>
                      )}

                      {product.flavor.aroma && (
                        <div className="p-4 bg-purple-50 rounded-lg">
                          <h4 className="font-semibold text-purple-800 mb-2">Aroma</h4>
                          <p className="text-purple-700 text-sm">{product.flavor.aroma}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Health Benefits */}
                {product.healthBenefits && product.healthBenefits.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-[#392E20] mb-4">Health Benefits</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {product.healthBenefits.map((benefit: string, index: number) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                          <CheckCircle className="text-green-600 mt-0.5" size={16} />
                          <span className="text-green-800 text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Specifications Tab */}
            {activeTab === "specifications" && product.specifications && (
              <div className="space-y-8">
                <h3 className="text-2xl font-calistoga text-[#392E20] mb-6">Product Specifications</h3>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Quality Parameters */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-[#392E20]">Quality Parameters</h4>

                    {product.specifications.moisture && (
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Droplets className="text-blue-600" size={16} />
                          <span className="text-blue-800">Moisture Content</span>
                        </div>
                        <span className="font-semibold text-blue-800">{product.specifications.moisture}%</span>
                      </div>
                    )}

                    {product.specifications.purity && (
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Award className="text-green-600" size={16} />
                          <span className="text-green-800">Purity</span>
                        </div>
                        <span className="font-semibold text-green-800">{product.specifications.purity}%</span>
                      </div>
                    )}

                    {product.specifications.shelfLife && (
                      <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Clock3 className="text-amber-600" size={16} />
                          <span className="text-amber-800">Shelf Life</span>
                        </div>
                        <span className="font-semibold text-amber-800">{product.specifications.shelfLife} months</span>
                      </div>
                    )}
                  </div>

                  {/* Packaging & Storage */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-[#392E20]">Packaging & Storage</h4>

                    {product.specifications.packaging && (
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <h5 className="font-semibold text-purple-800 mb-2">Available Packaging</h5>
                        <div className="flex flex-wrap gap-2">
                          {product.specifications.packaging.map((pkg: string, index: number) => (
                            <span key={index} className="px-2 py-1 bg-purple-200 text-purple-800 rounded text-sm">
                              {pkg}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {product.specifications.storage && (
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h5 className="font-semibold text-gray-800 mb-2">Storage Conditions</h5>
                        <p className="text-gray-700 text-sm">{product.specifications.storage}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Nutrition Tab */}
            {activeTab === "nutrition" && product.nutritionalInfo && (
              <div className="space-y-8">
                <h3 className="text-2xl font-calistoga text-[#392E20] mb-6">
                  Nutritional Information
                  <span className="text-base font-normal text-gray-600 ml-2">(per 100g)</span>
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  {product.nutritionalInfo.calories && (
                    <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg">
                      <Thermometer className="text-yellow-600" size={20} />
                      <div>
                        <div className="text-sm text-yellow-800">Calories</div>
                        <div className="font-semibold text-yellow-900">{product.nutritionalInfo.calories} kcal</div>
                      </div>
                    </div>
                  )}

                  {product.nutritionalInfo.protein && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
                      <Leaf className="text-red-600" size={20} />
                      <div>
                        <div className="text-sm text-red-800">Protein</div>
                        <div className="font-semibold text-red-900">{product.nutritionalInfo.protein} g</div>
                      </div>
                    </div>
                  )}

                  {product.nutritionalInfo.fat && (
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                      <Droplets className="text-blue-600" size={20} />
                      <div>
                        <div className="text-sm text-blue-800">Total Fat</div>
                        <div className="font-semibold text-blue-900">{product.nutritionalInfo.fat} g</div>
                      </div>
                    </div>
                  )}

                  {product.nutritionalInfo.carbohydrates && (
                    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                      <Globe className="text-green-600" size={20} />
                      <div>
                        <div className="text-sm text-green-800">Carbohydrates</div>
                        <div className="font-semibold text-green-900">{product.nutritionalInfo.carbohydrates} g</div>
                      </div>
                    </div>
                  )}

                  {product.nutritionalInfo.fiber && (
                    <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                      <Leaf className="text-purple-600" size={20} />
                      <div>
                        <div className="text-sm text-purple-800">Dietary Fiber</div>
                        <div className="font-semibold text-purple-900">{product.nutritionalInfo.fiber} g</div>
                      </div>
                    </div>
                  )}
                  {product.nutritionalInfo.sodium && (
                    <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg">
                      <Droplets className="text-amber-600" size={20} />
                      <div>
                        <div className="text-sm text-amber-800">Sodium</div>
                        <div className="font-semibold text-amber-900">{product.nutritionalInfo.sodium} mg</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {/* Culinary Uses Tab */}
            {activeTab === "culinary" && product.culinaryUses && product.culinaryUses.length > 0 && (
              <div className="space-y-8">
                <h3 className="text-2xl font-calistoga text-[#392E20] mb-6">Culinary Uses</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {product.culinaryUses.map((use: string, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
                      <CheckCircle className="text-yellow-600 mt-0.5" size={16} />
                      <span className="text-yellow-800 text-sm">{use}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </motion.section>
      {/* Related Products */}
      {/* <RelatedProducts relatedProducts={relatedProducts} /> */}
    </div>
  );
}
