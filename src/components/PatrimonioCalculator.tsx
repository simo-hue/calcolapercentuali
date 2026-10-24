import { useState } from 'react';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { PatrimonioCalculator as CalcolatorePatrimonio } from '@/utils/patrimonioCalculator';
import { ALTERNATIVE_SCAGLIONI, DEFAULT_SCAGLIONI, RisultatoCalcolo } from '@/types/patrimonio';
import { formatCurrency } from '@/utils/patrimonioCalculator';
import { RisultatoDisplay } from './RisultatoDisplay';
import { useToast } from '@/hooks/use-toast';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

import { ModeToggle } from '@/components/mode-toggle';

export const PatrimonioCalculator = () => {
  const [patrimonio, setPatrimonio] = useState<string>('');
  const [risultato, setRisultato] = useState<RisultatoCalcolo | null>(null);
  const [setup, setSetup] = useState<'1' | '2'>('1');
  const { toast } = useToast();
  const scaglioni = setup === '1' ? DEFAULT_SCAGLIONI : ALTERNATIVE_SCAGLIONI;
  const calculator = new CalcolatorePatrimonio(scaglioni);

  const handleCalculate = () => {
    const patrimonioNum = parseFloat(patrimonio.replace(/[^\d.-]/g, ''));

    if (isNaN(patrimonioNum) || patrimonioNum < 0) {
      toast({
        title: "Errore",
        description: "Inserisci un valore valido per il patrimonio",
        variant: "destructive"
      });
      return;
    }

    try {
      const result = calculator.calcolaImporto(patrimonioNum);
      setRisultato(result);

      toast({
        title: "Calcolo completato",
        description: `Importo calcolato: ${formatCurrency(result.totaleCalcolato)}`,
      });
    } catch (error) {
      toast({
        title: "Errore nel calcolo",
        description: error instanceof Error ? error.message : "Errore sconosciuto",
        variant: "destructive"
      });
    }
  };

  const handlePatrimonioChange = (value: string) => {
    // Permetti solo numeri, virgole e punti
    const cleanValue = value.replace(/[^\d.,]/g, '');
    setPatrimonio(cleanValue);
  };

  const handleReset = () => {
    setPatrimonio('');
    setRisultato(null);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center md:h-screen md:w-screen md:overflow-hidden md:bg-background">
      <div className="fixed top-4 right-4 z-50 print:hidden">
        <ModeToggle />
      </div>

      <div className="absolute top-4 left-1/2 z-40 -translate-x-1/2 print:hidden">
        <ToggleGroup
          type="single"
          value={setup}
          onValueChange={(value) => {
            if (value === '1' || value === '2') {
              setSetup(value);
              setRisultato(null);
            }
          }}
          aria-label="Seleziona configurazione"
          className="h-12 w-[min(320px,calc(100vw-7rem))] rounded-full border border-border bg-muted p-1 shadow-sm"
        >
          {(['1', '2'] as const).map((value) => (
            <ToggleGroupItem
              key={value}
              value={value}
              aria-label={`Configurazione ${value}`}
              className="h-full flex-1 rounded-full border-0 text-base font-medium text-muted-foreground shadow-none transition-colors data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm"
            >
              {value}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="w-full max-w-lg md:w-full md:max-w-none md:h-full bg-background md:bg-card md:shadow-none overflow-hidden flex flex-col transition-all duration-500 min-h-screen md:min-h-0 md:rounded-none">

        {/* TOP ROW WRAPPER (Desktop only separation) */}
        <div className="flex flex-col md:flex-row md:shrink-0 md:border-b border-border/50">

          {/* TOP LEFT: Input (Cifra in cima a tutto) */}
          <div className="pt-16 pb-8 px-8 text-center bg-background md:bg-card relative z-10 text-foreground md:w-1/2 md:flex md:flex-col md:justify-center md:pt-8 md:pb-8">
            <div className="mb-2 flex items-center justify-center gap-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest bg-muted px-2 py-1 rounded">
                Patrimonio
              </span>
            </div>

            <div className="relative flex justify-center items-center">
              <span className="text-4xl md:text-5xl text-muted-foreground font-light mr-2 pb-2">
                €
              </span>
              <Input
                id="patrimonio"
                type="text"
                inputMode="decimal"
                pattern="[0-9]*"
                placeholder="0"
                value={patrimonio}
                onChange={(e) => handlePatrimonioChange(e.target.value)}
                className="text-6xl md:text-7xl font-bold h-24 text-center border-none shadow-none bg-transparent focus-visible:ring-0 p-0 placeholder:text-muted-foreground/10 w-full max-w-[300px] text-foreground"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCalculate();
                }}
              />
            </div>

            {/* Main Action - Integrated */}
            <div className="mt-8 flex justify-center gap-3">
              {risultato && (
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="h-12 px-6 rounded-full"
                >
                  Resetta
                </Button>
              )}
              <Button
                onClick={handleCalculate}
                disabled={!patrimonio.trim()}
                className="h-12 px-12 text-lg font-semibold rounded-full shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
              >
                Calcola
              </Button>
            </div>
          </div>

          {/* TOP RIGHT: Result Total (Desktop Only) */}
          <div className="hidden md:flex md:w-1/2 md:items-center md:justify-center md:bg-muted/10 md:border-l border-border/50">
            {risultato ? (
              <div className="flex flex-col items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <span className="text-sm text-muted-foreground font-bold uppercase tracking-widest">
                  Importo Dovuto
                </span>
                <div className="text-6xl font-black text-primary tracking-tighter">
                  {formatCurrency(risultato.totaleCalcolato)}
                </div>
              </div>
            ) : (
              <div className="text-muted-foreground/20 font-light italic">
                Inserisci il patrimonio per calcolare
              </div>
            )}
          </div>

        </div> {/* End of Top Row Wrapper */}

        {/* BOTTOM SECTION: Context (Results or List) */}
        <div className="flex-1 bg-muted/30 border-t border-border/50 p-6 md:p-8 md:overflow-y-auto">
          {/* Result Card (Animated) */}
          {risultato ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">

              {/* Mobile Total Display (Hidden on Desktop) */}
              <div className="bg-background rounded-2xl p-6 border border-border/50 shadow-sm text-center md:hidden">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xs text-muted-foreground font-bold uppercase tracking-widest">
                    Importo Dovuto
                  </span>
                  <div className="text-5xl font-black text-primary tracking-tighter">
                    {formatCurrency(risultato.totaleCalcolato)}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 px-2">
                  <Info className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Dettaglio Calcolo
                  </span>
                </div>
                <RisultatoDisplay
                  risultato={risultato}
                  scaglioni={scaglioni}
                />
              </div>
            </div>
          ) : (
            /* Scaglioni List (Clean) */
            <div className="space-y-4 animate-in fade-in duration-500">
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Configurazione Attuale
                </span>
              </div>

              <div className="divide-y divide-border/50 border border-border/50 bg-background/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm">
                {scaglioni.map((scaglione) => (
                  <div key={scaglione.id} className="flex justify-between items-center p-4 hover:bg-muted/50 transition-colors">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{formatCurrency(scaglione.soglia)}</span>
                      <span className="mx-2 text-muted-foreground/50">→</span>
                      <span>{scaglione.sogliaFine === Infinity ? '∞' : formatCurrency(scaglione.sogliaFine)}</span>
                    </div>
                    <Badge variant="secondary" className="font-bold text-sm">
                      {scaglione.percentuale}%
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
