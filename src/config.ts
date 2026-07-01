import "dotenv/config";

export const config = {
  port: Number(process.env.PORT ?? 5172),
  databaseUrl: process.env.DATABASE_URL ?? "",
  jwt: {
    secret: process.env.JWT_SECRET ?? "CognexiaAI-Super-Secret-Key-Min32Chars!!",
    issuer: process.env.JWT_ISSUER ?? "CognexiaAI",
    audience: process.env.JWT_AUDIENCE ?? "CognexiaAI.Web",
    expiresIn: "8h",
  },
  corsOrigins: (process.env.CORS_ORIGINS ?? "http://localhost:3000,http://localhost:3001")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean),
};

const LOCALHOST_ORIGIN = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

export function isAllowedCorsOrigin(origin: string | undefined): boolean {
  if (!origin) return true;
  if (config.corsOrigins.includes(origin)) return true;
  return LOCALHOST_ORIGIN.test(origin);
}
