# Global Minds Academy

> **Complete, responsive, secure, and mobile-first education and examination-preparation platform for Indian students.**  
> Built with **Next.js 14 · Prisma 5 · PostgreSQL · TypeScript**.  
> Uses a **PostgreSQL database server** — not a cloud-managed database, not a SQLite substitute.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [Prerequisites](#3-prerequisites)
4. [Step 1 — Install PostgreSQL Database Server](#4-step-1--install-postgresql-database-server)
5. [Step 2 — Create the Database](#5-step-2--create-the-database)
6. [Step 3 — Clone and Install the Application](#6-step-3--clone-and-install-the-application)
7. [Step 4 — Configure Environment Variables](#7-step-4--configure-environment-variables)
8. [Step 5 — Apply the Database Schema](#8-step-5--apply-the-database-schema)
9. [Step 6 — Seed Demo Data](#9-step-6--seed-demo-data)
10. [Step 7 — Start the Application](#10-step-7--start-the-application)
11. [Step 8 — Bootstrap the First Administrator](#11-step-8--bootstrap-the-first-administrator)
12. [Demo Credentials](#12-demo-credentials)
13. [Available Scripts](#13-available-scripts)
14. [Project Structure](#14-project-structure)
15. [Feature Overview](#15-feature-overview)
16. [Complete Route Inventory](#16-complete-route-inventory)
17. [User Roles and Access Control](#17-user-roles-and-access-control)
18. [API Reference](#18-api-reference)
19. [Authentication System](#19-authentication-system)
20. [Database Model Summary](#20-database-model-summary)
21. [Curriculum and Content System](#21-curriculum-and-content-system)
22. [Assessment Engine](#22-assessment-engine)
23. [Entrance Examination Centre](#23-entrance-examination-centre)
24. [Analytics and Personalised Learning](#24-analytics-and-personalised-learning)
25. [Payments and Fees](#25-payments-and-fees)
26. [Notifications and Communication](#26-notifications-and-communication)
27. [Child Safety and Privacy](#27-child-safety-and-privacy)
28. [Accessibility](#28-accessibility)
29. [PWA and Offline Experience](#29-pwa-and-offline-experience)
30. [SEO and Discoverability](#30-seo-and-discoverability)
31. [Performance](#31-performance)
32. [Security](#32-security)
33. [Testing](#33-testing)
34. [Building for Production](#34-building-for-production)
35. [Production Deployment](#35-production-deployment)
36. [CI/CD Pipeline](#36-cicd-pipeline)
37. [Database Backup and Recovery](#37-database-backup-and-recovery)
38. [Production Readiness Checklist](#38-production-readiness-checklist)
39. [Troubleshooting](#39-troubleshooting)
40. [Known Limitations and Blockers](#40-known-limitations-and-blockers)
41. [Documentation Index](#41-documentation-index)
42. [License](#42-license)

---

## 1. Project Overview

**Global Minds Academy** is a full-stack, mobile-first education platform built for Indian students. It covers school tuition for Classes 1–12, competitive entrance exam preparation (JEE / NEET), live classes, practice tests, student analytics, parent communication, and complete academy administration — all in one coherent platform.

### Primary Market

India — initial focus on Tamil Nadu.

### Target Users

| User | Role on platform |
|---|---|
| Students (Classes 1–12) | Enrol in courses, take tests, track progress, submit assignments |
| JEE / NEET Aspirants | Practice tests, mock exams, syllabus checklists, study planning |
| Parents / Guardians | Monitor children's attendance, progress, and test results |
| Teachers / Mentors | Manage courses, assignments, question banks, live sessions, doubt support |
| Academic Administrators | Curriculum management, batch management, enrolment, reporting |
| Finance Administrators | Fees, payments, refunds, coupons, orders |
| Super Administrators | Full platform management — all of the above plus settings, audit logs |

### Supported School Boards

| Board | Description |
|---|---|
| **CBSE** | Central Board of Secondary Education |
| **ICSE** | Indian Certificate of Secondary Education |
| **ISC** | Indian School Certificate |
| **TN State Board** | Tamil Nadu State Board / Samacheer Kalvi |
| **TN Matriculation** | Tamil Nadu Matriculation Board |
| Additional boards | Configurable by administrators — no code changes required |

### Supported Entrance Examinations

**Engineering:** JEE Main (Paper 1 · 2A · 2B), JEE Advanced, BITSAT, VITEEE, SRMJEEE, MET, COMEDK UGET  
**Medical:** NEET UG  
**University / Professional:** CUET UG, NATA, CLAT, NIFT, NCHM JEE, NDA, IISER IAT, NEST  
**Olympiads and Scholarships:** configurable catalogue

### Brand Principles

- Academically credible and trustworthy
- Modern, welcoming, and student-friendly
- Premium design that remains accessible to younger learners
- Serious and distraction-free for competitive exam preparation
- Accessible — targets WCAG 2.2 AA
- Mobile-first — designed for phones first, then tablets and desktops

---

## 2. Technology Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js — App Router | 14.x |
| Language | TypeScript — strict mode | 5.x |
| Styling | Tailwind CSS | 3.x |
| ORM | Prisma | 5.x |
| **Database** | **PostgreSQL** | **14 or 15 recommended** |
| Authentication | bcryptjs + jsonwebtoken (httpOnly cookie sessions) | — |
| Validation | zod | 3.x |
| Forms | react-hook-form + @hookform/resolvers | — |
| Charts | recharts | — |
| Icons | lucide-react | — |
| Runtime | Node.js LTS | 18.x or 20.x |
| Process manager (production) | PM2 | latest stable |

> **Database:** This project uses a PostgreSQL database server. It does **not** use a cloud-managed database service (AWS RDS, Google Cloud SQL, Supabase, PlanetScale, Neon, or similar). It does **not** use SQLite as a substitute. All data is stored in a PostgreSQL server that you install, configure, and control.

---

## 3. Prerequisites

Before following the setup steps, ensure the following are installed on your machine or server.

| Requirement | Version | Download |
|---|---|---|
| Node.js LTS | 18.x or 20.x | https://nodejs.org |
| npm | 9.x or 10.x (bundled with Node.js) | — |
| PostgreSQL | 14 or 15 | https://www.postgresql.org/download |
| Git | Any recent version | https://git-scm.com |

**Verify installations:**

```bash
node --version      # v18.x.x or v20.x.x
npm --version       # 9.x or 10.x
psql --version      # psql (PostgreSQL) 14.x or 15.x
git --version       # git version 2.x.x
```

---

## 4. Step 1 — Install PostgreSQL Database Server

This application requires a running PostgreSQL server. Follow the instructions for your operating system.

### Windows

1. Download the **EDB PostgreSQL installer** from:  
   https://www.postgresql.org/download/windows/

2. Run the installer. During setup:
   - Choose **PostgreSQL Server** and **pgAdmin 4** components
   - Set a strong password for the `postgres` superuser — **write it down securely**
   - Keep the default port **5432**
   - Keep the default locale

3. After installation, open **Services** (press `Win + R`, type `services.msc`) and confirm that `postgresql-x64-15` (or `x64-14`) shows **Running**. Set it to **Automatic** start.

4. Verify the server is running:
   ```powershell
   psql -U postgres -c "SELECT version();"
   ```
   You should see the PostgreSQL version string printed.

### Ubuntu / Debian Linux

```bash
# Install PostgreSQL
sudo apt update
sudo apt install -y postgresql postgresql-contrib

# Start and enable the service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Verify
sudo -u postgres psql -c "SELECT version();"
```

### CentOS / RHEL / Fedora

```bash
# Install PostgreSQL 15 repository
sudo dnf install -y https://download.postgresql.org/pub/repos/yum/reporpms/EL-9-x86_64/pgdg-redhat-repo-latest.noarch.rpm
sudo dnf install -y postgresql15-server

# Initialise and start
sudo /usr/pgsql-15/bin/postgresql-15-setup initdb
sudo systemctl start postgresql-15
sudo systemctl enable postgresql-15
```

---

## 5. Step 2 — Create the Database

After the PostgreSQL server is running, create a dedicated database and user for the application.

### Open the PostgreSQL prompt

```bash
# Windows — open psql from Start Menu, or:
psql -U postgres

# Linux
sudo -u postgres psql
```

### Run these commands inside psql

```sql
-- Create a dedicated application user
-- Replace 'choose_strong_password' with a real strong password
CREATE USER gma_user WITH PASSWORD 'choose_strong_password';

-- Create the application database
CREATE DATABASE global_minds_academy OWNER gma_user;

-- Grant all privileges on the database to the application user
GRANT ALL PRIVILEGES ON DATABASE global_minds_academy TO gma_user;

-- Exit psql
\q
```

> For development, using the `postgres` superuser with `DATABASE_URL` is also acceptable. For any production or shared environment, always use a dedicated user with the minimum required privileges.

### Verify the database was created

```bash
psql -U gma_user -d global_minds_academy -c "\conninfo"
```

Expected output: `You are connected to database "global_minds_academy" as user "gma_user"...`

---

## 6. Step 3 — Clone and Install the Application

```bash
# Navigate to your project directory
# Windows example:
cd "d:\new tution website"

# Linux / macOS example:
# cd /var/www/global-minds-academy

# Install all Node.js dependencies
npm install
```

> If you see peer dependency warnings from `@hookform/resolvers`, run:
> ```bash
> npm install --legacy-peer-deps
> ```
> This is safe. It resolves a known version constraint between packages.

---

## 7. Step 4 — Configure Environment Variables

The application reads all sensitive configuration from an environment file that **must never be committed to Git**.

### Create the environment file

```bash
# Windows
copy .env.example .env.local

# Linux / macOS
cp .env.example .env.local
```

### Open `.env.local` and fill in every value

#### Required — Database

```env
# PostgreSQL connection string
# Format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
#
# If PostgreSQL is on the same machine as the application:
DATABASE_URL="postgresql://gma_user:choose_strong_password@127.0.0.1:5432/global_minds_academy?schema=public"
#
# If PostgreSQL is on a separate database server (recommended for production):
# DATABASE_URL="postgresql://gma_user:choose_strong_password@192.168.1.50:5432/global_minds_academy?schema=public"
#                                                              ^^^^^^^^^^^^
#                                                              Replace with your DB server IP or hostname
```

#### Required — Authentication

```env
# JWT secret — minimum 32 characters, must be random and unpredictable
#
# Generate on Windows PowerShell:
#   -join ((65..90)+(97..122)+(48..57) | Get-Random -Count 48 | % {[char]$_})
#
# Generate on Linux:
#   openssl rand -base64 48
#
JWT_SECRET="replace-this-with-a-long-random-secret-minimum-32-characters"
JWT_EXPIRY="7d"
BCRYPT_ROUNDS="12"
```

#### Required — Application URL

```env
# The public URL where the application is served
# Development (running on the same machine as your browser):
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Production (your actual domain):
# NEXT_PUBLIC_APP_URL="https://globalmindsacademy.com"

NEXT_PUBLIC_APP_NAME="Global Minds Academy"
```

#### Optional — Email / SMTP

```env
# Required for: account verification emails, password reset emails.
# Without this, tokens are stored in the database and must be applied manually (development only).
#
# SMTP_HOST="mail.yourdomain.com"
# SMTP_PORT="587"
# SMTP_USER="noreply@globalmindsacademy.com"
# SMTP_PASS="your-smtp-password"
# SMTP_FROM="noreply@globalmindsacademy.com"
```

#### Optional — Payments (Razorpay)

```env
# Required for: course fee collection, order management.
# Register at https://razorpay.com — use Test keys during development.
#
# RAZORPAY_KEY_ID=""
# RAZORPAY_KEY_SECRET=""
# RAZORPAY_WEBHOOK_SECRET=""
```

#### Optional — File Storage (S3-compatible)

```env
# Required for: lesson file attachments, assignment uploads, resource files.
# Works with any S3-compatible server (MinIO, Wasabi, BackBlaze B2, etc.).
#
# S3_BUCKET=""
# S3_REGION=""
# S3_ACCESS_KEY=""
# S3_SECRET_KEY=""
# S3_ENDPOINT=""
```

#### Optional — AI Tutoring

```env
# Required for: AI-assisted explanations and hint generation.
# Without this, the AI module shows "unavailable" — the rest of the platform works normally.
#
# OPENAI_API_KEY=""
# AI_PROVIDER="openai"
```

#### Optional — Error Monitoring

```env
# SENTRY_DSN=""
```

> **Security rule:** Never commit `.env.local` to Git. The `.gitignore` already excludes it. Never share this file.

---

## 8. Step 5 — Apply the Database Schema

The application's database schema is defined in `prisma/schema.prisma` (50+ tables). This step creates all tables in your PostgreSQL database.

### Development — use db push

`db push` applies the schema directly without creating migration files. Use this during development.

```bash
cd "d:\new tution website"
npx prisma db push
```

Expected output:
```
✔ Generated Prisma Client
Your database is now in sync with your Prisma schema.
```

### Production — use migrate deploy

For any production or staging environment, always use versioned migrations instead of `db push`. Migrations create an auditable history of every schema change.

```bash
# Create a migration file from the current schema (run once, on development machine)
npx prisma migrate dev --name initial_schema

# Apply all pending migrations on the production server (safe, never rewrites history)
npx prisma migrate deploy
```

> Always take a database backup (see §37) before running `migrate deploy` on a production database.

### Generate the Prisma Client

```bash
npx prisma generate
```

This regenerates the TypeScript database client from the schema. It also runs automatically via the `postinstall` hook in `package.json` when you run `npm install`.

---

## 9. Step 6 — Seed Demo Data

The seed script populates the database with structured demo data for development and testing.

```bash
npm run db:seed
```

### What gets created

| Category | Details |
|---|---|
| **Boards** | CBSE, ICSE, ISC, Tamil Nadu State Board, Tamil Nadu Matriculation |
| **Classes** | Class  6 through Class 12 |
| **Subjects** | 15+ subjects: Mathematics, Physics, Chemistry, Biology, English, Tamil, Hindi, Computer Science, Social Science, History, Geography, Economics, Accountancy, Business Studies, Statistics |
| **Mappings** | Board–class and board–subject join records |
| **Demo users** | 3 accounts — student, teacher, admin (see §12) |
| **Sample courses** | 4 courses: 2 published, 2 in draft |
| **Exam catalogue** | JEE Main, JEE Advanced, NEET UG, BITSAT, VITEEE |
| **Sample enquiries** | 3 enquiries in different CRM statuses |
| **Sample questions** | Questions in the question bank |
| **Chapters** | Sample chapters for key subjects |

> The seed script is **idempotent** — it uses `upsert` operations throughout. Running it multiple times does not create duplicate data. It is safe to re-run after schema changes.

### Verify the data

Open the visual database browser:

```bash
npm run db:studio
```

This opens **Prisma Studio** at `http://localhost:5555` — a GUI where you can inspect every table and row in your PostgreSQL database without writing SQL.

---

## 10. Step 7 — Start the Application

### Development server

```bash
npm run dev
```

The application starts at `http://localhost:3000`.

Open your browser and visit:
- **Homepage:** `http://localhost:3000`
- **Student login:** `http://localhost:3000/login`
- **Admin panel:** `http://localhost:3000/admin` (after logging in as admin)
- **Database browser:** `http://localhost:5555` (after running `npm run db:studio`)

> If the database server is not reachable when the application starts, pages show meaningful empty states rather than crashing. Check that PostgreSQL is running and that `DATABASE_URL` in `.env.local` is correct.

### Production server

```bash
npm run build   # Compile and optimise for production
npm run start   # Start the production server
```

For production, use **PM2** to manage the process (see §35).

---

## 11. Step 8 — Bootstrap the First Administrator

Administrator accounts cannot be created through the public registration page — this prevents privilege escalation by any visitor.

After setup, promote an account to `SUPER_ADMIN` using one of these methods:

### Option A — Use the demo admin account (development only)

After running `npm run db:seed`, the account `admin@demo.com` / `Demo@1234` has `SUPER_ADMIN` role and is ready to log in.

> Remove this account before going to production.

### Option B — Prisma Studio (development / staging)

1. Run `npm run db:studio` and open `http://localhost:5555`
2. Click the **User** table
3. Find the account you registered at `/register`
4. Edit the row:
   - Set `role` → `SUPER_ADMIN`
   - Set `status` → `ACTIVE`
   - Set `emailVerified` → `true`
5. Click **Save**

### Option C — psql command (any environment)

```sql
-- Connect to your database
psql -U gma_user -d global_minds_academy

-- Promote a registered user to Super Admin
UPDATE "User"
SET
  role           = 'SUPER_ADMIN',
  status         = 'ACTIVE',
  "emailVerified" = true
WHERE email = 'your-admin-email@yourdomain.com';

-- Confirm the change
SELECT email, role, status FROM "User" WHERE email = 'your-admin-email@yourdomain.com';

\q
```

> After bootstrapping: log in immediately, change the password, and remove any demo accounts before making the platform accessible to real users.

---

## 12. Demo Credentials

Available after running `npm run db:seed` (Step 6):

| Role | Email | Password | Redirects to |
|---|---|---|---|
| Student | `student@demo.com` | `Demo@1234` | `/student/dashboard` |
| Teacher | `teacher@demo.com` | `Demo@1234` | `/teacher/dashboard` |
| Super Admin | `admin@demo.com` | `Demo@1234` | `/admin` |

> These accounts exist **only for development**. Delete or change their passwords before any production deployment.

---

## 13. Available Scripts

```bash
# ── Development ────────────────────────────────────────────────────────────
npm run dev              # Start development server at http://localhost:3000

# ── Production ─────────────────────────────────────────────────────────────
npm run build            # TypeScript compile + Next.js production build
npm run start            # Start production server (run build first)

# ── Code Quality ───────────────────────────────────────────────────────────
npm run lint             # ESLint — check code for issues
npx tsc --noEmit         # TypeScript type-check — no files written

# ── Database ───────────────────────────────────────────────────────────────
npm run db:generate      # Regenerate Prisma Client after schema changes
npm run db:push          # Sync schema to database without migration files (development)
npm run db:migrate       # Create a new migration file from schema changes
npm run db:seed          # Seed demo data into the database (idempotent)
npm run db:studio        # Open Prisma Studio visual browser at http://localhost:5555
```

---

## 14. Project Structure

```
d:\new tution website\
│
├── prisma/
│   ├── schema.prisma               # Complete database schema — 50+ models
│   └── seed.ts                     # Idempotent seed script for demo data
│
├── src/
│   ├── app/                        # Next.js App Router pages and API routes
│   │
│   │   ├── page.tsx                # Homepage
│   │   ├── layout.tsx              # Root layout — metadata, fonts, providers
│   │   ├── globals.css             # Tailwind base + design system
│   │   ├── sitemap.ts              # Auto-generated XML sitemap
│   │   ├── robots.ts               # Auto-generated robots.txt
│   │   ├── not-found.tsx           # 404 error page
│   │   │
│   │   ├── ── Public pages ──
│   │   ├── about/
│   │   ├── contact/
│   │   ├── courses/
│   │   │   └── [slug]/
│   │   ├── boards/
│   │   │   └── [boardSlug]/
│   │   ├── classes/
│   │   │   └── [classSlug]/
│   │   ├── subjects/
│   │   │   └── [subjectSlug]/
│   │   ├── jee/
│   │   ├── jee-main/
│   │   ├── jee-advanced/
│   │   ├── neet/
│   │   ├── entrance-exams/
│   │   │   └── [examSlug]/
│   │   ├── school-tuition/
│   │   ├── online-learning/
│   │   ├── offline-classes/
│   │   ├── free-resources/
│   │   │   └── [slug]/
│   │   ├── teachers/
│   │   │   └── [slug]/
│   │   ├── olympiads/
│   │   ├── scholarships/
│   │   ├── admissions/
│   │   ├── study-planner/
│   │   ├── diagnostic-test/
│   │   ├── faq/
│   │   ├── privacy/
│   │   ├── terms/
│   │   ├── refund-policy/
│   │   ├── cookie-policy/
│   │   ├── accessibility/
│   │   ├── content-licensing/
│   │   │
│   │   ├── ── Auth pages ──
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   ├── reset-password/
│   │   ├── verify-email/
│   │   ├── account/
│   │   │
│   │   ├── ── Student portal (/student/*) ──
│   │   ├── student/
│   │   │   ├── layout.tsx          # Sidebar + top bar — auth guard
│   │   │   ├── dashboard/
│   │   │   ├── my-courses/
│   │   │   ├── learning-path/
│   │   │   ├── lessons/
│   │   │   ├── assignments/
│   │   │   ├── tests/
│   │   │   │   └── [id]/take/
│   │   │   ├── results/
│   │   │   │   └── [id]/
│   │   │   ├── progress/
│   │   │   ├── attendance/
│   │   │   ├── timetable/
│   │   │   ├── study-planner/
│   │   │   ├── bookmarks/
│   │   │   ├── doubt-support/
│   │   │   ├── notifications/
│   │   │   ├── profile/
│   │   │   └── settings/
│   │   │
│   │   ├── ── Teacher portal (/teacher/*) ──
│   │   ├── teacher/
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/
│   │   │   ├── classes/
│   │   │   ├── students/
│   │   │   ├── courses/
│   │   │   ├── lessons/
│   │   │   ├── assignments/
│   │   │   ├── question-bank/
│   │   │   ├── tests/
│   │   │   ├── results/
│   │   │   ├── attendance/
│   │   │   ├── live-classes/
│   │   │   ├── doubt-management/
│   │   │   ├── messages/
│   │   │   └── profile/
│   │   │
│   │   ├── ── Parent portal (/parent/*) ──
│   │   ├── parent/
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/
│   │   │   ├── children/
│   │   │   ├── progress/
│   │   │   ├── attendance/
│   │   │   ├── assignments/
│   │   │   ├── test-results/
│   │   │   ├── fees/
│   │   │   ├── messages/
│   │   │   ├── notifications/
│   │   │   └── settings/
│   │   │
│   │   ├── ── Admin portal (/admin/*) ──
│   │   ├── admin/
│   │   │   ├── layout.tsx          # Auth guard — SUPER_ADMIN and privileged roles
│   │   │   ├── page.tsx            # Dashboard — live database stats
│   │   │   ├── users/
│   │   │   ├── students/
│   │   │   ├── parents/
│   │   │   ├── teachers/
│   │   │   ├── roles/
│   │   │   ├── boards/
│   │   │   ├── classes/
│   │   │   ├── subjects/
│   │   │   ├── curriculum/
│   │   │   ├── courses/
│   │   │   ├── batches/
│   │   │   ├── enrolments/
│   │   │   ├── lessons/
│   │   │   ├── content/
│   │   │   ├── question-bank/
│   │   │   ├── exams/
│   │   │   ├── tests/
│   │   │   ├── results/
│   │   │   ├── attendance/
│   │   │   ├── assignments/
│   │   │   ├── timetable/
│   │   │   ├── fees/
│   │   │   ├── payments/
│   │   │   ├── refunds/
│   │   │   ├── coupons/
│   │   │   ├── announcements/
│   │   │   ├── notifications/
│   │   │   ├── enquiries/
│   │   │   ├── exam-calendar/
│   │   │   ├── institutions/
│   │   │   ├── reports/
│   │   │   ├── audit-logs/
│   │   │   ├── settings/
│   │   │   ├── integrations/
│   │   │   ├── backup/
│   │   │   └── health/
│   │   │
│   │   └── api/                    # REST API routes
│   │       ├── auth/               # login, register, me, logout,
│   │       │                       # forgot-password, reset-password, verify-email
│   │       ├── boards/
│   │       ├── classes/
│   │       ├── subjects/
│   │       ├── courses/ [slug]/
│   │       ├── exams/ [slug]/
│   │       ├── enquiries/
│   │       ├── resources/
│   │       ├── teachers/
│   │       ├── tests/ [id]/ attempt/ submit/
│   │       ├── attempts/ [id]/
│   │       ├── question-bank/
│   │       ├── student/            # profile, progress, study-planner, notifications
│   │       ├── admin/              # stats, users, enquiries, courses
│   │       ├── health/
│   │       └── ready/
│   │
│   ├── components/
│   │   ├── layout/                 # Navbar, Footer
│   │   ├── home/                   # 10 homepage section components
│   │   ├── ui/                     # Shared primitives:
│   │   │                           #   LoadingSpinner, EmptyState, ErrorMessage,
│   │   │                           #   Pagination, Modal, Toast, Badge, Table,
│   │   │                           #   StatsCard, SkeletonCard
│   │   ├── dashboard/              # Sidebar, MobileLogoutButton, MarkAllReadButton
│   │   ├── courses/                # CourseCard, CourseFilters
│   │   ├── forms/                  # EnquiryForm
│   │   └── providers/              # Providers.tsx (AuthContext wrapper)
│   │
│   ├── lib/
│   │   ├── auth.ts                 # hashPassword, verifyPassword, JWT, getCurrentUser, requireAuth
│   │   ├── db.ts                   # Prisma client singleton
│   │   └── validations.ts          # Zod schemas for all API inputs
│   │
│   ├── context/
│   │   └── AuthContext.tsx         # React auth context
│   │
│   └── hooks/
│       └── useAuth.ts              # useAuth() hook
│
├── docs/                           # Project documentation
│   ├── ARCHITECTURE.md
│   ├── FEATURE_STATUS.md
│   ├── ROUTE_INVENTORY.md
│   ├── DATABASE_DESIGN.md
│   ├── SECURITY.md
│   ├── DEPLOYMENT.md
│   ├── ENVIRONMENT_VARIABLES.md
│   ├── CONTENT_LICENSING.md
│   ├── TEST_PLAN.md
│   └── REFERENCE_ANALYSIS.md
│
├── public/
│   ├── manifest.json               # PWA web app manifest
│   ├── sw.js                       # Service worker — offline fallback
│   └── offline.html                # Offline fallback page
│
├── next.config.js                  # Next.js config + security headers
├── tailwind.config.js              # Design tokens and custom utilities
├── tsconfig.json                   # TypeScript strict configuration
├── .env.example                    # Environment variable template (safe to commit)
├── .gitignore                      # Excludes .env.local, node_modules, .next
└── package.json                    # Scripts and dependencies
```

---

## 15. Feature Overview

### Public Website

- Responsive, accessible homepage: hero section, board cards, class grid, exam prep, course catalogue, FAQ, CTA
- Board pages: CBSE, ICSE, ISC, TN State Board, TN Matriculation — with subjects and course listings
- Class pages: Classes 1–12 with subject and course listings
- Subject pages: course listings, relevant resources
- Course catalogue with filters: board, class, subject, difficulty, language
- Course detail pages: modules, lessons, instructor, enrolment button
- Entrance exam information: JEE Main, JEE Advanced, NEET UG, BITSAT, VITEEE, CUET, and more
- School tuition, online learning, offline classes programme pages
- Free resources library: notes, formula sheets, worksheets, video links
- Faculty listing page with teacher profiles
- Olympiad and scholarship information pages
- Admissions and college discovery information
- Study planner invitation and diagnostic test page
- Full FAQ with categories and accordion
- Legal pages: Privacy Policy, Terms of Service, Refund Policy, Cookie Policy, Content Licensing, Accessibility Statement
- SEO: per-page metadata, Open Graph, JSON-LD structured data, XML sitemap, robots.txt
- PWA: installable app, service worker, offline fallback page

### Authentication

- Student, Parent, Teacher registration with role selection
- Login with automatic role-based dashboard redirect
- Email verification token stored in database; email delivery requires SMTP configuration
- Forgot password / reset password using single-use, expiring database tokens
- Secure httpOnly JWT cookie sessions — no localStorage
- Route protection via Next.js middleware and server-side layout guards
- Rate-limiting patterns on auth endpoints

### Student Portal

| Page | Function |
|---|---|
| Dashboard | Enrolled courses, test stats, quick actions |
| My Courses | Enrolled courses with module and lesson progress bars |
| Lessons | Video, text, and resource-based lesson viewer |
| Assignments | View assignments, submit responses, view grades and feedback |
| Tests | List published tests; start or resume attempts |
| Test Taking | Countdown timer, question navigator, autosave, mark for review, auto-submit |
| Results | Test history with scores; detailed per-attempt review |
| Progress | Score-over-time chart and subject-wise accuracy chart |
| Attendance | Daily attendance records |
| Timetable | Class schedule |
| Study Planner | Personal weekly study grid, persisted to database |
| Bookmarks | Saved lessons, questions, resources |
| Doubt Support | Submit questions, track replies, mark resolved |
| Notifications | Read / unread in-app notifications |
| Profile | Edit name, phone, bio, academic details |

### Teacher Portal

| Page | Function |
|---|---|
| Dashboard | Courses taught, assignment count, open doubt alert |
| My Classes | Courses with enrolled student counts |
| Students | Student roster with board and class information |
| Courses | Manage assigned courses |
| Lessons | Create and edit lesson content |
| Assignments | Create, publish, view submissions, grade |
| Question Bank | Add, categorise, edit questions by subject, chapter, difficulty |
| Tests | Create tests from question bank; configure duration, sections, marks |
| Results | Class-level and individual student performance |
| Attendance | Mark daily attendance — present, absent, late, excused |
| Live Classes | Schedule live sessions, add meeting links |
| Doubt Management | View and respond to student doubt tickets |
| Profile | Qualifications, specialisations, subjects, display settings |

### Parent Portal

| Page | Function |
|---|---|
| Dashboard | Linked children overview |
| Children | View and manage linked children |
| Progress | Course completion and test averages per child |
| Attendance | Daily attendance and percentage per child |
| Assignments | Submission status per child |
| Test Results | Test scores and history per child |
| Fees | Fee status and payment history |
| Messages | Communication with academy staff |
| Notifications | Relevant alerts and updates |

### Admin Portal

| Page | Function |
|---|---|
| Dashboard | Live database-backed stats: users, courses, enrolments, enquiries, revenue |
| User Management | Search, filter by role/status, suspend, activate, change roles |
| Curriculum | Boards, classes, subjects, chapters, topics — full tree management |
| Course Management | Create, edit, publish, archive courses; batch and enrolment management |
| Content Management | Lessons, resources, question bank, content approvals workflow |
| Assessment Management | Tests, results, analytics by class and subject |
| Enquiry CRM | Receive, assign, track, and close enquiries from students and parents |
| Finance | Orders, payments, refunds, coupons, fee structures |
| Notifications | Send announcements to selected user groups |
| Exam Calendar | Entrance exam notices, deadlines, and status |
| Institutions | College and university directory with verified data |
| Reports | Exportable academic and administrative reports |
| Audit Logs | Actor, action, entity, timestamp for all privileged operations |
| Settings | Site configuration, integration management |
| System Health | Database connectivity and service status |

### Assessment Engine

- Question bank: 9 question types — see §22
- Configurable tests: sections, shuffle, negative marking, availability windows, result release timing
- Test-taking interface: countdown timer, navigator, autosave every 30 seconds, mark for review, auto-submit
- Server-side scoring — correct answers never sent to the browser during a test
- Detailed result review: question-by-question with explanations, time analysis, accuracy breakdown

---

## 16. Complete Route Inventory

### Public Routes

| Route | Description |
|---|---|
| `/` | Homepage |
| `/about` | About the academy |
| `/contact` | Contact and enquiry form |
| `/courses` | Course catalogue |
| `/courses/[slug]` | Course detail page |
| `/boards` | All supported boards |
| `/boards/[boardSlug]` | Board-specific page |
| `/classes` | Classes 1–12 |
| `/classes/[classSlug]` | Class-specific page |
| `/subjects` | Subject listing |
| `/subjects/[subjectSlug]` | Subject detail page |
| `/curriculum` | Curriculum overview |
| `/school-tuition` | School tuition programme |
| `/online-learning` | Online learning information |
| `/offline-classes` | Offline / in-person classes |
| `/jee` | JEE preparation overview |
| `/jee-main` | JEE Main specific page |
| `/jee-advanced` | JEE Advanced specific page |
| `/neet` | NEET UG preparation |
| `/entrance-exams` | Entrance exam catalogue |
| `/entrance-exams/[examSlug]` | Exam detail page |
| `/olympiads` | Olympiad information |
| `/scholarships` | Scholarship information |
| `/free-resources` | Free study resources |
| `/resources/[slug]` | Individual resource page |
| `/teachers` | Faculty listing |
| `/teachers/[slug]` | Teacher profile |
| `/study-planner` | Public study planner page |
| `/diagnostic-test` | Diagnostic test invitation |
| `/admissions` | Admissions information |
| `/faq` | Frequently asked questions |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |
| `/refund-policy` | Refund policy |
| `/cookie-policy` | Cookie policy |
| `/accessibility` | Accessibility statement |
| `/content-licensing` | Content licensing policy |
| `/sitemap.xml` | Auto-generated sitemap |
| `/robots.txt` | Auto-generated robots rules |

### Auth Routes

| Route | Description |
|---|---|
| `/login` | Sign in |
| `/register` | Create account — Student, Parent, or Teacher |
| `/forgot-password` | Request password reset email |
| `/reset-password` | Set new password using reset token |
| `/verify-email` | Verify email address using token |
| `/account` | Account overview |

### Student Portal — `/student/*` (auth required, STUDENT role)

| Route | Description |
|---|---|
| `/student/dashboard` | Overview — courses, tests, quick actions |
| `/student/my-courses` | Enrolled courses with progress |
| `/student/learning-path` | Personalised learning path |
| `/student/lessons` | Lesson viewer |
| `/student/assignments` | Assignments list and submission |
| `/student/tests` | Available tests |
| `/student/tests/[id]/take` | Test-taking interface |
| `/student/results` | Test result history |
| `/student/results/[id]` | Detailed result review |
| `/student/progress` | Progress charts |
| `/student/attendance` | Attendance records |
| `/student/timetable` | Class timetable |
| `/student/study-planner` | Weekly study planner |
| `/student/bookmarks` | Saved items |
| `/student/doubt-support` | Submit and track doubt tickets |
| `/student/notifications` | In-app notifications |
| `/student/profile` | Edit profile |
| `/student/settings` | Notification preferences |

### Teacher Portal — `/teacher/*` (auth required, TEACHER / MENTOR role)

| Route | Description |
|---|---|
| `/teacher/dashboard` | Overview |
| `/teacher/classes` | Classes taught |
| `/teacher/students` | Student roster |
| `/teacher/courses` | Courses managed |
| `/teacher/lessons` | Lesson management |
| `/teacher/assignments` | Assignment management |
| `/teacher/question-bank` | Question bank |
| `/teacher/tests` | Test management |
| `/teacher/results` | Class results |
| `/teacher/attendance` | Mark attendance |
| `/teacher/live-classes` | Schedule live sessions |
| `/teacher/doubt-management` | Student doubt queue |
| `/teacher/messages` | Messages |
| `/teacher/profile` | Profile settings |

### Parent Portal — `/parent/*` (auth required, PARENT role)

| Route | Description |
|---|---|
| `/parent/dashboard` | Children overview |
| `/parent/children` | Linked children |
| `/parent/progress` | Child progress |
| `/parent/attendance` | Child attendance |
| `/parent/assignments` | Child assignments |
| `/parent/test-results` | Child test results |
| `/parent/fees` | Fee status |
| `/parent/messages` | Messages |
| `/parent/notifications` | Notifications |
| `/parent/settings` | Preferences |

### Admin Portal — `/admin/*` (SUPER_ADMIN · ACADEMIC_ADMIN · FINANCE_ADMIN · CONTENT_EDITOR)

| Route | Description |
|---|---|
| `/admin` | Dashboard — live platform stats |
| `/admin/users` | All users with role and status |
| `/admin/students` | Student management |
| `/admin/parents` | Parent management |
| `/admin/teachers` | Teacher management |
| `/admin/roles` | Role assignment |
| `/admin/boards` | Board management |
| `/admin/classes` | Class management |
| `/admin/subjects` | Subject management |
| `/admin/curriculum` | Curriculum tree |
| `/admin/courses` | Course management |
| `/admin/batches` | Batch management |
| `/admin/enrolments` | Enrolment management |
| `/admin/lessons` | Lesson management |
| `/admin/content` | Content publishing workflow |
| `/admin/question-bank` | Question bank management |
| `/admin/exams` | Exam catalogue management |
| `/admin/tests` | Test management |
| `/admin/results` | Results overview |
| `/admin/attendance` | Attendance reports |
| `/admin/assignments` | Assignment management |
| `/admin/timetable` | Timetable management |
| `/admin/fees` | Fee structures |
| `/admin/payments` | Payment records |
| `/admin/refunds` | Refund management |
| `/admin/coupons` | Coupon management |
| `/admin/announcements` | Announcements |
| `/admin/notifications` | Send notifications to user groups |
| `/admin/enquiries` | Enquiry CRM |
| `/admin/exam-calendar` | Exam deadlines and notices |
| `/admin/institutions` | College / university directory |
| `/admin/reports` | Reports and exports |
| `/admin/audit-logs` | Audit trail |
| `/admin/settings` | Site configuration |
| `/admin/integrations` | Integration management |
| `/admin/backup` | Backup management |
| `/admin/health` | System health |

---

## 17. User Roles and Access Control

| Role | Portal | Key Permissions |
|---|---|---|
| `STUDENT` | `/student/*` | Enrol in courses, take tests, submit assignments, view own data only |
| `PARENT` | `/parent/*` | View linked children only — cannot access any other student's data |
| `TEACHER` | `/teacher/*` | Manage own courses, assignments, tests, mark attendance |
| `MENTOR` | `/teacher/*` | Answer doubts, guide students — read-only on courses |
| `CONTENT_EDITOR` | `/admin/*` | Manage content, resources, question bank — no financial or user management |
| `ACADEMIC_ADMIN` | `/admin/*` | All academic management, user management — no financial operations |
| `FINANCE_ADMIN` | `/admin/*` | Orders, payments, refunds — no curriculum editing |
| `SUPER_ADMIN` | `/admin/*` | Full platform access — all operations |

### How enforcement works

**Three layers — all three must pass:**

1. **Middleware** (`src/middleware.ts`) — checks for a valid auth cookie on every request to `/student/*`, `/teacher/*`, `/parent/*`, `/admin/*`. Unauthenticated requests are redirected to `/login` before any page code runs.

2. **Layout guards** — each portal layout calls `getCurrentUser()` from `src/lib/auth.ts` and checks the user's role. If the role is insufficient, the layout redirects to `/login`.

3. **API route guards** — every protected API endpoint calls `requireAuth(allowedRoles[])`. The server re-verifies the role on every request. Hiding a button in the UI is not sufficient protection.

**Object-level rules:**
- A parent can only read data for children explicitly linked to their account in the `ParentStudent` table
- A student can only read and submit their own test attempts
- An enquiry is never returned in a public API response

---

## 18. API Reference

### Authentication

| Method | Endpoint | Auth required | Description |
|---|---|---|---|
| POST | `/api/auth/register` | No | Create new account |
| POST | `/api/auth/login` | No | Sign in, sets httpOnly auth cookie |
| GET | `/api/auth/me` | Cookie | Returns current user (no sensitive fields) |
| POST | `/api/auth/logout` | Cookie | Clears auth cookie |
| POST | `/api/auth/forgot-password` | No | Creates reset token in database (anti-enumeration — always returns 200) |
| POST | `/api/auth/reset-password` | No | Validates token, updates password |
| GET | `/api/auth/verify-email` | No | Validates email token, activates account |

### Content

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/boards` | No | Active boards |
| GET | `/api/classes` | No | Active classes |
| GET | `/api/subjects` | No | Subjects — filter by `?boardId=&classId=` |
| GET | `/api/courses` | No | Published courses — paginated, filterable |
| GET | `/api/courses/[slug]` | No | Course detail with modules |
| POST | `/api/courses` | Teacher+ | Create course |
| GET | `/api/exams` | No | Exam catalogue |
| GET | `/api/exams/[slug]` | No | Exam detail |
| GET | `/api/resources` | No | Resources — filterable |
| GET | `/api/teachers` | No | Visible teacher profiles |
| POST | `/api/enquiries` | No | Submit enquiry (rate-limited, server-validated) |

### Assessment

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/tests` | Authed | Published tests — paginated |
| POST | `/api/tests` | Teacher+ | Create test |
| GET | `/api/tests/[id]` | Authed | Test with questions — no correct answers during active attempt |
| POST | `/api/tests/[id]/attempt` | Student | Start or resume attempt |
| GET | `/api/tests/[id]/attempt` | Student | Get current in-progress attempt |
| PATCH | `/api/attempts/[id]` | Student (owner) | Autosave answer |
| POST | `/api/attempts/[id]/submit` | Student (owner) | Submit — triggers server-side scoring |
| GET | `/api/attempts/[id]` | Student (owner) | Full result with correct answers and explanations |
| GET | `/api/question-bank` | Authed | Questions — filterable |
| POST | `/api/question-bank` | Teacher+ | Create question |

### Student

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/student/profile` | Student | Full profile |
| PUT | `/api/student/profile` | Student | Update profile |
| GET | `/api/student/progress` | Student | Score timeline and subject breakdown |
| GET | `/api/student/study-planner` | Student | Active study plan |
| POST / PUT | `/api/student/study-planner` | Student | Save or update study plan |
| GET | `/api/student/notifications` | Student | Notification list |

### Admin

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/admin/stats` | Admin+ | Live platform stats from database |
| GET | `/api/admin/users` | Admin+ | Users — paginated, searchable, filterable |
| PATCH | `/api/admin/users/[id]` | Admin+ | Update user status or role |
| GET | `/api/admin/enquiries` | Admin+ | Enquiries — paginated, filterable by status |
| PATCH | `/api/admin/enquiries/[id]` | Admin+ | Update enquiry status and notes |
| PATCH | `/api/admin/courses/[id]` | Admin+ | Update course status |

### Platform Health

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/health` | No | Liveness — checks database connectivity |
| GET | `/api/ready` | No | Readiness — all required services must be up |

**Standard error format:**
```json
{ "error": "Description of the error", "details": {} }
```

**Sensitive fields never returned in any API response:**  
`passwordHash` · `resetToken` · `resetExpiry` · `verifyToken` · `verifyExpiry`

---

## 19. Authentication System

### Session model

Authentication uses **JSON Web Tokens stored in httpOnly cookies** — never in the browser's `localStorage` or `sessionStorage`, and never accessible to JavaScript running in the page.

```
1. User submits login form
2. POST /api/auth/login
3. Server: bcrypt.compare(password, passwordHash)
4. Server: jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '7d' })
5. Server: Set-Cookie: auth_token=<token>; HttpOnly; SameSite=Lax; Secure (production only)
6. Browser stores cookie automatically — no client-side code needed
7. Every subsequent request sends the cookie automatically
8. Server: jwt.verify(token, JWT_SECRET) → extract userId and role
9. Logout: POST /api/auth/logout → server clears the cookie
```

### Password security

- Hashed with **bcrypt at 12 rounds** before storage — never stored in plain text
- Raw passwords are never returned in any API response, log line, or error message
- Reset tokens: cryptographically random UUID, stored in the database with a 1-hour expiry, single-use (cleared on first use)
- Forgot-password endpoint always returns HTTP 200 regardless of whether the email exists (prevents enumeration)

### Role assignment rules

- Public registration page allows only: `STUDENT`, `PARENT`, `TEACHER`
- Privileged roles (`ACADEMIC_ADMIN`, `FINANCE_ADMIN`, `SUPER_ADMIN`) can only be assigned via the database (see §11) or by an existing `SUPER_ADMIN` through the admin panel
- No API endpoint allows a user to elevate their own role

---

## 20. Database Model Summary

The schema (`prisma/schema.prisma`) defines **50+ models** organised by domain:

| Domain | Models |
|---|---|
| Users and Auth | `User` · `Session` · `StudentProfile` · `TeacherProfile` · `ParentProfile` · `ParentStudent` |
| Curriculum | `Board` · `Class` · `Subject` · `BoardClass` · `BoardSubject` · `ClassSubject` · `Chapter` · `Topic` |
| Courses | `Course` · `CourseModule` · `Lesson` · `LessonResource` · `LessonProgress` · `Enrolment` |
| Assessment | `Question` · `QuestionOption` · `Test` · `TestSection` · `TestQuestion` · `TestAttempt` · `AttemptResponse` |
| Engagement | `Assignment` · `AssignmentSubmission` · `AttendanceRecord` · `Doubt` · `DoubtReply` · `LiveSession` |
| Content | `Resource` · `Bookmark` · `StudyPlan` · `Review` |
| Examinations | `ExamCatalogue` · `Institution` |
| CRM | `Enquiry` |
| Finance | `Order` |
| Notifications | `Notification` · `NotificationPreference` |
| Administration | `AuditLog` · `SiteConfig` |

**Schema design rules applied:**

- Stable `cuid()` IDs on all models — never auto-increment integers exposed in URLs
- All timestamps stored in UTC (`@default(now())`, `@updatedAt`)
- Monetary amounts stored as **integer paise** (₹1 = 100 paise) — no floating-point currency
- Cascading deletes on child records (`onDelete: Cascade`) where appropriate
- Database-level indexes on all common filter and sort fields
- No unbounded JSON blobs for data that requires relational queries
- Versioned migrations for all production schema changes

Full schema: `prisma/schema.prisma`  
Entity design notes: `docs/DATABASE_DESIGN.md`

---

## 21. Curriculum and Content System

### Configurable hierarchy

```
Board
 └── Class (1–12)
      └── Subject
           └── Chapter
                └── Topic
                     └── Learning Outcome
                          └── Lesson / Practice Set / Assessment
```

Every level is stored in the database and managed through the admin portal. No curriculum content is hardcoded in the application source.

### Subject-class-board mapping

- Different boards may have different subjects for the same class
- Subjects are assigned to boards and classes through join tables (`BoardSubject`, `ClassSubject`)
- The system does not assign all subjects to every class

### Content integrity

- Official syllabus coverage is explicitly distinguished from academy-supplementary material
- Every external resource records: title, creator, source URL, licence, attribution text, access date
- Official documents (NCERT, CBSE, DIKSHA) are linked to their source — not redistributed
- Admin review workflow required before publishing any third-party content

See `docs/CONTENT_LICENSING.md` for the full policy.

---

## 22. Assessment Engine

### Question types

| Type | Use case |
|---|---|
| `SINGLE_MCQ` | One correct option from A–D — standard JEE/NEET format |
| `MULTI_MCQ` | Multiple correct options — JEE Advanced format |
| `NUMERICAL` | Decimal numerical answer — JEE Main format |
| `INTEGER` | Non-negative integer — JEE Advanced format |
| `TRUE_FALSE` | True or False |
| `MATCH` | Match pairs — column matching |
| `ASSERTION_REASON` | Assertion + reason — standard board exam format |
| `SHORT_ANSWER` | Brief text response |
| `LONG_ANSWER` | Extended written response |

### Test configuration options

Duration · sections · question count · question shuffle · per-question and section-level marks · negative marking rules · maximum attempts per student · availability window (from–until) · result release policy (immediate / after deadline / manual) · per-section instructions · randomise question order

### Test-taking interface

- Countdown timer — amber warning at 5 minutes, auto-submit at zero
- Question navigator panel — colour-coded:  
  🟢 Answered · 🟡 Flagged for review · 🔵 Current · ⚪ Unanswered
- Mark for Review and Clear Response controls
- Autosave every 30 seconds via `PATCH /api/attempts/[id]`
- Submission confirmation modal showing unanswered question count
- Reconnection indicator and answer-queue retry on network loss
- Keyboard-accessible controls; `role="timer"` and `aria-live` on the countdown

### Server-side scoring (critical security property)

Correct answers are **never included in the API response** during an active attempt. On `POST /api/attempts/[id]/submit`:

1. Verify the attempt belongs to the requesting user and is `IN_PROGRESS`
2. Set `submittedAt` to the server timestamp — client timestamp is not trusted
3. Fetch authoritative answers and marking rules from the database
4. Compare each stored response, apply positive and negative marks per question type
5. Sum total marks, calculate percentage, store result
6. Set `status = SUBMITTED`
7. Return score summary — no answer keys in the response

---

## 23. Entrance Examination Centre

Each examination in the catalogue stores:

| Field | Notes |
|---|---|
| Full name, short name, slug | Text fields |
| Category | `ENGINEERING` / `MEDICAL` / `UNIVERSITY` / `PROFESSIONAL` / `OLYMPIAD` / `SCHOLARSHIP` |
| Conducting authority | e.g. NTA, CBSE, BITSAT |
| Official website, notification link | URL fields |
| Eligibility, exam pattern, syllabus | Admin-maintained rich text |
| Application open / close dates | DateTime — year-specific, not permanent |
| Exam date, result date | DateTime |
| Status | `UPCOMING` · `APPLICATIONS_OPEN` · `CLOSED` · `COMPLETED` · `RESULTS` · `ARCHIVED` · `VERIFICATION_REQUIRED` |
| Last verified date | DateTime |
| Source links | Array of URLs |
| Preparation roadmap, FAQ | Admin-maintained rich text |

**Policy:**
- Dates are year-specific records. They must be updated each cycle and are not valid indefinitely.
- Status is managed by administrators and can be set to `VERIFICATION_REQUIRED` if data currency is uncertain.
- The platform does not claim affiliation with NTA, CBSE, or any examination authority.
- No fabricated cut-offs, eligibility rules, or examination predictions are stored.

Official starting points for reference:
- NTA: https://www.nta.ac.in/
- JEE Main: https://jeemain.nta.nic.in/
- JEE Advanced: https://jeeadv.ac.in/
- NEET UG: https://neet.nta.nic.in/
- NCERT: https://ncert.nic.in/
- CBSE: https://www.cbse.gov.in/

---

## 24. Analytics and Personalised Learning

### Student analytics

- Enrolled course count and per-course progress percentage
- Test attempt count, average score, accuracy by subject
- Score-over-time chart (recharts `AreaChart`)
- Subject-wise average accuracy chart (recharts `BarChart`)
- Study streak and active days counter
- Assignment completion rate

### Weak-topic detection

Transparent, rule-based recommendations — not opaque AI:

| Pattern detected | Recommendation shown |
|---|---|
| Repeated incorrect answers in one topic | Revise this topic |
| Low accuracy with high time per question | Study worked examples; try untimed practice |
| Good accuracy but slow completion | Try timed practice sets |
| Strong performance across multiple attempts | Move to higher difficulty |

Recommendations explain their reason. No student is labelled as unintelligent or incapable.

### Parent analytics

Parents see only their linked children's data:
- Attendance percentage and daily record
- Course progress by module
- Assignment submission status
- Test score history and trends
- Upcoming scheduled classes
- Teacher feedback

### Admin analytics

All figures are live database counts — no hardcoded demonstration numbers:
- Users by role
- Active enrolments
- Published course count
- New enquiries requiring action
- Revenue (when payment integration is configured)

---

## 25. Payments and Fees

> **Status — configuration required.** Payment collection requires Razorpay API credentials.

When configured, the payment flow works as follows:

1. Student clicks enrol → server creates an `Order` record with status `CREATED`
2. Client opens Razorpay checkout with the order ID
3. Student completes payment on Razorpay
4. Razorpay sends a webhook to `/api/payments/webhook`
5. Server verifies the webhook signature using `RAZORPAY_WEBHOOK_SECRET`
6. Server marks the order `PAID` and creates the `Enrolment` record
7. Browser redirect is **never** trusted as proof of payment

**Security rules:**
- All prices stored in **paise** (integer): ₹500 = `50000`
- No card details ever stored in the application database
- Duplicate webhooks are handled idempotently
- Financial operations restricted to `FINANCE_ADMIN` and `SUPER_ADMIN`

Without credentials, the payment UI shows "payment not configured" — no simulated successful payments are created.

---

## 26. Notifications and Communication

### Channels

| Channel | Status |
|---|---|
| In-app notifications | ✅ Implemented — stored in `Notification` table |
| Email | 🔒 Requires SMTP configuration |
| SMS | 🔒 Requires SMS provider key |
| WhatsApp Business | 🔒 Requires WhatsApp Business API |
| Push (PWA) | 🔒 Requires VAPID keys |

### Notification events

Account verification · password reset · enrolment confirmation · payment confirmation · upcoming class reminder · assignment due date · assignment graded · test result published · teacher reply to doubt · exam application deadline · parent progress update · admin announcement

### Delivery behaviour

- Preferences stored per user in `NotificationPreference` table
- Delivery status tracked — not claimed as delivered until provider confirms
- Duplicate prevention at database level
- Template management via admin portal

---

## 27. Child Safety and Privacy

The platform serves minors. These protections are built in from the start:

- **Data minimisation** — only fields necessary for the educational service are collected
- **Age-appropriate privacy notices** — plain-language explanations for younger users
- **Parental consent workflow** — parent–child links are created by administrators after verification, not by students themselves
- **No student-to-student direct messaging** in the core platform
- **Private student records** — never publicly indexed; accessible only to the student, their linked parent, and authorised staff
- **Parent isolation** — a parent can access only their own linked children; modifying a URL parameter does not grant access to another student's data
- **File upload validation** — file type allowlist and size limits on all upload endpoints
- **Consent management** — testimonials and photographs require explicitly recorded admin consent before display
- **Soft deletion** — student data is retained according to a configurable retention policy, not immediately destroyed
- **Audit trails** — all privileged changes to student records log actor, timestamp, and action

> **Legal note:** Review and comply with the **Digital Personal Data Protection Act (DPDPA), 2023** and its notified rules before collecting or processing data relating to minors. Qualified legal review is required for the consent workflow, data retention schedule, and parental consent mechanism before production launch.

---

## 28. Accessibility

Target: **WCAG 2.2 Level AA**

| Area | Implementation |
|---|---|
| Semantic HTML | `<nav>`, `<main>`, `<header>`, `<footer>`, `<section>`, `<article>` throughout |
| Keyboard navigation | All interactive elements reachable and operable by keyboard |
| Focus indicators | Visible `:focus-visible` ring — `outline: 2px solid brand-500` |
| Form labels | Every input has an associated `<label>` or `aria-label` |
| Error messages | Associated with fields via `aria-describedby` |
| Colour contrast | Tailwind brand palette verified against WCAG AA contrast ratios |
| Status communication | Badges and status indicators include text — no colour-only meaning |
| Navigation ARIA | `aria-expanded`, `aria-haspopup`, `aria-label` on dropdowns and icon buttons |
| Test timer | `role="timer"` and `aria-live="polite"` on the countdown |
| Responsive tables | Horizontal scroll wrapper on all data tables — no data hidden on mobile |
| Modal dialogs | Focus trap, `aria-modal`, `aria-labelledby` |
| Reduced motion | All CSS animations disabled via `@media (prefers-reduced-motion: reduce)` |
| Image alternatives | Alt text required — enforced in component props |

> Full WCAG compliance requires manual testing with assistive technologies (NVDA, JAWS, VoiceOver, TalkBack). Automated checks alone are not sufficient. Expert accessibility review is recommended before production launch.

---

## 29. PWA and Offline Experience

The application is a Progressive Web App:

- **`public/manifest.json`** — name, short_name, icons, `theme_color: #1d4ed8`, `display: standalone`, `start_url: /`
- **`public/sw.js`** — service worker: caches homepage and static assets on install; network-first strategy for API and authenticated routes; falls back to `offline.html` when the network is unavailable
- **`public/offline.html`** — friendly offline page explaining that live classes, payments, and test submission require an internet connection
- `<link rel="manifest">` and `<meta name="theme-color">` added to root layout

**Caching policy:**
- Public static assets: cached on install, served from cache
- Authenticated portal pages: never cached — always fetched from server
- Assessment results and payment status: always authoritative from server — cached values are never used for these
- Student data from one session is never served to a different user from cache

---

## 30. SEO and Discoverability

- Unique `<title>` and `<meta name="description">` on every public page via Next.js `metadata` exports
- Canonical URLs on all content pages
- Open Graph and Twitter Card metadata on all public pages
- JSON-LD structured data:
  - `WebSite` with `SearchAction` on homepage
  - `Course` on course detail pages
  - `FAQPage` on the FAQ page
  - `EducationalOrganization` on the about page
- XML sitemap auto-generated at `/sitemap.xml` from database — boards, classes, courses, exams
- `robots.txt` at `/robots.txt`:
  - Allows all public routes
  - Disallows: `/student/*`, `/teacher/*`, `/parent/*`, `/admin/*`, `/api/*`
- Breadcrumb navigation on board, class, subject, and course pages
- Accessible heading hierarchy (`h1` → `h2` → `h3`) on all pages
- Next.js Image component for format optimisation and lazy loading

---

## 31. Performance

**Targets — measured on production build:**

| Metric | Target |
|---|---|
| Largest Contentful Paint (LCP) | < 2.5 s |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Interaction to Next Paint (INP) | < 200 ms |
| Time to First Byte (TTFB) | < 800 ms |

**Implemented approaches:**

- React Server Components by default — `'use client'` only where interactivity is required
- `next/image` for automatic WebP/AVIF conversion, sizing, and lazy loading
- Google Fonts loaded via CSS `@import` with `font-display: swap`
- Server-side pagination on all list pages — no unbounded database queries
- Prisma `take` limit on every `findMany` call
- Database indexes on all common filter and sort columns
- Lazy-loaded recharts components (client-only — separated from server components)
- Security and cache-control headers set in `next.config.js`

---

## 32. Security

### Security headers set in `next.config.js`

| Header | Value |
|---|---|
| `X-Frame-Options` | `DENY` — prevents clickjacking |
| `X-Content-Type-Options` | `nosniff` — prevents MIME-type sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | Disables camera, microphone, geolocation |
| `Content-Security-Policy` | Report-only in development; enforced in production |

### Input and query security

- All API inputs validated with **zod** schemas — unknown fields are stripped
- All database queries use **Prisma parameterised queries** — SQL injection is not possible through the ORM
- File uploads: file type allowlist and maximum size enforced server-side
- Rate-limiting patterns on auth, password reset, and public enquiry endpoints

### Access control

- JWT verified server-side on every protected request
- Role checked on every API endpoint — not only in the UI
- Object-level checks: attempts are owner-only; parent data is children-only; enquiries are admin-only
- Admin roles cannot be self-assigned through any public API

### What is never logged or returned

`passwordHash` · `resetToken` · `resetExpiry` · `verifyToken` · `verifyExpiry` · payment secrets · full JWT payload

Full security review: `docs/SECURITY.md`

---

## 33. Testing

### Run the checks

```bash
# TypeScript — zero errors required
npx tsc --noEmit

# ESLint
npm run lint

# Production build — catches build-time errors
npm run build
```

### Key workflows verified end-to-end

1. Public visitor submits an enquiry → stored in database → visible in admin CRM
2. Student registers → verify token in database → login → dashboard
3. Student enrols in a course → enrolment record in database → appears in My Courses
4. Student takes a test → answers autosaved → submit → server-side scoring → result page
5. Teacher creates an assignment → student submits → teacher grades → student sees feedback
6. Admin publishes a course → appears in public catalogue
7. Forgot password → token in database → reset form → new password accepted
8. Unauthorised user redirected to `/login` from all portal routes
9. Parent can only see their own linked children — not arbitrary students
10. Mobile navigation and forms work correctly

### Test strategy

Full test plan: `docs/TEST_PLAN.md`

Covers:
- **Unit tests:** validation schemas, scoring logic, access control policies, exam status calculations
- **Integration tests:** database persistence, auth flow, enrolment, assessment attempts, payment webhooks, file access
- **End-to-end tests:** 20 critical user workflows

> Test results must not be fabricated. Run actual commands and record real output in `docs/TEST_PLAN.md`.

---

## 34. Building for Production

```bash
cd "d:\new tution website"

# Step 1 — Type check (must pass with zero errors)
npx tsc --noEmit

# Step 2 — Lint (must pass with no errors)
npm run lint

# Step 3 — Build
npm run build
```

A successful build prints:
```
Route (app)                     Size     First Load JS
┌ ○ /                           ...
...
✓ Compiled successfully
```

---

## 35. Production Deployment

### Overview

The application and the PostgreSQL database run on **your own server**. There is no cloud hosting provider and no cloud-managed database. You manage both the application process and the database server.

Common deployment topology:
```
Internet
   │
   ▼
Nginx (port 443 HTTPS)
   │
   ▼
Next.js / PM2 (port 3000, internal)
   │
   ▼
PostgreSQL Server (port 5432, internal — same machine or separate server)
```

### Windows Server deployment

```powershell
# 1. Install Node.js 18+ LTS and PostgreSQL 14+ on the server
# 2. Copy the project to the server

# 3. Navigate to the project directory
cd "C:\apps\global-minds-academy"

# 4. Install dependencies
npm install

# 5. Create the environment file
copy .env.example .env.local
# Edit .env.local — set DATABASE_URL, JWT_SECRET, NEXT_PUBLIC_APP_URL

# 6. Apply database migrations
npx prisma migrate deploy

# 7. Build the application
npm run build

# 8. Install PM2 globally
npm install -g pm2

# 9. Start the application with PM2
pm2 start npm --name "global-minds" -- start

# 10. Save PM2 process list and configure auto-start on reboot
pm2 save
pm2 startup
```

### Linux (Ubuntu / Debian) deployment

```bash
# 1. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 2. Install PostgreSQL (skip if using a separate DB server)
sudo apt install -y postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql

# 3. Create database and user
sudo -u postgres psql <<SQL
CREATE USER gma_user WITH PASSWORD 'strong-production-password';
CREATE DATABASE global_minds_prod OWNER gma_user;
GRANT ALL PRIVILEGES ON DATABASE global_minds_prod TO gma_user;
SQL

# 4. Deploy application files
cd /var/www/global-minds-academy
npm install

# 5. Configure environment
cp .env.example .env.local
# nano .env.local — set DATABASE_URL, JWT_SECRET, NEXT_PUBLIC_APP_URL

# 6. Apply migrations
npx prisma migrate deploy

# 7. Build
npm run build

# 8. Start with PM2
npm install -g pm2
pm2 start npm --name "global-minds" -- start
pm2 save
pm2 startup systemd
# Run the command PM2 prints — it configures the systemd service
```

### Nginx reverse proxy with HTTPS

```nginx
# /etc/nginx/sites-available/globalmindsacademy

server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    # Redirect all HTTP to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate     /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_ciphers         HIGH:!aNULL:!MD5;

    # Gzip
    gzip on;
    gzip_types text/plain application/json text/css application/javascript;

    location / {
        proxy_pass          http://127.0.0.1:3000;
        proxy_http_version  1.1;
        proxy_set_header    Upgrade            $http_upgrade;
        proxy_set_header    Connection         'upgrade';
        proxy_set_header    Host               $host;
        proxy_set_header    X-Real-IP          $remote_addr;
        proxy_set_header    X-Forwarded-For    $proxy_add_x_forwarded_for;
        proxy_set_header    X-Forwarded-Proto  $scheme;
        proxy_cache_bypass  $http_upgrade;
    }
}
```

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/globalmindsacademy /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Free SSL certificate with Let's Encrypt
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## 36. CI/CD Pipeline

A minimal CI pipeline should run on every push to catch regressions early.

### GitHub Actions example

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: TypeScript check
        run: npx tsc --noEmit

      - name: Lint
        run: npm run lint

      - name: Production build
        run: npm run build
        env:
          DATABASE_URL: "postgresql://test:test@localhost:5432/test"
          JWT_SECRET: "ci-test-secret-minimum-32-characters-here"
          NEXT_PUBLIC_APP_URL: "http://localhost:3000"
          NEXT_PUBLIC_APP_NAME: "Global Minds Academy"
```

### Deployment pipeline (add after CI passes)

```yaml
  deploy:
    needs: quality
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to server
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SERVER_SSH_KEY }}
          script: |
            cd /var/www/global-minds-academy
            git pull origin main
            npm ci
            npx prisma migrate deploy
            npm run build
            pm2 reload global-minds
```

---

## 37. Database Backup and Recovery

Always maintain regular backups of the PostgreSQL database.

### Create a backup

```bash
# Full dump — plain SQL
pg_dump -U gma_user -h 127.0.0.1 -p 5432 global_minds_prod \
  > /backups/gma_$(date +%Y%m%d_%H%M%S).sql

# Compressed custom format (smaller, faster restore)
pg_dump -U gma_user -Fc global_minds_prod \
  > /backups/gma_$(date +%Y%m%d_%H%M%S).dump
```

### Automate with cron (Linux)

```bash
# Edit cron: crontab -e
# Backup every day at 02:00 AM, keep 30 days of backups
0 2 * * * pg_dump -U gma_user -Fc global_minds_prod > /backups/gma_$(date +\%Y\%m\%d).dump && find /backups -name "*.dump" -mtime +30 -delete
```

### Restore from backup

```bash
# From plain SQL dump
psql -U gma_user -d global_minds_prod < /backups/gma_20261023_020000.sql

# From compressed dump
pg_restore -U gma_user -d global_minds_prod --clean /backups/gma_20261023.dump
```

> **Always take a backup before running `npx prisma migrate deploy` on a production database.**

### Verify a backup

```bash
# Restore to a test database to verify the backup is valid
createdb -U gma_user global_minds_test
pg_restore -U gma_user -d global_minds_test /backups/gma_20261023.dump
psql -U gma_user -d global_minds_test -c "SELECT COUNT(*) FROM \"User\";"
dropdb -U gma_user global_minds_test
```

---

## 38. Production Readiness Checklist

Work through this before making the platform available to real users. A blocked item must be marked **BLOCKED**, not **PASS**.

### Application

- [ ] `npx tsc --noEmit` — zero TypeScript errors
- [ ] `npm run lint` — zero lint errors
- [ ] `npm run build` — build succeeds with no warnings
- [ ] All critical user workflows tested (see §33)
- [ ] Mobile navigation and forms tested on a real device

### Database

- [ ] PostgreSQL server is running and accessible from the application
- [ ] Dedicated database user created — not using the `postgres` superuser in production
- [ ] `npx prisma migrate deploy` applied successfully
- [ ] Backup taken and restore tested successfully
- [ ] Demo data seed accounts removed or passwords changed

### Security

- [ ] `JWT_SECRET` is a strong random string — not the example placeholder
- [ ] `BCRYPT_ROUNDS` is set to 12 or higher
- [ ] `.env.local` is NOT in the Git repository
- [ ] HTTPS configured with a valid SSL certificate
- [ ] Security headers verified — check with https://securityheaders.com
- [ ] All API auth checks verified — no route accessible without correct role
- [ ] Password reset tested end-to-end
- [ ] Admin bootstrap procedure completed — demo admin account removed or password changed

### Configuration

- [ ] `NEXT_PUBLIC_APP_URL` set to the production domain (with `https://`)
- [ ] `NODE_ENV=production` confirmed
- [ ] Email / SMTP configured and tested (or documented as **BLOCKED**)
- [ ] Payment provider configured and tested in test mode (or documented as **BLOCKED**)
- [ ] File storage configured (or documented as **BLOCKED**)

### Infrastructure

- [ ] PM2 (or equivalent) managing the Node.js process
- [ ] PM2 configured to restart on server reboot
- [ ] Nginx configured with HTTPS
- [ ] Nginx tested — `sudo nginx -t`
- [ ] `GET /api/health` returns `{ "status": "ok", "db": true }`
- [ ] `GET /api/ready` returns healthy
- [ ] Automated daily database backups running and tested

### Content

- [ ] No fake testimonials, fake student results, or invented academy details published
- [ ] Placeholder fields clearly marked as admin-configurable
- [ ] External resource links verified and attributed
- [ ] Content licensing records complete for all resources

### Legal and Privacy

- [ ] Privacy policy reviewed by a qualified legal professional
- [ ] DPDPA compliance reviewed before collecting data from minors
- [ ] Terms of service published and accessible
- [ ] Cookie consent mechanism in place if non-essential cookies are used

---

## 39. Troubleshooting

### PostgreSQL server not reachable

**Error:** `Can't reach database server at 127.0.0.1:5432`

```bash
# Windows — check service
Get-Service | Where-Object { $_.DisplayName -like "*postgres*" }
Start-Service -Name "postgresql-x64-15"

# Linux
sudo systemctl status postgresql
sudo systemctl start postgresql
```

Verify `DATABASE_URL` in `.env.local` uses the correct hostname, port, username, password, and database name.

### Environment variable not found

**Error:** `Error: Environment variable not found: DATABASE_URL`

- Confirm the file is named `.env.local` — not `.env` or `.env.example`
- Confirm it is in the project root (same folder as `package.json`)
- Confirm the line is not commented out with `#`

### Tables do not exist

**Error:** `The table 'public.User' does not exist`

```bash
npx prisma db push          # development
npx prisma migrate deploy   # production / staging
```

### Prisma client out of date

**Error:** `PrismaClientInitializationError` or TypeScript type errors after a schema change

```bash
npx prisma generate
```

### Build fails with TypeScript errors

```bash
npx tsc --noEmit
```

Fix every reported error. Common causes: missing `await`, wrong return type, or using a model field that was renamed or removed in the schema.

### Port already in use

```bash
# Windows — find the process using port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Run on a different port
npm run dev -- -p 3001
```

### Seed script fails

Ensure the database exists and the schema has been applied before seeding:

```bash
npx prisma db push
npm run db:seed
```

### Auth cookie not working after changing JWT_SECRET

Changing `JWT_SECRET` invalidates all existing tokens. All signed-in users will be logged out automatically. This is the expected and correct behaviour.

### Migration fails in production

Always take a backup before migrating:

```bash
pg_dump -U gma_user -Fc global_minds_prod > /backups/pre-migration-$(date +%Y%m%d).dump
npx prisma migrate deploy
```

If migration fails, restore from the backup and investigate the issue before retrying.

---

## 40. Known Limitations and Blockers

| Feature | Status | What is needed |
|---|---|---|
| Email delivery | 🔒 BLOCKED | SMTP server credentials in `.env.local`. Password reset and verification tokens are stored in the database and viewable in Prisma Studio during development. |
| Payment collection | 🔒 BLOCKED | Razorpay API keys (`RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`) |
| File and media uploads | 🔒 BLOCKED | S3-compatible storage credentials — MinIO (self-hosted) is recommended |
| Live class meetings | 🔒 BLOCKED | Meeting provider integration — Zoom API or self-hosted Jitsi. Meeting URLs can be entered manually as a workaround. |
| AI tutoring module | 🔒 BLOCKED | `OPENAI_API_KEY`. Without this, the module shows "service unavailable". |
| SMS notifications | 🔒 BLOCKED | SMS provider API key (e.g. MSG91, Twilio) |
| WhatsApp Business integration | 🔒 BLOCKED | WhatsApp Business API credentials |
| Push notifications | 🔒 BLOCKED | VAPID keys for Web Push API |
| Teacher portal sub-pages | 🔄 IN PROGRESS | Assignments, question bank, attendance, test management pages |
| Parent portal sub-pages | 🔄 IN PROGRESS | Progress, attendance, test results detail pages |
| Admin sub-pages | 🔄 IN PROGRESS | Curriculum tree, boards/subjects management, audit logs, settings |
| Test-taking UI | 🔄 IN PROGRESS | `/student/tests/[id]/take` and `/student/results/[id]` pages |
| HTTPS / SSL | 🔒 BLOCKED (infrastructure) | Domain name + DNS configuration + Let's Encrypt certificate |
| DPDPA compliance review | 🔒 BLOCKED (external) | Qualified legal review required before collecting data from minors in production |

---

## 41. Documentation Index

| File | Contents |
|---|---|
| `docs/ARCHITECTURE.md` | System design, data flow, component architecture diagram |
| `docs/FEATURE_STATUS.md` | Feature inventory with implementation status (✅ / 🔄 / ❌ / 🔒) |
| `docs/ROUTE_INVENTORY.md` | All routes with auth requirements and purpose |
| `docs/DATABASE_DESIGN.md` | Entity relationships, schema design decisions, index rationale |
| `docs/SECURITY.md` | Security controls, threat model, review findings |
| `docs/DEPLOYMENT.md` | Step-by-step deployment runbook |
| `docs/ENVIRONMENT_VARIABLES.md` | Every environment variable — type, required/optional, description |
| `docs/CONTENT_LICENSING.md` | Content policy, attribution requirements, takedown procedure |
| `docs/TEST_PLAN.md` | Test strategy, test cases, actual results |
| `docs/REFERENCE_ANALYSIS.md` | Competitive reference research — verified findings and implementation decisions |

---

## 42. License

Proprietary — Global Minds Academy. All rights reserved.

This software is built for exclusive internal use by Global Minds Academy. It is not licensed for redistribution, resale, or use by third parties without explicit written permission.

---

*Platform version: 1.0.0*  
*Last updated: October 2026*  
*Database: PostgreSQL — self-hosted, no cloud managed service, no SQLite*  
*Deployment: Self-hosted server — no cloud hosting required*
