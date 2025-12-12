"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
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

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mx-auto max-w-4xl text-start md:text-center">
          {/* Title */}
          <motion.div className="mb-5" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: "easeOut" }} viewport={{ once: true, amount: 0.3 }}>
            <h1 className="text-4xl font-calistoga mx-auto max-w-3xl md:text-5xl lg:text-6xl text-white leading-tight">Premium Indonesian Spices for Global Trade</h1>
          </motion.div>

          <motion.div className="mb-8" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }} viewport={{ once: true, amount: 0.3 }}>
            <p className="text-lg md:text-2xl font-raleway text-gray-200 max-w-3xl mx-auto">Sourced ethically and sustainably from Indonesia&apos;s finest farms cloves, nutmeg, and pepper delivered with quality you can trust.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }} viewport={{ once: true, amount: 0.3 }}>
            <div className="flex flex-row gap-4 justify-start md:justify-center">
              <Link href="/products" className="inline-block">
                <button className="bg-white border border-white py-2 md:py-3 px-4 md:px-7 text-black rounded-md font-medium tracking-wide hover:bg-gray-100 transition-colors duration-200">Explore Products</button>
              </Link>
              <Link href="/contact" className="inline-block">
                <button className="border border-white py-2 md:py-3 px-4 md:px- text-white rounded-md font-medium tracking-wide hover:bg-white hover:text-black transition-colors duration-200">Request a Quote</button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
