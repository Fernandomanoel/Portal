@echo off
rem Atalho para o instalador do PowerShell (evita o bloqueio de scripts do Windows).
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0instalar.ps1" %*
echo.
pause
