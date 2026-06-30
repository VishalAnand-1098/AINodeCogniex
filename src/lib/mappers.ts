import type { BlogPost, CaseStudy } from "@prisma/client";

export function toPublicBlogPost(post: BlogPost) {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    featuredImage: post.featuredImage ?? undefined,
    author: post.authorName,
    publishedAt: post.publishedAt?.toISOString() ?? post.createdAt.toISOString(),
    categories: post.categories,
    tags: post.tags,
    metaTitle: post.metaTitle ?? undefined,
    metaDescription: post.metaDescription ?? undefined,
  };
}

export function toAdminBlogPost(post: BlogPost) {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    authorName: post.authorName,
    status: post.status,
    publishedAt: post.publishedAt?.toISOString() ?? null,
    createdAt: post.createdAt.toISOString(),
  };
}

export function toCaseStudy(study: CaseStudy) {
  return {
    id: study.id,
    title: study.title,
    slug: study.slug,
    industry: study.industry,
    summary: study.summary,
    content: study.content,
    featuredImage: study.featuredImage ?? undefined,
    roiMetric: study.roiMetric,
    roiLabel: study.roiLabel,
    beforeStat: study.beforeStat,
    beforeLabel: study.beforeLabel,
    afterStat: study.afterStat,
    afterLabel: study.afterLabel,
    publishedAt: study.publishedAt.toISOString(),
  };
}
