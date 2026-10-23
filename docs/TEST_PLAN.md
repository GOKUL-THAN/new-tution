# Test Plan — Global Minds Academy

Manual test checklist for QA verification. Run these tests in a local development environment with the database seeded (`npm run db:seed`).

---

## 1. User Registration

### TC-REG-01: Successful Registration
- Navigate to `/register`.
- Fill in: First Name, Last Name, valid email, phone, password meeting policy.
- Submit form.
- **Expected**: Success message. User redirected to `/student/dashboard`. `auth_token` cookie set (httpOnly).

### TC-REG-02: Duplicate Email
- Attempt to register with an email already in the database.
- **Expected**: Error message "Email already registered". Form stays open. No duplicate user created.

### TC-REG-03: Weak Password
- Submit with password shorter than 8 characters or missing required characters.
- **Expected**: Validation error shown on the password field. Form not submitted.

### TC-REG-04: Missing Required Fields
- Submit with name or phone blank.
- **Expected**: Field-level validation errors. Form not submitted.

---

## 2. User Login

### TC-LOGIN-01: Successful Login (Student)
- Navigate to `/login`.
- Enter `student@demo.com` / `Demo@1234`.
- **Expected**: Redirected to `/student/dashboard`. Cookie set.

### TC-LOGIN-02: Successful Login (Admin)
- Enter `admin@demo.com` / `Demo@1234`.
- **Expected**: Redirected to a dashboard page. Cookie set.

### TC-LOGIN-03: Invalid Password
- Enter correct email but wrong password.
- **Expected**: Error message "Invalid email or password". No cookie set.

### TC-LOGIN-04: Non-existent Email
- Enter email not in the database.
- **Expected**: Error message "Invalid email or password" (same message as wrong password — no user enumeration).

### TC-LOGIN-05: Login with next param
- Navigate to `/login?next=/student/tests`.
- Login successfully.
- **Expected**: Redirected to `/student/tests`.

---

## 3. Enquiry Form

### TC-ENQ-01: Successful Submission
- Navigate to `/contact`.
- Fill all required fields (name, phone, consent).
- Submit.
- **Expected**: Success message with reference number. Form fields cleared.

### TC-ENQ-02: Missing Required Fields
- Submit with name or phone blank.
- **Expected**: Validation error. No record created in database.

### TC-ENQ-03: Duplicate Submission (Same Session)
- Submit same data twice.
- **Expected**: Two separate enquiry records with different reference numbers (no deduplication enforced by default).

### TC-ENQ-04: Consent Not Checked
- Leave consent checkbox unchecked and submit.
- **Expected**: Browser validation prevents submission.

---

## 4. Protected Routes — Middleware

### TC-AUTH-01: Unauthenticated Student Route
- Clear all cookies.
- Navigate to `/student/dashboard`.
- **Expected**: Redirected to `/login?next=/student/dashboard`.

### TC-AUTH-02: Unauthenticated Teacher Route
- Navigate to `/teacher/dashboard` without a cookie.
- **Expected**: Redirected to `/login?next=/teacher/dashboard`.

### TC-AUTH-03: Unauthenticated Admin Route
- Navigate to `/admin/dashboard` without a cookie.
- **Expected**: Redirected to `/login?next=/admin/dashboard`.

### TC-AUTH-04: Valid Cookie Allows Access
- Log in as student.
- Navigate to `/student/dashboard`.
- **Expected**: Page loads successfully (not redirected).

### TC-AUTH-05: Logout Clears Cookie
- Log in.
- Log out (DELETE /api/auth/me or logout button).
- Navigate to `/student/dashboard`.
- **Expected**: Redirected to `/login`.

---

## 5. Admin Access Control

### TC-ADMIN-01: Student Cannot Access Admin
- Log in as `student@demo.com`.
- Manually navigate to `/admin/dashboard`.
- **Expected**: Cookie is present so middleware passes, but layout server component checks role and redirects to `/login` (or shows a 403 page).

### TC-ADMIN-02: Admin Can Access Admin
- Log in as `admin@demo.com`.
- Navigate to `/admin/dashboard`.
- **Expected**: Page loads.

---

## 6. API Routes — Auth Responses

### TC-API-01: /api/auth/me Returns No Secrets
- Log in, then call `GET /api/auth/me`.
- Inspect JSON response.
- **Expected**: Response contains `id`, `email`, `firstName`, `role`. Does NOT contain `passwordHash`, `resetToken`, `verifyToken`.

### TC-API-02: /api/health Returns DB Status
- Call `GET /api/health`.
- **Expected**: `{ status: "ok", db: "connected" }` when DB is available.

### TC-API-03: /api/health With DB Unavailable
- Disconnect DB (e.g., stop PostgreSQL) and call `GET /api/health`.
- **Expected**: `{ status: "degraded", db: "unavailable" }` or similar. Does not crash (5xx optional but should not be unhandled).

---

## 7. Empty States When DB is Unavailable

### TC-EMPTY-01: Courses Page With DB Error
- Set `DATABASE_URL` to a bad value.
- Navigate to `/courses`.
- **Expected**: Page renders with empty course list or a graceful "Courses unavailable" message. Does not show a raw error or crash.

### TC-EMPTY-02: Student Dashboard With DB Error
- Same as above but navigate to `/student/dashboard` while logged in (cookie still valid).
- **Expected**: Dashboard renders with zero-state stats. No unhandled error page.

---

## 8. Security Headers

### TC-SEC-01: Headers Present on All Responses
- Use browser DevTools or `curl -I https://localhost:3000`.
- **Expected**: Response headers include `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`.

### TC-SEC-02: Iframe Embedding Blocked
- Create an HTML page with `<iframe src="http://localhost:3000">`.
- **Expected**: Browser blocks the embed due to `X-Frame-Options: DENY`.

---

## 9. Responsiveness

### TC-RESP-01: Mobile Viewport
- Open the home page at 375px width.
- **Expected**: Navigation collapses to mobile menu. Content is readable. No horizontal overflow.

### TC-RESP-02: Student Dashboard Mobile
- Open `/student/dashboard` at 375px.
- **Expected**: Bottom navigation bar visible. Sidebar hidden. Content scrollable.
