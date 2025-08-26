"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, Leaf, Award, Users, Heart, Truck } from "lucide-react";
import Image from "next/image";

const AboutPage: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#392E20]">
      {/* Hero Section */}
      <section className="py-20 px-8">
        <motion.div className="max-w-7xl mx-auto text-center" initial="hidden" animate="visible" variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <div className="inline-block mb-4">
              <span className="text-amber-200 text-sm font-medium">ABOUT US</span>
            </div>
            <h1 className="text-white text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Authenticity in Every
              <br />
              Spice We Export
            </h1>
            <p className="text-amber-200 text-lg md:text-xl max-w-3xl mx-auto">From the fertile lands of Indonesia to your table, we bring you the finest spices with generations of tradition and uncompromising quality.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Story Section - Light Background */}
      <section className="bg-gray-100 py-20 font-raleway">
        <div className="container mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="w-full flex items-center justify-center">
            <div className="relative w-[500px] h-[500px] rounded-lg overflow-hidden shadow-lg">
              <Image src="/about-story.jpg" alt="Our Story" width={500} height={500} className="object-cover w-full h-full rounded-lg" />
            </div>
          </div>

          <div>
            <div className="inline-block mb-4">
              <span className="text-gray-600 text-sm font-medium">OUR STORY</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-calistoga text-gray-900 leading-snug mb-6">Three Generations of Spice Excellence from Indonesia</h2>
            <p className="text-gray-700 mb-6">
              Founded in 1985, Harika Spices began as a small family business with a simple vision: to share Indonesia&apos;s rich spice heritage with the world. What started with our grandfather&apos;s traditional farming methods has
              evolved into a trusted global supplier.
            </p>
            <p className="text-gray-700 mb-8">Today, we work directly with over 200 Indonesian farmers, ensuring sustainable practices while maintaining the authentic flavors that have made Indonesian spices legendary worldwide.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Heritage & Tradition</h4>
                <p className="text-gray-700 text-sm">Three generations of expertise in selecting and processing premium spices.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Global Reach</h4>
                <p className="text-gray-700 text-sm">Serving customers in over 25 countries with consistent quality and reliability.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid Section - Dark Background */}
      <section className="bg-[#392E20] py-20 px-8">
        <motion.div className="max-w-7xl mx-auto" initial="hidden" animate="visible" variants={containerVariants}>
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <div className="inline-block mb-4">
              <span className="text-amber-200 text-sm font-medium">VALUES</span>
            </div>
            <h2 className="text-white text-4xl md:text-5xl font-bold mb-4">What Drives Us Forward</h2>
            <p className="text-amber-200 text-lg">Built on trust, quality, and sustainable partnerships</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Quality Assurance */}
            <motion.div className="bg-[#4D3D2A] rounded-2xl overflow-hidden" variants={itemVariants} whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}>
              <div className="p-6">
                <Award className="text-amber-300 w-8 h-8 mb-4" />
                <h3 className="text-white text-xl font-bold mb-3">Quality Assurance</h3>
                <p className="text-white text-sm mb-6">Every batch tested and certified to meet international standards.</p>
                <button className="text-white text-sm font-medium hover:text-amber-200 transition-colors">Learn More →</button>
              </div>
              <div className="h-32 w-full">
                <Image src="/quality.jpg" alt="Quality Assurance" width={400} height={128} className="object-cover w-full h-full" />
              </div>
            </motion.div>

            {/* Sustainable Sourcing */}
            <motion.div className="bg-[#4D3D2A] rounded-2xl overflow-hidden" variants={itemVariants} whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}>
              <div className="p-6">
                <Leaf className="text-green-400 w-8 h-8 mb-4" />
                <h3 className="text-white text-xl font-bold mb-3">Sustainable Sourcing</h3>
                <p className="text-white text-sm mb-6">Direct partnerships with farmers ensuring fair trade and environmental care.</p>
                <button className="text-white text-sm font-medium hover:text-amber-200 transition-colors">Our Farmers →</button>
              </div>
              <div className="h-32 w-full">
                <Image src="/sustainable.jpg" alt="Sustainable Sourcing" width={400} height={128} className="object-cover w-full h-full" />
              </div>
            </motion.div>

            {/* Global Partnership */}
            <motion.div className="bg-[#4D3D2A] rounded-2xl overflow-hidden" variants={itemVariants} whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}>
              <div className="p-6">
                <Globe className="text-blue-400 w-8 h-8 mb-4" />
                <h3 className="text-white text-xl font-bold mb-3">Global Partnership</h3>
                <p className="text-white text-sm mb-6">Building lasting relationships with distributors worldwide.</p>
                <button className="text-white text-sm font-medium hover:text-amber-200 transition-colors">Partner With Us →</button>
              </div>
              <div className="h-32 w-full">
                <Image src="/global.jpg" alt="Global Partnership" width={400} height={128} className="object-cover w-full h-full" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Team & Numbers Section - Light Background */}
      <section className="bg-gray-100 py-20 font-raleway">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-gray-600 text-sm font-medium">OUR IMPACT</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-calistoga text-gray-900 leading-snug mb-6">Numbers That Tell Our Story</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">From humble beginnings to global reach, here&apos;s how we&apos;ve grown while staying true to our values.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">200+</div>
              <div className="text-gray-600">Partner Farmers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">25+</div>
              <div className="text-gray-600">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">40+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">500+</div>
              <div className="text-gray-600">Satisfied Clients</div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-lg">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Ready to Experience Authentic Indonesian Spices?</h3>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto">Join hundreds of businesses worldwide who trust Harika Spices for their authentic Indonesian spice needs.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gray-900 text-white px-8 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors">Get Quote</button>
              <button className="text-gray-900 border border-gray-300 px-8 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors">View Catalog</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
