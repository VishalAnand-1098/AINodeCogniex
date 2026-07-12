import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { toAdminCaseStudy } from "../../lib/mappers.js";

const router = Router();

const caseStudySchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  industry: z.string().min(1),
  summary: z.string(),
  content: z.string(),
  featuredImage: z.string().optional().nullable(),
  roiMetric: z.string().min(1),
  roiLabel: z.string().min(1),
  beforeStat: z.string().min(1),
  beforeLabel: z.string().min(1),
  afterStat: z.string().min(1),
  afterLabel: z.string().min(1),
  publishedAt: z.string().datetime().optional(),
});

router.get("/", async (_req, res) => {
  const studies = await prisma.caseStudy.findMany({
    orderBy: { publishedAt: "desc" },
  });
  res.json(studies.map(toAdminCaseStudy));
});

router.get("/:id", async (req, res) => {
  const study = await prisma.caseStudy.findUnique({
    where: { id: req.params.id },
  });
  if (!study) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(toAdminCaseStudy(study));
});

router.post("/", async (req, res) => {
  const parsed = caseStudySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }

  const { publishedAt, ...data } = parsed.data;
  const study = await prisma.caseStudy.create({
    data: {
      ...data,
      publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
    },
  });

  res.status(201).json({ id: study.id });
});

router.put("/:id", async (req, res) => {
  const parsed = caseStudySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }

  const existing = await prisma.caseStudy.findUnique({
    where: { id: req.params.id },
  });
  if (!existing) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  const { publishedAt, ...data } = parsed.data;
  await prisma.caseStudy.update({
    where: { id: req.params.id },
    data: {
      ...data,
      publishedAt: publishedAt ? new Date(publishedAt) : existing.publishedAt,
    },
  });

  res.status(204).send();
});

router.delete("/:id", async (req, res) => {
  const existing = await prisma.caseStudy.findUnique({
    where: { id: req.params.id },
  });
  if (!existing) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  await prisma.caseStudy.delete({ where: { id: req.params.id } });
  res.status(204).send();
});

export default router;
