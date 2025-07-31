export interface Scaglione {
  id: number;
  soglia: number;
  baseImponibile: number;
  percentuale: number;
  descrizione: string;
}

export interface RisultatoCalcolo {
  patrimonio: number;
  scaglioneApplicato: number;
  totaleCalcolato: number;
  dettaglioCalcolo: {
    baseImponibile: number;
    rimanente: number;
    percentualeApplicata: number;
    importoPercentuale: number;
  };
}

export const DEFAULT_SCAGLIONI: Scaglione[] = [
  { id: 0, soglia: 0, baseImponibile: 500, percentuale: 0, descrizione: "0 - 20.000€" },
  { id: 1, soglia: 20000, baseImponibile: 500, percentuale: 2.5, descrizione: "20.000 - 30.000€" },
  { id: 2, soglia: 30000, baseImponibile: 750, percentuale: 3, descrizione: "30.000 - 40.000€" },
  { id: 3, soglia: 40000, baseImponibile: 1150, percentuale: 4, descrizione: "40.000 - 50.000€" },
  { id: 4, soglia: 50000, baseImponibile: 1550, percentuale: 2, descrizione: "50.000 - 100.000€" },
  { id: 5, soglia: 100000, baseImponibile: 2550, percentuale: 1.5, descrizione: "100.000 - 300.000€" },
  { id: 6, soglia: 300000, baseImponibile: 5500, percentuale: 1, descrizione: "300.000 - 1.000.000€" },
  { id: 7, soglia: 1000000, baseImponibile: 12550, percentuale: 0.5, descrizione: "Oltre 1.000.000€" },
];