import { Scaglione, RisultatoCalcolo } from '@/types/patrimonio';

export class PatrimonioCalculator {
  private scaglioni: Scaglione[];

  constructor(scaglioni: Scaglione[]) {
    this.scaglioni = [...scaglioni].sort((a, b) => a.soglia - b.soglia);
  }

  /**
   * Calcola l'importo per ogni scaglione in modo incrementale
   */
  private calcolaScaglioni(patrimonio: number): {scaglione: number, baseImponibile: number, percentuale: number, importo: number}[] {
    const dettagli: {scaglione: number, baseImponibile: number, percentuale: number, importo: number}[] = [];
    
    for (let i = 0; i < this.scaglioni.length; i++) {
      const scaglione = this.scaglioni[i];
      
      // Se il patrimonio è minore della soglia minima, non applico questo scaglione
      if (patrimonio < scaglione.soglia) {
        break;
      }
      
      // Calcolo la base imponibile per questo scaglione
      const baseMinima = scaglione.soglia;
      const baseMassima = Math.min(patrimonio, scaglione.sogliaFine);
      const baseImponibile = baseMassima - baseMinima + 1;
      
      // Se la base imponibile è positiva, calcolo l'importo
      if (baseImponibile > 0) {
        const importo = Math.round((baseImponibile * scaglione.percentuale) / 100);
        dettagli.push({
          scaglione: i,
          baseImponibile,
          percentuale: scaglione.percentuale,
          importo
        });
      }
      
      // Se ho raggiunto il massimo per questo scaglione, continuo
      if (patrimonio <= scaglione.sogliaFine) {
        break;
      }
    }
    
    return dettagli;
  }

  /**
   * Calcola l'importo finale basato sul patrimonio e sui scaglioni (incrementale)
   */
  calcolaImporto(patrimonio: number): RisultatoCalcolo {
    if (patrimonio < 0) {
      throw new Error('Il patrimonio non può essere negativo');
    }

    const dettaglioCalculi = this.calcolaScaglioni(patrimonio);
    const totaleCalcolato = dettaglioCalculi.reduce((totale, dettaglio) => totale + dettaglio.importo, 0);

    return {
      patrimonio,
      totaleCalcolato,
      dettaglioCalculi
    };
  }

  /**
   * Ottiene la descrizione dello scaglione
   */
  getDescrizioneScaglione(indice: number): string {
    return this.scaglioni[indice]?.descrizione || 'Scaglione non trovato';
  }

  /**
   * Ottiene tutti gli scaglioni
   */
  getScaglioni(): Scaglione[] {
    return [...this.scaglioni];
  }

  /**
   * Aggiorna gli scaglioni
   */
  updateScaglioni(nuoviScaglioni: Scaglione[]): void {
    this.scaglioni = [...nuoviScaglioni].sort((a, b) => a.soglia - b.soglia);
  }
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumber = (number: number): string => {
  return new Intl.NumberFormat('it-IT').format(number);
};