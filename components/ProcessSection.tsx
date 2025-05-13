// components/sections/ProcessSection.tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Globe, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    number: "1",
    title: "Selective Harvesting",
    description: "Carefully handpicking only the most mature, high-quality spices",
    icon: "🌿",
  },
  {
    number: "2",
    title: "Hybrid Drying Technique",
    description: "Perfecting our craft with traditional sun-drying and precision oven technology",
    icon: "☀️",
  },
  {
    number: "3",
    title: "Rigorous Quality Control",
    description: "Meticulous sorting and evaluation by our expert team",
    icon: "🔍",
  },
  {
    number: "4",
    title: "Export-Ready Packaging",
    description: "Precision packaging meeting international standards",
    icon: "📦",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const processStepsRef = useRef<HTMLDivElement>(null);
  const supportInfoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Title animation
      tl.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        }
      );

      // Process steps animation
      const steps = processStepsRef.current?.children;
      if (steps) {
        tl.fromTo(
          steps,
          {
            opacity: 0,
            x: -50,
            scale: 0.95,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            stagger: 0.3,
            duration: 0.6,
            ease: "power3.out",
          },
          0.4
        );
      }

      // Support info animation
      tl.fromTo(
        supportInfoRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
        },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white] 
      text-gray-900 py-24 px-4 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-12 -left-12 w-96 h-96 bg-[#8B4513]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-12 -right-12 w-96 h-96 bg-[#4A2C1D]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 
          text-[#4A2C1D] leading-tight opacity-0"
        >
          Our Process – From Farm to Global Kitchens
        </h2>

        <div ref={processStepsRef} className="space-y-8">
          {processSteps.map((step, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-[#F5E6D3] to-[#E6D3BA] backdrop-blur-sm 
              border border-[#8B4513]/10 p-8 rounded-2xl 
              transition duration-300 
              transform hover:scale-[1.02] hover:shadow-xl"
            >
              <div className="flex items-center">
                <div
                  className="flex-shrink-0 w-16 h-16 bg-[#8B4513] text-white 
                  rounded-full flex items-center justify-center text-2xl font-bold mr-8
                  transition duration-300 group-hover:rotate-6"
                >
                  {step.number}
                </div>
                <div>
                  <div className="text-4xl mb-2 opacity-80">{step.icon}</div>
                  <h3
                    className="text-2xl font-bold mb-2 text-[#4A2C1D] 
                  transition duration-300 group-hover:text-[#8B4513]"
                  >
                    {step.title}
                  </h3>
                  <p className="text-[#4A2C1D]/80">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          ref={supportInfoRef}
          className="mt-16 bg-gradient-to-br from-[#F5E6D3] to-[#E6D3BA] backdrop-blur-sm 
          border border-[#8B4513]/10 rounded-2xl p-8 
          transition duration-300 hover:scale-[1.02] hover:shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-bold text-[#4A2C1D] mb-4">Our Commitment to Local Farmers</p>
              <ul className="space-y-3 text-[#4A2C1D]/80">
                <li className="flex items-center gap-3">
                  <Check className="text-[#8B4513]" size={24} />
                  Organic Farming Training
                </li>
                <li className="flex items-center gap-3">
                  <Check className="text-[#8B4513]" size={24} />
                  Access to Modern Drying Technologies
                </li>
                <li className="flex items-center gap-3">
                  <Check className="text-[#8B4513]" size={24} />
                  Fair Pricing Schemes
                </li>
              </ul>
            </div>
            <button
              className="group flex items-center justify-center gap-2 
              bg-[#8B4513] text-white px-6 py-3 rounded-full 
              hover:bg-[#6A3400] transition duration-300 
              transform hover:scale-105 shadow-lg"
            >
              Learn More
              <Globe className="transition-transform group-hover:rotate-6" size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
