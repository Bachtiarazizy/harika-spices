"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Add interface for AboutSection props
interface AboutSectionProps {
  dictionary: {
    home: {
      about: {
        title1: string;
        title2: string;
        paragraph1: string;
        paragraph2: string;
        paragraph3: string;
      };
    };
  };
}

export default function AboutSection({ dictionary }: AboutSectionProps) {
  const stickyTitlesRef = useRef<HTMLElement>(null);
  const titlesRef = useRef<(HTMLHeadingElement | null)[]>([]);

  // Access translations
  const about = dictionary.home.about;

  // Sticky titles content
  const stickyTitles = [about.paragraph1, about.paragraph2, about.paragraph3];

  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    const stickySection = stickyTitlesRef.current;
    const titles = titlesRef.current.filter(Boolean);

    if (!stickySection || titles.length !== 3) {
      window.removeEventListener("resize", handleResize);
      return;
    }

    // Initial setup
    gsap.set(titles[0], { opacity: 1, scale: 1 });
    gsap.set(titles[1], { opacity: 0, scale: 0.75 });
    gsap.set(titles[2], { opacity: 0, scale: 0.75 });

    // Pin the sticky section
    const pinTrigger = ScrollTrigger.create({
      trigger: stickySection,
      start: "top top",
      end: `+=${window.innerHeight * 3}`,
      pin: true,
      pinSpacing: true,
    });

    // Create master timeline for title transitions
    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: stickySection,
        start: "top top",
        end: `+=${window.innerHeight * 2.5}`,
        scrub: 0.5,
      },
    });

    // First transition: title 0 -> title 1
    masterTimeline
      .to(
        titles[0],
        {
          opacity: 0,
          scale: 0.75,
          duration: 0.3,
          ease: "power2.out",
        },
        1
      )
      .to(
        titles[1],
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.in",
        },
        1.25
      );

    // Second transition: title 1 -> title 2
    masterTimeline
      .to(
        titles[1],
        {
          opacity: 0,
          scale: 0.75,
          duration: 0.3,
          ease: "power2.out",
        },
        2
      )
      .to(
        titles[2],
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.in",
        },
        2.25
      );
    masterTimeline
      .to(
        titles[2],
        {
          opacity: 0,
          scale: 0.75,
          duration: 0.3,
          ease: "power2.out",
        },
        2
      )
      .to(
        titles[3],
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.in",
        },
        2.25
      );

    return () => {
      pinTrigger.kill();
      if (masterTimeline.scrollTrigger) {
        masterTimeline.scrollTrigger.kill();
      }
      masterTimeline.kill();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* Sticky Titles Section */}
      <section
        ref={stickyTitlesRef}
        className="relative bg-white
        min-h-screen flex flex-col justify-center items-center 
        px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 overflow-hidden"
      >
        {/* Header indicators */}
        <div className="absolute top-8 left-8 right-8 flex justify-between z-20">
          <p className="text-sm text-[#8B4513] font-medium">Authentic Origin</p>
          <p className="text-sm text-[#8B4513] font-medium">Bulk & Wholesale Supply</p>
        </div>

        <div className="absolute bottom-8 left-8 right-8 flex justify-between z-20">
          <p className="text-sm text-[#8B4513] font-medium">Global Reach</p>
          <p className="text-sm text-[#8B4513] font-medium">Quality Assurance</p>
        </div>

        {/* Main content section with bigger sticky titles */}
        <div className="text-center max-w-7xl mx-auto relative z-10 w-full">
          {/* Sticky transitioning titles - Now much bigger and wider */}
          <div className="relative min-h-[400px] sm:min-h-[500px] flex items-center justify-center px-4 sm:px-8">
            {stickyTitles.map((title, index) => (
              <h1
                key={index}
                ref={(el) => {
                  titlesRef.current[index] = el;
                }}
                className="absolute inset-0 flex items-center justify-center 
                text-3xl md:text-5xl 
                font-bold text-[#4A2C1D] leading-tight sm:leading-tight md:leading-tight
                opacity-0 px-4 sm:px-8 md:px-12"
              >
                {title}
              </h1>
            ))}
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-amber-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-orange-200/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-100/10 rounded-full blur-3xl"></div>
        </div>
      </section>
    </>
  );
}
