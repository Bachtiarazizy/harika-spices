/* eslint-disable @typescript-eslint/no-unused-vars */
// File: app/articles/[slug]/page.tsx

import { type SanityDocument } from "next-sanity";
import { client, urlForImage } from "@/sanity/client";
import { notFound } from "next/navigation";
import ArticleDetail from "@/components/shared/ArticlesDetail";
import { Metadata, ResolvingMetadata } from "next";

const ARTICLE_QUERY = `*[_type == "blogPost" && slug.current == $slug][0]{
_id,
title,
slug,
publishedAt,
excerpt,
body,
mainImage{asset->{
_id,
url
},
alt,
caption
},
author->{
_id,
name,
bio,
image{
asset->
{url}}},
categories[]->{
_id,
title,
slug
},
tags,
language,
featured,
seo{
title,
description,
keywords}}`;

const RELATED_ARTICLES_QUERY = `*[_type == "blogPost" && slug.current != $slug && defined(slug.current) && count(categories[@._ref in $categoryIds]) > 0]|order(publishedAt desc)[0...3]{_id,title,slug,publishedAt,excerpt,mainImage{asset->{_id,url},alt},categories[]->{title,slug}}`;

const options = { next: { revalidate: 30 } };

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const post = await client.fetch<SanityDocument>(ARTICLE_QUERY, { slug: params.slug }, options);

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.mainImage ? [urlForImage(post.mainImage)?.url() || ""] : [],
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author?.name || "Anonymous"],
    },
    keywords: post.category?.title ? [post.category.title] : [],
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const post = await client.fetch<SanityDocument>(ARTICLE_QUERY, { slug: params.slug }, options);

  if (!post) {
    notFound();
  }

  const relatedPosts = (await client.fetch<SanityDocument[]>(RELATED_ARTICLES_QUERY, { slug: params.slug }, options)) || [];

  return <ArticleDetail post={post} relatedPosts={relatedPosts} />;
}
