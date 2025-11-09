@REM @echo off
@REM title MERN Security Project Launcher
@REM color 0A

@REM echo ==========================================
@REM echo      Starting MERN Security Project
@REM echo ==========================================
@REM echo.

@REM :: === Set paths ===
@REM set NODE_HOME=D:\CLIC\Security-Project\PortableNode\node-v22.21.0-win-x64
@REM set PATH=%NODE_HOME%;%NODE_HOME%\node_modules\npm\bin;%PATH%

@REM :: === Start Backend ===
@REM echo [1/2] Starting Backend (node index.js)...
@REM cd /d D:\CLIC\Security-Project\Backend
@REM start "Backend Server" "%NODE_HOME%\node.exe" index.js

@REM :: === Start Frontend ===
@REM echo [2/2] Starting Frontend (npm run dev)...
@REM cd /d D:\CLIC\Security-Project\Frontend
@REM start "Frontend App" "%NODE_HOME%\node.exe" "%NODE_HOME%\node_modules\npm\bin\npm-cli.js" run dev

@REM echo.
@REM echo ==========================================
@REM echo Both backend and frontend are now running.
@REM echo Backend: http://localhost:5000 (or your port)
@REM echo Frontend: http://localhost:5173 (or your port)
@REM echo ==========================================
@REM echo.

@REM pause







@echo off
title MERN Security Project Launcher
color 0A

echo ==========================================
echo      Starting MERN Security Project
echo ==========================================
echo.

:: === Set paths ===
set NODE_HOME=%~dp0PortableNode\node-v22.21.0-win-x64
set PATH=%NODE_HOME%;%NODE_HOME%\node_modules\npm\bin;%PATH%

:: === Start Backend ===
echo [1/2] Starting Backend (node index.js)...
cd /d %~dp0Backend
start "Backend Server" "%NODE_HOME%\node.exe" index.js

:: === Start Frontend ===
echo [2/2] Starting Frontend (npm run dev)...
cd /d %~dp0Frontend
start "Frontend App" "%NODE_HOME%\node.exe" "%NODE_HOME%\node_modules\npm\bin\npm-cli.js" run dev

echo.
echo ==========================================
echo Both backend and frontend are now running.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo ==========================================
echo.

pause


