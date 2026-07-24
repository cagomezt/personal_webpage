# deploy.ps1 - Build and deploy to GitHub Pages (gh-pages branch)
# Usage: .\deploy.ps1

$ErrorActionPreference = "Stop"
$RepoDir = $PSScriptRoot

Write-Host "Building project..." -ForegroundColor Cyan
Set-Location $RepoDir
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "Deploying to gh-pages branch..." -ForegroundColor Cyan

# Save current branch
$CurrentBranch = git rev-parse --abbrev-ref HEAD

# Create fresh gh-pages branch
git checkout --orphan gh-pages-deploy 2>$null
git reset --hard

# Copy built files
Copy-Item -Path "$RepoDir\dist\*" -Destination $RepoDir -Recurse -Force

# Stage only deployment files
git add index.html assets profile.jpg -ErrorAction SilentlyContinue
git add .nojekyll -ErrorAction SilentlyContinue

git commit -m "Deploy to GitHub Pages $(Get-Date -Format 'yyyy-MM-dd HH:mm')"

# Force push to gh-pages
git push origin gh-pages-deploy:gh-pages --force

Write-Host "Cleaning up..." -ForegroundColor Cyan
git checkout $CurrentBranch
git branch -D gh-pages-deploy
git clean -fd assets profile.jpg -ErrorAction SilentlyContinue

Write-Host "Deploy complete! Site: https://cagomezt.github.io/personal_webpage/" -ForegroundColor Green