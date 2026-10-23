# Route Inventory — Global Minds Academy

All routes in the Next.js App Router. Public routes are accessible without authentication. Protected routes require the `auth_token` cookie (enforced by middleware + layout server components).

---

## Public Pages

| Route | HTTP | Auth | Description |
|---|---|---|---|
| `/` | GET | Public | Home / landing page |
| `/courses` | GET | Public | Course catalogue (static demo data) |
| `/courses/[slug]` | GET | Public | Course detail page |
| `/exams` | GET | Public | Exam prep overview |
| `/exams/[slug]` | GET | Public | Individual exam info page |
| `/contact` | GET | Public | Contact / enquiry form |
| `/about` | GET | Public | About the academy |
| `/privacy` | GET | Public | Privacy policy |
| `/terms` | GET | Public | Terms of service |
| `/login` | GET | Public | Login page |
| `/register` | GET | Public | Student registration page |

---

## Student Portal (`/student/*`)

Middleware redirects to `/login?next=<path>` if `auth_token` cookie is absent. Layout checks role = STUDENT.

| Route | HTTP | Auth | Description |
|---|---|---|---|
| `/student/dashboard` | GET | STUDENT | Student dashboard (stats, quick actions) |
| `/student/my-courses` | GET | STUDENT | Enrolled courses list |
| `/student/my-courses/[slug]` | GET | STUDENT | Course learner view |
| `/student/my-courses/[slug]/lesson/[id]` | GET | STUDENT | Lesson player |
| `/student/tests` | GET | STUDENT | Available tests list |
| `/student/tests/[slug]` | GET | STUDENT | Test attempt page |
| `/student/tests/[slug]/result` | GET | STUDENT | Test result page |
| `/student/assignments` | GET | STUDENT | Assignments list |
| `/student/assignments/[id]` | GET | STUDENT | Assignment detail / submission |
| `/student/progress` | GET | STUDENT | Progress & analytics |
| `/student/doubt-support` | GET | STUDENT | Doubt submission & history |
| `/student/bookmarks` | GET | STUDENT | Saved bookmarks |
| `/student/notifications` | GET | STUDENT | Notifications |
| `/student/profile` | GET | STUDENT | Student profile |
| `/student/settings` | GET | STUDENT | Account settings |
| `/student/study-planner` | GET | STUDENT | Study schedule planner |

---

## Teacher Portal (`/teacher/*`)

Middleware redirects if cookie absent. Layout checks role in [TEACHER, MENTOR, ACADEMIC_ADMIN, SUPER_ADMIN].

| Route | HTTP | Auth | Description |
|---|---|---|---|
| `/teacher/dashboard` | GET | TEACHER+ | Teacher dashboard |
| `/teacher/courses` | GET | TEACHER+ | Courses I teach |
| `/teacher/courses/[slug]` | GET | TEACHER+ | Course management view |
| `/teacher/courses/[slug]/lessons` | GET | TEACHER+ | Lesson management |
| `/teacher/students` | GET | TEACHER+ | Student roster |
| `/teacher/assignments` | GET | TEACHER+ | Assignments management |
| `/teacher/assignments/[id]` | GET | TEACHER+ | Assignment grading |
| `/teacher/live-sessions` | GET | TEACHER+ | Live session schedule |
| `/teacher/doubts` | GET | TEACHER+ | Student doubts queue |
| `/teacher/attendance` | GET | TEACHER+ | Attendance marking |
| `/teacher/profile` | GET | TEACHER+ | Teacher profile |

---

## Parent Portal (`/parent/*`)

Middleware redirects if cookie absent. Layout checks role = PARENT.

| Route | HTTP | Auth | Description |
|---|---|---|---|
| `/parent/dashboard` | GET | PARENT | Parent dashboard |
| `/parent/children` | GET | PARENT | Linked children |
| `/parent/children/[id]/progress` | GET | PARENT | Child progress report |
| `/parent/children/[id]/attendance` | GET | PARENT | Child attendance report |
| `/parent/payments` | GET | PARENT | Payment history |
| `/parent/notifications` | GET | PARENT | Notifications |
| `/parent/profile` | GET | PARENT | Parent profile |

---

## Admin Portal (`/admin/*`)

Middleware redirects if cookie absent. Layout checks role in [SUPER_ADMIN, ACADEMIC_ADMIN, FINANCE_ADMIN].

| Route | HTTP | Auth | Description |
|---|---|---|---|
| `/admin/dashboard` | GET | ADMIN | Admin overview |
| `/admin/users` | GET | ADMIN | User list + management |
| `/admin/users/[id]` | GET | ADMIN | User detail |
| `/admin/courses` | GET | ADMIN | Course management |
| `/admin/courses/new` | GET | ADMIN | Create course |
| `/admin/courses/[slug]` | GET | ADMIN | Edit course |
| `/admin/questions` | GET | ADMIN | Question bank |
| `/admin/questions/new` | GET | ADMIN | Create question |
| `/admin/tests` | GET | ADMIN | Test management |
| `/admin/enquiries` | GET | ADMIN | Enquiry CRM |
| `/admin/enquiries/[id]` | GET | ADMIN | Enquiry detail |
| `/admin/exams` | GET | ADMIN | Exam catalogue management |
| `/admin/resources` | GET | ADMIN | Resource management |
| `/admin/analytics` | GET | ADMIN | Platform analytics |
| `/admin/audit-log` | GET | SUPER_ADMIN | Audit log |
| `/admin/settings` | GET | SUPER_ADMIN | Site configuration |

---

## API Routes

### Auth

| Route | Method | Auth | Description |
|---|---|---|---|
| `/api/auth/register` | POST | Public | Register new student |
| `/api/auth/login` | POST | Public | Login, set auth_token cookie |
| `/api/auth/me` | GET | Cookie | Get current user (no secrets) |
| `/api/auth/me` | DELETE | Cookie | Logout, clear cookie |

### Enquiries

| Route | Method | Auth | Description |
|---|---|---|---|
| `/api/enquiries` | POST | Public | Submit contact enquiry |
| `/api/enquiries` | GET | ADMIN | List enquiries (paginated) |
| `/api/enquiries/[id]` | GET | ADMIN | Get single enquiry |
| `/api/enquiries/[id]` | PATCH | ADMIN | Update enquiry status |

### Health

| Route | Method | Auth | Description |
|---|---|---|---|
| `/api/health` | GET | Public | Health check — returns DB status |

---

## Middleware Config

```ts
// Protected prefixes (cookie presence check only)
matcher: ['/student/:path*', '/teacher/:path*', '/parent/:path*', '/admin/:path*']
```

Full role-based access control is enforced at the layout level using `getCurrentUser()`.
