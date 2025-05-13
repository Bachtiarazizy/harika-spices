// components/layout/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin, Leaf, Send } from "lucide-react";

const QUICK_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About Us" },
  { href: "#products", label: "Our Products" },
  { href: "#sustainability", label: "Sustainability" },
];

const PRODUCT_CATEGORIES = ["Cloves", "Black Pepper", "Cinnamon", "Nutmeg", "Cardamom"];

export default function Footer() {
  return (
    <footer
      className="bg-gradient-to-br from-[#4A2C1D] to-[#8B4513] 
      text-[#F5E6D3] py-16 px-4 md:px-12 lg:px-24"
    >
      <div className="container mx-auto grid md:grid-cols-4 gap-12">
        {/* Brand Column */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <Image src="/api/placeholder/60/60" alt="Harika Spices Logo" width={60} height={60} className="rounded-full" />
            <h3 className="text-2xl font-bold">Harika Spices</h3>
          </div>

          <p className="text-[#F5E6D3]/80">Connecting global kitchens with premium Indonesian spices, empowering local farmers and sustainable agriculture.</p>

          <div className="flex space-x-4">
            <a
              href="#"
              className="text-[#F5E6D3] hover:text-white 
              transition duration-300 group"
            >
              <Facebook size={24} className="group-hover:scale-110 transition duration-300" />
            </a>
            <a
              href="#"
              className="text-[#F5E6D3] hover:text-white 
              transition duration-300 group"
            >
              <Twitter size={24} className="group-hover:scale-110 transition duration-300" />
            </a>
            <a
              href="#"
              className="text-[#F5E6D3] hover:text-white 
              transition duration-300 group"
            >
              <Instagram size={24} className="group-hover:scale-110 transition duration-300" />
            </a>
            <a
              href="#"
              className="text-[#F5E6D3] hover:text-white 
              transition duration-300 group"
            >
              <Linkedin size={24} className="group-hover:scale-110 transition duration-300" />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
          <ul className="space-y-4">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[#F5E6D3]/80 hover:text-white 
                  flex items-center gap-2 group transition duration-300"
                >
                  <span
                    className="w-2 h-0.5 bg-[#F5E6D3]/50 
                    group-hover:w-4 group-hover:bg-white 
                    transition-all duration-300"
                  ></span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Product Categories Column */}
        <div>
          <h4 className="text-xl font-semibold mb-6">Our Products</h4>
          <ul className="space-y-4">
            {PRODUCT_CATEGORIES.map((product) => (
              <li key={product}>
                <Link
                  href="#"
                  className="text-[#F5E6D3]/80 hover:text-white 
                  flex items-center gap-2 group transition duration-300"
                >
                  <Leaf
                    size={16}
                    className="text-[#F5E6D3]/50 group-hover:text-white 
                    transition duration-300"
                  />
                  {product}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Column */}
        <div>
          <h4 className="text-xl font-semibold mb-6">Stay Connected</h4>
          <p className="text-[#F5E6D3]/80 mb-6">Subscribe to our newsletter for the latest spice trends and offers.</p>

          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-full 
              bg-[#F5E6D3]/10 text-white 
              placeholder-[#F5E6D3]/50 
              focus:outline-none focus:ring-2 
              focus:ring-[#F5E6D3]/50"
            />
            <button
              className="absolute right-1 top-1/2 -translate-y-1/2 
              bg-[#F5E6D3] text-[#4A2C1D] p-2 rounded-full 
              hover:bg-white transition duration-300 group"
            >
              <Send size={20} className="group-hover:rotate-45 transition duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Copyright and Additional Links */}
      <div
        className="mt-12 pt-6 border-t border-[#F5E6D3]/20 
        flex flex-col md:flex-row justify-between items-center"
      >
        <p className="text-[#F5E6D3]/80 text-sm">&copy; {new Date().getFullYear()} Harika Spices. All Rights Reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link
            href="#"
            className="text-[#F5E6D3]/80 hover:text-white 
            text-sm transition duration-300"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="text-[#F5E6D3]/80 hover:text-white 
            text-sm transition duration-300"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
