# PowerShell script to fix versioned imports in UI components
# Run this in PowerShell: .\fix-imports.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Fixing Versioned Imports in UI Components" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$uiPath = "src\components\ui"
$filesFixed = 0
$totalReplacements = 0

if (!(Test-Path $uiPath)) {
    Write-Host "Error: $uiPath directory not found!" -ForegroundColor Red
    Write-Host "Make sure you're running this from the project root (Portfolio_Fixee/file_example)" -ForegroundColor Yellow
    exit 1
}

Get-ChildItem -Path $uiPath -Filter "*.tsx" -Recurse | ForEach-Object {
    $file = $_
    $originalContent = Get-Content $file.FullName -Raw
    $content = $originalContent
    $fileReplacements = 0
    
    # Define all patterns to replace
    $patterns = @(
        '@radix-ui/react-([a-z-]+)@[\d.]+'
        'lucide-react@[\d.]+'
        'class-variance-authority@[\d.]+'
        'next-themes@[\d.]+'
        'sonner@[\d.]+'
        'input-otp@[\d.]+'
        'react-hook-form@[\d.]+'
        'vaul@[\d.]+'
        'cmdk@[\d.]+'
        'react-resizable-panels@[\d.]+'
        'embla-carousel-react@[\d.]+'
        'react-day-picker@[\d.]+'
        'recharts@[\d.]+'
    )
    
    # Apply each pattern
    foreach ($pattern in $patterns) {
        $matches = [regex]::Matches($content, $pattern)
        if ($matches.Count -gt 0) {
            $fileReplacements += $matches.Count
            
            # Replace based on pattern type
            if ($pattern -match '@radix-ui') {
                $content = $content -replace $pattern, '@radix-ui/react-$1'
            } else {
                $packageName = $pattern -replace '@\[\\d\.\]\+', ''
                $content = $content -replace $pattern, $packageName
            }
        }
    }
    
    # Only write if changes were made
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        $filesFixed++
        $totalReplacements += $fileReplacements
        Write-Host "✓ Fixed: $($file.Name) ($fileReplacements replacements)" -ForegroundColor Green
    } else {
        Write-Host "○ Skipped: $($file.Name) (no versioned imports found)" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "  Files processed: $(Get-ChildItem -Path $uiPath -Filter '*.tsx' -Recurse | Measure-Object | Select-Object -ExpandProperty Count)" -ForegroundColor White
Write-Host "  Files fixed: $filesFixed" -ForegroundColor Green
Write-Host "  Total replacements: $totalReplacements" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

if ($filesFixed -gt 0) {
    Write-Host "✓ All versioned imports have been fixed!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "  1. Run 'npm run build' to test the build" -ForegroundColor White
    Write-Host "  2. Commit changes: git add . && git commit -m 'fix: Remove versioned imports'" -ForegroundColor White
    Write-Host "  3. Push to deploy: git push origin main" -ForegroundColor White
} else {
    Write-Host "✓ No versioned imports found - your code is already clean!" -ForegroundColor Green
}

Write-Host ""
