"use client";
import React from "react";
import { motion } from "framer-motion";
import { Globe, Leaf, Star, Shield } from "lucide-react";

export default function CardSection() {
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

  return (
    <section className="relative bg-[#3a190a] py-16">
      <div className="relative z-10 container mx-auto px-6 md:px-10">
        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="group relative bg-[#402013] backdrop-blur-sm rounded-2xl p-8 hover:bg-[#ff6600]/25 transition-all duration-300 text-start"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* Icon */}
              <div className="flex justify-start mb-4">
                <div className="p-4 bg-[#4f3126] backdrop-blur-sm rounded-full group-hover:text-[#ff6600] transition-colors duration-300">{card.icon}</div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-4">{card.title}</h3>
              <p className="text-gray-300 text-medium leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
