# TO SIMO DO

## 1. Configurazione Segreti (OBSOLETA)
L'errore `Uncaught Error: Missing Supabase Environment Variables` avviene perché GitHub non conosce le chiavi di Supabase.

> Questa configurazione non è più necessaria: la versione corrente non usa Supabase né la password degli scaglioni.

1.  Vai su GitHub: `Settings` > `Secrets and variables` > `Actions`.
2.  Clicca su **New repository secret**.
3.  Aggiungi le seguenti 3 variabili (copiale dal tuo file `.env.local` che hai sul tuo computer):
    *   **Name**: `VITE_SUPABASE_URL`
        *   **Value**: (copia il valore da `.env.local`)
    *   **Name**: `VITE_SUPABASE_ANON_KEY`
        *   **Value**: (copia il valore da `.env.local`)
    *   **Name**: `VITE_PASSWORD_SCAGLIONI`
        *   **Value**: `root`

## 2. GitHub Pages Deployment
1.  **Verifica**:
    -   Vai nella tab **Actions** su GitHub.
    -   La nuova versione è stata pubblicata su `https://simo-hue.github.io/calcolapercentuali/`.
2.  **PWA Icons**:
    -   Ho generato delle icone segnaposto in `public/pwa-192x192.png` e `public/pwa-512x512.png`.
    -   Sostituiscile con le icone reali del tuo logo quando puoi (mantieni i nomi dei file o aggiorna `vite.config.ts`).

## 3. GitHub Pages deployment (COMPLETATO)
La pubblicazione è attiva su [simo-hue.github.io/calcolapercentuali](https://simo-hue.github.io/calcolapercentuali/). Il vecchio indirizzo `servizipertribunali.github.io/calcolapercentuali/` è un deployment distinto e mostra la versione precedente.

