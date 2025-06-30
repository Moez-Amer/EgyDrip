#!/usr/bin/env pwsh
# Security Check Script for EgyDrip Project
# Run this before pushing to GitHub

Write-Host "Security Check for EgyDrip Project" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan

# Check 1: Look for .env files
Write-Host ""
Write-Host "1. Checking for .env files..." -ForegroundColor Yellow
$envFiles = Get-ChildItem -Path . -Filter "*.env" -Recurse -Force
if ($envFiles.Count -eq 0) {
    Write-Host "   Good: No .env files found" -ForegroundColor Green
} else {
    Write-Host "   WARNING: Found .env files that should not be committed:" -ForegroundColor Red
    $envFiles | ForEach-Object { Write-Host "   - $($_.FullName)" -ForegroundColor Red }
}

# Check 2: Verify Firebase configuration
Write-Host ""
Write-Host "2. Checking Firebase configuration..." -ForegroundColor Yellow
$firebaseConfig = Get-Content "client\src\firebase.js" -Raw
if ($firebaseConfig -match "import\.meta\.env\.VITE_") {
    Write-Host "   Good: Firebase using environment variables" -ForegroundColor Green
} else {
    Write-Host "   WARNING: Firebase may have hardcoded values!" -ForegroundColor Red
}

# Check 3: Verify .gitignore files
Write-Host ""
Write-Host "3. Checking .gitignore files..." -ForegroundColor Yellow
$gitignoreFiles = @(".gitignore", "client\.gitignore")
foreach ($file in $gitignoreFiles) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        if ($content -match "\.env" -and $content -match "node_modules") {
            Write-Host "   Good: $file has proper security patterns" -ForegroundColor Green
        } else {
            Write-Host "   WARNING: $file may need security improvements" -ForegroundColor Yellow
        }
    }
}

Write-Host ""
Write-Host "Security Check Complete!" -ForegroundColor Cyan
Write-Host "If all checks show 'Good', your project is ready for GitHub!" -ForegroundColor Green
