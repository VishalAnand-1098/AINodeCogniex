import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";

const router = Router();

const contactSchema = z.object({
  name: z.string().min(1),
  company: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional().default(""),
  country: z.string().optional().default(""),
  companySize: z.string().optional().default(""),
  message: z.string().optional().default(""),
  source: z.string().optional().default("contact-form"),
});

const demoSchema = z.object({
  name: z.string().min(1),
  company: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  productInterest: z.string().optional(),
  message: z.string().optional(),
});

router.post("/contact", async (req, res) => {
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }

  const lead = await prisma.contactLead.create({ data: parsed.data });
  res.status(201).json({ id: lead.id });
});

router.post("/demo", async (req, res) => {
  const parsed = demoSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }

  const demo = await prisma.demoRequest.create({ data: parsed.data });
  res.status(201).json({ id: demo.id });
});

export default router;
