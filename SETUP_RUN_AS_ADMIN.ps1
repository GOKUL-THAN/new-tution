# ================================================================
# Global Minds Academy — Database Setup (MUST RUN AS ADMINISTRATOR)
# Right-click → "Run with PowerShell" as Administrator
# OR: Open PowerShell as Admin, then:
#     cd "d:\new tution website" ; .\SETUP_RUN_AS_ADMIN.ps1
# ================================================================

$PG      = "C:\Program Files\PostgreSQL\18\bin"
$HBA     = "C:\Program Files\PostgreSQL\18\data\pg_hba.conf"
$SVC     = "postgresql-x64-18"
$DB      = "global_minds_academy"
$PASS    = "GmaLocal@2026"
$PROJECT = "d:\new tution website"

function Write-Step($n, $msg) { Write-Host "`n[$n] $msg" -ForegroundColor Cyan }
function Write-OK($msg)       { Write-Host "    OK: $msg" -ForegroundColor Green }

Write-Host "`n============================================" -ForegroundColor Yellow
Write-Host "  Global Minds Academy — DB Setup" -ForegroundColor Yellow
Write-Host "============================================`n" -ForegroundColor Yellow

# Check admin
$isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "  NOT running as Administrator!" -ForegroundColor Red
    Write-Host "  Right-click this file and choose 'Run as Administrator'" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "  Running as Administrator" -ForegroundColor Green

# Step 1: Backup pg_hba.conf
Write-Step 1 "Backing up pg_hba.conf"
Copy-Item $HBA "$HBA.backup" -Force
Write-OK "Backup saved"

# Step 2: Switch to trust
Write-Step 2 "Switching to trust mode (temporary)"
$c = Get-Content $HBA -Raw
[IO.File]::WriteAllText($HBA, ($c -replace 'scram-sha-256','trust'), [Text.Encoding]::UTF8)
Write-OK "Trust mode set"

# Step 3: Restart PostgreSQL
Write-Step 3 "Restarting PostgreSQL"
Stop-Service $SVC -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 3
Start-Service $SVC
Start-Sleep -Seconds 5
Write-OK "Service: $((Get-Service $SVC).Status)"

# Step 4: Set postgres password
Write-Step 4 "Setting postgres password"
$env:PGPASSWORD = ""
$r = & "$PG\psql.exe" -U postgres -h 127.0.0.1 -c "ALTER USER postgres WITH PASSWORD '$PASS';" 2>&1
Write-OK "Password set"

# Step 5: Create database
Write-Step 5 "Creating database"
$r = & "$PG\psql.exe" -U postgres -h 127.0.0.1 -c "CREATE DATABASE $DB;" 2>&1
Write-OK "Database: $r"

# Step 6: Restore scram
Write-Step 6 "Restoring secure authentication"
$c = Get-Content $HBA -Raw
[IO.File]::WriteAllText($HBA, ($c -replace '\btrust\b','scram-sha-256'), [Text.Encoding]::UTF8)
Write-OK "scram-sha-256 restored"

# Step 7: Restart with secure auth
Write-Step 7 "Restarting PostgreSQL with secure auth"
Stop-Service $SVC -Force
Start-Sleep -Seconds 3
Start-Service $SVC
Start-Sleep -Seconds 5
Write-OK "Service: $((Get-Service $SVC).Status)"

# Step 8: Verify connection
Write-Step 8 "Verifying connection"
$env:PGPASSWORD = $PASS
$r = & "$PG\psql.exe" -U postgres -h 127.0.0.1 -d $DB -c "SELECT 'DATABASE OK' AS result;" 2>&1
if ($r -match "DATABASE OK") {
    Write-OK "Connection verified"
} else {
    Write-Host "    WARNING: $r" -ForegroundColor Yellow
    Write-Host "    Check PostgreSQL is running and try again" -ForegroundColor Yellow
}

# Step 9: Write .env.local
Write-Step 9 "Writing .env.local"
$rnd = Get-Random -Maximum 999999
$envContent = @"
# Global Minds Academy — Environment
DATABASE_URL="postgresql://postgres:$PASS@127.0.0.1:5432/$DB?schema=public"
JWT_SECRET="gma-jwt-secret-$rnd-change-in-production"
JWT_EXPIRY="7d"
BCRYPT_ROUNDS="12"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="Global Minds Academy"
"@
[IO.File]::WriteAllText("$PROJECT\.env.local", $envContent, [Text.Encoding]::UTF8)
Write-OK ".env.local written"

# Done
Write-Host "`n============================================" -ForegroundColor Green
Write-Host "  DATABASE SETUP COMPLETE!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host "  PostgreSQL password : $PASS" -ForegroundColor White
Write-Host "  Database            : $DB" -ForegroundColor White
Write-Host ""
Write-Host "  Now run the deploy script (normal PowerShell):" -ForegroundColor Yellow
Write-Host "  cd '$PROJECT'" -ForegroundColor White
Write-Host "  .\DEPLOY.ps1" -ForegroundColor White
Write-Host ""
Read-Host "Press Enter to exit"
