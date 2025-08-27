/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { type SanityDocument } from "next-sanity";
import { Calendar, Clock, User, Tag, Share2, Facebook, Twitter, Linkedin, ArrowLeft, ArrowRight, BookOpen, Globe } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { useMemo } from "react";

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

// Helper function untuk generate slug dari text
const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .trim();
};

// Helper function untuk extract headings dari body content
const extractHeadings = (body: any[]): Array<{ text: string; slug: string; level: string }> => {
  if (!body) return [];

  const headings: Array<{ text: string; slug: string; level: string }> = [];

  body.forEach((block) => {
    if (block._type === "block" && ["h1", "h2", "h3", "h4"].includes(block.style)) {
      const text = block.children?.map((child: any) => child.text)?.join("") || "";

      if (text.trim()) {
        headings.push({
          text: text.trim(),
          slug: generateSlug(text.trim()),
          level: block.style,
        });
      }
    }
  });

  return headings;
};

// Portable Text components for rich content - Professional styling dengan ID untuk anchor links
const createPortableTextComponents = (headings: Array<{ text: string; slug: string; level: string }>) => ({
  types: {
    image: ({ value }: any) => (
      <figure className="my-10">
        <div className="rounded-lg overflow-hidden shadow-md bg-gray-50">
          <Image src={value.asset.url} alt={value.alt || ""} width={800} height={400} className="w-full h-auto" />
        </div>
        {value.caption && <figcaption className="mt-3 text-center text-sm text-gray-600 italic">{value.caption}</figcaption>}
      </figure>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a href={value.href} target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:text-amber-800 font-medium underline underline-offset-2 decoration-amber-400 hover:decoration-amber-500 transition-all duration-200">
        {children}
      </a>
    ),
    strong: ({ children }: any) => <strong className="font-semibold text-gray-900">{children}</strong>,
    em: ({ children }: any) => <em className="italic text-gray-800">{children}</em>,
  },
  block: {
    h1: ({ children, value }: any) => {
      const text = value.children?.map((child: any) => child.text)?.join("") || "";
      const slug = generateSlug(text);
      return (
        <h1 id={slug} className="text-4xl font-bold text-gray-900 mt-16 mb-8 leading-tight border-b border-gray-200 pb-4 scroll-mt-24">
          {children}
        </h1>
      );
    },
    h2: ({ children, value }: any) => {
      const text = value.children?.map((child: any) => child.text)?.join("") || "";
      const slug = generateSlug(text);
      return (
        <h2 id={slug} className="text-3xl font-bold text-gray-900 mt-14 mb-6 leading-tight scroll-mt-24">
          {children}
        </h2>
      );
    },
    h3: ({ children, value }: any) => {
      const text = value.children?.map((child: any) => child.text)?.join("") || "";
      const slug = generateSlug(text);
      return (
        <h3 id={slug} className="text-2xl font-semibold text-gray-800 mt-12 mb-5 leading-tight scroll-mt-24">
          {children}
        </h3>
      );
    },
    h4: ({ children, value }: any) => {
      const text = value.children?.map((child: any) => child.text)?.join("") || "";
      const slug = generateSlug(text);
      return (
        <h4 id={slug} className="text-xl font-semibold text-gray-800 mt-10 mb-4 leading-tight scroll-mt-24">
          {children}
        </h4>
      );
    },
    h5: ({ children }: any) => <h5 className="text-lg font-semibold text-gray-700 mt-8 mb-3 leading-tight">{children}</h5>,
    h6: ({ children }: any) => <h6 className="text-base font-semibold text-gray-700 mt-6 mb-2 leading-tight">{children}</h6>,
    normal: ({ children }: any) => <p className="text-gray-700 text-[17px] leading-[1.7] mb-6 font-normal tracking-wide">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-amber-500 pl-8 pr-4 py-6 my-8 bg-gradient-to-r from-amber-50 to-transparent rounded-r-md">
        <div className="text-gray-800 text-lg leading-relaxed italic font-medium relative">
          <span className="text-amber-500 text-6xl font-serif absolute -top-4 -left-2 opacity-30">&quot;</span>
          {children}
        </div>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-none space-y-3 my-8 pl-0">{children}</ul>,
    number: ({ children }: any) => (
      <ol className="list-none space-y-3 my-8 pl-0" style={{ counterReset: "ordered-list" }}>
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="flex items-start gap-3 text-gray-700 text-[17px] leading-[1.7]">
        <span className="flex-shrink-0 w-2 h-2 bg-amber-500 rounded-full mt-3"></span>
        <div>{children}</div>
      </li>
    ),
    number: ({ children }: any) => (
      <li className="flex items-start gap-4 text-gray-700 text-[17px] leading-[1.7]" style={{ counterIncrement: "ordered-list" }}>
        <span className="flex-shrink-0 w-6 h-6 bg-amber-500 text-white text-sm font-semibold rounded-full flex items-center justify-center mt-1" style={{ content: "counter(ordered-list)" }}>
          <style jsx>{`
            span::before {
              content: counter(ordered-list);
            }
          `}</style>
        </span>
        <div>{children}</div>
      </li>
    ),
  },
});

interface ArticleDetailProps {
  post: SanityDocument;
  relatedPosts?: SanityDocument[];
}

