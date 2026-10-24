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
    -   Dopo aver abilitato Pages, usa **Re-run jobs** sull'esecuzione fallita. Il commit `9d209bc` è già su `main`.
2.  **PWA Icons**:
    -   Ho generato delle icone segnaposto in `public/pwa-192x192.png` e `public/pwa-512x512.png`.
    -   Sostituiscile con le icone reali del tuo logo quando puoi (mantieni i nomi dei file o aggiorna `vite.config.ts`).

## 3. Abilitare GitHub Pages per il workflow corrente
Il workflow compila e carica correttamente l'artefatto, ma GitHub non ha ancora abilitato Pages per questo repository. La richiesta all'API Pages restituisce `404`, che conferma che il sito Pages non è configurato.

1. Apri [Settings → Pages](https://github.com/simo-hue/calcolapercentuali/settings/pages) nel repository.
2. In **Build and deployment**, imposta **Source** su **GitHub Actions** e salva.
3. Torna in **Actions** e seleziona **Re-run jobs** sull'esecuzione fallita.
4. Verifica che `build` e `deploy` terminino correttamente. Il sito sarà disponibile su [simo-hue.github.io/calcolapercentuali](https://simo-hue.github.io/calcolapercentuali/).

