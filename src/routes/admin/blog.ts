import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { toAdminBlogPost } from "../../lib/mappers.js";

const router = Router();

const blogSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string(),
  content: z.string(),
  authorName: z.string().min(1),
  status: z.enum(["Draft", "Published"]),
  categories: z.array(z.string()).optional().default([]),
  tags: z.array(z.string()).optional().default([]),
  featuredImage: z.string().optional().nullable(),
  metaTitle: z.string().optional().nullable(),
  metaDescription: z.string().optional().nullable(),
});

router.get("/", async (_req, res) => {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(posts.map(toAdminBlogPost));
});

router.get("/:id", async (req, res) => {
  const post = await prisma.blogPost.findUnique({
    where: { id: req.params.id },
  });
  if (!post) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(toAdminBlogPost(post));
});

router.post("/", async (req, res) => {
  const parsed = blogSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }

  const { status, ...data } = parsed.data;
  const post = await prisma.blogPost.create({
    data: {
      ...data,
      status,
      publishedAt: status === "Published" ? new Date() : null,
    },
  });

  res.status(201).json({ id: post.id });
});

router.put("/:id", async (req, res) => {
  const parsed = blogSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }

  const existing = await prisma.blogPost.findUnique({
    where: { id: req.params.id },
  });
  if (!existing) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  const { status, ...data } = parsed.data;
  const publishedAt =
    status === "Published"
      ? existing.publishedAt ?? new Date()
      : null;

  await prisma.blogPost.update({
    where: { id: req.params.id },
    data: { ...data, status, publishedAt },
  });

  res.status(204).send();
});

router.delete("/:id", async (req, res) => {
  const existing = await prisma.blogPost.findUnique({
    where: { id: req.params.id },
  });
  if (!existing) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  await prisma.blogPost.delete({ where: { id: req.params.id } });
  res.status(204).send();
});

export default router;
