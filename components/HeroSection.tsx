// components/sections/HeroSection.tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { ArrowRight, Globe } from "lucide-react";

export default function HeroSection() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadlineRef = useRef(null);
  const ctaRef = useRef(null);
  const imageRef = useRef(null);

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
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
        }
      )
        .fromTo(
          subheadlineRef.current,
          {
            opacity: 0,
            y: 70,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
          },
          0.2
        )
        .fromTo(
          ctaRef.current,
          {
            opacity: 0,
            y: 80,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
          },
          0.4
        )
        .fromTo(
          imageRef.current,
          {
            opacity: 0,
            x: 100,
            scale: 0.8,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
          },
          0.3
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-br from-[#F5E6D3] to-[#E6D3BA] 
      text-gray-900 flex items-center px-4 md:px-12 lg:px-24 
      overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-12 -left-12 w-96 h-96 bg-[#8B4513]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-12 -right-12 w-96 h-96 bg-[#4A2C1D]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10 w-full">
        {/* Content Column */}
        <div className="space-y-8">
          <div>
            <h1
              ref={headlineRef}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 
              text-[#4A2C1D] leading-tight opacity-0"
            >
              Elevating <br /> Global Cuisine
              <br />
              <span className="text-[#8B4513]">One Spice at a Time</span>
            </h1>

            <p ref={subheadlineRef} className="text-lg md:text-xl text-[#4A2C1D]/80 mb-8 opacity-0">
              Harika Spices transforms premium Indonesian spices into global culinary experiences, connecting farmers to international kitchens with unparalleled quality and purpose.
            </p>
          </div>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 opacity-0">
            <button
              className="group flex items-center justify-center gap-2 
              bg-[#8B4513] text-white px-8 py-3 rounded-full 
              hover:bg-[#6A3400] transition duration-300 
              transform hover:scale-105 shadow-lg"
            >
              Partner With Us
              <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
            </button>
            <button
              className="group flex items-center justify-center gap-2 
              border-2 border-[#8B4513] text-[#8B4513] px-8 py-3 
              rounded-full hover:bg-[#8B4513] hover:text-white
              transition duration-300 transform hover:scale-105"
            >
              Explore Catalog
              <Globe className="transition-transform group-hover:rotate-6" size={20} />
            </button>
          </div>
        </div>

        {/* Image Column */}
        <div ref={imageRef} className="relative hidden md:block opacity-0">
          <div className="relative z-10 group">
            <Image
              src="/assets/hero.jpg"
              alt="Harika Spices Exotic Collection"
              width={600}
              height={400}
              className="rounded-2xl shadow-2xl 
              transform transition duration-300 
              group-hover:scale-105 group-hover:rotate-1 
              group-hover:shadow-2xl object-cover"
            />
            <div
              className="absolute inset-0 bg-[#8B4513]/20 
            opacity-0 group-hover:opacity-20 
            rounded-2xl transition duration-300"
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
