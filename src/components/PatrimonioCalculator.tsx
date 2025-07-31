import { useState } from 'react';
import { Calculator, Settings, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { PatrimonioCalculator as CalcolatorePatrimonio } from '@/utils/patrimonioCalculator';
import { DEFAULT_SCAGLIONI, RisultatoCalcolo, Scaglione } from '@/types/patrimonio';
import { formatCurrency, formatNumber } from '@/utils/patrimonioCalculator';
import { ScaglioniConfig } from './ScaglioniConfig';
import { RisultatoDisplay } from './RisultatoDisplay';
import { useToast } from '@/hooks/use-toast';

export const PatrimonioCalculator = () => {
  const [patrimonio, setPatrimonio] = useState<string>('');
  const [risultato, setRisultato] = useState<RisultatoCalcolo | null>(null);
  const [scaglioni, setScaglioni] = useState<Scaglione[]>(DEFAULT_SCAGLIONI);
  const [showConfig, setShowConfig] = useState(false);
  const { toast } = useToast();

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

  const handleScaglioniUpdate = (nuoviScaglioni: Scaglione[]) => {
    setScaglioni(nuoviScaglioni);
    setRisultato(null); // Reset del risultato quando cambiano i parametri
    toast({
      title: "Scaglioni aggiornati",
      description: "Le modifiche sono state applicate con successo",
    });
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calculator className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">
              Calcolatore Patrimoniale
            </h1>
          </div>
          <p className="text-muted-foreground">
            Calcola l'importo dovuto in base agli scaglioni patrimoniali configurabili
          </p>
        </div>

        {/* Main Calculator Card */}
        <Card className="shadow-[var(--shadow-card)]">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Inserimento Patrimonio
                </CardTitle>
                <CardDescription>
                  Inserisci il valore del patrimonio liquido disponibile
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowConfig(true)}
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Configura Scaglioni
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="patrimonio" className="text-sm font-medium">
                Patrimonio Liquido (€)
              </Label>
              <div className="flex gap-2">
                <Input
                  id="patrimonio"
                  type="text"
                  placeholder="Es: 75000"
                  value={patrimonio}
                  onChange={(e) => handlePatrimonioChange(e.target.value)}
                  className="flex-1 text-lg"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleCalculate();
                    }
                  }}
                />
                <Button 
                  onClick={handleCalculate}
                  disabled={!patrimonio.trim()}
                  className="px-6"
                >
                  Calcola
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleReset}
                  disabled={!patrimonio && !risultato}
                >
                  Reset
                </Button>
              </div>
            </div>

            {/* Info Badge */}
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <Info className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Il calcolo viene eseguito in base agli scaglioni configurati. 
                Usa il pulsante "Configura Scaglioni" per modificare i parametri.
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Risultato */}
        {risultato && (
          <RisultatoDisplay 
            risultato={risultato} 
            scaglioni={scaglioni}
          />
        )}

        {/* Tabella Scaglioni Correnti */}
        <Card>
          <CardHeader>
            <CardTitle>Scaglioni Attualmente Configurati</CardTitle>
            <CardDescription>
              Panoramica degli scaglioni e delle percentuali applicate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {scaglioni.map((scaglione, index) => (
                <div key={scaglione.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="min-w-[2rem] justify-center">
                      {index}
                    </Badge>
                    <span className="font-medium">{scaglione.descrizione}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Fascia: {formatCurrency(scaglione.soglia)} - {scaglione.sogliaFine === Infinity ? '∞' : formatCurrency(scaglione.sogliaFine)}</span>
                    <span>Percentuale: {scaglione.percentuale}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Modal Configurazione */}
        {showConfig && (
          <ScaglioniConfig
            scaglioni={scaglioni}
            onSave={handleScaglioniUpdate}
            onClose={() => setShowConfig(false)}
          />
        )}
      </div>
    </div>
  );
};