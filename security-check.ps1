#!/usr/bin/env pwsh
# Security Check Script for EgyDrip Project
# Run this before pushing to GitHub

Write-Host "🔒 EgyDrip Security Check" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan

# Check 1: Look for .env files
Write-Host "`n1. Checking for .env files..." -ForegroundColor Yellow
$envFiles = Get-ChildItem -Path . -Filter "*.env" -Recurse -Force
if ($envFiles.Count -eq 0) {
    Write-Host "   ✅ No .env files found - Good!" -ForegroundColor Green
} else {
    Write-Host "   ❌ Found .env files that should not be committed:" -ForegroundColor Red
    $envFiles | ForEach-Object { Write-Host "   - $($_.FullName)" -ForegroundColor Red }
}

# Check 2: Look for potential secrets in code
Write-Host "`n2. Scanning for potential hardcoded secrets..." -ForegroundColor Yellow
$secretPatterns = @(
    "password\s*=\s*['\`"][^'\`"]+['\`"]",
    "apikey\s*=\s*['\`"][^'\`"]+['\`"]",
    "secret\s*=\s*['\`"][^'\`"]+['\`"]",
    "token\s*=\s*['\`"][^'\`"]+['\`"]"
)

$foundSecrets = $false
foreach ($pattern in $secretPatterns) {
    $matches = Get-ChildItem -Path . -Include "*.js", "*.jsx", "*.ts", "*.tsx" -Recurse | 
               Select-String -Pattern $pattern -CaseSensitive:$false
    if ($matches) {
        $foundSecrets = $true
        Write-Host "   ❌ Potential hardcoded secrets found:" -ForegroundColor Red
        $matches | ForEach-Object { Write-Host "   - $($_.Filename):$($_.LineNumber)" -ForegroundColor Red }
    }
}

if (-not $foundSecrets) {
    Write-Host "   ✅ No hardcoded secrets detected - Good!" -ForegroundColor Green
}

# Check 3: Verify .gitignore patterns
Write-Host "`n3. Checking .gitignore files..." -ForegroundColor Yellow
$gitignoreFiles = @(".gitignore", "client\.gitignore")
foreach ($file in $gitignoreFiles) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        if ($content -match "\.env" -and $content -match "node_modules") {
            Write-Host "   ✅ $file has proper security patterns" -ForegroundColor Green
        } else {
            Write-Host "   ⚠️  $file may need security improvements" -ForegroundColor Yellow
        }
    }
}

# Check 4: Verify environment variables are used properly
Write-Host "`n4. Checking Firebase configuration..." -ForegroundColor Yellow
$firebaseConfig = Get-Content "client\src\firebase.js" -Raw
if ($firebaseConfig -match "import\.meta\.env\.VITE_") {
    Write-Host "   ✅ Firebase using environment variables - Good!" -ForegroundColor Green
} else {
    Write-Host "   ❌ Firebase may have hardcoded values!" -ForegroundColor Red
}

Write-Host "`n🔒 Security Check Complete!" -ForegroundColor Cyan
Write-Host "If all checks passed, your project is ready for GitHub!" -ForegroundColor Green
