# Architecture — Global Minds Academy

## Framework

**Next.js 14 App Router** with React 18 server components. Pages are server components by default; client components use `'use client'` only when they need `useState`, `useEffect`, or browser event handlers.

## Directory Layout

```
d:\new tution website\
├── src/
│   ├── app/                     # App Router — pages and API routes
│   │   ├── layout.tsx           # Root layout (fonts, metadata, AuthProvider)
│   │   ├── page.tsx             # Home / landing page
│   │   ├── login/               # Login page
│   │   ├── register/            # Registration page
│   │   ├── courses/             # Public course catalogue
│   │   ├── exams/               # Exam prep info pages
│   │   ├── contact/             # Contact / enquiry form
│   │   ├── student/             # Student portal (protected)
│   │   ├── teacher/             # Teacher portal (protected)
│   │   ├── parent/              # Parent portal (protected)
│   │   ├── admin/               # Admin portal (protected, admin roles only)
│   │   └── api/                 # API route handlers
│   │       ├── auth/            # login, register, me, logout
│   │       ├── enquiries/       # Enquiry CRM
│   │       └── health/          # Health check
│   ├── components/
│   │   ├── layout/              # Navbar, Footer
│   │   ├── home/                # Landing page sections
│   │   ├── ui/                  # Shared primitives (LoadingSpinner, Modal, etc.)
│   │   ├── dashboard/           # Sidebar component
│   │   ├── courses/             # CourseCard, CourseFilters
│   │   └── forms/               # EnquiryForm and other reusable forms
│   ├── lib/
│   │   ├── auth.ts              # hashPassword, verifyPassword, generateToken, verifyToken, getCurrentUser
│   │   ├── db.ts                # Prisma client singleton
│   │   └── validations.ts       # Zod schemas shared across API routes
│   ├── context/
│   │   └── AuthContext.tsx      # React context: user, loading, logout
│   ├── hooks/
│   │   └── useAuth.ts           # useContext(AuthContext) wrapper
│   └── middleware.ts            # Next.js middleware — cookie-based route protection
├── prisma/
│   ├── schema.prisma            # Prisma data model
│   └── seed.ts                  # Idempotent seed script
├── docs/                        # This documentation
└── public/                      # Static assets
```

## Data Layer

**Prisma 5** ORM with **PostgreSQL**. The Prisma client is a singleton in `src/lib/db.ts` to prevent connection pool exhaustion in development hot-reload cycles.

All DB calls in API routes and server components are wrapped in `try/catch`. On failure they return empty-state UI or a structured JSON error — never a crash or an unhandled 500.

### Key Entity Groups

| Group | Models |
|---|---|
| Users & Auth | User, Session, StudentProfile, TeacherProfile, ParentProfile |
| Curriculum | Board, Class, Subject, Chapter, Topic, BoardClass, BoardSubject, ClassSubject |
| Courses | Course, CourseModule, Lesson, LessonProgress, Enrolment |
| Assessments | Question, QuestionOption, Test, TestSection, TestQuestion, TestAttempt, AttemptResponse |
| Assignments | Assignment, AssignmentSubmission, AttendanceRecord |
| Communication | LiveSession, Doubt, DoubtReply, Notification, NotificationPreference |
| Content | Resource, LessonResource, Bookmark, Review, StudyPlan |
| Exams | ExamCatalogue, Institution |
| CRM | Enquiry |
| Payments | Order |
| Admin | AuditLog, SiteConfig |

## Auth Flow

1. User submits email + password to `POST /api/auth/login`.
2. Server verifies password with bcrypt (12 rounds), generates a JWT signed with `JWT_SECRET`.
3. JWT is set as an **httpOnly, Secure, SameSite=Lax** cookie named `auth_token`.
4. Subsequent requests carry the cookie automatically.
5. Server components call `getCurrentUser()` from `src/lib/auth.ts`; this reads the cookie, verifies the JWT, and fetches the user from the database.
6. On logout, `DELETE /api/auth/me` clears the cookie.

## Middleware (Route Protection)

`src/middleware.ts` runs on the Next.js edge runtime and checks for the presence of the `auth_token` cookie on these protected prefixes:

- `/student/*`
- `/teacher/*`
- `/parent/*`
- `/admin/*`

If the cookie is absent, the request is redirected to `/login?next=<original-path>`.

Full role-level checks (e.g., admin-only pages) are enforced inside each portal's layout server component using `getCurrentUser()` followed by `redirect('/login')` if the role is insufficient.

## Role Hierarchy

| Role | Access |
|---|---|
| `STUDENT` | `/student/*` |
| `PARENT` | `/parent/*` |
| `TEACHER` | `/teacher/*`, limited `/admin/*` APIs |
| `MENTOR` | `/teacher/*` subset |
| `CONTENT_EDITOR` | Content management APIs |
| `ACADEMIC_ADMIN` | `/admin/*` |
| `FINANCE_ADMIN` | `/admin/*` (finance section) |
| `SUPER_ADMIN` | All `/admin/*`, all APIs |

## Security Headers

Configured in `next.config.js` via the `headers()` function:

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`
- `Content-Security-Policy-Report-Only` (report-only during development; tighten before production)

## Key Patterns

- **Server components by default** — no `'use client'` unless hooks or event handlers are needed.
- **API routes** use `NextRequest`/`NextResponse`, validate with Zod `safeParse`, never throw — return structured JSON errors.
- **Prices in paise** (INR minor units); divide by 100 for display.
- **Secrets never in responses** — `passwordHash`, `resetToken`, `verifyToken` are always excluded via Prisma `select`.
