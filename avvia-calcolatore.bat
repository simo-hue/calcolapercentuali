@echo off
cd /d "%~dp0"
echo Avvio del Calcolatore Patrimoniale...
echo.

echo Tentativo di apertura nel browser...
start "" "%CD%\dist\index.html" 2>nul

if errorlevel 1 (
    echo ATTENZIONE: Non sono riuscito ad aprire automaticamente il browser.
    echo Per usare l'applicazione, apri manualmente il file:
    echo %CD%\dist\index.html
) else (
    echo Applicazione avviata nel browser!
)

echo.
pause