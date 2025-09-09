/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { type SanityDocument } from "next-sanity";
import { Calendar, ArrowRight, Tag, Clock, User, Star } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

interface BlogPostsClientProps {
  featuredPosts: SanityDocument[];
  allPosts: SanityDocument[];
}

export default function BlogPostsClient({ featuredPosts, allPosts }: BlogPostsClientProps) {
  // Get main featured post (paling terbaru dari featured posts)
  // const mainFeaturedPost = featuredPosts[0];

  // Get other featured posts untuk carousel atau grid kecil
  const otherFeaturedPosts = featuredPosts.slice(0);

  return (
    <div className="min-h-screen bg-[#392E20]">
      {/* Hero Section */}
      <section className="py-20 px-8">
        <motion.div className="max-w-4xl mx-auto text-center" initial="hidden" animate="visible" variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <h1 className="text-white text-4xl md:text-5xl font-calistoga mb-6 mt-12 leading-tight">Insights & Market Trends from Indonesia’s Spice Industry</h1>
            <p className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto">Stay updated with global spice market movements, sustainability practices, and industry knowledge. </p>
          </motion.div>
        </motion.div>
      </section>

      {otherFeaturedPosts.length > 0 && (
        <section className="bg-white py-20 font-raleway">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div className="mb-16" initial="hidden" animate="visible" variants={containerVariants}>
              <motion.div variants={itemVariants} className="text-center">
                <h2 className="text-3xl md:text-4xl font-calistoga text-gray-900 leading-snug mb-6">Featured Articles</h2>
              </motion.div>
            </motion.div>

            <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" initial="hidden" animate="visible" variants={containerVariants}>
              {otherFeaturedPosts.map((post) => (
                <motion.article
                  key={post._id}
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <Link href={`articles/${post.slug.current}`} className="block">
                    {/* Image */}
                    {post.mainImage?.asset?.url && (
                      <div className="h-48 overflow-hidden relative">
                        <Image src={post.mainImage.asset.url} alt={post.mainImage.alt || post.title} width={400} height={250} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        {/* Featured Badge */}
                        <div className="absolute top-3 right-3">
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-600 text-white text-xs font-bold rounded-full">
                            <Star size={12} fill="currentColor" />
                            Featured
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="p-6">
                      {/* Categories */}
                      {post.categories && post.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.categories.slice(0, 2).map((category: any) => (
                            <span key={category.slug.current} className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                              {category.title}
                            </span>
                          ))}
                        </div>
                      )}

                      <h3 className="text-xl font-calistoga text-gray-900 group-hover:text-amber-700 transition-colors duration-200 mb-3 leading-tight line-clamp-2">{post.title}</h3>

                      {post.excerpt && <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3 text-sm">{post.excerpt}</p>}

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Calendar size={14} />
                          <time dateTime={post.publishedAt} className="text-xs font-medium">
                            {new Date(post.publishedAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </time>
                        </div>

                        <ArrowRight size={16} className="text-amber-600 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* All Articles Section */}
      <section className="bg-[#392E20] py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div className="mb-16" initial="hidden" animate="visible" variants={containerVariants}>
            <motion.div variants={itemVariants} className="text-center">
              <h1 className="text-white font-calistoga text-3xl md:text-4xl lg:text-5xl mb-4">All Articles</h1>
              <p className="text-gray-200 text-medium md:text-lg max-w-3xl mx-auto">Stay updated with global spice market movements, sustainability practices, and industry knowledge.</p>
            </motion.div>
          </motion.div>

          {/* Articles Grid */}
          {allPosts.length > 0 ? (
            <motion.div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8" initial="hidden" animate="visible" variants={containerVariants}>
              {allPosts.map((post, index) => (
                <motion.article key={post._id} variants={itemVariants} whileHover={{ y: -8, transition: { duration: 0.3 } }} className="group bg-[#4D3D2A] rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <Link href={`articles/${post.slug.current}`} className="block">
                    {/* Image */}
                    {post.mainImage?.asset?.url && (
                      <div className="h-48 overflow-hidden relative">
                        <Image src={post.mainImage.asset.url} alt={post.mainImage.alt || post.title} width={400} height={250} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        {/* Featured Badge for featured posts */}
                        {post.featured && (
                          <div className="absolute top-3 right-3">
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-600 text-white text-xs font-bold rounded-full">
                              <Star size={12} fill="currentColor" />
                              Featured
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="p-6">
                      {/* Categories */}
                      {post.categories && post.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.categories.slice(0, 2).map((category: any) => (
                            <span key={category.slug.current} className="inline-block px-3 py-1 bg-amber-600/20 text-amber-200 text-xs font-semibold rounded-full border border-amber-500/30">
                              {category.title}
                            </span>
                          ))}
                        </div>
                      )}

                      <h3 className="text-xl font-calistoga text-white group-hover:text-amber-200 transition-colors duration-200 mb-3 leading-tight line-clamp-2">{post.title}</h3>

                      {post.excerpt && <p className="text-white/80 mb-4 leading-relaxed line-clamp-3 text-sm">{post.excerpt}</p>}

                      <div className="flex items-center justify-between pt-4 border-t border-amber-500/20">
                        <div className="flex items-center gap-2 text-amber-200/80">
                          <Calendar size={14} />
                          <time dateTime={post.publishedAt} className="text-xs font-medium">
                            {new Date(post.publishedAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </time>
                        </div>

                        <ArrowRight size={16} className="text-amber-300 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            /* Professional Empty State */
            <motion.div className="text-center py-24" initial="hidden" animate="visible" variants={itemVariants}>
              <div className="w-24 h-24 mx-auto mb-8 bg-amber-600/20 border border-amber-500/30 rounded-2xl flex items-center justify-center">
                <svg className="w-12 h-12 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-3xl font-calistoga text-white mb-4">Coming Soon</h3>
              <p className="text-amber-200 max-w-md mx-auto text-lg leading-relaxed">Our industry experts are preparing comprehensive insights and analysis. Please check back soon for the latest updates from Harika Spices.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-20 font-raleway">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-lg">
            <h3 className="text-2xl md:text-3xl font-calistoga text-gray-900 mb-4">Stay Ahead of Market Trends</h3>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
              Get exclusive insights, market analysis, and industry updates delivered directly to your inbox. Join thousands of professionals who trust Harika Spices for premium intelligence.
            </p>

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
