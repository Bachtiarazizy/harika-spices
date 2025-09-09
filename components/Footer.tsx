import React from "react";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#392E20] text-white">
      {/* Main Footer Content */}
      <div className="mx-6 md:mx-16 pt-12 pb-8">
        <div className="bg-[#4D3D2A] rounded-3xl p-8 md:p-12">
          <div className="max-w-7xl mx-auto">
            {/* Logo Section */}
            <div className="flex flex-col items-start mb-12 pb-12 border-b border-white/10">
              <div className="mb-6">
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
              <p className="text-white/80 text-medium max-w-2xl leading-relaxed">
                Premium Indonesian spices sourced directly from origin. We bring you the finest quality spices, herbs, and specialty ingredients from Central Java, Indonesia, with a commitment to sustainability and authentic flavors that
                enhance your culinary experience.
              </p>
            </div>

            {/* Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div className="lg:col-span-1">
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-2">Address</h4>
                  <p className="text-white text-sm">Central Java, Indonesia</p>
                </div>

                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-2">Contact</h4>
                  <div className="flex flex-col gap-1">
                    <a href="https://wa.me/905421793483" target="_blank" rel="noopener noreferrer" className="text-white text-sm">
                      +90 542 179 3483
                    </a>
                    <a href="mailto:info@harikaspices.com" target="_blank" rel="noopener noreferrer" className="text-white text-sm">
                      info@harikaspices.com
                    </a>
                  </div>
                </div>

                {/* Social Media Icons */}
                <div className="flex gap-3">
                  <a href="https://www.facebook.com/harikaspices" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a href="https://www.instagram.com/harikaspices" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="https://www.linkedin.com/company/harikaspices" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Navigation Column */}
              <div>
                <h4 className="text-white font-semibold mb-4">Navigation</h4>
                <ul className="space-y-3">
                  <li>
                    <Link href="/" className="text-white/80 hover:text-white transition-colors text-sm">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-white/80 hover:text-white transition-colors text-sm">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/products" className="text-white/80 hover:text-white transition-colors text-sm">
                      Our Products
                    </Link>
                  </li>
                  <li>
                    <Link href="/export-process" className="text-white/80 hover:text-white transition-colors text-sm">
                      Export Process
                    </Link>
                  </li>

                  <li>
                    <Link href="/contact" className="text-white/80 hover:text-white transition-colors text-sm">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Products Column */}
              <div>
                <h4 className="text-white font-semibold mb-4">Products</h4>
                <ul className="space-y-3">
                  <li>
                    <Link href="/products/cloves-indonesia" className="text-white/80 hover:text-white transition-colors text-sm">
                      Clove
                    </Link>
                  </li>
                  <li>
                    <Link href="/products/cinnamon-indonesia" className="text-white/80 hover:text-white transition-colors text-sm">
                      Cinnamon
                    </Link>
                  </li>
                  <li>
                    <Link href="/products/nutmeg-indonesia" className="text-white/80 hover:text-white transition-colors text-sm">
                      Nutmeg
                    </Link>
                  </li>
                  <li>
                    <Link href="/products/black-pepper-indonesia" className="text-white/80 hover:text-white transition-colors text-sm">
                      Black Pepper
                    </Link>
                  </li>
                  <li>
                    <Link href="/products/white-pepper-indonesia" className="text-white/80 hover:text-white transition-colors text-sm">
                      White Pepper
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Resources Column */}
              <div>
                <h4 className="text-white font-semibold mb-4">Resources</h4>
                <ul className="space-y-3">
                  <li>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors text-sm">
                      LinkedIn Page
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors text-sm">
                      Instagram Feed
                    </a>
                  </li>
                  <li>
                    <Link href="/articles" className="text-white/80 hover:text-white transition-colors text-sm">
                      Blog Posts
                    </Link>
                  </li>
                  <li>
                    <Link href="/articles" className="text-white/80 hover:text-white transition-colors text-sm">
                      Latest News
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="px-6 md:px-16 pb-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/80 text-sm">© 2025 Harika Spices. All rights reserved.</p>

          <div className="flex gap-6">
            <Link href="/privacy-policy" className="text-white/80 hover:text-white transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-white/80 hover:text-white transition-colors text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
