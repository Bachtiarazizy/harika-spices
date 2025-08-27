"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, ChevronDown, ChevronUp, CheckCircle } from "lucide-react";

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const ContactPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email Us",
      value: "info@harikaspices.com",
      description: "Get a response within 24 hours",
      link: "mailto:info@harikaspices.com",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Call or WhatsApp",
      value: "+90 542 179 3483",
      description: "Monday - Friday, 9 AM - 6 PM GMT+7",
      link: "https://wa.me/925421793483",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Location",
      value: "Central Java, Indonesia",
      description: "Sourcing directly from origin",
      link: null,
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Business Hours",
      value: "Monday - Friday",
      description: "09:00 - 18:00 GMT+7",
      link: null,
    },
  ];

  const faqs = [
    {
      question: "What is your Minimum Order Quantity (MOQ)?",
      answer: "Our standard MOQ is 1 metric ton per product. For trial orders or samples, smaller quantities may be arranged upon request.",
    },
    {
      question: "Do you provide product samples?",
      answer: "Yes, we provide samples for quality verification. Sample costs and shipping are typically covered by the buyer.",
    },
    {
      question: "What shipping terms do you offer?",
      answer: "We offer FOB (Indonesia Port), CIF, and CNF terms. Shipping options can be customized based on your logistics preferences.",
    },
    {
      question: "What certifications do your products have?",
      answer: "Our products comply with HACCP and ISO food safety standards. Halal and Organic certificates are available upon request.",
    },
    {
      question: "How do you ensure product quality?",
      answer: "Every shipment undergoes strict quality control including moisture testing, hand sorting, and laboratory analysis for contaminants.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept T/T (Wire Transfer), L/C (Letter of Credit), and other secure international payment methods.",
    },
  ];

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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section className="bg-[#392E20] py-20 px-4" initial="hidden" animate="visible" variants={containerVariants}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div>
            <h1 className="text-4xl md:text-5xl font-calistoga text-white mt-12 mb-6">Get in Touch</h1>
            <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">Ready to source premium Indonesian spices? We&apos;re here to help you find the perfect products for your business needs.</p>
          </motion.div>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="mx-auto flex flex-col lg:flex-row gap-20">
          {/* Contact Form - Now on the left */}
          <motion.div className="lg:w-1/2" initial="hidden" animate="visible" variants={containerVariants}>
            <motion.div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h2>

              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="text-green-800">Thank you! We&apos;ll get back to you within 24 hours.</p>
                </div>
              )}

              <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#392E20] focus:border-[#392E20] outline-none transition-colors"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#392E20] focus:border-[#392E20] outline-none transition-colors"
                      placeholder="Your Company Ltd."
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#392E20] focus:border-[#392E20] outline-none transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#392E20] focus:border-[#392E20] outline-none transition-colors"
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#392E20] focus:border-[#392E20] outline-none transition-colors"
                  >
                    <option value="">Select inquiry type</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="quote-request">Quote Request</option>
                    <option value="sample-request">Sample Request</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="general">General Question</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#392E20] focus:border-[#392E20] outline-none transition-colors resize-vertical"
                    placeholder="Please provide details about your inquiry, including specific products, quantities, and timeline..."
                  />
                </div>

                <div>
                  <button type="submit" className="w-full md:w-auto px-8 py-3 bg-[#392E20] text-white rounded-lg hover:bg-[#392E20] transition-colors flex items-center gap-2 justify-center font-medium">
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>

          {/* Contact Information - Now on the right */}
          <motion.div className="lg:w-1/2" initial="hidden" animate="visible" variants={containerVariants}>
            <motion.div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-2 bg-[#392E20] rounded-lg text-white flex-shrink-0">{info.icon}</div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">{info.title}</h3>
                      {info.link ? (
                        <a href={info.link} className="text-[#392E20] hover:text-[#392E20]/80 transition-colors font-medium block">
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-gray-900 font-medium">{info.value}</p>
                      )}
                      <p className="text-sm text-gray-500 mt-1">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div className="space-y-3">
              <a href="https://wa.me/905421793483" className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#392E20] text-white rounded-lg hover:bg-green-700 transition-colors">
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
              <a href="mailto:info@harikaspices.com" className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Mail className="w-4 h-4" />
                Send Email
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <motion.section className="bg-gray-50 py-20 px-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Get quick answers to common questions about our products and services.</p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <button onClick={() => toggleFaq(index)} className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                  {expandedFaq === index ? <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-4 border-t border-gray-100">
                    <p className="text-gray-600 pt-4 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section className="bg-[#392E20] mx-6 md:mx-16 my-32 rounded-2xl py-16 px-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
        <div className="max-w-2xl mx-auto text-center">
          <motion.div>
            <h3 className="text-3xl font-calistoga text-white mb-4">Ready to Start Your Spice Journey?</h3>
            <p className="text-gray-100 mb-8">Join hundreds of satisfied customers worldwide who trust Harika Spices for premium Indonesian spices.</p>
            <div className="flex flex-row gap-4 justify-center max-w-md mx-auto">
              <a href="#contact-form" className="flex-1 px-6 py-3 bg-white text-[#392E20] rounded-lg hover:bg-[#392E20]transition-colors font-medium text-center">
                Request Quote
              </a>
              <a href="https://wa.me/905421793483" className="flex-1 px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-[#392E20] transition-colors font-medium text-center">
                WhatsApp Now
              </a>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default ContactPage;
