"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Calendar } from "lucide-react";

const TermsOfServicePage = () => {
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

  // const itemVariants = {
  //   hidden: {
  //     opacity: 0,
  //     y: 20,
  //   },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       duration: 0.5,
  //       ease: "easeOut",
  //     },
  //   },
  // };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <motion.header className="bg-[#392E20] py-16 px-4" initial="hidden" animate="visible" variants={containerVariants}>
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center">
            <h1 className="text-white font-calistoga text-3xl md:text-4xl lg:text-5xl mb-6 mt-12">Terms of Service</h1>
            <p className="text-lg text-gray-100 max-w-2xl mx-autotext-gray-200 text-medium md:text-lg mx-auto">These terms govern your use of our website and services. Please read them carefully before engaging with Harika Spices.</p>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <motion.main className="max-w-4xl mx-auto px-4 py-16" initial="hidden" animate="visible" variants={containerVariants}>
        {/* Last Updated */}
        <motion.div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-sm text-[#392E20] ">
            <Calendar className="w-4 h-4" />
            Last updated: January 1, 2024
          </div>
        </motion.div>

        {/* Content Sections */}
        <div className="prose prose-lg max-w-none">
          <motion.section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Agreement to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing or using the Harika Spices website and services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services.
            </p>
          </motion.section>

          <motion.section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Use of Our Website</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Permitted Use</h3>
                <p className="text-gray-700 mb-4">You may use our website for lawful business purposes, including:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Viewing product information and company details</li>
                  <li>Submitting legitimate business inquiries</li>
                  <li>Downloading publicly available resources</li>
                  <li>Contacting us for business-related matters</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Prohibited Activities</h3>
                <p className="text-gray-700 mb-4">You agree not to:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Use automated systems to access or scrape our website</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Distribute malicious software or harmful content</li>
                  <li>Misrepresent your identity or business relationship</li>
                  <li>Use our content without proper authorization</li>
                </ul>
              </div>
            </div>
          </motion.section>

          <motion.section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Product Information and Orders</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Product Information</h3>
                <p className="text-gray-700">
                  Product specifications, availability, and pricing are provided for informational purposes and may vary based on harvest conditions, market factors, and supply availability. All product details are subject to confirmation
                  during the quotation process.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Order Process</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Website inquiries do not constitute binding orders</li>
                  <li>All orders require formal quotation and acceptance</li>
                  <li>Final terms are established through signed sales contracts</li>
                  <li>Payment and delivery terms are specified in individual agreements</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Quality and Specifications</h3>
                <p className="text-gray-700">
                  We strive to provide accurate product information, but natural agricultural products may have variations. Quality specifications, certifications, and compliance requirements will be confirmed in writing for each order.
                </p>
              </div>
            </div>
          </motion.section>

          <motion.section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Intellectual Property Rights</h2>
            <p className="text-gray-700 mb-4">
              All content on this website, including but not limited to text, images, logos, product descriptions, and design elements, is the property of Harika Spices and is protected by intellectual property laws.
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>You may not copy, reproduce, or distribute our content without permission</li>
              <li>Commercial use of our materials requires written authorization</li>
              <li>Our company name and logo are registered trademarks</li>
              <li>Unauthorized use may result in legal action</li>
            </ul>
          </motion.section>

          <motion.section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Privacy and Data Protection</h2>
            <p className="text-gray-700">
              Your privacy is important to us. Our collection, use, and protection of your personal information is governed by our Privacy Policy, which forms an integral part of these Terms of Service. Please review our Privacy Policy to
              understand our data practices.
            </p>
          </motion.section>

          <motion.section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Disclaimers and Limitations</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Website Availability</h3>
                <p className="text-gray-700">
                  While we strive to maintain continuous website availability, we do not guarantee uninterrupted access. We reserve the right to modify, suspend, or discontinue any part of our website without notice.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Limitation of Liability</h3>
                <p className="text-gray-700">
                  To the fullest extent permitted by law, Harika Spices shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of our website or services. Our total liability is limited to
                  the value of the specific transaction in question.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Force Majeure</h3>
                <p className="text-gray-700">We are not liable for delays or failures in performance due to circumstances beyond our reasonable control, including natural disasters, government actions, or supply chain disruptions.</p>
              </div>
            </div>
          </motion.section>

          <motion.section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Governing Law and Disputes</h2>
            <p className="text-gray-700 mb-4">
              These Terms of Service are governed by and construed in accordance with the laws of Indonesia. Any disputes arising from these terms or your use of our services shall be subject to the exclusive jurisdiction of Indonesian
              courts, unless otherwise agreed in writing.
            </p>
            <p className="text-gray-700">We encourage resolving disputes through good faith negotiations before pursuing legal action.</p>
          </motion.section>

          <motion.section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Changes to Terms</h2>
            <p className="text-gray-700">
              We reserve the right to modify these Terms of Service at any time. Updated terms will be posted on this page with a revised effective date. Your continued use of our website after changes constitutes acceptance of the new
              terms.
            </p>
          </motion.section>

          <motion.section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Severability</h2>
            <p className="text-gray-700">If any provision of these terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.</p>
          </motion.section>
        </div>

        {/* Contact Section */}
        <motion.section className="mt-16 p-8 bg-gray-50 rounded-2xl border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Questions About These Terms?</h2>
          <p className="text-gray-700 mb-6">If you have any questions about these Terms of Service or need clarification on any provisions, please contact us:</p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="mailto:info@harikaspices.com" className="inline-flex items-center gap-2 px-6 py-3 bg-[#392E20]  text-white rounded-lg hover:bg-[#392E20]/80  transition-colors font-medium">
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

export default TermsOfServicePage;
