# Deployment — Global Minds Academy

## Prerequisites

Before deploying, ensure:

1. All environment variables are set (see [ENVIRONMENT_VARIABLES.md](ENVIRONMENT_VARIABLES.md)).
2. A PostgreSQL database is provisioned and accessible from the deployment environment.
3. `npm run build` completes without errors locally.
4. `npx tsc --noEmit` passes with zero errors.

## Environment Variable Checklist

| Variable | Required | Notes |
|---|---|---|
| `DATABASE_URL` | ✅ Required | PostgreSQL connection string |
| `JWT_SECRET` | ✅ Required | Min 32 characters, random |
| `NEXTAUTH_URL` | ✅ Required | Full public URL, e.g. `https://globalmindsacademy.com` |
| `JWT_EXPIRY` | Optional | Default `7d` |
| `BCRYPT_ROUNDS` | Optional | Default `12` |
| `NEXT_PUBLIC_APP_URL` | Optional | Same as NEXTAUTH_URL, used in client code |

See [ENVIRONMENT_VARIABLES.md](ENVIRONMENT_VARIABLES.md) for the complete list including optional service integrations.

## Database Setup

```bash
# 1. Push schema (dev / first deploy)
npx prisma db push

# 2. OR run migrations (recommended for production)
npx prisma migrate deploy

# 3. Seed demo data (development only — do NOT run in production)
npm run db:seed
```

## Build Steps

```bash
# Install dependencies
npm ci

# Generate Prisma client
npx prisma generate

# Type-check
npx tsc --noEmit

# Build Next.js
npm run build
```

## Start

```bash
npm run start
# or with PM2:
pm2 start "npm run start" --name global-minds-academy
```

## Health Check

The application exposes a health check endpoint:

```
GET /api/health
```

Response:
```json
{
  "status": "ok",
  "db": "connected",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

Configure your load balancer or uptime monitor to poll this endpoint.

## Vercel Deployment (Recommended)

1. Connect the repository to Vercel.
2. Set environment variables in the Vercel project settings.
3. Vercel automatically runs `npm run build` on each push.
4. Run `npx prisma migrate deploy` in Vercel's build command or as a post-deploy hook.

Example `vercel.json`:
```json
{
  "buildCommand": "npx prisma generate && npm run build",
  "outputDirectory": ".next"
}
```

## Railway / Render Deployment

1. Add a PostgreSQL service to your Railway/Render project.
2. Copy the `DATABASE_URL` from the database service into your app's environment variables.
3. Set the build command: `npx prisma generate && npx prisma migrate deploy && npm run build`
4. Set the start command: `npm run start`

## Pre-Production Checklist

- [ ] `DATABASE_URL` points to production PostgreSQL (not a dev/seed database)
- [ ] `JWT_SECRET` is a secure random string (min 32 chars) — not the dev default
- [ ] `NEXTAUTH_URL` matches the production domain (HTTPS)
- [ ] `Content-Security-Policy-Report-Only` is converted to `Content-Security-Policy` and hardened
- [ ] `Permissions-Policy` is reviewed and tightened
- [ ] npm audit has no critical or high vulnerabilities unaddressed
- [ ] Rate limiting is in place on auth and public API endpoints
- [ ] Email service (SMTP/SES) is configured for transactional emails
- [ ] File storage (S3/Cloudinary) is configured if file uploads are used
- [ ] Error monitoring (Sentry or similar) is integrated
- [ ] Backups are scheduled for the PostgreSQL database
- [ ] `.env.local` is NOT committed to version control
- [ ] Demo seed data is NOT present in the production database
