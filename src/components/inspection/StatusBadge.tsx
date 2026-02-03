import { ItemStatus } from '@/types/inspection';
import { Check, X, Minus, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: ItemStatus;
  size?: 'sm' | 'md' | 'lg';
}

const statusConfig = {
  conforme: {
    label: 'Conforme',
    icon: Check,
    className: 'bg-success/15 text-success border-success/30',
  },
  nao_conforme: {
    label: 'Não Conforme',
    icon: X,
    className: 'bg-destructive/15 text-destructive border-destructive/30',
  },
  nao_aplicavel: {
    label: 'N/A',
    icon: Minus,
    className: 'bg-muted text-muted-foreground border-muted-foreground/30',
  },
  pendente: {
    label: 'Pendente',
    icon: Clock,
    className: 'bg-warning/15 text-warning border-warning/30',
  },
};

const sizeConfig = {
  sm: 'text-xs px-2 py-0.5 gap-1',
  md: 'text-sm px-2.5 py-1 gap-1.5',
  lg: 'text-base px-3 py-1.5 gap-2',
};

export const StatusBadge = ({ status, size = 'md' }: StatusBadgeProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;
  
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full border',
        config.className,
        sizeConfig[size]
      )}
    >
      <Icon className={cn(size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5')} />
      {config.label}
    </span>
  );
};
