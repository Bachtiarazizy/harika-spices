/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

// Register GSAP plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);

// Animated text component
type ShuffleTextProps = {
  text: string;
  as?: React.ElementType;
  className?: string;
  triggerOnScroll?: boolean;
};

const ShuffleText = ({ text, as: Component = "h2", className = "", triggerOnScroll = false }: ShuffleTextProps) => {
  const elementRef = useRef(null);

  useGSAP(() => {
    if (triggerOnScroll) {
      gsap.fromTo(
        elementRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: elementRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [triggerOnScroll]);

  return (
    <Component ref={elementRef} className={className}>
      {text}
    </Component>
  );
};

const Process = () => {
  const containerRef = useRef(null);
  const processScrollTriggers = useRef<ScrollTrigger[]>([]);

  // Harika Spices process data
  const processData = [
    {
      id: 1,
      title: "Premium Sourcing & Selection",
      subtitle: "Direct From Origin — Quality First",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=600&fit=crop",
      description:
        "We source our spices directly from the finest farms across India, ensuring each batch meets our stringent quality standards. Our experienced team personally visits cultivation sites to select only the most aromatic and flavorful spices, guaranteeing authenticity and premium quality in every shipment.",
      link: "/sourcing",
    },
    {
      id: 2,
      title: "Advanced Processing & Packaging",
      subtitle: "Modern Technology — Traditional Excellence",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      description:
        "Our state-of-the-art processing facilities combine cutting-edge technology with time-honored techniques. From careful cleaning and grinding to precision packaging, every step is monitored to preserve the natural oils, colors, and flavors that make our spices exceptional for wholesale and retail markets.",
      link: "/processing",
    },
    {
      id: 3,
      title: "Global Distribution Network",
      subtitle: "Worldwide Reach — Reliable Supply",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=600&fit=crop",
      description:
        "Through our extensive distribution network, we deliver premium Indonesian spices to markets across the globe. Our efficient logistics system ensures timely delivery while maintaining product freshness, supporting restaurants, retailers, and food manufacturers with consistent, high-quality spice supplies.",
      link: "/distribution",
    },
  ];

  // Cleanup function to kill all ScrollTriggers created by this component
  const cleanupScrollTriggers = () => {
    processScrollTriggers.current.forEach((trigger) => trigger.kill());
    processScrollTriggers.current = [];
  };

  // Handle case studies image pinning and scale animations on scroll
  useGSAP(
    () => {
      // Clean up any existing triggers first
      cleanupScrollTriggers();

      const images = gsap.utils.toArray(".process-img");
      const contentItems = gsap.utils.toArray(".process-item");

      images.forEach((img, i) => {
        const imgElement = (img as HTMLElement).querySelector("img");
        const overlayElement = (img as HTMLElement).querySelector(".image-overlay");
        const isLastImage = i === images.length - 1;

        // Initial setup - hide all images except the first
        if (i === 0) {
          gsap.set(imgElement, { scale: 1.2, opacity: 1 });
          gsap.set(overlayElement, { opacity: 0 });
        } else {
          gsap.set(imgElement, { scale: 1.4, opacity: 0 });
          gsap.set(overlayElement, { opacity: 1 });
        }

        // Smooth scale and opacity animation based on content scroll
        const contentTrigger = ScrollTrigger.create({
          trigger: contentItems[i] as Element,
          start: "top center",
          end: "bottom center",
          refreshPriority: -1,
          onEnter: () => {
            // Fade in current image
            gsap.to(imgElement, {
              opacity: 1,
              scale: 1.1,
              duration: 1.5,
              ease: "power2.out",
            });
            gsap.to(overlayElement, {
              opacity: 0,
              duration: 1.2,
              ease: "power2.inOut",
            });
          },
          onLeave: () => {
            // Keep image visible but slightly scaled down
            gsap.to(imgElement, {
              scale: 1,
              duration: 1.2,
              ease: "power2.inOut",
            });
          },
          onEnterBack: () => {
            // Restore image when scrolling back
            gsap.to(imgElement, {
              opacity: 1,
              scale: 1.1,
              duration: 1.2,
              ease: "power2.out",
            });
            gsap.to(overlayElement, {
              opacity: 0,
              duration: 1.0,
              ease: "power2.inOut",
            });
          },
          onLeaveBack: () => {
            if (i > 0) {
              // Fade out previous images when scrolling back up
              gsap.to(imgElement, {
                opacity: 0.3,
                scale: 1.3,
                duration: 1.0,
                ease: "power2.inOut",
              });
              gsap.to(overlayElement, {
                opacity: 0.8,
                duration: 1.0,
                ease: "power2.inOut",
              });
            }
          },
        });

        // Pin animation with different behavior for last image
        let pinTrigger;

        if (isLastImage) {
          // For the last image, pin it only until the last content starts to leave
          pinTrigger = ScrollTrigger.create({
            trigger: img as Element,
            start: "top top",
            end: () => {
              const lastContentItem = contentItems[contentItems.length - 1] as HTMLElement;
              return `+=${lastContentItem.offsetHeight * 0.1}`; // Pin for only 30% of the last content height
            },
            pin: true,
            pinSpacing: false,
            invalidateOnRefresh: true,
            refreshPriority: -1,
            id: `process-pin-${i}`,
            anticipatePin: 1,
          });
        } else {
          // For other images, use the original logic
          pinTrigger = ScrollTrigger.create({
            trigger: img as Element,
            start: "top top",
            end: () => {
              const remainingContentHeight = contentItems.slice(i + 1).reduce((acc: number, item) => {
                return acc + (item as HTMLElement).offsetHeight;
              }, 0);
              return `+=${remainingContentHeight}`;
            },
            pin: true,
            pinSpacing: false,
            invalidateOnRefresh: true,
            refreshPriority: -1,
            id: `process-pin-${i}`,
            anticipatePin: 1,
          });
        }

        // Store triggers for cleanup
        processScrollTriggers.current.push(contentTrigger, pinTrigger);
      });

      // Refresh ScrollTrigger with a longer delay for better calculation
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);

      return cleanupScrollTriggers;
    },
    { scope: containerRef, dependencies: [processData] }
  );

  // Additional useEffect to handle cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupScrollTriggers();
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-gradient-to-br from-slate-50 via-white to-amber-50 text-slate-800 relative z-10">
      {/* Process Header */}
      <section className="relative w-full bg-gradient-to-br from-slate-50 via-white to-amber-50 px-8 md:px-16 py-16 md:py-24">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <ShuffleText as="h2" text="Our Journey From Farm to Your Table" triggerOnScroll={true} className="text-3xl md:text-5xl font-bold text-[#4A2C1D] leading-tight sm:leading-tight md:leading-tight mb-6" />
            <ShuffleText
              as="p"
              text="Discover how we transform premium spices through our meticulous three-step process, ensuring exceptional quality at every stage."
              triggerOnScroll={true}
              className="text-medium md:text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed"
            />
          </div>
        </div>
      </section>

      {/* Process Items */}
      <section className="relative w-full bg-gradient-to-br from-slate-50 via-white to-amber-50 flex flex-col md:flex-row">
        {/* Content Column */}
        <div className="flex-1 relative z-20">
          {processData.map((item, index) => (
            <div key={item.id} className="process-item w-full min-h-screen flex items-center py-16 md:py-24" data-index={index}>
              <div className="container mx-auto px-8 md:px-16">
                <div className="flex flex-col justify-center h-full max-w-2xl">
                  <div className="mb-4">
                    <span className="inline-block px-4 py-2 bg-amber-100 text-amber-800 text-sm font-semibold rounded-full mb-4 uppercase tracking-wider">Step {index + 1}</span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold text-[#4A2C1D] leading-tight sm:leading-tight md:leading-tight mb-3">{item.title}</h3>
                  <p className="text-sm md:text-base text-amber-700 uppercase tracking-wider mb-6 font-semibold">{item.subtitle}</p>

                  {/* Mobile Image - Hidden on Desktop */}
                  <div className="block md:hidden rounded-2xl overflow-hidden h-64 mb-6 shadow-lg">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>

                  <p className="text-slate-600 text-lg md:text-xl leading-relaxed mb-8">{item.description}</p>

                  {/* Mobile Link - Hidden on Desktop */}
                  <div className="flex md:hidden items-center gap-3 group cursor-pointer">
                    <Link href={item.link} className="text-amber-600 hover:text-amber-700 transition-colors duration-300 font-semibold">
                      Learn More About This Process
                    </Link>
                    <ArrowRight size={20} className="text-amber-600 group-hover:text-amber-700 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Images Column - Desktop Only */}
        <div className="flex-1 relative hidden md:block">
          {processData.map((item, index) => (
            <div key={`img-${item.id}`} className="process-img w-full h-screen sticky top-0 will-change-transform rounded-3xl overflow-hidden" data-image-index={index}>
              <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full rounded-3xl object-cover will-change-transform transition-all duration-1000 ease-out" />

              {/* Smooth overlay */}
              <div className="image-overlay absolute inset-0 rounded-3xl bg-gradient-to-br from-slate-800/60 via-slate-700/40 to-transparent opacity-80 transition-opacity duration-1000 ease-out"></div>

              {/* Content overlay with smooth animations */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent">
                <div className="absolute bottom-8 left-8 right-8">
                  <h4 className="text-white text-2xl font-bold mb-2">{item.title}</h4>
                  <p className="text-white/80 text-sm uppercase tracking-wider mb-4 font-semibold">{item.subtitle}</p>

                  <Link href={item.link} className="inline-flex items-center gap-2 text-white hover:text-amber-300 transition-colors duration-300 group">
                    <span className="font-semibold">Explore Process</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-8 right-8">
                <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">{String(index + 1).padStart(2, "0")}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom section with call to action */}
      <section className="relative w-full bg-gradient-to-br from-[#4A2C1D] to-[#8B4513] text-white px-8 md:px-16 py-16">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl md:text-4xl font-bold mb-4 text-white">Ready to Experience Premium Quality?</h3>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">Contact us today to learn more about our wholesale opportunities and premium spice offerings.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-full hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-105 duration-300 font-semibold"
          >
            <span>Get Started</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Process;
