# Feature Status — Global Minds Academy

Last updated: 2024-01 (FEAT-001 foundation layer)

## Legend

| Status | Meaning |
|---|---|
| ✅ Implemented | Code exists and works end-to-end |
| 🔄 In Progress | Partially implemented |
| ⬜ Not Started | Not yet implemented |
| 🚫 Blocked | Waiting on external dependency or decision |

---

## Foundation & Infrastructure

| Feature | Status | Notes |
|---|---|---|
| Next.js 14 App Router setup | ✅ Implemented | |
| Tailwind CSS + custom tokens | ✅ Implemented | |
| Prisma schema (all models) | ✅ Implemented | 30+ models |
| Security headers in next.config.js | ✅ Implemented | FEAT-001 |
| Shared UI components (ui/) | ✅ Implemented | FEAT-001 |
| Middleware (route protection) | ✅ Implemented | FEAT-001 |
| AuthContext + useAuth hook | ✅ Implemented | FEAT-001 |
| Database seed script | ✅ Implemented | FEAT-001 |
| Documentation (docs/) | ✅ Implemented | FEAT-001 |

---

## Public Site

| Feature | Status | Notes |
|---|---|---|
| Home / landing page | ✅ Implemented | |
| Course catalogue page | ✅ Implemented | Static data |
| Exam prep info pages | ⬜ Not Started | |
| Contact / enquiry form | ✅ Implemented | Saves to DB |
| About page | ⬜ Not Started | |
| Privacy Policy page | ⬜ Not Started | |
| Terms of Service page | ⬜ Not Started | |
| Blog / news section | ⬜ Not Started | |
| Faculty profiles (public) | ⬜ Not Started | |
| SEO metadata (all pages) | 🔄 In Progress | Login, register done |
| Responsive Navbar | ✅ Implemented | |
| Footer | ✅ Implemented | |

---

## Authentication

| Feature | Status | Notes |
|---|---|---|
| User registration | ✅ Implemented | POST /api/auth/register |
| User login | ✅ Implemented | POST /api/auth/login |
| JWT httpOnly cookie | ✅ Implemented | auth_token |
| Logout (cookie clear) | ✅ Implemented | DELETE /api/auth/me |
| getCurrentUser (server) | ✅ Implemented | src/lib/auth.ts |
| Email verification flow | ⬜ Not Started | Token generated, email not sent |
| Password reset flow | ⬜ Not Started | Token generated, email not sent |
| OAuth (Google) | ⬜ Not Started | |
| Session management | 🔄 In Progress | Session model exists, not fully used |

---

## Student Portal

| Feature | Status | Notes |
|---|---|---|
| Student dashboard | 🔄 In Progress | Shell exists, no real data |
| Enrolled courses list | ⬜ Not Started | |
| Lesson player | ⬜ Not Started | |
| Test taking | ⬜ Not Started | |
| Assignments view | ⬜ Not Started | |
| Progress tracking | ⬜ Not Started | |
| Doubt support | ⬜ Not Started | |
| Bookmarks | ⬜ Not Started | |
| Notifications | ⬜ Not Started | |
| Student profile | ⬜ Not Started | |
| Study planner | ⬜ Not Started | |

---

## Teacher Portal

| Feature | Status | Notes |
|---|---|---|
| Teacher dashboard | ⬜ Not Started | |
| Course management | ⬜ Not Started | |
| Student roster | ⬜ Not Started | |
| Assignment management | ⬜ Not Started | |
| Live session scheduling | ⬜ Not Started | |
| Doubt resolution | ⬜ Not Started | |
| Attendance marking | ⬜ Not Started | |
| Teacher profile | ⬜ Not Started | |

---

## Parent Portal

| Feature | Status | Notes |
|---|---|---|
| Parent dashboard | ⬜ Not Started | |
| Child progress view | ⬜ Not Started | |
| Attendance report | ⬜ Not Started | |
| Payment history | ⬜ Not Started | |
| Notifications | ⬜ Not Started | |

---

## Admin Portal

| Feature | Status | Notes |
|---|---|---|
| Admin dashboard | ⬜ Not Started | |
| User management | ⬜ Not Started | |
| Course management | ⬜ Not Started | |
| Enquiry CRM | ⬜ Not Started | Enquiry model + API exist |
| Question bank management | ⬜ Not Started | |
| Content management | ⬜ Not Started | |
| Analytics & reports | ⬜ Not Started | |
| Audit log viewer | ⬜ Not Started | |
| Site configuration | ⬜ Not Started | |

---

## Courses & Learning

| Feature | Status | Notes |
|---|---|---|
| Course card component | ✅ Implemented | FEAT-001 |
| Course filter component | ✅ Implemented | FEAT-001 |
| Course detail page | ⬜ Not Started | |
| Course module/lesson nav | ⬜ Not Started | |
| Video lesson player | ⬜ Not Started | |
| Resource downloads | ⬜ Not Started | |
| Course enrolment flow | ⬜ Not Started | |
| Progress tracking | ⬜ Not Started | |

---

## Assessments

| Feature | Status | Notes |
|---|---|---|
| Question bank (DB) | ✅ Implemented | Schema only |
| Test creation (admin) | ⬜ Not Started | |
| Test taking (student) | ⬜ Not Started | |
| Auto-grading (MCQ) | ⬜ Not Started | |
| Result & analytics | ⬜ Not Started | |
| Mock exam simulator | ⬜ Not Started | |

---

## Exam Catalogue

| Feature | Status | Notes |
|---|---|---|
| ExamCatalogue DB model | ✅ Implemented | |
| Exam info pages | ⬜ Not Started | |
| JEE / NEET prep hub | ⬜ Not Started | |
| Application date tracker | ⬜ Not Started | |
| College info pages | ⬜ Not Started | |

---

## Payments

| Feature | Status | Notes |
|---|---|---|
| Order model (DB) | ✅ Implemented | Schema only |
| Razorpay integration | ⬜ Not Started | Requires API keys |
| Payment verification | ⬜ Not Started | |
| Receipt generation | ⬜ Not Started | |
| Refund flow | ⬜ Not Started | |

---

## Notifications & Communication

| Feature | Status | Notes |
|---|---|---|
| In-app notification model | ✅ Implemented | Schema only |
| Email (transactional) | ⬜ Not Started | Requires SMTP/SES |
| SMS | ⬜ Not Started | Requires provider |
| Push notifications | ⬜ Not Started | |

---

## DevOps & Production

| Feature | Status | Notes |
|---|---|---|
| Health check endpoint | ✅ Implemented | GET /api/health |
| Docker configuration | ⬜ Not Started | |
| CI/CD pipeline | ⬜ Not Started | |
| Monitoring (error tracking) | ⬜ Not Started | |
| Rate limiting | ⬜ Not Started | |
| CDN / file storage | ⬜ Not Started | Requires S3/Cloudinary |
