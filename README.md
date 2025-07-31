# Calcolatore Patrimoniale

Un'applicazione web moderna per il calcolo degli importi dovuti in base a scaglioni patrimoniali configurabili, con sistema di calcolo incrementale per una maggiore precisione e trasparenza.

## 📋 Panoramica

Il **Calcolatore Patrimoniale** è uno strumento professionale che permette di calcolare importi basati su scaglioni patrimoniali progressivi. L'applicazione implementa un sistema di calcolo incrementale dove ogni scaglione contribuisce proporzionalmente al calcolo finale, garantendo massima precisione e trasparenza nel processo di calcolo.

## 🎯 Caratteristiche Principali

### ✨ Calcolo Incrementale Avanzato
- **Sistema progressivo**: Ogni scaglione contribuisce solo per la propria fascia di competenza
- **Trasparenza totale**: Visualizzazione dettagliata di ogni contributo per scaglione
- **Precisione**: Calcoli arrotondati per scaglione per evitare errori di approssimazione

### ⚙️ Configurazione Flessibile
- **Scaglioni personalizzabili**: Modifica completa di soglie, fasce e percentuali
- **Gestione dinamica**: Aggiungi, rimuovi e riordina scaglioni in tempo reale
- **Validazione automatica**: Controlli di integrità sui dati inseriti
- **Persistenza**: Le configurazioni vengono mantenute durante la sessione

### 🎨 Interfaccia Moderna
- **Design responsivo**: Ottimizzato per desktop, tablet e mobile
- **Tema professionale**: Palette colori dedicata al settore finanziario
- **Feedback immediato**: Toast notifications per ogni operazione
- **Accessibilità**: Interfaccia conforme agli standard di usabilità

## 🔢 Sistema di Calcolo

### Logica Incrementale

Il calcolo viene eseguito applicando ogni scaglione solo alla porzione di patrimonio che rientra nella sua fascia specifica:

```
Esempio con patrimonio di 75.000€:

Scaglione 1 (1.000 - 15.000€): 15.000€ × 10% = 1.500€
Scaglione 2 (15.001 - 50.000€): 35.000€ × 5% = 1.750€  
Scaglione 3 (50.001 - 100.000€): 25.000€ × 2% = 500€

Totale: 1.500€ + 1.750€ + 500€ = 3.750€
```

### Scaglioni di Default

| Fascia Patrimoniale | Percentuale | Descrizione |
|-------------------|-------------|-------------|
| 1.000 - 15.000€ | 10,00% | Primo scaglione |
| 15.001 - 50.000€ | 5,00% | Secondo scaglione |
| 50.001 - 100.000€ | 2,00% | Terzo scaglione |
| 100.001 - 300.000€ | 1,50% | Quarto scaglione |
| 300.001 - 1.000.000€ | 1,00% | Quinto scaglione |
| Oltre 1.000.000€ | 0,50% | Scaglione massimo |

## 🚀 Funzionalità

### Calcolo Principale
- **Input patrimonio**: Campo dedicato per inserimento valore patrimoniale
- **Calcolo automatico**: Elaborazione immediata con validazione input
- **Reset rapido**: Azzeramento dei campi e risultati con un click
- **Calcolo da tastiera**: Supporto per tasto Invio

### Configurazione Scaglioni
- **Modifica parametri**: Soglie iniziali, finali e percentuali
- **Gestione completa**: Aggiungi, rimuovi, riordina scaglioni
- **Validazione avanzata**: Controllo coerenza soglie e valori
- **Ordinamento automatico**: Gli scaglioni vengono ordinati per soglia crescente

### Visualizzazione Risultati
- **Importo finale**: Evidenziato con formattazione currency italiana
- **Dettaglio per scaglione**: Breakdown completo del calcolo
- **Formula esplicita**: Visualizzazione della formula applicata
- **Informazioni aggiuntive**: Spiegazione del metodo di calcolo

### Panoramica Scaglioni
- **Tabella riassuntiva**: Vista d'insieme degli scaglioni attivi
- **Formattazione professionale**: Valori formattati per valuta italiana
- **Badge identificativi**: Numerazione chiara degli scaglioni

