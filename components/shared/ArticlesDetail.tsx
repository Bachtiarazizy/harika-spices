/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { type SanityDocument } from "next-sanity";
import { Calendar, Clock, User, Tag, Share2, Facebook, Twitter, Linkedin, ArrowLeft, ArrowRight, BookOpen, Globe, Copy, MessageCircle, Instagram } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { useState } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.6,
    },
  },
};

// Helper function to generate table of contents
const generateTableOfContents = (body: any[]) => {
  if (!body) return [];

  const headings = body.filter((block) => block._type === "block" && ["h2", "h3", "h4"].includes(block.style));

  return headings.map((heading, index) => ({
    id: heading.children?.[0]?.text?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || `heading-${index}`,
    text: heading.children?.[0]?.text || "Untitled",
    level: heading.style,
  }));
};

// Helper function to calculate reading time
const calculateReadingTime = (body: any[]) => {
  if (!body) return 1;

  const wordsPerMinute = 200;
  const textContent = body
    .filter((block) => block._type === "block" && block.children)
    .map((block) => block.children.map((child: any) => child.text).join(" "))
    .join(" ");

  const wordCount = textContent.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  return Math.max(1, readingTime);
};

// Portable Text components for rich content
const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="my-8 rounded-2xl overflow-hidden shadow-lg">
        <Image src={value.asset?.url} alt={value.alt || ""} width={800} height={400} className="w-full h-auto" />
        {value.caption && (
          <div className="bg-gray-50 px-6 py-4">
            <p className="text-sm text-gray-600 italic text-center">{value.caption}</p>
          </div>
        )}
      </div>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a href={value.href} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700 font-semibold underline decoration-amber-300 hover:decoration-amber-500 transition-colors">
        {children}
      </a>
    ),
  },
  block: {
    h2: ({ children, value }: any) => {
      const id = value.children?.[0]?.text?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "heading";
      return (
        <h2 id={id} className="text-3xl font-calistoga text-[#392E20] mt-12 mb-6 leading-tight">
          {children}
        </h2>
      );
    },
    h3: ({ children, value }: any) => {
      const id = value.children?.[0]?.text?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "heading";
      return (
        <h3 id={id} className="text-2xl font-calistoga text-[#392E20] mt-10 mb-4 leading-tight">
          {children}
        </h3>
      );
    },
    h4: ({ children, value }: any) => {
      const id = value.children?.[0]?.text?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "heading";
      return (
        <h4 id={id} className="text-xl font-semibold text-[#392E20] mt-8 mb-3">
          {children}
        </h4>
      );
    },
    normal: ({ children }: any) => <p className="text-gray-700 text-lg leading-relaxed mb-6">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-amber-500 pl-6 py-4 my-8 bg-amber-50 rounded-r-lg">
        <div className="text-gray-800 text-lg italic leading-relaxed">{children}</div>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside space-y-3 my-6 text-gray-700 text-lg">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside space-y-3 my-6 text-gray-700 text-lg">{children}</ol>,
  },
};

interface ArticleDetailProps {
  post: SanityDocument;
  relatedPosts?: SanityDocument[];
}

