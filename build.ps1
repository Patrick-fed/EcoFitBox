param(
    [Parameter(Position = 0)]
    [ValidateSet("build", "backend-build", "frontend-build", "run-backend", "run-frontend", "run", "clean", "help")]
    [string]$command = "help"
)

$BACKEND_DIR = "apl"
$FRONTEND_DIR = "ecofit-frontend"
$ROOT = Get-Location

function Write-Info($msg) { Write-Host $msg -ForegroundColor Green }
function Write-Step($msg) { Write-Host $msg -ForegroundColor Yellow }

function Backend-Build {
    Write-Step "Backend: compilando..."
    Push-Location "$ROOT\$BACKEND_DIR"
    try {
        & ".\mvnw.cmd" clean package -DskipTests
        if ($LASTEXITCODE -ne 0) { throw "Falha no build do backend" }
        Write-Info "Backend compilado com sucesso"
    } finally { Pop-Location }
}

function Frontend-Build {
    Write-Step "Frontend: compilando..."
    Push-Location "$ROOT\$FRONTEND_DIR"
    try {
        & "npm" install
        & "npm" run build
        if ($LASTEXITCODE -ne 0) { throw "Falha no build do frontend" }
        Write-Info "Frontend compilado com sucesso"
    } finally { Pop-Location }
}

function Run-Backend {
    Write-Host "Backend: http://localhost:65009" -ForegroundColor Yellow
    Push-Location "$ROOT\$BACKEND_DIR"
    try {
        & ".\mvnw.cmd" spring-boot:run
    } finally { Pop-Location }
}

function Run-Frontend {
    Write-Host "Frontend: http://localhost:5173" -ForegroundColor Yellow
    Push-Location "$ROOT\$FRONTEND_DIR"
    try {
        & "npm" run dev
    } finally { Pop-Location }
}

function Run {
    Write-Host "A iniciar servidores (Ctrl+C para parar)..." -ForegroundColor Cyan
    $backend = Start-Process -NoNewWindow -FilePath "pwsh" -ArgumentList "-Command $ROOT\build.ps1 run-backend" -PassThru
    $frontend = Start-Process -NoNewWindow -FilePath "pwsh" -ArgumentList "-Command $ROOT\build.ps1 run-frontend" -PassThru
    Write-Host "Backend (PID: $($backend.Id)) e Frontend (PID: $($frontend.Id)) iniciados" -ForegroundColor Cyan
    $backend.WaitForExit()
}

function Clean {
    Write-Step "A limpar..."
    Push-Location "$ROOT\$BACKEND_DIR"
    try { & ".\mvnw.cmd" clean } finally { Pop-Location }
    Push-Location "$ROOT\$FRONTEND_DIR"
    try {
        if (Test-Path "dist") { Remove-Item -Recurse -Force "dist" }
        if (Test-Path "node_modules") { Remove-Item -Recurse -Force "node_modules" }
    } finally { Pop-Location }
    Write-Info "Limpeza concluida"
}

function Help {
    Write-Host @"
Comandos disponiveis:
  build           Compila backend + frontend
  backend-build   Compila apenas o backend
  frontend-build  Compila apenas o frontend
  run-backend     Inicia o backend (porta 65009)
  run-frontend    Inicia o frontend (porta 5173)
  run             Inicia ambos em paralelo
  clean           Remove artefactos de build
  help            Mostra esta ajuda
"@
}

switch ($command) {
    "build"          { Backend-Build; Frontend-Build }
    "backend-build"  { Backend-Build }
    "frontend-build" { Frontend-Build }
    "run-backend"    { Run-Backend }
    "run-frontend"   { Run-Frontend }
    "run"            { Run }
    "clean"          { Clean }
    default          { Help }
}
