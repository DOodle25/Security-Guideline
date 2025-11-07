@REM @echo off
@REM title MERN Security Project Launcher
@REM color 0A

@REM echo ==========================================
@REM echo      Starting MERN Security Project
@REM echo ==========================================
@REM echo.

@REM :: === Set paths ===
@REM set ROOT=%~dp0
@REM set NODE_HOME=%ROOT%PortableNode\node-v22.21.0-win-x64
@REM set MONGO_HOME=%ROOT%PortableMongo\mongodb-win32-x86_64-windows-8.2.1
@REM set DATA_DIR=%ROOT%MongoData
@REM set PATH=%NODE_HOME%;%MONGO_HOME%\bin;%PATH%

@REM :: === Ensure data folder exists ===
@REM if not exist "%DATA_DIR%" mkdir "%DATA_DIR%"

@REM :: === Start MongoDB ===
@REM echo [0/3] Starting MongoDB server...
@REM start "MongoDB Server" "%MONGO_HOME%\bin\mongod.exe" --dbpath "%DATA_DIR%" --port 27017 --bind_ip 127.0.0.1

@REM :: === Start Backend ===
@REM echo [1/3] Starting Backend (node index.js)...
@REM cd /d "%ROOT%Backend"
@REM start "Backend Server" "%NODE_HOME%\node.exe" index.js

@REM :: === Start Frontend ===
@REM echo [2/3] Starting Frontend (npm run dev)...
@REM cd /d "%ROOT%Frontend"
@REM start "Frontend App" "%NODE_HOME%\node.exe" "%NODE_HOME%\node_modules\npm\bin\npm-cli.js" run dev

@REM echo.
@REM echo ==========================================
@REM echo Everything is running!
@REM echo MongoDB:  mongodb://localhost:27017
@REM echo Backend:  http://localhost:5000
@REM echo Frontend: http://localhost:5173
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

:: === Set up paths ===
set ROOT=%~dp0
set NODE_HOME=%ROOT%PortableNode\node-v22.21.0-win-x64
set MONGO_HOME=%ROOT%PortableMongo\mongodb-win32-x86_64-windows-8.2.1
set DATA_DIR=%ROOT%MongoData
set LOG_DIR=%ROOT%MongoLogs
set PATH=%NODE_HOME%;%MONGO_HOME%\bin;%PATH%

:: === Ensure MongoDB data and log directories exist ===
if not exist "%DATA_DIR%" mkdir "%DATA_DIR%"
if not exist "%LOG_DIR%" mkdir "%LOG_DIR%"

:: === Start MongoDB locally on the USB ===
echo [0/3] Starting local MongoDB server (USB)...
start "MongoDB Server" "%MONGO_HOME%\bin\mongod.exe" ^
  --dbpath "%DATA_DIR%" ^
  --port 27017 ^
  --bind_ip 127.0.0.1 ^
  --logpath "%LOG_DIR%\mongo.log" ^
  --logappend

:: === Start Backend ===
echo [1/3] Starting Backend (node index.js)...
cd /d "%ROOT%Backend"
start "Backend Server" "%NODE_HOME%\node.exe" index.js

:: === Start Frontend ===
echo [2/3] Starting Frontend (npm run dev)...
cd /d "%ROOT%Frontend"
start "Frontend App" "%NODE_HOME%\node.exe" "%NODE_HOME%\node_modules\npm\bin\npm-cli.js" run dev

echo.
echo ==========================================
echo Everything is running!
echo MongoDB:  mongodb://localhost:27017
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo ------------------------------------------
echo MongoDB data stored at: %DATA_DIR%
echo Logs stored at: %LOG_DIR%
echo ==========================================
echo.

pause











@REM @echo off
@REM title MERN Security Project Launcher
@REM color 0A

@REM echo ==========================================
@REM echo      Starting MERN Security Project
@REM echo ==========================================
@REM echo.

@REM :: === Resolve root folder of the pendrive ===
@REM set "ROOT=%~dp0"
@REM set "NODE_HOME=%ROOT%PortableNode\node-v22.21.0-win-x64"
@REM set "MONGO_HOME=%ROOT%PortableMongo\mongodb-win32-x86_64-windows-8.2.1"
@REM set "DATA_DIR=%ROOT%MongoData"
@REM set "LOG_DIR=%ROOT%MongoLogs"
@REM set "PATH=%NODE_HOME%;%MONGO_HOME%\bin;%PATH%"

@REM :: === Create data and log folders if missing ===
@REM if not exist "%DATA_DIR%" mkdir "%DATA_DIR%"
@REM if not exist "%LOG_DIR%" mkdir "%LOG_DIR%"

@REM :: === Clean up old lock/journal files for portability ===
@REM if exist "%DATA_DIR%\mongod.lock" del "%DATA_DIR%\mongod.lock"
@REM if exist "%DATA_DIR%\journal" rmdir /s /q "%DATA_DIR%\journal"

@REM :: === Start MongoDB locally on USB ===
@REM echo [0/3] Starting portable MongoDB server...
@REM start "MongoDB Server" "%MONGO_HOME%\bin\mongod.exe" ^
@REM   --dbpath "%DATA_DIR%" ^
@REM   --port 27017 ^
@REM   --bind_ip 127.0.0.1 ^
@REM   --logpath "%LOG_DIR%\mongo.log" ^
@REM   --logappend ^
@REM   --nojournal

@REM :: === Start Backend ===
@REM echo [1/3] Starting Backend (Node index.js)...
@REM cd /d "%ROOT%Backend"
@REM start "Backend Server" "%NODE_HOME%\node.exe" index.js

@REM :: === Start Frontend ===
@REM echo [2/3] Starting Frontend (npm run dev)...
@REM cd /d "%ROOT%Frontend"
@REM start "Frontend App" "%NODE_HOME%\node.exe" "%NODE_HOME%\node_modules\npm\bin\npm-cli.js" run dev

@REM echo.
@REM echo ==========================================
@REM echo Everything is running!
@REM echo MongoDB:  mongodb://localhost:27017
@REM echo Backend:  http://localhost:5000
@REM echo Frontend: http://localhost:5173
@REM echo ------------------------------------------
@REM echo MongoDB data stored at: %DATA_DIR%
@REM echo Logs stored at: %LOG_DIR%
@REM echo ==========================================
@REM echo.

@REM pause
