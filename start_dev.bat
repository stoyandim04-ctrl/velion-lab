@echo off
chcp 65001 >nul
title Velion Lab - Dev Server

echo ========================================
echo  Velion Lab - Starting Development Server
echo ========================================
echo.
echo The site will open at: http://localhost:3000
echo.
echo To STOP the server: close this window or press Ctrl+C
echo.
echo Starting...
echo.

cd /d "%~dp0"
call npm run dev
pause
