import { TrendingUp, Info, Calculator } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RisultatoCalcolo, Scaglione } from '@/types/patrimonio';
import { formatCurrency, formatNumber } from '@/utils/patrimonioCalculator';

interface RisultatoDisplayProps {
  risultato: RisultatoCalcolo;
  scaglioni: Scaglione[];
}

export const RisultatoDisplay = ({ risultato, scaglioni }: RisultatoDisplayProps) => {
  const scaglioneApplicato = scaglioni[risultato.scaglioneApplicato];

  return (
    <Card className="shadow-[var(--shadow-financial)] border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-primary">
              <TrendingUp className="h-5 w-5" />
              Risultato del Calcolo
            </CardTitle>
            <CardDescription>
              Dettaglio completo del calcolo patrimoniale
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
            Scaglione {risultato.scaglioneApplicato}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Risultato Principale */}
        <div className="text-center p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Importo Totale Calcolato
          </h3>
          <div className="text-4xl font-bold text-primary mb-2">
            {formatCurrency(risultato.totaleCalcolato)}
          </div>
          <p className="text-sm text-muted-foreground">
            per un patrimonio di {formatCurrency(risultato.patrimonio)}
          </p>
        </div>

        <Separator />

        {/* Dettaglio Scaglione Applicato */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-muted/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Info className="h-4 w-4" />
                Scaglione Applicato
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Descrizione:</span>
                  <span className="font-medium">{scaglioneApplicato.descrizione}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Soglia minima:</span>
                  <span className="font-medium">{formatCurrency(scaglioneApplicato.soglia)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Percentuale:</span>
                  <span className="font-medium">{scaglioneApplicato.percentuale}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Dettaglio Calcolo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Base imponibile:</span>
                  <span className="font-medium">{formatCurrency(risultato.dettaglioCalcolo.baseImponibile)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Rimanente:</span>
                  <span className="font-medium">{formatCurrency(risultato.dettaglioCalcolo.rimanente)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Importo percentuale:</span>
                  <span className="font-medium">{formatCurrency(risultato.dettaglioCalcolo.importoPercentuale)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Formula di Calcolo */}
        <div className="p-4 bg-muted rounded-lg">
          <h4 className="text-sm font-medium mb-2 text-muted-foreground">Formula applicata:</h4>
          <div className="font-mono text-sm bg-background p-3 rounded border">
            <span className="text-accent">Base Imponibile</span>
            <span className="text-muted-foreground"> + </span>
            <span className="text-accent">({formatNumber(risultato.dettaglioCalcolo.rimanente)} × {risultato.dettaglioCalcolo.percentualeApplicata}%)</span>
            <span className="text-muted-foreground"> = </span>
            <span className="text-primary font-bold">{formatCurrency(risultato.totaleCalcolato)}</span>
          </div>
        </div>

        {/* Info aggiuntiva */}
        <div className="flex items-start gap-2 p-3 bg-accent/10 rounded-lg border border-accent/20">
          <Info className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="text-accent font-medium mb-1">Come viene calcolato l'importo:</p>
            <p className="text-muted-foreground text-xs">
              L'importo totale è dato dalla somma della base imponibile dello scaglione 
              più la percentuale applicata sulla parte eccedente la soglia minima dello scaglione.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};