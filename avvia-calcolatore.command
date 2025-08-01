#!/bin/bash
cd "$(dirname "$0")"
echo "Avvio del Calcolatore Patrimoniale..."
echo ""

# Controlla se la cartella dist esiste
if [ ! -d "dist" ]; then
    echo "ERRORE: Cartella 'dist' non trovata."
    echo "Esegui prima 'scripts/build-for-distribution.command' per creare la build."
    read -p "Premi INVIO per uscire..."
    exit 1
fi

# Controlla se il file index.html esiste in dist
if [ ! -f "dist/index.html" ]; then
    echo "ERRORE: File 'dist/index.html' non trovato."
    echo "Esegui prima 'scripts/build-for-distribution.command' per creare la build."
    read -p "Premi INVIO per uscire..."
    exit 1
fi

echo "Avvio del server locale..."
echo "L'applicazione si aprirà automaticamente nel browser."
echo ""

# Avvia il server HTTP e apre il browser
python3 -m http.server 8080 -d dist &
SERVER_PID=$!

# Aspetta un momento per il server
sleep 2

# Apre il browser
open "http://localhost:8080"

echo "Applicazione avviata su: http://localhost:8080"
echo "Per chiudere l'applicazione, chiudi questa finestra del terminale."
echo ""
echo "Premi CTRL+C per fermare il server..."

# Aspetta che l'utente chiuda il server
wait $SERVER_PID