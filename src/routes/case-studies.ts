import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { toCaseStudy } from "../lib/mappers.js";

const router = Router();

router.get("/", async (req, res) => {
  const industry = req.query.industry as string | undefined;

  const studies = await prisma.caseStudy.findMany({
    where: industry ? { industry } : undefined,
    orderBy: { publishedAt: "desc" },
  });

  res.json(studies.map(toCaseStudy));
});

router.get("/:slug", async (req, res) => {
  const study = await prisma.caseStudy.findUnique({
    where: { slug: req.params.slug },
  });

  if (!study) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  res.json(toCaseStudy(study));
});

export default router;
