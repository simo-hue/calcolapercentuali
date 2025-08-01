@echo off
cd /d "%~dp0"
echo Avvio del Calcolatore Patrimoniale...
echo.
echo L'applicazione si aprirà nel tuo browser predefinito.
echo Per chiudere l'applicazione, chiudi semplicemente il browser.
echo.
start "" "dist/index.html"
echo.
echo Applicazione avviata! Controlla il browser.
pause