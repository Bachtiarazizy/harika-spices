/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ReactLenis from "lenis/react";
import AnimatedCopy from "@/components/shared/animated-copy";
import AnimatedH1 from "@/components/shared/animated-h1";
import ParallaxImage from "@/components/shared/parallax-image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const clientBrands = [
  "Taj Foods",
  "Royal Spices",
  "Golden Herbs",
  "Eastern Flavors",
  "Spice Kingdom",
  "Aroma Palace",
  "Heritage Spices",
  "Imperial Masala",
  "Crown Spices",
  "Maharaja Foods",
  "Exotic Blends",
  "Premium Spices",
  "Grand Masala",
  "Noble Spices",
  "Supreme Foods",
  "Classic Spices",
];

const AboutPage = () => {
  const container = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const breadcrumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }
  }, []);

  useGSAP(
    () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      const timeoutId = setTimeout(() => {
        if (windowWidth > 900) {
          const expertiseSection = document.querySelector(".expertise");
          const expertiseHeader = document.querySelector(".expertise-header");
          const services = document.querySelector(".services");

          if (expertiseSection && expertiseHeader && services) {
            ScrollTrigger.refresh();

            scrollTriggerRef.current = ScrollTrigger.create({
              trigger: expertiseSection,
              start: "top top",
              endTrigger: services,
              end: "bottom bottom",
              pin: expertiseHeader,
              pinSpacing: false,
              onEnter: () => {
                gsap.to(expertiseHeader, { duration: 0.1, ease: "power1.out" });
              },
            });
          }
        }
      }, 100);

      return () => {
        window.removeEventListener("resize", handleResize);
        clearTimeout(timeoutId);

        if (scrollTriggerRef.current) {
          scrollTriggerRef.current.kill();
        }
      };
    },
    { dependencies: [windowWidth], scope: container }
  );

  useEffect(() => {
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 300);

    return () => {
      clearTimeout(refreshTimeout);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <ReactLenis root>
      <div className="page overflow-hidden" ref={container}>
        {/* Hero Breadcrumb Section */}
        <div
          ref={breadcrumbRef}
          className="relative h-96 flex items-center  overflow-hidden"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1920&h=1080&fit=crop&crop=center")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20"></div>

          {/* Animated Background Pattern */}
          {/* <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#E6B84F]/20 to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-[#E6B84F]/10 to-transparent rounded-full blur-3xl"></div>
          </div> */}

          {/* Content */}
          <div className="container mx-auto px-16 pt-24 relative z-10">
            <div className="max-w-5xl">
              {/* Breadcrumb Navigation */}
              <div className="flex items-center space-x-3 mb-4 text-lg">
                <Link href="/" className="text-gray-300 hover:text-[#E6B84F] transition-all duration-300 hover:scale-105 flex items-center space-x-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>Home</span>
                </Link>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-px bg-gradient-to-r from-gray-500 to-[#E6B84F]"></div>
                  <span className="text-[#E6B84F] font-semibold text-xl">About Us</span>
                </div>
              </div>

              {/* Description */}
              <div className="max-w-3xl">
                <p className="text-medium md:text-lg text-gray-200 leading-relaxed">Discover the journey of PT ARTA FORTUNA GLOBALINK—where tradition meets innovation in bringing premium agricultural products to the world.</p>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white">
            <div className="flex flex-col items-center space-y-2">
              <span className="text-sm text-gray-300">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-[#E6B84F] rounded-full mt-2 animate-bounce"></div>
              </div>
            </div>
          </div> */}
        </div>

        {/* About Copy Section */}
        <section className="relative w-screen py-[8em]">
          <div className="container w-2/3 mx-auto">
            <AnimatedCopy
              className="text-3xl md:text-5xl 
                font-bold text-[#4A2C1D] leading-none"
              tag="h2"
            >
              Your Gateway to
              <br />
              Authentic Indonesian Flavor.
            </AnimatedCopy>

            <div className="about-copy-wrapper mt-[2em]">
              <AnimatedCopy className="text-lg md:text-xl text-[#8B4513] font-light leading-normal mb-[2em]">
                Welcome to HarikaSpices, your trusted Indonesian spice exporter. We unite Indonesia’s rich culinary heritage with the needs of global B2B buyers. As a bulk spice supplier, HarikaSpices specializes in sourcing and exporting
                six flagship Indonesian spices: cloves, pepper, nutmeg, cinnamon, ginger, and turmeric. Each spice is sourced from its native region in Indonesia and processed to meet strict international standards. Our mission is to
                deliver the true spirit of Indonesian flavor to kitchens and factories around the world, backed by superior quality control and seamless shipping.
              </AnimatedCopy>

              <AnimatedCopy delay={0.25} className="text-lg md:text-xl text-[#8B4513] font-light leading-normal mb-[2em]">
                HarikaSpices was founded with a simple mission: to bring authentic Indonesian spices to the world’s markets. We partner closely with experienced farmers and co-ops across Indonesia—from the Maluku clove groves to the Lampung
                pepper farms and Javanese spice gardens—to source each crop at peak quality. Our history is rooted in the belief that Indonesia’s spice heritage should be shared globally. Over the years, we have grown from a local trading
                venture into a respected exporter, serving food companies and distributors in multiple countries.
              </AnimatedCopy>

              <AnimatedCopy delay={0.5} className="text-lg md:text-xl text-[#8B4513] font-light leading-normal mb-[2em]">
                HarikaSpices connects global food and manufacturing businesses with premium Indonesian spices. We partner directly with local farmers across Indonesia’s Spice Islands to deliver high-volume, wholesale supplies of cloves,
                pepper, nutmeg, cinnamon, ginger, and turmeric. Our value lies in offering export-grade quality products—with rigorous grading, certifications, and reliable logistics—to ensure our B2B customers worldwide receive consistent,
                authentic flavors straight from Indonesia
              </AnimatedCopy>

              <div className="about-copy-img relative w-full h-[500px] overflow-hidden mt-[2em]">
                <div className="about-copy-img-wrapper relative w-full h-full overflow-hidden">
                  <ParallaxImage src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop" alt="Harika Spices Processing Facility" speed={0.2} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="expertise relative w-screen h-full min-h-[100svh]">
          <div className="expertise-header absolute pt-[4em] top-0 left-0 w-screen h-[100svh] overflow-hidden will-change-transform">
            <div className="container flex flex-col justify-between h-full">
              <div className="row flex justify-between">
                <AnimatedH1 animateOnScroll={true}>
                  What we <br /> do best
                </AnimatedH1>

                <div className="expertise-img-1 relative w-[15%] overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=400&fit=crop" alt="" className="w-full h-auto" />
                </div>
              </div>
              <div className="row">
                <div className="expertise-img-2 w-[30%]">
                  <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=400&fit=crop" alt="" className="w-full h-auto" />
                </div>
              </div>
            </div>
          </div>

          <div className="services relative w-1/2 mx-auto flex py-[5.5em_0_1em_0] will-change-transform">
            <div className="col flex-1"></div>
            <div className="col flex-1">
              <div className="service mb-[8em]">
                <AnimatedCopy tag="h3">(01)</AnimatedCopy>
                <AnimatedCopy tag="h2">Premium Sourcing</AnimatedCopy>
                <AnimatedCopy>01 Direct Farm Partnerships</AnimatedCopy>
                <AnimatedCopy>02 Quality Assessment & Selection</AnimatedCopy>
                <AnimatedCopy>03 Origin Verification</AnimatedCopy>
                <AnimatedCopy>04 Seasonal Procurement</AnimatedCopy>
                <AnimatedCopy>05 Farmer Relationship Management</AnimatedCopy>
              </div>
              <div className="service mb-[8em]">
                <AnimatedCopy tag="h3">(02)</AnimatedCopy>
                <AnimatedCopy tag="h2">Advanced Processing</AnimatedCopy>
                <AnimatedCopy>01 Modern Cleaning & Sorting</AnimatedCopy>
                <AnimatedCopy>02 Precision Grinding & Blending</AnimatedCopy>
                <AnimatedCopy>03 Quality Control Systems</AnimatedCopy>
                <AnimatedCopy>04 Packaging & Preservation</AnimatedCopy>
                <AnimatedCopy>05 Freshness Maintenance</AnimatedCopy>
              </div>
              <div className="service mb-[8em]">
                <AnimatedCopy tag="h3">(03)</AnimatedCopy>
                <AnimatedCopy tag="h2">Global Distribution</AnimatedCopy>
                <AnimatedCopy>01 International Logistics</AnimatedCopy>
                <AnimatedCopy>02 Supply Chain Management</AnimatedCopy>
                <AnimatedCopy>03 Export Documentation</AnimatedCopy>
                <AnimatedCopy>04 Worldwide Shipping</AnimatedCopy>
                <AnimatedCopy>05 Market Penetration</AnimatedCopy>
              </div>
              <div className="service mb-[8em]">
                <AnimatedCopy tag="h3">(04)</AnimatedCopy>
                <AnimatedCopy tag="h2">Quality Assurance</AnimatedCopy>
                <AnimatedCopy>01 Laboratory Testing</AnimatedCopy>
                <AnimatedCopy>02 International Certifications</AnimatedCopy>
                <AnimatedCopy>03 Food Safety Standards</AnimatedCopy>
                <AnimatedCopy>04 Purity Verification</AnimatedCopy>
                <AnimatedCopy>05 Compliance Monitoring</AnimatedCopy>
              </div>
              <div className="service">
                <AnimatedCopy tag="h3">(05)</AnimatedCopy>
                <AnimatedCopy tag="h2">Customer Solutions</AnimatedCopy>
                <AnimatedCopy>01 Custom Blending Services</AnimatedCopy>
                <AnimatedCopy>02 Private Label Manufacturing</AnimatedCopy>
                <AnimatedCopy>03 Bulk Supply Solutions</AnimatedCopy>
                <AnimatedCopy>04 Technical Support</AnimatedCopy>
                <AnimatedCopy>05 Market Insights & Consultation</AnimatedCopy>
              </div>
            </div>
          </div>
        </section>

        {/* About Outro Banner */}
        <section className="about-outro-banner relative w-screen h-[75vh] overflow-hidden my-[8em_0_0_0] bg-bg">
          <div className="about-outro-img relative w-full h-full">
            <ParallaxImage src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop" alt="" speed={0.2} />
          </div>
        </section>

        {/* Founder Voice Section */}
        <section className="founder-voice relative w-screen py-[8em]">
          <div className="container w-1/2 mx-auto border-l border-l-white/10">
            <AnimatedCopy tag="h2" className="mb-[3em]">
              &quot;Harika Spices revolutionizes the spice industry by seamlessly connecting authentic Indian flavors with global markets, crafting taste experiences that preserve tradition while embracing modern excellence.&quot;
            </AnimatedCopy>

            <div className="founder-image w-[200px] mb-[20px]">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face" alt="" className="w-full h-auto" />
            </div>
            <div className="founter-info">
              <AnimatedCopy>Rajesh Harika</AnimatedCopy>
              <AnimatedCopy>Founder & CEO</AnimatedCopy>
            </div>
          </div>
        </section>

        {/* Client Logos Section */}
        <section className="client-logos relative w-full py-[6em] bg-bg overflow-x-hidden">
          <div className="container w-full mx-auto overflow-hidden">
            <div className="logos-grid grid grid-cols-4 gap-5 w-full">
              {clientBrands.map((brand, index) => (
                <div className="logo-item aspect-[5/3] flex flex-col items-center justify-start py-[1em] border-t border-t-white/10 w-full" key={index}>
                  <div className="logo-details w-full flex justify-between items-center p-0">
                    <p className="text-[20px]">■</p>
                    <p>{brand}</p>
                  </div>
                  <img src={`/client-logos/${String.fromCharCode(65 + Math.floor(index / 2))}${(index % 2) + 1}.png`} alt={`${brand} logo`} className="w-1/5 h-auto object-contain mt-[20px]" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </ReactLenis>
  );
};

export default AboutPage;
