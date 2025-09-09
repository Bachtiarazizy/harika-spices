/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, Leaf, Award, Users, Heart, Truck, Star, Shield } from "lucide-react";
import Image from "next/image";

const AboutPage: React.FC = () => {
  const cards = [
    {
      icon: <Globe className="w-8 h-8 text-[#94837b]" />,
      title: "Premium Quality",
      description: "Carefully selected cloves, nutmeg, and pepper, ensuring authentic taste and consistency.",
    },
    {
      icon: <Leaf className="w-8 h-8 text-[#94837b]" />,
      title: "Sustainable Sourcing",
      description: "Partnering with Indonesian farmers who practice responsible and eco-friendly cultivation.",
    },
    {
      icon: <Star className="w-8 h-8 text-[#94837b]" />,
      title: "Reliable Supply Chain",
      description: "Consistent and timely deliveries to meet your business needs.",
    },
    {
      icon: <Shield className="w-8 h-8 text-[#94837b]" />,
      title: "Competitive Pricing",
      description: "Fair and competitive pricing without compromising product excellence.",
    },
  ];

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
            <div className="inline-block mb-4"></div>
            <h1 className="text-white font-calistoga text-3xl md:text-4xl lg:text-5xl text-centerl mb-6 leading-tight">Rooted in Indonesia’s Spice Heritage</h1>
            <p className="text-gray-200 text-medium md:text-lg max-w-3xl mx-auto">
              Indonesia has long been known as the heart of the world’s spice trade. At Harika Spices, we carry forward this legacy by connecting the richness of our land cloves, nutmeg, and pepper with businesses across the globe.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Story Section - Light Background */}
      <section className="bg-white py-20 font-raleway">
        <div className="container mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 text-medium md:text-lg gap-12 items-center">
          <div className="w-full">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg">
              <Image src="/hero-bg.jpg" alt="Our Story" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw" className="object-cover rounded-lg" />
            </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-calistoga text-gray-900 leading-snug mb-6">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              To deliver premium-quality Indonesian spices while ensuring ethical, transparent, and sustainable trade that benefits both our global partners and the farmers at the heart of our supply chain.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Premium Quality</h4>
                <p className="text-gray-700">Experience the richness of Indonesia&apos;s spice heritage with every shipment.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Global Trust</h4>
                <p className="text-gray-700 ">Partnering with farmers to ensure ethical sourcing and sustainable practices.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid Section - Dark Background */}
      <section className="bg-[#392E20] py-20 px-6">
        <motion.div className="max-w-7xl mx-auto" initial="hidden" animate="visible" variants={containerVariants}>
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-white font-calistoga text-3xl md:text-4xl lg:text-5xl mb-4">What We Stand For</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                className="group relative bg-[#402013] backdrop-blur-sm rounded-2xl p-8 hover:bg-[#ff6600]/25 transition-all duration-300 text-center"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
              >
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-[#4f3126] backdrop-blur-sm rounded-full text-white group-hover:text-[#ff6600] transition-all duration-300">{card.icon}</div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-4">{card.title}</h3>
                <p className="text-gray-300 text-medium leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Team & Numbers Section - Light Background */}
      <section className="bg-gray-100 py-20 font-raleway">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-calistoga text-gray-900 leading-snug mb-6">Our Vision</h2>
            <p className="text-gray-700 text-medium md:text-lg max-w-2xl mx-auto">
              To be a trusted bridge between Indonesia’s farmers and global businesses, ensuring the world experiences the finest spices while local communities thrive through fair and sustainable trade.
            </p>
          </div>

          {/* CTA Section */}
          <div className="bg-[#392E20] rounded-2xl p-8 md:p-12 text-center shadow-lg">
            <h3 className="text-3xl md:text-4xl font-calistoga text-white mb-4">Why Harika Spices?</h3>
            <p className="text-gray-200 mb-8 max-w-2xl text-medium md:text-lg mx-auto">Because choosing Harika means choosing authentic Indonesian heritage, sustainable sourcing, and a partner who values integrity as much as quality.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#392E20] px-8 py-3 rounded-md font-medium hover:bg-white/80 transition-colors">Contact Us</button>
              <button className="text-white border border-white px-8 py-3 rounded-md font-medium hover:bg-white hover:text-[#392E20] transition-colors">Explore Products</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
