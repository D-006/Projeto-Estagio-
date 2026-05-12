# Development startup script for PC Builder (Windows)
# Run with: powershell -ExecutionPolicy Bypass -File start-dev.ps1

Write-Host "🚀 PC Builder - Iniciando Frontend e Backend..." -ForegroundColor Cyan
Write-Host ""

# Check if backend node_modules exists
if (-not (Test-Path "backend/node_modules")) {
  Write-Host "📦 Instalando dependências do backend..." -ForegroundColor Yellow
  Set-Location backend
  npm install
  Set-Location ..
}

# Check if frontend node_modules exists
if (-not (Test-Path "node_modules")) {
  Write-Host "📦 Instalando dependências do frontend..." -ForegroundColor Yellow
  npm install
}

Write-Host ""
Write-Host "✅ Dependências instaladas com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "🔌 Backend: http://localhost:5000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Iniciando servidores..." -ForegroundColor Yellow
Write-Host ""

# Install concurrently if not already installed
$packageJson = Get-Content package.json | ConvertFrom-Json
if (-not ($packageJson.devDependencies.concurrently)) {
  Write-Host "📦 Instalando concurrently..." -ForegroundColor Yellow
  npm install --save-dev concurrently
}

# Start both servers using concurrently
npm install concurrently --save-dev 2>$null
npx concurrently `
  "cd backend && npm run dev" `
  "npm run dev"
