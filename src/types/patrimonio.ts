export interface Scaglione {
  id: number;
  soglia: number;
  sogliaFine: number;
  percentuale: number;
  descrizione: string;
}

export interface RisultatoCalcolo {
  patrimonio: number;
  totaleCalcolato: number;
  dettaglioCalculi: {
    scaglione: number;
    baseImponibile: number;
    percentuale: number;
    importo: number;
  }[];
}

export const DEFAULT_SCAGLIONI: Scaglione[] = [
  { id: 0, soglia: 1000, sogliaFine: 15000, percentuale: 10, descrizione: "1.000 - 15.000€" },
  { id: 1, soglia: 15000, sogliaFine: 50000, percentuale: 5, descrizione: "15.000 - 50.000€" },  
  { id: 2, soglia: 50000, sogliaFine: 100000, percentuale: 2, descrizione: "50.000 - 100.000€" }, 
  { id: 3, soglia: 100000, sogliaFine: 300000, percentuale: 1.5, descrizione: "100.000 - 300.000€" }, 
  { id: 4, soglia: 300000, sogliaFine: 1000000, percentuale: 1, descrizione: "300.000 - 1.000.000€" }, 
  { id: 5, soglia: 1000000, sogliaFine: Infinity, percentuale: 0.5, descrizione: "Oltre 1.000.000€" }, 
];