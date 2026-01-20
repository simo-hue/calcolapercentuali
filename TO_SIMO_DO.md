# TO SIMO DO

## 1. Configurazione Segreti (URGENTE)
L'errore `Uncaught Error: Missing Supabase Environment Variables` avviene perché GitHub non conosce le chiavi di Supabase.

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
1.  **Commit and Push**:
    ```bash
    git add .
    git commit -m "chore: add secrets to workflow"
    git push origin main
    ```

2.  **Verifica**:
    -   Vai nella tab **Actions** su GitHub.
    -   Controlla che il nuovo workflow (attivato dal push) finisca con successo.
3.  **PWA Icons**:
    -   Ho generato delle icone segnaposto in `public/pwa-192x192.png` e `public/pwa-512x512.png`.
    -   Sostituiscile con le icone reali del tuo logo quando puoi (mantieni i nomi dei file o aggiorna `vite.config.ts`).