## 🛠️ Stack Tecnologico

### Frontend
- **React 18**: Libreria per interfacce utente moderne
- **TypeScript**: Tipizzazione statica per maggiore robustezza
- **Tailwind CSS**: Framework CSS utility-first per styling
- **Lucide React**: Icone moderne e coerenti

### Componenti UI
- **Radix UI**: Componenti accessibili e personalizzabili
- **shadcn/ui**: Sistema di design components
- **Sonner**: Toast notifications eleganti
- **Custom Design System**: Tokens semantici per coerenza visiva

### Strumenti di Sviluppo
- **Vite**: Build tool veloce e moderno
- **ESLint**: Linting del codice per qualità
- **PostCSS**: Elaborazione CSS avanzata

## 📱 Utilizzo

### Calcolo Base
1. **Inserisci il patrimonio** nel campo dedicato
2. **Clicca "Calcola"** o premi Invio per elaborare
3. **Visualizza il risultato** con dettaglio completo del calcolo
4. **Usa "Reset"** per pulire i campi

### Configurazione Scaglioni
1. **Apri la configurazione** tramite il pulsante "Configura Scaglioni"
2. **Modifica i parametri** esistenti nei campi dedicati
3. **Aggiungi nuovi scaglioni** con il pulsante "Aggiungi Nuovo Scaglione"
4. **Rimuovi o riordina** usando i controlli per ogni scaglione
5. **Salva le modifiche** per applicare la nuova configurazione

### Validazioni
- **Patrimonio**: Deve essere un valore numerico positivo
- **Soglie scaglioni**: Devono essere in ordine crescente
- **Percentuali**: Devono essere valori positivi
- **Soglie finali**: Possono essere infinite per l'ultimo scaglione

## 📊 Formattazione

### Valute
- **Standard italiano**: Formato EUR con separatori di migliaia
- **Precisione**: Valori arrotondati all'euro più vicino
- **Simbolo**: € posizionato secondo convenzioni italiane

### Numeri
- **Separatori**: Punto per migliaia, virgola per decimali
- **Locale**: Formattazione italiana (it-IT)

## 🎨 Design System

### Colori Tematici
- **Palette finanziaria**: Colori professionali per applicazioni economiche
- **Contrasti elevati**: Ottimizzazione per accessibilità
- **Gradazioni semantiche**: Primary, accent, muted per gerarchia visiva

### Tipografia
- **Font system**: Utilizzo di font di sistema per performance
- **Gerarchia chiara**: Dimensioni e pesi differenziati per ruoli
- **Leggibilità**: Ottimizzazione per lettura su diversi dispositivi

### Componenti
- **Coerenza**: Design system uniforme per tutti gli elementi
- **Interattività**: Stati hover, focus e attivi ben definiti
- **Responsività**: Adattamento automatico a diverse dimensioni schermo

## 🔧 Architettura del Codice

### Struttura dei Tipi
```typescript
interface Scaglione {
  id: number;
  soglia: number;
  sogliaFine: number;
  percentuale: number;
  descrizione: string;
}

interface RisultatoCalcolo {
  patrimonio: number;
  totaleCalcolato: number;
  dettaglioCalculi: Array<{
    scaglione: number;
    baseImponibile: number;
    percentuale: number;
    importo: number;
  }>;
}
```

### Componenti Principali
- **PatrimonioCalculator**: Componente principale con logica di calcolo
- **ScaglioniConfig**: Dialog per configurazione scaglioni
- **RisultatoDisplay**: Visualizzazione dettagliata dei risultati

### Utilities
- **PatrimonioCalculator Class**: Logica di business incapsulata
- **Format Functions**: Formattazione valute e numeri italiani
- **Validation**: Controlli di integrità dei dati

## 🚀 Sviluppo e Deployment

### Ambiente di Sviluppo

**Requisiti**: Node.js & npm installati - [installa con nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

```sh
# Clona il repository
git clone <YOUR_GIT_URL>

# Entra nella directory del progetto
cd <YOUR_PROJECT_NAME>

# Installa le dipendenze
npm i

# Avvia il server di sviluppo
npm run dev
```