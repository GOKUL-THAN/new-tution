# Global Minds Academy

A complete, responsive, secure, and mobile-first education and examination-preparation platform for Indian students — built with Next.js 14 App Router, Prisma 5, PostgreSQL, and Tailwind CSS.

## Overview

Global Minds Academy brings school tuition, entrance preparation (JEE/NEET), curriculum resources, practice tests, live learning, student analytics, parent communication, and academy management into one coherent platform. Initial focus: Tamil Nadu, India. Target boards: CBSE, ICSE, ISC, TN State Board (Samacheer Kalvi), TN Matriculation.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS 3 |
| ORM | Prisma 5 |
| Database | PostgreSQL |
| Auth | bcryptjs + jsonwebtoken (httpOnly cookie) |
| Forms | react-hook-form + @hookform/resolvers + zod |
| Charts | recharts |
| Icons | lucide-react |

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment file
cp .env.example .env.local
# Then edit .env.local and fill in DATABASE_URL, JWT_SECRET, etc.

# 3. Push the database schema
npx prisma db push

# 4. Seed the database with demo data
npm run db:seed

# 5. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Demo Credentials (after seeding)

| Role | Email | Password |
|---|---|---|
| Student | student@demo.com | Demo@1234 |
| Teacher | teacher@demo.com | Demo@1234 |
| Admin | admin@demo.com | Demo@1234 |

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint check |
| `npm run db:generate` | Regenerate Prisma client |
| `npm run db:push` | Push schema to database (dev) |
| `npm run db:migrate` | Run migrations |
| `npm run db:seed` | Seed demo data |
| `npm run db:studio` | Open Prisma Studio |

## Features Summary

- **Public site**: Home page, course catalogue, exam prep info, contact/enquiry form
- **Student portal**: Dashboard, enrolled courses, tests, assignments, progress tracking, doubt support, bookmarks, notifications, profile
- **Teacher portal**: Dashboard, course management, student lists, assignment grading, live sessions
- **Parent portal**: Child progress monitoring, notifications, communication
- **Admin portal**: User management, course management, enquiry CRM, content management, analytics
- **Question bank**: MCQ, numerical, multi-select, match, assertion-reason question types
- **Exam catalogue**: JEE Main, JEE Advanced, NEET UG, BITSAT, CUET and more

## Directory Structure

```
src/
  app/              # Next.js App Router pages + API routes
  components/       # React components
    layout/         # Navbar, Footer
    home/           # Landing page sections
    ui/             # Shared UI primitives
    dashboard/      # Dashboard sidebar
    courses/        # Course cards & filters
    forms/          # Reusable forms
  lib/              # Shared utilities (auth, db, validations)
  context/          # React context (AuthContext)
  hooks/            # Custom hooks (useAuth)
prisma/
  schema.prisma     # Database schema
  seed.ts           # Seed script
docs/               # Project documentation
public/             # Static assets
```

## Environment Variables

See [docs/ENVIRONMENT_VARIABLES.md](docs/ENVIRONMENT_VARIABLES.md) for the full list.

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Feature Status](docs/FEATURE_STATUS.md)
- [Route Inventory](docs/ROUTE_INVENTORY.md)
- [Database Design](docs/DATABASE_DESIGN.md)
- [Security](docs/SECURITY.md)
- [Deployment](docs/DEPLOYMENT.md)
- [Environment Variables](docs/ENVIRONMENT_VARIABLES.md)
- [Content Licensing](docs/CONTENT_LICENSING.md)
- [Test Plan](docs/TEST_PLAN.md)

## License

Proprietary — Global Minds Academy. All rights reserved.
