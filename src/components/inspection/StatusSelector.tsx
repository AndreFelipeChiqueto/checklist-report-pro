import { ItemStatus } from '@/types/inspection';
import { Check, X, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatusSelectorProps {
  value: ItemStatus;
  onChange: (status: ItemStatus) => void;
}

const options: { status: ItemStatus; label: string; icon: React.ElementType; activeClass: string }[] = [
  { 
    status: 'conforme', 
    label: 'Conforme', 
    icon: Check, 
    activeClass: 'bg-success text-success-foreground border-success' 
  },
  { 
    status: 'nao_conforme', 
    label: 'Não Conforme', 
    icon: X, 
    activeClass: 'bg-destructive text-destructive-foreground border-destructive' 
  },
  { 
    status: 'nao_aplicavel', 
    label: 'N/A', 
    icon: Minus, 
    activeClass: 'bg-muted-foreground text-background border-muted-foreground' 
  },
];

export const StatusSelector = ({ value, onChange }: StatusSelectorProps) => {
  return (
    <div className="flex gap-2">
      {options.map(({ status, label, icon: Icon, activeClass }) => (
        <button
          key={status}
          onClick={() => onChange(status)}
          className={cn(
            'flex-1 flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all duration-200',
            'active:scale-95',
            value === status
              ? activeClass
              : 'bg-card border-border text-muted-foreground hover:border-primary/50'
          )}
        >
          <Icon className="w-6 h-6" />
          <span className="text-xs font-medium whitespace-nowrap">{label}</span>
        </button>
      ))}
    </div>
  );
};
