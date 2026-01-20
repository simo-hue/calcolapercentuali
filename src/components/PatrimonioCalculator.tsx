import { useState } from 'react';
import { Settings, Info, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { PatrimonioCalculator as CalcolatorePatrimonio } from '@/utils/patrimonioCalculator';
import { DEFAULT_SCAGLIONI, RisultatoCalcolo, Scaglione } from '@/types/patrimonio';
import { formatCurrency } from '@/utils/patrimonioCalculator';
import { ScaglioniConfig } from './ScaglioniConfig';
import { RisultatoDisplay } from './RisultatoDisplay';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { scaglioniService } from '@/services/scaglioniService';

import { ModeToggle } from '@/components/mode-toggle';

export const PatrimonioCalculator = () => {
  const [patrimonio, setPatrimonio] = useState<string>('');
  const [risultato, setRisultato] = useState<RisultatoCalcolo | null>(null);
  const [showConfig, setShowConfig] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Smart Caching Strategy:
  // Fetch Scaglioni from DB.
  // staleTime: Infinity -> The data is considered fresh forever unless explicitly invalidated.
  // This minimizes network requests for a "furbo" fast experience.
  const { data: scaglioni, isLoading } = useQuery({
    queryKey: ['scaglioni'],
    queryFn: scaglioniService.getScaglioni,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24, // Keep in garbage collector for 24 hours
    initialData: DEFAULT_SCAGLIONI, // Show defaults instantly while fetching or if error
  });

  const updateScaglioniMutation = useMutation({
    mutationFn: scaglioniService.updateScaglioni,
    onSuccess: () => {
      // Invalidate cache to force refresh across the app (though we optimistic updated essentially)
      queryClient.invalidateQueries({ queryKey: ['scaglioni'] });
      toast({
        title: "Salvataggio riuscito",
        description: "La configurazione degli scaglioni è stata aggiornata nel database.",
      });
      setRisultato(null); // Reset result
    },
    onError: (error) => {
      console.error("Failed to update:", error);
      toast({
        title: "Errore durante il salvataggio",
        description: "Impossibile aggiornare il database. Riprova.",
        variant: "destructive"
      });
    }
  });

  const calculator = new CalcolatorePatrimonio(scaglioni || DEFAULT_SCAGLIONI);

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

  const handleScaglioniUpdate = (nuoviScaglioni: Scaglione[]) => {
    // Trigger mutation instead of local state
    updateScaglioniMutation.mutate(nuoviScaglioni);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center md:py-12 md:bg-muted/10">
      <div className="fixed top-4 right-4 z-50 print:hidden">
        <ModeToggle />
      </div>

      <div className="w-full max-w-lg bg-background md:bg-card md:rounded-3xl md:shadow-2xl overflow-hidden flex flex-col transition-all duration-500 min-h-screen md:min-h-[auto]">

        {/* TOP SECTION: Input (Cifra in cima a tutto) */}
        <div className="pt-16 pb-8 px-8 text-center bg-background md:bg-card relative z-10 text-foreground">
          <div className="mb-2 flex items-center justify-center gap-2">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest bg-muted px-2 py-1 rounded">
              Patrimonio
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowConfig(true)}
              className="h-6 w-6 text-muted-foreground hover:text-primary absolute right-6 top-6"
            >
              <Settings className="w-4 h-4" />
            </Button>
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
              disabled={!patrimonio.trim() || isLoading}
              className="h-12 px-12 text-lg font-semibold rounded-full shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Calcola"}
            </Button>
          </div>
        </div>

        {/* BOTTOM SECTION: Context (Results or List) */}
        <div className="flex-1 bg-muted/30 border-t border-border/50 p-6 md:p-8">
          {/* Result Card (Animated) */}
          {risultato ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              <div className="bg-background rounded-2xl p-6 border border-border/50 shadow-sm text-center">
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
                  scaglioni={scaglioni || DEFAULT_SCAGLIONI}
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
                {isLoading && <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />}
              </div>

              <div className="divide-y divide-border/50 border border-border/50 bg-background/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm">
                {(scaglioni || DEFAULT_SCAGLIONI).map((scaglione) => (
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

              <div className="text-center pt-4">
                <p className="text-xs text-muted-foreground">
                  Modifica gli scaglioni cliccando l'icona <Settings className="w-3 h-3 inline align-baseline" /> in alto a destra.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Configurazione */}
        {showConfig && (
          <ScaglioniConfig
            scaglioni={scaglioni || DEFAULT_SCAGLIONI}
            onSave={handleScaglioniUpdate}
            onClose={() => setShowConfig(false)}
          />
        )}
      </div>
    </div>
  );
};