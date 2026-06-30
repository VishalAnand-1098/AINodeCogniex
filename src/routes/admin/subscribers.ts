import { Router } from "express";
import { prisma } from "../../lib/prisma.js";

const router = Router();

router.get("/", async (_req, res) => {
  const subscribers = await prisma.subscriber.findMany({
    orderBy: { createdAt: "desc" },
  });

  res.json(
    subscribers.map((s) => ({
      id: s.id,
      email: s.email,
      source: s.source,
      isActive: s.isActive,
      createdAt: s.createdAt.toISOString(),
    }))
  );
});

export default router;
