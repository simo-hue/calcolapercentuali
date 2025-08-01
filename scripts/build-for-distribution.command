#!/bin/bash
cd "$(dirname "$0")/.."
echo "Creazione della build per distribuzione locale..."
echo ""

# Controlla se npm è installato
if ! command -v npm &> /dev/null; then
    echo "ERRORE: npm non è installato. Installa Node.js prima di continuare."
    echo "Scarica Node.js da: https://nodejs.org/"
    read -p "Premi INVIO per uscire..."
    exit 1
fi

# Esegue la build
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "Build completata! I file sono pronti nella cartella 'dist'"
    echo ""
    echo "Per avviare l'applicazione, apri il file 'avvia-calcolatore.command'"
else
    echo ""
    echo "ERRORE durante la build. Controlla i messaggi sopra."
fi

echo ""
read -p "Premi INVIO per continuare..."