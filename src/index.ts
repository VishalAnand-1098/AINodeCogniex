import express from "express";
import cors from "cors";
import { config } from "./config.js";
import { requireAuth } from "./middleware/auth.js";
import healthRouter from "./routes/health.js";
import authRouter from "./routes/auth.js";
import leadsRouter from "./routes/leads.js";
import newsletterRouter from "./routes/newsletter.js";
import blogRouter from "./routes/blog.js";
import caseStudiesRouter from "./routes/case-studies.js";
import analyticsRouter from "./routes/admin/analytics.js";
import adminLeadsRouter from "./routes/admin/leads.js";
import adminSubscribersRouter from "./routes/admin/subscribers.js";
import adminDemoRequestsRouter from "./routes/admin/demo-requests.js";
import adminBlogRouter from "./routes/admin/blog.js";

const app = express();

app.use(
  cors({
    origin: config.corsOrigins,
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/v1/health", healthRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/leads", leadsRouter);
app.use("/api/v1/newsletter", newsletterRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/case-studies", caseStudiesRouter);

app.use("/api/v1/admin/analytics", requireAuth, analyticsRouter);
app.use("/api/v1/admin/leads", requireAuth, adminLeadsRouter);
app.use("/api/v1/admin/subscribers", requireAuth, adminSubscribersRouter);
app.use("/api/v1/admin/demo-requests", requireAuth, adminDemoRequestsRouter);
app.use("/api/v1/admin/blog", requireAuth, adminBlogRouter);

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(config.port, () => {
  console.log(`CognexiaAI API running at http://localhost:${config.port}`);
});