export default function ArticleDetail({ post, relatedPosts = [] }: ArticleDetailProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = post.title;
  const tableOfContents = generateTableOfContents(post.body);
  const readingTime = calculateReadingTime(post.body);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareTitle + " " + shareUrl)}`,
    instagram: `https://www.instagram.com/`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Article Header */}
      <motion.header className="bg-[#392E20] py-16 px-6 md:px-16 relative overflow-hidden" initial="hidden" animate="visible" variants={staggerContainer}>
        <div className="max-w-4xl relative z-10">
          <motion.div>
            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-calistoga mt-12 text-white mb-6 leading-tight">{post.title}</h1>

            {/* Excerpt */}
            {post.excerpt && <p className="text-xl text-amber-100 leading-relaxed mb-8 max-w-3xl">{post.excerpt}</p>}

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-6 text-amber-200">
              {/* Date */}
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span className="text-sm font-medium">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              {/* Reading Time */}
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span className="text-sm font-medium">{readingTime} min read</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Article Content */}
          <motion.article className="lg:col-span-3" initial="hidden" animate="visible">
            {/* Featured Image */}
            {post.mainImage?.asset?.url && (
              <div className="mb-12 rounded-3xl overflow-hidden shadow-xl">
                <Image src={post.mainImage.asset.url} alt={post.mainImage.alt || post.title} width={1200} height={600} className="w-full h-auto" priority />
              </div>
            )}

            {/* Article Body */}
            <div className="prose prose-lg max-w-none">{post.body && <PortableText value={post.body} components={portableTextComponents} />}</div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-[#392E20] mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 hover:bg-amber-100 text-gray-700 hover:text-amber-800 text-sm rounded-lg transition-colors cursor-pointer">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-[#392E20] mb-4 flex items-center gap-2">
                <Share2 size={20} />
                Share this article
              </h3>
              <div className="flex gap-3">
                <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" title="Share on Facebook">
                  <Facebook size={18} />
                </a>
                <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors" title="Share on Twitter">
                  <Twitter size={18} />
                </a>
                <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors" title="Share on LinkedIn">
                  <Linkedin size={18} />
                </a>
                <a
                  href={shareLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  title="Share on WhatsApp"
                >
                  <MessageCircle size={18} />
                </a>
                <a
                  href={shareLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
                  title="Share on Instagram"
                >
                  <Instagram size={18} />
                </a>
                <button
                  onClick={copyToClipboard}
                  className={`flex items-center justify-center w-10 h-10 ${copied ? "bg-green-600" : "bg-gray-600"} text-white rounded-lg hover:bg-gray-700 transition-colors`}
                  title={copied ? "Link copied!" : "Copy link"}
                >
                  <Copy size={18} />
                </button>
              </div>
              {copied && <p className="text-green-600 text-sm mt-2">Link copied to clipboard!</p>}
            </div>
          </motion.article>

          {/* Sidebar */}
          <motion.aside className="lg:col-span-1" initial="hidden" animate="visible">
            {/* Table of Contents */}
            {tableOfContents.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8">
                <h3 className="font-calistoga text-[#392E20] text-lg mb-4 flex items-center gap-2">
                  <BookOpen size={20} />
                  Table of Contents
                </h3>
                <ul className="space-y-2 text-sm">
                  {tableOfContents.map((heading, index) => (
                    <li key={index}>
                      <a href={`#${heading.id}`} className={`text-gray-600 hover:text-amber-600 transition-colors block ${heading.level === "h3" ? "ml-4" : heading.level === "h4" ? "ml-8" : ""}`}>
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quick Stats */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8">
              <h3 className="font-calistoga text-[#392E20] text-lg mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Published</span>
                  <span className="text-[#392E20] font-semibold text-sm">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Reading time</span>
                  <span className="text-[#392E20] font-semibold text-sm">{readingTime} min</span>
                </div>
                {post.categories && post.categories.length > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Categories</span>
                    <span className="text-[#392E20] font-semibold text-sm">{post.categories.length}</span>
                  </div>
                )}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Tags</span>
                    <span className="text-[#392E20] font-semibold text-sm">{post.tags.length}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.aside>
        </div>
      </div>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <motion.section className="bg-gray-50 py-20 px-6 md:px-16" initial="hidden" animate="visible" variants={staggerContainer}>
          <div className="max-w-7xl mx-auto">
            <motion.div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-calistoga text-[#392E20] mb-4">Related Articles</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">Explore more insights and analysis from our industry experts</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.slice(0, 3).map((relatedPost: SanityDocument, index: number) => (
                <motion.article key={relatedPost._id} whileHover={{ y: -8, transition: { duration: 0.3 } }} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <Link href={`/articles/${relatedPost.slug?.current}`}>
                    {relatedPost.mainImage?.asset?.url && (
                      <div className="h-48 overflow-hidden">
                        <Image
                          src={relatedPost.mainImage.asset.url}
                          alt={relatedPost.mainImage.alt || relatedPost.title}
                          width={400}
                          height={250}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    )}

                    <div className="p-6">
                      {/* Categories */}
                      {relatedPost.categories && relatedPost.categories.length > 0 && (
                        <div className="flex gap-2 mb-3">
                          {relatedPost.categories.slice(0, 2).map((category: any) => (
                            <span key={category._id} className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-lg font-medium">
                              {category.title}
                            </span>
                          ))}
                        </div>
                      )}

                      <h3 className="text-xl font-calistoga text-[#392E20] group-hover:text-amber-700 transition-colors mb-3 leading-tight line-clamp-2">{relatedPost.title}</h3>

                      {relatedPost.excerpt && <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">{relatedPost.excerpt}</p>}

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <time className="text-xs text-gray-500">
                          {new Date(relatedPost.publishedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </time>
                        <ArrowRight size={16} className="text-amber-600 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* CTA Section - Following About Page Style */}
      <section className="bg-gray-100 py-20 font-raleway">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-lg">
            <h3 className="text-2xl md:text-3xl font-calistoga text-gray-900 mb-4">Get More Industry Insights</h3>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto">Subscribe to receive the latest articles, market analysis, and industry updates from Harika Spices experts delivered directly to your inbox.</p>

            {/* Newsletter Form */}
            <div className="max-w-lg mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your professional email"
                  className="flex-1 px-6 py-4 border border-gray-300 rounded-md font-medium placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <button className="bg-gray-900 text-white px-8 py-4 rounded-md font-medium hover:bg-gray-800 transition-colors whitespace-nowrap">Subscribe Now</button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 text-gray-600">
                <User size={16} />
                <span className="text-sm font-medium">5,000+ Subscribers</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock size={16} />
                <span className="text-sm font-medium">Weekly Updates</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Tag size={16} />
                <span className="text-sm font-medium">Industry Exclusive</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
