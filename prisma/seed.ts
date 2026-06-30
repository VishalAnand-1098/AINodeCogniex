import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const blogPosts = [
  {
    title: "How Enterprise AI Cuts Operational Costs by 31%",
    slug: "enterprise-ai-operational-costs",
    excerpt:
      "Discover how organizations are using CognexiaAI to consolidate tools and reduce manual work across departments.",
    content: `<p>Enterprise AI is no longer experimental — it's a proven lever for operational efficiency. Organizations deploying CognexiaAI across finance, HR and operations report a median 31% reduction in manual work within the first year.</p><p>The key is consolidation: replacing five disconnected systems with one AI-native platform that shares a single data model.</p><h2>Three drivers of savings</h2><p>First, automation of repetitive tasks like data entry, reconciliation and report generation. Second, faster decision-making through real-time dashboards. Third, reduced IT overhead from managing fewer integrations.</p>`,
    authorName: "Priya Sharma",
    publishedAt: new Date("2026-05-15T10:00:00Z"),
    categories: ["Enterprise AI"],
    tags: ["ROI", "Automation", "Operations"],
    featuredImage: "https://picsum.photos/seed/blog1/800/450",
    status: "Published",
  },
  {
    title: "Legal AI: Contract Review in Minutes, Not Days",
    slug: "legal-ai-contract-review",
    excerpt:
      "Learn how legal teams are using AI to redline contracts, flag risks and never miss a renewal deadline.",
    content: `<p>Legal teams spend up to 60% of their time on contract review and research. CognexiaAI Legal AI changes that equation dramatically.</p><p>By grounding AI in your playbook and matter history, contract review that took days now takes minutes — with higher accuracy and full audit trails.</p>`,
    authorName: "Lena Fischer",
    publishedAt: new Date("2026-05-01T10:00:00Z"),
    categories: ["Legal AI"],
    tags: ["Legal", "Contract Review", "Compliance"],
    featuredImage: "https://picsum.photos/seed/blog2/800/450",
    status: "Published",
  },
  {
    title: "The 9-Day Migration: A Case Study in Speed",
    slug: "nine-day-migration-case-study",
    excerpt:
      "Arccom replaced three legacy systems in nine days. Here's how they did it with CognexiaAI.",
    content: `<p>When Arccom's COO David Okoye decided to consolidate ERP, CRM and finance onto one platform, industry advisors predicted a 9-month timeline.</p><p>With CognexiaAI's dedicated migration team and automated data mapping, they went live in 9 days — with zero downtime and full rollback capability.</p>`,
    authorName: "David Okoye",
    publishedAt: new Date("2026-04-20T10:00:00Z"),
    categories: ["Case Studies"],
    tags: ["Migration", "ERP", "Customer Story"],
    featuredImage: "https://picsum.photos/seed/blog3/800/450",
    status: "Published",
  },
  {
    title: "Healthcare AI and the Future of Clinical Documentation",
    slug: "healthcare-ai-clinical-documentation",
    excerpt: "How AI-powered documentation is giving clinicians 4+ hours back per week.",
    content: `<p>Clinical documentation is the top burnout driver for healthcare professionals. AI that generates draft notes from encounters — with physician review — is changing the game.</p><p>Meridian Health deployed CognexiaAI Healthcare AI across 12 facilities and saw documentation time drop 50% within 90 days.</p>`,
    authorName: "Dr. Sarah Kim",
    publishedAt: new Date("2026-04-10T10:00:00Z"),
    categories: ["Healthcare AI"],
    tags: ["Healthcare", "Documentation", "Clinical"],
    featuredImage: "https://picsum.photos/seed/blog4/800/450",
    status: "Published",
  },
  {
    title: "Building an AI-First Finance Function",
    slug: "ai-first-finance-function",
    excerpt:
      "From 12-day close to 7-day close: how AI forecasting and auto-reconciliation transform finance.",
    content: `<p>Modern finance teams need real-time visibility, not month-old spreadsheets. AI-powered auto-reconciliation and forecasting make that possible.</p><p>Learn the playbook Meridian used to cut their close cycle nearly in half.</p>`,
    authorName: "Aisha Rahman",
    publishedAt: new Date("2026-03-28T10:00:00Z"),
    categories: ["Finance"],
    tags: ["Finance", "Forecasting", "Close Process"],
    featuredImage: "https://picsum.photos/seed/blog5/800/450",
    status: "Published",
  },
  {
    title: "SOC 2 Type II: What It Means for Your AI Vendor",
    slug: "soc2-type-ii-ai-vendor",
    excerpt: "Why security certifications matter when choosing an enterprise AI platform.",
    content: `<p>When procurement teams evaluate AI vendors, security isn't optional — it's the gate. SOC 2 Type II certification demonstrates that security controls are not just designed but operating effectively over time.</p><p>CognexiaAI maintains SOC 2 Type II, ISO 27001 and GDPR compliance with annual third-party audits.</p>`,
    authorName: "Marcus Chen",
    publishedAt: new Date("2026-03-15T10:00:00Z"),
    categories: ["Security"],
    tags: ["Security", "Compliance", "Enterprise"],
    featuredImage: "https://picsum.photos/seed/blog6/800/450",
    status: "Published",
  },
];

