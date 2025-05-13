"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CheckCircle, Search, DollarSign, Zap, FileText, Globe } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const whyChoosePoints = [
  {
    icon: CheckCircle,
    title: "Consistent Premium Quality",
    description: "Sourced exclusively from carefully selected harvests",
    color: "text-green-600",
  },
  {
    icon: Search,
    title: "Full Traceability",
    description: "Complete transparency of spice origin and journey",
    color: "text-blue-600",
  },
  {
    icon: DollarSign,
    title: "Competitive Direct Sourcing",
    description: "Eliminating unnecessary middlemen for better value",
    color: "text-yellow-600",
  },
  {
    icon: Zap,
    title: "Professional Export Team",
    description: "Rapid communication and responsive support",
    color: "text-purple-600",
  },
  {
    icon: FileText,
    title: "Comprehensive Export Certification",
    description: "Streamlined customs clearance for global clients",
    color: "text-red-600",
  },
];

export default function WhyChooseSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const pointsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const points = pointsRef.current?.children;
    const cta = ctaRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    // Title animation
    tl.fromTo(
      title,
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
        ease: "power2.out",
      }
    );

    // Points animation
    if (points) {
      tl.fromTo(
        points,
        {
          opacity: 0,
          x: -50,
          scale: 0.95,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          stagger: 0.2,
          duration: 0.6,
          ease: "power2.out",
        },
        0.4
      );
    }

    // CTA animation
    tl.fromTo(
      cta,
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
        ease: "power2.out",
      },
      0.8
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-br from-[#F5E6D3] to-[#E6D3BA] 
      text-gray-900 py-16 md:py-24 px-4 md:px-12 lg:px-24 
      overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-12 -left-12 w-96 h-96 bg-[#8B4513]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-12 -right-12 w-96 h-96 bg-[#4A2C1D]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 
          text-[#4A2C1D] leading-tight"
        >
          Why Choose <span className="text-[#8B4513]">Harika Spices</span>
        </h2>

        <div ref={pointsRef} className="grid md:grid-cols-3 gap-8 mb-16">
          {whyChoosePoints.map((point, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-xl 
              transform transition-all duration-300 
              hover:scale-105 hover:shadow-2xl 
              group relative overflow-hidden"
            >
              {/* Decorative overlay */}
              <div
                className="absolute inset-0 bg-[#8B4513]/10 
                opacity-0 group-hover:opacity-20 
                transition duration-300"
              ></div>

              <div className="relative z-10 text-center">
                <div className={`mb-4 flex justify-center ${point.color}`}>
                  <point.icon size={48} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#4A2C1D]">{point.title}</h3>
                <p className="text-gray-700 text-center">{point.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div
          ref={ctaRef}
          className="bg-white/50 backdrop-blur-sm p-10 rounded-2xl 
          shadow-xl text-center transform transition 
          hover:scale-[1.02] duration-300"
        >
          <h3 className="text-2xl font-bold text-[#4A2C1D] mb-4">More Than Just Spices</h3>
          <p className="text-[#4A2C1D]/80 mb-6 max-w-2xl mx-auto">We&apos;re building global partnerships that empower Indonesian farmers and promote sustainable agricultural practices through every single spice we export.</p>
          <div className="flex justify-center space-x-4">
            <a
              href="#contact"
              className="group flex items-center justify-center gap-2 
              bg-[#8B4513] text-white px-8 py-3 rounded-full 
              hover:bg-[#6A3400] transition duration-300 
              transform hover:scale-105 shadow-lg"
            >
              Start Partnership
              <Globe className="transition-transform group-hover:rotate-6" size={20} />
            </a>
            <a
              href="#about"
              className="group flex items-center justify-center gap-2 
              border-2 border-[#8B4513] text-[#8B4513] px-8 py-3 
              rounded-full hover:bg-[#8B4513] hover:text-white
              transition duration-300 transform hover:scale-105"
            >
              Learn More
              <Search className="transition-transform group-hover:scale-110" size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
