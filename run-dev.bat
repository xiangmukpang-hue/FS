@echo off
set PATH=%PATH%;C:\Program Files\nodejs
cd /d "%~dp0"
call npm run dev -- --port 5181 --strictPort
