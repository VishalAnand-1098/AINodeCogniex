import { Router } from "express";
import { prisma } from "../../lib/prisma.js";

const router = Router();

router.get("/dashboard", async (_req, res) => {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const [totalLeads, leadsThisWeek, totalSubscribers, publishedPosts, publishedCaseStudies] =
    await Promise.all([
      prisma.contactLead.count(),
      prisma.contactLead.count({ where: { createdAt: { gte: weekAgo } } }),
      prisma.subscriber.count({ where: { isActive: true } }),
      prisma.blogPost.count({ where: { status: "Published" } }),
      prisma.caseStudy.count(),
    ]);

  res.json({
    totalLeads,
    leadsThisWeek,
    totalSubscribers,
    publishedPosts,
    publishedCaseStudies,
  });
});

export default router;
