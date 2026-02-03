import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ClientObservationsProps {
  observations: string[];
  onAdd: (observation: string) => void;
  onRemove: (index: number) => void;
}

export const ClientObservations = ({ observations, onAdd, onRemove }: ClientObservationsProps) => {
  const [newObservation, setNewObservation] = useState('');

  const handleAdd = () => {
    if (newObservation.trim()) {
      onAdd(newObservation.trim());
      setNewObservation('');
    }
  };

  return (
    <div className="bg-card rounded-2xl border shadow-card p-4 space-y-4 animate-slide-up">
      <div className="gradient-accent rounded-xl p-4 -mx-4 -mt-4">
        <h3 className="font-bold text-accent-foreground">Pendências do Cliente</h3>
        <p className="text-sm text-accent-foreground/80">Observações reportadas pelo cliente</p>
      </div>

      <div className="flex gap-2">
        <Input
          value={newObservation}
          onChange={(e) => setNewObservation(e.target.value)}
          placeholder="Adicionar pendência..."
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <Button onClick={handleAdd} size="icon" className="flex-shrink-0">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {observations.length > 0 ? (
        <ul className="space-y-2">
          {observations.map((obs, index) => (
            <li
              key={index}
              className="flex items-start gap-2 p-3 bg-muted rounded-lg animate-fade-in"
            >
              <span className="flex-1 text-sm">{obs}</span>
              <button
                onClick={() => onRemove(index)}
                className="flex-shrink-0 p-1 text-destructive hover:bg-destructive/10 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground text-center py-4">
          Nenhuma pendência do cliente registrada
        </p>
      )}
    </div>
  );
};
