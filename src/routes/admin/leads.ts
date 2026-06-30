import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";

const router = Router();

router.get("/", async (_req, res) => {
  const leads = await prisma.contactLead.findMany({
    orderBy: { createdAt: "desc" },
  });

  res.json(
    leads.map((lead) => ({
      id: lead.id,
      name: lead.name,
      company: lead.company,
      email: lead.email,
      phone: lead.phone,
      country: lead.country,
      companySize: lead.companySize,
      message: lead.message,
      source: lead.source,
      status: lead.status,
      createdAt: lead.createdAt.toISOString(),
    }))
  );
});

const statusSchema = z.object({
  status: z.enum(["New", "Contacted", "Qualified", "Closed"]),
});

router.patch("/:id/status", async (req, res) => {
  const parsed = statusSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid status" });
    return;
  }

  const existing = await prisma.contactLead.findUnique({
    where: { id: req.params.id },
  });
  if (!existing) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  await prisma.contactLead.update({
    where: { id: req.params.id },
    data: { status: parsed.data.status },
  });

  res.status(204).send();
});

export default router;
