// components/sections/AboutSection.tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Leaf, Globe, Lock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PRINCIPLES = [
  {
    icon: Leaf,
    title: "Sustainable Agriculture",
    description: "Committed to environmentally friendly farming practices that protect and nurture our ecosystem.",
  },
  {
    icon: Globe,
    title: "Direct Farmer Partnerships",
    description: "Empowering local communities through direct, fair trade partnerships that transform agricultural landscapes.",
  },
  {
    icon: Lock,
    title: "Supply Chain Integrity",
    description: "Ensuring complete transparency and traceability from farm to global markets.",
  },
];

export default function AboutSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const principlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

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
      ).fromTo(
        contentRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        0.3
      );

      if (principlesRef.current) {
        tl.fromTo(
          principlesRef.current.children,
          {
            opacity: 0,
            y: 50,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.2,
            duration: 0.6,
            ease: "power3.out",
          },
          0.6
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white] 
      py-24 px-4 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-12 -left-12 w-96 h-96 bg-[#8B4513]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-12 -right-12 w-96 h-96 bg-[#4A2C1D]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-center mb-12 
          text-[#4A2C1D] opacity-0"
        >
          Our Story, Our <span className="text-[#8B4513]">Mission</span>
        </h2>

        <div
          ref={contentRef}
          className="text-xl text-[#4A2C1D]/80 text-center mb-16 
          max-w-4xl mx-auto opacity-0"
        >
          <p className="mb-6">Harika Spices is a pivotal part of the Harika Export Group, dedicated to showcasing the rich, authentic spice heritage of Indonesia to global markets.</p>
          <p>
            Sourced from sustainable farms across Central Java, Sumatra, Maluku, and Sulawesi, we forge direct partnerships with local farmers. Our mission is to deliver exceptional quality while uplifting and empowering local agricultural
            communities.
          </p>
        </div>

        <div ref={principlesRef} className="grid md:grid-cols-3 gap-8 text-center">
          {PRINCIPLES.map((principle, index) => (
            <div
              key={index}
              className="bg-white/50 backdrop-blur-md p-8 rounded-2xl 
              shadow-lg border border-[#8B4513]/10 
              transform transition duration-300 
              hover:scale-105 hover:shadow-xl group"
            >
              <div
                className="mb-6 w-20 h-20 mx-auto flex items-center 
                justify-center rounded-full bg-[#8B4513]/10 
                group-hover:bg-[#8B4513]/20 transition duration-300"
              >
                <principle.icon
                  size={40}
                  className="text-[#8B4513] group-hover:scale-110 
                  transition duration-300"
                />
              </div>
              <h3
                className="text-xl font-bold mb-4 
                text-[#4A2C1D] group-hover:text-[#8B4513] 
                transition duration-300"
              >
                {principle.title}
              </h3>
              <p
                className="text-[#4A2C1D]/80 
                group-hover:text-[#4A2C1D] transition duration-300"
              >
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
