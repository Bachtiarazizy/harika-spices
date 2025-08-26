"use client";

import React from "react";
import { motion } from "framer-motion";
import { Leaf, Droplets, Recycle, TreePine, Sun, Wind } from "lucide-react";
import Image from "next/image";

const SustainabilityEnvironmentPage: React.FC = () => {
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

  const environmentalInitiatives = [
    {
      title: "Organic Farming Practices",
      description: "Supporting farmers in transitioning to certified organic cultivation methods.",
      icon: Leaf,
      image: "/organic-farming.jpg",
      impact: "500+ hectares converted to organic farming",
    },
    {
      title: "Water Conservation",
      description: "Implementing efficient irrigation systems and water recycling programs.",
      icon: Droplets,
      image: "/water-conservation.jpg",
      impact: "40% reduction in water usage per hectare",
    },
    {
      title: "Sustainable Packaging",
      description: "Using biodegradable and recyclable packaging materials for all exports.",
      icon: Recycle,
      image: "/sustainable-packaging.jpg",
      impact: "100% recyclable packaging materials",
    },
    {
      title: "Reforestation Programs",
      description: "Planting trees to restore forest cover and combat climate change.",
      icon: TreePine,
      image: "/reforestation.jpg",
      impact: "10,000+ trees planted annually",
    },
  ];

  const greenPractices = [
    {
      practice: "Solar-Powered Processing",
      description: "70% of our processing facilities run on renewable solar energy.",
      percentage: 70,
    },
    {
      practice: "Zero Waste Operations",
      description: "95% of agricultural waste recycled into organic fertilizers.",
      percentage: 95,
    },
    {
      practice: "Carbon Footprint Reduction",
      description: "30% reduction in carbon emissions over the past 5 years.",
      percentage: 30,
    },
    {
      practice: "Biodiversity Protection",
      description: "Maintaining 25% of farmland as natural habitat for wildlife.",
      percentage: 25,
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
              Environmental
              <br />
              Stewardship
            </h1>
            <p className="text-amber-200 text-lg md:text-xl max-w-3xl mx-auto">
              We&apos;re committed to protecting Indonesia&apos;s natural environment while producing the world&apos;s finest spices through sustainable farming and eco-friendly practices.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Environmental Initiatives - Light Background */}
      <section className="bg-gray-100 py-20 font-raleway">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-gray-600 text-sm font-medium">INITIATIVES</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-calistoga text-gray-900 leading-snug mb-6">Our Environmental Programs</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">From organic farming to renewable energy, we implement comprehensive environmental programs across our entire supply chain.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {environmentalInitiatives.map((initiative, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <div className="relative h-64">
                  <Image src={initiative.image} alt={initiative.title} width={500} height={256} className="object-cover w-full h-full" />
                  <div className="absolute top-4 left-4 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <initiative.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{initiative.title}</h3>
                  <p className="text-gray-700 text-sm mb-4">{initiative.description}</p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-green-800 text-sm font-medium">{initiative.impact}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Green Practices - Dark Background */}
      <section className="bg-[#392E20] py-20 px-8">
        <motion.div className="max-w-7xl mx-auto" initial="hidden" animate="visible" variants={containerVariants}>
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <div className="inline-block mb-4">
              <span className="text-amber-200 text-sm font-medium">GREEN PRACTICES</span>
            </div>
            <h2 className="text-white text-4xl md:text-5xl font-bold mb-4">Sustainable Operations</h2>
            <p className="text-amber-200 text-lg">Measurable environmental improvements across all operations</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {greenPractices.map((practice, index) => (
              <motion.div key={index} className="bg-[#4D3D2A] rounded-2xl p-8" variants={itemVariants} whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white text-xl font-bold">{practice.practice}</h3>
                  <div className="text-green-400 text-2xl font-bold">{practice.percentage}%</div>
                </div>
                <p className="text-white text-sm mb-6">{practice.description}</p>

                {/* Progress Bar */}
                <div className="bg-gray-600 rounded-full h-2 overflow-hidden">
                  <motion.div className="bg-green-400 h-full rounded-full" initial={{ width: 0 }} animate={{ width: `${practice.percentage}%` }} transition={{ duration: 1.5, delay: index * 0.2 }} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Climate Action - Light Background */}
      <section className="bg-gray-100 py-20 font-raleway">
        <div className="container mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block mb-4">
              <span className="text-gray-600 text-sm font-medium">CLIMATE ACTION</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-calistoga text-gray-900 leading-snug mb-6">Fighting Climate Change Through Agriculture</h2>
            <p className="text-gray-700 mb-8">Our climate action strategy focuses on carbon sequestration through sustainable farming practices, renewable energy adoption, and ecosystem restoration across our partner farms.</p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-sm flex items-center justify-center mt-0.5">
                  <Sun className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Renewable Energy Transition</h4>
                  <p className="text-gray-700 text-sm">Converting processing facilities to solar and wind power systems.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-sm flex items-center justify-center mt-0.5">
                  <TreePine className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Carbon Sequestration</h4>
                  <p className="text-gray-700 text-sm">Implementing agroforestry practices to capture atmospheric carbon.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-sm flex items-center justify-center mt-0.5">
                  <Wind className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Emission Reduction</h4>
                  <p className="text-gray-700 text-sm">Optimizing logistics and processing to minimize carbon footprint.</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="bg-gray-900 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors">Climate Report</button>
              <button className="text-gray-900 font-medium hover:text-gray-700 transition-colors flex items-center gap-2">
                View Projects
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="w-full flex items-center justify-center">
            <div className="relative w-[500px] h-[500px] rounded-lg overflow-hidden shadow-lg">
              <Image src="/climate-action.jpg" alt="Climate Action" width={500} height={500} className="object-cover w-full h-full rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Environmental Impact Stats - Dark Background */}
      <section className="bg-[#392E20] py-20 px-8">
        <motion.div className="max-w-7xl mx-auto text-center" initial="hidden" animate="visible" variants={containerVariants}>
          <motion.div className="mb-16" variants={itemVariants}>
            <div className="inline-block mb-4">
              <span className="text-amber-200 text-sm font-medium">IMPACT</span>
            </div>
            <h2 className="text-white text-4xl md:text-5xl font-bold mb-4">Environmental Impact</h2>
            <p className="text-amber-200 text-lg">Measurable results from our sustainability efforts</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div className="bg-[#4D3D2A] rounded-2xl p-8 text-center" variants={itemVariants}>
              <div className="text-4xl font-bold text-green-400 mb-2">50%</div>
              <div className="text-white font-medium mb-2">Water Savings</div>
              <div className="text-amber-200 text-sm">Through efficient irrigation systems</div>
            </motion.div>

            <motion.div className="bg-[#4D3D2A] rounded-2xl p-8 text-center" variants={itemVariants}>
              <div className="text-4xl font-bold text-green-400 mb-2">30%</div>
              <div className="text-white font-medium mb-2">Carbon Reduction</div>
              <div className="text-amber-200 text-sm">From renewable energy adoption</div>
            </motion.div>

            <motion.div className="bg-[#4D3D2A] rounded-2xl p-8 text-center" variants={itemVariants}>
              <div className="text-4xl font-bold text-green-400 mb-2">10K+</div>
              <div className="text-white font-medium mb-2">Trees Planted</div>
              <div className="text-amber-200 text-sm">Annual reforestation efforts</div>
            </motion.div>

            <motion.div className="bg-[#4D3D2A] rounded-2xl p-8 text-center" variants={itemVariants}>
              <div className="text-4xl font-bold text-green-400 mb-2">500+</div>
              <div className="text-white font-medium mb-2">Organic Hectares</div>
              <div className="text-amber-200 text-sm">Converted to organic farming</div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section - Light Background */}
      <section className="bg-gray-100 py-20 font-raleway">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-lg">
            <div className="inline-block mb-4">
              <span className="text-gray-600 text-sm font-medium">JOIN US</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Partner with Us for a Sustainable Future</h3>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto">Join our network of environmentally conscious partners and contribute to sustainable spice production that protects Indonesia&apos;s natural heritage.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gray-900 text-white px-8 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors">Sustainability Report</button>
              <button className="text-gray-900 border border-gray-300 px-8 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors">Partner Program</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SustainabilityEnvironmentPage;
