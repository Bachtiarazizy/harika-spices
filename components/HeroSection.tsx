"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight, Globe } from "lucide-react";

// Updated slider content structure - now references translation keys
const slideConfig = [
  {
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2000&auto=format&fit=crop",
    translationKey: "slide1", // This will map to dictionary.home.hero.slides.slide1
  },
  {
    image: "https://images.unsplash.com/photo-1716816211590-c15a328a5ff0?w=2000&auto=format&fit=crop",
    translationKey: "slide2",
  },
  {
    image: "https://images.unsplash.com/photo-1566824099147-bef027d3a333?w=2000&auto=format&fit=crop",
    translationKey: "slide3",
  },
];

// Updated interface for HeroSection props
interface HeroSectionProps {
  dictionary: {
    home: {
      hero: {
        // Default/fallback translations
        heading1: string;
        heading2: string;
        subheading: string;
        partnerButton: string;
        exploreButton: string;
        // New slides section for individual slide translations
        slides?: {
          slide1: {
            heading1: string;
            heading2: string;
            subheading: string;
            partnerButton: string;
            exploreButton: string;
          };
          slide2: {
            heading1: string;
            heading2: string;
            subheading: string;
            partnerButton: string;
            exploreButton: string;
          };
          slide3: {
            heading1: string;
            heading2: string;
            subheading: string;
            partnerButton: string;
            exploreButton: string;
          };
        };
      };
    };
  };
}

export default function HeroSection({ dictionary }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadlineRef = useRef(null);
  const ctaRef = useRef(null);
  const slideRef = useRef(null);

  // Get current slide content with translations
  const getCurrentSlideContent = () => {
    const slideKey = slideConfig[currentSlide].translationKey;
    const slideTranslations = dictionary.home.hero.slides?.[slideKey as keyof typeof dictionary.home.hero.slides];

    // Fallback to default translations if slide-specific ones don't exist
    return slideTranslations || dictionary.home.hero;
  };

  // Handle slide navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slideConfig.length - 1 ? 0 : prev + 1));
  };

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  // Initial animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          duration: 1,
          ease: "power3.out",
        },
      });

      tl.fromTo(
        headlineRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
        }
      )
        .fromTo(
          subheadlineRef.current,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
          },
          0.2
        )
        .fromTo(
          ctaRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
          },
          0.4
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Handle content transitions
  useEffect(() => {
    const contentElements = [headlineRef.current, subheadlineRef.current, ctaRef.current];

    // Create timeline for content transition
    const contentTl = gsap.timeline({
      defaults: {
        duration: 0.5,
        ease: "power2.out",
      },
    });

    // Fade out
    contentTl.to(contentElements, {
      opacity: 0,
      y: -20,
      stagger: 0.1,
      onComplete: () => {
        // After fadeout complete, update slide content and fade in
        gsap.to(contentElements, {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
        });
      },
    });
  }, [currentSlide]);

  const currentContent = getCurrentSlideContent();

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0 w-full h-full">
        {slideConfig.map((slide, index) => (
          <div
            key={index}
            ref={index === currentSlide ? slideRef : null}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-12 lg:px-24 h-screen flex flex-col justify-center">
        <div className="max-w-2xl text-white">
          <h1 ref={headlineRef} className="text-4xl md:text-5xl  font-bold mb-4 leading-tight">
            {currentContent.heading1} <br />
            <span className="text-amber-300">{currentContent.heading2}</span>
          </h1>

          <p ref={subheadlineRef} className="text-lg md:text-xl text-white/80 mb-8">
            {currentContent.subheading}
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              className="group flex items-center justify-center gap-2 
              bg-amber-600 text-white px-8 py-3 rounded-full 
              hover:bg-amber-700 transition duration-300 
              transform hover:scale-105 shadow-lg"
            >
              {currentContent.partnerButton}
              <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
            </button>
            <button
              className="group flex items-center justify-center gap-2 
              border-2 border-white text-white px-8 py-3 
              rounded-full hover:bg-white hover:text-amber-800
              transition duration-300 transform hover:scale-105"
            >
              {currentContent.exploreButton}
              <Globe className="transition-transform group-hover:rotate-6" size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-32 z-20 hidden md:flex space-x-2">
        {slideConfig.map((_, index) => (
          <button key={index} onClick={() => setCurrentSlide(index)} className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-white w-8" : "bg-white/50"}`} aria-label={`Go to slide ${index + 1}`} />
        ))}
      </div>
    </section>
  );
}
