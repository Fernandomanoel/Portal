# Instala (ou atualiza) a Evolution API neste computador e gera o link que liga o portal a ela.
# Pode rodar quantas vezes quiser: não muda a chave nem apaga a conexão do WhatsApp.
#   instalar.bat                  instala/religa e gera o link
#   instalar.bat -Atualizar       baixa a imagem mais nova e recria o contêiner (os dados ficam)
#   instalar.bat -MostrarLink     também mostra o link na tela (ele contém a chave)
#   instalar.bat -PortalUrl https://outro-endereco.exemplo
param(
  [string]$PortalUrl = $(if ($env:PORTAL_URL) { $env:PORTAL_URL } else { "https://portal-microlins.vercel.app" }),
  [switch]$Atualizar,
  [switch]$MostrarLink,
  [switch]$SemDocker
)
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

function Gerar([int]$bytes) {
  $b = New-Object byte[] $bytes
  [System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($b)
  return (($b | ForEach-Object { $_.ToString("x2") }) -join "")
}

if (-not $SemDocker) {
  if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "O Docker não está instalado. Instale o Docker Desktop e rode de novo."
    exit 1
  }
  docker compose version *> $null
  if ($LASTEXITCODE -ne 0) { Write-Host "O comando 'docker compose' não está disponível. Atualize o Docker Desktop."; exit 1 }
}

if (-not (Test-Path ".env")) {
  $linhas = @(
    "EVOLUTION_API_KEY=$(Gerar 24)",
    "EVOLUTION_DB_SENHA=$(Gerar 16)",
    "EVOLUTION_PORTA=8081",
    "EVOLUTION_BIND=127.0.0.1"
  )
  Set-Content -Path ".env" -Value $linhas -Encoding ascii
  Write-Host "Chaves geradas e guardadas em evolution\.env (não compartilhe esse arquivo)."
} else {
  Write-Host "Usando as chaves que já existem em evolution\.env."
}

$env_ = @{}
foreach ($linha in Get-Content ".env") { if ($linha -match '^\s*([A-Z_]+)=(.*)$') { $env_[$Matches[1]] = $Matches[2] } }
$chave = $env_["EVOLUTION_API_KEY"]
$porta = if ($env_["EVOLUTION_PORTA"]) { $env_["EVOLUTION_PORTA"] } else { "8081" }

if (-not $SemDocker) {
  if ($Atualizar) { docker compose pull; if ($LASTEXITCODE -ne 0) { exit 1 } }
  docker compose up -d
  if ($LASTEXITCODE -ne 0) { Write-Host "Não consegui subir a Evolution. Confira se o Docker Desktop está aberto."; exit 1 }
  Write-Host -NoNewline "Esperando a Evolution API ligar"
  $ok = $false
  for ($i = 0; $i -lt 60 -and -not $ok; $i++) {
    try { Invoke-WebRequest -UseBasicParsing -Uri "http://127.0.0.1:$porta/" -TimeoutSec 3 | Out-Null; $ok = $true }
    catch { if ($_.Exception.Response) { $ok = $true } else { Write-Host -NoNewline "."; Start-Sleep -Seconds 2 } }
  }
  Write-Host ""
  if (-not $ok) { Write-Host "A Evolution não respondeu em 2 minutos. Veja os registros: docker compose logs api"; exit 1 }
}

$json = @{ url = "http://localhost:$porta"; chave = $chave; instancia = "portal" } | ConvertTo-Json -Compress
$codigo = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($json)).TrimEnd("=").Replace("+", "-").Replace("/", "_")
$link = "$($PortalUrl.TrimEnd('/'))/professor/mensagens#evolution=$codigo"
Set-Content -Path "ligacao.txt" -Value $link -Encoding ascii

Write-Host "Pronto. A Evolution API está no ar e volta sozinha se o computador reiniciar."
Write-Host "Para ligar o portal a ela, abra o link que está em evolution\ligacao.txt neste computador."
if ($MostrarLink) { Write-Host $link }
Start-Process $link
