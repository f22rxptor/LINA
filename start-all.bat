@echo off
title LINA Multi-Server Startup

echo Starting all servers...
echo.

REM Start ML Server in new window
start /d "ml-server" cmd /k "python app.py"

REM Start Node backend in new window
start cmd /k "npm run server"

REM Start React frontend
echo.
echo Opening React frontend...
npm run dev

pause
