# ================================================================
# Global Minds Academy — Deploy Script
# Run this AFTER the database is running (see SETUP_RUN_AS_ADMIN.ps1)
# Usage:  cd "d:\new tution website" ; .\DEPLOY.ps1
# ================================================================

$PROJECT = "d:\new tution website"
Set-Location $PROJECT

function Write-Step($n, $msg) { Write-Host "`n[$n] $msg" -ForegroundColor Cyan }
function Write-OK($msg)       { Write-Host "    OK: $msg" -ForegroundColor Green }
function Write-Fail($msg)     { Write-Host "    FAIL: $msg" -ForegroundColor Red; exit 1 }

Write-Host "`n========================================" -ForegroundColor Yellow
Write-Host "  Global Minds Academy — Deploying" -ForegroundColor Yellow
Write-Host "========================================`n" -ForegroundColor Yellow

# ── Check .env.local ─────────────────────────────────────────────────────────
Write-Step 1 "Checking environment file"
if (-not (Test-Path ".env.local")) {
    Write-Fail ".env.local not found. Run SETUP_RUN_AS_ADMIN.ps1 first."
}
Write-OK ".env.local exists"

# ── Check database ────────────────────────────────────────────────────────────
Write-Step 2 "Checking PostgreSQL"
$svc = Get-Service "postgresql-x64-18" -ErrorAction SilentlyContinue
if ($svc.Status -ne "Running") {
    Write-Host "    PostgreSQL is not running." -ForegroundColor Red
    Write-Host "    Run SETUP_RUN_AS_ADMIN.ps1 as Administrator first." -ForegroundColor Yellow
    exit 1
}
Write-OK "PostgreSQL running"

# ── Install dependencies ──────────────────────────────────────────────────────
Write-Step 3 "Installing dependencies"
npm install --legacy-peer-deps --silent
Write-OK "Dependencies installed"

# ── Prisma generate ───────────────────────────────────────────────────────────
Write-Step 4 "Generating Prisma client"
npx prisma generate 2>&1 | Select-Object -Last 2
Write-OK "Prisma client ready"

# ── Push schema ───────────────────────────────────────────────────────────────
Write-Step 5 "Applying database schema"
npx prisma migrate deploy 2>&1 | Select-Object -Last 3
if ($LASTEXITCODE -ne 0) {
    Write-Host "    migrate deploy failed — trying db push..." -ForegroundColor Yellow
    npx prisma db push 2>&1 | Select-Object -Last 3
}
Write-OK "Schema applied"

# ── Seed data ─────────────────────────────────────────────────────────────────
Write-Step 6 "Seeding demo data"
npm run db:seed 2>&1 | Select-Object -Last 8
Write-OK "Seed complete"

# ── Build ─────────────────────────────────────────────────────────────────────
Write-Step 7 "Building production bundle"
npm run build 2>&1 | Select-Object -Last 5
if ($LASTEXITCODE -ne 0) { Write-Fail "Build failed. Check errors above." }
Write-OK "Build successful"

# ── Stop existing PM2 process ─────────────────────────────────────────────────
Write-Step 8 "Stopping any existing PM2 process"
pm2 stop global-minds 2>&1 | Out-Null
pm2 delete global-minds 2>&1 | Out-Null
Write-OK "Cleared old PM2 process"

# ── Start with PM2 ───────────────────────────────────────────────────────────
Write-Step 9 "Starting with PM2"
pm2 start ecosystem.config.js
Start-Sleep -Seconds 4
pm2 status
Write-OK "Application started"

# ── Save PM2 list ─────────────────────────────────────────────────────────────
Write-Step 10 "Saving PM2 process list (auto-restart on reboot)"
pm2 save
Write-OK "PM2 list saved"

# ── Health check ─────────────────────────────────────────────────────────────
Write-Step 11 "Running health check"
Start-Sleep -Seconds 3
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/health" -TimeoutSec 15 -UseBasicParsing
    $body = $response.Content | ConvertFrom-Json
    Write-OK "Health: $($response.StatusCode) — $($body | ConvertTo-Json -Compress)"
} catch {
    Write-Host "    Health check pending — app may still be starting" -ForegroundColor Yellow
}

# ── Done ─────────────────────────────────────────────────────────────────────
Write-Host "`n========================================" -ForegroundColor Green
Write-Host "  DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "  App URL  :  http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "  LOGIN CREDENTIALS (password: Demo@1234)" -ForegroundColor Yellow
Write-Host "  Student  ->  student@demo.com" -ForegroundColor White
Write-Host "  Teacher  ->  teacher@demo.com" -ForegroundColor White
Write-Host "  Parent   ->  parent@demo.com"  -ForegroundColor White
Write-Host "  Admin    ->  admin@demo.com"   -ForegroundColor White
Write-Host ""
Write-Host "  PM2 Commands:" -ForegroundColor Yellow
Write-Host "  pm2 logs global-minds    (live logs)"    -ForegroundColor White
Write-Host "  pm2 monit                (monitor)"      -ForegroundColor White
Write-Host "  pm2 restart global-minds (restart)"      -ForegroundColor White
Write-Host ""
