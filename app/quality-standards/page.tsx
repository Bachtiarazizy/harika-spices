"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Shield, Microscope, Leaf, CheckCircle, Globe, FileCheck, Truck } from "lucide-react";
import Image from "next/image";

const QualityStandardsPage: React.FC = () => {
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

  const certifications = [
    {
      title: "ISO 22000:2018",
      description: "Food Safety Management System",
      icon: Shield,
      details: "Comprehensive food safety management covering the entire supply chain from farm to export.",
      status: "Certified",
    },
    {
      title: "HACCP",
      description: "Hazard Analysis Critical Control Points",
      icon: CheckCircle,
      details: "Systematic preventive approach to food safety and biological, chemical hazards.",
      status: "Certified",
    },
    {
      title: "Organic Certification",
      description: "USDA & EU Organic Standards",
      icon: Leaf,
      details: "Certified organic products meeting international organic farming standards.",
      status: "Available",
    },
    {
      title: "Halal Certification",
      description: "MUI & International Halal",
      icon: Award,
      details: "Halal-certified processing ensuring compliance with Islamic dietary laws.",
      status: "Certified",
    },
  ];

  const qualitySteps = [
    {
      step: "01",
      title: "Farm Selection",
      description: "Partner farmers selected based on sustainable practices and quality standards.",
      image: "/farm-selection.jpg",
    },
    {
      step: "02",
      title: "Harvest Monitoring",
      description: "Optimal harvest timing monitored for peak flavor and quality characteristics.",
      image: "/harvest.jpg",
    },
    {
      step: "03",
      title: "Laboratory Testing",
      description: "Comprehensive testing for purity, moisture content, and contamination.",
      image: "/laboratory.jpg",
    },
    {
      step: "04",
      title: "Processing Control",
      description: "Temperature-controlled processing maintaining natural oils and flavors.",
      image: "/processing.jpg",
    },
    {
      step: "05",
      title: "Final Inspection",
      description: "Multi-point quality inspection before packaging and export certification.",
      image: "/inspection.jpg",
    },
    {
      step: "06",
      title: "Export Packaging",
      description: "Professional packaging with full traceability documentation.",
      image: "/packaging.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-[#392E20]">
      {/* Hero Section */}
      <section className="py-20 px-8">
        <motion.div className="max-w-7xl mx-auto text-center" initial="hidden" animate="visible" variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <div className="inline-block mb-4">
              <span className="text-amber-200 text-sm font-medium">QUALITY ASSURANCE</span>
            </div>
            <h1 className="text-white text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Uncompromising Quality
              <br />
              in Every Step
            </h1>
            <p className="text-amber-200 text-lg md:text-xl max-w-3xl mx-auto">From farm to export, our rigorous quality standards ensure every spice meets the highest international requirements for safety, purity, and authenticity.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Certifications Section - Light Background */}
      <section className="bg-gray-100 py-20 font-raleway">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-gray-600 text-sm font-medium">CERTIFICATIONS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-calistoga text-gray-900 leading-snug mb-6">International Certifications & Standards</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">Our facilities and processes are certified by leading international bodies, ensuring compliance with global food safety and quality standards.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <cert.icon className="w-8 h-8 text-green-600" />
                </div>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${cert.status === "Certified" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>{cert.status}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{cert.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{cert.description}</p>
                <p className="text-xs text-gray-500">{cert.details}</p>
              </motion.div>
            ))}
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">100%</div>
              <div className="text-gray-600">Batch Testing</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-gray-600">Quality Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">Zero</div>
              <div className="text-gray-600">Contamination Tolerance</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-600">Quality Parameters</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Process Section - Dark Background */}
      <section className="bg-[#392E20] py-20 px-6 md:px-16">
        <motion.div className="max-w-7xl mx-auto" initial="hidden" animate="visible" variants={containerVariants}>
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <div className="inline-block mb-4">
              <span className="text-amber-200 text-sm font-medium">PROCESS</span>
            </div>
            <h2 className="text-white text-4xl md:text-5xl font-bold mb-4">Our 6-Step Quality Process</h2>
            <p className="text-amber-200 text-lg">Every step monitored and documented for complete traceability</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {qualitySteps.map((step, index) => (
              <motion.div key={index} className="bg-[#4D3D2A] rounded-2xl overflow-hidden" variants={itemVariants} whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}>
                <div className="relative h-48">
                  <Image src={step.image} alt={step.title} width={400} height={192} className="object-cover w-full h-full" />
                  <div className="absolute top-4 left-4 w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{step.step}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-white text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-white text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Testing & Laboratory Section - Light Background */}
      <section className="bg-gray-100 py-20 font-raleway">
        <div className="container mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block mb-4">
              <span className="text-gray-600 text-sm font-medium">LABORATORY</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-calistoga text-gray-900 leading-snug mb-6">Advanced Testing Facilities</h2>
            <p className="text-gray-700 mb-8">Our state-of-the-art laboratory conducts comprehensive testing on every batch, ensuring compliance with international standards and customer specifications.</p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-sm flex items-center justify-center mt-0.5">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Microbiological Testing</h4>
                  <p className="text-gray-700 text-sm">Complete pathogen screening and contamination detection.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-sm flex items-center justify-center mt-0.5">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Chemical Analysis</h4>
                  <p className="text-gray-700 text-sm">Pesticide residue, heavy metals, and chemical contamination screening.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-sm flex items-center justify-center mt-0.5">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Quality Parameters</h4>
                  <p className="text-gray-700 text-sm">Moisture content, volatile oils, color, and flavor profile analysis.</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="bg-gray-900 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors">View Test Reports</button>
              <button className="text-gray-900 font-medium hover:text-gray-700 transition-colors flex items-center gap-2">
                Laboratory Tour
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="w-full flex items-center justify-center">
            <div className="relative w-[500px] h-[500px] rounded-lg overflow-hidden shadow-lg">
              <Image src="/laboratory-facility.jpg" alt="Laboratory Facility" width={500} height={500} className="object-cover w-full h-full rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Documentation & Compliance Section - Dark Background */}
      <section className="bg-[#392E20] py-20 px-6 md:px-16">
        <motion.div className="max-w-7xl mx-auto" initial="hidden" animate="visible" variants={containerVariants}>
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <div className="inline-block mb-4">
              <span className="text-amber-200 text-sm font-medium">COMPLIANCE</span>
            </div>
            <h2 className="text-white text-4xl md:text-5xl font-bold mb-4">Complete Documentation</h2>
            <p className="text-amber-200 text-lg">Full traceability from farm to export</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div className="bg-[#4D3D2A] rounded-2xl p-6 text-center" variants={itemVariants} whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}>
              <FileCheck className="text-amber-300 w-12 h-12 mx-auto mb-4" />
              <h3 className="text-white text-lg font-bold mb-3">Certificates of Analysis</h3>
              <p className="text-white text-sm">Detailed test results for every batch exported.</p>
            </motion.div>

            <motion.div className="bg-[#4D3D2A] rounded-2xl p-6 text-center" variants={itemVariants} whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}>
              <Globe className="text-blue-400 w-12 h-12 mx-auto mb-4" />
              <h3 className="text-white text-lg font-bold mb-3">Export Documentation</h3>
              <p className="text-white text-sm">Complete customs and regulatory compliance papers.</p>
            </motion.div>

            <motion.div className="bg-[#4D3D2A] rounded-2xl p-6 text-center" variants={itemVariants} whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}>
              <Truck className="text-green-400 w-12 h-12 mx-auto mb-4" />
              <h3 className="text-white text-lg font-bold mb-3">Traceability Records</h3>
              <p className="text-white text-sm">Full supply chain tracking from farm to delivery.</p>
            </motion.div>

            <motion.div className="bg-[#4D3D2A] rounded-2xl p-6 text-center" variants={itemVariants} whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}>
              <Microscope className="text-purple-400 w-12 h-12 mx-auto mb-4" />
              <h3 className="text-white text-lg font-bold mb-3">Quality Reports</h3>
              <p className="text-white text-sm">Comprehensive quality assurance documentation.</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section - Light Background */}
      <section className="bg-gray-100 py-20 font-raleway">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-lg">
            <div className="inline-block mb-4">
              <span className="text-gray-600 text-sm font-medium">QUALITY ASSURANCE</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Experience Our Quality Standards</h3>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto">Request sample products with complete quality documentation, or schedule a virtual facility tour to see our quality processes in action.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gray-900 text-white px-8 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors">Request Samples</button>
              <button className="text-gray-900 border border-gray-300 px-8 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors">Schedule Facility Tour</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QualityStandardsPage;
