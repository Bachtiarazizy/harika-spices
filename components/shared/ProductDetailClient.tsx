/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// components/shared/ProductDetailClient.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { type SanityDocument } from "next-sanity";
import {
  Star,
  MapPin,
  Package,
  CheckCircle,
  AlertCircle,
  Clock,
  Calendar,
  Leaf,
  Award,
  Shield,
  Heart,
  Share2,
  Mail,
  Droplets,
  Clock3,
  ShoppingCart,
  Info,
  Send,
  X,
  ArrowRight,
  Phone,
  Building,
  User,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { PortableText } from "@portabletext/react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// PortableText components for clean typography
const portableTextComponents = {
  block: {
    normal: ({ children }: any) => <p className="mb-4 text-gray-700 leading-relaxed text-base">{children}</p>,
    h1: ({ children }: any) => <h1 className="text-2xl font-bold mb-4 text-gray-900">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-xl font-semibold mb-3 text-gray-900">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-lg font-semibold mb-2 text-gray-900">{children}</h3>,
    blockquote: ({ children }: any) => <blockquote className="border-l-4 border-blue-500 pl-4 my-4 italic text-gray-600 bg-gray-50 py-3 rounded-r-lg">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc ml-6 mb-4 space-y-1">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal ml-6 mb-4 space-y-1">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li className="text-gray-700">{children}</li>,
    number: ({ children }: any) => <li className="text-gray-700">{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-semibold text-gray-900">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ children, value }: any) => (
      <a href={value?.href} className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

// Helper functions with professional styling
const getAvailabilityConfig = (availability: string) => {
  const configs = {
    available: {
      color: "text-green-700 bg-green-50 border-green-200",
      text: "In Stock",
      icon: <CheckCircle size={16} />,
    },
    limited: {
      color: "text-orange-700 bg-orange-50 border-orange-200",
      text: "Limited Stock",
      icon: <AlertCircle size={16} />,
    },
    preorder: {
      color: "text-blue-700 bg-blue-50 border-blue-200",
      text: "Pre-order",
      icon: <Clock size={16} />,
    },
    unavailable: {
      color: "text-red-700 bg-red-50 border-red-200",
      text: "Out of Stock",
      icon: <AlertCircle size={16} />,
    },
    seasonal: {
      color: "text-purple-700 bg-purple-50 border-purple-200",
      text: "Seasonal",
      icon: <Calendar size={16} />,
    },
    default: {
      color: "text-gray-700 bg-gray-50 border-gray-200",
      text: "Unknown",
      icon: <AlertCircle size={16} />,
    },
  };
  return configs[availability as keyof typeof configs] || configs.default;
};

const getHarvestSeasonText = (season: string) => {
  const seasons = {
    q1: "Jan - Mar",
    q2: "Apr - Jun",
    q3: "Jul - Sep",
    q4: "Oct - Dec",
    year_round: "Year Round",
  };
  return seasons[season as keyof typeof seasons] || season;
};

const getCertificationConfig = (cert: string) => {
  const configs = {
    organic: { icon: <Leaf size={18} />, label: "Organic Certified", color: "text-green-600" },
    halal: { icon: <Shield size={18} />, label: "Halal Certified", color: "text-blue-600" },
    haccp: { icon: <Award size={18} />, label: "HACCP", color: "text-purple-600" },
    iso22000: { icon: <Award size={18} />, label: "ISO 22000", color: "text-red-600" },
    fda: { icon: <Shield size={18} />, label: "FDA Approved", color: "text-blue-800" },
    eu_organic: { icon: <Leaf size={18} />, label: "EU Organic", color: "text-green-700" },
    kosher: { icon: <Shield size={18} />, label: "Kosher", color: "text-indigo-600" },
    fair_trade: { icon: <Heart size={18} />, label: "Fair Trade", color: "text-pink-600" },
    default: { icon: <Award size={18} />, label: cert, color: "text-gray-600" },
  };
  return configs[cert as keyof typeof configs] || configs.default;
};

interface ProductDetailClientProps {
  product: SanityDocument;
  relatedProducts: SanityDocument[];
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
  const [inquiryForm, setInquiryForm] = useState({
    quantity: "",
    message: "",
    name: "",
    email: "",
    company: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const availabilityConfig = getAvailabilityConfig(product.availability);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
        setInquiryForm({ quantity: "", message: "", name: "", email: "", company: "" });
        setShowInquiryModal(false);
        setPopupMessage("Thank you for your inquiry! We'll get back to you within 24 hours.");
        setShowSuccessPopup(true);
        setTimeout(() => setShowSuccessPopup(false), 5000);
      } else {
        setPopupMessage(data.error || "Failed to send inquiry");
        setShowErrorPopup(true);
        setTimeout(() => setShowErrorPopup(false), 5000);
      }
    } catch (error) {
      setPopupMessage("Network error. Please try again later.");
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 5000);
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
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/products" className="text-blue-600 hover:text-blue-800 transition-colors">
              Products
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-700 font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Header */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div>
              <div className="space-y-4">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                  {product.images?.[selectedImageIndex]?.asset?.url ? (
                    <Image
                      src={product.images[selectedImageIndex].asset.url}
                      alt={product.images[selectedImageIndex].alt || product.name}
                      width={600}
                      height={600}
                      quality={95}
                      priority={true}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package size={64} className="text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Image Thumbnails */}
                {product.images && product.images.length > 1 && (
                  <div className="flex space-x-2 overflow-x-auto pb-2">
                    {product.images.map((image: any, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          selectedImageIndex === index ? "border-blue-500 shadow-md" : "border-gray-200 hover:border-gray-300"
                        }`}
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
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star size={14} />
                    Featured
                  </span>
                )}
                {product.newProduct && <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">New</span>}
                <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 border ${availabilityConfig.color}`}>
                  {availabilityConfig.icon}
                  {availabilityConfig.text}
                </span>
              </div>

              {/* Product Name & Category */}
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight">{product.name}</h1>
                {product.scientificName && <p className="text-lg text-gray-600 italic mb-2">{product.scientificName}</p>}
                {product.category && (
                  <p className="text-blue-600 font-medium">
                    {product.category.name}
                    {product.subCategory && ` • ${product.subCategory.name}`}
                  </p>
                )}
              </div>

              {/* Short Description */}
              {product.shortDescription && <p className="text-gray-700 text-lg leading-relaxed">{product.shortDescription}</p>}

              {/* Key Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.origin && (
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <MapPin className="text-blue-600 flex-shrink-0" size={20} />
                    <div>
                      <div className="text-sm text-gray-500 font-medium">Origin</div>
                      <div className="font-semibold text-gray-900">{product.origin}</div>
                    </div>
                  </div>
                )}

                {product.harvestSeason && (
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <Calendar className="text-green-600 flex-shrink-0" size={20} />
                    <div>
                      <div className="text-sm text-gray-500 font-medium">Harvest Season</div>
                      <div className="font-semibold text-gray-900">{getHarvestSeasonText(product.harvestSeason)}</div>
                    </div>
                  </div>
                )}

                {product.pricing?.priceRange && (
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 sm:col-span-2">
                    <Package className="text-purple-600 flex-shrink-0" size={20} />
                    <div>
                      <div className="text-sm text-gray-500 font-medium">Price Range</div>
                      <div className="font-semibold text-gray-900">{product.pricing.priceRange}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={() => setShowInquiryModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                >
                  <Mail size={18} />
                  Request Quote
                </button>
                <button onClick={handleShare} className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2">
                  <Share2 size={18} />
                  Share
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-1 mb-8 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-3 font-medium rounded-t-lg transition-colors duration-200 ${
                  activeTab === tab.id ? "bg-white text-blue-600 border-b-2 border-blue-600 -mb-px" : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                <tab.icon size={18} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                {product.description && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Description</h3>
                    <div className="prose max-w-none">
                      <PortableText value={product.description} components={portableTextComponents} />
                    </div>
                  </div>
                )}

                {product.commonNames && product.commonNames.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Common Names</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.commonNames.map((name: string, index: number) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {product.flavor && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Flavor Profile</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {product.flavor.taste && (
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <h4 className="font-semibold text-blue-800 mb-2">Primary Taste</h4>
                          <div className="flex flex-wrap gap-1">
                            {product.flavor.taste.map((taste: string, index: number) => (
                              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                                {taste}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {product.flavor.intensity && (
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <h4 className="font-semibold text-green-800 mb-2">Intensity</h4>
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm capitalize">{product.flavor.intensity.replace("_", " ")}</span>
                        </div>
                      )}

                      {product.flavor.aroma && (
                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 sm:col-span-2 lg:col-span-1">
                          <h4 className="font-semibold text-purple-800 mb-2">Aroma</h4>
                          <p className="text-purple-700 text-sm">{product.flavor.aroma}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Specifications Tab */}
            {activeTab === "specifications" && product.specifications && (
              <div className="space-y-8">
                <h3 className="text-xl font-semibold text-gray-900">Technical Specifications</h3>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Quality Parameters */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Quality Parameters</h4>
                    <div className="space-y-3">
                      {product.specifications.moisture && (
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-center gap-2">
                            <Droplets className="text-blue-600" size={16} />
                            <span className="text-blue-800 font-medium">Moisture Content</span>
                          </div>
                          <span className="font-semibold text-blue-800">{product.specifications.moisture}%</span>
                        </div>
                      )}

                      {product.specifications.purity && (
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-center gap-2">
                            <Award className="text-green-600" size={16} />
                            <span className="text-green-800 font-medium">Purity</span>
                          </div>
                          <span className="font-semibold text-green-800">{product.specifications.purity}%</span>
                        </div>
                      )}

                      {product.specifications.shelfLife && (
                        <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                          <div className="flex items-center gap-2">
                            <Clock3 className="text-orange-600" size={16} />
                            <span className="text-orange-800 font-medium">Shelf Life</span>
                          </div>
                          <span className="font-semibold text-orange-800">{product.specifications.shelfLife} months</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Packaging & Storage */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Packaging & Storage</h4>

                    {product.specifications.packaging && (
                      <div className="mb-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <h5 className="font-semibold text-purple-800 mb-2">Available Packaging</h5>
                        <div className="flex flex-wrap gap-2">
                          {product.specifications.packaging.map((pkg: string, index: number) => (
                            <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm">
                              {pkg}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {product.specifications.storage && (
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h5 className="font-semibold text-gray-800 mb-2">Storage Conditions</h5>
                        <p className="text-gray-700 text-sm">{product.specifications.storage}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Culinary Tab */}
            {activeTab === "culinary" && (
              <div className="space-y-8">
                <h3 className="text-xl font-semibold text-gray-900">Culinary Applications</h3>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Culinary Uses */}
                  {product.culinaryUses && product.culinaryUses.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Culinary Uses</h4>
                      <div className="space-y-3">
                        {product.culinaryUses.map((use: string, index: number) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <CheckCircle className="text-blue-600 mt-0.5 flex-shrink-0" size={16} />
                            <span className="text-blue-800 text-sm">{use}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Health Benefits */}
                  {product.healthBenefits && product.healthBenefits.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Health Benefits</h4>
                      <div className="space-y-3">
                        {product.healthBenefits.map((benefit: string, index: number) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                            <CheckCircle className="text-green-600 mt-0.5 flex-shrink-0" size={16} />
                            <span className="text-green-800 text-sm">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Related Products</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.slice(0, 3).map((relatedProduct: SanityDocument) => (
                <div key={relatedProduct._id} className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-200">
                  <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                    {relatedProduct.images?.[0]?.asset?.url ? (
                      <Image
                        src={relatedProduct.images[0].asset.url}
                        alt={relatedProduct.images[0].alt || relatedProduct.name}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package size={40} className="text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">{relatedProduct.name}</h3>
                    {relatedProduct.shortDescription && <p className="text-gray-600 text-sm mb-3 line-clamp-2">{relatedProduct.shortDescription}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
