import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";

const router = Router();

const subscribeSchema = z.object({
  email: z.string().email(),
  source: z.string().optional().default("website"),
});

router.post("/subscribe", async (req, res) => {
  const parsed = subscribeSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }

  const { email, source } = parsed.data;
  const existing = await prisma.subscriber.findUnique({ where: { email } });

  if (existing) {
    if (!existing.isActive) {
      const updated = await prisma.subscriber.update({
        where: { email },
        data: { isActive: true, source },
      });
      res.status(201).json({ id: updated.id });
      return;
    }
    res.status(201).json({ id: existing.id });
    return;
  }

  const subscriber = await prisma.subscriber.create({
    data: { email, source },
  });
  res.status(201).json({ id: subscriber.id });
});

export default router;
