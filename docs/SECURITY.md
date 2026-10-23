# Security — Global Minds Academy

## Authentication Mechanism

**JWT + httpOnly Cookie** — no localStorage, no sessionStorage.

1. On successful login, the server generates a signed JWT and sets it as an httpOnly cookie named `auth_token`.
2. The cookie is `Secure` (HTTPS-only in production), `SameSite=Lax`, and has no JavaScript access.
3. All subsequent requests from the browser carry the cookie automatically.
4. The server verifies the JWT signature on every protected request via `getCurrentUser()` in `src/lib/auth.ts`.

**JWT Configuration**

| Setting | Value |
|---|---|
| Algorithm | HS256 (default `jsonwebtoken`) |
| Secret | `JWT_SECRET` env var (min 32 chars in production) |
| Expiry | `JWT_EXPIRY` env var, default `7d` |
| Payload | `{ userId, role }` — minimal claims only |

## Password Hashing

- Library: **bcryptjs**
- Rounds: **12** (configurable via `BCRYPT_ROUNDS` env var)
- bcrypt automatically embeds salt in the hash string.
- Passwords are never stored in plain text, never logged, and never returned in API responses.

## No Secrets in Responses — Strict Rule

The following fields are **always excluded** from all API responses using Prisma `select`:

- `passwordHash`
- `resetToken`
- `resetExpiry`
- `verifyToken`
- `verifyExpiry`

This is enforced in every API route that returns user data.

## Role-Based Access Control (RBAC)

**Middleware** (edge runtime, `src/middleware.ts`): checks cookie presence for `/student`, `/teacher`, `/parent`, `/admin` routes. Redirects to `/login?next=<path>` if the cookie is missing.

**Layout server components**: call `getCurrentUser()` and check the returned user's `role`. If insufficient, call `redirect('/login')`.

**API routes**: call `getCurrentUser()` or `requireAuth(allowedRoles)` from `src/lib/auth.ts`. Return `401` or `403` JSON responses — never throw unhandled errors.

## HTTP Security Headers

Configured in `next.config.js` via `headers()` function, applied to all routes (`/(.*)`):

| Header | Value |
|---|---|
| `X-Frame-Options` | `DENY` — prevents clickjacking |
| `X-Content-Type-Options` | `nosniff` — prevents MIME sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | Disables camera, microphone, geolocation, payment |
| `Content-Security-Policy-Report-Only` | Report-only mode during development |

Before production, convert `Content-Security-Policy-Report-Only` to `Content-Security-Policy` and tighten the directives (remove `'unsafe-eval'` and `'unsafe-inline'` from `script-src`).

## Input Validation

All API route inputs are validated with **Zod** `safeParse` before any database operation. Invalid input returns a structured `400` JSON error with field-level messages. No SQL injection risk because Prisma uses parameterized queries.

## CSRF Protection

Because authentication uses `SameSite=Lax` cookies and all state-mutating operations use POST/PATCH/DELETE with JSON bodies, cross-site form submissions are blocked. For additional protection, enforce the `Content-Type: application/json` check in API routes.

## Rate Limiting

Not yet implemented (see [FEATURE_STATUS.md](FEATURE_STATUS.md)). Before production, add rate limiting on `/api/auth/login`, `/api/auth/register`, and `/api/enquiries` using a middleware or an edge-compatible library (e.g., `@vercel/kv` + sliding window).

## File Uploads

No file upload endpoints are currently implemented. When added: validate MIME type server-side, scan for malware, store in an isolated bucket (S3/Cloudinary), and never serve uploaded files from the Next.js origin.

## Secrets Management

- Never commit `.env.local` or any file containing real credentials.
- Use `.env.example` as a template (safe to commit — contains no real values).
- In production, use platform environment variable injection (Vercel, Railway, Render, etc.) or a secrets manager.

## Dependency Security

- Run `npm audit` periodically.
- Pin dependency versions in `package.json` (avoid `*` ranges in production).
- Review `npm audit` findings before each deployment.

## Audit Logging

The `AuditLog` model records admin actions (entity type, entity ID, action, user, IP address). Not yet implemented in API routes — to be wired in FEAT-006+.
