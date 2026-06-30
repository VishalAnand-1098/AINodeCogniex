import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { toPublicBlogPost } from "../lib/mappers.js";

const router = Router();
const PAGE_SIZE = 10;

router.get("/", async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const category = req.query.category as string | undefined;
  const tag = req.query.tag as string | undefined;
  const search = req.query.search as string | undefined;

  const where = {
    status: "Published",
    ...(category ? { categories: { has: category } } : {}),
    ...(tag ? { tags: { has: tag } } : {}),
    ...(search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" as const } },
            { excerpt: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.blogPost.count({ where }),
  ]);

  res.json({
    items: posts.map(toPublicBlogPost),
    total,
  });
});

router.get("/:slug", async (req, res) => {
  const post = await prisma.blogPost.findFirst({
    where: { slug: req.params.slug, status: "Published" },
  });

  if (!post) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  res.json(toPublicBlogPost(post));
});

export default router;
