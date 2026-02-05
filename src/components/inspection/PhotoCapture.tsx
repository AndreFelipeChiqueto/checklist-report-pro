import { useRef } from 'react';
import { Camera, X, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PhotoCaptureProps {
  photoUrl?: string;
  onCapture: (photoUrl: string) => void;
  onRemove: () => void;
}

export const PhotoCapture = ({ photoUrl, onCapture, onRemove }: PhotoCaptureProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onCapture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCapture = () => {
    inputRef.current?.click();
  };

  if (photoUrl) {
    return (
      <div className="relative animate-scale-in">
        <img
          src={photoUrl}
          alt="Foto do item"
          className="w-full h-48 object-cover rounded-lg border-2 border-border"
        />
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full shadow-lg"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <Button
        variant="outline"
        onClick={handleCapture}
        className={cn(
          'w-full h-24 flex flex-col gap-2 border-dashed border-2',
          'hover:bg-accent/50 hover:border-accent'
        )}
      >
        <div className="flex items-center gap-3">
          <Camera className="w-6 h-6" />
          <Image className="w-5 h-5" />
        </div>
        <span className="text-sm">Tirar foto ou selecionar</span>
      </Button>
    </div>
  );
};
