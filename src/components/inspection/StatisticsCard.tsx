import { Check, X, Minus, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatisticsCardProps {
  total: number;
  conforme: number;
  naoConforme: number;
  naoAplicavel: number;
  pendente: number;
}

export const StatisticsCard = ({
  total,
  conforme,
  naoConforme,
  naoAplicavel,
  pendente,
}: StatisticsCardProps) => {
  const progress = Math.round(((total - pendente) / total) * 100);

  return (
    <div className="bg-card rounded-2xl border shadow-card overflow-hidden animate-slide-up">
      <div className="gradient-primary p-4">
        <div className="flex items-center justify-between text-primary-foreground">
          <div>
            <h3 className="font-bold text-lg">Progresso</h3>
            <p className="text-primary-foreground/80 text-sm">{total - pendente} de {total} itens</p>
          </div>
          <div className="text-3xl font-bold">{progress}%</div>
        </div>
        <div className="mt-3 h-2 bg-primary-foreground/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-foreground rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="p-4 grid grid-cols-4 gap-2">
        <StatItem
          icon={Check}
          label="Conforme"
          value={conforme}
          className="text-success bg-success/10"
        />
        <StatItem
          icon={X}
          label="Não Conf."
          value={naoConforme}
          className="text-destructive bg-destructive/10"
        />
        <StatItem
          icon={Minus}
          label="N/A"
          value={naoAplicavel}
          className="text-muted-foreground bg-muted"
        />
        <StatItem
          icon={Clock}
          label="Pendente"
          value={pendente}
          className="text-warning bg-warning/10"
        />
      </div>
    </div>
  );
};

interface StatItemProps {
  icon: React.ElementType;
  label: string;
  value: number;
  className: string;
}

const StatItem = ({ icon: Icon, label, value, className }: StatItemProps) => (
  <div className={cn('rounded-lg p-2 text-center', className)}>
    <Icon className="w-5 h-5 mx-auto mb-1" />
    <div className="text-xl font-bold">{value}</div>
    <div className="text-xs opacity-80">{label}</div>
  </div>
);
