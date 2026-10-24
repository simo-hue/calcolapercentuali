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
    <div
      className="relative flex min-h-[100dvh] flex-col items-center bg-background md:h-[100dvh] md:w-screen md:overflow-hidden"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div className="relative z-50 flex w-full max-w-lg items-center justify-center px-3 py-2 print:hidden md:absolute md:left-1/2 md:top-4 md:w-auto md:max-w-none md:-translate-x-1/2 md:px-0 md:py-0">
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
          className="h-11 w-[min(20rem,calc(100vw-6.5rem))] rounded-full border border-border bg-muted p-1 shadow-sm md:h-12"
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
        <div className="absolute right-3 top-1/2 -translate-y-1/2 md:fixed md:right-4 md:top-4 md:translate-y-0">
          <ModeToggle />
        </div>
      </div>

      <div className="flex w-full max-w-lg flex-1 flex-col overflow-hidden bg-background transition-all duration-500 md:h-full md:max-w-none md:flex-none md:bg-card md:shadow-none">

        {/* TOP ROW WRAPPER (Desktop only separation) */}
        <div className="flex flex-col md:flex-row md:shrink-0 md:border-b border-border/50">

          {/* TOP LEFT: Input (Cifra in cima a tutto) */}
          <div className="relative z-10 bg-background px-6 pb-6 pt-4 text-center text-foreground md:flex md:w-1/2 md:flex-col md:justify-center md:bg-card md:px-8 md:pb-8 md:pt-8">
            <div className="mb-2 flex items-center justify-center gap-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest bg-muted px-2 py-1 rounded">
                Patrimonio
              </span>
            </div>

            <div className="relative flex justify-center items-center">
              <span className="mr-2 pb-1 text-3xl font-light text-muted-foreground md:pb-2 md:text-5xl">
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
                className="h-20 w-full max-w-[260px] border-none bg-transparent p-0 text-center text-5xl font-bold text-foreground shadow-none placeholder:text-muted-foreground/10 focus-visible:ring-0 md:h-24 md:max-w-[300px] md:text-7xl"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCalculate();
                }}
              />
            </div>

            {/* Main Action - Integrated */}
            <div className="mt-4 flex justify-center gap-3 md:mt-8">
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
                className="h-12 min-w-44 rounded-full px-8 text-base font-semibold shadow-lg shadow-primary/20 transition-transform hover:scale-[1.02] md:px-12 md:text-lg"
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
        <div className="flex-1 border-t border-border/50 bg-muted/30 p-4 pb-6 md:overflow-y-auto md:p-8">
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

              <div className="divide-y divide-border/50 overflow-hidden rounded-xl border border-border/50 bg-background/50 shadow-sm backdrop-blur-sm">
                {scaglioni.map((scaglione) => (
                  <div key={scaglione.id} className="flex min-h-12 items-center justify-between gap-3 px-3 py-3 transition-colors hover:bg-muted/50 sm:px-4">
                    <div className="min-w-0 text-xs text-muted-foreground sm:text-sm">
                      <span className="font-medium text-foreground">{formatCurrency(scaglione.soglia)}</span>
                      <span className="mx-1.5 text-muted-foreground/50 sm:mx-2">→</span>
                      <span className="whitespace-nowrap">{scaglione.sogliaFine === Infinity ? '∞' : formatCurrency(scaglione.sogliaFine)}</span>
                    </div>
                    <Badge variant="secondary" className="shrink-0 font-bold text-xs sm:text-sm">
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