const caseStudies = [
  {
    title: "Meridian consolidates finance, CRM and operations",
    slug: "meridian-consolidation",
    industry: "Financial services",
    summary: "Replaced three legacy systems with CognexiaAI in 9 days, saving $2.4M annually.",
    content: `<p>Meridian, a mid-market financial services firm, was running finance on QuickBooks, sales on Salesforce, and operations on a custom ERP — none of which talked to each other.</p><p>After deploying CognexiaAI, they consolidated onto one platform with a single source of truth. Month-end close dropped from 12 days to 7, and the CFO finally trusts the numbers.</p>`,
    featuredImage: "https://picsum.photos/seed/cs-meridian/800/450",
    roiMetric: "$2.4M",
    roiLabel: "Annual savings",
    beforeStat: "12 days",
    beforeLabel: "Month-end close",
    afterStat: "7 days",
    afterLabel: "Month-end close",
    publishedAt: new Date("2026-04-01T10:00:00Z"),
  },
  {
    title: "Veltrix legal team reviews contracts 80% faster",
    slug: "veltrix-legal-ai",
    industry: "Legal",
    summary: "General Counsel Lena Fischer's team cut contract review time dramatically with Legal AI.",
    content: `<p>Veltrix's legal team processed 400+ contracts per quarter, with each review taking 2-4 hours of associate time.</p><p>With CognexiaAI Legal AI, reviews now take 20-30 minutes with higher accuracy and automated renewal tracking.</p>`,
    featuredImage: "https://picsum.photos/seed/cs-veltrix/800/450",
    roiMetric: "80%",
    roiLabel: "Faster review",
    beforeStat: "4 hrs",
    beforeLabel: "Avg review time",
    afterStat: "45 min",
    afterLabel: "Avg review time",
    publishedAt: new Date("2026-03-15T10:00:00Z"),
  },
  {
    title: "Arccom migrates ERP in 9 days, not 9 months",
    slug: "arccom-erp-migration",
    industry: "Manufacturing",
    summary: "COO David Okoye led a record-speed migration from legacy ERP to CognexiaAI.",
    content: `<p>Arccom's manufacturing operations depended on a 15-year-old ERP that couldn't support their growth. Traditional migration estimates ranged from 6-12 months.</p><p>CognexiaAI's migration team delivered a full cutover in 9 days with parallel running and instant rollback capability.</p>`,
    featuredImage: "https://picsum.photos/seed/cs-arccom/800/450",
    roiMetric: "9 days",
    roiLabel: "Migration time",
    beforeStat: "9 months",
    beforeLabel: "Estimated timeline",
    afterStat: "9 days",
    afterLabel: "Actual timeline",
    publishedAt: new Date("2026-02-20T10:00:00Z"),
  },
  {
    title: "Meridian Health reduces documentation time 50%",
    slug: "meridian-health-documentation",
    industry: "Healthcare",
    summary: "Clinical documentation AI gives nurses 4+ hours back per week.",
    content: `<p>Meridian Health deployed CognexiaAI Healthcare AI across 12 facilities to address clinician burnout driven by documentation burden.</p><p>Within 90 days, documentation time dropped 50% and nurse satisfaction scores improved 22 points.</p>`,
    featuredImage: "https://picsum.photos/seed/cs-health/800/450",
    roiMetric: "50%",
    roiLabel: "Less documentation",
    beforeStat: "8 hrs",
    beforeLabel: "Weekly charting",
    afterStat: "4 hrs",
    afterLabel: "Weekly charting",
    publishedAt: new Date("2026-01-30T10:00:00Z"),
  },
  {
    title: "Solvay University doubles student engagement",
    slug: "solvay-education-ai",
    industry: "Education",
    summary: "Adaptive learning paths powered by Education AI transform student outcomes.",
    content: `<p>Solvay University piloted CognexiaAI Education AI in their business school, serving 2,000 students across 40 courses.</p><p>Student engagement doubled, test scores improved 35%, and professors reclaimed 60% of grading time.</p>`,
    featuredImage: "https://picsum.photos/seed/cs-education/800/450",
    roiMetric: "2x",
    roiLabel: "Engagement",
    beforeStat: "42%",
    beforeLabel: "Course completion",
    afterStat: "78%",
    afterLabel: "Course completion",
    publishedAt: new Date("2026-01-15T10:00:00Z"),
  },
  {
    title: "Kestrel HR onboarding in 2 days, not 2 weeks",
    slug: "kestrel-hrms-onboarding",
    industry: "Retail",
    summary: "Automated onboarding and self-service HR portal transform employee experience.",
    content: `<p>Kestrel, a retail chain with 5,000 employees, struggled with a 2-week onboarding process that left new hires feeling lost.</p><p>With CognexiaAI HRMS, onboarding now completes in 2 days with automated workflows and a mobile self-service portal.</p>`,
    featuredImage: "https://picsum.photos/seed/cs-kestrel/800/450",
    roiMetric: "3x",
    roiLabel: "Faster onboarding",
    beforeStat: "14 days",
    beforeLabel: "Onboarding time",
    afterStat: "2 days",
    afterLabel: "Onboarding time",
    publishedAt: new Date("2025-12-10T10:00:00Z"),
  },
];

async function main() {
  const passwordHash = await bcrypt.hash("Admin@123", 10);

  await prisma.user.upsert({
    where: { email: "admin@cognexiaai.com" },
    update: {},
    create: {
      email: "admin@cognexiaai.com",
      passwordHash,
      role: "Admin",
    },
  });

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }

  for (const study of caseStudies) {
    await prisma.caseStudy.upsert({
      where: { slug: study.slug },
      update: study,
      create: study,
    });
  }

  console.log("Seed complete: admin user, blog posts, and case studies.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