export default function ArticleDetail({ post, relatedPosts = [] }: ArticleDetailProps) {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = post.title;

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
  };

  // Extract headings from post body untuk Table of Contents
  const headings = useMemo(() => {
    return extractHeadings(post.body || []);
  }, [post.body]);

  // Create portable text components dengan headings
  const portableTextComponents = useMemo(() => {
    return createPortableTextComponents(headings);
  }, [headings]);

  // Handle smooth scroll ke section
  const handleTOCClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault();
    const element = document.getElementById(slug);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Article Header */}
      <motion.header className="bg-[#392E20] py-16 relative overflow-hidden" initial="hidden" animate="visible" variants={staggerContainer}>
        <div className="max-w-4xl px-6 md:px-16 relative z-10">
          <motion.div>
            {/* Back Button */}
            <Link href="/articles" className="inline-flex items-center gap-2 text-amber-200 hover:text-amber-100 mt-12 mb-8 transition-colors group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Articles</span>
            </Link>

            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-6">
                {post.categories.map((category: any, index: number) => (
                  <span key={category.slug?.current || category._id || index} className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600/20 border border-amber-500/30 text-amber-200 text-sm font-semibold rounded-lg">
                    <Tag size={14} />
                    {category.title}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-calistoga text-white mb-6 leading-tight">{post.title}</h1>

            {/* Excerpt */}
            {post.excerpt && <p className="text-xl text-amber-100 leading-relaxed mb-8 max-w-3xl">{post.excerpt}</p>}

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-6 text-amber-200">
              {/* Author */}
              {post.author && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-600/20 border border-amber-500/30 rounded-full flex items-center justify-center">
                    <User size={18} />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{post.author.name}</div>
                  </div>
                </div>
              )}

              {/* Divider */}
              <div className="w-px h-8 bg-amber-500/30"></div>

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
                <span className="text-sm font-medium">8 min read</span>
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
            <div className="article-content max-w-none">
              <style jsx>{`
                .article-content {
                  counter-reset: ordered-list;
                }
                .article-content ol li {
                  counter-increment: ordered-list;
                }
                .article-content ol li span::before {
                  content: counter(ordered-list);
                }
              `}</style>
              {post.body && <PortableText value={post.body} components={portableTextComponents} />}
            </div>

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
              <h3 className="text-lg font-semibold text-[#392E20] mb-4">Share this article</h3>
              <div className="flex gap-4">
                <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Facebook size={18} />
                  <span>Facebook</span>
                </a>
                <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">
                  <Twitter size={18} />
                  <span>Twitter</span>
                </a>
                <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors">
                  <Linkedin size={18} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.article>

          {/* Sidebar */}
          <motion.aside className="lg:col-span-1" initial="hidden" animate="visible">
            {/* Dynamic Table of Contents */}
            {headings.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8">
                <h3 className="font-calistoga text-[#392E20] text-lg mb-4 flex items-center gap-2">
                  <BookOpen size={20} />
                  Table of Contents
                </h3>
                <ul className="space-y-2 text-sm">
                  {headings.map((heading, index) => (
                    <li key={index} className={`${heading.level === "h1" ? "font-medium" : heading.level === "h2" ? "ml-2" : heading.level === "h3" ? "ml-4" : "ml-6"}`}>
                      <a href={`#${heading.slug}`} onClick={(e) => handleTOCClick(e, heading.slug)} className="text-gray-600 hover:text-amber-600 transition-colors block py-1 hover:bg-amber-50 rounded px-2 -mx-2">
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Featured Badge */}
            {post.featured && (
              <div className="bg-gradient-to-br from-amber-600 to-amber-700 text-white rounded-2xl p-6 mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Tag size={16} />
                  </div>
                  <h3 className="font-calistoga text-lg">Featured Article</h3>
                </div>
                <p className="text-amber-100 text-sm leading-relaxed">This article has been selected by our editorial team as a featured insight into the Indonesian spice industry.</p>
              </div>
            )}
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
                <motion.article key={relatedPost._id} whileHover={{ y: -8, transition: { duration: 0.3 } }} className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <Link href={`/articles/${relatedPost.slug.current}`}>
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

      {/* Newsletter CTA */}
      <div className="bg-gray-50 py-20 px-6">
        <div className="max-w-full mx-6 md:mx-12">
          <motion.section className="bg-gradient-to-br from-[#392E20] to-[#4A3B28] rounded-3xl py-16 px-8 relative overflow-hidden" initial="hidden" animate="visible">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-amber-400 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-amber-300 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-3xl mx-auto text-center relative z-10">
              <div className="inline-block mb-6 px-4 py-2 bg-amber-600/20 border border-amber-500/30 rounded-full">
                <span className="text-amber-200 text-sm font-semibold tracking-wide">STAY INFORMED</span>
              </div>

              <h2 className="text-white text-3xl md:text-4xl font-calistoga mb-4 leading-tight">Get More Industry Insights</h2>

              <p className="text-amber-100 text-lg mb-8 max-w-2xl mx-auto">Subscribe to receive the latest articles, market analysis, and industry updates from Harika Spices experts.</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                <input type="email" placeholder="Enter your email" className="flex-1 px-6 py-3 bg-white text-[#392E20] rounded-lg font-medium placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500" />
                <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap">Subscribe</button>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
