// components/layout/Header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, User, Send } from "lucide-react";
import Image from "next/image";
import { gsap } from "gsap";

const NAV_ITEMS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#products", label: "Products" },
  { href: "#sustainability", label: "Sustainability" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Initial animation for header
    const headerElements = document.querySelectorAll(".header-animate");
    gsap.fromTo(
      headerElements,
      {
        opacity: 0,
        y: -50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      }
    );

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 
      ${isScrolled ? "bg-[#F5E6D3]/90 backdrop-blur-md shadow-md" : "bg-transparent"}
      py-4 md:py-6`}
    >
      <div className="container mx-auto px-4 md:px-12 lg:px-24 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 header-animate">
          {/* <Image src="/api/placeholder/50/50" alt="Harika Spices Logo" width={50} height={50} className="rounded-full" /> */}
          <span className="text-2xl font-bold text-[#4A2C1D] header-animate">Harika Spices</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 header-animate">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[#4A2C1D]/80 hover:text-[#8B4513] 
              transition duration-300 group flex items-center gap-2"
            >
              {item.label}
              <span
                className="w-0 group-hover:w-2 transition-all duration-300 
              h-0.5 bg-[#8B4513] inline-block"
              ></span>
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4 header-animate">
          <button
            className="group flex items-center gap-2 
            border-2 border-[#8B4513] text-[#4A2C1D] 
            px-4 py-2 rounded-full 
            hover:bg-[#8B4513] hover:text-white 
            transition duration-300"
          >
            Contact Us
            <Send size={18} className="group-hover:rotate-45 transition duration-300" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden header-animate">
          <button onClick={toggleMenu} className="text-[#4A2C1D] focus:outline-none">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-[#F5E6D3] z-40 
          md:hidden flex flex-col pt-24 px-8 
          animate-fade-in"
        >
          <nav className="space-y-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={toggleMenu}
                className="block text-2xl text-[#4A2C1D] 
                hover:text-[#8B4513] transition duration-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-12 space-y-4">
            <button
              className="w-full flex items-center justify-center gap-2 
              bg-[#8B4513] text-white px-6 py-3 rounded-full 
              hover:bg-[#6A3400] transition duration-300"
            >
              <ShoppingCart size={20} />
              View Cart
            </button>
            <button
              className="w-full flex items-center justify-center gap-2 
              border-2 border-[#8B4513] text-[#4A2C1D] 
              px-6 py-3 rounded-full 
              hover:bg-[#8B4513] hover:text-white 
              transition duration-300"
            >
              <User size={20} />
              Login
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
