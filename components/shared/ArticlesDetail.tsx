// File: components/shared/ArticlesDetail.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { type SanityDocument } from "next-sanity";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { PortableText } from "@portabletext/react";

interface ArticleDetailProps {
  post: SanityDocument;
  relatedPosts?: SanityDocument[];
}

export default function ArticleDetail({ post, relatedPosts = [] }: ArticleDetailProps) {
  const readingTime = 5; // Simple fixed reading time

  return (
    <div className="min-h-screen bg-white">
      {/* Article Header */}
      <header className="bg-[#392E20] py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <nav className="mb-6">
            <Link href="/articles" className="text-gray-300 hover:text-white text-sm flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to Articles
            </Link>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">{post.title}</h1>

          {post.excerpt && <p className="text-lg text-gray-200 mb-8">{post.excerpt}</p>}

          <div className="flex flex-wrap items-center gap-6 text-gray-300">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span className="text-sm">{new Date(post.publishedAt).toLocaleDateString()}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span className="text-sm">{readingTime} min read</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Featured Image */}
        {post.mainImage?.asset?.url && (
          <div className="mb-12 rounded-lg overflow-hidden">
            <Image src={post.mainImage.asset.url} alt={post.mainImage.alt || post.title} width={800} height={400} className="w-full h-auto" />
          </div>
        )}

        {/* Article Body */}
        <article className="prose prose-lg max-w-none">{post.body && <PortableText value={post.body} />}</article>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string, index: number) => (
                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost: SanityDocument) => (
                <article key={relatedPost._id} className="bg-white rounded-lg shadow-sm p-6">
                  <Link href={`/articles/${relatedPost.slug?.current}`}>
                    {relatedPost.mainImage?.asset?.url && <Image src={relatedPost.mainImage.asset.url} alt={relatedPost.mainImage.alt || relatedPost.title} width={300} height={200} className="w-full h-40 object-cover rounded-lg mb-4" />}

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{relatedPost.title}</h3>

                    {relatedPost.excerpt && <p className="text-gray-600 text-sm mb-4">{relatedPost.excerpt}</p>}

                    <div className="flex items-center justify-between">
                      <time className="text-xs text-gray-500">{new Date(relatedPost.publishedAt).toLocaleDateString()}</time>
                      <ArrowRight size={16} className="text-[#392E20]" />
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
