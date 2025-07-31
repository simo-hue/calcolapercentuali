import { Scaglione, RisultatoCalcolo } from '@/types/patrimonio';

export class PatrimonioCalculator {
  private scaglioni: Scaglione[];

  constructor(scaglioni: Scaglione[]) {
    this.scaglioni = [...scaglioni].sort((a, b) => a.soglia - b.soglia);
  }

  /**
   * Trova lo scaglione appropriato per il patrimonio dato
   */
  private trovaScaglione(patrimonio: number): number {
    for (let i = this.scaglioni.length - 1; i >= 0; i--) {
      if (patrimonio >= this.scaglioni[i].soglia) {
        return i;
      }
    }
    return 0;
  }

  /**
   * Calcola l'importo finale basato sul patrimonio e sui scaglioni
   */
  calcolaImporto(patrimonio: number): RisultatoCalcolo {
    if (patrimonio < 0) {
      throw new Error('Il patrimonio non può essere negativo');
    }

    const indiceScaglione = this.trovaScaglione(patrimonio);
    const scaglione = this.scaglioni[indiceScaglione];
    
    const rimanente = patrimonio - scaglione.soglia;
    const importoPercentuale = Math.round((rimanente * scaglione.percentuale) / 100);
    const totaleCalcolato = scaglione.baseImponibile + importoPercentuale;

    return {
      patrimonio,
      scaglioneApplicato: indiceScaglione,
      totaleCalcolato,
      dettaglioCalcolo: {
        baseImponibile: scaglione.baseImponibile,
        rimanente: Math.max(0, rimanente),
        percentualeApplicata: scaglione.percentuale,
        importoPercentuale
      }
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