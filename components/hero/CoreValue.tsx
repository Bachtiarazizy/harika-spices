"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, Leaf } from "lucide-react";
import Image from "next/image";

const CoreValuesComponent: React.FC = () => {
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
    <div className="min-h-screen bg-[#392E20] p-4 md:p-8">
      <motion.div className="max-w-7xl mx-auto" initial="hidden" animate="visible" variants={containerVariants}>
        {/* Header */}
        <motion.div className="text-center mb-8 md:mb-12" variants={itemVariants}>
          <div className="inline-block mb-4">
            <span className="text-amber-200 text-sm font-medium">VALUES</span>
          </div>
          <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">Our Core Values</h1>
          <p className="text-amber-200 text-base md:text-lg">Committed to sustainable and fair practices</p>
        </motion.div>

        {/* Grid Layout - Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-2 md:px-6 lg:px-10">
          {/* Left Side - Full width on mobile, 6 columns on desktop */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Large Card - Uncompromising Quality Assurance */}
            <motion.div className="bg-[#4D3D2A] rounded-2xl overflow-hidden relative flex-1" variants={itemVariants} whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}>
              <div className="p-6 md:p-8 relative z-10">
                <div className="inline-block mb-4 md:mb-6">
                  <span className="text-white text-xs font-medium">VALUES</span>
                </div>
                <h2 className="text-white text-2xl md:text-3xl font-bold mb-4 leading-tight">
                  Uncompromising Quality
                  <br />
                  Assurance
                </h2>
                <p className="text-white text-sm md:text-base mb-6 md:mb-8">We ensure every detail meets the highest global standards.</p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="text-white text-sm border border-white rounded-md px-4 py-2 font-medium hover:text-white transition-colors">Learn More</button>
                  <button className="text-white text-sm hover:text-white transition-colors">Overview →</button>
                </div>
              </div>

              {/* Image full width di bagian bawah */}
              <div className="h-32 md:h-76 w-full">
                <Image src="/hero.jpg" alt="Quality Assurance" width={500} height={128} className="object-cover w-full h-full" />
              </div>
            </motion.div>

            {/* Bottom Row - 2 small cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 min-h-[12rem] md:h-48">
              {/* Global Reach */}
              <motion.div className="bg-[#4D3D2A] rounded-2xl p-4 md:p-6 flex flex-col justify-between" variants={itemVariants} whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}>
                <div>
                  <Globe className="text-amber-300 w-6 h-6 md:w-8 md:h-8 mb-3" />
                  <h4 className="text-white text-base md:text-lg font-bold mb-2">Global Reach</h4>
                  <p className="text-white text-xs mb-3">Delivering excellence with efficiency.</p>
                </div>
                <button className="text-white text-xs font-medium hover:text-white transition-colors self-start">Contact →</button>
              </motion.div>

              {/* Sustainable Partnerships */}
              <motion.div className="bg-[#4D3D2A] rounded-2xl p-4 md:p-6 flex flex-col justify-between" variants={itemVariants} whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}>
                <div>
                  <Leaf className="text-green-400 w-6 h-6 md:w-8 md:h-8 mb-3" />
                  <h4 className="text-white text-base md:text-lg font-bold mb-2">Sustainable Partnerships</h4>
                  <p className="text-white text-xs mb-3">Supporting business through fair trade initiatives.</p>
                </div>
                <button className="text-white text-xs font-medium hover:text-white transition-colors self-start">Join →</button>
              </motion.div>
            </div>
          </div>

          {/* Right Side - Full width on mobile, 6 columns on desktop */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Top Row - Landscape card */}
            <div className="grid grid-cols-1 min-h-[12rem] md:h-48">
              {/* Our Commitment to You */}
              <motion.div className="bg-[#4D3D2A] flex flex-col md:flex-row rounded-2xl relative overflow-hidden min-h-[12rem] md:h-48" variants={itemVariants} whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}>
                {/* Gambar - full width on mobile, 50% on desktop */}
                <div className="w-full md:w-1/2 h-32 md:h-full">
                  <Image src="/hero.jpg" alt="Our Commitment" width={300} height={192} className="object-cover w-full h-full" />
                </div>

                {/* Content - full width on mobile, 50% on desktop */}
                <div className="w-full md:w-1/2 p-4 md:p-6 flex flex-col justify-center text-start">
                  <div className="inline-block mb-3 md:mb-4">
                    <span className="text-white text-xs font-medium">VALUE</span>
                  </div>
                  <h3 className="text-white text-lg md:text-xl font-bold mb-3 leading-tight">Our Commitment to You</h3>
                  <p className="text-white text-sm mb-4">Always putting our partners first.</p>
                  <button className="text-white text-sm font-medium hover:text-amber-200 transition-colors">Explore →</button>
                </div>
              </motion.div>
            </div>

            {/* Bottom - Large image placeholder card */}
            <motion.div className="bg-[#4D3D2A] rounded-2xl overflow-hidden relative flex-1" variants={itemVariants} whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}>
              <div className="p-6 md:p-8 relative z-10">
                <div className="inline-block mb-4 md:mb-6">
                  <span className="text-white text-xs font-medium">VALUES</span>
                </div>
                <h2 className="text-white text-2xl md:text-3xl font-bold mb-4 leading-tight">
                  Excellence in
                  <br />
                  Every Detail
                </h2>
                <p className="text-white text-sm md:text-base mb-6 md:mb-8">Delivering superior results through meticulous attention to detail.</p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="text-white text-sm border border-white rounded-md px-4 py-2 font-medium hover:text-white transition-colors">Learn More</button>
                  <button className="text-white text-sm hover:text-white transition-colors">Overview →</button>
                </div>
              </div>

              {/* Image full width di bagian bawah */}
              <div className="h-32 md:h-76 w-full">
                <Image src="/hero.jpg" alt="Excellence in Every Detail" width={500} height={128} className="object-cover w-full h-full" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CoreValuesComponent;
