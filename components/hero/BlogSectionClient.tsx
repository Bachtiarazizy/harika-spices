/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Clock } from "lucide-react";
import { type SanityDocument } from "next-sanity";

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
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Updated fallback data interface to match SanityDocument structure
const fallbackBlogPosts = [
  {
    _id: "fallback-1",
    _type: "blogPost",
    title: "The Future of Indonesian Spice Trade in Global Markets",
    excerpt: "Exploring emerging trends and opportunities in the international spice industry and how Indonesian exporters are adapting to changing market demands.",
    mainImage: {
      asset: {
        url: "/blog-1.jpg",
      },
      alt: "Indonesian spice trade analysis",
    },
    categories: [{ title: "Market Analysis" }],
    publishedAt: "2024-08-15T10:00:00Z",
    readTime: "5 min read",
    slug: { current: "future-indonesian-spice-trade" },
  },
  {
    _id: "fallback-2",
    _type: "blogPost",
    title: "Sustainable Farming Practices: Our Partnership with Local Farmers",
    excerpt: "How Harika Spices works directly with Indonesian farmers to promote sustainable agriculture while maintaining premium quality standards.",
    mainImage: {
      asset: {
        url: "/blog-2.jpg",
      },
      alt: "Sustainable farming practices",
    },
    categories: [{ title: "Sustainability" }],
    publishedAt: "2024-08-12T10:00:00Z",
    readTime: "7 min read",
    slug: { current: "sustainable-farming-practices" },
  },
  {
    _id: "fallback-3",
    _type: "blogPost",
    title: "Quality Control Standards in Spice Export: What Sets Us Apart",
    excerpt: "An inside look at our comprehensive quality assurance processes and international certification standards that ensure premium product delivery.",
    mainImage: {
      asset: {
        url: "/blog-3.jpg",
      },
      alt: "Quality control standards",
    },
    categories: [{ title: "Quality Assurance" }],
    publishedAt: "2024-08-08T10:00:00Z",
    readTime: "6 min read",
    slug: { current: "quality-control-standards" },
  },
];

interface BlogCardSectionClientProps {
  posts: SanityDocument[];
  showAllLink?: boolean;
  maxPosts?: number;
  sectionTitle?: string;
  sectionSubtitle?: string;
}

export default function BlogCardSectionClient({
  posts,
  showAllLink = true,
  maxPosts = 3,
  sectionTitle = "Latest From Our Experts",
  sectionSubtitle = "Stay informed with the latest market trends, industry analysis, and expert insights from Indonesia's leading spice exporters.",
}: BlogCardSectionClientProps) {
  // Use Sanity data if available and not empty, otherwise use fallback data
  const displayPosts = posts && posts.length > 0 ? posts : fallbackBlogPosts;
  const postsToShow = displayPosts.slice(0, maxPosts);

  // Helper functions
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getFirstCategory = (post: any) => {
    if (post.categories && post.categories.length > 0) {
      return post.categories[0].title;
    }
    return "Industry News";
  };

  const getImageUrl = (post: any) => {
    if (post.mainImage?.asset?.url) {
      return post.mainImage.asset.url;
    }
    return "/blog-placeholder.jpg";
  };

  const getImageAlt = (post: any) => {
    if (post.mainImage?.alt) {
      return post.mainImage.alt;
    }
    return post.title;
  };

  const getPostSlug = (post: any) => {
    if (post.slug?.current) {
      return post.slug.current;
    }
    return post.slug || `post-${post._id}`;
  };

  const getPostId = (post: any) => {
    return post._id || `fallback-${Math.random()}`;
  };

  const getReadTime = (post: any) => {
    return post.readTime || "5 min read";
  };

  return (
    <section className="bg-gray-100 py-32 font-raleway">
      <div className="container mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <motion.div className="text-center mb-16" initial="hidden" animate="visible" variants={containerVariants}>
          <motion.div>
            <div className="inline-block mb-4"></div>
            <h2 className="text-3xl md:text-4xl text-gray-900 font-calistoga leading-snug mb-6">{sectionTitle}</h2>
            <p className="text-gray-700 hidden md:block text-lg max-w-2xl mx-auto">{sectionSubtitle}</p>
          </motion.div>
        </motion.div>

        {/* Blog Cards Grid */}
        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12" initial="hidden" animate="visible" variants={containerVariants}>
          {postsToShow.map((post, index) => (
            <motion.article key={getPostId(post)} whileHover={{ y: -8, transition: { duration: 0.3 } }} className="group bg-[#4D3D2A] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
              <Link href={`/articles/${getPostSlug(post)}`}>
                {/* Image */}
                <div className="h-48 overflow-hidden">
                  <Image src={getImageUrl(post)} alt={getImageAlt(post)} width={400} height={250} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>

                <div className="p-6">
                  {/* Category */}
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-amber-600/20 text-amber-200 text-xs font-semibold rounded-full border border-amber-500/30">{getFirstCategory(post)}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-calistoga text-white group-hover:text-amber-200 transition-colors duration-300 mb-3 leading-tight line-clamp-2">{post.title}</h3>

                  {/* Excerpt */}
                  <p className="text-white/80 mb-4 leading-relaxed line-clamp-3 text-sm">{post.excerpt || "Discover insights about the Indonesian spice industry and global market trends."}</p>

                  {/* Meta */}
                  <div className="flex items-center justify-between pt-4 border-t border-amber-500/20">
                    <div className="flex items-center gap-4 text-amber-200/80">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <time dateTime={post.publishedAt} className="text-xs font-medium">
                          {formatDate(post.publishedAt)}
                        </time>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span className="text-xs font-medium">{getReadTime(post)}</span>
                      </div>
                    </div>

                    <ArrowRight size={16} className="text-amber-300 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        {/* View All Button */}
        {showAllLink && (
          <motion.div className="text-center" initial="hidden" animate="visible">
            <Link href="/articles" className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300 group">
              <span>View All Articles</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
