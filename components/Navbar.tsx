"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="absolute top-0 left-0 right-0 bg-transparent text-white z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png" // Ganti dengan path logo asli Anda
                alt="Company Logo"
                width={250}
                height={60}
                className="h-8 w-auto sm:h-10 md:h-12 object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium hover:text-[#e5d4b1] transition-colors duration-200">
              Home
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-[#e5d4b1] transition-colors duration-200">
              About Us
            </Link>
            <Link href="/products" className="text-sm font-medium hover:text-[#e5d4b1] transition-colors duration-200">
              Our Products
            </Link>
            <Link href="/quality-standards" className="text-sm font-medium hover:text-[#e5d4b1] transition-colors duration-200">
              Quality Standards
            </Link>

            {/* Desktop Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium hover:text-[#e5d4b1] transition-colors duration-200">
                Sustainability
                <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white text-black shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div className="py-2">
                  <Link href="/sustainability/environment" className="block px-4 py-3 text-sm hover:bg-gray-50 hover:text-[#3A2A1A] transition-colors duration-200">
                    Environment
                  </Link>
                  <Link href="/sustainability/community" className="block px-4 py-3 text-sm hover:bg-gray-50 hover:text-[#3A2A1A] transition-colors duration-200">
                    Community
                  </Link>
                  <Link href="/sustainability/impact" className="block px-4 py-3 text-sm hover:bg-gray-50 hover:text-[#3A2A1A] transition-colors duration-200">
                    Impact
                  </Link>
                </div>
              </div>
            </div>

            {/* Desktop CTA Button */}
            <Link href="/explore">
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-2 rounded-lg font-medium shadow-md hover:bg-white hover:text-[#3A2A1A] transition-all duration-200 transform hover:scale-105">
                Explore
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button onClick={toggleMobileMenu} className="p-2 rounded-md hover:bg-white/10 transition-colors duration-200" aria-label="Toggle mobile menu">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-screen opacity-100 visible" : "max-h-0 opacity-0 invisible overflow-hidden"}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-[#2A1A0A]/95 backdrop-blur-sm rounded-b-lg shadow-lg">
            <Link href="/" className="block px-3 py-2 text-base font-medium hover:bg-white/10 hover:text-[#e5d4b1] rounded-md transition-colors duration-200" onClick={closeMobileMenu}>
              Home
            </Link>
            <Link href="/about" className="block px-3 py-2 text-base font-medium hover:bg-white/10 hover:text-[#e5d4b1] rounded-md transition-colors duration-200" onClick={closeMobileMenu}>
              About Us
            </Link>
            <Link href="/products" className="block px-3 py-2 text-base font-medium hover:bg-white/10 hover:text-[#e5d4b1] rounded-md transition-colors duration-200" onClick={closeMobileMenu}>
              Our Products
            </Link>
            <Link href="/quality-standards" className="block px-3 py-2 text-base font-medium hover:bg-white/10 hover:text-[#e5d4b1] rounded-md transition-colors duration-200" onClick={closeMobileMenu}>
              Quality Standards
            </Link>

            {/* Mobile Dropdown */}
            <div className="relative">
              <button onClick={toggleDropdown} className="w-full flex items-center justify-between px-3 py-2 text-base font-medium hover:bg-white/10 hover:text-[#e5d4b1] rounded-md transition-colors duration-200">
                Sustainability
                <ChevronDown size={16} className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <div className={`transition-all duration-300 ease-in-out ${isDropdownOpen ? "max-h-48 opacity-100 visible" : "max-h-0 opacity-0 invisible overflow-hidden"}`}>
                <div className="pl-6 space-y-1">
                  <Link href="/sustainability/environment" className="block px-3 py-2 text-sm hover:bg-white/10 hover:text-[#e5d4b1] rounded-md transition-colors duration-200" onClick={closeMobileMenu}>
                    Environment
                  </Link>
                  <Link href="/sustainability/community" className="block px-3 py-2 text-sm hover:bg-white/10 hover:text-[#e5d4b1] rounded-md transition-colors duration-200" onClick={closeMobileMenu}>
                    Community
                  </Link>
                  <Link href="/sustainability/impact" className="block px-3 py-2 text-sm hover:bg-white/10 hover:text-[#e5d4b1] rounded-md transition-colors duration-200" onClick={closeMobileMenu}>
                    Impact
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile CTA Button */}
            <div className="pt-4">
              <Link href="/explore">
                <button
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-3 rounded-lg font-medium shadow-md hover:bg-white hover:text-[#3A2A1A] transition-colors duration-200"
                  onClick={closeMobileMenu}
                >
                  Explore
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
