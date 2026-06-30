import { Router } from "express";
import { prisma } from "../../lib/prisma.js";

const router = Router();

router.get("/", async (_req, res) => {
  const demos = await prisma.demoRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  res.json(
    demos.map((d) => ({
      id: d.id,
      name: d.name,
      company: d.company,
      email: d.email,
      phone: d.phone,
      productInterest: d.productInterest,
      message: d.message,
      createdAt: d.createdAt.toISOString(),
    }))
  );
});

export default router;
