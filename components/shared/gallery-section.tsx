/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useRef, useEffect } from "react";
import { ArrowRight, ZoomIn, X, ChevronLeft, ChevronDown, ChevronRight } from "lucide-react";

// Define types for gallery data
interface GalleryItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

// Sample gallery data
const galleryData: GalleryItem[] = [
  {
    id: 1,
    title: "Javanese Cinnamon Harvest",
    description: "Traditional cinnamon harvesting in the highlands of Java",
    image: "https://images.unsplash.com/photo-1599940778173-e859d953d25b?w=800&h=600&fit=crop&crop=center",
    category: "Harvesting",
  },
  {
    id: 2,
    title: "Spice Market in Jakarta",
    description: "Vibrant displays of colorful spices at a traditional market",
    image: "https://images.unsplash.com/photo-1596040033229-a5b2d6c04659?w=800&h=600&fit=crop&crop=center",
    category: "Markets",
  },
  {
    id: 3,
    title: "Nutmeg Processing",
    description: "Artisanal processing of nutmeg in the Banda Islands",
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=800&h=600&fit=crop&crop=center",
    category: "Processing",
  },
  {
    id: 4,
    title: "Clove Plantation",
    description: "Rows of clove trees in the fertile volcanic soil of Sulawesi",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center",
    category: "Plantations",
  },
  {
    id: 5,
    title: "Pepper Drying Techniques",
    description: "Traditional sun-drying of pepper in Lampung province",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center",
    category: "Processing",
  },
];

// Type for intersection observer hook
type IntersectionObserverHookReturn = [React.RefObject<HTMLDivElement | null>, boolean];

// Custom hook for intersection observer
const useIntersectionObserver = (threshold = 0.1): IntersectionObserverHookReturn => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);

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

  return [ref, isIntersecting];
};

const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [filteredImages, setFilteredImages] = useState<GalleryItem[]>(galleryData);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  // Intersection observer for animation
  const [sectionRef, isSectionVisible] = useIntersectionObserver(0.1);

  // Filter images based on category
  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredImages(galleryData);
    } else {
      setFilteredImages(galleryData.filter((item) => item.category === activeCategory));
    }
  }, [activeCategory]);

  // Open lightbox with selected image
  const openLightbox = (image: GalleryItem): void => {
    setSelectedImage(image);
    setIsLightboxOpen(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling when lightbox is open
  };

  // Close lightbox
  const closeLightbox = (): void => {
    setIsLightboxOpen(false);
    document.body.style.overflow = "auto"; // Re-enable scrolling
  };

  // Handle key press for lightbox navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (!isLightboxOpen) return;

      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowRight") {
        navigateImage(1);
      } else if (e.key === "ArrowLeft") {
        navigateImage(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, selectedImage]);

  // Navigate to next/previous image in lightbox
  const navigateImage = (direction: number): void => {
    if (!selectedImage) return;

    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage.id);
    let newIndex = currentIndex + direction;

    if (newIndex < 0) {
      newIndex = filteredImages.length - 1;
    } else if (newIndex >= filteredImages.length) {
      newIndex = 0;
    }

    setSelectedImage(filteredImages[newIndex]);
  };

  // Get image size class for masonry layout
  const getImageSizeClass = (index: number): string => {
    // Create a pattern for image sizes
    const pattern = index % 6;

    switch (pattern) {
      case 0:
        return "row-span-2"; // Tall
      case 3:
        return "col-span-2 row-span-2"; // Wide

      default:
        return ""; // Regular
    }
  };

  return (
    <div className="bg-white text-black py-10 px-4 md:p-28 relative overflow-hidden">
      {/* Gallery Masonry Grid */}
      <section className="relative z-10 px-4 ">
        <div ref={sectionRef} className={`max-w-7xl mx-auto transition-all duration-1000 ${isSectionVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[200px] gap-4">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className={`${getImageSizeClass(index)} relative group overflow-hidden rounded-xl transition-all duration-500 transform hover:z-10 hover:scale-[1.02]`}
                onMouseEnter={() => setHoveredImage(image.id)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                {/* Image */}
                <img src={image.image} alt={image.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center px-3 py-1 bg-amber-500/90 backdrop-blur-sm text-white text-xs font-medium rounded-full">{image.category}</span>
                </div>

                {/* Zoom button */}
                <button
                  onClick={() => openLightbox(image)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20"
                >
                  <ZoomIn className="w-4 h-4 text-white" />
                </button>

                {/* Image info - slides up on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                  <h3 className="text-white text-lg font-bold mb-1 drop-shadow-md">{image.title}</h3>
                  <p className="text-white/80 text-sm drop-shadow-md">{image.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {isLightboxOpen && selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl max-h-[90vh] flex flex-col">
            {/* Close button */}
            <button onClick={closeLightbox} className="absolute -top-12 right-0 text-white hover:text-amber-400 transition-colors">
              <X className="w-8 h-8" />
            </button>

            {/* Navigation buttons */}
            <button onClick={() => navigateImage(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-all z-20">
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button onClick={() => navigateImage(1)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-all z-20">
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image container */}
            <div className="bg-transparent rounded-lg overflow-hidden flex-grow flex items-center justify-center">
              <img src={selectedImage.image} alt={selectedImage.title} className="max-w-full max-h-[70vh] object-contain" />
            </div>

            {/* Image info */}
            <div className="text-white text-center mt-4">
              <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
              <p className="text-white/80">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GallerySection;
