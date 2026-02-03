import { useState } from 'react';
import { InspectionItem, ItemStatus } from '@/types/inspection';
import { StatusSelector } from './StatusSelector';
import { StatusBadge } from './StatusBadge';
import { PhotoCapture } from './PhotoCapture';
import { ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface InspectionItemCardProps {
  item: InspectionItem;
  onStatusChange: (status: ItemStatus) => void;
  onCommentChange: (comment: string) => void;
  onPhotoChange: (photoUrl: string | undefined) => void;
}

export const InspectionItemCard = ({
  item,
  onStatusChange,
  onCommentChange,
  onPhotoChange,
}: InspectionItemCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const showPhotoCapture = item.status === 'nao_conforme';

  return (
    <div
      className={cn(
        'bg-card rounded-xl border shadow-card overflow-hidden transition-all duration-200',
        item.status === 'nao_conforme' && 'border-destructive/50',
        item.status === 'conforme' && 'border-success/30'
      )}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-start gap-3 text-left"
      >
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <span className="text-sm font-bold text-primary">{item.code}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground leading-tight">{item.title}</h4>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
          <div className="mt-2">
            <StatusBadge status={item.status} size="sm" />
          </div>
        </div>
        <div className="flex-shrink-0 text-muted-foreground">
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 animate-fade-in">
          <div className="border-t pt-4">
            <label className="text-sm font-medium text-foreground mb-2 block">Status</label>
            <StatusSelector value={item.status} onChange={onStatusChange} />
          </div>

          {showPhotoCapture && (
            <div>
              <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                Foto da não conformidade
                <span className="text-xs text-muted-foreground">(obrigatório)</span>
              </label>
              <PhotoCapture
                photoUrl={item.photoUrl}
                onCapture={(url) => onPhotoChange(url)}
                onRemove={() => onPhotoChange(undefined)}
              />
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Comentário
            </label>
            <Textarea
              value={item.comment}
              onChange={(e) => onCommentChange(e.target.value)}
              placeholder="Adicione observações sobre este item..."
              className="min-h-[80px] resize-none"
            />
          </div>
        </div>
      )}
    </div>
  );
};
