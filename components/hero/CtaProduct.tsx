"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CtaProduct() {
  return (
    <div className="relative z-10 w-full bg-[#392E20] ">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 flex flex-col lg:flex-row items-start lg:items-end lg:justify-between lg:gap-16">
        {/* Title */}
        <motion.div className="lg:w-1/2 text-left w-full " initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: "easeOut" }} viewport={{ once: true, amount: 0.3 }}>
          <h1 className="text-2xl font-calistoga md:text-4xl lg:text-5xl text-white leading-tight mb-3 sm:mb-5">Discover Our Premium Spices We Supply</h1>
        </motion.div>

        <motion.div className="lg:w-1/2 max-w-lg text-left w-full" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }} viewport={{ once: true, amount: 0.3 }}>
          <p className="text-base md:text-lg font-raleway text-gray-200 mb-4">
            We supply a wide range of export‑quality Indonesian spices, including: Whole Spices (cloves, nutmeg, cinnamon, pepper) Ground & Powdered Spices Culinary Spice Blends Custom Packaging for Export Markets
          </p>

          <div className="flex flex-row gap-4 justify-start">
            <Link href="/products" className="inline-block">
              <button className="bg-white border border-white py-2 px-4 text-black rounded-md font-medium tracking-wide">Explore Products</button>
            </Link>
            <Link href="/about" className="inline-block">
              <button className="border border-white py-2 px-4 text-white rounded-md font-medium tracking-wide">Learn More</button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
