@echo off
echo 🚀 Starting Ablespace Scraping System...
echo.

echo 📦 Starting MongoDB...
start "MongoDB" cmd /k "mongod --dbpath C:\data\db --port 27017"

echo ⏳ Waiting for MongoDB to start...
timeout /t 5 /nobreak >nul

echo 🔧 Starting Backend API...
start "Backend" cmd /k "cd /d %~dp0 && npm start"

echo ⏳ Waiting for Backend to start...
timeout /t 3 /nobreak >nul

echo 🌐 Starting Frontend...
start "Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo ✅ All services started!
echo 📱 Frontend: http://localhost:3000
echo 🔧 Backend API: http://localhost:3003  
echo 📚 API Docs: http://localhost:3003/api
echo.
echo Press any key to stop all services...
pause >nul

echo 🛑 Stopping all services...
taskkill /f /im node.exe
taskkill /f /im mongod.exe
echo Done!
