# CognexiaAI Backend (Node.js)

REST API for the CognexiaAI marketing site and admin panel. Built with **Express**, **TypeScript**, **Prisma**, and **PostgreSQL**.

Compatible with the existing Next.js frontend (`CognexiaAIFE`) — same `/api/v1/*` endpoints as the original ASP.NET backend.

## Stack

- Node.js + Express 5
- TypeScript
- Prisma ORM + PostgreSQL
- JWT authentication + bcrypt
- Zod validation

## Quick start

```powershell
cd CognexiaAIBackendNode
npm install
copy .env.example .env
npm run db:setup
npm run dev
```

| Resource | URL |
|----------|-----|
| API | http://localhost:5172 |
| Health | http://localhost:5172/api/v1/health |

**Default admin login** (seeded):

- Email: `admin@cognexiaai.com`
- Password: `Admin@123`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Compile TypeScript |
| `npm start` | Run compiled production build |
| `npm run db:push` | Push Prisma schema to database |
| `npm run db:seed` | Seed admin user, blog posts, case studies |
| `npm run db:setup` | Push schema + seed (first-time setup) |
| `npm run db:migrate` | Create/apply Prisma migrations |

## Environment variables

Copy `.env.example` to `.env`:

| Variable | Description |
|----------|-------------|
| `PORT` | API port (default `5172`) |
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | JWT signing secret (min 32 chars) |
| `JWT_ISSUER` | JWT issuer claim |
| `JWT_AUDIENCE` | JWT audience claim |
| `CORS_ORIGINS` | Comma-separated allowed origins |

## API endpoints

### Public

- `POST /api/v1/leads/contact` — Contact form
- `POST /api/v1/leads/demo` — Demo request
- `POST /api/v1/newsletter/subscribe` — Newsletter signup
- `GET /api/v1/blog` — Blog list (pagination, filters)
- `GET /api/v1/blog/:slug` — Blog post
- `GET /api/v1/case-studies` — Case studies
- `GET /api/v1/case-studies/:slug` — Case study detail
- `GET /api/v1/health` — Health check

### Auth

- `POST /api/v1/auth/login` — Admin login → `{ accessToken }`

### Admin (Bearer JWT)

- `GET /api/v1/admin/analytics/dashboard`
- `GET /api/v1/admin/leads`
- `PATCH /api/v1/admin/leads/:id/status`
- `GET /api/v1/admin/subscribers`
- `GET /api/v1/admin/demo-requests`
- `GET|POST|PUT|DELETE /api/v1/admin/blog`

## Frontend connection

Set in `CognexiaAIFE/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5172
```

Then run the frontend: `npm run dev` in `CognexiaAIFE/`.
