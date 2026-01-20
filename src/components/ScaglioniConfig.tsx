import { useState } from 'react';
import { Save, X, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Scaglione } from '@/types/patrimonio';
import { formatCurrency } from '@/utils/patrimonioCalculator';
import { useToast } from '@/hooks/use-toast';

interface ScaglioniConfigProps {
  scaglioni: Scaglione[];
  onSave: (scaglioni: Scaglione[]) => void;
  onClose: () => void;
}

export const ScaglioniConfig = ({ scaglioni, onSave, onClose }: ScaglioniConfigProps) => {
  const [scaglioniLocali, setScaglioniLocali] = useState<Scaglione[]>([...scaglioni]);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleUpdateScaglione = (index: number, field: keyof Scaglione, value: any) => {
    const newScaglioni = [...scaglioniLocali];
    newScaglioni[index] = {
      ...newScaglioni[index],
      [field]: value
    };
    setScaglioniLocali(newScaglioni);
  };

  const handleAddScaglione = () => {
    const newId = Math.max(...scaglioniLocali.map(s => s.id)) + 1;
    const lastScaglione = scaglioniLocali[scaglioniLocali.length - 1];
    const newSoglia = lastScaglione ? lastScaglione.soglia + 10000 : 0;

    const newScaglione: Scaglione = {
      id: newId,
      soglia: newSoglia,
      sogliaFine: newSoglia + 10000,
      percentuale: 0,
      descrizione: `Nuovo scaglione ${newId}`
    };

    setScaglioniLocali([...scaglioniLocali, newScaglione]);
  };

  const handleRemoveScaglione = (index: number) => {
    if (scaglioniLocali.length <= 1) {
      toast({
        title: "Errore",
        description: "Deve esistere almeno uno scaglione",
        variant: "destructive"
      });
      return;
    }

    const newScaglioni = scaglioniLocali.filter((_, i) => i !== index);
    setScaglioniLocali(newScaglioni);
  };

  const handleMoveScaglione = (index: number, direction: 'up' | 'down') => {
    const newScaglioni = [...scaglioniLocali];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newScaglioni.length) return;

    [newScaglioni[index], newScaglioni[targetIndex]] = [newScaglioni[targetIndex], newScaglioni[index]];
    setScaglioniLocali(newScaglioni);
  };

  const validateAndSave = () => {
    // Validazione base
    for (let i = 0; i < scaglioniLocali.length; i++) {
      const scaglione = scaglioniLocali[i];

      if (scaglione.soglia < 0 || scaglione.percentuale < 0) {
        toast({
          title: "Errore di validazione",
          description: `Lo scaglione ${i} contiene valori negativi`,
          variant: "destructive"
        });
        return;
      }

      if (i > 0 && scaglione.soglia <= scaglioniLocali[i - 1].soglia) {
        toast({
          title: "Errore di validazione",
          description: `Lo scaglione ${i} deve avere una soglia maggiore del precedente`,
          variant: "destructive"
        });
        return;
      }
    }

    // Apre il dialog per la password
    setShowPasswordDialog(true);
  };

  const handlePasswordConfirm = () => {
    const expectedPassword = import.meta.env.VITE_PASSWORD_SCAGLIONI;

    if (password === expectedPassword) {
      // Ordina per soglia
      const scaglioniOrdinati = [...scaglioniLocali].sort((a, b) => a.soglia - b.soglia);
      onSave(scaglioniOrdinati);
      setShowPasswordDialog(false);
      onClose();
    } else {
      toast({
        title: "Password non valida",
        description: "La password inserita non è corretta.",
        variant: "destructive"
      });
      setPassword('');
    }
  };

  return (
    <Dialog open onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Save className="h-5 w-5" />
            Configurazione Scaglioni Patrimoniali
          </DialogTitle>
          <DialogDescription>
            Modifica i parametri degli scaglioni utilizzati per il calcolo patrimoniale.
            Gli scaglioni verranno automaticamente ordinati per soglia crescente.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Istruzioni */}
          <Card className="bg-accent/10 border-accent/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <div className="text-sm space-y-1">
                  <p className="font-medium text-accent">Istruzioni:</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• <strong>Soglia:</strong> Valore minimo di patrimonio per applicare questo scaglione</li>
                    <li>• <strong>Soglia Fine:</strong> Valore massimo per questo scaglione (lascia vuoto per illimitato)</li>
                    <li>• <strong>Percentuale:</strong> Percentuale applicata alla fascia di questo scaglione</li>
                    <li>• <strong>Descrizione:</strong> Descrizione leggibile dello scaglione</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista Scaglioni */}
          <div className="md:grid md:grid-cols-2 gap-4 space-y-4 md:space-y-0">
            {scaglioniLocali.map((scaglione, index) => (
              <div key={scaglione.id} className="relative group bg-accent/5 rounded-xl border border-border/50 overflow-hidden h-full">
                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="font-mono text-xs">#{index + 1}</Badge>
                      <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Scaglione</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-background"
                        onClick={() => handleMoveScaglione(index, 'up')}
                        disabled={index === 0}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-background"
                        onClick={() => handleMoveScaglione(index, 'down')}
                        disabled={index === scaglioniLocali.length - 1}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleRemoveScaglione(index)}
                        disabled={scaglioniLocali.length <= 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor={`soglia-${scaglione.id}`} className="text-xs text-muted-foreground">Da Patrimonio (€)</Label>
                      <Input
                        id={`soglia-${scaglione.id}`}
                        type="number"
                        inputMode="decimal"
                        value={scaglione.soglia}
                        onChange={(e) => handleUpdateScaglione(index, 'soglia', parseInt(e.target.value) || 0)}
                        className="h-9 bg-background font-mono"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor={`fine-${scaglione.id}`} className="text-xs text-muted-foreground">A Patrimonio (€)</Label>
                      <Input
                        id={`fine-${scaglione.id}`}
                        type="number"
                        inputMode="decimal"
                        value={scaglione.sogliaFine === Infinity ? '' : scaglione.sogliaFine}
                        onChange={(e) => handleUpdateScaglione(index, 'sogliaFine', e.target.value === '' ? Infinity : parseInt(e.target.value) || 0)}
                        className="h-9 bg-background font-mono"
                        placeholder="∞"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor={`percentuale-${scaglione.id}`} className="text-xs text-muted-foreground">Aliquota (%)</Label>
                      <Input
                        id={`percentuale-${scaglione.id}`}
                        type="number"
                        step="0.1"
                        inputMode="decimal"
                        value={scaglione.percentuale}
                        onChange={(e) => handleUpdateScaglione(index, 'percentuale', parseFloat(e.target.value) || 0)}
                        className="h-9 bg-background font-mono"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor={`descrizione-${scaglione.id}`} className="text-xs text-muted-foreground">Etichetta</Label>
                      <Input
                        id={`descrizione-${scaglione.id}`}
                        value={scaglione.descrizione}
                        onChange={(e) => handleUpdateScaglione(index, 'descrizione', e.target.value)}
                        className="h-9 bg-background"
                        placeholder="Descrizione"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Aggiungi Scaglione */}
          <Button
            variant="outline"
            onClick={handleAddScaglione}
            className="w-full flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Aggiungi Nuovo Scaglione
          </Button>

          <Separator />

          {/* Azioni */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              <X className="h-4 w-4 mr-2" />
              Annulla
            </Button>
            <Button onClick={validateAndSave}>
              <Save className="h-4 w-4 mr-2" />
              Salva Configurazione
            </Button>
          </div>
        </div>
      </DialogContent>

      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="max-w-xs">
          <DialogHeader>
            <DialogTitle>Conferma Modifiche</DialogTitle>
            <DialogDescription>
              Inserisci la password di amministrazione per salvare le modifiche.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handlePasswordConfirm();
              }}
            />
            <Button onClick={handlePasswordConfirm} className="w-full">
              Conferma
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
};