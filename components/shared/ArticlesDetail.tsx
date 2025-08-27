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

// Modern Portable Text components with professional styling
const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <figure className="my-12 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        <Image src={value.asset?.url} alt={value.alt || ""} width={800} height={400} className="w-full h-auto" />
        {value.caption && (
          <figcaption className="bg-gray-50 px-8 py-4 border-t border-gray-100">
            <p className="text-sm text-gray-600 italic text-center leading-relaxed">{value.caption}</p>
          </figcaption>
        )}
      </figure>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a href={value.href} target="_blank" rel="noopener noreferrer" className="text-[#392E20] hover:text-[#392E20]/70 font-medium underline decoration-blue-200 hover:decoration-blue-300 decoration-2 underline-offset-2 transition-all">
        {children}
      </a>
    ),
    strong: ({ children }: any) => <strong className="font-semibold text-gray-900">{children}</strong>,
  },
  block: {
    h2: ({ children, value }: any) => {
      const id = value.children?.[0]?.text?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "heading";
      return (
        <h2 id={id} className="text-3xl font-bold text-gray-900 mt-16 mb-6 leading-tight tracking-tight">
          {children}
        </h2>
      );
    },
    h3: ({ children, value }: any) => {
      const id = value.children?.[0]?.text?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "heading";
      return (
        <h3 id={id} className="text-2xl font-semibold text-gray-900 mt-12 mb-5 leading-tight tracking-tight">
          {children}
        </h3>
      );
    },
    h4: ({ children, value }: any) => {
      const id = value.children?.[0]?.text?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "heading";
      return (
        <h4 id={id} className="text-xl font-semibold text-gray-800 mt-10 mb-4 leading-tight">
          {children}
        </h4>
      );
    },
    normal: ({ children }: any) => <p className="text-gray-700 text-lg leading-8 mb-6 tracking-normal">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-[#392E20] pl-8 py-6 my-10 bg-[#392E20]/50 rounded-r-xl">
        <div className="text-gray-800 text-lg leading-8 italic font-medium">{children}</div>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-none space-y-3 my-8 text-gray-700 text-lg">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside space-y-3 my-8 text-gray-700 text-lg ml-4">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="flex items-start gap-3">
        <span className="w-1.5 h-1.5 bg-[#392E20] rounded-full mt-3 flex-shrink-0"></span>
        <span>{children}</span>
      </li>
    ),
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
      <motion.header className="bg-[#392E20] py-20 px-6 md:px-16 relative overflow-hidden" initial="hidden" animate="visible" variants={staggerContainer}>
        <div className="max-w-5xl relative z-10">
          <motion.div>
            {/* Breadcrumb */}
            <nav className="mb-8">
              <Link href="/articles" className="text-gray-300 hover:text-white text-sm font-medium flex items-center gap-2 transition-colors">
                <ArrowLeft size={16} />
                Back to Articles
              </Link>
            </nav>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-calistoga text-white mb-8 leading-tight tracking-tight">{post.title}</h1>

            {/* Excerpt */}
            {post.excerpt && <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-12 max-w-4xl font-light">{post.excerpt}</p>}

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-8 text-gray-300">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <Calendar size={16} />
                </div>
                <span className="text-sm font-medium">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <Clock size={16} />
                </div>
                <span className="text-sm font-medium">{readingTime} min read</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-4 gap-16">
          {/* Article Content */}
          <motion.article className="lg:col-span-3" initial="hidden" animate="visible">
            {/* Featured Image */}
            {post.mainImage?.asset?.url && (
              <div className="mb-16 rounded-3xl overflow-hidden shadow-lg border border-gray-100">
                <Image src={post.mainImage.asset.url} alt={post.mainImage.alt || post.title} width={1200} height={600} className="w-full h-auto" priority />
              </div>
            )}

            {/* Article Body */}
            <div className="prose prose-lg prose-gray max-w-none">{post.body && <PortableText value={post.body} components={portableTextComponents} />}</div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-16 pt-12 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Tag size={18} className="text-gray-600" />
                  Tagged Topics
                </h3>
                <div className="flex flex-wrap gap-3">
                  {post.tags.map((tag: string, index: number) => (
                    <span key={index} className="px-4 py-2 bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-700 text-sm font-medium rounded-full transition-all cursor-pointer border border-transparent hover:border-blue-200">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share Section */}
            <div className="mt-16 pt-12 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Share2 size={18} className="text-gray-600" />
                Share this article
              </h3>
              <div className="flex flex-wrap gap-3">
                <a
                  href={shareLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 bg-[#392E20] hover:bg-blue-700 text-white rounded-xl transition-all hover:scale-105 shadow-sm"
                  title="Share on Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href={shareLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 bg-sky-500 hover:bg-sky-600 text-white rounded-xl transition-all hover:scale-105 shadow-sm"
                  title="Share on Twitter"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href={shareLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 bg-blue-700 hover:bg-blue-800 text-white rounded-xl transition-all hover:scale-105 shadow-sm"
                  title="Share on LinkedIn"
                >
                  <Linkedin size={20} />
                </a>

                <button
                  onClick={copyToClipboard}
                  className={`flex items-center justify-center w-12 h-12 ${copied ? "bg-green-600" : "bg-gray-600 hover:bg-gray-700"} text-white rounded-xl transition-all hover:scale-105 shadow-sm`}
                  title={copied ? "Link copied!" : "Copy link"}
                >
                  <Copy size={20} />
                </button>
              </div>
              {copied && <p className="text-green-600 text-sm mt-3 font-medium">Link copied to clipboard!</p>}
            </div>
          </motion.article>

          {/* Sidebar */}
          <motion.aside className="lg:col-span-1" initial="hidden" animate="visible">
            {/* Table of Contents */}
            {tableOfContents.length > 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 mb-8">
                <h3 className="font-bold text-gray-900 text-lg mb-6">Table of Contents</h3>
                <nav>
                  <ul className="space-y-3 text-sm">
                    {tableOfContents.map((heading, index) => (
                      <li key={index}>
                        <a href={`#${heading.id}`} className={`text-gray-600 hover:text-[#392E20] transition-colors block py-1 font-medium hover:font-semibold`}>
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}

            {/* Article Statistics */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <h3 className="font-bold text-gray-900 text-lg mb-6">Article Info</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <span className="text-gray-600 text-sm font-medium">Published</span>
                  <span className="text-gray-900 font-semibold text-sm">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <span className="text-gray-600 text-sm font-medium">Reading time</span>
                  <span className="text-gray-900 font-semibold text-sm">{readingTime} min</span>
                </div>
                {post.categories && post.categories.length > 0 && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-gray-600 text-sm font-medium">Categories</span>
                    <span className="text-gray-900 font-semibold text-sm">{post.categories.length}</span>
                  </div>
                )}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 text-sm font-medium">Topics</span>
                    <span className="text-gray-900 font-semibold text-sm">{post.tags.length}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.aside>
        </div>
      </div>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <motion.section className="bg-gray-50 py-24 px-6 md:px-16" initial="hidden" animate="visible" variants={staggerContainer}>
          <div className="max-w-7xl mx-auto">
            <motion.div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">Continue Reading</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto font-light">Explore more insights and industry analysis from our experts</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {relatedPosts.slice(0, 3).map((relatedPost: SanityDocument, index: number) => (
                <motion.article key={relatedPost._id} whileHover={{ y: -8, transition: { duration: 0.3 } }} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                  <Link href={`/articles/${relatedPost.slug?.current}`}>
                    {relatedPost.mainImage?.asset?.url && (
                      <div className="h-52 overflow-hidden">
                        <Image
                          src={relatedPost.mainImage.asset.url}
                          alt={relatedPost.mainImage.alt || relatedPost.title}
                          width={400}
                          height={250}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    )}

                    <div className="p-8">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#392E20] transition-colors mb-4 leading-tight line-clamp-2">{relatedPost.title}</h3>

                      {relatedPost.excerpt && <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6 font-light">{relatedPost.excerpt}</p>}

                      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                        <time className="text-xs text-gray-500 font-medium">
                          {new Date(relatedPost.publishedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </time>
                        <ArrowRight size={16} className="text-[#392E20] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.section>
      )}
    </div>
  );
}
