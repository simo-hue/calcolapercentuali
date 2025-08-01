#!/bin/bash
cd "$(dirname "$0")"
echo "Avvio del Calcolatore Patrimoniale..."
echo ""
echo "L'applicazione si aprirà nel tuo browser predefinito."
echo ""

# Apre il file HTML nel browser predefinito su Mac
open "dist/index.html" 2>/dev/null || python3 -m http.server 8080 -d dist &
sleep 2
[[ $? -eq 0 ]] && open "http://localhost:8080" 2>/dev/null

echo "Applicazione avviata! Controlla il browser."
echo "Se non si è aperto, vai manualmente su: file://$(pwd)/dist/index.html"