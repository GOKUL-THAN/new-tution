# Global Minds Academy — One-time setup script
# Run this AFTER editing .env.local with your PostgreSQL password.
# Usage: .\setup.ps1

param(
    [string]$PgPassword = "postgres",
    [string]$DbName = "global_minds_academy"
)

$PG = "C:\Program Files\PostgreSQL\18\bin"
$env:PGPASSWORD = $PgPassword

Write-Host ""
Write-Host "=== Global Minds Academy Setup ===" -ForegroundColor Cyan
Write-Host ""

# Step 1: Create database
Write-Host "Step 1: Creating database '$DbName'..." -ForegroundColor Yellow
& "$PG\psql.exe" -U postgres -c "CREATE DATABASE $DbName;" 2>&1 | Out-Null
Write-Host "   Done (database may already exist — that is fine)" -ForegroundColor Green

# Step 2: Update .env.local with password
Write-Host "Step 2: Updating .env.local with password..." -ForegroundColor Yellow
$envContent = Get-Content ".env.local" -Raw
$envContent = $envContent -replace "YOUR_POSTGRES_PASSWORD", $PgPassword
Set-Content ".env.local" $envContent
Write-Host "   Done" -ForegroundColor Green

# Step 3: Install dependencies
Write-Host "Step 3: Installing dependencies..." -ForegroundColor Yellow
npm install --legacy-peer-deps
Write-Host "   Done" -ForegroundColor Green

# Step 4: Push schema
Write-Host "Step 4: Pushing database schema..." -ForegroundColor Yellow
npx prisma db push
Write-Host "   Done" -ForegroundColor Green

# Step 5: Seed demo data
Write-Host "Step 5: Seeding demo data..." -ForegroundColor Yellow
npm run db:seed
Write-Host "   Done" -ForegroundColor Green

Write-Host ""
Write-Host "=== Setup Complete ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Start the app with:  npm run dev" -ForegroundColor White
Write-Host "Then open:           http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "Demo login accounts (password: Demo@1234)" -ForegroundColor Yellow
Write-Host "  Student  -> student@demo.com" -ForegroundColor White
Write-Host "  Teacher  -> teacher@demo.com" -ForegroundColor White
Write-Host "  Parent   -> parent@demo.com" -ForegroundColor White
Write-Host "  Admin    -> admin@demo.com" -ForegroundColor White
Write-Host ""
