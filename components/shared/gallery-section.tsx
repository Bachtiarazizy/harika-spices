/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { Eye, ArrowRight } from "lucide-react";

// Enhanced gallery data for landing page
const galleryImages = [
  {
    id: 1,
    title: "Ceylon Cinnamon Harvest",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&crop=center",
    category: "Harvest",
  },
  {
    id: 2,
    title: "Golden Turmeric Roots",
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=600&h=400&fit=crop&crop=center",
    category: "Processing",
  },
  {
    id: 3,
    title: "Spice Market Colors",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=center",
    category: "Market",
  },
  {
    id: 4,
    title: "Nutmeg Plantation",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=400&fit=crop&crop=center",
    category: "Plantation",
  },
  {
    id: 5,
    title: "Clove Flower Buds",
    image: "https://images.unsplash.com/photo-1596040033229-a5b2d6c04659?w=600&h=400&fit=crop&crop=center",
    category: "Harvest",
  },
  {
    id: 6,
    title: "Traditional Grinding",
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=600&h=400&fit=crop&crop=center",
    category: "Traditional",
  },
  {
    id: 7,
    title: "Cardamom Pods",
    image: "https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=600&h=400&fit=crop&crop=center",
    category: "Harvest",
  },
];

const SimpleGallerySection = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const handleViewGallery = () => {
    // Navigate to full gallery page
    window.location.href = "/gallery";
  };

  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 via-white to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-4 sm:w-8 h-0.5 bg-gradient-to-r from-amber-600 to-orange-600"></div>
            <p className="font-semibold text-amber-800 uppercase tracking-wider text-xs sm:text-sm">Visual Journey</p>
            <div className="w-4 sm:w-8 h-0.5 bg-gradient-to-r from-amber-600 to-orange-600"></div>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#4A2C1D] leading-tight mb-3 sm:mb-4">
            Discover the Beauty of
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Indonesian Spices</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">From plantation to market, explore the vibrant world of Indonesian spices through our curated photo collection.</p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className={`group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl cursor-pointer ${index === 0 ? "col-span-2 md:col-span-2 md:row-span-2" : ""} ${
                index === 1 || index === 2 ? "md:col-span-2" : ""
              }`}
              onMouseEnter={() => setHoveredId(image.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={image.image}
                  alt={image.title}
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${index === 0 ? "h-48 sm:h-64 md:h-80" : index === 2 ? "h-32 sm:h-40 md:h-48" : "h-32 sm:h-40 md:h-48"}`}
                />

                {/* Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300 ${hoveredId === image.id ? "opacity-100" : "opacity-0"}`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`transform transition-all duration-300 ${hoveredId === image.id ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}>
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Eye className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                  <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-green-600 text-white text-xs font-medium rounded-full">{image.category}</span>
                </div>

                {/* Title */}
                <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4">
                  <h3 className="text-white font-semibold text-sm sm:text-base md:text-lg line-clamp-2">{image.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <button
            onClick={handleViewGallery}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
          >
            <span>View Full Gallery</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleGallerySection;
