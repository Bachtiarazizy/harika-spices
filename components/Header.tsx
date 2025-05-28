"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Send, ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import { Locale } from "@/middleware";
import LanguageSwitcher from "./LanguageSwitcher";

interface HeaderProps {
  currentLocale: Locale;
  dictionary: {
    navigation: {
      home: string;
      about: string;
      products: string;
      sustainability: string;
      contact: string;
    };
    products: {
      navigation: {
        wholeSpices: string;
        groundSpices: string;
        spiceBlends: string;
        organicSpices: string;
        premiumCollection: string;
      };
    };
  };
}

export default function Header({ currentLocale, dictionary }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);

  // Get navigation translations
  const nav = dictionary.navigation;
  const products = dictionary.products.navigation;

  const NAV_ITEMS = [
    { href: "/", label: nav.home },
    { href: "/about", label: nav.about },
    {
      href: "/products",
      label: nav.products,
      hasDropdown: true,
      dropdownItems: [
        { href: "/products/whole-spices", label: products.wholeSpices },
        { href: "/products/ground-spices", label: products.groundSpices },
        { href: "/products/spice-blends", label: products.spiceBlends },
        { href: "/products/organic-spices", label: products.organicSpices },
        { href: "/products/premium-collection", label: products.premiumCollection },
      ],
    },
    { href: "/sustainability", label: nav.sustainability },
  ];

  useEffect(() => {
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
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Prepend locale to navigation links
  const localizedNavItems = NAV_ITEMS.map((item) => ({
    ...item,
    href: `/${currentLocale}${item.href === "/" ? "" : item.href}`,
    dropdownItems: item.dropdownItems?.map((dropdownItem) => ({
      ...dropdownItem,
      href: `/${currentLocale}${dropdownItem.href}`,
    })),
  }));

  return (
    <header className="absolute top-0 left-0 w-full bg-transparent py-4 md:py-6 z-50">
      <div className="container mx-auto px-4 md:px-10 lg:px-16 flex justify-between items-center">
        {/* Logo */}
        <Link href={`/${currentLocale}`} className="flex items-center space-x-2 header-animate">
          <span className="text-2xl font-bold header-animate text-white/75">Harika Spices</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 header-animate">
          {localizedNavItems.map((item) => (
            <div key={item.href} className="relative group">
              {item.hasDropdown ? (
                <div className="relative" onMouseEnter={() => setIsProductsDropdownOpen(true)} onMouseLeave={() => setIsProductsDropdownOpen(false)}>
                  <Link href={item.href} className="transition duration-300 group flex items-center gap-2 text-white hover:text-white/75">
                    {item.label}
                    <ChevronDown size={16} className={`transition-transform duration-300 ${isProductsDropdownOpen ? "rotate-180" : ""}`} />
                  </Link>

                  {/* Dropdown Menu */}
                  <div
                    className={`absolute top-full left-0 mt-2 w-56 rounded-lg shadow-lg overflow-hidden transition-all duration-300 bg-white/95 backdrop-blur-md border border-white/20 ${
                      isProductsDropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                    }`}
                  >
                    <div className="py-2">
                      {item.dropdownItems?.map((dropdownItem) => (
                        <Link key={dropdownItem.href} href={dropdownItem.href} className="block px-4 py-3 transition duration-200 border-b last:border-b-0 text-[#4A2C1D] hover:bg-[#F5E6D3]/80 hover:text-[#8B4513] border-white/30">
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link href={item.href} className="transition duration-300 group flex items-center gap-2 text-white hover:text-white/75">
                  {item.label}
                  <span className="w-0 group-hover:w-2 transition-all duration-300 h-0.5 inline-block bg-white hover:bg-white/75"></span>
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4 header-animate">
          <LanguageSwitcher currentLocale={currentLocale} />
          <button className="group flex items-center gap-2 border-2 border-[white] text-white hover:text-[#8B4513] hover:bg-[white] px-4 py-2 rounded-full transition duration-300">
            {nav.contact}
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
        <div className="fixed inset-0 bg-[#F5E6D3] z-40 md:hidden flex flex-col pt-24 px-8 animate-fade-in">
          <nav className="space-y-6">
            {localizedNavItems.map((item) => (
              <div key={item.href}>
                {item.hasDropdown ? (
                  <div className="space-y-3">
                    <Link href={item.href} onClick={toggleMenu} className="block text-2xl text-[#4A2C1D] hover:text-[#8B4513] transition duration-300">
                      {item.label}
                    </Link>
                    <div className="pl-4 space-y-2">
                      {item.dropdownItems?.map((dropdownItem) => (
                        <Link key={dropdownItem.href} href={dropdownItem.href} onClick={toggleMenu} className="block text-lg text-[#8B4513] hover:text-[#4A2C1D] transition duration-300">
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link href={item.href} onClick={toggleMenu} className="block text-2xl text-[#4A2C1D] hover:text-[#8B4513] transition duration-300">
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="mt-12 space-y-4">
            <button className="w-full flex items-center justify-center gap-2 border-2 border-[#8B4513] text-[#4A2C1D] px-6 py-3 rounded-full hover:bg-[#8B4513] hover:text-white transition duration-300">
              Contact
              <Send size={20} className="group-hover:rotate-45 transition duration-300" />
            </button>
          </div>

          {/* Mobile Language Switcher */}
          <div className="mt-8">
            <LanguageSwitcher currentLocale={currentLocale} />
          </div>
        </div>
      )}
    </header>
  );
}
