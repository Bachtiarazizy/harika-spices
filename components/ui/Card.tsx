// components/ui/Card.tsx
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  title: string;
  excerpt?: string;
  image?: string;
  imageAlt?: string;
  href?: string;
  category?: string;
  date?: string;
  author?: string;
  featured?: boolean;
  tags?: string[];
  className?: string;
  variant?: "article" | "product" | "service";
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Card: React.FC<CardProps> = ({ title, excerpt, image, imageAlt, href, category, date, author, featured = false, tags = [], className = "", variant = "article" }) => {
  const cardContent = (
    <motion.div
      className={`
        bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300
        ${featured ? "ring-2 ring-amber-400 ring-opacity-50" : ""}
        ${className}
      `}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Image Section */}
      {image && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image src={image} alt={imageAlt || title} fill className="object-cover transition-transform duration-300 hover:scale-105" />
          {featured && (
            <div className="absolute top-4 left-4">
              <span className="bg-amber-400 text-amber-900 px-3 py-1 rounded-full text-xs font-semibold">Featured</span>
            </div>
          )}
          {category && (
            <div className="absolute top-4 right-4">
              <span className="bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-xs font-medium">{category}</span>
            </div>
          )}
        </div>
      )}

      {/* Content Section */}
      <div className="p-6">
        {/* Header Info */}
        <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
          {date && (
            <span className="flex items-center gap-1">
              {new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          )}
          {author && <span className="flex items-center gap-1">By {author}</span>}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight hover:text-amber-600 transition-colors">{title}</h3>

        {/* Excerpt */}
        {excerpt && <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs font-medium">
                {tag}
              </span>
            ))}
            {tags.length > 3 && <span className="text-gray-400 text-xs">+{tags.length - 3} more</span>}
          </div>
        )}

        {/* Read More */}
        <div className="flex items-center justify-between">
          <span className="text-amber-600 font-medium text-sm hover:text-amber-700 transition-colors">Read More →</span>
          <div className="flex items-center text-gray-400 text-sm">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            5 min read
          </div>
        </div>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

export default Card;
