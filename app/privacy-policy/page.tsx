/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Mail, Phone, Calendar } from "lucide-react";

const PrivacyPolicyPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <motion.header className="bg-[#392E20] py-16 px-4" initial="hidden" animate="visible" variants={containerVariants}>
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center">
            <h1 className="text-4xl md:text-5xl font-calistoga text-white mt-12 mb-4">Privacy Policy</h1>
            <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.</p>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <motion.main className="max-w-4xl mx-auto px-4 py-16" initial="hidden" animate="visible" variants={containerVariants}>
        {/* Last Updated */}
        <motion.div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-sm text-[#392E20]">
            <Calendar className="w-4 h-4" />
            Last updated: January 1, 2024
          </div>
        </motion.div>

        {/* Content Sections */}
        <div className="prose prose-lg max-w-none">
          <motion.section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              At Harika Spices, we are committed to protecting your privacy and handling your personal information with care. This Privacy Policy describes how we collect, use, store, and protect your information when you visit our website
              or engage with our services.
            </p>
          </motion.section>

          <motion.section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Information We Collect</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Personal Information</h3>
                <p className="text-gray-700 mb-2">We may collect the following personal information when you contact us or use our services:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Name and contact information (email, phone number)</li>
                  <li>Company name and business details</li>
                  <li>Product inquiries and requirements</li>
                  <li>Communication preferences</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Automatically Collected Information</h3>
                <p className="text-gray-700 mb-2">When you visit our website, we automatically collect certain information:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>IP address and location data</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent on site</li>
                  <li>Device information</li>
                </ul>
              </div>
            </div>
          </motion.section>

          <motion.section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">We use your information for the following purposes:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Responding to your inquiries and providing product information</li>
              <li>Processing orders and coordinating shipments</li>
              <li>Improving our website and services</li>
              <li>Sending relevant business communications (with your consent)</li>
              <li>Complying with legal obligations</li>
            </ul>
          </motion.section>

          <motion.section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Information Sharing and Disclosure</h2>
            <p className="text-gray-700 mb-4">We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>With trusted service providers who assist in our business operations</li>
              <li>When required by law or to protect our legal rights</li>
              <li>With your explicit consent</li>
            </ul>
          </motion.section>

          <motion.section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Data Security</h2>
            <p className="text-gray-700">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the
              internet is 100% secure.
            </p>
          </motion.section>

          <motion.section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 mb-4">Our website uses cookies and similar technologies to enhance your browsing experience and analyze site usage. You can control cookie preferences through your browser settings.</p>
          </motion.section>

          <motion.section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Rights</h2>
            <p className="text-gray-700 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate or incomplete data</li>
              <li>Request deletion of your personal information</li>
              <li>Object to processing of your personal information</li>
              <li>Data portability</li>
            </ul>
          </motion.section>

          <motion.section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Data Retention</h2>
            <p className="text-gray-700">We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy or as required by law.</p>
          </motion.section>

          <motion.section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Changes to This Policy</h2>
            <p className="text-gray-700">We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.</p>
          </motion.section>
        </div>

        {/* Contact Section */}
        <motion.section className="mt-16 p-8 bg-gray-50 rounded-2xl border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-6">If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:</p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="mailto:info@harikaspices.com" className="inline-flex items-center gap-2 px-6 py-3 bg-[#392E20] text-white rounded-lg hover:bg-[#392E20]/80 transition-colors font-medium">
              <Mail className="w-4 h-4" />
              info@harikaspices.com
            </a>
            <a href="https://wa.me/905421793483" className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              <Phone className="w-4 h-4" />
              WhatsApp Support
            </a>
          </div>
        </motion.section>
      </motion.main>
    </div>
  );
};

export default PrivacyPolicyPage;
