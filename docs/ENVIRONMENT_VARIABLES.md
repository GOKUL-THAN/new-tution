# Environment Variables — Global Minds Academy

Copy `.env.example` to `.env.local` and fill in the values before running the project locally.

## Required Variables

| Variable | Type | Required | Example | Description |
|---|---|---|---|---|
| `DATABASE_URL` | string | ✅ Required | `postgresql://user:pass@localhost:5432/gma_dev` | PostgreSQL connection string. Must include database name. |
| `JWT_SECRET` | string | ✅ Required | `change-me-use-a-long-random-secret-here-32chars` | JWT signing secret. Must be at least 32 characters. Use a cryptographically random value in production. |
| `NEXTAUTH_URL` | string | ✅ Required | `http://localhost:3000` | The canonical public URL of the app. Used in auth callbacks and email links. Set to the production URL in production. |

## Optional Variables (with defaults)

| Variable | Type | Default | Example | Description |
|---|---|---|---|---|
| `JWT_EXPIRY` | string | `7d` | `1d`, `7d`, `30d` | JWT token expiry. Passed to jsonwebtoken's `expiresIn`. |
| `BCRYPT_ROUNDS` | number | `12` | `12` | bcrypt work factor. Increase for production security; decrease only in test environments to speed up hashing. |
| `NEXT_PUBLIC_APP_URL` | string | — | `http://localhost:3000` | Public base URL exposed to client-side code. Should match `NEXTAUTH_URL`. |
| `NODE_ENV` | string | `development` | `production` | Set automatically by Next.js. Do not override. |

## Email (Transactional) — Not Yet Implemented

| Variable | Type | Required | Example | Description |
|---|---|---|---|---|
| `SMTP_HOST` | string | When email enabled | `smtp.sendgrid.net` | SMTP server host |
| `SMTP_PORT` | number | When email enabled | `587` | SMTP port |
| `SMTP_USER` | string | When email enabled | `apikey` | SMTP username |
| `SMTP_PASS` | string | When email enabled | `SG.xxx` | SMTP password or API key |
| `EMAIL_FROM` | string | When email enabled | `noreply@globalmindsacademy.com` | Sender address for transactional emails |

## Payments (Razorpay) — Not Yet Implemented

| Variable | Type | Required | Example | Description |
|---|---|---|---|---|
| `RAZORPAY_KEY_ID` | string | When payments enabled | `rzp_live_xxx` | Razorpay API key ID |
| `RAZORPAY_KEY_SECRET` | string | When payments enabled | `secret` | Razorpay API key secret |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | string | When payments enabled | `rzp_live_xxx` | Public key for client-side Razorpay checkout |

## File Storage (S3/Cloudinary) — Not Yet Implemented

| Variable | Type | Required | Example | Description |
|---|---|---|---|---|
| `CLOUDINARY_CLOUD_NAME` | string | When uploads enabled | `globalminds` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | string | When uploads enabled | `123456789` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | string | When uploads enabled | `secret` | Cloudinary API secret |

## .env.example Reference

```bash
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/global_minds_academy"

# Auth
JWT_SECRET="change-me-use-a-long-random-secret-here-min-32-chars"
JWT_EXPIRY="7d"
BCRYPT_ROUNDS="12"

# App
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Email (not yet implemented)
# SMTP_HOST=""
# SMTP_PORT="587"
# SMTP_USER=""
# SMTP_PASS=""
# EMAIL_FROM="noreply@globalmindsacademy.com"

# Payments (not yet implemented)
# RAZORPAY_KEY_ID=""
# RAZORPAY_KEY_SECRET=""
# NEXT_PUBLIC_RAZORPAY_KEY_ID=""

# File Storage (not yet implemented)
# CLOUDINARY_CLOUD_NAME=""
# CLOUDINARY_API_KEY=""
# CLOUDINARY_API_SECRET=""
```

## Security Notes

- **Never commit `.env.local`** — it is listed in `.gitignore`.
- `.env.example` contains only placeholder values — it is safe to commit.
- In production, use your deployment platform's secret management (Vercel Environment Variables, Railway Variables, AWS Secrets Manager, etc.).
- Rotate `JWT_SECRET` periodically. Rotating it will invalidate all existing sessions.
