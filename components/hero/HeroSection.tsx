"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative h-screen flex flex-col justify-end overflow-hidden">
      {/* Image Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bgs.jpg" // Ganti dengan path gambar hero Anda
          alt="Spices Background"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority
          quality={90}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30"></div>
      </div>

      <div className="relative z-10 w-full px-6 md:px-16 py-12">
        <div className="mx-auto flex flex-col lg:flex-row items-start lg:items-end lg:justify-between lg:gap-16">
          {/* Title */}
          <motion.div className="lg:w-1/2 text-left w-full" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: "easeOut" }} viewport={{ once: true, amount: 0.3 }}>
            <h1 className="text-4xl font-calistoga md:text-5xl lg:text-6xl text-white leading-tight">Rooted in Indonesia&apos;s Spice Heritage</h1>
          </motion.div>

          <motion.div className="lg:w-1/2 max-w-lg text-left w-full" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }} viewport={{ once: true, amount: 0.3 }}>
            <p className="text-lg md:text-xl font-raleway text-gray-200 mb-4">Discover the finest spices Indonesia has to offer. Our premium B2B exports include cloves, nutmeg, and pepper, sourced ethically and sustainably.</p>

            <div className="flex flex-row gap-4 justify-start">
              <Link href="/products" className="inline-block">
                <button className="bg-white border border-white py-2 px-4 text-black rounded-md font-medium tracking-wide hover:bg-gray-100 transition-colors duration-200">Explore</button>
              </Link>
              <Link href="/about" className="inline-block">
                <button className="border border-white py-2 px-4 text-white rounded-md font-medium tracking-wide hover:bg-white hover:text-black transition-colors duration-200">Learn More</button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
