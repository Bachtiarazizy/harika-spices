"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, GraduationCap, Heart, Home, HandHeart, Award } from "lucide-react";
import Image from "next/image";

const SustainabilityCommunityPage: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const communityPrograms = [
    {
      title: "Farmer Education & Training",
      description: "Comprehensive training programs for sustainable farming techniques and modern agricultural practices.",
      icon: GraduationCap,
      image: "/farmer-training.jpg",
      beneficiaries: "500+ farmers trained annually",
    },
    {
      title: "Healthcare Access",
      description: "Mobile health clinics and medical assistance programs for farming communities.",
      icon: Heart,
      image: "/healthcare.jpg",
      beneficiaries: "2,000+ community members served",
    },
    {
      title: "Housing Development",
      description: "Affordable housing projects and home improvement programs for farmer families.",
      icon: Home,
      image: "/housing.jpg",
      beneficiaries: "150+ homes built or improved",
    },
    {
      title: "Youth Development",
      description: "Educational scholarships and skills training programs for children in farming communities.",
      icon: Users,
      image: "/youth-development.jpg",
      beneficiaries: "300+ students supported",
    },
  ];

  const impactAreas = [
    {
      area: "Fair Trade Practices",
      description: "Ensuring farmers receive fair prices above market rate for their premium spices.",
      percentage: 100,
      detail: "20% premium over market price",
    },
    {
      area: "Community Investment",
      description: "Annual reinvestment of profits into local community development projects.",
      percentage: 15,
      detail: "15% of annual profits invested",
    },
    {
      area: "Educational Support",
      description: "Scholarships and educational facilities for children in partner communities.",
      percentage: 90,
      detail: "90% scholarship success rate",
    },
    {
      area: "Healthcare Coverage",
      description: "Health insurance and medical support for farming families and workers.",
      percentage: 85,
      detail: "85% of families covered",
    },
  ];

  return (
    <div className="min-h-screen bg-[#392E20]">
      {/* Hero Section */}
      <section className="py-20 px-8">
        <motion.div className="max-w-7xl mx-auto text-center" initial="hidden" animate="visible" variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <div className="inline-block mb-4">
              <span className="text-amber-200 text-sm font-medium">SUSTAINABILITY</span>
            </div>
            <h1 className="text-white text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Community
              <br />
              Empowerment
            </h1>
            <p className="text-amber-200 text-lg md:text-xl max-w-3xl mx-auto">
              Building stronger, more prosperous communities through fair trade, education, healthcare, and sustainable development programs across Indonesia&apos;s spice-growing regions.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Community Programs - Light Background */}
      <section className="bg-gray-100 py-20 font-raleway">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-gray-600 text-sm font-medium">PROGRAMS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-calistoga text-gray-900 leading-snug mb-6">Community Development Programs</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">We invest in comprehensive programs that address the core needs of farming communities, from education and healthcare to housing and economic empowerment.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {communityPrograms.map((program, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <div className="relative h-64">
                  <Image src={program.image} alt={program.title} width={500} height={256} className="object-cover w-full h-full" />
                  <div className="absolute top-4 left-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <program.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{program.title}</h3>
                  <p className="text-gray-700 text-sm mb-4">{program.description}</p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-blue-800 text-sm font-medium">{program.beneficiaries}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Areas - Dark Background */}
      <section className="bg-[#392E20] py-20 px-8">
        <motion.div className="max-w-7xl mx-auto" initial="hidden" animate="visible" variants={containerVariants}>
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <div className="inline-block mb-4">
              <span className="text-amber-200 text-sm font-medium">IMPACT</span>
            </div>
            <h2 className="text-white text-4xl md:text-5xl font-bold mb-4">Social Impact Areas</h2>
            <p className="text-amber-200 text-lg">Measurable improvements in community welfare and development</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {impactAreas.map((area, index) => (
              <motion.div key={index} className="bg-[#4D3D2A] rounded-2xl p-8" variants={itemVariants} whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white text-xl font-bold">{area.area}</h3>
                  <div className="text-blue-400 text-2xl font-bold">{area.percentage}%</div>
                </div>
                <p className="text-white text-sm mb-4">{area.description}</p>
                <p className="text-amber-200 text-xs mb-6">{area.detail}</p>

                {/* Progress Bar */}
                <div className="bg-gray-600 rounded-full h-2 overflow-hidden">
                  <motion.div className="bg-blue-400 h-full rounded-full" initial={{ width: 0 }} animate={{ width: `${area.percentage}%` }} transition={{ duration: 1.5, delay: index * 0.2 }} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Fair Trade Story - Light Background */}
      <section className="bg-gray-100 py-20 font-raleway">
        <div className="container mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block mb-4">
              <span className="text-gray-600 text-sm font-medium">FAIR TRADE</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-calistoga text-gray-900 leading-snug mb-6">Empowering Farmers Through Fair Trade</h2>
            <p className="text-gray-700 mb-8">
              Our fair trade approach goes beyond just paying premium prices. We build long-term partnerships that provide stability, training, and opportunities for growth, ensuring farming communities thrive for generations.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-blue-500 rounded-sm flex items-center justify-center mt-0.5">
                  <HandHeart className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Premium Pricing</h4>
                  <p className="text-gray-700 text-sm">20% above market rates to ensure sustainable livelihoods for farmers.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-blue-500 rounded-sm flex items-center justify-center mt-0.5">
                  <Award className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Quality Incentives</h4>
                  <p className="text-gray-700 text-sm">Additional bonuses for premium quality and organic certification.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-blue-500 rounded-sm flex items-center justify-center mt-0.5">
                  <Users className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Long-term Contracts</h4>
                  <p className="text-gray-700 text-sm">Multi-year agreements providing financial security and planning stability.</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="bg-gray-900 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors">Fair Trade Report</button>
              <button className="text-gray-900 font-medium hover:text-gray-700 transition-colors flex items-center gap-2">
                Farmer Stories
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="w-full flex items-center justify-center">
            <div className="relative w-[500px] h-[500px] rounded-lg overflow-hidden shadow-lg">
              <Image src="/fair-trade.jpg" alt="Fair Trade" width={500} height={500} className="object-cover w-full h-full rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Community Impact Stats - Dark Background */}
      <section className="bg-[#392E20] py-20 px-8">
        <motion.div className="max-w-7xl mx-auto text-center" initial="hidden" animate="visible" variants={containerVariants}>
          <motion.div className="mb-16" variants={itemVariants}>
            <div className="inline-block mb-4">
              <span className="text-amber-200 text-sm font-medium">COMMUNITY IMPACT</span>
            </div>
            <h2 className="text-white text-4xl md:text-5xl font-bold mb-4">Transforming Lives</h2>
            <p className="text-amber-200 text-lg">
              Our commitment to community development has led to significant improvements in the lives of thousands of farmers and their families across Indonesia. Here are some of the key impacts we&apos;ve achieved together.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div className="bg-white rounded-lg p-6 shadow-lg" variants={itemVariants}>
              <div className="flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-[#392E20]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m6-6a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">10,000+</h3>
              <p className="text-gray-700 text-sm">Farmers directly supported through fair trade practices.</p>
            </motion.div>
            <motion.div className="bg-white rounded-lg p-6 shadow-lg" variants={itemVariants}>
              <div className="flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-[#392E20]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m6-6a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">5,000+</h3>
              <p className="text-gray-700 text-sm">Children educated through our scholarship programs.</p>
            </motion.div>
            <motion.div className="bg-white rounded-lg p-6 shadow-lg" variants={itemVariants}>
              <div className="flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-[#392E20]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m6-6a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">200+</h3>
              <p className="text-gray-700 text-sm">Homes built or improved for farming families.</p>
            </motion.div>
            <motion.div className="bg-white rounded-lg p-6 shadow-lg" variants={itemVariants}>
              <div className="flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-[#392E20]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m6-6a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">1,000+</h3>
              <p className="text-gray-700 text-sm">Families provided with healthcare access through mobile clinics.</p>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default SustainabilityCommunityPage;
