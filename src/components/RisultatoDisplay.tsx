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
              Calcolo incrementale su scaglioni patrimoniali
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
            {risultato.dettaglioCalculi.length} Scaglioni Applicati
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Risultato Principale */}
        <div className="text-center p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20 dark:from-primary/20 dark:to-accent/20">
          <h3 className="text-sm font-medium text-muted-foreground mb-2 dark:text-foreground/70">
            Importo Totale Calcolato
          </h3>
          <div className="text-4xl font-bold text-primary mb-2 dark:text-primary/90">
            {formatCurrency(risultato.totaleCalcolato)}
          </div>
          <p className="text-sm text-muted-foreground dark:text-foreground/60">
            per un patrimonio di <span className="text-foreground dark:text-foreground/90 font-medium">{formatCurrency(risultato.patrimonio)}</span>
          </p>
        </div>

        <Separator className="dark:bg-border/60" />

        {/* Dettaglio Scaglioni Applicati */}
        <div className="space-y-3">
          <h4 className="font-semibold flex items-center gap-2 text-foreground/80">
            <Calculator className="h-4 w-4" />
            Dettaglio del Calcolo Incrementale
          </h4>

          <div className="space-y-3">
            {risultato.dettaglioCalculi.map((dettaglio, index) => (
              <Card key={index} className="bg-muted/50 dark:bg-muted/30 border-none">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="bg-background dark:bg-background/80 dark:text-foreground">
                      {scaglioni[dettaglio.scaglione]?.descrizione}
                    </Badge>
                    <span className="font-bold text-primary dark:text-primary/90">
                      {formatCurrency(dettaglio.importo)}
                    </span>
                  </div>

                  <div className="text-sm text-muted-foreground dark:text-foreground/70">
                    Base imponibile: <span className="font-medium text-foreground dark:text-foreground/90">{formatCurrency(dettaglio.baseImponibile)}</span> × {dettaglio.percentuale}%
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Formula di Calcolo */}
        <div className="p-4 bg-muted/70 rounded-lg dark:bg-muted/40">
          <h4 className="text-sm font-medium mb-2 text-muted-foreground dark:text-foreground/70">Formula di calcolo incrementale:</h4>
          <div className="font-mono text-sm bg-background p-3 rounded border dark:border-border/50 dark:bg-card">
            {risultato.dettaglioCalculi.map((dettaglio, index) => (
              <span key={index}>
                {index > 0 && <span className="text-muted-foreground"> + </span>}
                <span className="text-accent dark:text-accent-foreground">{formatCurrency(dettaglio.importo)}</span>
              </span>
            ))}
            <span className="text-muted-foreground"> = </span>
            <span className="text-primary font-bold">{formatCurrency(risultato.totaleCalcolato)}</span>
          </div>
        </div>

        {/* Info aggiuntiva */}
        <div className="flex items-start gap-3 p-4 bg-accent/10 rounded-lg border border-accent/20 dark:bg-accent/20 dark:border-accent/30">
          <Info className="h-5 w-5 text-accent mt-0.5 flex-shrink-0 dark:text-accent-foreground" />
          <div className="text-sm">
            <p className="text-accent font-semibold mb-1 dark:text-accent-foreground">Come viene calcolato l'importo:</p>
            <p className="text-muted-foreground leading-relaxed dark:text-foreground/80">
              Il calcolo è incrementale: ogni scaglione contribuisce con la sua percentuale
              solo per la parte di patrimonio che rientra in quella fascia. Gli importi di tutti
              gli scaglioni applicabili vengono poi sommati per ottenere il totale.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};