import { useState } from 'react';
import { InspectionSection, ItemStatus } from '@/types/inspection';
import { InspectionItemCard } from './InspectionItemCard';
import { StatusBadge } from './StatusBadge';
import { ChevronDown, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionCardProps {
  section: InspectionSection;
  onStatusChange: (itemId: string, status: ItemStatus) => void;
  onCommentChange: (itemId: string, comment: string) => void;
  onPhotoAdd: (itemId: string, photoUrl: string) => void;
  onPhotoRemove: (itemId: string, index: number) => void;
}

export const SectionCard = ({
  section,
  onStatusChange,
  onCommentChange,
  onPhotoAdd,
  onPhotoRemove,
}: SectionCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const completedCount = section.items.filter(i => i.status !== 'pendente').length;
  const totalCount = section.items.length;
  const nonConformCount = section.items.filter(i => i.status === 'nao_conforme').length;
  const progress = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="bg-card rounded-2xl border shadow-card overflow-hidden animate-slide-up">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center gap-4"
      >
        <div
          className={cn(
            'flex-shrink-0 w-14 h-14 rounded-xl flex flex-col items-center justify-center',
            nonConformCount > 0 ? 'bg-destructive/15' : 'gradient-primary'
          )}
        >
          <span className={cn(
            'text-lg font-bold',
            nonConformCount > 0 ? 'text-destructive' : 'text-primary-foreground'
          )}>
            {section.code}
          </span>
        </div>
        
        <div className="flex-1 text-left">
          <h3 className="font-bold text-foreground">{section.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden max-w-32">
              <div
                className={cn(
                  'h-full rounded-full transition-all duration-500',
                  nonConformCount > 0 ? 'bg-destructive' : 'bg-success'
                )}
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm text-muted-foreground">
              {completedCount}/{totalCount}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {nonConformCount > 0 && (
            <div className="flex items-center gap-1 text-destructive">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">{nonConformCount}</span>
            </div>
          )}
          {completedCount === totalCount && nonConformCount === 0 && (
            <CheckCircle2 className="w-6 h-6 text-success" />
          )}
          {isExpanded ? (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-3 animate-fade-in">
          <div className="border-t pt-4" />
          {section.items.map((item) => (
            <InspectionItemCard
              key={item.id}
              item={item}
              onStatusChange={(status) => onStatusChange(item.id, status)}
              onCommentChange={(comment) => onCommentChange(item.id, comment)}
              onPhotoAdd={(photoUrl) => onPhotoAdd(item.id, photoUrl)}
              onPhotoRemove={(index) => onPhotoRemove(item.id, index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
