"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Function to check if a link is active
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleGetQuote = () => {
    const subject = encodeURIComponent("Quote Request - Harika Spices");
    const body = encodeURIComponent(`Dear Harika Spices Team,

I am interested in getting a quote for your spice products. Please provide me with:

- Product catalog and pricing
- Minimum order quantities
- Export terms and conditions
- Delivery timeframes

Please contact me at your earliest convenience.

Best regards,
[Your Name]
[Your Company]
[Your Contact Information]`);

    window.location.href = `mailto:info@harikaspices.com?subject=${subject}&body=${body}`;
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
            <Link href="/" className={`text-sm font-medium transition-colors duration-200 ${isActive("/") ? "text-[#e5d4b1] border-b-2 border-[#e5d4b1] pb-1" : "hover:text-[#e5d4b1]"}`}>
              Home
            </Link>
            <Link href="/about" className={`text-sm font-medium transition-colors duration-200 ${isActive("/about") ? "text-[#e5d4b1] border-b-2 border-[#e5d4b1] pb-1" : "hover:text-[#e5d4b1]"}`}>
              About Us
            </Link>
            <Link href="/products" className={`text-sm font-medium transition-colors duration-200 ${isActive("/products") ? "text-[#e5d4b1] border-b-2 border-[#e5d4b1] pb-1" : "hover:text-[#e5d4b1]"}`}>
              Our Products
            </Link>
            <Link href="/export-process" className={`text-sm font-medium transition-colors duration-200 ${isActive("/export-process") ? "text-[#e5d4b1] border-b-2 border-[#e5d4b1] pb-1" : "hover:text-[#e5d4b1]"}`}>
              Export Process
            </Link>
            <Link href="/articles" className={`text-sm font-medium transition-colors duration-200 ${isActive("/articles") ? "text-[#e5d4b1] border-b-2 border-[#e5d4b1] pb-1" : "hover:text-[#e5d4b1]"}`}>
              Articles
            </Link>
            <Link href="/contact" className={`text-sm font-medium transition-colors duration-200 ${isActive("/contact") ? "text-[#e5d4b1] border-b-2 border-[#e5d4b1] pb-1" : "hover:text-[#e5d4b1]"}`}>
              Contact
            </Link>

            {/* Desktop CTA Button */}
            <button
              onClick={handleGetQuote}
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-2 rounded-lg font-medium shadow-md hover:bg-white hover:text-[#3A2A1A] transition-all duration-200 transform hover:scale-105"
            >
              Get Quote
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button onClick={toggleMobileMenu} className="p-2 rounded-md hover:bg-white/10 transition-colors duration-200" aria-label="Toggle mobile menu">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-40 ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={closeMobileMenu} />

        {/* Mobile Menu */}
        <div className={`lg:hidden fixed top-0 right-0 h-full w-80 bg-[#2A1A0A]/95 backdrop-blur-md shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/20">
            <Image src="/logo.png" alt="Company Logo" width={150} height={36} className="h-6 w-auto object-contain" priority />
            <button onClick={closeMobileMenu} className="p-2 rounded-md hover:bg-white/10 transition-colors duration-200" aria-label="Close mobile menu">
              <X size={20} />
            </button>
          </div>

          {/* Mobile Menu Items */}
          <div className="flex flex-col h-full">
            <div className="flex-1 px-4 py-6 space-y-2">
              <Link
                href="/"
                className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 border-b border-white/10 ${
                  isActive("/") ? "bg-[#e5d4b1]/20 text-[#e5d4b1] border-[#e5d4b1]/30" : "hover:bg-white/10 hover:text-[#e5d4b1]"
                }`}
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 border-b border-white/10 ${
                  isActive("/about") ? "bg-[#e5d4b1]/20 text-[#e5d4b1] border-[#e5d4b1]/30" : "hover:bg-white/10 hover:text-[#e5d4b1]"
                }`}
                onClick={closeMobileMenu}
              >
                About Us
              </Link>
              <Link
                href="/products"
                className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 border-b border-white/10 ${
                  isActive("/products") ? "bg-[#e5d4b1]/20 text-[#e5d4b1] border-[#e5d4b1]/30" : "hover:bg-white/10 hover:text-[#e5d4b1]"
                }`}
                onClick={closeMobileMenu}
              >
                Our Products
              </Link>
              <Link
                href="/export-process"
                className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 border-b border-white/10 ${
                  isActive("/export-process") ? "bg-[#e5d4b1]/20 text-[#e5d4b1] border-[#e5d4b1]/30" : "hover:bg-white/10 hover:text-[#e5d4b1]"
                }`}
                onClick={closeMobileMenu}
              >
                Export Process
              </Link>
              <Link
                href="/articles"
                className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 border-b border-white/10 ${
                  isActive("/articles") ? "bg-[#e5d4b1]/20 text-[#e5d4b1] border-[#e5d4b1]/30" : "hover:bg-white/10 hover:text-[#e5d4b1]"
                }`}
                onClick={closeMobileMenu}
              >
                Articles
              </Link>
              <Link
                href="/contact"
                className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 border-b border-white/10 ${
                  isActive("/contact") ? "bg-[#e5d4b1]/20 text-[#e5d4b1] border-[#e5d4b1]/30" : "hover:bg-white/10 hover:text-[#e5d4b1]"
                }`}
                onClick={closeMobileMenu}
              >
                Contact
              </Link>
            </div>

            {/* Mobile CTA Button */}
            <div className="p-4 border-t border-white/20">
              <button
                onClick={() => {
                  handleGetQuote();
                  closeMobileMenu();
                }}
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-4 rounded-lg font-medium shadow-md hover:bg-white hover:text-[#3A2A1A] transition-all duration-200 text-center"
              >
                Get Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
