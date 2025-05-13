// components/sections/ContactSection.tsx
"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Send, MapPin, Phone, Mail, CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    country: "",
    product: "",
    volume: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);

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

      // Contact info animation
      tl.fromTo(
        Array.from(contactInfoRef.current?.children || []),
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

      // Form animation
      tl.fromTo(
        formRef.current,
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
        0.6
      );

      return () => tl.kill();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
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

        <div className="container mx-auto relative z-10 text-center">
          <CheckCircle2 className="mx-auto mb-8 text-[#8B4513]" size={80} strokeWidth={1.5} />
          <h2 className="text-4xl font-bold mb-6 text-[#4A2C1D]">Thank You for Your Interest!</h2>
          <p className="text-xl text-[#4A2C1D]/80 mb-8 max-w-2xl mx-auto">Our team will contact you within 24 hours. We&apos;re excited to help you source the finest Indonesian spices for your business.</p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="group flex items-center justify-center gap-2 mx-auto
            bg-[#8B4513] text-white px-10 py-4 
            rounded-full hover:bg-[#6A3400] 
            transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Submit Another Request
            <Send className="transition-transform group-hover:translate-x-1" size={20} />
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-br from-[#F5E6D3] to-[#E6D3BA] 
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
          Connect with Harika Spices
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div ref={contactInfoRef} className="space-y-8">
            <div
              className="bg-white/60 backdrop-blur-sm 
              border border-[#8B4513]/10 p-8 rounded-2xl 
              transition duration-300 
              transform hover:scale-[1.02] hover:shadow-xl"
            >
              <div className="flex items-center mb-4">
                <MapPin className="text-[#8B4513] mr-4" size={40} />
                <div>
                  <h3 className="text-2xl font-bold text-[#4A2C1D]">Our Location</h3>
                  <p className="text-[#4A2C1D]/80">Semarang, Central Java, Indonesia</p>
                </div>
              </div>
            </div>

            <div
              className="bg-white/60 backdrop-blur-sm 
              border border-[#8B4513]/10 p-8 rounded-2xl 
              transition duration-300 
              transform hover:scale-[1.02] hover:shadow-xl"
            >
              <div className="flex items-center mb-4">
                <Phone className="text-[#8B4513] mr-4" size={40} />
                <div>
                  <h3 className="text-2xl font-bold text-[#4A2C1D]">Contact Number</h3>
                  <p className="text-[#4A2C1D]/80">+62 811 272 3939</p>
                </div>
              </div>
            </div>

            <div
              className="bg-white/60 backdrop-blur-sm 
              border border-[#8B4513]/10 p-8 rounded-2xl 
              transition duration-300 
              transform hover:scale-[1.02] hover:shadow-xl"
            >
              <div className="flex items-center mb-4">
                <Mail className="text-[#8B4513] mr-4" size={40} />
                <div>
                  <h3 className="text-2xl font-bold text-[#4A2C1D]">Email Address</h3>
                  <p className="text-[#4A2C1D]/80">export@harikaexport.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-white/60 backdrop-blur-sm 
            border border-[#8B4513]/10 p-8 rounded-2xl 
            shadow-lg opacity-0"
          >
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="name" className="block mb-2 text-[#4A2C1D] font-semibold">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border-2 border-[#8B4513]/20 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-[#8B4513] 
                  transition duration-300"
                />
              </div>
              <div>
                <label htmlFor="company" className="block mb-2 text-[#4A2C1D] font-semibold">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-[#8B4513]/20 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-[#8B4513] 
                  transition duration-300"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="email" className="block mb-2 text-[#4A2C1D] font-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border-2 border-[#8B4513]/20 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-[#8B4513] 
                  transition duration-300"
                />
              </div>
              <div>
                <label htmlFor="country" className="block mb-2 text-[#4A2C1D] font-semibold">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border-2 border-[#8B4513]/20 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-[#8B4513] 
                  transition duration-300"
                >
                  <option value="">Select Country</option>
                  <option value="Indonesia">Indonesia</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="Singapore">Singapore</option>
                  <option value="United States">United States</option>
                  <option value="Europe">Europe</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="product" className="block mb-2 text-[#4A2C1D] font-semibold">
                  Interested Product
                </label>
                <select
                  id="product"
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border-2 border-[#8B4513]/20 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-[#8B4513] 
                  transition duration-300"
                >
                  <option value="">Select Product</option>
                  <option value="Cloves">Cloves</option>
                  <option value="Black Pepper">Black Pepper</option>
                  <option value="Cinnamon">Cinnamon</option>
                  <option value="Nutmeg">Nutmeg</option>
                  <option value="Cardamom">Cardamom</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="volume" className="block mb-2 text-[#4A2C1D] font-semibold">
                  Estimated Volume (kg)
                </label>
                <input
                  type="number"
                  id="volume"
                  name="volume"
                  value={formData.volume}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-3 border-2 border-[#8B4513]/20 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-[#8B4513] 
                  transition duration-300"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block mb-2 text-[#4A2C1D] font-semibold">
                Additional Information
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 border-2 border-[#8B4513]/20 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-[#8B4513] 
                transition duration-300"
                placeholder="Add any special requests or additional information"
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="group flex items-center justify-center gap-2 mx-auto
                bg-[#8B4513] text-white px-12 py-4 
                rounded-full hover:bg-[#6A3400] 
                transition duration-300 transform hover:scale-105 shadow-lg"
              >
                Submit Request
                <Send className="transition-transform group-hover:translate-x-1" size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
