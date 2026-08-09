@echo off
echo ============================================
echo  AI-Powered Resume Job Recommendation System
echo  Final Year Engineering Project - Review 1
echo ============================================
echo.

set NODE_PATH=node_env\node-v20.18.0-win-x64
set PYTHON_PATH=C:\Users\tjasw\Python311\tools

echo [1/2] Starting FastAPI Backend on http://127.0.0.1:8000 ...
start "Backend - FastAPI" cmd /k "%PYTHON_PATH%\python.exe -m uvicorn Backend.main:app --host 127.0.0.1 --port 8000 --reload"

timeout /t 3 >nul

echo [2/2] Starting React Frontend on http://localhost:5173 ...
set PATH=%NODE_PATH%;%PATH%
cd Frontend
start "Frontend - Vite React" cmd /k "npm run dev"

echo.
echo ============================================
echo  Both servers starting!
echo  Frontend: http://localhost:5173
echo  Backend:  http://127.0.0.1:8000
echo  API Docs: http://127.0.0.1:8000/docs
echo ============================================
pause
