@echo off
setlocal
title Claude AI Context Bundle - Kaan Hamitler Portfolio
cd /d "%~dp0.."

echo.
echo  ==================================================
echo   Claude AI Baglam Paketi olusturuluyor...
echo  ==================================================
echo.

powershell -NoProfile -ExecutionPolicy Bypass -File "tools\export-ai-bundle.ps1"

if errorlevel 1 goto :failed

echo.
echo  --------------------------------------------------
echo   HAZIR. Acilan klasordeki "Portfolio-AI-Bundle.md"
echo   dosyasini Claude'a ekleyin veya icerigini yapistirin.
echo  --------------------------------------------------
echo.
pause
exit /b 0

:failed
echo.
echo  HATA: Paket olusturulamadi. Yukaridaki mesaji kontrol edin.
echo  Ipucu: "pnpm install" calistirildigindan emin olun.
echo.
pause
exit /b 1