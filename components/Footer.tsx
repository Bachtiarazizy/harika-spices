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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {/* Logo and Contact Info */}
              <div className="lg:col-span-1">
                {/* <Link href="/" className="flex items-center">
                  <Image
                    src="/logo.png" // Ganti dengan path logo asli Anda
                    alt="Company Logo"
                    width={250}
                    height={60}
                    className="h-8 w-auto sm:h-10 md:h-12 object-contain"
                    priority
                  />
                </Link> */}
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-2">Address</h4>
                  <p className="text-white text-sm">Semarang, Indonesia</p>
                </div>

                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-2">Contact</h4>
                  <p className="text-white text-sm">
                    +90 542 179 3483
                    <br />
                    info@harikaspices.com
                  </p>
                </div>

                {/* Social Media Icons */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                    <Facebook className="w-4 h-4" />
                  </div>
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                    <Linkedin className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Column 1 */}
              <div>
                <ul className="space-y-3">
                  <li>
                    <Link href="/" className="text-white hover:text-gray-300 transition-colors text-sm">
                      Home
                    </Link>
                  </li>
                  <li></li>
                  <li>
                    <a href="#" className="text-white hover:text-gray-300 transition-colors text-sm">
                      Our Products
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white hover:text-gray-300 transition-colors text-sm">
                      Quality Standards
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white hover:text-gray-300 transition-colors text-sm">
                      Sustainability
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white hover:text-gray-300 transition-colors text-sm">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <ul className="space-y-3">
                  <li>
                    <Link href="/" className="text-white hover:text-gray-300 transition-colors text-sm">
                      Whole Spices
                    </Link>
                  </li>
                  <li></li>
                  <li>
                    <a href="#" className="text-white hover:text-gray-300 transition-colors text-sm">
                      Ground Spices
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white hover:text-gray-300 transition-colors text-sm">
                      Seeds & Pods
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white hover:text-gray-300 transition-colors text-sm">
                      Herbs & Leaves
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white hover:text-gray-300 transition-colors text-sm">
                      Specialty / Premium
                    </a>
                  </li>
                </ul>
              </div>
              {/* Column 2 */}
              <div>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-white hover:text-gray-300 transition-colors text-sm">
                      LinkedIn Page
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white hover:text-gray-300 transition-colors text-sm">
                      Instagram Feed
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white hover:text-gray-300 transition-colors text-sm">
                      Latest News
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white hover:text-gray-300 transition-colors text-sm">
                      Events Calendar
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white hover:text-gray-300 transition-colors text-sm">
                      Blog Posts
                    </a>
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
          <p className="text-white text-sm">© 2025 Harika Spices. All rights reserved.</p>

          <div className="flex gap-6">
            <a href="#" className="text-white hover:text-gray-300 transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors text-sm">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
